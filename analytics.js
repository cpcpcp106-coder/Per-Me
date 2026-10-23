/* Per Me - visite/installazioni dal 18 ottobre; origini aggregate dal 23 ottobre 2026.
   API verificata in GitHub Actions: countapi.mileshilliard.com; le vecchie chiavi CounterAPI restano archiviate nella cronologia Git.
   Senza librerie e senza modifiche al service worker.
   Escludi questo browser aprendo /Per-Me/?perme_escludimi=1 */
(() => {
  'use strict';

  const ROOT = '/Per-Me/';
  if (location.hostname !== 'cpcpcp106-coder.github.io' ||
      !location.pathname.startsWith(ROOT)) return;

  const COUNTER_BASE = 'https://countapi.mileshilliard.com/api/v1/hit/';
  const VISITS_KEY = 'perme-visite-dal-20261018-43bcc26da793';
  const INSTALLS_KEY = 'perme-installazioni-dal-20261018-43bcc26da793';
  // Solo conteggi aggregati. Nessun indirizzo del visitatore o URL di provenienza viene trasmesso.
  // Serie distinte dal 23 ottobre 2026: non ricostruiscono retroattivamente le visite.
  const SOURCE_KEYS = Object.freeze({
    facebook: 'perme-origine-facebook-dal-20261023-43bcc26da793',
    google: 'perme-origine-google-dal-20261023-43bcc26da793',
    altri: 'perme-origine-altri-dal-20261023-43bcc26da793',
    sconosciuta: 'perme-origine-sconosciuta-dal-20261023-43bcc26da793'
  });

  function sourceForVisit() {
    const qs = new URL(location.href).searchParams;
    const campaign = (qs.get('utm_source') || '').trim().toLowerCase();
    // Le app social a volte non forniscono un referrer: usa anche i tag del link.
    if (campaign === 'facebook' || campaign === 'fb' || qs.has('fbclid')) return 'facebook';
    if (campaign === 'google' || qs.has('gclid')) return 'google';
    if (campaign) return 'altri';

    try {
      if (!document.referrer) return 'sconosciuta';
      const from = new URL(document.referrer);
      if (from.origin === location.origin) return 'sconosciuta';
      const host = from.hostname.toLowerCase();
      if (host === 'facebook.com' || host.endsWith('.facebook.com') ||
          host === 'fb.com' || host.endsWith('.fb.com')) return 'facebook';
      // Google Search in Italia e altri domini di ricerca Google più comuni.
      if (/(^|\\.)google\\.(com|it|de|fr|es|ch|at|co\\.uk|com\\.au|ca|nl|be|pt|pl)$/.test(host))
        return 'google';
      return 'altri';
    } catch (_) {
      return 'sconosciuta';
    }
  }
  const OWNER_KEY = 'per-me-non-contare-questo-browser';
  const OWNER_COOKIE = 'perme_no_count';
  const VISIT_TIME_KEY = 'per-me-ultima-visita-30min-v1';
  const VISIT_INTERVAL_MS = 30 * 60 * 1000;

  // Esclusione volontaria del proprietario, valida per questo browser.
  const url = new URL(location.href);
  const excludeNow = url.searchParams.get('perme_escludimi') === '1';

  if (excludeNow) {
    try { localStorage.setItem(OWNER_KEY, '1'); } catch (_) {}
    try {
      document.cookie = OWNER_COOKIE +
        '=1; Max-Age=31536000; Path=/Per-Me/; SameSite=Lax; Secure';
    } catch (_) {}
    url.searchParams.delete('perme_escludimi');
    try {
      history.replaceState(history.state, '', url.pathname + url.search + url.hash);
    } catch (_) {}
  }

  let isOwner = excludeNow;
  try { isOwner ||= localStorage.getItem(OWNER_KEY) === '1'; } catch (_) {}
  try {
    isOwner ||= document.cookie.split(';')
      .some(item => item.trim() === OWNER_COOKIE + '=1');
  } catch (_) {}

  if (excludeNow) {
    const message = document.createElement('p');
    message.setAttribute('role', 'status');
    message.style.cssText =
      'margin:16px 0;padding:16px;border:2px solid #254236;' +
      'font-size:19px;line-height:1.5;font-weight:bold';
    message.textContent =
      'Esclusione richiesta: questa apertura non viene conteggiata. ' +
      'Le visite successive sono escluse finché il browser conserva ' +
      'il dato di esclusione.';
    document.querySelector('main')?.prepend(message);
  }
  if (isOwner) return;

  // Il solo evento viene registrato presso il fornitore esterno.
  // La richiesta HTTP può esporre al fornitore dati tecnici di rete.
  function track(action, key) {
    if (!navigator.onLine) return false;
    const endpoint = COUNTER_BASE + encodeURIComponent(key) +
      '?_=' + encodeURIComponent(Date.now().toString() + '-' + Math.random().toString(36).slice(2));
    fetch(endpoint, {
      method: 'GET', mode: 'cors', credentials: 'omit', cache: 'no-store',
      referrerPolicy: 'no-referrer', keepalive: true
    }).then(response => {
      if (!response.ok) throw Error('Contatore HTTP ' + response.status);
      return response.json();
    }).catch(() => {
      // Non riprovare automaticamente: una risposta persa potrebbe aver già incrementato.
    });
    return true; // Tentativo di registrazione, non un evento confermato.
  }

  // Una visita al massimo ogni 30 minuti per lo stesso browser.
  // L'uso come app installata non conta come visita al sito.
  const standalone = window.matchMedia?.('(display-mode: standalone)').matches ||
                     navigator.standalone === true;
  let attemptedThisPage = false;

  function visit() {
    if (standalone || attemptedThisPage || !navigator.onLine) return;
    const now = Date.now();
    try {
      const last = Number(localStorage.getItem(VISIT_TIME_KEY)) || 0;
      if (now - last < VISIT_INTERVAL_MS && now >= last) return;
      localStorage.setItem(VISIT_TIME_KEY, String(now));
    } catch (_) {
      try {
        if (sessionStorage.getItem(VISIT_TIME_KEY)) return;
        sessionStorage.setItem(VISIT_TIME_KEY, String(now));
      } catch (_) {}
    }
    attemptedThisPage = track('visita', VISITS_KEY);
    if (attemptedThisPage) {
      const source = sourceForVisit();
      track('origine-' + source, SOURCE_KEYS[source]);
    }
  }

  visit();
  window.addEventListener('online', visit);

  // Solo l'evento di installazione confermata, non il semplice clic.
  const appPage = location.pathname === ROOT + 'app/' ||
                  location.pathname === ROOT + 'app/index.html';
  if (appPage) {
    let counted = false;
    window.addEventListener('appinstalled', () => {
      if (counted) return;
      counted = track('installazione', INSTALLS_KEY);
    });
  }
})();
