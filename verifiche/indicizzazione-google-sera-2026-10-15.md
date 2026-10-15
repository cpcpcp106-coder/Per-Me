# Per Me — verifica Google e correzione della raggiungibilità

Rilevazione: 2026-10-15T20:02:07+02:00. Ambito esclusivo: repository `cpcpcp106-coder/Per-Me`, sito e PWA ufficiali.

## Esito verificato

Controllo live concluso alle 19:57:53 del 15 ottobre 2026, su sorgente `dd887c879e1899ba135d585a4489b31b23ccba4c`: **46 pagine pubbliche, 46 URL nella sitemap, 52 URL online verificati, zero errori**. Gli URL aggiuntivi comprendono alias index e pagine tecniche, escluse dall'inventario editoriale e dalla sitemap. Verificati HTTP 200, corrispondenza sorgente/pubblicazione, canonical e assenza di direttive bloccanti sulle pagine pubbliche e nelle intestazioni.

Il robots.txt dell'origine restituisce 404: non è un divieto di scansione. Non è stato aggiunto un robots.txt nella sottocartella del progetto, dove non governerebbe la scansione dell'origine. Nessuna modifica a repository diversi da Per Me.

Controllati inoltre titoli, descrizioni, H1, collegamenti interni e frammenti. Nessun titolo o descrizione mancante, un solo H1 per pagina e nessun collegamento interno o frammento mancante. Tutte le guide sono raggiungibili dalla home con due collegamenti HTML. La sola pagina pubblica isolata era `monitoraggio.html`.

## Correzione applicata

Aggiunto nella pagina «Il metodo» il collegamento «controllo delle fonti e i limiti delle verifiche». Ora tutte le 46 pagine pubbliche sono raggiungibili dalla home. Aggiornata soltanto la data lastmod della pagina metodo nella sitemap, coerentemente con la modifica effettiva.

Esteso `scripts/audit-indicizzazione.py` al grafo dei collegamenti HTML: una pagina presente nella sitemap ma non raggiungibile dalla home produce un errore. Sono riconosciuti gli alias index.html, le directory, i collegamenti relativi, i parametri e i frammenti. Le stringhe JavaScript non sono considerate collegamenti. Il controllo esistente a ogni push e pull request comprende anche questa verifica.

## Stato osservato su Google

La ricerca pubblica su Google `site:cpcpcp106-coder.github.io/Per-Me/`, effettuata nel browser in questa sessione, mostrava due risultati: PWA «Per Me · Guide offline» e «Tutor AI essenziale». L'operatore site non è un inventario completo dell'indice: l'assenza delle altre pagine da quei risultati non dimostra che siano escluse.

Aperta la proprietà corretta in Search Console dal browser: il quadro generale riportava ancora «Elaborazione dei dati in corso. Ricontrolla tra un giorno o due». Il rapporto Sitemap mostrava `/sitemap.xml`, invio del 15 ottobre, tipo sconosciuto, stato «Impossibile recuperare» e zero pagine rilevate. Aprendo il dettaglio Google ha richiesto di rinnovare l'accesso. Nessuna nuova ispezione individuale e nessuna nuova richiesta di indicizzazione o reinvio della sitemap vengono dichiarati completati da questa verifica.

Il collegamento GSC Wizard non restituisce dati perché richiede un abbonamento attivo; non sono stati attivati acquisti o abbonamenti.

## Prove eseguite

- Audit completo di indicizzazione live prima della modifica: 46 pagine, 52 URL, zero errori.
- Audit di indicizzazione dopo la modifica: 46 pagine su 46 raggiungibili, zero errori.
- Controlli layout, struttura e perimetro nazionale superati.
- Tre prove mirate del nuovo controllo: percorso relativo con alias/query/frammento; pagina isolata già presente nella sitemap; nome di pagina presente soltanto in JavaScript. Tutte superate.
- Diff senza errori di spaziatura.

## Resta da accertare in Search Console

Rinnovare l'accesso per leggere il dettaglio dell'errore sitemap, ricontrollare il recupero dell'XML aggiornato e lo stato individuale di home e rubriche. Confrontare in particolare la richiesta della rubrica Pensione che il precedente rapporto registrava non completata. Non ripetere in massa le richieste già accettate.

Il file XML è pubblicato, valido, con Content-Type application/xml e 46 URL coerenti; non è stata dimostrata una causa nel file che spieghi l'errore di recupero del processo sitemap di Google. Non si attribuisce a Google un errore specifico senza dati. Le verifiche tecniche e i collegamenti corretti consentono la scansione, ma non garantiscono indicizzazione o tempi di comparsa.

Riferimenti primari: https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site?hl=it ; https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=it ; https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec .
