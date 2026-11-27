'use strict';
const {spawnSync}=require('node:child_process');
const path=require('node:path');
const fs=require('node:fs'),vm=require('node:vm');
// Python usa HTMLParser della libreria standard: niente regex per contare le schede.
// La cache vale per un solo processo di audit, mai fra due revisioni del sito.
const cache=new Map();
function inventario(root){
 const absolute=path.resolve(root);
 if(!cache.has(absolute)){
  const result=spawnSync('python3',[path.join(__dirname,'..','inventario_sito.py'),'--root',absolute,'--json'],{encoding:'utf8',maxBuffer:8*1024*1024});
  if(result.error)throw result.error;
  if(result.status!==0)throw Error(result.stderr.trim()||'Impossibile verificare l’inventario');
  cache.set(absolute,JSON.parse(result.stdout));
 }
 return cache.get(absolute);
}
function attesePwa(root){
 const site=inventario(root),sandbox={window:{},URL};
 vm.runInNewContext(fs.readFileSync(path.join(root,'app/catalogo-guide.js'),'utf8'),sandbox,{timeout:1000});
 const api=sandbox.window.PerMeCatalogo,base=new URL('https://cpcpcp106-coder.github.io/Per-Me/');
 const sections=Array.from(api.sezioni.keys());
 const excluded=new Set(['index.html','metodo.html','monitoraggio.html','chi-siamo.html']);
 const expected=new Set(sections);
 // Specifica indipendente da carica/aggiungi della PWA: rubriche, collegamenti
 // diretti nel main e, se collegato, il secondo livello della raccolta ricette.
 function includeLinks(file){
  for(const href of site.collegamentiMain[file]||[]){
   const url=new URL(href,new URL(file,base));
   if(url.origin!==base.origin||!url.pathname.startsWith(base.pathname))continue;
   const name=decodeURIComponent(url.pathname.slice(base.pathname.length));
   if(/^[a-z0-9-]+\.html$/i.test(name)&&!excluded.has(name))expected.add(name);
  }
 }
 for(const file of sections)includeLinks(file);
 if(expected.has(api.ricette))includeLinks(api.ricette);
 for(const file of expected)if(!site.insiemi.pagine.includes(file))throw Error('Catalogo offline: pagina assente '+file);
 return [...expected].sort();
}
module.exports={inventario,attesePwa};
