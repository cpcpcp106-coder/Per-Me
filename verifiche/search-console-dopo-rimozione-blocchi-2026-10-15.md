# Per Me — Search Console dopo la rimozione dei blocchi

Data: 15 ottobre 2026, pomeriggio (Europe/Rome). Ambito esclusivo: sito e PWA ufficiali Per Me.

## Verifica tecnica dell’ultima versione

Verificato anche il sito dopo la riorganizzazione nazionale, sorgente `77d704715cd0906e33758f826f077d0208fed4ff`. Esecuzione `python scripts/audit-indicizzazione.py --live`: 42 pagine pubbliche, un file HTML tecnico Google, 42 URL in sitemap, 45 URL complessivi controllati online, **zero problemi**. Contenuti pubblicati coincidenti con il sorgente controllato, HTTP 200, canonical coerenti, nessuna direttiva bloccante negli HTML, negli script caricati, nelle intestazioni HTTP o nel robots.txt dell’origine (404).

Verifica live terminata: 2026-10-15T14:01:45.744408+00:00.

## Sitemap e rapporti Google

Eseguito l’accesso a Search Console e verificata la proprietà corretta. Il rapporto generale Pagine continua a indicare «Elaborazione dei dati in corso. Ricontrolla tra un giorno o due».

La sitemap `https://cpcpcp106-coder.github.io/Per-Me/sitemap.xml` è stata inviata dopo la rimozione dei blocchi, quando conteneva 40 URL. Il controllo conclusivo ha incluso anche le due nuove guide nazionali pubblicate nel frattempo: il file attuale contiene **42 URL**, tutti verificati. Conferma visibile: «Sitemap inviata». Il rapporto resta però «Impossibile recuperare», con zero pagine rilevate; nel dettaglio ultima lettura 15/10/26 e «Impossibile leggere la Sitemap».

Il successivo test in tempo reale dello stesso file ha restituito «L’URL è disponibile per Google», scansione consentita Sì, recupero pagina Esito positivo e indicizzazione consentita Sì. Questo verifica la raggiungibilità dallo strumento di Google, non la corretta importazione del file nel processo sitemap. **Non è stata richiesta l’indicizzazione del file XML come se fosse una normale pagina.**

## Ispezioni e richieste sulle pagine principali

| Pagina | Stato nell’indice osservato | Esito della richiesta |
|---|---|---|
| Home `/Per-Me/` | Scansionata, ma attualmente non indicizzata; ultima scansione indicata 14 ottobre | Accettata nella coda prioritaria |
| `soldi-lavoro.html` | URL sconosciuto a Google | Accettata nella coda prioritaria |
| `pensione-invalidita.html` | URL sconosciuto a Google | **Non completata: errore durante l’invio** |
| `debiti-cartelle.html` | URL sconosciuto a Google | Accettata nella coda prioritaria |
| `agevolazioni-diritti.html` | URL sconosciuto a Google | Accettata nella coda prioritaria |
| `salute-autonomia.html` | URL sconosciuto a Google | Accettata nella coda prioritaria |
| `tutor-ai.html` | URL sconosciuto a Google | Accettata nella coda prioritaria |
| PWA `/Per-Me/app/` | URL sconosciuto a Google | Accettata nella coda prioritaria |

**Sette richieste accettate su otto tentate.** Ogni esito positivo è stato verificato nella conferma «Indicizzazione richiesta» con aggiunta alla coda di scansione prioritaria. Non equivale ad avvenuta scansione o indicizzazione.

Per `pensione-invalidita.html`, dopo l’errore durante l’invio è stato eseguito un test in tempo reale: anch’esso non si è completato e Google ha mostrato «Se il problema persiste, riprova tra qualche ora». Il servizio non espone una causa più precisa. La pagina supera comunque i controlli tecnici indipendenti e rimane inclusa nella sitemap. La richiesta non viene registrata come accettata né come rifiuto del contenuto; non sono stati eseguiti tentativi ripetuti contro l’indicazione del servizio.

## Seguito registrato

Aggiornati i controlli di seguito già programmati con lo stato della sitemap, i dati Pagine, il recupero della richiesta Pensione quando il servizio lo consente e il confronto dell’indicizzazione delle pagine principali e della scoperta delle guide tramite sitemap. La baseline comprende gli esiti reali delle richieste.

Non reinviare automaticamente le richieste già accettate né la sitemap invariata. Le 42 pagine restano aperte all’indicizzazione, con controllo automatico globale a ogni push e pull request. La rimozione tecnica è conclusa; il recupero della sitemap da parte del relativo processo Google e l’effettiva indicizzazione restano da riscontrare nei controlli successivi.
