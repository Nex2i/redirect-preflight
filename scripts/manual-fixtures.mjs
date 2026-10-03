import{writeFileSync,mkdirSync}from'node:fs';
mkdirSync('manual-fixtures',{recursive:true});
for(const size of[101,5000,5001])writeFileSync(`manual-fixtures/map-${size}.csv`,'old_url,new_url,status\n'+Array.from({length:size},(_,i)=>`https://example.com/old-${i},https://example.com/new-${i},301`).join('\n'));
console.log('Synthetic limit fixtures created in manual-fixtures/.');
