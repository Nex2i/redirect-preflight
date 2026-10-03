import Fastify,{type FastifyError} from 'fastify';import cors from '@fastify/cors';
import{analyze,FREE_LIMIT,MAX_LIMIT}from './analyze.js';
import{makeBilling,readProject,projectCookie,newProject}from './billing.js';
import{randomBytes}from 'node:crypto';
export function createApp(options:{origin?:string;key?:string;webhookSecret?:string;cookieSecret?:string;production?:boolean;logger?:boolean}={}){
 const app=Fastify({logger:options.logger?{level:'info',redact:['req.headers.cookie','req.headers.authorization','req.url','res.headers["set-cookie"]'],serializers:{req(req){return{method:req.method,path:req.url.split('?')[0],id:req.id};}}}:false,bodyLimit:2_000_000});
 const origin=options.origin||'http://localhost:5173';const secret=options.cookieSecret||randomBytes(32).toString('hex');
 if(options.production&&!options.cookieSecret)throw new Error('COOKIE_SECRET is required in production.');
 const billing=makeBilling(options.key);const enabled=Boolean(billing.stripe&&options.webhookSecret);const budgets=new Map<string,{at:number;n:number}>();
 app.register(cors,{origin,methods:['GET','POST']});
 app.addHook('onRequest',async(req,reply)=>{
  reply.header('Cache-Control','no-store');reply.header('X-Content-Type-Options','nosniff');
  if(req.method==='POST'&&req.url!=='/api/billing/webhook'&&req.headers.origin!==origin)return reply.code(403).send({error:'Request origin is not allowed.'});
  if(req.url==='/api/billing/webhook')return;
  const now=Date.now(),id=req.ip+(req.url.startsWith('/api/billing/checkout')?':checkout':':task');
  if(budgets.size>10000)for(const[k,v]of budgets)if(now-v.at>60000)budgets.delete(k);
  const b=budgets.get(id);if(!b||now-b.at>60000)budgets.set(id,{at:now,n:1});else if(++b.n>(id.endsWith(':checkout')?5:60))return reply.code(429).header('Retry-After','60').send({error:'Too many requests. Try again in one minute.'});
 });
 app.setErrorHandler((rawError,req,reply)=>{const error=rawError as FastifyError;req.log.warn({code:error.code||'REQUEST_FAILED',requestId:req.id},'Request failed');reply.code(error.statusCode||400).send({error:error.statusCode===413?'Input exceeds 2 MB.':error.statusCode&&error.statusCode>=500?'Service unavailable. Try again.':error.message});});
 app.get('/health',async()=>({status:'ok',product:'redirect-preflight'}));app.get('/api/health',async()=>({status:'ok',product:'redirect-preflight'}));
 app.get('/api/config',async()=>({freeLimit:FREE_LIMIT,maxLimit:MAX_LIMIT,billingEnabled:enabled,billingMode:'test',priceUsd:19,passDays:30}));
 app.get('/api/billing/status',async(req,reply)=>{const p=readProject(req.headers.cookie,secret);if(!p?.session||!enabled)return{entitled:false};try{return await billing.fulfill(p.session,p.project);}catch{return reply.code(503).send({entitled:false,error:'Test billing provider unavailable. Free reports remain available.'});}});
 app.post('/api/analyze',async(req,reply)=>{const body=req.body as any;if(!body||typeof body.csv!=='string'||body.inventory!==undefined&&typeof body.inventory!=='string')return reply.code(400).send({error:'Provide CSV text and optional inventory text.'});
  // Only consult payment provider for large maps, so provider downtime cannot interrupt free work.
  let limit=FREE_LIMIT;const p=readProject(req.headers.cookie,secret);
  if(body.csv.split('\n').length>FREE_LIMIT&&p?.session&&enabled){try{if((await billing.fulfill(p.session,p.project)).entitled)limit=MAX_LIMIT;}catch{/* free processing remains available */}}
  try{return analyze(body,limit);}catch(e){return reply.code(400).send({error:(e as Error).message});}
 });
 app.post('/api/billing/checkout',async(req,reply)=>{
  if(!enabled)return reply.code(503).send({error:'Test checkout is unavailable. Free reports up to 100 mappings still work.'});
  const p=readProject(req.headers.cookie,secret)||newProject();
  try{
   if(p.session){const old=await billing.stripe!.checkout.sessions.retrieve(p.session);if(old.status==='open'&&old.url)return{url:old.url};if(old.payment_status==='paid'&&(await billing.fulfill(p.session,p.project)).entitled)return{entitled:true};}
   const session=await billing.stripe!.checkout.sessions.create({mode:'payment',line_items:[{price_data:{currency:'usd',unit_amount:1900,product_data:{name:'Redirect Preflight — 30-day project pass (TEST)'}},quantity:1}],success_url:origin+'/?checkout=success',cancel_url:origin+'/?checkout=cancelled',metadata:{project:p.project,product:'redirect-preflight'},payment_intent_data:{metadata:{project:p.project,product:'redirect-preflight'}},integration_identifier:'redirect_preflight_'+Array.from(randomBytes(8),b=>String.fromCharCode(97+b%26)).join('') } as any,{idempotencyKey:'checkout-'+p.project+'-'+(p.session||'first')});
   reply.header('Set-Cookie',projectCookie({...p,session:session.id},secret,Boolean(options.production)));return{url:session.url};
  }catch{return reply.code(503).send({error:'Test checkout could not start. Try again; no entitlement was granted.'});}
 });
 app.register(async hook=>{
  hook.removeContentTypeParser('application/json');hook.addContentTypeParser('application/json',{parseAs:'buffer'},(_req,body,done)=>done(null,body));
  hook.post('/api/billing/webhook',async(req,reply)=>{
   if(!enabled)return reply.code(503).send({error:'Billing unavailable.'});
   let event;try{event=billing.stripe!.webhooks.constructEvent(req.body as Buffer,req.headers['stripe-signature'] as string,options.webhookSecret!);}catch{return reply.code(400).send({error:'Invalid webhook signature.'});}
   if(event.livemode)return reply.code(400).send({error:'Live events are not allowed.'});
   try{if(['checkout.session.completed','checkout.session.async_payment_succeeded'].includes(event.type))await billing.fulfill((event.data.object as any).id);return{received:true};}catch{return reply.code(503).send({error:'Payment verification pending. Retry event.'});}
  });
 });
 return app;
}
