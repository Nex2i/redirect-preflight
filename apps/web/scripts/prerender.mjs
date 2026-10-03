import {readFileSync,writeFileSync,rmSync} from 'node:fs';
import {render} from '../dist-server/entry-server.js';
const file=new URL('../dist/index.html',import.meta.url);
const html=readFileSync(file,'utf8');
if(!html.includes('<div id="root"></div>')) throw new Error('Missing prerender root');
writeFileSync(file,html.replace('<div id="root"></div>',()=>'<div id="root">'+render()+'</div>'));
rmSync(new URL('../dist-server',import.meta.url),{recursive:true,force:true});
