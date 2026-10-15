'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),read=name=>fs.readFileSync(path.join(root,name),'utf8');
const html=read('tutor-ai.html'),app=read('app/main.js'),map=read('sitemap.xml'),home=read('index.html');
assert.equal((html.match(/<h1\b/g)||[]).length,1,'Un solo H1');
assert.match(html,/<meta name="robots" content="index,follow"/,'Tutor indicizzabile');
assert.match(html,/<meta name="description"/,'Descrizione');
assert.match(html,/<main\b[^>]*id="contenuto"/,'Main');
assert.match(html,/rel="canonical" href="https:\/\/cpcpcp106-coder.github.io\/Per-Me\/tutor-ai.html"/,'Canonical');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(ids.length,new Set(ids).size,'ID duplicati');
for(const m of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(m[1]),'Ancora non valida: '+m[1]);
const prompts=['prompt-avviso','prompt-messaggio','prompt-lista','prompt-domande','prompt-verifica','prompt-correzione'];
const buttons=[...html.matchAll(/<button\b[^>]*data-copy="([^"]+)"[^>]*>/g)];
assert.equal(buttons.length,prompts.length,'Sei pulsanti di copia richiesti');
for(const target of prompts){
 assert.equal(buttons.filter(b=>b[1]===target).length,1,'Pulsante assente o ripetuto per '+target);
 const m=html.match(new RegExp('<blockquote\\b[^>]*id="'+target+'"[^>]*>([\\s\\S]*?)<\\/blockquote>','i'));
 assert.ok(m,'Prompt assente '+target);assert.ok(m[1].replace(/<[^>]+>/g,' ').trim().length>35,'Prompt troppo breve '+target);
}
for(const a of html.matchAll(/<img\b[^>]*>/gi))assert.match(a[0],/\balt="[^"]*"/i,'Alt obbligatorio');
for(const tag of ['p','h2','blockquote','article','main','nav','div']){
 const opens=(html.match(new RegExp('<'+tag+'(?:\\s|>)','gi'))||[]).length;
 const closes=(html.match(new RegExp('</'+tag+'>','gi'))||[]).length;
 assert.equal(opens,closes,'Tag sbilanciato '+tag);
}
assert.match(html,/Dal telefono: tre passaggi/,'Istruzioni telefono');
assert.match(html,/Non incollare documenti reali/,'Protezione dati personali');
assert.match(html,/non è una chat AI incorporata nel sito/i,'Distinzione sito/servizio AI');
assert.match(html,/https:\/\/help.openai.com\/it-it\/articles\//,'Fonte errori AI in italiano');
assert.match(html,/www.garanteprivacy.it\/temi\/assistenti-digitali/,'Fonte Garante Privacy');
const script=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]).find(x=>x.includes("button[data-copy]"));
assert.ok(script,'Script di copia mancante');
new vm.Script(script,{filename:'tutor-ai-inline.js'});
for(const term of ["navigator.clipboard","document.execCommand('copy')","selezionaPrompt","status.textContent"])assert.ok(script.includes(term),'Fallback copia mancante '+term);
assert.ok(!/\bfetch\s*\(|XMLHttpRequest|sendBeacon\s*\(/.test(script),'La copia non deve inviare dati');
assert.match(map,/\/Per-Me\/tutor-ai.html/,'Tutor mancante sitemap');
assert.match(home,/href="tutor-ai.html"/,'Collegamento homepage');
assert.match(app,/\['tutor-ai.html','Tutor AI essenziale'\]/,'Tutor non incluso PWA');
assert.match(app,/function extract\(doc,src\)/,'Estrazione testi PWA assente');
assert.match(app,/SKIP_TAGS=new Set\('SCRIPT STYLE NAV/,'Script non deve finire nei testi offline');
assert.match(app,/SAFE_TAGS=new Set\('[^']*BLOCKQUOTE/,'Testi prompt preservati offline');
new vm.Script(app,{filename:'app/main.js'});
assert.match(app,/function addTutorCopyControls\(\)/,'Pulsanti offline PWA assenti');
assert.match(app,/if\(path==='tutor-ai.html'\)addTutorCopyControls\(\)/,'Tutor non attiva copia PWA');
assert.match(app,/blockquote\[id\^="prompt-"\]/,'PWA non individua i prompt');
assert.match(app,/navigator.clipboard&&navigator.clipboard.writeText/,'Clipboard API PWA assente');
assert.match(app,/document.execCommand\('copy'\)/,'Fallback clipboard PWA assente');
assert.match(read('app/app.css'),/\.reader-content \.prompt-copy/,'Stile pulsanti PWA assente');
assert.match(read('app/index.html'),/main\.js\?v=10/,'PWA non aggiorna JavaScript');
assert.match(read('app/index.html'),/app\.css\?v=10/,'PWA non aggiorna CSS');
assert.match(read('app/sw.js'),/perme-reader-v12-20261015-tutor/,'Cache PWA non aggiornata');
assert.match(read('app/sw.js'),/main\.js\?v=10/,'Service worker usa versione vecchia');

console.log('PASS Tutor AI: 6 prompt, pulsanti, script copiabile sintatticamente valido, fallback Android, privacy, SEO e salvataggio testo PWA.');
console.log('LIMITI: test statico. Per il dispositivo Android reale verificare manualmente copia e incolla e salvataggio offline aggiornato.');
