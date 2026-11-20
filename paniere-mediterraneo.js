(() => {
 'use strict';
 const button=document.getElementById('importa-paniere'),payload=document.getElementById('paniere-dati'),status=document.getElementById('paniere-stato');
 if(!button||!payload||!status)return;
 button.addEventListener('click',()=>{
  if(!navigator.onLine){status.textContent='Il menu e la lista sono leggibili qui. Ricollegati a Internet per aprire il calcolatore.';return;}
  try{
   const data=JSON.parse(payload.textContent);
   sessionStorage.setItem('perme-spesa-da-paniere-v1',JSON.stringify(data));
   location.assign(new URL('strumenti/costo-spesa-settimanale.html?origine=paniere',location.href));
  }catch(_){status.textContent='Il trasferimento non è riuscito. Puoi aprire il calcolatore vuoto dal collegamento qui sotto.';}
 });
})();
