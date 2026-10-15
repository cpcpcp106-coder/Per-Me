'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const guide='salute-guida-02-cardiopatia-ischemica-infarto-stent-bypass.html';
const diabetes='diabete-tipo-2.html',diet='dieta-mediterranea-scientifica.html';
const map=read('sitemap.xml'),home=read('index.html'),hub=read('salute-autonomia.html');
const pwa=read('app/main.js'),appPage=read('app/index.html'),sw=read('app/sw.js');
const reg=JSON.parse(read('FONTI/registro-diritti-immagini.json'));
for(const file of [guide,diabetes,diet]){
 const html=read(file);
 assert.equal((html.match(/<h1\b/gi)||[]).length,1,'Un solo H1: '+file);
 assert.match(html,/<meta name="robots" content="index,follow"/,'Indicizzazione: '+file);
 assert.ok(html.includes('https://cpcpcp106-coder.github.io/Per-Me/'+file),'Canonical: '+file);
 assert.ok(map.includes('/Per-Me/'+file+'</loc>'),'Sitemap: '+file);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length,'Id duplicato: '+file);
 for(const anchor of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(anchor[1]),'Ancora mancante '+file+': '+anchor[1]);
 for(const tag of ['article','main','section','figure','h2','p','li','ul','ol']){
  const n=(html.match(new RegExp('<'+tag+'(?:\\s|>)','gi'))||[]).length;
  const c=(html.match(new RegExp('</'+tag+'>','gi'))||[]).length;
  assert.equal(n,c,'Tag HTML sbilanciato '+file+': '+tag);
 }
 assert.match(html,/<figure class="(?:g2-photo|foto-guida)">/,'Foto editoriale mancante: '+file);
 const image=html.match(/<figure class="(?:g2-photo|foto-guida)">[\s\S]*?<img[^>]*>/i)?.[0];
 assert.ok(image&&/\balt="[^"]{20,}"/i.test(image),'Alt descrittivo mancante '+file);
 assert.ok(html.includes('https://www.pexels.com/license/'),'Licenza immagine non citata: '+file);
 const listed=reg.stock.filter(x=>x.used_in===file);
 assert.equal(listed.length,1,'Foto non registrata univocamente '+file);
 assert.ok(image.includes('/photos/'+listed[0].photo_id+'/'),'Immagine differente da registro: '+file);
 assert.equal(listed[0].verification,'LICENZA_PIATTAFORMA_VERIFICATA','Licenza non documentata '+file);
 assert.ok(!/Tarcento|Attimis|Racchiuso|ASUFC|Udine/i.test(html),'Personalizzazione geografica indebita');
}
const cardiology=read(guide),diab=read(diabetes),med=read(diet);
for(const x of ['112 o il 118','angioplastica','bypass','angina','scompenso','diabete tipo 2','antiaggreganti','Heart Team','ictus','maculopatia','neuropatia']){
 assert.ok(cardiology.toLowerCase().includes(x.toLowerCase()),'Argomento Guida 02 assente: '+x);
}
for(const host of ['www.salute.gov.it','www.escardio.org'])assert.ok(cardiology.includes(host),'Fonti cardio mancanti: '+host);
assert.ok(cardiology.includes('non ogni cardiopatia')||cardiology.includes('non significa che ogni cardiopatia'),'Confusione causa diabete');
assert.ok(diab.includes('non tutte le neuropatie')&&diab.includes('rischio aumenta'),'Differenze causali patologie non chiarite');
assert.ok(diab.includes('10 guide')&&med.includes('8 guide'),'Calendario guide non esplicitato');
assert.ok(med.includes('11 milioni')&&med.includes('195 Paesi'),'Studio Lancet non integrato');
assert.ok(med.includes('non era un esperimento sulla dieta mediterranea'),'Limite studio Lancet mancante');
assert.ok(med.includes('10.1016/S0140-6736(19)30041-8'),'DOI Lancet mancante');
assert.ok(med.includes('10.1056/NEJMoa1800389'),'Trial PREDIMED non distinto');
assert.ok(home.includes('Tutte e otto le rubriche')&&((home.match(/<article class="card">/g)||[]).length===8),'Home non presenta otto rubriche');
for(const file of [guide,diabetes,diet])assert.ok(home.includes(file)||hub.includes(file),'Non raggiungibile dalla home/rubrica: '+file);
for(const [file,label] of [[diabetes,'Diabete tipo 2'],[diet,'Dieta mediterranea scientifica']]){
 assert.ok(pwa.includes("['"+file+"','"+label+"']"),'Rubrica non aggiunta alla PWA: '+file);
}
assert.ok(pwa.includes('!pages.has(found)'),'Conflitto categorico in sincronizzazione PWA');
assert.ok(appPage.includes('delle otto rubriche'),'App dichiara ancora il vecchio numero di rubriche');
assert.ok(appPage.includes('main.js?v=11')&&sw.includes('main.js?v=11'),'Cache PWA non aggiornata');
new vm.Script(pwa,{filename:'app/main.js'});
console.log('PASS Guida 02 e rubriche Diabete e Dieta: otto rubriche, fonti, foto, SEO, Lancet, sicurezza, PWA.');
console.log('LIMITI: controllo statico, non un collaudo clinico o Android fisico.');
