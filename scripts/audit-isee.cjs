'use strict';
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const guide='agevolazioni-guida-01-isee-corrente.html';
const index=fs.readFileSync(path.join(root,'agevolazioni-diritti.html'),'utf8');
const html=fs.readFileSync(path.join(root,guide),'utf8');
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
const app=fs.readFileSync(path.join(root,'app/main.js'),'utf8');
for(const [name,doc] of [[guide,html],['agevolazioni-diritti.html',index]]){
 assert.equal((doc.match(/<h1\b/gi)||[]).length,1,name+': un solo h1');
 assert.ok(/<meta\s+name="description"/i.test(doc),name+': meta descrizione');
 assert.ok(/<main\b[^>]*\bid="contenuto"/i.test(doc),name+': main');
 const ids=new Set([...doc.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]));
 for(const match of doc.matchAll(/href="#([^"]+)"/g))assert.ok(ids.has(match[1]),name+': ancora #'+match[1]);
 for(const match of doc.matchAll(/<img\b[^>]*>/g))assert.ok(/\balt="[^"]*"/.test(match[0]),name+': alt immagine');
}
assert.ok(index.includes('href="'+guide+'"'),'Indice senza la guida');
assert.ok(index.includes('id="guide"'),'Indice senza ancora guide');
assert.ok(html.includes('href="agevolazioni-diritti.html#guide"'),'Ritorno alla rubrica assente');
assert.ok(html.includes('rel="canonical"'),'Guida senza canonical');
assert.ok(html.includes('content="index,follow"'),'Guida non pubblicamente indicizzabile');
assert.ok(sitemap.includes(guide),'Guida assente dalla sitemap');
for(const anchor of ['requisiti','documenti','domanda','validita','fonti','errori','specifici'])assert.ok(html.includes('id="'+anchor+'"'),'Manca sezione '+anchor);
for(const phrase of ['superiore al 25%','superiore al 20%','ultimi 2 mesi','ultimi 12 mesi','31 dicembre 2026','6 mesi','CAF UIL'])assert.ok(html.includes(phrase),'Manca requisito '+phrase);
for(const u of ['www.inps.it','www.lavoro.gov.it'])assert.ok(html.includes(u),'Manca riferimento istituzionale '+u);
assert.ok(app.includes("['agevolazioni-diritti.html','Agevolazioni e diritti']"),'Rubrica 04 assente dall elenco categorie app');
assert.ok(app.includes("doc.querySelectorAll('main a[href]')"),'L app non ricerca collegamenti nelle rubriche');
const mainAnchors=[...html.matchAll(/href="([^"]+)"/g)].map(x=>x[1]).filter(x=>/\.html/.test(x) && !/^https?:/.test(x));
for(const link of mainAnchors){let file=link.split('#')[0];assert.ok(fs.existsSync(path.join(root,file)),guide+': link interno a file inesistente '+file);}
console.log('PASS: guida ISEE, indice Rubrica 04, ancore, documenti, fonti, sitemap, scoperta app.');
console.log('NOTA: link esterni e caricamento immagine verificabili solo con un browser collegato; test su Android non eseguito.');
