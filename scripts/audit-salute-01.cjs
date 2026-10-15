'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
const page='salute-guida-01-preparare-visita.html',html=read(page);
const section=read('salute-autonomia.html'),app=read('app/main.js'),sitemap=read('sitemap.xml');
assert.equal((html.match(/<h1\b/gi)||[]).length,1,'La pagina deve avere un solo titolo principale');
assert.match(html,/<meta name="robots" content="index,follow"/,'La guida deve essere indicizzabile');
assert.match(html,/<link rel="canonical" href="https:\/\/cpcpcp106-coder.github.io\/Per-Me\/salute-guida-01-preparare-visita.html"/,'URL canonico non corretto');
assert.match(html,/<main\b[^>]*id="contenuto"/,'Contenuto principale non disponibile');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
assert.equal(ids.length,new Set(ids).size,'Identificativi duplicati');
for(const m of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(m[1]),'Collegamento interno mancante '+m[1]);
for(const tag of ['p','li','ul','ol','section','div','nav','main','article','h1','h2']){
 const count=t=>(html.match(new RegExp('<'+t+'(?:\\s|>)','gi'))||[]).length;
 const close=(html.match(new RegExp('</'+tag+'>','gi'))||[]).length;
 assert.equal(count(tag),close,'Tag HTML non bilanciato: '+tag);
}
for(const m of html.matchAll(/<img\b[^>]*>/gi))assert.match(m[0],/\balt="[^"]*"/i,'Immagine senza alt');
for(const cue of ['112 o il 118','dolore o oppressione al petto','forte difficoltà respiratoria','debolezza improvvisa','difficoltà improvvisa a parlare','Non guidare da solo','Non aspettare','grave alterazione dello stato di coscienza']){
 assert.ok(html.toLowerCase().includes(cue.toLowerCase()),'Avvertenza di sicurezza mancante: '+cue);
}
for(const cue of ['medicinali realmente assunti','integratori','allergie','Fascicolo Sanitario Elettronico','Raccomandazione 17','emoglobina glicata','HbA1c','occhi, reni, nervi, piedi','tre domande','Scheda semplice','chi coordina','lista aggiornata','2012','non linee guida cliniche aggiornate']){
 assert.ok(html.toLowerCase().includes(cue.toLowerCase()),'Elemento assistenziale o fonte mancante: '+cue);
}
for(const host of ['www.salute.gov.it','www.epicentro.iss.it','www.crea.gov.it'])assert.ok(html.includes(host),'Fonti ufficiali mancanti: '+host);
for(const url of [
 'https://www.salute.gov.it/new/it/tema/112-118-e-pronto-soccorso/il-numero-118-e-il-numero-di-emergenza-unico-europeo-112/',
 'https://www.salute.gov.it/new/it/pubblicazione/raccomandazione-n-17-riconciliazione-della-terapia-farmacologica/',
 'https://www.salute.gov.it/new/it/tema/diabete/diabete-mellito-tipo-2/',
 'https://www.salute.gov.it/new/it/tema/malattie-cardio-cerebrovascolari/infarto-miocardico/'
])assert.ok(html.includes(url),'Fonte di sicurezza assente: '+url);
assert.ok(!/Tarcento|Attimis|Racchiuso|ASUFC|Udine/i.test(html),'La guida deve avere rilevanza nazionale');
assert.ok(!/mg\/dl\s*<|mg\/dl\s*>|HbA1c\s*<|HbA1c\s*>/.test(html),'Soglie cliniche individuali non ammesse');
assert.match(section,/href="salute-guida-01-preparare-visita.html"/,'La pagina deve essere raggiungibile dalla rubrica');
assert.match(sitemap,/salute-guida-01-preparare-visita.html/,'Guida non presente in sitemap');
assert.match(app,/\['salute-autonomia.html','Salute e autonomia'\]/,'Rubrica non presente nella PWA');
assert.match(app,/doc.querySelectorAll\('main a\[href\]'\)/,'PWA non sincronizza le guide');
new vm.Script(app,{filename:'app/main.js'});
console.log('PASS Salute 01: emergenze, terapia, diabete, cuore, percorso pratico, fonti datate dichiarate, strutture, sito nazionale e PWA.');
console.log('LIMITI: test statico; non e una revisione clinica professionale ne una prova su dispositivo Android.');
