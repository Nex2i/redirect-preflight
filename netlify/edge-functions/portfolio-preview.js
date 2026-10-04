// A framing exception for the public, account-free preview document only.
export default async function(request,context){
  const response=await context.next();
  if(new URL(request.url).pathname!=='/portfolio-preview/')return response;
  const headers=new Headers(response.headers);
  headers.delete('X-Frame-Options');
  headers.set('Content-Security-Policy',"frame-ancestors 'self' https://nex2i.com https://www.nex2i.com");
  headers.set('X-Robots-Tag','noindex');
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}
