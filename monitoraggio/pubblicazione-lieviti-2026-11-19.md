# Per Me — pubblicazione prima fase pasta madre e LI.CO.LI.

Data della verifica: **19 novembre 2026**. Il percorso è gratuito, digitale e non commerciale. In questa pubblicazione sono incluse **solo** le due procedure dalla creazione alla maturazione: pane e pizza restano fasi successive, non ancora pubblicate.

## Pagine pubbliche verificate

- Indice del percorso: https://cpcpcp106-coder.github.io/Per-Me/lievito-madre.html — HTTP 200, fotografie e pulsante Facebook presenti.
- Pasta madre solida: https://cpcpcp106-coder.github.io/Per-Me/pasta-madre-solida-da-zero.html — HTTP 200. Dose di rinfresco: **100 g pasta madre + 200 g farina + 100 g acqua**.
- LI.CO.LI.: https://cpcpcp106-coder.github.io/Per-Me/licoli-da-zero.html — HTTP 200. Dose di rinfresco: **50 g LI.CO.LI. + 50 g farina + 50 g acqua**.
- Fotografia solida: https://cpcpcp106-coder.github.io/Per-Me/assets/pasta-madre-solida-originale.webp — HTTP 200, image/webp, 71.414 byte.
- Fotografia liquida: https://cpcpcp106-coder.github.io/Per-Me/assets/licoli-originale.webp — HTTP 200, image/webp, 128.920 byte.

Le fotografie sono immagini illustrative iperrealistiche generate con ChatGPT il 19 novembre 2026, non fotografie di un esperimento reale. Output originali, impronte Git e destinazioni sono registrati in `FONTI/registro-diritti-immagini.json`.

## Controlli eseguiti e limiti

- Audit locale della struttura: **133 pagine, 3.400 collegamenti locali, nessun errore**.
- Audit locale diritti immagini: **99 file locali registrati, nessuna immagine sconosciuta**.
- Controllo locale collegamenti Facebook: **123 pagine/guide conformi**.
- Audit editoriale locale: nessun errore bloccante.
- [GitHub Actions — Collaudo strumenti e lieviti](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44489288976): **successo**. Copertura specifica su viewport 320, 390 e 768 px, fotografie, testi alternativi, pulsanti Facebook e conservazione e lettura offline delle due guide nell'app.
- [GitHub Actions — Audit editoriale](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44489289061): **successo**.
- [GitHub Actions — Diritti e immagini](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44489288763): **successo**.
- [GitHub Actions — GitHub Pages](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44489288262): **distribuzione completata con successo**.

Le tre pagine sono inserite nella sitemap pubblica: https://cpcpcp106-coder.github.io/Per-Me/sitemap.xml. Questo conferma la presenza nella mappa del sito, **non** l'indicizzazione su Google, per la quale serve una verifica distinta in Search Console.

La pubblicazione delle guide sul sito non equivale alla pubblicazione di un post sulla Pagina Facebook. Nessun post Facebook è stato inviato in questa operazione.

## Correzione accessibilità dei pulsanti — 19 novembre 2026

Segnalazione di Enrico: testo dei pulsanti troppo poco leggibile sulle nuove guide. Diagnosi visiva e lettura degli stili calcolati sul sito pubblico: il selettore generale `.pagina-interna .article a` prevaleva sul colore bianco di `.lievito-page .button-lievito`, producendo testo marrone (`rgb(133,81,60)`) su verde (`rgb(36,80,57)`), con contrasto di circa **1,4:1**.

Corretta la specificità del selettore dei pulsanti delle guide, compresi i collegamenti visitati, gli stati hover e il focus visibile. Aumentata a `lievito-madre.css?v=2` la versione del foglio stile in homepage, indice delle due guide e singole guide per evitare il riuso della vecchia cache.

- [Collaudo browser automatico](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44490561930): **successo, 64 controlli**. Contrasto minimo misurato **9,2:1** su tutte le quattro pagine interessate a 320, 390 e 768 px, oltre a immagini, collegamenti e app offline.
- [Pubblicazione GitHub Pages](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44490562669): **successo**.
- Controllo sul sito pubblico in browser dopo la pubblicazione: i tre pulsanti dell'indice (`lievito-madre.html`) hanno **testo bianco** `rgb(255,255,255)` su **verde scuro** `rgb(36,80,57)`. Conferma anche visiva.

La correzione riguarda i pulsanti delle due nuove guide e della relativa pagina introduttiva, oltre ai pulsanti di accesso dalla homepage. Non costituisce un'attestazione di accessibilità completa del resto del sito.
