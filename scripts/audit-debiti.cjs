'use strict';
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const filenames=[
 'debiti-guida-01-leggere-cartella.html',
 'debiti-guida-02-controllare-debiti.html',
 'debiti-guida-03-cartella-errata.html',
 'debiti-guida-04-rateizzazione.html',
 'debiti-guida-05-rottamazione.html',
 'debiti-guida-06-fermo-pignoramento.html',
 'debiti-guida-07-banche-bollette.html',
 'debiti-guida-08-sovraindebitamento.html',
 'debiti-guida-09-a-chi-rivolgersi.html'
];
let inspected=0;
const heroes=[];
const all=[ 'debiti-cartelle.html',...filenames ];
for(const file of all){
 const document=fs.readFileSync(path.join(root,file),'utf8');
 assert.equal((document.match(/<h1\b/gi)||[]).length,1,file+': un solo H1');
 assert.match(document,/<title>[^<]+<\/title>/i,file+': title');
 assert.match(document,/<meta\s+name="description"/i,file+': descrizione');
 assert.match(document,/<link\s+rel="canonical"/i,file+': canonical');
 assert.match(document,/<meta\s+name="viewport"/i,file+': viewport');
 assert.match(document,/<main\b/i,file+': main');
 const anchors=new Set([...document.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
 for(const match of document.matchAll(/href="#([^"]+)"/g)){
  assert.ok(anchors.has(match[1]),file+': collegamento interno senza destinazione #'+match[1]);
 }
 for(const match of document.matchAll(/<img\b[^>]*>/g)){
  assert.match(match[0],/\balt="[^"]*"/i,file+': immagine senza alt');
 }
 if(file==='debiti-cartelle.html'){
  for(const guide of filenames)assert.ok(document.includes('href="'+guide+'"'),file+': guida assente dall’indice '+guide);
 }else{
  const image=document.match(/assets\/debiti-guida-\d\d-[^"\s]+\.webp/);
  assert.ok(image,file+': fotografia mancante');
  assert.ok(fs.existsSync(path.join(root,image[0])),file+': file fotografia inesistente '+image[0]);
  heroes.push(image[0]);
  assert.match(document,/15 ottobre 2026/i,file+': data verifica non aggiornata');
  assert.ok(document.includes('debiti-cartelle.html'),file+': manca ritorno alla rubrica');
 }
 inspected++;
}
assert.equal(new Set(heroes).size,9,'Le 9 guide devono avere file fotografici distinti');
const guide04=fs.readFileSync(path.join(root,filenames[3]),'utf8');
assert.match(guide04,/otto rate, anche non consecutive/i);
assert.match(guide04,/Non si applica qui la regola speciale/i);
assert.match(guide04,/36 rate mensili per importi fino a 500\.000 euro/i);
const guide05=fs.readFileSync(path.join(root,filenames[4]),'utf8');
assert.match(guide05,/16 ottobre al 15 dicembre 2026/i);
const guide03=fs.readFileSync(path.join(root,filenames[2]),'utf8');
assert.match(guide03,/I 220 giorni non sono un termine generale/i);
// Revisione documentale del 23 ottobre 2026: controlli minimi anti-regressione.
// Le asserzioni verificano la presenza delle avvertenze, NON validano automaticamente le norme.
const guida06=fs.readFileSync(path.join(root,filenames[5]),'utf8');
assert.match(guida06,/concorso simultaneo di cause diverse/i,'Guida 06 senza distinzione fra crediti');
assert.match(guida06,/Non significa che sia sempre legittimo trattenere il 50%/i,'Guida 06 senza limite sulla regola del 50%');
assert.match(guida06,/articolo 546 c\\.p\\.c\\./i,'Guida 06 senza rimedio per pignoramenti presso più terzi');
assert.match(guida06,/La cessione del quinto già in corso non è un pignoramento/i,'Guida 06 senza distinzione fra cessione e pignoramento');
const guida08=fs.readFileSync(path.join(root,filenames[7]),'utf8');
assert.match(guida08,/articolo 70, comma 4/i,'Guida 08 senza norma sulle misure protettive');
assert.match(guida08,/Presentare una domanda all.OCC non equivale/i,'Guida 08 senza avviso OCC non sospende');
assert.match(guida08,/Tre anni di controlli sulle nuove utilità/i,'Guida 08 senza limite all.esdebitazione incapiente');
const css=fs.readFileSync(path.join(root,'style.css'),'utf8');
assert.ok(css.includes('.rubrica-debiti'),'Stili dedicati Rubrica 03');
console.log('OK: '+inspected+' pagine HTML, 9 immagini presenti con percorsi distinti, navigazione interna e riferimenti critici.');
console.log('NB: il controllo non verifica somiglianza visiva delle immagini, HTTP dei link esterni o navigazione offline su dispositivo reale.');
