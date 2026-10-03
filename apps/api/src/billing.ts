import Stripe from 'stripe';
import {createHmac, timingSafeEqual, randomUUID} from 'node:crypto';
export type BrowserProject={project:string;session?:string};
export const PASS_DAYS=30;
export function signProject(p:BrowserProject,secret:string){const value=Buffer.from(JSON.stringify(p)).toString('base64url');return value+'.'+createHmac('sha256',secret).update(value).digest('base64url');}
export function readProject(raw:string|undefined,secret:string):BrowserProject|undefined{
 try{const value=raw?.split(';').find(s=>s.trim().startsWith('rp_project='))?.trim().slice(11);if(!value)return;const[data,sig]=value.split('.');const expected=createHmac('sha256',secret).update(data).digest();const actual=Buffer.from(sig,'base64url');if(actual.length!==expected.length||!timingSafeEqual(actual,expected))return;const p=JSON.parse(Buffer.from(data,'base64url').toString());if(typeof p.project!=='string'||!/^[0-9a-f-]{36}$/.test(p.project)||p.session&&typeof p.session!=='string')return;return p;}catch{return;}
}
export function projectCookie(p:BrowserProject,secret:string,secure:boolean){return `rp_project=${signProject(p,secret)}; Path=/api; HttpOnly; SameSite=Lax; Max-Age=${31*86400}${secure?'; Secure':''}`;}
export function newProject():BrowserProject{return{project:randomUUID()};}
export function isEligibleSession(s:any,project:string|undefined,now=Date.now()){
 const c=s.payment_intent?.latest_charge;
 return !s.livemode&&s.mode==='payment'&&s.payment_status==='paid'&&s.amount_total===1900&&s.currency==='usd'&&s.metadata?.product==='redirect-preflight'&&(!project||s.metadata?.project===project)&&typeof s.metadata?.project==='string'&&s.created*1000+PASS_DAYS*86400000>now&&c&&typeof c==='object'&&!c.refunded&&!c.disputed&&c.amount_refunded===0;
}
export function makeBilling(key:string|undefined){
 if(key&&!/^(sk_test_|rk_test_|rkcs_test_)/.test(key))throw new Error('Billing requires an isolated sandbox/test API key.');
 const stripe=key?new Stripe(key):undefined;
 async function fulfill(id:string,project?:string){
  if(!stripe)return{entitled:false};
  const s=await stripe.checkout.sessions.retrieve(id,{expand:['payment_intent.latest_charge']});
  if(!isEligibleSession(s,project))return{entitled:false};
  const expiresAt=new Date((s.created+PASS_DAYS*86400)*1000).toISOString();
  if(s.metadata?.fulfilled!=='true')await stripe.checkout.sessions.update(id,{metadata:{fulfilled:'true',expires_at:expiresAt}},{idempotencyKey:'fulfill-'+id});
  return{entitled:true,expiresAt};
 }
 return{stripe,fulfill};
}
