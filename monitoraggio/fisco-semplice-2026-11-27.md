# Fisco semplice · 27 novembre 2026

PR #37 effettivamente unita il 25 novembre e PR #42 unita il 26 novembre. Le due rubriche precedenti e le relative quattro guide hanno risposto HTTP 200 nel controllo del 27 novembre. Su main non risultavano bozze di Fisco semplice. L’unica PR aperta al controllo iniziale, la #38, riguarda conteggi e protezione da cancellazioni.

Guide originali nazionali sul controllo della precompilata e sulla prova del versamento F24. I collegamenti a SPID/CIE, RED e cartelle rimandano ai percorsi già disponibili. Le fonti primarie sono elencate nelle singole guide. La scadenza della campagna 2026 è indicata come trascorsa. Gli esempi sono inventati. Le fotografie hanno provenienza documentata in `FONTI/fisco-immagini-2026-11-27.json`.

Aggiornati homepage, catalogo condiviso con la ricerca e l’app, sitemap XML e TXT, gradimento e cache dell’app. Il testo delle guide è disponibile nell’app dopo la prima sincronizzazione riuscita. Annuncio Facebook con foto e URL preparato in `divulgazione/fisco-semplice-2026-11-27.md`. Nessun invio eseguito. La bozza privata «Offrimi un caffè» e i pagamenti non sono stati modificati.

URL di destinazione:
- https://cpcpcp106-coder.github.io/Per-Me/fisco-semplice.html
- https://cpcpcp106-coder.github.io/Per-Me/fisco-730-precompilato-controlli.html
- https://cpcpcp106-coder.github.io/Per-Me/fisco-f24-verifica-pagamento.html

## Fonti consultate e collaudi

Scadenza ordinaria del 730/2026 confermata dallo scadenzario dell’Agenzia delle Entrate (HTTP 200). Le istruzioni ufficiali del 730/2026 confermano l’anno d’imposta 2025 e il trattamento delle Certificazioni Uniche già conguagliate. Le sezioni Dati di sintesi e Ricevute documentano origine dei dati, protocollo e stato. Per l’F24 sono stati confrontati la documentazione ufficiale su Cassetto fiscale, F24 Web, esiti di addebito e il paragrafo 7.2 della guida dell’Agenzia sui servizi Civis. Il portale informativo della precompilata e il PDF su FiscoOggi hanno restituito HTTP 403 alle richieste automatiche dirette. I contenuti ufficiali sono stati consultati tramite i risultati del motore di ricerca, con fonti ufficiali complementari raggiungibili via HTTP diretto collegate dove disponibili.

Superati i controlli di struttura (4.072 collegamenti interni), layout, perimetro nazionale, audit editoriale senza errori, provenienza delle immagini, pulsante Facebook, 164 URL nella sitemap e 19 test automatici dell’app. Durante il collaudo del browser è emerso che lo stile generale rendeva verde il testo di alcuni pulsanti verdi. La specificità del selettore condiviso è stata corretta per rendere leggibili i pulsanti anche senza puntatore.

Esito del collaudo mirato Chromium: 58 verifiche superate su viewport 320 e 390 px. Caricamento delle foto, dimensioni e contrasto del pulsante Facebook, ingrandimento del testo, navigazione dalla home, risultati di ricerca per «730 precompilato» e «F24 quietanza», salvataggio delle tre pagine nell’app e riapertura offline di entrambe le guide con le fonti conservate. Prove su viewport simulati, senza un telefono fisico.

## Pubblicazione verificata

La PR [#50](https://github.com/cpcpcp106-coder/Per-Me/pull/50) è stata unita in main dopo 23 workflow completati con esito positivo. Il [deploy GitHub Pages](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45957262751) ha usato il commit `94f5784`, che include il merge `6ed7dce`.

Il 27 novembre alle 08:17 ora italiana, rubrica, guide, due foto, homepage, app, catalogo, service worker e sitemap hanno risposto HTTP 200. I testi pubblici corrispondono ai file collaudati e le due fotografie sono state verificate tramite impronta SHA-256. Chromium su 390 px ha aperto le tre pagine, caricato le immagini e confermato destinazione, dimensione e contrasto del pulsante Per Me Guide. XML e TXT contengono gli stessi 164 URL univoci. L’[evidenza pubblica](fisco-verifica-pubblica-2026-11-27.json) riporta i risultati e gli indirizzi diretti.
