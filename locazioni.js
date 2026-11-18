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
  const review = document.getElementById('riepilogo-verbale');
  const reviewButton = document.getElementById('rivedi-verbale');

  function renderFields(target, emptyValue, editable = false) {
    const content = document.createDocumentFragment();
    for (const field of fields) {
      const label = document.createElement('dt');
      label.textContent = field.labels[0].textContent;
      const value = document.createElement('dd');
      value.textContent = field.value.trim() || emptyValue;
      if (editable) {
        const link = document.createElement('a');
        link.href = `#${field.id}`;
        link.textContent = 'Modifica';
        link.setAttribute('aria-label', `Modifica ${label.textContent}`);
        link.addEventListener('click', event => {
          event.preventDefault();
          field.focus();
        });
        value.append(link);
      }
      content.append(label, value);
    }
    target.replaceChildren(content);
  }

  form.addEventListener('submit', event => event.preventDefault());
  window.addEventListener('beforeprint', () => renderFields(printData, '________________________________________'));
  document.documentElement.classList.add('verbale-pronto');
  printButton.addEventListener('click', () => window.print());
  printButton.hidden = false;

  if (review && reviewButton) {
    const updateReview = () => renderFields(review, 'Campo vuoto', true);
    reviewButton.addEventListener('click', () => {
      review.hidden = !review.hidden;
      reviewButton.setAttribute('aria-expanded', String(!review.hidden));
      if (!review.hidden) updateReview();
    });
    form.addEventListener('input', () => {
      if (!review.hidden) updateReview();
    });
    reviewButton.hidden = false;
  }
}
