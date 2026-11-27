'use strict';
(() => {
  const dateText = value => {
    if (typeof value !== 'string' || !value.trim()) throw new Error('Data mancante');
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) throw new Error('Data mancante');
    return date.toLocaleString('it-IT', {timeZone: 'Europe/Rome'});
  };
  const read = async url => {
    const response = await fetch(url, {cache: 'no-store'});
    if (!response.ok) throw new Error('Rapporto non caricato');
    return response.json();
  };
  const loadStatic = async () => {
    const status = document.getElementById('statico-stato');
    if (!status) return;
    try {
      const report = await read('monitoraggio/ultimo-audit-statico.json');
      const count = report.scope?.editorial_pages;
      const local = report.links?.broken_local;
      const anchors = report.links?.broken_anchors;
      if (!Number.isInteger(count) || count < 1 || !Array.isArray(local) || !Array.isArray(anchors)) throw new Error('Rapporto incompleto');
      const checked = dateText(report.date_utc);
      document.getElementById('statico-pagine').textContent = String(count);
      document.getElementById('statico-problemi').textContent = String(local.length + anchors.length);
      document.getElementById('statico-descrizione').textContent = 'Il rapporto esamina ' + count + ' pagine pubbliche nei sorgenti. Rileva ' + local.length + ' collegamenti a file mancanti e ' + anchors.length + ' rimandi a sezioni da verificare. Non è una prova di apertura di tutti i siti esterni.';
      status.textContent = 'Controllo statico del ' + checked + ', ora italiana.';
    } catch {
      status.textContent = 'Riepilogo automatico non disponibile. I dati qui sotto si riferiscono al controllo del 27 novembre 2026; apri il rapporto per verificare aggiornamenti successivi.';
    }
  };
  const loadBrowser = async () => {
    const status = document.getElementById('browser-stato');
    if (!status) return;
    try {
      const report = await read('monitoraggio/ultimo-collaudo-browser.json');
      if (!Array.isArray(report.tests) || !report.tests.length) throw new Error('Prove mancanti');
      const checked = dateText(report.checked_at_utc);
      const passed = report.tests.filter(test => test.result === 'PASS').length;
      const other = report.tests.length - passed;
      const hasErrors = (report.page_errors || []).length || (report.axe || []).some(item => item.error || item.violations?.length);
      const completed = report.status === 'COMPLETED';
      status.textContent = 'Prove del ' + checked + ', ora italiana: ' + passed + ' riuscite su ' + report.tests.length + '. ' +
        (!completed ? 'Il collaudo non risulta concluso.' : other || hasErrors ? 'Sono presenti esiti o errori da verificare nel rapporto.' : 'Nessun esito negativo registrato nei controlli eseguiti.');
    } catch {
      status.textContent = 'Riepilogo delle prove non disponibile. Apri il rapporto per leggere data, esiti e limiti.';
    }
  };
  loadStatic();
  loadBrowser();
})();
