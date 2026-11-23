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


## Aggiornamento del 23 novembre 2026 — problema non risolto

Versione esaminata: `1adab7cdb7efcab6a91f06a3af630bac78838d43`.

- Il nuovo audit del sorgente rileva 146 pagine pubbliche e 146 URL distinti nella sitemap, tutti raggiungibili dalla home, senza problemi rilevati. Le date lastmod arrivano al 23 novembre e non sono future.
- Audit online concluso il 23 novembre alle 08:53:31 UTC (09:53:31 Europe/Rome): 153 varianti di URL verificate, zero problemi. Sono comprese le varianti index esplicite e quattro pagine tecniche; il totale non misura pagine indicizzate.
- Il test Google in tempo reale della sitemap XML, documentato dagli screenshot del 23 novembre alle 09:42, indica «L'URL è disponibile per Google». Il test non certifica l'elaborazione ordinaria della sitemap.
- Lettura diretta di Search Console: proprietà verificata, Azioni manuali e Problemi di sicurezza entrambi con «Nessun problema rilevato». Le statistiche di scansione e il rapporto robots non sono disponibili per la proprietà in sottocartella.
- L'indirizzo XML registrato è corretto e include /Per-Me/. Il dettaglio non offre ulteriori informazioni espandibili. La voce originale conserva l'invio del 20 novembre, tipo Sconosciuto e «Impossibile recuperare», con 0 pagine rilevate.
- La sitemap TXT pubblicata contiene l'elenco degli URL, senza il codice Liquid presente nel sorgente. Dopo averla aperta e verificata, è stata reinviata una sola volta: conferma «Sitemap inviata», data 23 novembre, ma stesso errore e 0 pagine rilevate.
- Prova distinta: il nuovo riferimento `sitemap.xml?verifica=20261123` restituisce nel browser lo stesso XML leggibile. Inviato una sola volta in Search Console, resta Sconosciuto, «Impossibile recuperare», 0 pagine rilevate. Questa terza voce è conservata come traccia della prova; non è una nuova copia del file sul sito e non costituisce una soluzione.
- Il rapporto Pagine, letto oggi, è ancora aggiornato al 16 novembre: 3 URL indicizzati e 5 «Pagina scansionata, ma attualmente non indicizzata». Non è un censimento aggiornato delle 146 pagine.

**Esito:** non è accertata la causa del mancato recupero ordinario. I controlli non giustificano una modifica di robots, canonical o XML. Non è dimostrato né un guasto generale di Google né un blocco legato all'AI. L'accesso dell'Inspection Tool e il processo ordinario di elaborazione delle sitemap vanno distinti.

**Segnalazione:** preparata nel modulo «Invia feedback» di Search Console, senza inviarla. Contiene solo indirizzi pubblici, date ed esiti tecnici. Non sono stati aggiunti screenshot e l'opzione aggiornamenti resta disattivata. Il modulo avverte che potrebbero essere inviati anche dati dell'account e del sistema; l'invio attende autorizzazione esplicita.

Google ammette contenuti assistiti da AI, ma considera problematiche molte pagine prodotte senza valore aggiunto. Questo rischio editoriale non dimostra la causa dell'errore sitemap e non è escluso soltanto dall'assenza di un'azione manuale. [Indicazioni AI aggiornate](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content?hl=it) · [Norme spam](https://developers.google.com/search/docs/essentials/spam-policies?hl=it).

[Riepilogo sitemap](https://search.google.com/search-console/sitemaps?resource_id=https%3A%2F%2Fcpcpcp106-coder.github.io%2FPer-Me%2F) · [Rapporto Pagine](https://search.google.com/search-console/index?resource_id=https%3A%2F%2Fcpcpcp106-coder.github.io%2FPer-Me%2F). I rapporti richiedono l'account autorizzato. Audit completo e bozza della segnalazione sono conservati nel rapporto privato «Per-Me-Rapporto-Google.html», insieme all'archivio precedente.
