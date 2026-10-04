import test from 'node:test';import assert from 'node:assert/strict';
import preview from '../../../netlify/edge-functions/portfolio-preview.js';
test('framing exception changes only the public preview response and keeps other routes protected',async()=>{
 for(const path of ['/','/account','/api/billing/checkout','/portfolio-preview/']){
  const response=await preview(new Request('https://redirect-preflight.nex2i.com'+path),{next:async()=>new Response('public content',{headers:{'X-Frame-Options':'DENY'}})});
  assert.equal(await response.text(),'public content');
  if(path==='/portfolio-preview/'){assert.equal(response.headers.get('x-frame-options'),null);assert.equal(response.headers.get('x-robots-tag'),'noindex');assert.equal(response.headers.get('content-security-policy'),"frame-ancestors 'self' https://nex2i.com https://www.nex2i.com");}
  else{assert.equal(response.headers.get('x-frame-options'),'DENY');assert.equal(response.headers.get('content-security-policy'),null);}
 }
});
