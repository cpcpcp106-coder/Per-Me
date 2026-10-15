/* Per Me - due soli contatori: visite al sito e installazioni PWA rilevate.
   Senza librerie e senza modifiche al service worker.
   Escludi questo browser aprendo /Per-Me/?perme_escludimi=1 */
(() => {
  'use strict';

  const ROOT = '/Per-Me/';
  if (location.hostname !== 'cpcpcp106-coder.github.io' ||
      !location.pathname.startsWith(ROOT)) return;

  const NAMESPACE = 'cpcpcp106-coder.github.io';
  const VISITS_KEY = 'per-me-visite-nuovo-inizio-20261015-v3';
  const INSTALLS_KEY = 'per-me';
  const OWNER_KEY = 'per-me-non-contare-questo-browser';
  const OWNER_COOKIE = 'perme_no_count';
  const VISIT_TIME_KEY = 'per-me-ultima-visita-30min-v1';
  const VISIT_INTERVAL_MS = 30 * 60 * 1000;
  const pending = new Set();

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

  // Una chiamata "pixel" invisibile: non modifica la pagina.
  function track(action, key) {
    if (!navigator.onLine) return false;
    const query = new URLSearchParams({
      ns: NAMESPACE,
      action,
      key,
      nonce: Date.now().toString() + Math.random().toString(36).slice(2)
    });
    const pixel = new Image();
    pending.add(pixel);
    pixel.referrerPolicy = 'no-referrer';
    pixel.onload = pixel.onerror = () => pending.delete(pixel);
    pixel.src = 'https://counterapi.com/pixel.gif?' + query.toString();
    return true; // Invio tentato, non conferma di registrazione.
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
