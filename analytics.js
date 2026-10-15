/* Per Me: conteggio delle visite e delle installazioni rilevate.
   Il proprietario può escludere questo browser con ?perme_escludimi=1. */
(() => {
  'use strict';
  if (location.hostname !== 'cpcpcp106-coder.github.io' ||
      !location.pathname.startsWith('/Per-Me/')) return;
  const OWNER_FLAG = 'per-me-non-contare-questo-browser';
  const COOKIE_NAME = 'perme_no_count';
  const query = new URL(location.href);
  const optOutRequested = query.searchParams.get('perme_escludimi') === '1';
  let excluded = false;

  if (optOutRequested) {
    try { localStorage.setItem(OWNER_FLAG, '1'); } catch (_) {}
    try {
      document.cookie = COOKIE_NAME + '=1; Max-Age=31536000; Path=/Per-Me/; SameSite=Lax; Secure';
    } catch (_) {}
    query.searchParams.delete('perme_escludimi');
    try { history.replaceState(history.state, '', query.pathname + query.search + query.hash); } catch (_) {}
  }
  try { excluded = localStorage.getItem(OWNER_FLAG) === '1'; } catch (_) {}
  excluded = excluded || document.cookie.split(';').some(x => x.trim() === COOKIE_NAME + '=1');

  if (optOutRequested) {
    const status = document.createElement('p');
    status.setAttribute('role', 'status');
    status.style.cssText =
      'padding:18px;margin:12px 0 16px;background:#e9f2e9;border:2px solid #254236;border-radius:10px;'+
      'font-size:1.18rem;line-height:1.5;font-weight:700;color:#254236;';
    status.textContent = excluded
      ? 'Esclusione attiva: le visite da questo browser non verranno conteggiate.'
      : 'Attenzione: il browser non ha memorizzato l’esclusione. Questa apertura non è stata conteggiata, ma le successive potrebbero esserlo.';
    document.querySelector('main')?.prepend(status);
  }

  if (excluded || optOutRequested) return;
  const page = location.pathname.slice('/Per-Me/'.length);
  const images = new Set();
  function count(action) {
    if (!navigator.onLine) return;
    const params = new URLSearchParams({
      ns: 'cpcpcp106-coder.github.io',
      action,
      key: action === 'visita' ? 'per-me-visite-da-zero-20261015' : 'per-me',
      nonce: Date.now() + '-' + Math.random().toString(36).slice(2)
    });
    const img = new Image();
    images.add(img);
    img.referrerPolicy = 'no-referrer';
    img.onload = img.onerror = () => images.delete(img);
    img.src = 'https://counterapi.com/pixel.gif?' + params;
  }
  const standalone = window.matchMedia?.('(display-mode: standalone)').matches ||
    navigator.standalone === true;
  if (!standalone) {
    try {
      const marker = 'per-me-visita-sessione-v2';
      if (sessionStorage.getItem(marker) !== '1') {
        sessionStorage.setItem(marker, '1');
        count('visita');
      }
    } catch (_) { count('visita'); }
  }
  if (page === 'app/' || page === 'app/index.html') {
    let counted = false;
    window.addEventListener('appinstalled', () => {
      if (counted) return;
      counted = true;
      count('installazione');
    });
  }
})();