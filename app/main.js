'use strict';
const ROOT=new URL('../',location.href);
const KEY='perme-app-offline-20261014';
const SECTIONS=[
 ['soldi-lavoro.html','Soldi & Lavoro'],
 ['pensione-invalidita.html','Pensione e invalidità'],
 ['debiti-cartelle.html','Debiti e cartelle'],
 ['agevolazioni-diritti.html','Agevolazioni e diritti'],
 ['salute-autonomia.html','Salute e autonomia'],
 ['tutor-ai.html','Tutor AI essenziale'],
 ['diabete-tipo-2.html','Diabete tipo 2'],
 ['dieta-mediterranea-scientifica.html','Dieta mediterranea scientifica']
];
const CATEGORIES=new Map(SECTIONS),EXCLUDED=new Set(['index.html','metodo.html','monitoraggio.html','chi-siamo.html']);
const model={guides:[],favorites:[],updated:null,filter:'all',query:'',current:null,syncing:false,storageOk:true,lastSync:null};
const element=id=>document.getElementById(id);
function restore(){try{let s=JSON.parse(localStorage.getItem(KEY)||'{}');model.guides=Array.isArray(s.guides)?s.guides:[];model.favorites=Array.isArray(s.favorites)?s.favorites:[];model.updated=s.updated||null;model.lastSync=s.lastSync&&typeof s.lastSync==='object'?s.lastSync:null;}catch(e){}}
function persist(){try{localStorage.setItem(KEY,JSON.stringify({guides:model.guides,favorites:model.favorites,updated:model.updated,lastSync:model.lastSync}));model.storageOk=true;return true}catch(e){model.storageOk=false;element('sync-status').textContent='Spazio di archiviazione insufficiente o salvataggio bloccato: le nuove guide NON sono state salvate per la consultazione offline.';return false}}
function dateLabel(d){try{return new Date(d).toLocaleString('it-IT',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}catch(e){return 'data non disponibile'}}
function compareGuides(previous,guides){
 const old=new Map(previous.map(g=>[g.path,g]));
 let added=0,modified=0,unchanged=0;
 for(const guide of guides){
  const prior=old.get(guide.path);
  if(!prior){added++;continue}
  if(['category','title','summary','content'].some(field=>(prior[field]||'')!==(guide[field]||'')))modified++;
  else unchanged++;
 }
 return {added,modified,unchanged};
}
function renderSyncSummary(){
 const area=element('sync-summary'),s=model.lastSync;
 if(!s){area.hidden=true;return}
 area.hidden=false;
 element('sync-summary-title').textContent='Ultimo controllo: '+dateLabel(s.checkedAt||model.updated);
 element('sync-added').textContent=String(s.added||0);
 element('sync-modified').textContent=String(s.modified||0);
 element('sync-unchanged').textContent=String(s.unchanged||0);
 let note=s.failed>0?'Controllo parziale: '+s.failed+' pagine non raggiunte. Alcune copie precedenti possono essere ancora presenti.':s.removed>0?s.removed+' pagine non sono più presenti nell’indice del sito.':'Controllo completo: tutte le pagine trovate sono state verificate.';
 if(!model.storageOk)note='ATTENZIONE: salvataggio sul telefono non riuscito. I testi nuovi potrebbero non essere disponibili offline.';
 element('sync-summary-note').textContent=note;
}
function isOnline(){return navigator.onLine}
function statusConnection(){let offline=!isOnline();element('connection').textContent=offline?(model.guides.length?'Offline: '+model.guides.length+' pagine salvate. Verifica le scadenze quando torni online.':'Offline: nessuna guida salvata. Collegati a Internet per il primo download.'):'Online: puoi verificare gli aggiornamenti';element('refresh').disabled=offline||model.syncing}
function pathFor(href,source){
 try{let url=new URL(href,source);if(url.origin!==ROOT.origin||!url.pathname.startsWith(ROOT.pathname))return null;let p=decodeURIComponent(url.pathname.substring(ROOT.pathname.length));return /^[a-z0-9-]+\.html$/i.test(p)&&!EXCLUDED.has(p)?p:null}catch(e){return null}
}
async function downloadPage(path){
 let url=new URL(path,ROOT);url.searchParams.set('perme_refresh',String(Date.now()));
 let response=await fetch(url,{cache:'no-store'});if(!response.ok)throw new Error('HTTP '+response.status);
 return {doc:new DOMParser().parseFromString(await response.text(),'text/html'),src:url.href};
}
const SAFE_TAGS=new Set('H1 H2 H3 H4 H5 H6 P UL OL LI STRONG B EM I U BR SPAN DIV SECTION ASIDE BLOCKQUOTE TABLE CAPTION THEAD TBODY TR TH TD DL DT DD CODE PRE HR A SMALL SUP SUB DETAILS SUMMARY'.split(' '));
const SKIP_TAGS=new Set('SCRIPT STYLE NAV FOOTER HEADER IMG PICTURE SVG VIDEO AUDIO IFRAME OBJECT FORM BUTTON INPUT TEXTAREA SELECT CANVAS NOSCRIPT'.split(' '));
function filtered(node,src){
 if(node.nodeType===3)return document.createTextNode(node.textContent||'');
 if(node.nodeType!==1)return document.createDocumentFragment();
 let t=node.tagName.toUpperCase();if(SKIP_TAGS.has(t))return document.createDocumentFragment();
 let out=SAFE_TAGS.has(t)?document.createElement(t.toLowerCase()):document.createDocumentFragment();
 if(out.nodeType===1){
  if(node.id&&/^[a-z\w-]{1,100}$/i.test(node.id))out.id=node.id;
  if(node.classList.contains('experience-caf-uil'))out.className='experience-caf-uil';
  if(node.classList.contains('note'))out.className='note';
  if(node.classList.contains('uil-contact-button'))out.className='uil-contact-button';
  if(t==='A'){let href=node.getAttribute('href');if(href){try{let url=new URL(href,src);if(['http:','https:','tel:','mailto:'].includes(url.protocol)){out.href=url.href;if(['http:','https:'].includes(url.protocol)){out.target='_blank';out.rel='noopener noreferrer'}}}catch(e){}}}
  if(t==='TH'&&node.getAttribute('scope'))out.setAttribute('scope',node.getAttribute('scope'));
 }
 for(const child of node.childNodes)out.appendChild(filtered(child,src));
 return out;
}
function extract(doc,src){
 let a=doc.querySelector('main article')||doc.querySelector('main');if(!a)throw Error('Nessun articolo');
 let clone=a.cloneNode(true);clone.querySelectorAll('nav,.rubrica-crossnav,.breadcrumbs,.breadcrumb,script,style').forEach(n=>n.remove());
 clone.querySelector('h1')?.remove();
 let out=document.createElement('div');for(const child of clone.childNodes)out.appendChild(filtered(child,src));
 if((out.textContent||'').trim().length<30)throw Error('Articolo vuoto');
 return out.innerHTML;
}
async function fetchGuide(path,category){
 let {doc,src}=await downloadPage(path);
 let title=(doc.querySelector('main article h1,main h1')?.textContent||category).trim().replace(/\s+/g,' ');
 return {path,category:CATEGORIES.get(path)||category,title,content:extract(doc,src),summary:doc.querySelector('.lead')?.textContent?.trim()||'Guida del sito Per Me'};
}
async function sync(){
 if(model.syncing)return;
 if(!isOnline()){element('sync-status').textContent='Offline: puoi consultare le guide già salvate.';return}
 model.syncing=true;statusConnection();element('refresh').textContent='Aggiornamento…';
 element('sync-status').textContent='Verifico le guide pubblicate sul sito.';
 let pages=new Map(),failed=[];
 for(let [path,cat] of SECTIONS){
  try{let {doc}=await downloadPage(path);pages.set(path,cat);
   for(let a of doc.querySelectorAll('main a[href]')){
    let found=pathFor(a.getAttribute('href'),new URL(path,ROOT));
    if(found&&!CATEGORIES.has(found)&&!pages.has(found))pages.set(found,cat);
   }
  }catch(e){failed.push(path)}
 }
 let all=[...pages.entries()],newGuides=[];
 for(let i=0;i<all.length;i+=4){
  let slice=all.slice(i,i+4);
  let done=await Promise.allSettled(slice.map(([p,c])=>fetchGuide(p,c)));
  done.forEach((v,k)=>v.status==='fulfilled'?newGuides.push(v.value):failed.push(slice[k][0]));
  element('sync-status').textContent='Guide verificate: '+Math.min(i+4,all.length)+' di '+all.length;
 }
 if(newGuides.length){
  // Una pagina rimossa dall'indice non resta automaticamente una pagina corrente.
  const previous=new Map(model.guides.map(g=>[g.path,g]));
  const fresh=newGuides.map(g=>({...g,stale:false}));
  const failedPaths=new Set(failed);
  const failedCategories=new Set(failed.filter(p=>CATEGORIES.has(p)).map(p=>CATEGORIES.get(p)));
  // Se non si raggiunge una rubrica, conserva le relative pagine già salvate, segnalandole.
  const oldCopies=[...previous.values()].filter(g=>
    (failedPaths.has(g.path)||failedCategories.has(g.category))&&!fresh.some(x=>x.path===g.path)
  ).map(g=>({...g,stale:true}));
  const next=[...fresh,...oldCopies].sort((a,b)=>a.category.localeCompare(b.category,'it')||a.title.localeCompare(b.title,'it'));
  const counts=compareGuides([...previous.values()],fresh);
  const currentPaths=new Set(next.map(g=>g.path));
  const removed=[...previous.keys()].filter(path=>!currentPaths.has(path)).length;
  model.guides=next;
  model.updated=new Date().toISOString();
  model.lastSync={...counts,removed,failed:failed.length,checkedAt:model.updated};
  persist();
 }
 model.syncing=false;statusConnection();element('refresh').textContent='Aggiorna le guide';
 element('sync-status').textContent=!model.storageOk
  ?'Attenzione: salvataggio non riuscito. Le guide scaricate sono visibili ora, ma NON è garantita la lettura offline dopo la chiusura dell’app.'
  :newGuides.length
   ?model.guides.length+' pagine salvate per la lettura offline · controllo online '+dateLabel(model.updated)+(failed.length?'. Alcune pagine non raggiunte: le copie conservate sono segnalate come da verificare.':'.')
   :'Impossibile aggiornare ora. Le guide già salvate restano disponibili.';
 renderSyncSummary();renderList();if(model.current)openGuide(model.current,false);
}
function renderList(){
 const area=element('guide-list');area.replaceChildren();
 let norm=s=>String(s).toLocaleLowerCase('it').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 const found=model.guides.filter(g=>(model.filter!=='favorite'||model.favorites.includes(g.path))&&norm(g.title+' '+g.category+' '+g.content.replace(/<[^>]*>/g,' ')).includes(norm(model.query)));
 if(!found.length){let p=document.createElement('p');p.className='empty';p.textContent=model.guides.length?'Non trovo guide con queste parole.':'Nessuna guida ancora salvata: collegati a Internet e premi «Aggiorna le guide». Poi potrai leggerle anche offline.';area.appendChild(p);return}
 for(let guide of found){
  const btn=document.createElement('button');btn.type='button';btn.className='guide-card';
  const cat=document.createElement('span');cat.textContent=guide.category+(guide.stale?' · Copia non aggiornata':'')+(model.favorites.includes(guide.path)?' · Preferita':'');
  const title=document.createElement('strong');title.textContent=guide.title;
  const more=document.createElement('em');more.textContent=guide.stale?'Apri la copia da verificare':'Apri il testo salvato';
  btn.append(cat,title,more);btn.addEventListener('click',()=>openGuide(guide.path,true));area.appendChild(btn);
 }
}
// Ricrea i controlli di copia dei prompt del Tutor AI nella PWA, anche offline.
// La PWA salva solo il contenuto, non gli script della pagina pubblica.
function addTutorCopyControls(){
 const area=element('reader-content'),status=document.createElement('p');
 const prompts=[...area.querySelectorAll('blockquote[id^="prompt-"]')];
 if(!prompts.length)return;
 status.className='tutor-copy-status';
 status.setAttribute('role','status');status.setAttribute('aria-live','polite');
 status.textContent='I prompt sono salvati sul telefono. Puoi copiarli anche senza connessione; per usare una chat AI normalmente serve Internet.';
 prompts[0].insertAdjacentElement('beforebegin',status);
 const names={'prompt-avviso':'avviso','prompt-messaggio':'messaggio','prompt-lista':'lista','prompt-domande':'domande per un ufficio','prompt-verifica':'verifica della fonte','prompt-correzione':'riscrittura semplice','prompt-dialogo':'richiesta iniziale','prompt-correzione-dialogo':'correzione nella conversazione','prompt-fonte':'verifica fonte','prompt-citazione':'controllo riferimento','prompt-confronto':'confronto due avvisi','prompt-riassunto':'riassunto','prompt-truffa':'segnali di rischio','prompt-privacy':'privacy','prompt-persona':'domande per uno sportello','prompt-domande-professionista':'domande per un professionista'};
 for(const prompt of prompts){
  if(!Object.hasOwn(names,prompt.id))continue;
  const button=document.createElement('button');button.type='button';button.className='prompt-copy';
  const label='Copia il prompt: '+names[prompt.id];button.textContent=label;
  prompt.insertAdjacentElement('beforebegin',button);
  button.addEventListener('click',async()=>{
   const txt=[...prompt.querySelectorAll('p')].map(p=>p.textContent.trim()).join('\n\n');
   let ok=false;button.disabled=true;
   try{
    if(navigator.clipboard&&navigator.clipboard.writeText){try{await navigator.clipboard.writeText(txt);ok=true}catch(_){}}
    if(!ok){
     const box=document.createElement('textarea');box.value=txt;box.readOnly=true;
     box.style.cssText='position:fixed;left:-9999px;top:0;opacity:0';
     document.body.appendChild(box);box.focus();box.select();
     try{ok=document.execCommand('copy')}catch(_){}
     box.remove();
    }
    if(ok){button.textContent='Copiato ✓';status.textContent='Prompt copiato. Quando hai accesso alla chat AI, tieni premuto nel campo del messaggio e scegli Incolla.';}
    else{
     const sel=window.getSelection();if(sel){const r=document.createRange();r.selectNodeContents(prompt);sel.removeAllRanges();sel.addRange(r);}
     status.textContent='Il testo è selezionato: usa Copia nel menu del telefono, poi Incolla nella chat AI.';
    }
   }finally{button.disabled=false;button.setAttribute('aria-label',label)}
  });
 }
}
function openGuide(path,scroll){
 let g=model.guides.find(x=>x.path===path);
 if(!g)return;
 model.current=path;
 element('catalogue').hidden=true;element('reader').hidden=false;
 element('reader-category').textContent=g.category+(g.stale?' · COPIA DA VERIFICARE':'');element('reader-title').textContent=g.title;const warning=element('reader-warning');warning.hidden=!(g.stale||!isOnline()||!model.storageOk);if(!warning.hidden){warning.textContent=!model.storageOk?'Attenzione: il salvataggio non è riuscito. Dopo aver chiuso l’app, le nuove guide potrebbero non essere disponibili.':g.stale?'Attenzione: copia non aggiornata. Prima di prendere decisioni consulta le fonti ufficiali.':'Stai leggendo una copia offline. Ultimo controllo: '+dateLabel(model.updated)+'. Verifica online le scadenze prima di agire.';}
 element('reader-content').innerHTML=g.content;
 if(window.PerMeGradimento?.mount)window.PerMeGradimento.mount(element('reader-rating'),path);
 if(path==='tutor-ai.html')addTutorCopyControls();
 if(path==='tutor-ai-android-primi-passi.html')addTutorCopyControls();
 if(path==='tutor-ai-conversazione-correzioni.html')addTutorCopyControls();
 if(path==='tutor-ai-verifica-fonti-date.html')addTutorCopyControls();
 if(path==='tutor-ai-riassumere-confrontare.html')addTutorCopyControls();
 if(path==='tutor-ai-privacy-truffe.html')addTutorCopyControls();
 if(path==='tutor-ai-quando-chiedere-aiuto.html')addTutorCopyControls();
 const fav=model.favorites.includes(path);
 element('favorite').setAttribute('aria-pressed',String(fav));element('favorite').textContent=fav?'Rimuovi dai preferiti':'Salva nei preferiti';
 if(scroll){history.replaceState(null,'','#guida='+encodeURIComponent(path));window.scrollTo({top:0})}
}
function back(){model.current=null;element('catalogue').hidden=false;element('reader').hidden=true;history.replaceState(null,'',location.pathname);window.scrollTo({top:0})}
let installEvent=null;
function setupInstall(){
 const button=element('install-app'),tip=element('install-tip'),help=element('install-help');
 if(window.matchMedia('(display-mode: standalone)').matches||navigator.standalone){help.hidden=true;return}
 window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installEvent=event;tip.textContent='Premi «Installa Per Me sul telefono» e conferma la proposta del browser. Dopo l’installazione, apri l’icona creata sul telefono.'});
 button.addEventListener('click',async()=>{
  if(!installEvent){tip.textContent='In Chrome apri il menu ⋮ in alto, poi scegli «Aggiungi a schermata Home» o «Installa app» se presente. Non è necessario reinstallare l’app dopo gli aggiornamenti delle guide.';return}
  const prompt=installEvent;installEvent=null;
  try{await prompt.prompt();await prompt.userChoice;}catch(e){tip.textContent='Installazione non riuscita da questo pulsante. Prova dal menu ⋮ di Chrome.'}
 });
 window.addEventListener('appinstalled',()=>{help.hidden=true});
}
function init(){
 restore();setupInstall();statusConnection();renderList();renderSyncSummary();
 if(model.updated)element('sync-status').textContent=model.guides.length+' pagine salvate · Ultimo aggiornamento '+dateLabel(model.updated)+'.';
 element('refresh').addEventListener('click',sync);
 element('search').addEventListener('input',e=>{model.query=e.target.value;renderList()});
 document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{model.filter=btn.dataset.filter;document.querySelectorAll('.filter').forEach(f=>{f.classList.toggle('active',f===btn);f.setAttribute('aria-pressed',String(f===btn))});renderList()}));
 element('back').addEventListener('click',back);element('bottom-back').addEventListener('click',back);
 element('favorite').addEventListener('click',()=>{let path=model.current;if(!path)return;model.favorites=model.favorites.includes(path)?model.favorites.filter(p=>p!==path):[...model.favorites,path];persist();openGuide(path,false)});
 element('reader-content').addEventListener('click',e=>{
  let a=e.target.closest('a[href]');if(!a)return;
  try{
   const u=new URL(a.href,ROOT);
   if(u.origin!==ROOT.origin||!u.pathname.startsWith(ROOT.pathname))return;
   const p=pathFor(u.href,ROOT);
   if(p&&model.guides.some(g=>g.path===p)){
    e.preventDefault();
    const same=p===model.current;
    if(!same)openGuide(p,true);
    if(u.hash){
     const id=decodeURIComponent(u.hash.substring(1));
     const target=[...element('reader-content').querySelectorAll('[id]')].find(n=>n.id===id);
     if(target)target.scrollIntoView({block:'start'});
     else if(same)window.scrollTo({top:0});
    }else if(same)window.scrollTo({top:0});
    return;
   }
   const path=u.pathname.substring(ROOT.pathname.length);
   if(path===''||path==='index.html'){e.preventDefault();back();}
  }catch(err){}
 });
 window.addEventListener('online',()=>{statusConnection();sync()});
 window.addEventListener('offline',statusConnection);
 window.addEventListener('hashchange',()=>{let p=location.hash.startsWith('#guida=')?decodeURIComponent(location.hash.substring(7)):null;if(p&&model.guides.some(g=>g.path===p))openGuide(p,false);else if(model.current)back()});
 if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js',{scope:'./'}).catch(()=>{});
 const initial=location.hash.startsWith('#guida=')?decodeURIComponent(location.hash.substring(7)):null;
 if(initial)openGuide(initial,false);
 if(isOnline())sync();
}
document.addEventListener('DOMContentLoaded',init);
