# Per Me — verifica Google e correzioni pubblicate

Data: 15 ottobre 2026, sera (Europe/Rome). Ambito esclusivo: repository `cpcpcp106-coder/Per-Me`, sito e PWA ufficiali.

## Risultato tecnico conclusivo

Audit live concluso il **2026-10-15T20:14:07+02:00**, sul sorgente `da93144af34a2c3801799cf29f527679ef66ed1b`: **46 pagine pubbliche, 46 URL nella sitemap, 46 pagine raggiungibili dalla home, 52 URL online controllati, zero errori**.

Verificati HTTP 200, corrispondenza sorgente/pubblicazione, canonical e assenza di blocchi negli HTML pubblici e nelle intestazioni. Gli URL aggiuntivi comprendono alias index e pagine tecniche, escluse dall'inventario editoriale e dalla sitemap. Il robots.txt dell'origine restituisce 404: nessun divieto di scansione. Nessuna modifica ad altri repository o all'origine del dominio.

Tutte le pagine hanno titolo, descrizione e un solo H1; nessun collegamento interno o frammento mancante. Tutte le guide sono raggiungibili dalla home con due collegamenti HTML. La sola pagina pubblica inizialmente isolata era `monitoraggio.html`.

## Correzione pubblicata e verificata

Aggiunto nella pagina «Il metodo» il collegamento «controllo delle fonti e i limiti delle verifiche». Ora tutte le 46 pagine pubbliche sono raggiungibili dalla home. Aggiornata la data lastmod di metodo nella sitemap, coerentemente con la modifica effettiva.

Esteso `scripts/audit-indicizzazione.py`: una pagina presente nella sitemap ma non raggiungibile dalla home tramite collegamenti HTML produce un errore. Il controllo riconosce alias index.html, directory, collegamenti relativi, parametri e frammenti; le stringhe JavaScript non sono considerate link. Il workflow di indicizzazione esistente esegue questa verifica a ogni push e pull request.

Commit della correzione: `6d8be7e324fdc17c5faaaed6dd606ef1098597d0`. Pubblicazione Pages riuscita: https://github.com/cpcpcp106-coder/Per-Me/actions/runs/38782905471 . Verificati online metodo e sitemap coincidenti con i file aggiornati. Sono riusciti anche i workflow di indicizzazione, struttura nazionale e collaudo browser/fonti esterne.

## Ispezioni individuali in Search Console

Accesso alla proprietà corretta completato tramite autenticazione protetta. Ispezionate **10 pagine editoriali/app**; la sitemap è stata esaminata separatamente come file tecnico.

| Pagina | Stato nell'indice osservato | Ultima scansione mostrata |
| --- | --- | --- |
| Home | Scansionata, ma attualmente non indicizzata | 15 ottobre, 06:46:44 |
| Soldi e lavoro | Scansionata, ma attualmente non indicizzata | 15 ottobre, 06:57:45 |
| Pensione e invalidità | URL sconosciuto a Google | N/D |
| Debiti e cartelle | Scansionata, ma attualmente non indicizzata | 15 ottobre, 06:57:45 |
| Agevolazioni e diritti | Scansionata, ma attualmente non indicizzata | 15 ottobre, 06:49:45 |
| Salute e autonomia | Scansionata, ma attualmente non indicizzata | 15 ottobre, 06:49:20 |
| Tutor AI essenziale | **Indicizzata** | Dettaglio non aperto |
| PWA /app/ | **Indicizzata** | Dettaglio non aperto |
| Guida leggere la busta paga | URL sconosciuto a Google | N/D |
| Guida 01 leggere una cartella | URL sconosciuto a Google | N/D |

Gli orari della tabella sono quelli visualizzati da Search Console; il fuso usato dall'interfaccia non è stato verificato e non sono stati convertiti. Per tutte e cinque le pagine «scansionate, ma attualmente non indicizzate», Google indica scansione consentita, recupero positivo e indicizzazione consentita. Le tre pagine sconosciute non hanno una scansione registrata: i relativi campi N/D non dimostrano un blocco.

Il rapporto generale Pagine continua a mostrare «Elaborazione dei dati in corso. Ricontrolla tra un giorno o due». Non si dispone quindi di un conteggio completo dell'indice. I due risultati della ricerca pubblica site corrispondono a Tutor e app, ma l'operatore site non è un inventario esaustivo.

## Azioni eseguite su Google

1. **Pensione e invalidità: richiesta di indicizzazione accettata.** Verificata la conferma «Indicizzazione richiesta» e l'aggiunta alla coda di scansione prioritaria. È stata recuperata la richiesta che nel precedente rapporto risultava non completata. Non equivale ad avvenuta indicizzazione.
2. **Sitemap aggiornata reinviata una sola volta.** Verificata la conferma «Sitemap inviata». Contiene 46 URL, rispetto ai 42 del precedente controllo documentato. Subito dopo l'invio il rapporto manteneva «Impossibile recuperare», tipo sconosciuto e zero pagine rilevate: l'elaborazione non è dichiarata riuscita.
3. **Test Google in tempo reale della sitemap: positivo.** «L'URL è disponibile per Google», scansione consentita Sì, recupero Esito positivo, indicizzazione consentita Sì. Il test conferma la raggiungibilità dal servizio di ispezione; non certifica l'importazione nel processo Sitemap. Non è stata richiesta l'indicizzazione del file XML come pagina.
4. **Azioni manuali e problemi di sicurezza: nessun problema rilevato** in entrambi i rapporti della proprietà.

Le richieste già accettate per le altre pagine non sono state ripetute. Nessun acquisto o abbonamento attivato.

## Verifiche della modifica

Audit statico e live di indicizzazione superati; layout condiviso, struttura e perimetro nazionale coerenti. Tre prove mirate del nuovo controllo superate: percorso relativo con alias/query/frammento; pagina isolata anche se presente nella sitemap; nome di pagina presente soltanto in JavaScript. Diff senza errori di spaziatura. Il collaudo browser/fonti esterne associato alla modifica è riuscito: https://github.com/cpcpcp106-coder/Per-Me/actions/runs/38782906734 .

## Che cosa resta aperto

Resta da riscontrare la corretta elaborazione della sitemap nel relativo rapporto di Google, l'aggiornamento del rapporto generale Pagine e l'eventuale indicizzazione delle pagine ancora escluse o sconosciute. In particolare va verificato l'esito della richiesta Pensione appena accettata.

Il file XML è valido, pubblicato con Content-Type application/xml e coerente con le 46 pagine canoniche. Lo strumento Google riesce a recuperarlo. L'errore del processo Sitemap non espone ulteriori dettagli utilizzabili; non è stata dimostrata una modifica aggiuntiva al sito che lo risolva. Alcune ispezioni riportano «Errore temporaneo di elaborazione» in corrispondenza della sitemap: è un'indicazione osservata, non una diagnosi completa della causa.

Il sito ha meno di 500 pagine, tutte ora raggiungibili tramite link dalla home; la documentazione Google spiega che per siti così piccoli una sitemap non è necessariamente indispensabile per la scoperta. Il problema del rapporto non viene quindi confuso con un blocco totale delle pagine. Nessuna garanzia o scadenza di indicizzazione viene attribuita a Google.

Fonti primarie: https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site?hl=it ; https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=it ; https://support.google.com/webmasters/answer/7451001?hl=it ; https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec .
