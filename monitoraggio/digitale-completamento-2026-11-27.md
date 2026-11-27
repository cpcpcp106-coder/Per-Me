# Digitale quotidiano — completamento del percorso essenziale

27 novembre 2026. Incarico: aggiungere le tre guide proposte a Enrico, dopo la sua conferma «Procedi».

## Contenuti e integrazione

Il percorso essenziale passa da due a cinque guide. Le tre nuove pagine sono:

- App IO e pagoPA: avvisi, pagamenti e ricevute — https://cpcpcp106-coder.github.io/Per-Me/digitale-io-pagopa-avvisi-ricevute.html
- Documenti sul telefono: scaricare, ritrovare e inviare PDF — https://cpcpcp106-coder.github.io/Per-Me/digitale-documenti-telefono-pdf-allegati.html
- Messaggi sospetti e accessi: proteggersi dalle truffe — https://cpcpcp106-coder.github.io/Per-Me/digitale-sicurezza-messaggi-accessi.html

Aggiornati indice della rubrica, scheda e notizia nella homepage, catalogo dei giudizi, sitemap e versione della cache dell’app. Il catalogo di ricerca condiviso e l’app ricavano le pagine dall’indice della rubrica: non sono state aggiunte liste concorrenti di guide. Collegati i contenuti esistenti su INPS, SEND, Fascicolo sanitario, SPID/CIE e Tutor AI. Conservata la sequenza delle altre rubriche pianificate.

Testi originali con operazioni separate e percorsi distinti per Samsung, altri Android e iPhone. Tre fotografie diverse generate appositamente, con didascalia illustrativa, testo alternativo e provenienza individuale in `FONTI/digitale-completamento-immagini-2026-11-27.json` e nel registro dei diritti.

## Verifica delle fonti

Documentazione primaria di IO, pagoPA, Google, Samsung, Apple, Polizia di Stato e Banca d’Italia. Riferimenti per ciascuna guida in `FONTI/digitale-completamento-fonti-2026-11-27.json`.

Controllati separatamente 25 URL delle fonti: 17 GET diretti HTTP 200; otto fonti Google hanno restituito HTTP 429 nella verifica locale, mentre il contenuto primario è stato letto tramite ricerca web. Le pagine Apple per download e invio file sono state lette anche con GET diretto HTTP 200 dopo i limiti iniziali della ricerca web. Un limite di accesso non è stato dichiarato collegamento rotto e non ha causato sostituzioni arbitrarie. Evidenze HTTP in `digitale-completamento-fonti-http-2026-11-27.json`.

Distinti avviso, autorizzazione, esito, ricevuta del gestore e quietanza dell’ente. Spiegati controlli su commissioni, pagamenti interrotti e assistenza competente. Nella guida ai documenti sono distinti anteprima e download, copia e collegamento condiviso, caricamento dell’allegato e invio della domanda. La guida sulla sicurezza distingue prevenzione e azioni dopo aver comunicato dati o autorizzato denaro.

## Collaudi locali del candidato

- Otto controlli statici superati: layout, struttura, perimetro nazionale, indicizzabilità, diritti delle immagini, Facebook, audit statico e audit editoriale. Nessun errore bloccante. I 44 avvisi editoriali sulle fotografie remote riguardano pagine preesistenti.
- 19 test esistenti dell’app superati.
- 146 verifiche del collaudo Digitale superate: tutte le sei pagine `digitale-*.html`, schermi da 320 e 390 pixel, foto caricate, pulsanti Facebook, percorsi dall’indice, testo realmente al 200%, assenza di scorrimento orizzontale e testo ritagliato, ricerche homepage «pagamento ricevuta», «PDF allegato» e «truffa», salvataggio e apertura offline delle nuove guide con fonti conservate.
- Dieci verifiche axe sulle cinque pagine modificate a 320 e 390 pixel, senza violazioni rilevate. Controllati visivamente anche due screenshot locali di lettura.

Esiti in `digitale-completamento-collaudi-2026-11-27.json`. La ricerca condivisa riconosce anche le coppie ricevuta/ricevute, allegato/allegati, truffa/truffe e avviso/avvisi. Le etichette nell’indice espongono gli argomenti utili alla ricerca. Il collaudo dedicato ora include automaticamente le pagine `digitale-*.html` e controlla i nuovi percorsi anche offline.

## Stato della pubblicazione

Pubblicato e verificato il 27 novembre 2026. La [PR 51](https://github.com/cpcpcp106-coder/Per-Me/pull/51) è stata integrata dopo **23 controlli GitHub superati** sul candidato `f06fc6e5f91f9daaa061cda8b170744870d51588`. Merge `787ab844bed1508f8e81876c4a84f5b03d3fd183`.

La [pubblicazione Pages riuscita](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45958226428) riguarda `329ec12c384216d59cefcf8ac1eb1bfb3bf5d63b`, figlio del merge che aggiorna soltanto lo snapshot dell’audit. La precedente esecuzione Pages sul merge è stata annullata a favore di questa esecuzione più recente.

**16 risorse pubbliche HTTP 200 e identiche byte per byte al candidato verificato**, comprese le sei pagine digitali, le tre fotografie nuove, homepage, cataloghi, app, foglio di stile e sitemap. La sitemap testuale pubblica contiene 167 URL e coincide con quella XML. Evidenze in `digitale-completamento-verifica-pubblica-2026-11-27.json`.

Nel browser pubblico sono state verificate le fotografie e i pulsanti Facebook delle sei pagine digitali, i percorsi dall’indice e le tre ricerche della homepage. Nell’app pubblica sono state sincronizzate le nuove guide e riaperte tutte e tre senza rete dopo un ricaricamento, con service worker attivo. Esito PASS in `digitale-completamento-browser-pubblico-2026-11-27.json`. Il browser effimero ha usato il proxy del runtime con l’eccezione TLS necessaria alla sua CA; i GET HTTPS sono stati verificati separatamente. Nessuna impostazione del dispositivo del lettore è stata modificata.

## Integrazione con gli aggiornamenti contemporanei

Il candidato è stato integrato con `f2662db`, che comprende la pubblicazione di Fisco semplice nella PR 50. Conservati i relativi contenuti, i record delle immagini, la categoria nell’app, gli indirizzi della sitemap e lo stato del piano editoriale. Le liste condivise sono state unite per identificatore; l’audit statico è stato rigenerato. Cache app versione 37 e catalogo condiviso versione 8, per rendere disponibile la versione unificata. Aggiornati i riferimenti al foglio di stile nelle sei pagine digitali, conservando la correzione di contrasto già presente su main. Le date editoriali delle due guide iniziali restano quelle della verifica dei loro contenuti.

Ripetuti sulla versione integrata gli otto controlli statici, i 19 test dell’app, le 146 verifiche Digitale e i controlli axe sulle pagine interessate.

## Limiti

Nessun pagamento reale, accesso ai servizi del lettore o prova su telefono fisico. I controlli automatici e le viewport simulate non certificano accessibilità o comprensione da parte di lettori reali. Il percorso essenziale non esaurisce tutti gli argomenti digitali e resta soggetto ad aggiornamento. La presenza in sitemap e l’indicizzabilità non dimostrano indicizzazione su Google. Nessun invio social effettuato in questo intervento.
