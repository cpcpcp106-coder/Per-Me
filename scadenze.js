'use strict';

const formatoDataRoma = new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'Europe/Rome',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});
const oggi = formatoDataRoma.format(new Date());
const schedeScadenza = [...document.querySelectorAll('[data-scadenza]')];
for (const scheda of schedeScadenza) {
  if (scheda.dataset.scadenza >= oggi) continue;
  const stato = scheda.querySelector('[data-scadenza-stato]');
  stato.textContent = 'Data trascorsa';
  stato.hidden = false;
}
document.getElementById('scadenze-terminate').hidden = schedeScadenza.some(scheda => scheda.dataset.scadenza >= oggi);
