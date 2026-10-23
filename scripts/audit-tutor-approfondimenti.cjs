'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const guides=[
 ['tutor-ai-conversazione-correzioni.html','dialogo'],
 ['tutor-ai-verifica-fonti-date.html','fonti'],
 ['tutor-ai-riassumere-confrontare.html','confronto'],
 ['tutor-ai-privacy-truffe.html','sicurezza'],
 ['tutor-ai-quando-chiedere-aiuto.html','professionisti']
];
const home=read('tutor-ai.html'),sitemap=read('sitemap.xml'),app=read('app/main.js'),appHtml=read('app/index.html'),sw=read('app/sw.js');
let checked=0;
for(const [file,photo] of guides){
 const html=read(file);
 const asset='assets/tutor-ai-'+photo+'-originale.webp';
 assert.ok(fs.existsSync(path.join(root,asset)),'Foto originale mancante: '+asset);
 const img=html.match(/<img\b[^>]*src="([^"]*tutor-ai-[^"]*)"[^>]*>/g)||[];
 assert.equal(img.length,1,'Una foto per guida '+file);
 assert.ok(img[0].includes(asset),'Foto non coerente '+file);
 assert.ok(/\balt="[^"]+"/.test(img[0]),'Alt obbligatorio '+file);
 assert.equal((html.match(/<h1\b/g)||[]).length,1,'Un solo h1 '+file);
 assert.equal((html.match(/<blockquote id="prompt-/g)||[]).length,2,'Due esercizi '+file);
 const prompts=[...html.matchAll(/<blockquote id="(prompt-[^"]+)"/g)].map(m=>m[1]);
 const buttons=[...html.matchAll(/<button\b[^>]*data-copy="([^"]+)"/g)].map(m=>m[1]);
 assert.deepEqual(prompts,buttons,'Corrispondenza prompt e pulsanti '+file);
 assert.ok(html.includes('role="status"'),'Manca messaggio accessibile '+file);
 assert.ok(html.includes('<details>')&&html.includes('<summary>'),'Manca autoverifica '+file);
 assert.ok(html.includes('www.facebook.com/PerMeGuide'),'Manca canale FB '+file);
 assert.ok(html.includes('non')||html.includes('Non'),'Manca limite dichiarato '+file);
 const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
 assert.equal(scripts.length,1,'Uno script per copia '+file);
 new vm.Script(scripts[0],{filename:file});
 assert.ok(!/\bfetch\s*\(|XMLHttpRequest|sendBeacon\s*\(/.test(scripts[0]),'Copia non deve inviare dati '+file);
 assert.ok(sitemap.includes('/Per-Me/'+file),'URL assente sitemap '+file);
 assert.ok(home.includes('href="'+file+'"'),'Collegamento rubrica assente '+file);
 assert.ok(app.includes("if(path==='"+file+"')addTutorCopyControls()"),'Copia PWA non attiva '+file);
 for(const id of prompts)assert.ok(app.includes("'"+id+"'"),'Etichetta PWA assente '+id);
 assert.ok(html.includes('rel="canonical"')&&html.includes('content="index,follow"'),'SEO basilare assente '+file);
 checked++;
}
assert.ok(appHtml.includes('src="main.js?v=13"'));
assert.ok(sw.includes("'./main.js?v=13'"));
assert.ok(sw.includes("perme-reader-v17-20261023-tutor-completo"));
new vm.Script(app,{filename:'app/main.js'});
console.log('PASS Tutor AI approfondimenti: '+checked+' guide originali, 10 prompt e controlli di accessibilita, privacy, PWA, sitemap e sintassi.');
console.log('LIMITI: non certifica Android fisico, caricamento visivo o comprensione con lettori.');
