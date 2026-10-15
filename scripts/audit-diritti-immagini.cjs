'use strict';
/**
 * Per Me - controllo tracciabilita immagini.
 * PASS significa: inventario tecnico completo e assenza di nuove immagini ignote.
 * NON significa: certificazione legale dei diritti sulle immagini o verifica individuale delle chat originarie.
 */
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const assert=require('node:assert/strict');
const ROOT=path.resolve(__dirname,'..');
const reg=JSON.parse(fs.readFileSync(path.join(ROOT,'FONTI/registro-diritti-immagini.json'),'utf8'));
const local=new Map(reg.local.map(item=>[item.file,item]));
const remote=new Map(reg.stock.map(item=>[item.src_path,item]));
const LEGACY_AI_CONFIRMED_BY_OWNER=new Set([
  "Donna anziana al lavoro tra documenti e piante.png",
  "Immagine ChatGPT 12 ott 2026, 18_56_26-1.png",
  "Uomo anziano pianifica il bilancio domestico.png",
  "Uomo pensieroso alle prese con i documenti.png",
  "app/icon-192.png",
  "app/icon-512.png",
  "app/icon-maskable-512.png",
  "assets/Uomo concentrato tra pratiche e calcolatrice.png",
  "assets/Uomo pensieroso tra conti e campagna 恒一.png",
  "assets/debiti-cartelle-scena.svg",
  "assets/debiti-consulenza-approvata.png",
  "assets/debiti-consulenza-approvata.webp",
  "assets/debiti-guida-01-notifica.webp",
  "assets/debiti-guida-02-verifica-online.webp",
  "assets/debiti-guida-03-prove-documenti.webp",
  "assets/debiti-guida-04-spesa-sostenibile.webp",
  "assets/debiti-guida-05-avvisi-comunali.webp",
  "assets/debiti-guida-06-fermo-auto.webp",
  "assets/debiti-guida-07-verifica-contatori.webp",
  "assets/debiti-guida-08-nuova-prospettiva.webp",
  "assets/debiti-guida-09-consulenza-chiara.webp",
  "assets/debiti-sportello-ascolto.svg",
  "assets/foto-1.webp",
  "assets/foto-2.webp",
  "assets/foto-3.webp",
  "assets/foto-4.webp",
  "assets/foto-5.webp",
  "assets/foto-6.webp",
  "assets/foto-7.webp",
  "assets/logo-per-me.png",
  "assets/pensione-guida-01.jpg",
  "assets/pensione-guida-02.jpg",
  "assets/pensione-guida-03.webp",
  "assets/pensione-guida-04.svg",
  "assets/pensione-guida-04.webp",
  "assets/pensione-guida-05.webp",
  "assets/pensione-guida-06.webp",
  "assets/pensione-guida-07.webp",
  "assets/pensione-guida-08.webp",
  "assets/pensione-invalidita.jpg",
  "ritratto-enrico.webp"
]);
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
 if(!['AI_CHATGPT_DICHIARATA_AUTORE','PROVENIENZA_DOCUMENTATA'].includes(item.licensing))errors.push('Stato provenienza non valido: '+item.file);
 if(item.licensing==='AI_CHATGPT_DICHIARATA_AUTORE'&&!LEGACY_AI_CONFIRMED_BY_OWNER.has(item.file))errors.push('Nuova immagine AI senza evidenza individuale: '+item.file);
 if(item.licensing==='AI_CHATGPT_DICHIARATA_AUTORE'&&(!(item.origin_evidence||'').trim()||!/^Generata o elaborata con ChatGPT/.test(item.origin||'')))errors.push('Dichiarazione originale AI non registrata: '+item.file);
 if(item.licensing==='PROVENIENZA_DOCUMENTATA'&&(!(item.provenance_evidence||'').trim()||!(item.license_or_ownership||'').trim()))errors.push('Documentazione mancante per nuova immagine: '+item.file);
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
  // Contatori tecnici: grafica funzionale del fornitore, non fotografia editoriale.
  // Solo questo widget sulla pagina privata di statistiche e' escluso dal registro stock.
  if(ref==='https://counterapi.com/counter.svg'&&/^contatori-per-me-[a-f0-9]+\.html$/.test(baseFile))return;
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
const aiLocal=[...usedLocal].filter(f=>local.get(f).licensing==='AI_CHATGPT_DICHIARATA_AUTORE');
for(const msg of errors)console.error('ERROR: '+msg);
console.log('Controllo immagini: '+assets.length+' file locali registrati; '+usedLocal.size+' locali richiamati; '+usedRemote.size+' fotografie stock con licenze piattaforma verificate.');
console.log('Immagini locali ChatGPT dichiarate dal proprietario e usate nel sito: '+aiLocal.length+'; in inventario storico: '+reg.local.filter(x=>x.licensing==='AI_CHATGPT_DICHIARATA_AUTORE').length+'.');
console.log('La conferma dell’autore non sostituisce una prova individuale dei diritti di eventuali materiali di terzi.');
assert.equal(errors.length,0,'Immagini assenti, non registrate o modificate senza aggiornare il registro.');
console.log('PASS: nessuna nuova immagine senza registro; integrita dei file verificata.');
