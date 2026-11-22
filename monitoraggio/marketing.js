'use strict';
(() => {
 const labels={aperture:'Aperture registrate',facebook:'Provenienza Facebook',instagram:'Provenienza Instagram',whatsapp:'Provenienza WhatsApp, totale',canale_whatsapp:'Di cui dai link del canale WhatsApp',google:'Provenienza Google (indicativa)',altri:'Altri siti e collegamenti',sconosciuta:'Provenienza sconosciuta',aperture_menu:'Aperture del menu',aperture_calcolatore:'Aperture del calcolatore',aperture_modelli:'Aperture dei modelli',clic_whatsapp:'Pressioni su Segui il canale WhatsApp',clic_facebook:'Pressioni sui collegamenti Facebook',giornate_ritorno:'Giornate con ritorno del browser'};
 const marketing=new Set(['aperture_menu','aperture_calcolatore','aperture_modelli','clic_whatsapp','clic_facebook','giornate_ritorno']);
 const status=document.getElementById('stato'),box=document.getElementById('metriche'),button=document.getElementById('aggiorna');
 const date=at=>new Date(at).toLocaleString('it-IT',{timeZone:'Europe/Rome'});
 async function load(){
  button.disabled=true;status.textContent='Lettura dello storico in corso…';
  try{
   const response=await fetch('marketing-30-giorni.json',{cache:'no-store'});
   if(!response.ok)throw Error('HTTP '+response.status);
   const data=await response.json();
   if(!data.snapshots?.length)throw Error('Nessuna lettura archiviata');
   const last=data.snapshots[data.snapshots.length-1];box.replaceChildren();
   const activatedAt=Date.parse(data.marketing_activated_at||'');
   const activated=Number.isFinite(activatedAt)&&activatedAt>=Date.parse('2026-11-21T00:00:00+01:00')&&activatedAt<Date.parse('2026-12-22T00:00:00+01:00');
   for(const [key,label]of Object.entries(labels)){
    const valid=s=>s.values?.[key]?.status==='ok'&&Number.isSafeInteger(s.values[key].value)&&s.values[key].value>=0&&(!marketing.has(key)||activated&&Date.parse(s.at)>=activatedAt);
    const first=data.snapshots.find(valid);
    const entry=last.values?.[key],value=entry?.value,baseline=first?.values[key]?.value;
    const card=document.createElement('section');card.className='metrica';
    const title=document.createElement('h2');title.textContent=label;
    const number=document.createElement('output');number.className='numero';
    const note=document.createElement('p');note.className='nota';
    if(marketing.has(key)&&!activated){
     number.textContent='Non attivata';note.textContent='Non è documentata una data di attivazione autorizzata. Nessun utilizzo è stato stimato.';
    }else if(entry?.status==='non_ancora_creato'){
     number.textContent='Non disponibile';note.textContent='Il contatore non è ancora stato creato dal servizio. Non è una lettura di zero utilizzi.';
    }else if(!valid(last)||!Number.isSafeInteger(baseline)){
     number.textContent='Non disponibile';note.textContent='Il servizio non ha fornito una lettura valida. Nessuno zero è stato stimato.';
    }else if(value<baseline){
     number.textContent='Contatore diminuito';note.textContent='Il confronto richiede una verifica della serie.';
    }else{
     number.textContent='+'+(value-baseline).toLocaleString('it-IT');
     note.textContent='Incremento dalla lettura del '+date(first.at)+'. Valore cumulativo più recente: '+value.toLocaleString('it-IT')+'.';
    }
    card.append(title,number,note);box.append(card);
   }
   status.textContent='Ultima lettura archiviata: '+date(last.at)+'. Letture disponibili: '+data.snapshots.length+'.';
  }catch(error){status.textContent='Storico non aggiornabile: '+error.message+'. I dati eventualmente mostrati restano quelli della lettura precedente.';}
  finally{button.disabled=false;}
 }
 button.addEventListener('click',load);load();
})();
