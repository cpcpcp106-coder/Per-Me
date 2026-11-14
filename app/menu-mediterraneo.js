'use strict';

const giorni = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
const pasti = ['Colazione', 'Pranzo', 'Cena'];
const posti = giorni.length * pasti.length;
const massimoPorzioni = 12;
const massimoGrammi = 100000;
const reparti = ['Frutta e verdura', 'Pane', 'Legumi', 'Dispensa', 'Pesce', 'Carne bianca', 'Uova e latticini', 'Surgelati'];
const chiave = 'perme-menu-mediterraneo-v1';
const archivioApp = 'perme-app-offline-20261014';
const numero = new Intl.NumberFormat('it-IT', { maximumFractionDigits: 1 });
const grammi = value => numero.format(value) + ' g';

function intero(value, min, max, fallback = 0) {
  return Number.isInteger(value) && value >= min && value <= max ? value : fallback;
}

function normalizzaStato(data, ricette, vecchio = {}) {
  const idAggiunte = new Set(data.aggiunte.flatMap(group => group.alimenti));
  const menu = Array.isArray(vecchio.menu) ? vecchio.menu : [];
  const scorte = Object.entries(vecchio.scorte || {}).filter(([key, val]) =>
    Object.hasOwn(data.ingredienti, key.split(':')[0]) && intero(val, 1, massimoGrammi));
  const presi = Array.isArray(vecchio.presenti) ? vecchio.presenti : [];
  return {
    persone: intero(vecchio.persone, 1, massimoPorzioni, 1),
    legumi: vecchio.legumi === 'secchi' ? 'secchi' : 'cotti',
    menu: Array.from({ length: posti }, (_, i) => {
      const riga = menu[i];
      const ricetta = ricette.get(riga?.ricetta);
      const corretto = ricetta && (ricetta.gruppo === 'colazione') === (i % 3 === 0);
      return {
        ricetta: corretto ? ricetta.id : '',
        porzioni: corretto ? intero(riga?.porzioni, 1, massimoPorzioni, null) : null
      };
    }),
    scorte: Object.fromEntries(scorte),
    presenti: presi.filter(id => typeof id === 'string' && Object.hasOwn(data.ingredienti, id.split(':')[0])),
    aggiunte: Object.fromEntries(Object.entries(vecchio.aggiunte || {}).filter(([key, val]) =>
      idAggiunte.has(key) && intero(val, 1, massimoGrammi)))
  };
}

function ingredientiNecessari(stato, data, ricette) {
  const totali = new Map();

  function somma(id, peso) {
    const alimento = data.ingredienti[id];
    const conversione = alimento.acquisto;
    const prodotto = conversione ? conversione.ingrediente : id;
    const scheda = data.ingredienti[prodotto];
    const secco = scheda.resaSecco && stato.legumi === 'secchi';
    const chiaveAcquisto = scheda.resaSecco ? prodotto + ':' + stato.legumi : prodotto;
    const coefficiente = (conversione?.resa ?? 1) * (secco ? scheda.resaSecco : 1);
    const voce = totali.get(chiaveAcquisto) || { id: chiaveAcquisto, scheda, grammi: 0, stimato: false };
    voce.grammi += peso / coefficiente;
    voce.stimato ||= Boolean(conversione || secco);
    totali.set(chiaveAcquisto, voce);
  }

  for (const pasto of stato.menu) {
    const ricetta = ricette.get(pasto.ricetta);
    if (!ricetta) continue;
    const porzioni = pasto.porzioni ?? stato.persone;
    for (const [id, peso] of ricetta.ingredienti) somma(id, peso * porzioni / ricetta.porzioni);
  }
  for (const [id, peso] of Object.entries(stato.aggiunte)) somma(id, peso);

  return [...totali.values()].map(voce => {
    const { scheda } = voce;
    const divisor = scheda.grammiPerPezzo || 1;
    const totale = Math.ceil(voce.grammi / divisor - 1e-9);
    const nota = scheda.resaSecco
      ? (stato.legumi === 'secchi' ? 'peso secco prima dell’ammollo' : 'peso sgocciolato')
      : (scheda.grammiPerPezzo ? 'uova medie' : scheda.peso);
    return {
      id: voce.id, nome: scheda.nome, reparto: scheda.reparto, nota, totale,
      unita: scheda.grammiPerPezzo ? 'pezzi' : 'g', stimato: voce.stimato
    };
  }).sort((a, b) => reparti.indexOf(a.reparto) - reparti.indexOf(b.reparto) || a.nome.localeCompare(b.nome, 'it'));
}

function daComprare(voce, stato) {
  return stato.presenti.includes(voce.id) ? 0 : Math.max(0, voce.totale - (stato.scorte[voce.id] || 0));
}

if (typeof module === 'object') {
  module.exports = { normalizzaStato, ingredientiNecessari, daComprare };
}

function avviaMenu(data) {
  const el = id => document.getElementById(id);
  const crea = (tag, testo, classe) => {
    const nodo = document.createElement(tag);
    if (testo) nodo.textContent = testo;
    if (classe) nodo.className = classe;
    return nodo;
  };
  const ricette = new Map(data.ricette.map(item => [item.id, item]));
  let precedente;
  try { precedente = JSON.parse(localStorage.getItem(chiave)) || {}; } catch (_) { precedente = {}; }
  let stato = normalizzaStato(data, ricette, precedente);
  const controlli = [];
  const riepiloghi = [];
  const righeSpesa = [];
  const formatoPeso = (value, unit) => numero.format(value) + ' ' + (unit === 'pezzi' && value === 1 ? 'pezzo' : unit);

  function salva() {
    try {
      localStorage.setItem(chiave, JSON.stringify(stato));
      el('salvataggio').hidden = true;
    } catch (_) {
      el('salvataggio').textContent = 'Salvataggio sul telefono non disponibile. Puoi copiare o stampare la lista prima di chiudere.';
      el('salvataggio').hidden = false;
    }
  }

  function aggiornaPasti() {
    controlli.forEach(({ ricetta, porzioni, valori, link }, i) => {
      const scelta = stato.menu[i];
      const piatto = ricette.get(scelta.ricetta);
      ricetta.value = scelta.ricetta;
      porzioni.value = scelta.porzioni ?? '';
      porzioni.options[0].textContent = 'Come a tavola (' + stato.persone + ')';
      porzioni.disabled = !piatto;
      valori.textContent = piatto ? piatto.kcal + ' kcal · ' + grammi(piatto.carboidrati) + ' di carboidrati per porzione' : '';
      link.hidden = !piatto;
      if (piatto) {
        link.href = '../' + piatto.path;
        link.setAttribute('aria-label', 'Leggi la ricetta ' + piatto.titolo);
      }
    });

    riepiloghi.forEach((riepilogo, giorno) => {
      const titoli = stato.menu.slice(giorno * 3, giorno * 3 + 3).map(({ ricetta }) => ricette.get(ricetta)?.titolo).filter(Boolean);
      riepilogo.textContent = titoli.length ? ' · ' + titoli.join(' / ') : ' · Da compilare';
    });
    const conteggi = new Map();
    let principali = 0;
    stato.menu.forEach(({ ricetta }, i) => {
      const piatto = ricette.get(ricetta);
      if (!piatto || i % 3 === 0) return;
      principali++;
      conteggi.set(piatto.gruppo, (conteggi.get(piatto.gruppo) || 0) + 1);
    });
    const colazioni = stato.menu.filter((value, i) => i % 3 === 0 && value.ricetta).length;
    el('copertura').textContent = principali + ' pranzi e cene scelti su 14 · ' + colazioni + ' colazioni scelte su 7';
    el('rotazione').replaceChildren(...Object.entries(data.gruppi).filter(([id]) => conteggi.has(id))
      .map(([id, label]) => crea('li', label + ' ' + conteggi.get(id))));
  }

  function aggiornaDaComprare() {
    let mancanti = 0;
    for (const { voce, li, quantita } of righeSpesa) {
      const necessario = daComprare(voce, stato);
      if (necessario) mancanti++;
      li.classList.toggle('gia-disponibile', necessario === 0);
      quantita.textContent = necessario ? 'Da comprare ' + formatoPeso(necessario, voce.unita) : 'Già disponibile';
    }
    el('stato-lista').textContent = mancanti
      ? mancanti + (mancanti === 1 ? ' ingrediente da comprare' : ' ingredienti da comprare')
      : righeSpesa.length ? 'Hai già tutti gli ingredienti del menu.' : 'Scegli un pasto o aggiungi un alimento per ottenere la lista.';
    el('copia').disabled = mancanti === 0;
    el('stampa').disabled = mancanti === 0;
    const manuale = el('copia-manuale');
    if (!manuale.hidden) {
      el('testo-lista').value = testoLista();
      manuale.hidden = mancanti === 0;
    }
    el('esito-copia').textContent = '';
  }

  function testoLista() {
    const lista = ['Lista della spesa · Per Me'];
    for (const reparto of reparti) {
      const prodotti = righeSpesa.map(x => x.voce).filter(voce => voce.reparto === reparto && daComprare(voce, stato) > 0);
      if (!prodotti.length) continue;
      lista.push('', reparto);
      for (const voce of prodotti) {
        const peso = formatoPeso(daComprare(voce, stato), voce.unita);
        lista.push('• ' + voce.nome + ' — ' + (voce.stimato ? 'circa ' : '') + peso + (voce.nota ? ' (' + voce.nota + ')' : ''));
      }
    }
    return lista.join('\n');
  }

  function mostraSpesa() {
    const spesa = el('lista');
    spesa.replaceChildren();
    righeSpesa.length = 0;
    const voci = ingredientiNecessari(stato, data, ricette);

    for (const reparto of reparti) {
      const vociReparto = voci.filter(voce => voce.reparto === reparto);
      if (!vociReparto.length) continue;
      const section = crea('section', '', 'reparto');
      const lista = crea('ul');
      section.append(crea('h3', reparto), lista);
      for (const voce of vociReparto) {
        const li = crea('li', '', 'riga-spesa');
        li.dataset.ingrediente = voce.id;
        const descrizione = crea('div');
        const quantita = crea('strong', '', 'acquisto');
        const statoPeso = 'Servono ' + (voce.stimato ? 'circa ' : '') + formatoPeso(voce.totale, voce.unita)
          + (voce.nota ? ' · ' + voce.nota : '');
        descrizione.append(crea('p', voce.nome, 'ingredient-name'), crea('p', statoPeso, 'ingredient-note'), quantita);

        const scorta = crea('div', '', 'scorta');
        const campo = crea('div', '', 'campo');
        const id = 'scorta-' + voce.id.replace(':', '-');
        const label = crea('label', voce.unita === 'g' ? 'Hai già (g)' : 'Hai già (pezzi)');
        label.htmlFor = id;
        const input = crea('input');
        input.id = id;
        input.type = 'number';
        input.inputMode = 'numeric';
        input.min = '0';
        input.max = String(massimoGrammi);
        input.step = '1';
        input.value = stato.scorte[voce.id] || '';
        input.setAttribute('aria-label', label.textContent + ' · ' + voce.nome);
        input.addEventListener('input', () => {
          const valore = intero(input.valueAsNumber, 1, massimoGrammi);
          if (valore) stato.scorte[voce.id] = valore;
          else delete stato.scorte[voce.id];
          aggiornaDaComprare();
          salva();
        });
        input.addEventListener('change', () => { input.value = stato.scorte[voce.id] || ''; });
        campo.append(label, input);
        const tutto = crea('label', '', 'scorta-tutta');
        const check = crea('input');
        check.type = 'checkbox';
        check.checked = stato.presenti.includes(voce.id);
        check.setAttribute('aria-label', 'Ho già tutto: ' + voce.nome);
        input.disabled = check.checked;
        check.addEventListener('change', () => {
          stato.presenti = stato.presenti.filter(id => id !== voce.id);
          if (check.checked) stato.presenti.push(voce.id);
          input.disabled = check.checked;
          aggiornaDaComprare();
          salva();
        });
        tutto.append(check, document.createTextNode('Ho già tutto'));
        scorta.append(campo, tutto);
        li.append(descrizione, scorta);
        lista.append(li);
        righeSpesa.push({ voce, li, quantita });
      }
      spesa.append(section);
    }
    aggiornaDaComprare();
  }

  function mostraAggiunte() {
    const lista = el('aggiunte');
    lista.replaceChildren();
    for (const [id, peso] of Object.entries(stato.aggiunte)) {
      const nome = data.ingredienti[id].nome;
      const li = crea('li');
      const remove = crea('button', 'Togli', 'pulsante-secondario');
      remove.type = 'button';
      remove.setAttribute('aria-label', 'Togli ' + nome + ' dalle aggiunte');
      remove.addEventListener('click', () => {
        delete stato.aggiunte[id];
        mostraAggiunte();
        mostraSpesa();
        salva();
        el('ingrediente-extra').focus();
      });
      li.append(crea('span', nome + ' · ' + grammi(peso)), remove);
      lista.append(li);
    }
  }

  function aggiungiOpzioni() {
    for (let n = 1; n <= massimoPorzioni; n++) el('persone').add(new Option(n, n));
    el('persone').value = stato.persone;
    el('legumi').value = stato.legumi;
    data.settimane.forEach(esempio => el('esempio').add(new Option(esempio.nome, esempio.id)));
    for (const { titolo, alimenti } of data.aggiunte) {
      const group = crea('optgroup');
      group.label = titolo;
      for (const id of alimenti) group.append(new Option(data.ingredienti[id].nome, id));
      el('ingrediente-extra').append(group);
    }
  }

  function costruisciGiorni() {
    const giorniBox = el('giorni');
    giorni.forEach((giorno, g) => {
      const details = crea('details', '', 'giorno');
      details.name = 'giorni-menu';
      const summary = crea('summary');
      const riepilogo = crea('span');
      riepiloghi.push(riepilogo);
      summary.append(crea('strong', giorno), riepilogo);
      const griglia = crea('div', '', 'pasti');
      pasti.forEach((pasto, p) => {
        const i = g * 3 + p;
        const campo = crea('div', '', 'pasto');
        const label = crea('label', pasto);
        const ricetta = crea('select');
        ricetta.id = 'pasto-' + i;
        ricetta.setAttribute('aria-label', giorno + ', ' + pasto.toLocaleLowerCase('it'));
        label.htmlFor = ricetta.id;
        ricetta.add(new Option('Scegli la ricetta', ''));
        for (const [id, nome] of Object.entries(data.gruppi)) {
          if ((id === 'colazione') !== (p === 0)) continue;
          const gruppo = crea('optgroup');
          gruppo.label = nome;
          for (const item of data.ricette.filter(r => r.gruppo === id)) gruppo.append(new Option(item.titolo, item.id));
          ricetta.append(gruppo);
        }
        const boxRicetta = crea('div', '', 'campo');
        boxRicetta.append(label, ricetta);
        const boxPorzioni = crea('div', '', 'campo porzione');
        const labelPorzioni = crea('label', 'Porzioni');
        const porzioni = crea('select');
        porzioni.id = 'porzioni-' + i;
        porzioni.setAttribute('aria-label', 'Porzioni per ' + giorno.toLocaleLowerCase('it') + ', ' + pasto.toLocaleLowerCase('it'));
        labelPorzioni.htmlFor = porzioni.id;
        porzioni.add(new Option('Come a tavola', ''));
        for (let n = 1; n <= massimoPorzioni; n++) porzioni.add(new Option(n, n));
        boxPorzioni.append(labelPorzioni, porzioni);
        const valori = crea('p', '', 'valori');
        const link = crea('a', 'Leggi la ricetta');
        link.dataset.guida = '';
        campo.append(boxRicetta, boxPorzioni, valori, link);
        griglia.append(campo);
        controlli.push({ ricetta, porzioni, valori, link, details });

        ricetta.addEventListener('change', () => {
          stato.menu[i].ricetta = ricetta.value;
          if (!ricetta.value) stato.menu[i].porzioni = null;
          aggiornaPasti();
          mostraSpesa();
          salva();
        });
        porzioni.addEventListener('change', () => {
          stato.menu[i].porzioni = Number(porzioni.value) || null;
          mostraSpesa();
          salva();
        });
      });
      details.append(summary, griglia);
      giorniBox.append(details);
    });
  }

  function preparaRicettaDaArchivio() {
    const ricetta = ricette.get(new URLSearchParams(location.hash.slice(1)).get('ricetta'));
    const box = el('scelta-ricetta');
    box.hidden = !ricetta;
    if (!ricetta) return;
    el('scelta-titolo').textContent = ricetta.titolo;
    const select = el('scelta-posto');
    select.replaceChildren();
    for (let i = 0; i < posti; i++) {
      if ((ricetta.gruppo === 'colazione') !== (i % 3 === 0)) continue;
      const occupato = stato.menu[i].ricetta;
      const label = giorni[Math.floor(i / 3)] + ' · ' + pasti[i % 3] + (occupato ? ' (sostituisci il pasto)' : '');
      select.add(new Option(label, i));
    }
    const libero = Array.from(select.options).find(option => !stato.menu[Number(option.value)].ricetta);
    if (libero) select.value = libero.value;
    el('salva-ricetta').onclick = () => {
      const i = Number(select.value);
      stato.menu[i].ricetta = ricetta.id;
      aggiornaPasti();
      mostraSpesa();
      salva();
      history.replaceState(null, '', location.pathname + location.search);
      box.hidden = true;
      controlli[i].details.open = true;
      controlli[i].ricetta.focus();
    };
  }

  function apriGuidaSalvata(event) {
    const link = event.target.closest('a[data-guida]');
    if (!link) return;
    const url = new URL(link.href);
    const file = url.pathname.split('/').at(-1);
    let archivio;
    try { archivio = JSON.parse(localStorage.getItem(archivioApp)); } catch (_) { return; }
    if (navigator.onLine && !window.matchMedia('(display-mode: standalone)').matches) return;
    if (!archivio?.guides?.some(guida => guida.path === file)) return;
    event.preventDefault();
    const app = new URL('./', location.href);
    const anchor = url.hash.slice(1);
    app.hash = 'guida=' + encodeURIComponent(file) + (anchor ? '&sezione=' + encodeURIComponent(anchor) : '');
    location.href = app.href;
  }

  aggiungiOpzioni();
  costruisciGiorni();
  aggiornaPasti();
  mostraAggiunte();
  mostraSpesa();
  el('strumento').hidden = false;
  el('avvio-menu').hidden = true;
  const primoPasto = Math.max(0, stato.menu.findIndex(x => x.ricetta));
  controlli[primoPasto].details.open = true;
  preparaRicettaDaArchivio();
  window.addEventListener('hashchange', preparaRicettaDaArchivio);
  document.addEventListener('click', apriGuidaSalvata);
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(() => {});

  el('persone').addEventListener('change', () => {
    stato.persone = Number(el('persone').value);
    aggiornaPasti();
    mostraSpesa();
    salva();
  });
  el('esempio').addEventListener('change', () => { el('carica').disabled = !el('esempio').value; });
  el('carica').addEventListener('click', () => {
    const esempio = data.settimane.find(e => e.id === el('esempio').value);
    if (!esempio) return;
    if (stato.menu.some(x => x.ricetta) && !window.confirm('Sostituire i pasti della settimana con questo esempio?')) return;
    stato.menu = esempio.giorni.flat().map(id => ({ ricetta: id, porzioni: null }));
    aggiornaPasti();
    mostraSpesa();
    salva();
    controlli[0].details.open = true;
    controlli[0].details.querySelector('summary').focus();
  });
  el('azzera').addEventListener('click', () => {
    if (!window.confirm('Svuotare pasti, aggiunte e scorte del menu?')) return;
    stato = normalizzaStato(data, ricette, { persone: stato.persone, legumi: stato.legumi });
    aggiornaPasti();
    mostraAggiunte();
    mostraSpesa();
    salva();
    el('esempio').value = '';
    el('carica').disabled = true;
  });
  el('legumi').addEventListener('change', () => {
    stato.legumi = el('legumi').value;
    mostraSpesa();
    salva();
  });
  el('aggiungi-form').addEventListener('submit', event => {
    event.preventDefault();
    const id = el('ingrediente-extra').value;
    const peso = intero(el('quantita-extra').valueAsNumber, 1, massimoGrammi);
    if (!id || !peso) return;
    const totale = (stato.aggiunte[id] || 0) + peso;
    if (totale > massimoGrammi) {
      el('quantita-extra').setCustomValidity('La quantità totale supera 100.000 g.');
      el('quantita-extra').reportValidity();
      return;
    }
    stato.aggiunte[id] = totale;
    el('aggiungi-form').reset();
    mostraAggiunte();
    mostraSpesa();
    salva();
  });
  el('quantita-extra').addEventListener('input', event => event.target.setCustomValidity(''));
  el('ingrediente-extra').addEventListener('change', () => el('quantita-extra').setCustomValidity(''));
  el('copia').addEventListener('click', async () => {
    const testo = testoLista();
    try {
      await navigator.clipboard.writeText(testo);
      el('esito-copia').textContent = 'Lista copiata. Puoi incollarla nelle Note.';
      el('copia-manuale').hidden = true;
    } catch (_) {
      el('copia-manuale').hidden = false;
      const campo = el('testo-lista');
      campo.value = testo;
      campo.focus();
      campo.select();
      el('esito-copia').textContent = 'Il testo è selezionato. Usa Copia dal menu del telefono.';
    }
  });
  el('stampa').addEventListener('click', () => window.print());
}

if (typeof window !== 'undefined' && window.PerMeRicetteMediterranee) avviaMenu(window.PerMeRicetteMediterranee);
