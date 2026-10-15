'use strict';
/**
 * Per Me - controllo tracciabilita immagini.
 * PASS significa: inventario tecnico completo e assenza di nuove immagini ignote.
 * NON significa: titolarita certificata dei file locali classificati DA_DOCUMENTARE.
 */
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const assert=require('node:assert/strict');
const ROOT=path.resolve(__dirname,'..');
const reg=JSON.parse(fs.readFileSync(path.join(ROOT,'FONTI/registro-diritti-immagini.json'),'utf8'));
const local=new Map(reg.local.map(item=>[item.file,item]));
const remote=new Map(reg.stock.map(item=>[item.src_path,item]));
const errors=[],usedLocal=new Set(),usedRemote=new Set();
function gitBlobSha(buffer){return crypto.createHash('sha1').update(Buffer.from('blob '+buffer.length+'\0')).update(buffer).digest('hex');}
function walk(dir){
 return fs.readdirSync(dir,{withFileTypes:true}).flatMap(d=>{
  if(['.git','node_modules'].includes(d.name))return[];
  const p=path.join(dir,d.name);
  return d.isDirectory()?walk(p):[p];
 });
}
const files=walk(ROOT).map(full=>({full,rel:path.relative(ROOT,full).split(path.sep).join('/')}));
const assets=files.filter(f=>/\.(?:png|jpg|jpeg|webp|svg)$/i.test(f.rel));
for(const f of assets){
 const record=local.get(f.rel);
 if(!record){errors.push('Nuovo file immagine senza registrazione: '+f.rel);continue}
 const hash=gitBlobSha(fs.readFileSync(f.full));
 if(record.git_blob_sha!==hash)errors.push('Immagine modificata senza revisione registro: '+f.rel);
}
for(const item of reg.local){
 if(!assets.some(f=>f.rel===item.file))errors.push('File locale nel registro non trovato: '+item.file);
 if(!['PROVENIENZA_DA_DOCUMENTARE','PROVENIENZA_DOCUMENTATA'].includes(item.licensing))errors.push('Stato provenienza non valido: '+item.file);
}
for(const item of reg.stock){
 if(item.verification!=='LICENZA_PIATTAFORMA_VERIFICATA'||!/^https:\/\//.test(item.source)||!/^https:\/\//.test(item.license))errors.push('Fonte esterna incompleta: '+item.src_path);
}
function verifyImage(value,baseFile){
 const raw=value.replace(/&amp;/g,'&').trim();
 if(/^(?:data:|#)/i.test(raw))return;
 if(/^https?:\/\//i.test(raw)){
  let u;try{u=new URL(raw)}catch(e){errors.push('URL immagine invalido in '+baseFile);return}
  const ref=u.origin+u.pathname;
  if(!remote.has(ref)){errors.push('Immagine remota non registrata: '+baseFile+' => '+ref);return}
  usedRemote.add(ref);
  return;
 }
 if(/^\/\//.test(raw)){errors.push('URL remoto protocol-relative non registrato: '+baseFile);return}
 let clean=raw.split('?')[0].split('#')[0];
 try{clean=decodeURIComponent(clean)}catch(e){errors.push('Path immagine non decodificabile: '+baseFile);return}
 const relative=path.posix.normalize(path.posix.join(path.posix.dirname(baseFile),clean));
 if(relative.startsWith('../')||!local.has(relative)){errors.push('Immagine locale non registrata: '+baseFile+' => '+relative);return}
 usedLocal.add(relative);
}
for(const f of files){
 if(/\.html$/i.test(f.rel)){
  const txt=fs.readFileSync(f.full,'utf8');
  for(const match of txt.matchAll(/<img\b[^>]*>/gi)){
   const src=match[0].match(/\bsrc=["']([^"']+)["']/i);
   if(!src)errors.push('Immagine priva di src in '+f.rel);
   else verifyImage(src[1],f.rel);
  }
 }
 if(/\.css$/i.test(f.rel)){
  const txt=fs.readFileSync(f.full,'utf8');
  for(const m of txt.matchAll(/url\(\s*['"]?([^'"\)]+)['"]?\s*\)/gi)){
   const asset=m[1].trim();
   if(/\.(?:png|jpe?g|webp|svg)(?:\?|#|$)/i.test(asset))verifyImage(asset,f.rel);
  }
 }
}
const pending=[...usedLocal].filter(f=>local.get(f).licensing==='PROVENIENZA_DA_DOCUMENTARE');
for(const msg of errors)console.error('ERROR: '+msg);
console.log('Controllo immagini: '+assets.length+' file locali registrati; '+usedLocal.size+' locali richiamati; '+usedRemote.size+' fotografie stock con licenze piattaforma verificate.');
console.log('Provenienza dei file locali usati ancora da documentare: '+pending.length+'. NON e una certificazione legale.');
if(pending.length)console.log('AVVISO: '+pending.join(' | '));
assert.equal(errors.length,0,'Immagini assenti, non registrate o modificate senza aggiornare il registro.');
console.log('PASS: nessuna nuova immagine senza registro; integrita dei file verificata.');
