'use strict';
/* Controllo coerente con la politica editoriale pubblica di Per Me.
 * Non certifica la correttezza delle norme citate.
 */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const guideNames=require('./lib/inventario-sito.cjs').inventario(root).insiemi['registro-normativo'];
const errors=[];
for(const filename of guideNames){
 const file=path.join(root,filename);
 if(!fs.existsSync(file)){errors.push(filename+': file inesistente');continue}
 const html=fs.readFileSync(file,'utf8');
 if(!/name=["']robots["']\s+content=["']index,follow["']/.test(html))errors.push(filename+': indicizzazione difforme');
 if(/non indicizzat[aoie]/i.test(html.replace(/<script[\s\S]*?<\/script>/g,'')))errors.push(filename+': testo contrario a index,follow');
 if(!/<h1\b/i.test(html))errors.push(filename+': nessun titolo');
 if(!/<a\b[^>]*href=["']https?:\/\//i.test(html))errors.push(filename+': nessun rimando esterno verificabile');
}
const report=fs.readFileSync(path.join(root,'verifiche/revisione-normativa-31-guide-2026-10-15.md'),'utf8');
for(const name of guideNames)if(!report.includes('| '+name+' |'))errors.push(name+': assente dal rapporto guida per guida');
console.log(JSON.stringify({guideInRegisto:guideNames.length,errori:errors,nota:'Controllo di presenza, accessibilità e integrità del registro; NON prova l’esattezza normativa'},null,2));
if(errors.length)process.exitCode=1;
