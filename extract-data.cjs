const fs = require('fs');
const html = fs.readFileSync('cyberlex.html', 'utf8');
const script = html.slice(html.indexOf('/* ============ tiny helpers'), html.lastIndexOf('</script>'));
function extract(name) {
  const start = script.indexOf('const ' + name + '=');
  if (start < 0) throw new Error('missing ' + name);
  // find matching ]; balance brackets
  let i = script.indexOf('=', start) + 1;
  let depth = 0, inStr = null, esc = false, tmplExpr = 0;
  let inTmpl = false;
  for (let j = i; j < script.length; j++) {
    const ch = script[j];
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (ch === '\\') { esc = true; continue; }
      if (ch === inStr) inStr = null;
      continue;
    }
    if (inTmpl) {
      if (ch === '`') inTmpl = false;
      else if (ch === '$' && script[j+1] === '{') tmplExpr++;
      else if (ch === '}' && tmplExpr > 0) tmplExpr--;
      else if (ch === '\\') { j++; }
      continue;
    }
    if (ch === '\'' || ch === '"') inStr = ch;
    else if (ch === '`') inTmpl = true;
    else if (ch === '[') depth++;
    else if (ch === ']') { depth--; if (depth === 0) { return script.slice(i, j+1); } }
  }
  throw new Error('unbalanced ' + name);
}
const names = ['MODULES','TOOLS','CASES','SIMS','VOL','SIGS','COC','CERTS'];
const out = {};
for (const n of names) {
  const src = extract(n);
  fs.writeFileSync('.extract-' + n + '.js', 'module.exports = ' + src + ';');
  console.log(n, src.length);
}
