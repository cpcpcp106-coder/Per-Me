'use strict';
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const guideName='agevolazioni-guida-01-isee-corrente.html';
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const guide=read(guideName),rubric=read('agevolazioni-diritti.html'),home=read('index.html'),sitemap=read('sitemap.xml');
const app=read('app/main.js');
assert.equal((guide.match(/<h1\b/g)||[]).length,1,'Un solo titolo H1');
assert.match(guide,/<meta name="robots" content="index,follow">/);
assert.match(guide,/<link rel="canonical" href="https:\/\/cpcpcp106-coder.github.io\/Per-Me\/agevolazioni-guida-01-isee-corrente.html">/);
assert.match(guide,/<meta name="description"/);
assert.match(guide,/<main id="contenuto"/);
assert.match(guide,/<figure class="isee-hero">/);
assert.match(guide,/<img[^>]+alt="Fotografia realistica:/);
assert.match(guide,/Vitaly Gariev/,'Crediti della fotografia');
assert.ok(!guide.includes('assets/debiti-guida-'),'Non riusare una fotografia della Rubrica Debiti');
const ids=[...guide.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(new Set(ids).size,ids.length,'ID univoci');
for(const m of guide.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(m[1]),'Ancora senza destinazione '+m[1]);
assert.ok(rubric.includes('href="'+guideName+'"'),'Guida 01 assente dalla Rubrica 04');
assert.ok(home.includes('href="agevolazioni-diritti.html#guide"')||home.includes('href="'+guideName+'"'),'La home deve raggiungere l\'indice o la guida 01');
assert.ok(sitemap.includes('/Per-Me/'+guideName),'Pagina presente nella sitemap');
assert.ok(rubric.includes('id="guide"'),'Indice guide con destinazione #guide');
assert.ok(rubric.includes('noindex,follow'),'Indice in costruzione non indicizzato');
assert.ok(!guide.includes('noindex,nofollow'),'Guida autonoma indicizzabile');
const must=[
 '31 dicembre 2024','31 dicembre 2025','31 dicembre 2026','superiore al 25%',
 'superiore al 20%','dal 1° aprile','ultimi 2 mesi','ultimi 12 mesi',
 '6 mesi','entro due mesi','documenti','modello MS',
 '120 giorni','12 mesi continuativi','ragione della condizione di disabilità',
 'Se aggiorni prima il reddito e poi il patrimonio','non compresi nel reddito complessivo ai fini IRPEF'
];
for(const key of must)assert.ok(guide.includes(key),'Contenuto essenziale mancante: '+key);
assert.ok((guide.match(/<section\b/g)||[]).length>=11,'Minimo 11 blocchi tematici');
const sources=[...guide.matchAll(/href="https:\/\/(www\.inps\.it|www\.lavoro\.gov\.it|servizi2\.inps\.it)[^"]+"/g)];
assert.ok(sources.length>=7,'Set di fonti primarie');
assert.ok(app.includes("['agevolazioni-diritti.html','Agevolazioni e diritti']"),'Rubrica 04 registrata nella app');
assert.ok(app.includes("doc.querySelectorAll('main a[href]')"),'App estrae i link guide dalle rubriche');
for(const phrase of ['quattro categorie di variazione','Quadro S5','giacenza media','bonus ARERA','agevolazioni-guida-02-bonus-sociali.html']) assert.ok(guide.includes(phrase),'Revisione ISEE incompleta: '+phrase);
let paragraphOpen=false;
for(const tag of guide.matchAll(/<\/?p\b[^>]*>/gi)){
  const closing=tag[0].startsWith('</');
  assert.ok(closing?paragraphOpen:!paragraphOpen,'Paragrafo HTML annidato o chiuso senza apertura alla posizione '+tag.index);
  paragraphOpen=!closing;
}
assert.ok(!paragraphOpen,'Ultimo paragrafo rimasto aperto');
console.log('PASS: Guida 01 ISEE 2026, navigazione, fonti, contenuti chiave, indicizzazione e scoperta dalla PWA.');
console.log('Limiti: il test non misura accuratezza dei link remoti, resa visiva o memorizzazione reale offline su Android.');
assert.ok(guide.includes('Decreto-Dip-3-del-02032026-ISEE.pdf'),'Testo normativo integrale mancante');
