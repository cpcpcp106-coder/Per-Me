'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const guide='salute-guida-02-cardiopatia-ischemica-infarto-stent-bypass.html';
const diabetes='diabete-tipo-2.html',diet='dieta-mediterranea-scientifica.html';
const map=read('sitemap.xml'),home=read('index.html'),hub=read('salute-autonomia.html');
const rights=read('agevolazioni-diritti.html');
const social=read('FONTI/QUADRO-TRASVERSALE-ANZIANI-DIABETE-CARDIOPATIA-REDDITO-CIBO-TUTELE-2026-10-15.md');
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
assert.ok(/non significa che ogni cardiopatia/i.test(cardiology),'Confusione causa diabete');
assert.ok(diab.includes('non tutte le neuropatie')&&diab.includes('rischio aumenta'),'Differenze causali patologie non chiarite');
assert.equal((diab.match(/<li><strong>Guida \d\d:<\/strong>/g)||[]).length,30,'Trenta guide diabete pianificate');
assert.ok(diab.includes('95 condizioni')&&diab.includes('CENSIMENTO-PATOLOGIE-DIABETE-TIPO-2'),'Mancano repertorio critico e fonti');
const inventory=read('FONTI/CENSIMENTO-PATOLOGIE-DIABETE-TIPO-2-2026-10-15.md');
const clinicItems=[...inventory.split('## Revisioni critiche finali')[0].matchAll(/^(\d+)\. /gm)].map(m=>Number(m[1]));
assert.equal(clinicItems.length,95,'Il censimento deve mantenere 95 voci cliniche');
assert.ok(clinicItems.every((value,index)=>value===index+1),'Il censimento deve avere numerazione continua da 1 a 95');
for(const crucial of ['Retinopatia','Macular','Necrobiosi','Piede diabetico','Pancreatite','Metformina','Ipoacusia','Neuropatia','Parodontite'])assert.ok(inventory.toLowerCase().includes(crucial.toLowerCase()),'Patologia mancante dal censimento: '+crucial);

for(const cue of ['id="regola-15"','15 grammi','15 minuti','inferiore a 70 mg/dL','non darle cibo né bevande per bocca','112/118','glucagone','sistemi di somministrazione automatizzata','acarbosio','Guida 02:','Guida 27:']){
 assert.ok(diab.includes(cue),'Regola del 15 o eccezioni mancanti dalla rubrica diabete: '+cue);
}
for(const cue of ['Regola del 15 (15–15)','15 g di glucosio','ADA 2026','CDC, *Treatment','Non universale','ipoglicemia grave']){
 assert.ok(inventory.includes(cue),'Regola del 15 non documentata nel censimento: '+cue);
}
assert.equal((med.match(/<li><strong>Guida \d\d:<\/strong>/g)||[]).length,8,'Otto guide dieta pianificate');

for(const x of ['id="anziani-reddito"','pensione','cardiopatia','malnutrizione','agevolazioni-diritti.html#anziani-salute-reddito'])
 assert.ok(diab.toLowerCase().includes(x.toLowerCase()),'Anziani e accessibilita economica mancanti dalla rubrica diabete: '+x);
for(const x of ['id="costo-alimentare"','costo per porzione','prezzo al kg','sarcopenia','legumi','agevolazioni-diritti.html#anziani-salute-reddito'])
 assert.ok(med.toLowerCase().includes(x.toLowerCase()),'Costi, nutrienti e sostenibilita mancanti dalla dieta: '+x);
for(const x of ['id="anziani-salute-reddito"','Assegno di inclusione','invalidità','accompagnamento','pensione','ticket','dieta-mediterranea-scientifica.html#costo-alimentare'])
 assert.ok(rights.toLowerCase().includes(x.toLowerCase()),'Tutele, pensioni e aiuti mancanti dalla rubrica diritti: '+x);
for(const x of ['id="anziani-cure-reddito"','diabete-tipo-2.html#anziani-reddito','agevolazioni-diritti.html#anziani-salute-reddito'])
 assert.ok(hub.includes(x),'Percorso integrato mancante in Salute: '+x);
for(const x of ['INPS','ARERA','ADA','CREA','LEA','104/1992','accompagnamento','costo per porzione'])
 assert.ok(social.toLowerCase().includes(x.toLowerCase()),'Dossier interdisciplinare senza fonte/requisito: '+x);
assert.ok(rights.includes('Esplora tutte le otto rubriche'),'Numero rubriche non aggiornato');
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
