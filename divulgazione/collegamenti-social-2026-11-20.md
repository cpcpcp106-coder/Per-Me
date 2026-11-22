# Per Me — Collegamenti per distinguere le provenienze social

Aggiornamento: 22 novembre 2026. Riferimento per i prossimi invii autorizzati.

| Destinazione del messaggio | Collegamento alla home da usare |
| --- | --- |
| Facebook | https://cpcpcp106-coder.github.io/Per-Me/?utm_source=facebook&utm_medium=social |
| Instagram | https://cpcpcp106-coder.github.io/Per-Me/?utm_source=instagram&utm_medium=social |
| Pinterest | https://cpcpcp106-coder.github.io/Per-Me/?utm_source=pinterest&utm_medium=organic_social |
| Canale WhatsApp «Per Me Guide» | https://cpcpcp106-coder.github.io/Per-Me/?utm_source=whatsapp&utm_medium=channel |
| Stato WhatsApp | https://cpcpcp106-coder.github.io/Per-Me/?utm_source=whatsapp&utm_medium=status |
| Chat o condivisione WhatsApp | https://cpcpcp106-coder.github.io/Per-Me/?utm_source=whatsapp |

Per proporre una guida, applicare gli stessi parametri al suo indirizzo pubblico, usando `&` se sono già presenti altri parametri. Non cambiare il collegamento a una guida con quello generico alla home quando il messaggio riguarda la guida. Non inserire nomi, contatti o dati personali nei parametri.

Esempio per la guida sulla preparazione di una visita, nel canale WhatsApp:

https://cpcpcp106-coder.github.io/Per-Me/salute-guida-01-preparare-visita.html?utm_source=whatsapp&utm_medium=channel

Questi sono collegamenti al sito, non indirizzi dei profili social o del canale WhatsApp. La presente modifica non attesta un cambiamento del link in bio, né modifica post o messaggi già pubblicati. Il messaggio del 20 novembre è stato confermato pubblicato da Enrico; non è provato che il link già pubblicato avesse questi parametri.

## Come leggere i contatori

Il pannello è https://cpcpcp106-coder.github.io/Per-Me/contatori-personali/ . Anche il pannello storico contiene le nuove voci.

Pinterest ha una nuova serie dal 22 novembre 2026, senza ricostruzione delle aperture precedenti già classificate in altre voci. Riconosce `utm_source=pinterest` e i domini `pinterest.com`, `pinterest.it` e loro sottodomini, oppure `pin.it`. Non riconosce domini che si limitano a contenere il nome Pinterest. Un link inoltrato conserva la sua etichetta.

Instagram ha una nuova serie dal 20 novembre 2026. WhatsApp conserva il totale iniziato il 15 novembre e aggiunge dal 20 novembre un dettaglio per i link preparati per il canale. Quest'ultimo è un sottoinsieme: **non sommarlo di nuovo al totale WhatsApp**. Un link inoltrato conserva l'etichetta del canale, senza provare che l'apertura sia avvenuta dentro il canale.

Le provenienze sono ricavate dai parametri del link o dal dominio comunicato dal browser. Instagram è riconosciuto anche da `instagram.com` e sottodomini; WhatsApp da `whatsapp.com`, sottodomini e `wa.me`. Senza queste informazioni, l'apertura resta tra quelle dirette o sconosciute. I link preesistenti privi di etichette non possono essere attribuiti retroattivamente.

Resta una visita al massimo ogni 30 minuti nello stesso browser; esclusione del curatore e distinzione tra sito e app installata conservate. Il totale, la provenienza e il dettaglio del canale richiedono richieste distinte: un errore di rete può renderli non coincidenti. I numeri non sono persone uniche, follower, iscritti, visualizzazioni dei post o clic certificati dalle piattaforme.

## Verifica del cambiamento

Prima della pubblicazione: sintassi JavaScript e diff verificati; 30 verifiche isolate senza rete superate su attribuzione, esclusione, mancati doppioni, pannelli in sola lettura, errori del servizio e recupero della pagina offline. Audit di indicizzazione: 141 pagine pubbliche e 141 URL in sitemap, zero problemi.

Il test browser del repository verifica anche Instagram, i link del canale, larghezze 320/390/768 pixel, nuovi contatori non ancora creati e ripristino offline del pannello. L'esecuzione locale di Chromium non è disponibile in questo ambiente per un limite sui socket; il collaudo browser è stato completato su GitHub con 30 verifiche superate e nessun errore. Nessun incremento reale dei contatori nei test.

## Esito verificato il 20 novembre 2026

- Modifica pubblicata nel commit [02625d7](https://github.com/cpcpcp106-coder/Per-Me/commit/02625d7a18ffbff341187d4ecf51301a20e877aa).
- [Test browser contatori concluso con successo](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44709235932): 30 verifiche, comprese larghezze 320/390/768 pixel e recupero dei valori salvati offline. Si tratta di un collaudo automatico, non di una prova fisica sul Samsung.
- [Pubblicazione GitHub Pages conclusa con successo](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44709259949). Il commit distribuito 8cdead93cc0cb8bfda7266066e63f8921d99fa40 è lo snapshot automatico dell'audit e ha come genitore il commit della modifica.
- Lettura HTTP pubblica: `analytics.js`, `contatori-personali/`, il suo `sw.js` e il pannello storico restituiscono tutti HTTP 200. I quattro contenuti pubblici coincidono esattamente con i file collaudati.
- Nel browser pubblico verificati nuovi campi e pulsante «Aggiorna i numeri». Lettura alle 10:17 circa, ora italiana: Instagram 0 e link del canale WhatsApp 0. Nessun accesso passato attribuito o aggiunto artificialmente. L'apertura e l'aggiornamento del pannello non aumentano i contatori.
