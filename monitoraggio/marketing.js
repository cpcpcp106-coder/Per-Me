'use strict';
(() => {
 const labels={aperture:'Aperture registrate',facebook:'Provenienza Facebook',instagram:'Provenienza Instagram',whatsapp:'Provenienza WhatsApp, totale',canale_whatsapp:'Di cui dai link del canale WhatsApp',google:'Provenienza Google (indicativa)',altri:'Altri siti e collegamenti',sconosciuta:'Provenienza sconosciuta',aperture_menu:'Aperture del menu',aperture_calcolatore:'Aperture del calcolatore',aperture_modelli:'Aperture dei modelli',clic_whatsapp:'Pressioni su Segui il canale WhatsApp',clic_facebook:'Pressioni sui collegamenti Facebook',giornate_ritorno:'Giornate con ritorno del browser'};
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
   for(const [key,label]of Object.entries(labels)){
    const first=data.snapshots.find(s=>Number.isSafeInteger(s.values[key]?.value));
    const value=last.values[key]?.value,baseline=first?.values[key]?.value;
    const card=document.createElement('section');card.className='metrica';
    const title=document.createElement('h2');title.textContent=label;
    const number=document.createElement('output');number.className='numero';
    const note=document.createElement('p');note.className='nota';
    if(!Number.isSafeInteger(value)||!Number.isSafeInteger(baseline)){
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
