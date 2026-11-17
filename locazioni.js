'use strict';

for (const button of document.querySelectorAll('[data-copia]')) {
  const message = document.getElementById(button.dataset.copia);
  const status = button.nextElementSibling;

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(message.innerText.trim());
      status.textContent = 'Testo copiato.';
    } catch (_) {
      message.focus();
      const range = document.createRange();
      range.selectNodeContents(message);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Testo selezionato. Usa il comando Copia del browser.';
    }
  });
  button.hidden = false;
}

const form = document.getElementById('verbale-modulo');
if (form) {
  const fields = [...form.querySelectorAll('input, textarea')];
  const printData = document.getElementById('verbale-dati');
  const printButton = document.getElementById('stampa-verbale');

  form.addEventListener('submit', event => event.preventDefault());
  window.addEventListener('beforeprint', () => {
    const content = document.createDocumentFragment();
    for (const field of fields) {
      const label = document.createElement('dt');
      label.textContent = field.labels[0].textContent;
      const value = document.createElement('dd');
      value.textContent = field.value.trim() || '________________________________________';
      content.append(label, value);
    }
    printData.replaceChildren(content);
  });

  document.documentElement.classList.add('verbale-pronto');
  printButton.addEventListener('click', () => window.print());
  printButton.hidden = false;
}
