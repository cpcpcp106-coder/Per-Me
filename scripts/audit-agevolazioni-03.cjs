'use strict';
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const file='agevolazioni-guida-03-trasporti-fvg.html';
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const guide=read(file),rubric=read('agevolazioni-diritti.html'),home=read('index.html'),sitemap=read('sitemap.xml'),app=read('app/main.js');
for(const [name,html]of [[file,guide],['agevolazioni-diritti.html',rubric]]){
 assert.equal((html.match(/<h1\b/gi)||[]).length,1,name+': H1 unico');
 assert.match(html,/<main id="contenuto"/i,name+': main');
 assert.match(html,/<meta name="description"/i,name+': metadescrizione');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,new Set(ids).size,name+': ID duplicati');
 for(const match of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(match[1]),name+': ancora senza destinazione #'+match[1]);
 for(const match of html.matchAll(/<img\b[^>]*>/g))assert.match(match[0],/\balt="[^"]*"/,name+': immagine senza alt');
 let open=false;
 for(const match of html.matchAll(/<\/?p\b[^>]*>/gi)){
  if(match[0].startsWith('</')){assert.ok(open,name+': chiusura p non attesa '+match.index);open=false}
  else{assert.ok(!open,name+': p annidato '+match.index);open=true}
 }
 assert.ok(!open,name+': p non chiuso');
}
assert.match(guide,/<meta name="robots" content="index,follow"/);
assert.match(guide,/rel="canonical"/);
assert.ok(rubric.includes('href="'+file+'"'),'Guida 03 mancante indice');
assert.ok(home.includes('3 guide operative disponibili'),'Home non aggiornata');
assert.ok(sitemap.includes('/Per-Me/'+file),'Sitemap senza Guida 03');
assert.ok(guide.includes('href="agevolazioni-diritti.html#guide"'),'Ritorno alla rubrica assente');
assert.ok(guide.includes('agevolazioni-guida-02-bonus-sociali.html'),'Manca precedente guida');
assert.ok(app.includes("['agevolazioni-diritti.html','Agevolazioni e diritti']"),'PWA senza Rubrica 04');
assert.ok(app.includes("doc.querySelectorAll('main a[href]')"),'PWA non identifica link della rubrica');
for(const section of ['differenze','invalidita','domanda-invalidita','titoli','rinnovo','over65','treni','esempi','problemi','errori','fonti']){
 assert.ok(guide.includes('id="'+section+'"'),'Sezione assente: '+section);
}
for(const phrase of ['1,5%','98,5%','50%','65 anni','reddito complessivo','non quello ISEE','15 giorni','12 mesi solari','cinque percorsi','tesserino','SPID, CIE','Disability Card','Carta Blu','0432 279256','35.340 euro','non online','accompagnatore']){
 assert.ok(guide.includes(phrase),'Regola critica non dichiarata: '+phrase);
}
assert.ok(guide.includes('https://agilefvg.regione.fvg.it/susfe/a/avvio?idServizio=93389'),'Link AgileFVG non presente');
assert.ok(guide.includes('tplfvg.it/it/abbonamenti/disabilita/'),'Pagina TPL ufficiale non presente');
assert.ok(guide.includes('FOGLIA33/'),'Pagina regionale over 65 non presente');
assert.ok(guide.includes('images.pexels.com/photos/15965909'),'Nuova foto distinta assente');
assert.ok(!guide.includes('assets/debiti-guida-'),'Non riutilizzare foto Debiti');
const links=[...guide.matchAll(/href="([^"]+)"/g)].map(x=>x[1]).filter(x=>/\.html/.test(x)&&!/^https?:/.test(x));
for(const link of links)assert.ok(fs.existsSync(path.join(root,link.split('#')[0])),file+': link locale inesistente '+link);
console.log('PASS: FVG invalidita e over 65 2026, iscrizione, prezzi, eccezioni, HTML, SEO, links, PWA, immagine distinta.');
console.log('LIMITI: non misura disponibilita HTTP foto esterna, test Android, accesso SPID o esito reale di domanda.');
