(() => {
 'use strict';
 const form = document.getElementById('f'), button = document.getElementById('stampa');
 if (!form || !button) return;
 const euro = value => value.toLocaleString('it-IT', {style:'currency',currency:'EUR'});
 const number = value => value.toLocaleString('it-IT', {maximumFractionDigits:2});
 const node = (tag, text) => { const el=document.createElement(tag);if(text!==undefined)el.textContent=text;return el; };
 const style = node('style');
 style.textContent = '#perme-riepilogo-stampa{display:none}@media print{@page{size:A4;margin:12mm}body.perme-stampa-riepilogo{background:white!important;color:#17271e!important;font:11pt/1.4 system-ui!important}body.perme-stampa-riepilogo>*{display:none!important}body.perme-stampa-riepilogo>#perme-riepilogo-stampa{display:block!important;max-width:none;margin:0;padding:0}#perme-riepilogo-stampa h1{font:700 19pt/1.2 system-ui;margin:0 0 10pt}#perme-riepilogo-stampa h2{font:700 14pt/1.3 system-ui;margin:14pt 0 6pt}#perme-riepilogo-stampa table{width:100%;border-collapse:collapse;table-layout:fixed;font:9.5pt/1.35 system-ui}#perme-riepilogo-stampa th,#perme-riepilogo-stampa td{border:1px solid #9eaca3;padding:6pt;text-align:left;vertical-align:top;overflow-wrap:anywhere}#perme-riepilogo-stampa thead{display:table-header-group}#perme-riepilogo-stampa tr{break-inside:avoid}#perme-riepilogo-stampa th:first-child{width:25%}#perme-riepilogo-stampa p{margin:5pt 0}#perme-riepilogo-stampa a{color:inherit}}';
 document.head.append(style);
 let output;
 button.addEventListener('click', () => {
  if (!form.reportValidity()) return;
  form.requestSubmit();
  const data = window.PerMeSpesaUltimoRisultato?.();
  if (!data) return;
  output?.remove(); output = node('section'); output.id='perme-riepilogo-stampa';
  output.setAttribute('aria-label','Riepilogo stampabile della spesa');
  output.append(node('h1','Riepilogo della spesa · Per Me'));
  output.append(node('p','Persone: '+data.persone+'. Fonte dei prezzi: '+(data.fonte||'non indicata')+'. Data dei prezzi: '+(data.data||'non indicata')+'.'));
  const table=node('table'),caption=node('caption','Ingredienti e confezioni inseriti'),thead=node('thead'),head=node('tr'),tbody=node('tbody');
  for(const text of ['Ingrediente','Quantità usata','Prezzo unitario','Costo usato','Confezioni da acquistare']){const th=node('th',text);th.scope='col';head.append(th);}
  thead.append(head);table.append(caption,thead,tbody);
  for(const row of data.righe){
   const tr=node('tr'),unit=row.unita==='g'?'g':row.unita==='ml'?'ml':'pezzi',priceUnit=row.unita==='g'?'kg':row.unita==='ml'?'litro':'pezzo';
   const cells=[row.nome,row.quantita===null?'Da completare':number(row.quantita)+' '+unit,row.prezzo===null?'Prezzo mancante':euro(row.prezzo)+'/'+priceUnit,row.completo?euro(row.costo):'Non calcolato',row.cassa===null||!row.completo?'Formato non completo':row.confezioni+' × '+number(row.confezione)+' '+unit+' = '+euro(row.cassa)];
   for(const value of cells)tr.append(node('td',value));tbody.append(tr);
  }
  output.append(table,node('h2','Totali delle sole righe compilate'));
  output.append(node('p','Costo delle quantità utilizzate: '+euro(data.consumo)+'. Quota aritmetica per persona: '+euro(data.consumo/data.persone)+'.'));
  output.append(node('p',data.conConfezione?'Esborso per le confezioni note: '+euro(data.cassa)+' ('+data.conConfezione+' ingredienti su '+data.prezzati+' con prezzo completo).':'Esborso alla cassa non calcolabile: manca il contenuto delle confezioni.'));
  if(data.senzaPrezzo)output.append(node('p','Riepilogo parziale: '+data.senzaPrezzo+' righe senza prezzo o quantità completi.'));
  if(data.conConfezione<data.prezzati)output.append(node('p','Costo alla cassa parziale: mancano '+(data.prezzati-data.conConfezione)+' formati confezione.'));
  output.append(node('p','Le confezioni sono arrotondate per eccesso. Scorte, sconti, spedizione e alimenti non inseriti sono esclusi. Prezzi, disponibilità e origine non sono convalidati automaticamente.'));
  output.append(node('p','Calcolatore: https://cpcpcp106-coder.github.io/Per-Me/strumenti/costo-spesa-settimanale.html'));
  document.body.append(output);document.body.classList.add('perme-stampa-riepilogo');
  window.print();
 });
 window.addEventListener('afterprint',()=>document.body.classList.remove('perme-stampa-riepilogo'));
})();
