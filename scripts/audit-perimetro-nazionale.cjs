'use strict';
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const htmlNames=fs.readdirSync(root).filter(p=>p.endsWith('.html')&&!p.startsWith('google'));
const get=p=>fs.readFileSync(path.join(root,p),'utf8');
const rubrica=get('agevolazioni-diritti.html'),home=get('index.html'),about=get('chi-siamo.html');
assert.match(home,/Italia · gratuito|Per tutta Italia/,'Home non nazionale');
const countMatch=home.match(/<strong>(\d+) risorse disponibili<\/strong>/);
assert.ok(countMatch,'La home deve mostrare il totale delle risorse della rubrica');
assert.equal(Number(countMatch[1]),(rubrica.match(/class="a04-guide-card"/g)||[]).length,'Il totale della home deve coincidere con le schede realmente presenti nella Rubrica 04');
assert.ok(rubrica.includes('Guide nazionali — per tutta Italia')&&rubrica.includes('Schede regionali: soltanto Friuli Venezia Giulia'),'Perimetro nazionale e regionale devono restare distinti');
if(home.includes('ritratto-enrico.webp')) assert.match(home,/<figcaption>Enrico TIRABASSO<br><time datetime="1961-01-10">10\/gennaio\/1961<\/time><\/figcaption>/,'Il ritratto dell’autore deve mantenere la didascalia espressamente richiesta');
// La breve presentazione dell'autore in home e' autorizzata: non trasformarla in criterio delle guide nazionali.
assert.match(rubrica,/Guide nazionali — per tutta Italia/,'Manca gruppo nazionale');
assert.match(rubrica,/Schede regionali: soltanto Friuli Venezia Giulia/,'Manca distinzione regionale');
assert.match(rubrica,/<meta name="robots" content="index,follow"/,'Indice non indicizzabile');
assert.match(about,/in tutta Italia/i,'Pagina progetto senza perimetro nazionale');
for(const f of ['agevolazioni-guida-03-trasporti-fvg.html','agevolazioni-guida-04-esenzioni-ticket-fvg.html'])assert.match(get(f),/SOLO FRIULI VENEZIA GIULIA — SCHEDA REGIONALE/,'Scheda non marcata come locale: '+f);
const exceptions=new Set(['agevolazioni-guida-04-esenzioni-ticket-fvg.html']);
for(const file of htmlNames){
 const html=get(file);
 assert.ok(!/Io mi sono appoggiato|mi sono rivolto al CAF UIL|Patronato ITAL UIL|CAF UIL/i.test(html),file+': testo promozionale in una pagina pubblica');
 if(file!=='index.html')assert.ok(!/Enrico Tirabasso|10\/gennaio\/1961|1961-01-10/i.test(html),file+': dati biografici ripetuti fuori dalla presentazione in home');
 if(!exceptions.has(file))assert.ok(!/Tarcento|Racchiuso|Attimis/i.test(html),file+': luogo personale presente in pagina non regionale');
 assert.ok(!/Sito in costruzione\s*·\s*Contenuti in verifica|Versione di lavoro non pubblicata/i.test(html),file+': vecchio footer fuorviante');
}
const legacy=get('app-content.json');
assert.ok(!/Tarcento|CAF UIL|ITAL UIL|Io mi sono appoggiato/i.test(legacy),'La copia dati storica PWA mantiene personalizzazioni');
for(const file of ['REGOLE-AGGIORNAMENTO-APP-E-SITO.md','FONTI/REGOLE-SITO-APP-PER-ME-2026-10-14.md']){
 const p=get(file);assert.ok(!/Io mi sono appoggiato al CAF UIL|Patronato ITAL UIL di Tarcento/i.test(p),file+': regola superata ancora vincolante');
}
console.log('PASS: perimetro nazionale, guide regionali marcate, rimozione riferimenti personali, homepage, SEO e catalogo storico su '+htmlNames.length+' pagine HTML.');
