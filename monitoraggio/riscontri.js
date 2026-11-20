(() => {
 'use strict';
 const root=new URL('../',location.href),el=id=>document.getElementById(id);
 let guides=new Map();
 function options(){
  const query=el('filtro').value.trim().toLocaleLowerCase('it');
  const previous=el('guida').value;
  el('guida').replaceChildren();
  for(const [path,guide]of guides){
   if(query&&!((guide.titolo+' '+path).toLocaleLowerCase('it').includes(query)))continue;
   const option=document.createElement('option');option.value=path;option.textContent=guide.titolo;el('guida').append(option);
  }
  if([...el('guida').options].some(option=>option.value===previous))el('guida').value=previous;
  el('leggi').disabled=!navigator.onLine||!el('guida').value;
  if([...el('guida').options].some(option=>option.value===previous))el('guida').value=previous;
  el('leggi').disabled=!el('guida').value||!navigator.onLine;
 }
 async function init(){
  try{
   const result=await window.PerMeCatalogo.carica(root,async path=>{
    const src=new URL(path,root),response=await fetch(src,{cache:'no-store'});
    if(!response.ok)throw Error('Pagina non disponibile');
    return{src,doc:new DOMParser().parseFromString(await response.text(),'text/html')};
   });
   guides=new Map([...result.pagine].sort((a,b)=>a[1].titolo.localeCompare(b[1].titolo,'it')));
   options();el('stato').textContent=result.errori.length?'Elenco parziale: alcune rubriche non sono raggiungibili.':'Scegli una guida per leggere i tre conteggi.';
  }catch(_){el('stato').textContent='Elenco non disponibile. Riprova quando sei online.';}
 }
 el('filtro').addEventListener('input',options);
 el('guida').addEventListener('change',()=>{el('esito').hidden=true;});
 el('leggi').addEventListener('click',async()=>{
  const path=el('guida').value;if(!path)return;
  el('leggi').disabled=true;el('esito').hidden=true;el('stato').textContent='Lettura dei conteggi…';
  try{
   const result=await window.PerMeLettura.readReports(path);
   el('conteggi').replaceChildren();
   for(const [type,name]of Object.entries(window.PerMeLettura.reportTypes)){
    const tr=document.createElement('tr'),th=document.createElement('th'),td=document.createElement('td');
    th.scope='row';th.textContent=name;td.textContent=result[type].toLocaleString('it-IT');tr.append(th,td);el('conteggi').append(tr);
   }
   el('titolo').textContent=guides.get(path).titolo;el('apri').href=new URL(path,root).href;el('esito').hidden=false;
   el('stato').textContent='Conteggi letti adesso. Nessuna segnalazione aggiunta.';
  }catch(_){el('stato').textContent='Conteggi non disponibili: non sono stati sostituiti con zero.';}
  finally{el('leggi').disabled=!navigator.onLine;}
 });
 window.addEventListener('online',options);window.addEventListener('offline',()=>{options();el('stato').textContent='Serve Internet per leggere i conteggi aggiornati.';});
 init();
})();
