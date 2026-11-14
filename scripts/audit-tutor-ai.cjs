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
const prompts=[...html.matchAll(/<blockquote id="(prompt-[^"]+)" aria-label="([^"]+)">([\s\S]*?)<\/blockquote>/g)];
const buttons=[...html.matchAll(/<button\b[^>]*data-copy="([^"]+)"[^>]*>/g)];
assert.equal(prompts.length,30,'Trenta richieste con etichetta');
assert.deepEqual(buttons.map(m=>m[1]),prompts.map(m=>m[1]),'Un pulsante per richiesta, nello stesso ordine');
for(const [,id,,content] of prompts){
 assert.ok(content.replace(/<[^>]+>/g,' ').trim().length>35,'Prompt troppo breve '+id);
}
const base=html.split('<section id="richieste-base"')[1].split('<h2 id="formula">')[0];
const baseIds=[...base.matchAll(/<blockquote id="(prompt-[^"]+)"/g)].map(m=>m[1]);
assert.deepEqual(baseIds,['prompt-avviso','prompt-messaggio','prompt-lista','prompt-domande','prompt-verifica','prompt-correzione']);
const monthly=html.split('<section id="mese"')[1].split('<section id="richieste-base"')[0];
const weeks=[...monthly.matchAll(/<details id="(settimana-[1-4]|fine-mese)"[^>]*>([\s\S]*?)<\/details>/g)];
assert.deepEqual(weeks.map(m=>m[1]),['settimana-1','settimana-2','settimana-3','settimana-4','fine-mese']);
assert.deepEqual(weeks.map(m=>(m[2].match(/<blockquote id="prompt-/g)||[]).length),[5,6,5,6,2]);
assert.equal((html.match(/<strong>Da controllare\.<\/strong>/g)||[]).length,30);
for(const a of html.matchAll(/<img\b[^>]*>/gi))assert.match(a[0],/\balt="[^"]*"/i,'Alt obbligatorio');
for(const tag of ['p','h2','blockquote','article','main','nav','div']){
 const opens=(html.match(new RegExp('<'+tag+'(?:\\s|>)','gi'))||[]).length;
 const closes=(html.match(new RegExp('</'+tag+'>','gi'))||[]).length;
 assert.equal(opens,closes,'Tag sbilanciato '+tag);
}
const phone=html.match(/<ol class="tutor-start">([\s\S]*?)<\/ol>/)?.[1]||'';
assert.equal((phone.match(/<li>/g)||[]).length,3,'Tre passaggi dal telefono');
for(const action of ['Copia','Incolla','Invia'])assert.ok(phone.includes('<strong>'+action+'</strong>'));
for(const cue of ['testi pubblici','codice fiscale','referti','screenshot','[UFFICIO]'])
 assert.ok(html.includes(cue),'Istruzione sulla riservatezza assente: '+cue);
assert.match(html,/poi la provi nella chat che già usi/,'Distinzione sito e chat AI');
assert.match(html,/id="obiettivi-titolo"/,'Obiettivi formativi');
for(const item of ['Il compito.','Il testo di partenza.','La forma.','Il limite.','Il controllo.'])
 assert.ok(html.includes(item),'Metodo di formulazione incompleto: '+item);
assert.match(html,/id="verifica-apprendimento"/,'Autoverifica formativa assente');
assert.match(html,/<summary>Mostra la soluzione<\/summary>/,'Soluzione chiusa nella prova guidata');
const details=(html.match(/<details\b/g)||[]).length,summary=(html.match(/<summary>/g)||[]).length;
assert.equal(details,summary,'Ogni pannello deve essere attivabile da tastiera tramite summary');
for(const key of ['Mostra la soluzione 1','Mostra la soluzione 2','Mostra la soluzione 3','Mostra la soluzione 4'])
 assert.ok(html.includes(key),'Manca feedback formativo: '+key);
for(const term of ['rivolgiti a un sanitario','verifica destinatario e coordinate','chiedi all’ente competente'])
 assert.ok(html.includes(term),'Controllo di sicurezza mancante: '+term);
for(const host of ['joint-research-centre.ec.europa.eu','www.unesco.org','www.garanteprivacy.it'])
 assert.ok(html.includes(host),'Fonte pedagogica/etica assente: '+host);
assert.match(html,/copiare tutte e 30 le richieste anche senza rete/i,'Capacità offline non spiegata');

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
const appHtml=read('app/index.html'),sw=read('app/sw.js');
const versionJS=appHtml.match(/src="(main\.js\?v=\d+)"/)?.[1];
const versionCSS=appHtml.match(/href="(app\.css\?v=\d+)"/)?.[1];
assert.ok(versionJS,'Riferimento versionato al JS PWA mancante');
assert.ok(versionCSS,'Riferimento versionato al CSS PWA mancante');
assert.ok(sw.includes("'./"+versionJS+"'"),'La cache PWA non usa il JavaScript richiesto');
assert.ok(sw.includes("'./"+versionCSS+"'"),'La cache PWA non usa il CSS richiesto');
assert.match(sw,/const CACHE='perme-reader-v\d+-\d{8}-[^']+';/,'Nome cache PWA versionato mancante');

console.log('PASS Tutor AI: 30 richieste, percorso mensile, copia, privacy, SEO e salvataggio testo PWA.');
console.log('LIMITI: test statico. Per il dispositivo Android reale verificare manualmente copia e incolla e salvataggio offline aggiornato.');
