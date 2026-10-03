import{createApp}from './app.js';
const app=createApp({origin:process.env.APP_ORIGIN||process.env.CORS_ORIGIN,key:process.env.STRIPE_SECRET_KEY,webhookSecret:process.env.STRIPE_WEBHOOK_SECRET,cookieSecret:process.env.COOKIE_SECRET,production:process.env.NODE_ENV==='production',logger:true});
await app.listen({host:'0.0.0.0',port:Number(process.env.PORT||10000)});
for(const signal of ['SIGINT','SIGTERM']as const)process.on(signal,async()=>{await app.close();process.exit(0);});
