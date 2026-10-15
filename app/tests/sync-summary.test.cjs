'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const appDir=path.resolve(__dirname,'..');
const main=fs.readFileSync(path.join(appDir,'main.js'),'utf8');
const html=fs.readFileSync(path.join(appDir,'index.html'),'utf8');
const css=fs.readFileSync(path.join(appDir,'app.css'),'utf8');
const sw=fs.readFileSync(path.join(appDir,'sw.js'),'utf8');

test('Script app e service worker: sintassi JavaScript valida',()=>{
 assert.doesNotThrow(()=>new vm.Script(main));
 assert.doesNotThrow(()=>new vm.Script(sw));
});
const start=main.indexOf('function compareGuides(');
const end=main.indexOf('function renderSyncSummary()',start);
assert.ok(start>=0&&end>start,'Funzione compareGuides rilevata');
const compare=vm.runInNewContext(main.slice(start,end)+'\ncompareGuides');
const plain=(value)=>JSON.parse(JSON.stringify(value));
test('Prima sincronizzazione: tutte nuove',()=>{
 assert.deepEqual(plain(compare([],[{path:'guida-a.html',content:'Prima versione'}])),
 {added:1,modified:0,unchanged:0});
});
test('Sincronizzazione successiva: nuove, aggiornate, invariate',()=>{
 const old=[{path:'a.html',title:'A',content:'v1'},{path:'b.html',title:'B',content:'stabile'}];
 const next=[{path:'a.html',title:'A',content:'v2'},{path:'b.html',title:'B',content:'stabile'},{path:'c.html',title:'C',content:'nuova'}];
 assert.deepEqual(plain(compare(old,next)),{added:1,modified:1,unchanged:1});
});
test('Cambio solo nella classificazione o nel sommario conta come aggiornamento',()=>{
 const old=[{path:'x.html',category:'Debiti',summary:'Prima'},{path:'y.html',title:'Originale'}];
 const next=[{path:'x.html',category:'Lavoro',summary:'Prima'},{path:'y.html',title:'Corretto'}];
 assert.deepEqual(plain(compare(old,next)),{added:0,modified:2,unchanged:0});
});
test('Assenza di modifiche: soltanto invariate',()=>{
 assert.deepEqual(plain(compare([{path:'x.html',content:'Identico'}],[{path:'x.html',content:'Identico'}])),
 {added:0,modified:0,unchanged:1});
});
test('Archivio esistente preservato e risultato sincronizzazione memorizzato',()=>{
 assert.ok(main.includes("const KEY='perme-app-offline-20261014'"));
 assert.ok(main.includes('lastSync:model.lastSync'));
 assert.ok(main.includes('renderSyncSummary();renderList()'));
});
test('Interfaccia con contatori, stili e cache coerenti',()=>{
 for(const id of ['sync-summary','sync-summary-title','sync-added','sync-modified','sync-unchanged','sync-summary-note'])
  assert.ok(html.includes('id="'+id+'"'),id);
 assert.ok(css.includes('.sync-summary[hidden]'));
 const scriptHref=html.match(/src="(main\\.js\\?v=\\d+)"/)?.[1];
 assert.ok(scriptHref,'Versione JavaScript nel documento');
 assert.ok(sw.includes('./'+scriptHref),'Il service worker deve precacheare la stessa versione di JS');
 const cssHref=html.match(/href="(app\.css\?v=\d+)"/)?.[1];
 assert.ok(cssHref,'Versione stylesheet nel documento');
 assert.ok(sw.includes('./'+cssHref),'Il service worker deve precacheare la stessa versione del CSS');
});

test('Il Tutor AI puo copiare sei prompt anche offline',()=>{
 assert.ok(main.includes('function addTutorCopyControls()'));
 assert.ok(main.includes("if(path==='tutor-ai.html')addTutorCopyControls()"));
 for(const id of ['prompt-avviso','prompt-messaggio','prompt-lista','prompt-domande','prompt-verifica','prompt-correzione'])
  assert.ok(main.includes("'"+id+"'"),id);
 assert.ok(css.includes('.reader-content .prompt-copy'));
 assert.ok(sw.includes('perme-reader-v12-20261015-tutor'));
});
