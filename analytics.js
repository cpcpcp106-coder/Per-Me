/* Per Me: conteggio semplice di visite al sito e installazioni rilevate. */
(() => {
  'use strict';
  if (location.hostname !== 'cpcpcp106-coder.github.io' || !location.pathname.startsWith('/Per-Me/')) return;
  const page = location.pathname.slice('/Per-Me/'.length);
  const images = new Set();
  function count(action) {
    if (!navigator.onLine) return;
    const params = new URLSearchParams({
      ns: 'cpcpcp106-coder.github.io', action, key: 'per-me',
      nonce: Date.now() + '-' + Math.random().toString(36).slice(2)
    });
    const img = new Image();
    images.add(img);
    img.referrerPolicy = 'no-referrer';
    img.onload = img.onerror = () => images.delete(img);
    img.src = 'https://counterapi.com/pixel.gif?' + params;
  }
  const standalone = window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true;
  if (!standalone && page !== 'statistiche.html') {
    try {
      const mark = 'per-me-visita-sessione-v1';
      if (sessionStorage.getItem(mark) !== '1') {
        sessionStorage.setItem(mark, '1');
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