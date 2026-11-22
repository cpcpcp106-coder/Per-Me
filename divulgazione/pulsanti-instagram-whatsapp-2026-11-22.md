# Per Me — Pulsanti Instagram e canale WhatsApp

Incarico autorizzato da Enrico il 22 novembre 2026: inserire nel sito i pulsanti per Instagram e per il canale WhatsApp del progetto.

## Destinazioni

| Pulsante | Destinazione | Origine dell’indirizzo |
| --- | --- | --- |
| Per Me su Instagram | https://www.instagram.com/permeguide/ | Profilo @permeguide già documentato nei registri delle pubblicazioni Instagram e nel registro dell’invito al canale |
| Canale WhatsApp | https://whatsapp.com/channel/0029VbDxWTg4dTnMxrqamP3J | Collegamento completo già usato negli inviti verificati al canale Per Me Guide |
| Per Me su Pinterest | https://it.pinterest.com/permeguide/ | Profilo creato e verificato il 22 novembre 2026 |

I pulsanti sono ora nella fascia alta, subito sotto il menu, di 139 pagine, compresa la homepage. Aprono le rispettive pagine esterne; non eseguono iscrizioni, non inviano messaggi e non attivano pubblicità. Il pulsante «Condividi Per Me su WhatsApp» mantiene la sua funzione distinta di condivisione delle guide.

Aspetto definito nello stile condiviso: testo di almeno 19 pixel, area tattile di almeno 48 pixel, contrasto bianco su verde scuro, ritorno a capo sui display stretti e indicatore visibile del fuoco da tastiera. La dimensione del testo cresce con il carattere di base. Aggiornato anche il generatore delle pagine delle ricette, per mantenere coerenti footer e stile nelle pubblicazioni successive.

Le provenienze Instagram, WhatsApp, dettaglio dei link del canale e Pinterest erano già presenti nei contatori. Questa modifica aggiunge i collegamenti ai profili e non attribuisce nuove visite o nuovi iscritti.

## Verifiche

Prima della distribuzione: layout coerente su 139 pagine, 3.577 collegamenti locali validi; controllo delle ricette e coerenza del generatore superati; sintassi JavaScript e diff senza errori. L’audit tecnico dell’indicizzabilità verifica la struttura, non l’inclusione nell’indice Google.

Il collaudo browser comprende tutti e tre i pulsanti su homepage e guida alle farine a 320/390/768 pixel, anche con caratteri di base al 200%; controlla inoltre provenienze, pannelli e recupero offline. Le richieste di incremento sono simulate o intercettate: nessuna visita reale aggiunta dai test.

## Distribuzione

**Pubblicato e verificato il 22 novembre 2026.**

- Codice: [f17cce1](https://github.com/cpcpcp106-coder/Per-Me/commit/f17cce1e22c2778884462eb5aad7f4cd67ab9742).
- [Collaudo browser riuscito](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45042152209): 60 verifiche browser e 25 test isolati superati, zero errori. Controllati i tre pulsanti su homepage e guida alle farine a 320/390/768 pixel; area tattile misurata circa 50,59 pixel, testo di almeno 19 pixel e pulsanti entro la larghezza dello schermo anche con caratteri di base al 200%.
- [Pubblicazione GitHub Pages riuscita](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45042165312); [struttura nazionale](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45042152105), [indicizzabilità tecnica](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45042152166) e [coerenza delle ricette](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45042152176) superate.
- Verifica HTTP pubblica conclusa alle 17:12 circa, ora italiana: 140 file (139 pagine e foglio di stile), tutti HTTP 200 e identici ai contenuti collaudati. Tutte le 139 pagine contengono i tre collegamenti esatti.
- Nell’interfaccia pubblica verificati i testi e le destinazioni dei pulsanti. Instagram richiede l’accesso nel browser di verifica, mantenendo il profilo `/permeguide/` come destinazione. Il collegamento WhatsApp richiama l’app con l’identificativo corretto del canale; la schermata interna dell’app non è osservabile dal browser di verifica. Non è stata verificata una nuova iscrizione al canale: il pulsante serve ad aprirlo.

Il pulsante Facebook già esistente nelle guide e nella pagina «Il progetto» è conservato. Il pulsante di condivisione WhatsApp mantiene il proprio scopo. Nessun costo attivato e nessuna operazione richiesta sul telefono per pubblicare questi collegamenti.

## Posizione aggiornata: subito sotto il menu

Su indicazione di Enrico, i tre pulsanti sono stati spostati dalla parte finale della pagina alla fascia alta condivisa di 139 pagine, prima del contenuto. La scritta «Segui le novità di Per Me» introduce Instagram, Canale WhatsApp e Pinterest. Le destinazioni sono conservate.

Modifica pubblicata nel commit [37eecc7](https://github.com/cpcpcp106-coder/Per-Me/commit/37eecc70a5f9cde30ed7331ed17ee55b7fa8cc8c). [Collaudo riuscito](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45044817087): 66 verifiche browser e 25 test isolati, senza errori. Sulla home e sulla guida alle farine i pulsanti si trovano interamente nella prima schermata a larghezze 320/390/768 pixel, con viewport alto 844 pixel; a 390 pixel la fascia termina a circa 459 pixel dall’alto. Mantenuti i controlli con caratteri ingranditi al 200%.

[Distribuzione Pages riuscita](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45044841108). Verifica pubblica su homepage, guida alle farine, guida iniziale sul diabete e foglio di stile: quattro risposte HTTP 200 e contenuti identici ai file collaudati. Nel browser pubblico provato anche il percorso home → LI.CO.LI. → home: nuova fascia prima del contenuto, fotografia caricata e collegamenti Facebook conservati. Non si tratta di un nuovo collaudo fisico sul Samsung.
