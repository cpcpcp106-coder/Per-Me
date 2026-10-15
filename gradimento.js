/* Gradimento Per Me: dati inviati esclusivamente = nome articolo + valore da 1 a 5.
 * Il servizio terzo riceve comunque i dati tecnici di connessione.
 */
(()=>{'use strict';
const root=new URL('./',document.currentScript.src);
const api='https://counterapi.com/api/cpcpcp106-coder.github.io/';
const stars=[1,2,3,4,5],prefix='per-me-voto-locale-v1:';
const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('gradimento.css?v=1',root).href;document.head.append(css);
const valid=p=>/^[a-z0-9-]+\.html$/.test(p)&&p!=='gradimento.html';
const key=p=>p.replace(/\.html$/,'');
const action=n=>'perme-stelle-'+n;
function readLocal(p){try{return localStorage.getItem(prefix+p)}catch(_){return null}}
function saveLocal(p,v){try{localStorage.setItem(prefix+p,v);return localStorage.getItem(prefix+p)===v}catch(_){return false}}
async function counter(a,p,readOnly){
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),12000);
 try{
  const url=api+encodeURIComponent(a)+'/'+encodeURIComponent(key(p))+(readOnly?'?readOnly=true':'');
  const response=await fetch(url,{method:'GET',mode:'cors',credentials:'omit',referrerPolicy:'no-referrer',cache:'no-store',signal:controller.signal});
  if(readOnly&&response.status===404)return 0;
  if(!response.ok)throw Error('HTTP '+response.status);
  const data=await response.json(),v=Number(data.value);
  if(!Number.isSafeInteger(v)||v<0)throw Error('Numero non valido');
  return v;
 }finally{clearTimeout(timer)}
}
async function detail(p){
 const counts=await Promise.all(stars.map(n=>counter(action(n),p,true)));
 const total=counts.reduce((a,b)=>a+b,0);
 return {counts,total,mean:total?counts.reduce((a,b,i)=>a+b*(i+1),0)/total:null};
}
function mount(host,p){
 if(!host||!valid(p))return;
 const section=document.createElement('section');section.className='perme-rating';section.setAttribute('aria-label','Gradimento articolo');
 const heading=document.createElement('h2');heading.textContent='Quanto ti è stato utile questo articolo?';
 const intro=document.createElement('p');intro.textContent='Dai da 1 a 5 stelle, senza registrazione.';
 const group=document.createElement('div');group.className='perme-rating-stars';group.setAttribute('role','group');group.setAttribute('aria-label','Seleziona le stelle');
 const status=document.createElement('p');status.className='perme-rating-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');
 const summary=document.createElement('p');summary.className='perme-rating-summary';
 const note=document.createElement('p');note.className='perme-rating-note';note.textContent='Nessun nome, email o identificativo viene richiesto o inviato con il voto. Il servizio di conteggio riceve i normali dati tecnici di connessione.';
 const link=document.createElement('a');link.className='perme-rating-link';link.href=new URL('gradimento.html',root).href;link.textContent='Classifica di tutti gli articoli →';
 const btns=stars.map(n=>{const b=document.createElement('button');b.type='button';b.textContent='★';b.title=n+(n===1?' stella':' stelle');b.setAttribute('aria-label','Assegna '+n+(n===1?' stella':' stelle'));group.append(b);return b});
 section.append(heading,intro,group,status,summary,note,link);host.replaceChildren(section);
 let busy=true,locked=!!readLocal(p),counts=null;
 function buttons(){
  const old=readLocal(p),v=old&&/^votato:[1-5]$/.test(old)?Number(old.slice(-1)):0;
  btns.forEach((b,i)=>{b.disabled=busy||locked||!navigator.onLine;b.classList.toggle('perme-chosen',v>0&&i<v)});
 }
 function totals(){
  if(!counts)return;
  const n=counts.reduce((a,b)=>a+b,0),sum=counts.reduce((a,b,i)=>a+b*(i+1),0);
  summary.textContent=n?n.toLocaleString('it-IT')+(n===1?' voto':' voti')+' · Media '+(sum/n).toFixed(1).replace('.',',')+' / 5 stelle':'Ancora nessun voto.';
 }
 btns.forEach((b,i)=>b.addEventListener('click',async()=>{
  if(busy||locked||!navigator.onLine)return;
  const n=i+1;busy=true;
  if(!saveLocal(p,'tentato:'+n)){busy=false;status.textContent='Il browser non consente di salvare il voto: non possiamo garantire un solo voto.';buttons();return}
  locked=true;buttons();status.textContent='Registrazione in corso…';
  try{
   const value=await counter(action(n),p,false);saveLocal(p,'votato:'+n);
   if(counts)counts[i]=Math.max(counts[i]+1,value);totals();
   status.textContent='Voto registrato: '+n+(n===1?' stella.':' stelle.');
  }catch(_){status.textContent='Non posso confermare la registrazione. Per evitare doppi voti, non è possibile riprovare dallo stesso browser.'}
  finally{busy=false;buttons()}
 }));
 window.addEventListener('storage',e=>{if(e.key===prefix+p&&e.newValue){locked=true;status.textContent='Questo articolo è già stato valutato in un’altra scheda.';buttons()}});
 window.addEventListener('online',buttons);window.addEventListener('offline',buttons);
 if(!navigator.onLine){status.textContent='Offline: il voto sarà disponibile quando torni online.';busy=false;buttons();return}
 status.textContent='Caricamento delle valutazioni…';
 detail(p).then(d=>{
  counts=d.counts;totals();const saved=readLocal(p);
  status.textContent=saved&&/^votato:[1-5]$/.test(saved)?'Hai già assegnato '+saved.slice(-1)+' stelle.':saved?'Hai già tentato un voto: non puoi ripeterlo.':'Tocca una stella per votare una sola volta.';
 }).catch(()=>{status.textContent='Servizio non disponibile. Non è possibile votare adesso.'})
 .finally(()=>{busy=false;buttons()});
}
async function ranking(){
 const target=document.querySelector('[data-gradimento-classifica]');if(!target)return;
 const state=document.querySelector('[data-gradimento-stato]');
 const report=s=>{if(state)state.textContent=s};
 let rows;
 try{
  const res=await fetch(new URL('gradimento-articoli.json',root),{cache:'no-store'});
  if(!res.ok)throw Error('Catalogo');
  const data=await res.json();if(!Array.isArray(data))throw Error('Catalogo');
  rows=data.filter(x=>x&&valid(x.path)&&typeof x.title==='string').map(x=>({...x,total:null,mean:null,error:false}));
 }catch(_){report('Non riesco a caricare gli articoli. Controlla la connessione.');return}
 let next=0,done=0;
 async function worker(){
  while(next<rows.length){
   const row=rows[next++];
   try{
    row.total=await counter('any',row.path,true);
    if(row.total>0){try{const d=await detail(row.path);row.total=d.total;row.mean=d.mean}catch(_){}}
   }catch(_){row.error=true}
   done++;report('Caricamento: '+done+' di '+rows.length+' articoli…');
  }
 }
 await Promise.all(Array.from({length:Math.min(6,rows.length)},()=>worker()));
 rows.sort((a,b)=>(Number(a.error)-Number(b.error))||(b.total||0)-(a.total||0)||(b.mean||0)-(a.mean||0)||a.title.localeCompare(b.title,'it'));
 const list=document.createElement('ol');list.className='perme-ranking-list';
 rows.forEach(r=>{
  const li=document.createElement('li'),box=document.createElement('article'),a=document.createElement('a'),cat=document.createElement('p'),vote=document.createElement('p');
  a.href=new URL(r.path,root).href;a.textContent=r.title;cat.textContent=r.category;vote.className='perme-ranking-score';
  vote.textContent=r.error?'Conteggio non disponibile':r.total===0?'0 voti · Nessuna valutazione':
   r.total.toLocaleString('it-IT')+(r.total===1?' voto':' voti')+(r.mean===null?' · Media non disponibile':' · Media '+r.mean.toFixed(1).replace('.',',')+' / 5 stelle');
  box.append(a,cat,vote);li.append(box);list.append(li);
 });
 target.replaceChildren(list);
 const errors=rows.filter(r=>r.error).length;
 report(rows.length+' articoli, ordinati per numero di voti e poi per media.'+(errors?' Conteggio non disponibile per '+errors+' articoli.':''));
}
window.PerMeGradimento=Object.freeze({mount});
function boot(){
 const target=document.querySelector('main article');
 if(target&&!document.querySelector('[data-gradimento-classifica]')){
  const p=decodeURIComponent(location.pathname.split('/').pop());
  if(valid(p)){const slot=document.createElement('div');slot.id='valuta-articolo';target.append(slot);mount(slot,p)}
 }
 ranking();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();