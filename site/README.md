# Per Me — Layout e fonti condivise

La navigazione e il footer delle pagine sono mantenuti in `site/header.html` e `site/footer.html`. Dopo ogni aggiornamento eseguire `node scripts/sincronizza-layout.cjs --write`, quindi `node scripts/sincronizza-layout.cjs --check` e `node scripts/controlla-struttura.cjs`.

Le guide del sito restano la fonte editoriale per la PWA: `app/main.js` le scarica dalle rubriche, conserva i testi e preferiti nella memoria del dispositivo e consente la lettura offline dei testi già salvati. `app-content.json` è un dato storico e non deve introdurre contenuti divergenti.

Il sito è nazionale. Le regole e procedure regionali sono schede locali separate; il FVG non è il territorio predefinito. Non aggiungere riferimenti personali, sportelli locali o testimonianze del fondatore nelle guide. I casi personali devono restare fuori dai contenuti pubblici, secondo `FONTI/PERIMETRO-NAZIONALE-2026-10-15.md`.

I vecchi URL sono conservati. Le due nuove guide nazionali 03 e 04 sono affiancate ai rispettivi approfondimenti FVG. Prima di pubblicare eseguire i workflow di verifica e attendere il risultato del deployment Pages.
