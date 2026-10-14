# PER ME — Regole definitive del logo, del sito e dell'app
**Approvate dall'autore: 14 ottobre 2026.** Questo è il riferimento stabile per tutte le prossime chat. Sono le decisioni operative, non la trascrizione integrale.

## Identità ufficiale
- Nome: **Per Me**. Slogan del blog: **«Capire cosa fare»**.
- Logo **circolare, elegante, minimale ma riconoscibile**, nei **colori del cuoio naturale** (bruno, cognac, rame), con scritta serif «Per Me», paesaggio stilizzato e **strada verso il sole**.
- Area **esterna al cerchio trasparente**. Maestro PNG RGBA **1254 × 1254**: `PER_ME_LOGO_UFFICIALE_2026-10-14.png`. SHA-256 `050feaf2770065b1ec92bfc6aa16d33e51a7f415b971474718aa5b7a6a410e63`.
- Fonte del maestro: Libreria ChatGPT **/Per Me/Fonti/PER_ME_LOGO_UFFICIALE_2026-10-14.png**. Fonte descrittiva: `FONTI/LOGO-UFFICIALE.md`.
- **Vietato sostituire** questo marchio senza nuova richiesta esplicita. Non riproporre illustrazioni infantili, ritratti, sovraccarichi o versioni precedenti. **Mai tornare alle icone PI o PM**.

## Dimensione approvata sul sito
- Il logo deve essere ben visibile **a sinistra di «Per Me»**, centrato verticalmente.
- Dimensione del logo nella testata: **82 × 82 pixel su telefoni** (media query `max-width:560px`) e **86 × 86 pixel su desktop**. Distanza tra logo e scritta: circa **12 px** su mobile e **14 px** su desktop. Proporzioni verificate dall'autore, che ha confermato **«Risolto»**.
- Nel markup HTML di **ogni pagina** inserire esplicitamente `<img class="brand-logo" src="assets/logo-per-me.png" ...>` all'interno del link della marca. **Non affidare l'immagine soltanto a `::before` CSS**: questo metodo aveva lasciato visibile soltanto la scritta.
- Aggiornare la stringa di versione in `style.css?v=...` in tutte le pagine quando si modifica il logo o lo stile, per prevenire la visualizzazione della copia in cache.

## Sito, app e desktop: stessi elementi grafici
- Sito ufficiale: https://cpcpcp106-coder.github.io/Per-Me/ — repository https://github.com/cpcpcp106-coder/Per-Me
- Logo web: `assets/logo-per-me.png`.
- App PWA su GitHub Pages: `app/`. File icone `app/icon-192.png`, `app/icon-512.png`, `app/icon-maskable-512.png`. Controllare `app/manifest.webmanifest` e `app/index.html` (logo anche nella testata).
- Icona scheda browser e collegamento desktop: `favicon.ico`; l'icona di una PWA installata può restare in cache sul dispositivo. **Non promettere una sostituzione immediata** senza prova.
- Le nuove versioni della PWA devono continuare a funzionare con Internet per l'aggiornamento e offline per i testi già scaricati. Tenere coerenti manifesto, service worker e cache. Non confondere questa PWA con eventuali app esterne che non si possono aggiornare tramite il repository.

## Procedura operativa vincolante
1. **Eseguire direttamente** i cambiamenti via repository e strumenti collegati. Non chiedere all'utente di copiare CSS, cercare piccoli pulsanti o caricare materiali già disponibili.
2. Prima di agire, rileggere questo documento, `FONTI/LOGO-UFFICIALE.md` e `REGOLE-AGGIORNAMENTO-APP-E-SITO.md`. Non alterare altre parti del sito senza motivo.
3. Mantenere **stesso logo** in sito, PWA, collegamento sul desktop, icone installabili. Verificare tutte le pagine pertinenti, non soltanto la Home.
4. Dopo il commit, ricontrollare i file e **la pubblicazione GitHub Pages conclusa con esito positivo**; non confondere tale controllo con la verifica visiva su uno smartphone.
5. Comunicare risultati verificabili, con un link diretto aggiornato. Se resta un'azione per l'utente, dare **un solo passaggio alla volta** e attendere.

## Errori corretti e già risolti
- Le prime proposte figurative erano troppo infantili e/o troppo poco stilizzate; la versione minimal color cuoio è quella **approvata**.
- Primo errore: sullo smartphone appariva soltanto «Per Me», non il logo. Risolto inserendo `<img>` nella testata e aggiornando la cache CSS.
- Secondo errore: logo visibile ma **troppo piccolo**. Risolto portandolo a **82 px su mobile / 86 px su desktop**, in tutte le pagine. **Approvazione esplicita: «Risolto»**.

## Archiviazione e limiti
Questo è il file di **regole e decisioni**, non un backup completo della chat, degli screenshot o delle bozze rifiutate. È conservato fuori dalla chat nel repository. Il maestro è conservato separatamente nella Libreria. Cancellare la chat non cancella questi file, ma elimina la cronologia della conversazione e gli allegati eventualmente non archiviati.
