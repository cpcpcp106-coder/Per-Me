'use strict';
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const name='agevolazioni-guida-02-bonus-sociali.html';
const guide=read(name),index=read('agevolazioni-diritti.html'),home=read('index.html'),sitemap=read('sitemap.xml'),app=read('app/main.js');
for(const [p,content] of [[name,guide],['agevolazioni-diritti.html',index]]){
 assert.equal((content.match(/<h1\b/gi)||[]).length,1,p+': H1 non unico');
 assert.match(content,/<main\b[^>]*id="contenuto"/,p+': manca main');
 assert.match(content,/<meta\s+name="description"/,p+': manca descrizione');
 const ids=[...content.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,new Set(ids).size,p+': ID duplicati');
 for(const a of content.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(a[1]),p+': collegamento interno senza destinazione #'+a[1]);
 for(const img of content.matchAll(/<img\b[^>]*>/g))assert.match(img[0],/\balt="[^"]*"/,p+': alt mancante');
}
assert.ok(guide.includes('content="index,follow"'),'Guida 02 esclusa dall’indicizzazione');
assert.ok(index.includes('noindex,follow'),'Indice rubrica incompleta indicizzato');
assert.ok(guide.includes('rel="canonical"'),'Manca canonical');
assert.ok(index.includes('href="'+name+'"'),'Guida 02 assente dall’indice');
assert.ok(home.includes('href="agevolazioni-diritti.html#guide"'),'Home non punta all’elenco Rubrica 04');
assert.ok(home.includes('2 guide operative disponibili'),'Conteggio home incoerente');
assert.ok(sitemap.includes(name),'Guida 02 mancante dalla sitemap');
assert.ok(guide.includes('agevolazioni-guida-01-isee-corrente.html'),'Manca navigazione Guida 01');
assert.ok(guide.includes('href="agevolazioni-diritti.html#guide"'),'Manca ritorno alla rubrica');
assert.ok(app.includes("['agevolazioni-diritti.html','Agevolazioni e diritti']"),'Rubrica 04 assente dall app');
assert.ok(app.includes("doc.querySelectorAll('main a[href]')"),'App non estrae le guide dalla rubrica');
for(const phrase of ['9.796','20.000','4 figli a carico','25%','l\'anno successivo','2027','3–4 mesi','6–7 mesi','50 litri','146,00','186,15','204,40','21 febbraio 2026','115 euro','25.000 euro','PDR condominiale','apparecchiature elettromedicali salvavita','800 166 654','CAF UIL']){
 assert.ok(guide.includes(phrase),'Informazione istituzionale mancante: '+phrase);
}
assert.ok(guide.includes('images.pexels.com/photos/7545331'),'Fotografia unica mancante');
assert.ok(guide.includes('SHVETS production'),'Attribuzione fotografia mancante');
assert.ok(!guide.includes('assets/debiti-guida-'),'Riutilizzata immagine Debiti');
assert.ok((guide.match(/<section\b/g)||[]).length>=13,'Guida non sufficientemente sviluppata');
assert.ok((guide.match(/www\.arera\.it/g)||[]).length>=10,'Fonti ARERA insufficienti');
const internalLinks=[...guide.matchAll(/href="([^"]+\.html(?:#[^"]*)?)"/g)].map(m=>m[1]).filter(x=>!/^https?:/.test(x));
for(const ref of internalLinks){const f=ref.split('#')[0];assert.ok(fs.existsSync(path.join(root,f)),name+': file collegato inesistente '+f)}
for(const phrase of ['TEFA','componenti perequative','40 giorni','30 giugno','0,5 MWh','3 MWh','crediti certi, liquidi ed esigibili','indicatore specifico']) assert.ok(guide.includes(phrase),'Revisione ARERA incompleta: '+phrase);
let paragraphOpen=false;
for(const tag of guide.matchAll(/<\\/?p\\b[^>]*>/gi)){
  const closing=tag[0].startsWith('<'+'/');
  assert.ok(closing?paragraphOpen:!paragraphOpen,'Paragrafo HTML annidato o chiuso senza apertura alla posizione '+tag.index);
  paragraphOpen=!closing;
}
assert.ok(!paragraphOpen,'Ultimo paragrafo rimasto aperto');
console.log('PASS: bonus 2026 ARERA, soglie, requisiti, date TARI, altri bonus, immagine distinta, navigazione, SEO e scoperta PWA.');
console.log('Limiti: nessuna verifica visiva di browser Android, download fotografico o raggiungibilita HTTP di tutte le fonti.');
