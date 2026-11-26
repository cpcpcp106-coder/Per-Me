/* Per Me: lettura sul dispositivo e riscontri numerici per guida. */
(() => {
 'use strict';
 if (window.PerMeLettura) return;
 const root = new URL('./', document.currentScript.src);
 const storageKey = 'perme-lettura-scala-v1';
 const scales = [100, 125, 150, 175, 200];
 const html = document.documentElement;
 const originalSize = html.style.fontSize;
 const originalPriority = html.style.getPropertyPriority('font-size');
 const baseSize = parseFloat(getComputedStyle(html).fontSize);
 const reportTypes = Object.freeze({
  chiarezza: 'Passaggio poco chiaro',
  collegamento: 'Collegamento non funzionante',
  aggiornamento: 'Informazione da aggiornare'
 });
 let scale = 100, generation = 0, speechState = 'idle', activeSpeech = null;
 const toolbars = new Set(), submitted = new Set();
 const speech = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
 const node = (tag, text, className) => {
  const el = document.createElement(tag);
  if (text) el.textContent = text;
  if (className) el.className = className;
  return el;
 };
 const button = (text, label, action) => {
  const el = node('button', text);
  el.type = 'button';
  if (label) el.setAttribute('aria-label', label);
  el.addEventListener('click', action);
  return el;
 };
 html.dataset.permeLetturaAttiva='true';
 const style = node('style');
 style.id = 'perme-lettura-style';
 style.textContent = [
  'html[data-perme-lettura-attiva] main,html[data-perme-lettura-attiva] header{overflow-wrap:anywhere}html[data-perme-lettura-attiva] main article{min-width:0;max-width:100%}html[data-perme-lettura-attiva] nav a{max-width:100%;min-width:0;white-space:normal}html[data-perme-lettura-attiva] main pre,html[data-perme-lettura-attiva] main code{white-space:pre-wrap;overflow-wrap:anywhere}html[data-perme-lettura-attiva] main button,html[data-perme-lettura-attiva] main input,html[data-perme-lettura-attiva] main select,html[data-perme-lettura-attiva] main textarea{box-sizing:border-box;max-width:100%;min-width:0}',
  '.perme-lettura,.perme-riscontro{box-sizing:border-box;max-width:100%;min-width:0;margin:24px 0;padding:16px;border:2px solid #8ba998;border-radius:10px;background:#eef5ef;color:#17372a;overflow-wrap:anywhere;font-size:1rem;line-height:1.5}',
  '.perme-lettura p,.perme-riscontro p{margin:0 0 12px}.perme-lettura-titolo{font-weight:800}',
  '.perme-lettura summary{font:inherit;font-weight:800;cursor:pointer;min-height:48px;padding:8px 0}.perme-lettura[open] summary{margin-bottom:12px}',
  '.perme-lettura-azioni,.perme-riscontro-azioni{display:flex;flex-wrap:wrap;gap:10px;align-items:center}',
  '.perme-lettura button,.perme-riscontro button,.perme-riscontro a{box-sizing:border-box;min-height:52px;max-width:100%;min-width:0;padding:10px 14px;border:2px solid #234438;border-radius:8px;background:#234438;color:#fff;font:inherit;font-weight:750;line-height:1.4;white-space:normal;overflow-wrap:anywhere;text-align:center;text-decoration:none;cursor:pointer}',
  '.perme-lettura button:disabled,.perme-riscontro button:disabled{background:#e0e8e2;color:#354b3d;border-color:#718376;cursor:default}',
  '.perme-lettura button:focus-visible,.perme-riscontro button:focus-visible,.perme-riscontro a:focus-visible,.perme-riscontro input:focus-visible{outline:4px solid #a56a20;outline-offset:3px}',
  '.perme-lettura summary:focus-visible{outline:4px solid #a56a20;outline-offset:3px}',
  '.perme-lettura-stato{margin:12px 0 0!important}.perme-lettura-nota{font-size:1em;margin-top:12px!important}',
  '.perme-riscontro summary{font:inherit;font-size:1.08em;font-weight:800;cursor:pointer;min-height:44px;padding:8px 0}',
  '.perme-riscontro-categorie{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,12rem),1fr));gap:10px;margin:14px 0}',
  '.perme-riscontro label{display:block;margin:14px 0 6px;font-weight:700}.perme-riscontro input,.perme-riscontro textarea{box-sizing:border-box;display:block;width:100%;min-width:0;max-width:100%;font:inherit;line-height:1.5;padding:10px;border:2px solid #506859;border-radius:8px;background:white;color:#17372a}.perme-riscontro textarea{margin:12px 0}',
  '.perme-riscontro [hidden],.perme-lettura [hidden]{display:none!important}',
  '@media print{.perme-lettura,.perme-riscontro{display:none!important}}'
 ].join('\n');
 document.head.append(style);
 function renderScale() {
  for (const ui of toolbars) {
   ui.size.textContent = 'Testo ' + scale + '%';
   ui.minus.disabled = scale === scales[0];
   ui.plus.disabled = scale === scales[scales.length - 1];
  }
 }
 function setScale(value, save) {
  scale = scales.includes(value) ? value : 100;
  if (scale === 100) {
   if (originalSize) html.style.setProperty('font-size', originalSize, originalPriority);
   else html.style.removeProperty('font-size');
  } else html.style.setProperty('font-size', baseSize * scale / 100 + 'px', 'important');
  if (save) {
   try { localStorage.setItem(storageKey, String(scale)); } catch (_) { /* I comandi restano utilizzabili. */ }
  }
  renderScale();
 }
 try { const saved = Number(localStorage.getItem(storageKey)); if (scales.includes(saved)) setScale(saved, false); } catch (_) {}
 function updateSpeechButtons() {
  for (const ui of toolbars) {
   ui.pause.hidden = speechState === 'idle';
   ui.stop.hidden = speechState === 'idle';
   ui.pause.textContent = speechState === 'paused' ? 'Riprendi' : 'Pausa';
   ui.listen.disabled = !speech || speechState !== 'idle';
  }
 }
 function stop() {
  generation++;
  if (speech) window.speechSynthesis.cancel();
  speechState = 'idle';
  if (activeSpeech) activeSpeech.status.textContent = 'Lettura interrotta.';
  activeSpeech = null;
  updateSpeechButtons();
 }
 function readingParts(content, title) {
  const ignored = 'nav,form,button,.perme-lettura,.perme-riscontro,.perme-rating,.perme-facebook-contact,.perme-whatsapp-share,[hidden],[aria-hidden="true"]';
  const parts = title ? [title] : [];
  for (const el of content.querySelectorAll('h1,h2,h3,h4,p,li,dt,dd,pre,tr')) {
   if (el.closest(ignored) || !el.getClientRects().length) continue;
   if (el.parentElement.closest('li,pre,tr')) continue;
   const text = el.textContent.replace(/\s+/g, ' ').trim();
   if (text && text !== parts[parts.length - 1]) parts.push(text);
  }
  return parts.flatMap(text => {
   const words = text.split(' '), chunks = [];
   let chunk = '';
   for (const word of words) {
    if (chunk && chunk.length + word.length > 450) { chunks.push(chunk); chunk = ''; }
    chunk += (chunk ? ' ' : '') + word;
   }
   if (chunk) chunks.push(chunk);
   return chunks;
  });
 }
 function listen(content, title, ui) {
  if (!speech) return;
  stop();
  const parts = readingParts(content, title);
  if (!parts.length) { ui.status.textContent = 'Non trovo un testo da leggere in questa pagina.'; return; }
  const token = generation, synth = window.speechSynthesis;
  activeSpeech = ui; speechState = 'speaking'; updateSpeechButtons();
  const voices = synth.getVoices();
  const italian = voices.find(v => /^it(?:-|_)/i.test(v.lang) && v.localService) || voices.find(v => /^it(?:-|_)/i.test(v.lang));
  let index = 0;
  function next() {
   if (generation !== token) return;
   if (index === parts.length) {
    speechState = 'idle'; activeSpeech = null; ui.status.textContent = 'Lettura terminata.'; updateSpeechButtons(); return;
   }
   const utterance = new SpeechSynthesisUtterance(parts[index++]);
   utterance.lang = 'it-IT';
   if (italian) utterance.voice = italian;
   utterance.onend = next;
   utterance.onerror = event => {
    if (generation !== token || event.error === 'canceled' || event.error === 'interrupted') return;
    generation++; speechState = 'idle'; activeSpeech = null;
    ui.status.textContent = 'La voce non è disponibile ora. Puoi continuare a leggere il testo.';
    updateSpeechButtons();
   };
   ui.status.textContent = 'Lettura in corso, parte ' + index + ' di ' + parts.length + '.';
   synth.speak(utterance);
  }
  next();
 }
 function validPath(path) { return /^[a-z0-9-]+\.html$/.test(path); }
 async function reportCounter(path, type, readOnly) {
  if (!validPath(path) || !Object.hasOwn(reportTypes, type)) throw Error('Segnalazione non valida');
  const key = 'perme-20261120-riscontro-' + type + '-' + path.replace(/\.html$/, '');
  const controller = new AbortController(), timer = setTimeout(() => controller.abort(), 10000);
  try {
   const response = await fetch('https://countapi.mileshilliard.com/api/v1/' + (readOnly ? 'get/' : 'hit/') + encodeURIComponent(key), {
    method: 'GET', credentials: 'omit', mode: 'cors', cache: 'no-store', referrerPolicy: 'no-referrer', signal: controller.signal
   });
   if (readOnly && response.status === 404) return 0;
   if (!response.ok) throw Error('Contatore non disponibile');
   const value = Number((await response.json()).value);
   if (!Number.isSafeInteger(value) || value < 0) throw Error('Risposta non valida');
   return value;
  } finally { clearTimeout(timer); }
 }
 async function readReports(path) {
  const values = await Promise.all(Object.keys(reportTypes).map(type => reportCounter(path, type, true)));
  return Object.fromEntries(Object.keys(reportTypes).map((type, i) => [type, values[i]]));
 }
 function mountFeedback(content, path, title) {
  if (!validPath(path) || content.querySelector('.perme-riscontro')) return;
  const details = node('details', '', 'perme-riscontro');
  const summary = node('summary', 'Segnala un problema in questa guida');
  const intro = node('p', 'Scegli il problema: viene registrato un conteggio per questa guida. Se vuoi indicare un punto preciso, prepara anche il messaggio.');
  const categories = node('div', '', 'perme-riscontro-categorie');
  categories.setAttribute('role', 'group'); categories.setAttribute('aria-label', 'Tipo di problema');
  const status = node('p'); status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');
  const extra = node('div'); extra.hidden = true;
  const id = 'perme-riscontro-' + path.replace('.html', '');
  const label = node('label', 'Dove hai trovato il problema? (facoltativo)'); label.htmlFor = id;
  const field = node('input'); field.id = id; field.type = 'text'; field.maxLength = 300;
  field.placeholder = 'Per esempio: sezione Documenti, secondo collegamento';
  const privacy = node('p', 'Non scrivere nomi, documenti, recapiti o informazioni sanitarie.');
  const text = node('textarea'); text.readOnly = true; text.rows = 5;
  text.setAttribute('aria-label', 'Segnalazione pronta da copiare');
  const copyStatus = node('p'); copyStatus.setAttribute('role', 'status');
  let selected = '', busy = false;
  function message() {
   text.value = ['Segnalazione Per Me', title, new URL(path, root).href, 'Problema: ' + reportTypes[selected],
    field.value.trim() ? 'Punto da controllare: ' + field.value.trim() : ''].filter(Boolean).join('\n');
  }
  const copy = button('Copia la segnalazione', '', async () => {
   message();
   try { await navigator.clipboard.writeText(text.value); copyStatus.textContent = 'Testo copiato. Puoi inviarlo alla Pagina Per Me.'; }
   catch (_) { text.focus(); text.select(); copyStatus.textContent = 'Il testo è selezionato: usa Copia dal menu del telefono.'; }
  });
  const facebook = node('a', 'Apri la Pagina Per Me');
  facebook.href = 'https://www.facebook.com/PerMeGuide/'; facebook.target = '_blank'; facebook.rel = 'noopener noreferrer';
  const actions = node('div', '', 'perme-riscontro-azioni'); actions.append(copy, facebook);
  const how = node('p', 'Per descrivere il problema: copia il messaggio, apri la Pagina Per Me e invialo come messaggio.');
  field.addEventListener('input', message);
  extra.append(label, field, privacy, text, actions, how, copyStatus);
  const buttons = [];
  for (const [type, name] of Object.entries(reportTypes)) {
   const b = button(name, '', async () => {
    selected = type; extra.hidden = false; message();
    if (submitted.has(path + type)) { status.textContent = 'Hai già registrato questo tipo di problema in questa scheda.'; return; }
    if (!navigator.onLine) { status.textContent = 'Sei senza connessione: il conteggio non è stato inviato. Puoi preparare e copiare il messaggio.'; return; }
    if (busy) return;
    busy = true; buttons.forEach(item => item.disabled = true); status.textContent = 'Invio della segnalazione…';
    try {
     await reportCounter(path, type, false); submitted.add(path + type);
     status.textContent = 'Segnalazione registrata per questa categoria. Puoi aggiungere il punto preciso nel messaggio qui sotto.';
    } catch (_) { status.textContent = 'Invio non confermato. Puoi copiare il messaggio e inviarlo alla Pagina Per Me.'; }
    finally { busy = false; buttons.forEach(item => item.disabled = false); }
   });
   buttons.push(b); categories.append(b);
  }
  const note = node('p', 'I conteggi indicano pressioni sui pulsanti, non persone uniche. Al servizio dei contatori sono inviati solo il codice della guida e il tipo di problema; il servizio può ricevere anche dati tecnici della connessione. Il testo facoltativo resta qui finché decidi di copiarlo e inviarlo.');
  details.append(summary, intro, categories, status, extra, note); content.append(details);
 }
 function mount(content, options = {}) {
  if (!content || !content.textContent.trim()) return;
  stop();
  for (const ui of [...toolbars]) if (!ui.bar.isConnected) toolbars.delete(ui);
  if (content.querySelector('.perme-lettura')) return;
  const title = options.title || content.querySelector('h1,h2')?.textContent || document.title;
  const path = options.path || decodeURIComponent(location.pathname.split('/').pop());
  const compact = content.dataset.letturaCompatta === 'true';
  const bar = node(compact ? 'details' : 'section', '', 'perme-lettura');
  bar.setAttribute('aria-label', 'Aiuti alla lettura');
  const heading = node(compact ? 'summary' : 'p', compact ? 'Ingrandisci il testo o ascolta' : 'Leggi come preferisci', 'perme-lettura-titolo');
  const actions = node('div', '', 'perme-lettura-azioni');
  const size = node('span'); size.setAttribute('role', 'status'); size.setAttribute('aria-live', 'polite');
  const minus = button('Riduci', 'Riduci la dimensione del testo', () => setScale(scales[Math.max(0, scales.indexOf(scale) - 1)], true));
  const plus = button('Ingrandisci', 'Ingrandisci la dimensione del testo', () => setScale(scales[Math.min(scales.length - 1, scales.indexOf(scale) + 1)], true));
  const reset = button('Normale', 'Normale: ripristina la dimensione iniziale del testo', () => setScale(100, true));
  const status = node('p', speech ? '' : 'La lettura vocale non è disponibile in questo browser.', 'perme-lettura-stato');
  status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');
  let ui;
  const listenButton = button('Ascolta', 'Ascolta la guida ad alta voce', () => listen(content, title, ui));
  const pause = button('Pausa', '', () => {
   if (!speech || speechState === 'idle') return;
   if (speechState === 'paused') { window.speechSynthesis.resume(); speechState = 'speaking'; status.textContent = 'Lettura ripresa.'; }
   else { window.speechSynthesis.pause(); speechState = 'paused'; status.textContent = 'Lettura in pausa.'; }
   updateSpeechButtons();
  });
  const stopButton = button('Interrompi', 'Interrompi la lettura vocale', stop);
  actions.append(minus, plus, reset, listenButton, pause, stopButton);
  const note = node('p', 'La voce dipende dal dispositivo e può richiedere Internet. La dimensione del testo viene ricordata solo su questo dispositivo.', 'perme-lettura-nota');
  bar.append(heading, actions, size, status, note);
  const h = content.querySelector('h1');
  if (h && h.parentElement === content) h.after(bar); else content.prepend(bar);
  ui = {bar, minus, plus, size, listen: listenButton, pause, stop: stopButton, status};
  toolbars.add(ui); renderScale(); updateSpeechButtons(); if(options.feedback!==false)mountFeedback(content, path, title);
 }
 window.addEventListener('pagehide', stop);
 window.PerMeLettura = Object.freeze({mount, stop, readReports, reportTypes});
 function boot() {
  const article = document.querySelector('main article:not(#reader-content)');
  if (article) mount(article);
  for (const content of document.querySelectorAll('[data-lettura]')) mount(content,{feedback:false});
 }
 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true}); else boot();
})();
