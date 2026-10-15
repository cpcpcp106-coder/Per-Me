# Identità e layout condivisi di Per Me

Le pagine HTML esistenti sono mantenute con i rispettivi URL per non perdere i collegamenti già pubblicati. La navigazione e il footer hanno una sola fonte in `site/header.html` e `site/footer.html`.

Dopo aver modificato il layout eseguire `node scripts/sincronizza-layout.cjs --write` e poi `node scripts/sincronizza-layout.cjs --check`. Il comando modifica solo header, footer, rimuove vecchie ripetizioni locali e aggiorna eventuali direttive noindex. Non altera il testo delle guide.

Il testo editoriale utilizzato dalla PWA è prelevato direttamente dalle rubriche e dalle guide HTML via `app/main.js`; `app-content.json` è un archivio storico da non usare per pubblicare contenuti alternativi. L'identità personale dell'autore e i recapiti locali sono presentati separatamente in `chi-siamo.html` e `esperienza-caf-patronato.html`.

Le guide 03–04 FVG mantengono i vecchi URL e sono indicate come approfondimenti territoriali delle nuove guide nazionali. Le guide vanno verificate sul piano giuridico e sanitario quando si modificano scadenze, importi o requisiti.
