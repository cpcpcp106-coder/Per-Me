'use strict';

window.PerMeCatalogo = (() => {
  const sezioni = new Map([
    ['soldi-lavoro.html', 'Soldi & Lavoro'],
    ['pensione-invalidita.html', 'Pensione e invalidità'],
    ['pensionati-estero.html', 'Pensionati all’estero'],
    ['debiti-cartelle.html', 'Debiti e cartelle'],
    ['agevolazioni-diritti.html', 'Agevolazioni e diritti'],
    ['salute-autonomia.html', 'Salute e autonomia'],
    ['tutor-ai.html', 'Tutor AI essenziale'],
    ['diabete-tipo-2.html', 'Diabete tipo 2'],
    ['dieta-mediterranea-scientifica.html', 'Dieta mediterranea scientifica'],
    ['lievito-madre.html', 'Pasta madre e LI.CO.LI.']
  ]);
  const ricette = 'dieta-mediterranea-ricette.html';
  const escluse = new Set(['index.html', 'metodo.html', 'monitoraggio.html', 'chi-siamo.html']);

  function percorso(href, fonte, radice) {
    try {
      const url = new URL(href, fonte);
      if (url.origin !== radice.origin || !url.pathname.startsWith(radice.pathname)) return null;
      const nome = decodeURIComponent(url.pathname.slice(radice.pathname.length));
      return /^[a-z0-9-]+\.html$/i.test(nome) && !escluse.has(nome) ? nome : null;
    } catch {
      return null;
    }
  }

  function aggiungi(pagine, doc, fonte, radice, categoria) {
    for (const link of doc.querySelectorAll('main a[href]')) {
      const nome = percorso(link.getAttribute('href'), fonte, radice);
      if (!nome || sezioni.has(nome) || pagine.has(nome)) continue;
      const etichetta = link.querySelector('.a04-guide-card > strong') ?? link;
      const titolo = etichetta.textContent.trim().replace(/\s+/g, ' ');
      const descrizione = link.querySelector('.a04-guide-card > em')?.textContent.trim();
      pagine.set(nome, { categoria, titolo: titolo || nome.replace(/\.html$/, '').replace(/-/g, ' '), descrizione });
    }
  }

  async function carica(radice, scarica) {
    const pagine = new Map();
    const errori = [];
    const rubriche = [...sezioni];
    const risposte = await Promise.allSettled(rubriche.map(([nome]) => scarica(nome)));
    rubriche.forEach(([nome, categoria], indice) => {
      const risposta = risposte[indice];
      if (risposta.status !== 'fulfilled') {
        errori.push(nome);
        return;
      }
      const { doc, src } = risposta.value;
      pagine.set(nome, { categoria, titolo: categoria });
      aggiungi(pagine, doc, src || new URL(nome, radice), radice, categoria);
    });
    if (pagine.has(ricette)) {
      try {
        const { doc, src } = await scarica(ricette);
        aggiungi(pagine, doc, src || new URL(ricette, radice), radice, pagine.get(ricette).categoria);
      } catch {
        errori.push(ricette);
      }
    }
    return { pagine, errori };
  }

  return { sezioni, ricette, percorso, carica };
})();
