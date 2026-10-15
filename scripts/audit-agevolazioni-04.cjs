'use strict';
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const file='agevolazioni-guida-04-esenzioni-ticket-fvg.html';
const guide=read(file),index=read('agevolazioni-diritti.html'),home=read('index.html'),map=read('sitemap.xml'),app=read('app/main.js');
for(const [name,html] of [[file,guide],['agevolazioni-diritti.html',index]]){
 assert.equal((html.match(/<h1\b/gi)||[]).length,1,name+': titolo H1 non unico');
 assert.match(html,/<main id="contenuto"/i,name+': main');
 assert.match(html,/<meta name="description"/i,name+': metadescrizione');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,new Set(ids).size,name+': id duplicati');
 for(const a of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(a[1]),name+': ancora senza destinazione #'+a[1]);
 for(const img of html.matchAll(/<img\b[^>]*>/gi))assert.match(img[0],/\balt="[^"]*"/i,name+': alt immagine mancante');
 let open=false;
 for(const tag of html.matchAll(/<\/?p\b[^>]*>/gi)){
  if(tag[0].startsWith('</')){assert.ok(open,name+': paragrafo chiuso due volte '+tag.index);open=false}
  else{assert.ok(!open,name+': paragrafo annidato '+tag.index);open=true}
 }
 assert.ok(!open,name+': paragrafo non chiuso');
}
assert.match(guide,/<meta name="robots" content="index,follow"/);
assert.ok(guide.includes('rel="canonical"'),'Guida non ha canonical');
assert.match(index,/<meta name="robots" content="index,follow">/,'Rubrica Agevolazioni aperta all’indicizzazione');
assert.ok(index.includes('href="'+file+'"'),'Guida 04 non nel menu rubrica');
assert.ok(home.includes('4 guide operative disponibili'),'Contatore homepage erroneo');
assert.ok(home.includes('agevolazioni-diritti.html#guide'),'Link homepage a rubrica manca');
assert.ok(map.includes('/Per-Me/'+file),'Guida 04 non in sitemap');
assert.ok(guide.includes('agevolazioni-guida-03-trasporti-fvg.html'),'Manca link precedente');
assert.ok(app.includes("['agevolazioni-diritti.html','Agevolazioni e diritti']"),'App non elenca Rubrica 04');
assert.ok(app.includes("doc.querySelectorAll('main a[href]')"),'App non acquisisce guide Rubrica 04');
for(const section of ['reddito','disoccupazione','patologie','invalidita','farmaci','percorso','sportelli','rimborso','esempi','errori','fonti']){
 assert.ok(guide.includes('id="'+section+'"'),'Sezione non trovata '+section);
}
for(const phrase of ['E01','E02','E03','E04','36.151,98','8.263,31','11.362,05','516,46','31 dicembre','31 marzo','CIG','013','C01','C02','C03','dal 67% al 99%','fascia A','differenza di prezzo','0432 780233','0432 1796345','almeno due giorni','rimborso']){
 assert.ok(guide.includes(phrase),'Condizione essenziale non trovata '+phrase);
}
// Requisiti ad alto rischio di fraintendimento: non eliminare in revisioni successive.
for(const phrase of [
  "E03, invece, dipende dalla titolarità",
  "precedente rapporto di lavoro dipendente",
  "al momento della prescrizione",
  "autonoma",
  "annullo o revoca dell'autocertificazione",
  "gratuita",
  "più patologie croniche",
  "non estende automaticamente la gratuità ai medicinali",
  "0432 780230",
  "0432 780233",
  "residenti nel territorio aziendale",
  "30 giorni",
]){
 assert.ok(guide.includes(phrase),'Seconda revisione Guida 04: requisito critico non presente: '+phrase);
}
for(const u of [
 'it/faq/faq-esenzioni-malattie-croniche/',
 'it/strutture/dir_sanitaria/dip_assistenza_territoriale/distretto_tarcento/servizi_amministrativi/anagrafe_sanitaria/',
]){
 assert.ok(guide.includes(u),'Fonte aggiuntiva revisione Guida 04 assente: '+u);
}
for(const host of ['asufc.sanita.fvg.it','www.salute.gov.it'])assert.ok(guide.includes(host),'Manca fonte istituzionale '+host);
assert.ok(guide.includes('images.pexels.com/photos/8413217'),'Foto distinta assente');
assert.ok(guide.includes('SHVETS production / Pexels'),'Attribuzione foto non trovata');
assert.ok(!guide.includes('images.pexels.com/photos/15965909'),'Riutilizzata foto Guida 03');
const links=[...guide.matchAll(/href="([^"]+)"/g)].map(m=>m[1]).filter(x=>/\.html(?:#|$)/.test(x)&&!/^https?:/.test(x));
for(const link of links){const filePath=link.split('#')[0];assert.ok(fs.existsSync(path.join(root,filePath)),'Collegamento interno non esistente '+filePath)}
console.log('PASS: Esenzioni sanitarie FVG 2026, E01–E04, CIG, diabete, invalidità, ricette, farmacia, CUP, rimborsi, link, SEO e PWA.');
console.log('LIMITI: test statico, non verifica visite presso CUP, tariffe individuali, accesso con CIE, caricamento foto o uso Android offline reale.');
