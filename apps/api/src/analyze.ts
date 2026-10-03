export type Issue = { row: number; severity: 'error'|'warning'; code: string; oldUrl: string; message: string };
export type Mapping = { row: number; oldUrl: string; newUrl: string; status: number };
export const FREE_LIMIT=100, MAX_LIMIT=5000;
export function parseCsv(text:string):string[][] {
 if(typeof text!=='string'||!text.trim()) throw new Error('Paste a CSV or load the example.');
 if(Buffer.byteLength(text)>1_500_000) throw new Error('CSV exceeds 1.5 MB.');
 text=text.replace(/^\uFEFF/,'');
 const rows:string[][]=[]; let cells:string[]=[],value='',quoted=false,closed=false;
 for(let i=0;i<text.length;i++) {
  const c=text[i];
  if(quoted){if(c==='"'){if(text[i+1]==='"'){value+='"';i++;}else{quoted=false;closed=true;}}else value+=c;continue;}
  if(c==='"'){if(value||closed)throw new Error('Quote must start a CSV field.');quoted=true;continue;}
  if(c===','||c==='\n'||c==='\r'){
   cells.push(value);value='';closed=false;
   if(c!==','){if(c==='\r'&&text[i+1]==='\n')i++;if(cells.some(x=>x.trim()))rows.push(cells);cells=[];}
  }else{if(closed)throw new Error('Unexpected text after closing CSV quote.');value+=c;}
 }
 if(quoted)throw new Error('Unclosed CSV quote.');
 cells.push(value);if(cells.some(x=>x.trim()))rows.push(cells);
 return rows;
}
function url(value:string):string {
 value=value.trim();if(/\s/.test(value))throw new Error('URL contains whitespace. Encode spaces as %20.');
 const u=new URL(value);if(!['http:','https:'].includes(u.protocol)||u.username||u.password||u.hash)throw new Error('Use absolute HTTP(S) URLs without credentials or fragments.');
 return u.href;
}
function cell(v:unknown){let s=String(v);if(/^[=+\-@\t\r]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';}
export function csv(rows:unknown[][]){return rows.map(r=>r.map(cell).join(',')).join('\r\n');}
export function analyze(input:{csv:string;inventory?:string},limit=FREE_LIMIT){
 const parsed=parseCsv(input.csv);const header=parsed.shift()!.map(x=>x.trim().toLowerCase());
 if(new Set(header).size!==header.length||header.length<2||!header.includes('old_url')||!header.includes('new_url')||header.some(x=>!['old_url','new_url','status'].includes(x)))throw new Error('Headers must be old_url,new_url with optional status.');
 if(!parsed.length)throw new Error('Add at least one mapping beneath the header.');
 if(parsed.length>limit)throw new Error(`This run has ${parsed.length} mappings. Limit: ${limit}. ${limit===FREE_LIMIT?'A test project pass unlocks up to 5000.':'Split the map into smaller files.'}`);
 const issues:Issue[]=[],rows:Mapping[]=[];
 function issue(row:number,severity:Issue['severity'],code:string,oldUrl:string,message:string){issues.push({row,severity,code,oldUrl,message});}
 parsed.forEach((p,i)=>{
  const n=i+2;if(p.length!==header.length){issue(n,'error','CSV_WIDTH',p[0]||'',`Expected ${header.length} columns, found ${p.length}.`);return;}
  let oldUrl='',newUrl='';try{oldUrl=url(p[header.indexOf('old_url')]);newUrl=url(p[header.indexOf('new_url')]);}catch{issue(n,'error','INVALID_URL',p[header.indexOf('old_url')]||'','Use absolute HTTP(S) URLs without whitespace, credentials or fragments.');return;}
  const statusRaw=header.includes('status')?p[header.indexOf('status')].trim():'301';
  if(!['301','308'].includes(statusRaw)){issue(n,'error','INVALID_STATUS',oldUrl,'Only permanent 301 or 308 mappings are supported.');return;}
  rows.push({row:n,oldUrl,newUrl,status:Number(statusRaw)});
 });
 const grouped=new Map<string,Mapping[]>();for(const r of rows)grouped.set(r.oldUrl,[...(grouped.get(r.oldUrl)||[]),r]);
 const edges=new Map<string,string>();const blocked=new Set<string>();
 for(const [source,group]of grouped){const variants=new Set(group.map(r=>r.newUrl+' '+r.status));if(variants.size>1){blocked.add(source);for(const r of group)issue(r.row,'error','CONFLICT',source,'This source has conflicting destinations or status codes.');}else{edges.set(source,group[0].newUrl);for(const r of group.slice(1))issue(r.row,'warning','DUPLICATE',source,'Repeated identical mapping; reviewed export keeps the first row.');}}
 const finished=new Set<string>(),loops=new Set<string>();
 for(const start of edges.keys()){
  if(finished.has(start))continue;const path:string[]=[],positions=new Map<string,number>();let current:string|undefined=start;
  while(current&&edges.has(current)&&!finished.has(current)){
   if(positions.has(current)){for(const node of path.slice(positions.get(current)))loops.add(node);break;}
   positions.set(current,path.length);path.push(current);current=edges.get(current);
  }
  for(const node of path)finished.add(node);
 }
 for(const r of rows){if(blocked.has(r.oldUrl))continue;
  if(loops.has(r.oldUrl)){blocked.add(r.oldUrl);issue(r.row,'error',r.oldUrl===r.newUrl?'SELF_REDIRECT':'LOOP',r.oldUrl,'Redirect cycle detected. Fix before exporting this source.');}
  else if(grouped.has(r.newUrl)){issue(r.row,'warning','CHAIN',r.oldUrl,'Destination is also a source. Review and point directly to the final destination.');}
 }
 // Every row sharing a blocked source is omitted. A chain into a conflict/cycle is also blocked.
 let changed=true;while(changed){changed=false;for(const [source,target]of edges)if(!blocked.has(source)&&blocked.has(target)){blocked.add(source);changed=true;for(const r of grouped.get(source)!)issue(r.row,'error','BLOCKED_TARGET',source,'Destination leads to a conflicting or cyclic mapping.');}}
 const inventoryText=input.inventory||'';if(Buffer.byteLength(inventoryText)>1_000_000)throw new Error('Inventory exceeds 1 MB.');
 const inventory=inventoryText.split(/\r?\n/).map((x,i)=>({value:x.trim(),line:i+1})).filter(x=>x.value);if(inventory.length>MAX_LIMIT)throw new Error('Inventory limit is 5000 URLs.');
 const seenInventory=new Set<string>();inventory.forEach(({value:v,line:i})=>{try{const u=url(v);if(seenInventory.has(u))return;seenInventory.add(u);if(!grouped.has(u))issue(i,'warning','UNMAPPED',u,'Inventory URL has no valid mapping. It may stay unchanged or need an intentional removal; confirm manually.');}catch{issue(i,'error','INVALID_INVENTORY_URL',v,'Invalid inventory URL; row number refers to inventory line.');}});
 const emitted=new Set<string>();const approved=rows.filter(r=>{if(blocked.has(r.oldUrl)||emitted.has(r.oldUrl))return false;emitted.add(r.oldUrl);return true;});
 const errors=issues.filter(i=>i.severity==='error').length;
 return {rows,issues,summary:{inputRows:parsed.length,validRows:rows.length,errors,warnings:issues.length-errors,exportRows:approved.length,inventoryUrls:seenInventory.size},reviewedCsv:csv([['old_url','new_url','status'],...approved.map(r=>[r.oldUrl,r.newUrl,r.status])]),issuesCsv:csv([['row','severity','code','old_url','message'],...issues.map(i=>[i.row,i.severity,i.code,i.oldUrl,i.message])]),limitations:['Offline proposed-map checks only. No URL is fetched; target HTTP status, content relevance, deployed redirects and SEO outcomes are unverified.','Wildcards, regex rules, relative paths and temporary redirects are not supported. URL path case, query parameters and trailing slashes remain distinct.','Warnings require human review. UNMAPPED can be an intentional unchanged/deleted page. Row numbers refer to mapping records (header=1); inventory issues use inventory line numbers.']};
}
