/* Gradimento Per Me: nessuna profilazione, cookie o preferenza; solo contatori per articolo e stelle.
 * ATTENZIONE: il servizio esterno riceve dati tecnici delle richieste HTTP.
 */
(()=>{'use strict';
const root=new URL('./',document.currentScript.src);
const api='https://counterapi.com/api/cpcpcp106-coder.github.io/';
const stars=[1,2,3,4,5];
const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('gradimento.css?v=1',root).href;document.head.append(css);
const valid=p=>/^[a-z0-9-]+\.html$/.test(p)&&p!=='gradimento.html';
const key=p=>p.replace(/\.html$/,'');
const action=n=>'perme-stelle-'+n;
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
 const starTotal=counts.reduce((a,b,i)=>a+b*(i+1),0);
 return {counts,total,starTotal,mean:total?starTotal/total:null};
}
function mount(host,p){
 if(!host||!valid(p))return;
 // Elimina esclusivamente una vecchia annotazione locale del sistema precedente.
 // Da questa versione nessun voto viene scritto o letto dallo storage del browser.
 try{localStorage.removeItem('per-me-voto-locale-v1:'+p)}catch(_){}
 const section=document.createElement('section');section.className='perme-rating';section.setAttribute('aria-label','Gradimento articolo');
 const heading=document.createElement('h2');heading.textContent='Quanto ti è stato utile questo articolo?';
 const intro=document.createElement('p');intro.textContent='Scegli da 1 a 5 stelle. Ogni pressione registra un clic, senza identificare il lettore.';
 const group=document.createElement('div');group.className='perme-rating-stars';group.setAttribute('role','group');group.setAttribute('aria-label','Seleziona le stelle');
 const status=document.createElement('p');status.className='perme-rating-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');
 status.textContent=navigator.onLine?'Seleziona una stella per registrare un clic.':'Per registrare un clic serve una connessione Internet.';
 const summary=document.createElement('p');summary.className='perme-rating-summary';
 summary.textContent='Il conteggio aggiornato è disponibile nella classifica.';
 const note=document.createElement('p');note.className='perme-rating-note';
 note.textContent='Il sistema non conserva preferenze, profili o identificativi dei lettori. I soli risultati conservati sono i conteggi per articolo e numero di stelle. Il servizio esterno può comunque ricevere dati tecnici della connessione.';
 const link=document.createElement('a');link.className='perme-rating-link';link.href=new URL('gradimento.html',root).href;link.textContent='Classifica di tutti gli articoli →';
 const btns=stars.map(n=>{const b=document.createElement('button');b.type='button';b.textContent='★';b.title=n+(n===1?' stella':' stelle');b.setAttribute('aria-label','Aggiungi un clic: '+n+(n===1?' stella':' stelle'));group.append(b);return b});
 section.append(heading,intro,group,status,summary,note,link);host.replaceChildren(section);
 let busy=false;
 function buttons(){btns.forEach(b=>b.disabled=busy||!navigator.onLine)}
 btns.forEach((b,i)=>b.addEventListener('click',async()=>{
  if(busy||!navigator.onLine)return;
  const n=i+1;busy=true;buttons();status.textContent='Registrazione del clic in corso…';
  try{
   const count=await counter(action(n),p,false);
   summary.textContent='Clic ricevuti da questa valutazione ('+n+' stelle): '+count.toLocaleString('it-IT')+'.';
   status.textContent='Registrato un clic da '+n+(n===1?' stella.':' stelle.');
  }catch(_){status.textContent='Registrazione non confermata. Ripetendo il clic potresti conteggiarlo due volte.'}
  finally{busy=false;buttons()}
 }));
 window.addEventListener('online',()=>{buttons();if(!busy)status.textContent='Puoi selezionare una stella.'});
 window.addEventListener('offline',()=>{buttons();if(!busy)status.textContent='Per registrare un clic serve Internet.'});
 buttons();
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
  rows=data.filter(x=>x&&valid(x.path)&&typeof x.title==='string').map(x=>({...x,total:null,starTotal:null,mean:null,error:false}));
 }catch(_){report('Non riesco a caricare gli articoli. Controlla la connessione.');return}
 let next=0,done=0;
 async function worker(){
  while(next<rows.length){
   const row=rows[next++];
   try{
    // Leggere tutte le cinque categorie: "any" non equivale al totale delle stelle.
    const d=await detail(row.path);
    row.total=d.total;
    row.starTotal=d.starTotal;
    row.mean=d.mean;
   }catch(_){row.error=true}
   done++;report('Caricamento: '+done+' di '+rows.length+' articoli…');
  }
 }
 await Promise.all(Array.from({length:Math.min(4,rows.length)},()=>worker()));
 rows.sort((a,b)=>(Number(a.error)-Number(b.error))||(b.starTotal||0)-(a.starTotal||0)||(b.mean||0)-(a.mean||0)||(b.total||0)-(a.total||0)||a.title.localeCompare(b.title,'it'));
 const list=document.createElement('ol');list.className='perme-ranking-list';
 rows.forEach(r=>{
  const li=document.createElement('li'),box=document.createElement('article'),a=document.createElement('a'),cat=document.createElement('p'),vote=document.createElement('p');
  a.href=new URL(r.path,root).href;a.textContent=r.title;cat.textContent=r.category;vote.className='perme-ranking-score';
  vote.textContent=r.error?'Conteggio non disponibile':r.total===0?'★ 0 stelle totali · 0 clic':
   '★ '+r.starTotal.toLocaleString('it-IT')+(r.starTotal===1?' stella totale':' stelle totali')+
   ' · '+r.total.toLocaleString('it-IT')+(r.total===1?' clic':' clic')+
   ' · Media '+r.mean.toFixed(1).replace('.',',')+' / 5';
  box.append(a,cat,vote);li.append(box);list.append(li);
 });
 target.replaceChildren(list);
 const errors=rows.filter(r=>r.error).length;
 report(rows.length+' articoli, ordinati per stelle totali ricevute (somma delle stelle di tutti i clic), poi per media.'+(errors?' Conteggio non disponibile per '+errors+' articoli.':''));
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