'use strict';
(() => {
  const cards = [...document.querySelectorAll('[data-percorso]')];
  if (!cards.length) return;
  let printTarget = null;
  let openedForPrint = [];
  const resetPrint = () => {
    document.body.classList.remove('stampa-percorso');
    cards.forEach(card => card.classList.remove('da-stampare'));
    openedForPrint.forEach(card => { card.open = false; });
    openedForPrint = [];
    printTarget = null;
  };
  const openForPrint = card => {
    if (card.tagName === 'DETAILS' && !card.open) {
      openedForPrint.push(card);
      card.open = true;
    }
  };
  const openHash = () => {
    const target = cards.find(card => '#' + card.id === location.hash);
    if (target && target.tagName === 'DETAILS') target.open = true;
  };
  window.addEventListener('hashchange', openHash);
  document.querySelectorAll('.percorsi-scelta a').forEach(link => link.addEventListener('click', () => {
    const target = cards.find(card => '#' + card.id === link.hash);
    if (target && target.tagName === 'DETAILS') target.open = true;
  }));
  openHash();
  window.addEventListener('beforeprint', () => {
    (printTarget ? [printTarget] : cards).forEach(openForPrint);
  });
  window.addEventListener('afterprint', resetPrint);
  for (const card of cards) {
    card.querySelectorAll('a[href]').forEach(link => { link.dataset.indirizzoStampa = link.href; });
    const controls = card.querySelector('.percorso-azioni');
    const status = controls.querySelector('[role="status"]');
    const fallback = controls.querySelector('.percorso-copia-manuale');
    const output = fallback.querySelector('textarea');
    const copyButton = controls.querySelector('[data-copia-percorso]');
    controls.hidden = false;
    copyButton.addEventListener('click', async () => {
      const lines = [...card.querySelectorAll('h2,summary,p,li')]
        .filter(element => !element.closest('.percorso-azioni'))
        .map(element => (element.tagName === 'LI' ? (Array.from(element.parentElement.children).indexOf(element) + 1) + '. ' : '') + element.textContent.trim());
      const links = [...new Map([...card.querySelectorAll('a[href]')]
        .map(link => [link.href, link.textContent.trim()])).entries()];
      const text = 'Per Me — ' + lines.join('\n\n') + '\n\nCollegamenti utili:\n' +
        links.map(([url, title]) => title + '\n' + url).join('\n\n');
      copyButton.disabled = true;
      fallback.hidden = true;
      status.textContent = 'Preparazione dei passi…';
      let clipboardTimer;
      try {
        if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Appunti non disponibili');
        await Promise.race([
          navigator.clipboard.writeText(text),
          new Promise((resolve, reject) => {
            clipboardTimer = window.setTimeout(() => reject(new Error('Appunti in attesa')), 1500);
          })
        ]);
        status.textContent = 'Passi copiati. Puoi incollarli nelle note o in un messaggio.';
      } catch {
        output.value = text;
        fallback.hidden = false;
        output.focus();
        output.select();
        status.textContent = 'Copia il testo selezionato dal riquadro qui sotto.';
      } finally {
        window.clearTimeout(clipboardTimer);
        copyButton.disabled = false;
      }
    });
    controls.querySelector('[data-stampa-percorso]').addEventListener('click', () => {
      resetPrint();
      printTarget = card;
      openForPrint(card);
      card.classList.add('da-stampare');
      document.body.classList.add('stampa-percorso');
      try { window.print(); }
      catch {
        resetPrint();
        status.textContent = 'La stampa non si è aperta. Puoi copiare i passi e conservarli nelle note.';
      }
    });
  }
})();
