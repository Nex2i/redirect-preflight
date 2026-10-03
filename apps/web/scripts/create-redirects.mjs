import { writeFileSync } from 'node:fs';

const origin = process.env.NETLIFY_PROXY_ORIGIN;
if (process.env.NETLIFY && !origin) {
  throw new Error('NETLIFY_PROXY_ORIGIN is required for a Netlify build');
}
let lines = 'https://redirect-preflight.netlify.app/*  https://redirect-preflight.nex2i.com/:splat  301!\n/index.html  /  301!\n/redirect-map-checklist/index.html  /redirect-map-checklist/  301!\n';
if (origin) {
  const parsed = new URL(origin);
  if (parsed.protocol !== 'https:' || parsed.pathname !== '/' || parsed.search || parsed.hash) {
    throw new Error('NETLIFY_PROXY_ORIGIN must be an HTTPS origin without a path');
  }
  lines += `/api/*  ${parsed.origin}/api/:splat  200!\n`;
}

writeFileSync(new URL('../dist/_redirects', import.meta.url), lines);
