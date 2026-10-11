const fs = require('fs');
const path = require('path');
function load(n){ return require('./.extract-'+n+'.js'); }
const outDir = path.join(__dirname, 'src', 'data');
fs.mkdirSync(outDir, {recursive:true});
for (const n of ['MODULES','TOOLS','CASES','SIMS','VOL','SIGS','COC','CERTS']) {
  const v = load(n);
  const ts = 'export const ' + n + ' = ' + JSON.stringify(v, null, 2) + ' as const;\n\nexport type ' + n.slice(0,-1) + ' = (typeof ' + n + ')[number];\n';
  fs.writeFileSync(path.join(outDir, n.toLowerCase()+'.ts'), ts);
  console.log('wrote', n, v.length);
}
// videos registry
fs.writeFileSync(path.join(outDir, 'videos.ts'), `export const VIDEOS: Record<string,string> = {
  access: '', identity: '', obscene: '', intermediary: '', dpdp: '', evidence: '', jurisdiction: '', interception: '', terror: ''
};\n`);
console.log('done');
