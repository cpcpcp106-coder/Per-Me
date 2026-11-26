'use strict';

(() => {
  const catalogo = window.PerMeCatalogo;
  if (!catalogo) return;
  const radice = new URL('./', document.currentScript.src);
  const modulo = document.getElementById('cerca-guide');
  const campo = document.getElementById('parole-guida');
  const stato = document.getElementById('stato-ricerca');
  const risultati = document.getElementById('risultati-guide');
  const altri = document.getElementById('altri-risultati');
  const aiuto = document.getElementById('aiuto-ricerca');
  const perPagina = 6;
  const paroleComuni = new Set('al alla alle che come con da dal dalla dei del della delle dello di ho il in la le nel non per posso si su sul un una'.split(' '));
  const collegamentiDiretti = [
    {
      href: 'dieta-guida-08-ricette-mediterranee-economiche-valori.html#spesa-settimana-documentata',
      titolo: 'Menu di sette giorni per due: prezzi e confezioni',
      categoria: 'Menu e spesa',
      parole: 'paniere spesa settimanale 2 due persone ingredienti prezzi confezioni costo menu mediterraneo',
      priorita: ['paniere', 'spesa settimanale', 'spesa due']
    },
    {
      href: 'agevolazioni-guida-09-locazioni-abitative.html#cauzione',
      titolo: 'Come chiedere la restituzione della cauzione',
      categoria: 'Casa in affitto',
      parole: 'deposito cauzionale cauzione affitto caparra restituzione proprietario',
      priorita: ['cauzione', 'deposito cauzionale']
    },
    {
      href: 'strumenti/verbale-riconsegna-locazione.html',
      titolo: 'Compila il verbale di riconsegna delle chiavi',
      categoria: 'Casa in affitto',
      parole: 'verbale modulo riconsegna chiavi affitto casa appartamento',
      priorita: ['verbale', 'riconsegna chiavi']
    },
    {
      href: 'modelli-e-strumenti.html',
      titolo: 'Modelli e strumenti',
      categoria: 'Risorse di Per Me',
      parole: 'moduli modello fac simile lettere strumenti calcoli',
      priorita: ['modelli', 'strumenti', 'fac simile']
    },
    {
      href: 'dove-chiedere-aiuto.html',
      titolo: 'Dove chiedere aiuto',
      categoria: 'Risorse di Per Me',
      parole: 'sede recapiti contatti sportelli ufficio inps cup comune riscossione',
      priorita: ['aiuto', 'recapiti', 'sportelli']
    },
    {
      href: 'scadenze-del-mese.html',
      titolo: 'Scadenze del mese',
      categoria: 'Risorse di Per Me',
      parole: 'agenda calendario scadenze',
      priorita: ['scadenze', 'calendario']
    },
    {
      href: 'tutorial-smartphone.html',
      titolo: 'Tutorial per smartphone',
      categoria: 'Risorse di Per Me',
      parole: 'schermate tutorial telefono smartphone leggere offline salvare pdf',
      priorita: ['tutorial', 'smartphone']
    }
  ];
  const dettagliPerGuida = new Map([
    ['inps-contatti-telefono-richieste-appuntamenti.html', { parole: 'fax dismesso numero verde 803164 06164164 PIN telefonico INPS Risponde chiamare assistenza delega familiare', priorita: ['fax inps', 'telefono inps', 'contatti inps'] }],
    ['come-leggere-busta-paga.html', { parole: 'stipendio', priorita: ['cedolino'] }],
    ['controllare-cedolino-cassa-integrazione-solidarieta.html', { parole: 'busta paga CIG solidarietà' }],
    ['stipendio-diminuito-cosa-controllare.html', { parole: 'busta paga stipendio ridotto' }],
    ['salute-guida-07-cup-prenotazioni-liste-attesa.html', { parole: 'prenotare visita prenotazione visite liste attesa CUP ricetta prescrizione' }],
    ['inps-prestazione-sospesa-respinta-cosa-fare.html', { parole: 'lettera INPS mancato accredito comunicazione reiezione sospensione' }]
  ]);
  let indice;
  let caricamento;
  let corrispondenze = [];
  let mostrate = 0;

  function normalizza(testo) {
    return catalogo.normalizza(testo);
  }

  function leggiRicerca() {
    return normalizza(campo.value).split(' ').filter(parola => parola.length >= 2 && !paroleComuni.has(parola));
  }

  function prepara(voce) {
    return {
      ...voce,
      priorita: voce.priorita?.map(normalizza),
      titoloNormalizzato: normalizza(voce.titolo),
      testo: normalizza(`${voce.titolo} ${voce.parole || ''} ${voce.href.replace(/\.html|[-/#]/g, ' ')} ${voce.categoria}`)
    };
  }

  async function scarica(nome) {
    const url = new URL(nome, radice);
    const controller = new AbortController();
    const scadenza = setTimeout(() => controller.abort(), 15000);
    try {
      const risposta = await fetch(url, { signal: controller.signal });
      if (!risposta.ok) throw new Error(`HTTP ${risposta.status}`);
      const contenuto = document.createElement('template');
      contenuto.innerHTML = await risposta.text();
      const doc = contenuto.content;
      if (!doc.querySelector('main')) throw new Error('Pagina senza contenuto');
      return { doc, src: url };
    } finally {
      clearTimeout(scadenza);
    }
  }

  function punteggio(voce, parole) {
    if (!parole.every(parola => voce.testo.includes(parola))) return 0;
    const frase = parole.join(' ');
    if (voce.priorita?.includes(frase)) return 100;
    return 1 + parole.filter(parola => voce.titoloNormalizzato.includes(parola)).length * 2;
  }

  function mostraAltri() {
    for (const voce of corrispondenze.slice(mostrate, mostrate + perPagina)) {
      const elemento = document.createElement('li');
      const link = document.createElement('a');
      const categoria = document.createElement('span');
      const titolo = document.createElement('strong');
      link.href = new URL(voce.href, radice);
      categoria.textContent = voce.categoria;
      titolo.textContent = voce.titolo;
      link.append(titolo, categoria);
      elemento.append(link);
      risultati.append(elemento);
    }
    mostrate = risultati.children.length;
    risultati.hidden = mostrate === 0;
    altri.hidden = mostrate >= corrispondenze.length;
  }

  function mostraRisultati() {
    const parole = leggiRicerca();
    risultati.replaceChildren();
    risultati.hidden = true;
    altri.hidden = true;
    if (aiuto) aiuto.hidden = true;
    mostrate = 0;
    if (!parole.length) {
      stato.textContent = '';
      return;
    }
    if (!indice) {
      stato.textContent = 'Sto caricando le guide…';
      return;
    }
    corrispondenze = indice.voci.map(voce => ({ voce, punti: punteggio(voce, parole) }))
      .filter(({ punti }) => punti > 0)
      .sort((a, b) => b.punti - a.punti || a.voce.titolo.localeCompare(b.voce.titolo, 'it'))
      .map(({ voce }) => voce);
    mostraAltri();
    const numero = corrispondenze.length;
    if (aiuto) aiuto.hidden = numero > 0;
    const messaggio = numero ? `${numero} ${numero === 1 ? 'risultato' : 'risultati'}.` : 'Nessun risultato. Prova con un’altra parola.';
    stato.textContent = indice.parziale
      ? `${messaggio} Alcune rubriche non si sono caricate. Premi «Cerca» per riprovare.`
      : messaggio;
  }

  function aggiorna(riprova = false) {
    if (leggiRicerca().length && !caricamento && (!indice || (riprova && indice.parziale))) {
      caricamento = catalogo.carica(radice, scarica)
        .then(({ pagine, errori }) => {
          const voci = [...pagine].map(([href, { titolo, categoria, descrizione }]) => {
            const dettagli = dettagliPerGuida.get(href);
            const parole = [descrizione, dettagli?.parole].filter(Boolean).join(' ');
            return { href, titolo, categoria, ...dettagli, parole };
          });
          indice = { voci: [...collegamentiDiretti, ...voci].map(prepara), parziale: Boolean(errori.length) };
        })
        .catch(() => {
          indice = { voci: collegamentiDiretti.map(prepara), parziale: true };
        })
        .finally(() => {
          caricamento = undefined;
          mostraRisultati();
        });
    }
    mostraRisultati();
  }

  campo.addEventListener('input', () => aggiorna());
  modulo.addEventListener('submit', evento => {
    evento.preventDefault();
    aggiorna(true);
  });
  altri.addEventListener('click', () => {
    const precedente = mostrate;
    mostraAltri();
    risultati.children[precedente]?.querySelector('a')?.focus();
  });
  modulo.hidden = false;
})();
