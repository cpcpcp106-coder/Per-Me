# Per Me — Punto 2: verifica pubblica di sitemap e indicizzabilità

Data: 20 novembre 2026. Versione del repository esaminata: `0dbb2b1c91930a29d7bb182731c063dfbc0d061f`.

## Esiti verificati sul sito pubblicato

- Sitemap XML: HTTP 200, nessun reindirizzamento, `application/xml`, UTF-8, 19.762 byte.
- 143 URL assoluti e distinti, tutti compresi nel prefisso `https://cpcpcp106-coder.github.io/Per-Me/`.
- 143 campi `lastmod`, nessuna data futura rispetto al controllo.
- Tutte le 143 pagine rispondono HTTP 200 e dichiarano come canonico il proprio indirizzo in sitemap. Nel campione completo non sono emerse direttive `noindex` nei meta tag o nelle intestazioni HTTP.
- Tutte le 143 pagine sono raggiungibili dalla homepage attraverso i collegamenti HTML fra le pagine della sitemap.
- Verifica completata alle 11:02:36 UTC (12:02:36 Europe/Rome). [Risultati puntuali del controllo](punto-2-verifica-pubblica-2026-11-20.json).

## Robots e recupero Google

Il `robots.txt` alla radice dell'host risponde HTTP 404. Secondo la [specifica ufficiale Google](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec), un 404 viene trattato come assenza di restrizioni di scansione. Non è stata individuata una regola robots che blocchi il sito. Un file collocato nella sottocartella del progetto non controllerebbe il crawler dell'host.

Nel test in tempo reale della Search Console ufficiale, il 20 novembre Google ha recuperato la sitemap con esito positivo: scansione consentita, HTTP 200, tipo `application/xml`, sorgente XML visualizzato nel pannello. Il test usa lo strumento di ispezione Google per smartphone e non certifica l'elaborazione ordinaria della sitemap.

## Operazione eseguita e limite ancora aperto

La sitemap esistente è stata reinviata una sola volta dopo le verifiche. Google ha confermato «Sitemap inviata»; il successivo dettaglio mostra la data 20/11/26 ma conserva «Impossibile leggere la Sitemap» e zero pagine rilevate. Non espone un codice HTTP specifico, una riga XML errata o ulteriori dettagli espandibili.

Non è quindi dimostrata la risoluzione dell'errore ordinario. Il file recuperato è valido nei controlli eseguiti; non è stata accertata una modifica del sorgente capace di spiegare o risolvere la divergenza. Non sono stati cambiati arbitrariamente URL, canonical, robots, sitemap o contenuti editoriali. L'elenco aggiornato delle ispezioni e dei dati di rendimento è conservato nel rapporto privato «Per-Me-Rapporto-Google.html».

Fonti operative: [Google, gestione e diagnostica delle sitemap](https://support.google.com/webmasters/answer/7451001?hl=it) e [Google, creazione e invio](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=it). La documentazione distingue l'invio, il recupero del file e l'inclusione delle pagine nell'indice; nessuno dei tre esiti garantisce da solo il successivo.

## Perimetro

Questo intervento registra verifiche e operazioni del punto 2. Il conteggio HTTP delle pagine non è un conteggio di pagine indicizzate e non costituisce revisione scientifica, giuridica, fotografica o prova Samsung. I relativi lavori rimangono nei successivi punti del programma. «Offrimi un caffè» rimane escluso dalla pubblicazione.
