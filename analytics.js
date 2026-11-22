/* Per Me - visite/installazioni dal 18 ottobre; origini aggregate dal 23 ottobre 2026.
   Instagram e dettaglio canale WhatsApp dal 20 novembre 2026.
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
    instagram: 'perme-origine-instagram-dal-20261120-43bcc26da793',
    whatsapp: 'perme-origine-whatsapp-dal-20261115-43bcc26da793',
    google: 'perme-origine-google-dal-20261023-43bcc26da793',
    altri: 'perme-origine-altri-dal-20261023-43bcc26da793',
    sconosciuta: 'perme-origine-sconosciuta-dal-20261023-43bcc26da793'
  });
  const WHATSAPP_CHANNEL_KEY = 'perme-canale-whatsapp-dal-20261120-43bcc26da793';

  function sourceForVisit() {
    const qs = new URL(location.href).searchParams;
    const campaign = (qs.get('utm_source') || '').trim().toLowerCase();
    // Le app social a volte non forniscono un referrer: usa anche i tag del link.
    if (campaign === 'whatsapp') return 'whatsapp';
    if (campaign === 'instagram' || campaign === 'ig') return 'instagram';
    if (campaign === 'facebook' || campaign === 'fb' || qs.has('fbclid')) return 'facebook';
    if (campaign === 'google' || qs.has('gclid')) return 'google';
    if (campaign) return 'altri';

    try {
      if (!document.referrer) return 'sconosciuta';
      const from = new URL(document.referrer);
      if (from.origin === location.origin) return 'sconosciuta';
      const host = from.hostname.toLowerCase();
      if (host === 'instagram.com' || host.endsWith('.instagram.com')) return 'instagram';
      if (host === 'whatsapp.com' || host.endsWith('.whatsapp.com') || host === 'wa.me')
        return 'whatsapp';
      if (host === 'facebook.com' || host.endsWith('.facebook.com') ||
          host === 'fb.com' || host.endsWith('.fb.com')) return 'facebook';
      // Google Search in Italia e altri domini di ricerca Google più comuni.
      if (/(^|\.)google\.(com|it|de|fr|es|ch|at|co\.uk|com\.au|ca|nl|be|pt|pl)$/.test(host))
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

  // Cloudflare Web Analytics: manual snippet from the site's owner.
  // Not loaded on owner/excluded browser sessions.
  const beacon = document.createElement('script');
  // Script classico per caricamento dinamico: collaudato con invio RUM
  // intercettato. Non utilizzare type="module" qui (nessun POST nel test).
  // Il token nel parametro URL è supportato da Cloudflare.
  beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js?token=f16507f2d95944b0be1e747974750ad1';
  document.head.appendChild(beacon);

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
      // Sottoinsieme di WhatsApp, non un'ulteriore visita o provenienza.
      // Il tag indica il link preparato per il canale, anche se poi viene inoltrato.
      const medium = (new URL(location.href).searchParams.get('utm_medium') || '')
        .trim().toLowerCase();
      if (source === 'whatsapp' && medium === 'channel')
        track('canale-whatsapp', WHATSAPP_CHANNEL_KEY);
    }
  }

  // Serie marketing dal 21 novembre 2026: solo categorie aggregate.
  // I dati inseriti negli strumenti e le date locali non vengono trasmessi.
  const MARKETING_KEYS = Object.freeze({
    menu: 'perme-marketing-menu-dal-20261121',
    calcolatore: 'perme-marketing-calcolatore-dal-20261121',
    modelli: 'perme-marketing-modelli-dal-20261121',
    whatsapp: 'perme-marketing-segui-whatsapp-dal-20261121',
    facebook: 'perme-marketing-segui-facebook-dal-20261121',
    ritorni: 'perme-marketing-ritorni-giornalieri-dal-20261121'
  });
  const CONSENT_KEY = 'perme-marketing-consenso-v1';
  const MARKETING_START = Date.parse('2026-11-21T00:00:00+01:00');
  const MARKETING_END = Date.parse('2026-12-22T00:00:00+01:00');
  let marketingConsent = false, savedChoice = null;
  try {
    savedChoice = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null');
    if (!savedChoice || typeof savedChoice.allowed !== 'boolean' ||
        !Number.isFinite(savedChoice.until) || savedChoice.until <= Date.now())
      savedChoice = null;
    marketingConsent = savedChoice?.allowed === true;
  } catch (_) {}
  function hasMarketingConsent() {
    if (!marketingConsent) return false;
    const now = Date.now();
    if (now < MARKETING_START || now >= MARKETING_END) return false;
    try {
      const choice = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null');
      return choice?.allowed === true &&
        Number.isFinite(choice.until) && choice.until > now;
    } catch (_) {
      return false;
    }
  }
  function marketingOnce(category, period) {
    if (!hasMarketingConsent() || standalone || !navigator.onLine) return;
    try {
      const key = 'perme-marketing-v1-' + category;
      if (localStorage.getItem(key) === period) return;
      localStorage.setItem(key, period);
    } catch (_) {
      // Senza memoria locale non stimare frequenza e ritorni.
      return;
    }
    track('marketing-' + category, MARKETING_KEYS[category]);
  }
  function marketingVisit() {
    if (!hasMarketingConsent() || standalone || !navigator.onLine) return;
    const today = new Intl.DateTimeFormat('sv-SE', {timeZone:'Europe/Rome'}).format(new Date());
    try {
      const firstKey = 'perme-marketing-primo-giorno-v1';
      const first = localStorage.getItem(firstKey);
      if (!first) localStorage.setItem(firstKey, today);
      else if (first < today) marketingOnce('ritorni', today);
    } catch (_) {}
    const pathname = location.pathname;
    const category = pathname === ROOT + 'app/menu-mediterraneo.html' ? 'menu' :
      pathname === ROOT + 'strumenti/costo-spesa-settimanale.html' ? 'calcolatore' :
      pathname === ROOT + 'modelli-e-strumenti.html' ? 'modelli' : null;
    if (category) marketingOnce(category, String(Math.floor(Date.now() / VISIT_INTERVAL_MS)));
  }
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    const href = link.href;
    const category = href === 'https://whatsapp.com/channel/0029VbDxWTg4dTnMxrqamP3J' ? 'whatsapp' :
      href === 'https://www.facebook.com/PerMeGuide/' ? 'facebook' : null;
    if (category) marketingOnce(category, String(Math.floor(Date.now() / VISIT_INTERVAL_MS)));
  });
  const choiceBox = document.querySelector('[data-marketing-scelta]');
  const manage = document.querySelector('[data-marketing-gestisci]');
  const choiceStatus = document.querySelector('[data-marketing-stato]');
  if (choiceBox && manage) {
    choiceBox.hidden = !!savedChoice;
    manage.hidden = false;
    manage.addEventListener('click', () => { choiceBox.hidden = false; });
    for (const button of document.querySelectorAll('[data-marketing-consenso]')) {
      button.addEventListener('click', () => {
        const allowed = button.dataset.marketingConsenso === 'si';
        const until = new Date(); until.setMonth(until.getMonth() + 6);
        try {
          if (!allowed) {
            for (const key of Object.keys(localStorage))
              if (key.startsWith('perme-marketing-') && key !== CONSENT_KEY) localStorage.removeItem(key);
          }
          localStorage.setItem(CONSENT_KEY, JSON.stringify({allowed, until:until.getTime()}));
          marketingConsent = allowed;
          choiceBox.hidden = true;
          if (choiceStatus) choiceStatus.textContent = allowed ?
            'Statistiche facoltative consentite. Puoi cambiare scelta qui.' :
            'Statistiche facoltative disattivate. Puoi continuare a usare tutte le guide.';
          if (allowed) marketingVisit();
        } catch (_) {
          marketingConsent = false;
          if (choiceStatus) choiceStatus.textContent = 'Scelta non memorizzabile: le nuove statistiche restano disattivate.';
        }
      });
    }
  }
  marketingVisit();
  window.addEventListener('online', marketingVisit);

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
