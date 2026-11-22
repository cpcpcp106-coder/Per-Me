# Per Me — integrazione della presentazione e degli strumenti

Intervento del 22 novembre 2026, a partire dal main `6ba1ca3a8bfc86c272559c54613200b36b4efe52`.

La proposta originaria [#29](https://github.com/cpcpcp106-coder/Per-Me/pull/29) non si integra automaticamente con gli aggiornamenti social successivi. Questo intervento ne recupera le parti editoriali sulla versione corrente del sito.

## Cambiamenti

- La presentazione iniziale esplicita il pubblico 50–70 anni, l'aiuto ai familiari e l'accesso gratuito senza registrazione.
- «Da usare questa settimana» collega direttamente menu mediterraneo, calcolatore della spesa e modelli già pubblicati.
- Le due notizie INPS sono raccolte in un riepilogo apribile con mouse, tocco e tastiera; restano i titoli e gli indirizzi esistenti.
- Il footer condiviso contiene un collegamento leggibile alla Pagina Facebook. Instagram, WhatsApp e Pinterest restano nella fascia alta, con le destinazioni attuali.
- Template, 139 pagine e generatore delle ricette usano la stessa versione del CSS. I workflow dei collaudi includono modifiche ai componenti condivisi e al generatore.

## Perimetro conservato

Il codice dei contatori, compresa la provenienza Pinterest, non viene modificato. Le sei nuove serie della PR #29, i controlli di consenso, il pannello marketing e la raccolta programmata non fanno parte di questa pubblicazione. Nessuna nuova misurazione viene attivata.

I contenuti delle altre pagine sono stati confrontati con main dopo aver normalizzato soltanto footer e versione CSS: nessuna modifica editoriale aggiuntiva. Header, sitemap, app, service worker e pannelli dei contatori sono identici alla base. «Offrimi un caffè» resta fuori dall'intervento.

## Verifiche prima della pubblicazione

- Layout coerente su 139 pagine; controllo di struttura: 3.581 collegamenti locali, zero errori.
- Audit statico: 149 HTML, 5.255 collegamenti locali, zero file o ancore mancanti; sitemap coerente. Questo non dimostra indicizzazione Google.
- Generatore: 28 ricette in sette pagine, dati del menu coerenti.
- Pulsante Facebook condiviso presente nelle 129 guide/pagine controllate.
- 25 prove isolate delle provenienze superate, senza richieste ai contatori reali.
- Audit editoriale strutturale senza problemi bloccanti; restano le segnalazioni preesistenti sulle fotografie remote. Non costituisce revisione scientifica o giuridica articolo per articolo.
- Anteprima aperta nel browser: verificati nuova presentazione, tre accessi agli strumenti, fascia social conservata e apertura delle due notizie.

## Collaudi conclusi e pubblicazione verificata

Aggiornamento finale: 22/11/2026, ore 22:38 (Europe/Rome).

La [PR #30](https://github.com/cpcpcp106-coder/Per-Me/pull/30) è stata integrata in main con commit `17d95f74c84a6b363077f5b1fdd661862e1af687`. Sul commit funzionale finale `bca72517cb249e5d5ffc195cb17590d156ff12c3` tutti i **21 workflow avviati sono conclusi con successo**.

| Controllo della versione finale | Esito e prova |
| --- | --- |
| Strumenti, navigazione e lettura offline | **60 + 103 + 173 verifiche superate**, zero fallite. [Run strumenti](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45072471736). Comprende i tre accessi dalla home, notizie apribili da tastiera e da frammento, ricerca, testo al 200% senza tagli, spesa e app offline. |
| Browser, responsive e accessibilità automatica | **30 gruppi di prove**, zero FAIL, zero errori JavaScript e zero violazioni axe nelle pagine esaminate. [Run della PR](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45072478177). |
| Controllo automatico successivo all’integrazione | [Run su main](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45072779693) completato con successo, comprese prove browser, controllo dei link esterni e archiviazione delle evidenze. Il successo del job non risolve automaticamente le destinazioni esterne dichiarate inconcludenti dal relativo rapporto. |
| Distribuzione GitHub Pages | [Run 45072822732](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45072822732), **completed/success**, sul commit `aff3a1937a11bca529db53f7f24a4a6d8447a332`. Rispetto all’integrazione cambia soltanto lo snapshot dell’audit statico. La precedente esecuzione sul commit di merge è stata sostituita e cancellata. |

### Riscontro sul sito pubblico

Lettura HTTP senza eseguire gli script, il 22 novembre alle 22:35 (Europe/Rome): tutte le nove risorse seguenti restituiscono **HTTP 200 e byte identici alla versione collaudata**.

| Risorsa verificata | Esito |
| --- | --- |
| [index.html](https://cpcpcp106-coder.github.io/Per-Me/index.html) | HTTP 200 · identica |
| [farine-quale-scegliere.html](https://cpcpcp106-coder.github.io/Per-Me/farine-quale-scegliere.html) | HTTP 200 · identica |
| [diabete-guida-01-cause-sintomi-diagnosi.html](https://cpcpcp106-coder.github.io/Per-Me/diabete-guida-01-cause-sintomi-diagnosi.html) | HTTP 200 · identica |
| [style.css](https://cpcpcp106-coder.github.io/Per-Me/style.css) | HTTP 200 · identica |
| [app/menu-mediterraneo.html](https://cpcpcp106-coder.github.io/Per-Me/app/menu-mediterraneo.html) | HTTP 200 · identica |
| [strumenti/costo-spesa-settimanale.html](https://cpcpcp106-coder.github.io/Per-Me/strumenti/costo-spesa-settimanale.html) | HTTP 200 · identica |
| [modelli-e-strumenti.html](https://cpcpcp106-coder.github.io/Per-Me/modelli-e-strumenti.html) | HTTP 200 · identica |
| [sitemap.xml](https://cpcpcp106-coder.github.io/Per-Me/sitemap.xml) | HTTP 200 · identica |
| [analytics.js](https://cpcpcp106-coder.github.io/Per-Me/analytics.js) | HTTP 200 · identica |

Nel browser del sito pubblicato sono stati verificati:

- Nuova presentazione e tre accessi diretti agli strumenti; altezza osservata dei tre pulsanti: 56 px nel viewport utilizzato.
- Fascia Instagram–WhatsApp–Pinterest conservata prima del contenuto, con destinazioni corrette; Facebook aggiunto nel footer.
- Fotografia principale della homepage caricata; entrambe le fotografie della guida alle farine caricate durante la lettura, compresa quella caricata solo quando ci si avvicina alla sua posizione.
- Pulsante Facebook editoriale della guida alle farine conservato e collegamento nel footer presente.
- Apertura di entrambe le notizie nel riepilogo e navigazione dalla nuova azione «Calcola la spesa» al calcolatore pubblico.

Il browser del curatore è stato escluso dai conteggi mediante il comando già previsto da analytics.js. I test isolati hanno usato risposte simulate. Non sono state introdotte nuove serie o nuove raccolte statistiche.

La PR #29 è stata chiusa come proposta superata dalla nuova integrazione editoriale; il ramo originale resta conservato per lo storico. Le statistiche facoltative restano rinviate, con il problema di attivazione della proposta originaria documentato e senza attribuirne il completamento a questa pubblicazione.

Nessuna nuova prova su Samsung fisico, nessuna certificazione assistiva o WCAG completa, nessuna revisione professionale articolo per articolo. Non è stata eseguita una nuova ispezione autenticata in Google Search Console: indicizzazione e problema sitemap rimangono verifiche separate.

