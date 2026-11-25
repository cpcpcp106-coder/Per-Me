'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {inventario,attesePwa}=require('../lib/inventario-sito.cjs');
const root=path.resolve(__dirname,'../..'),site=inventario(root);
const sandbox={window:{},URL};
vm.runInNewContext(fs.readFileSync(path.join(root,'app/catalogo-guide.js'),'utf8'),sandbox);
const api=sandbox.window.PerMeCatalogo;
const base=new URL('https://cpcpcp106-coder.github.io/Per-Me/');
function download(exclude){
 return async file=>({src:new URL(file,base),doc:{querySelectorAll:()=>site.collegamentiMain[file].filter(href=>!exclude||!href.includes(exclude)).map(href=>({getAttribute:()=>href,querySelector:()=>null,textContent:'Guida'}))}});
}
test('L’aspettativa indipendente coincide con le identità caricate dal catalogo reale',async()=>{
 const result=await api.carica(base,download());
 assert.equal(result.errori.length,0);
 assert.deepEqual(Array.from(result.pagine.keys()).sort(),attesePwa(root));
});
test('Un errore di sincronizzazione non passa perché sono rimaste molte altre guide',async()=>{
 const result=await api.carica(base,async file=>{
  if(file==='agevolazioni-diritti.html')throw Error('rete simulata');
  return download()(file);
 });
 assert.ok(result.errori.includes('agevolazioni-diritti.html'));
 assert.notDeepEqual(Array.from(result.pagine.keys()).sort(),attesePwa(root));
});
test('La perdita del solo Bonus mamme viene individuata nell’elenco offline',async()=>{
 const result=await api.carica(base,download('bonus-mamme-2026-domanda-requisiti.html'));
 assert.equal(result.errori.length,0);
 const saved=new Set(result.pagine.keys());
 assert.deepEqual(attesePwa(root).filter(file=>!saved.has(file)),['bonus-mamme-2026-domanda-requisiti.html']);
});
