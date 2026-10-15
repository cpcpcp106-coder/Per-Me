# Per Me — implementazione ricostruzione strutturale

15 ottobre 2026, ramo \`riorganizzazione-strutturale-2026-10-15\`. Le modifiche devono essere convalidate prima del rilascio sul sito pubblico.

- Conservati tutti gli URL precedenti: nuove guide nazionali per trasporti ed esenzioni ticket, con schede FVG distinte e link reciproci.
- Le guide e le rubriche usano un'intestazione e un footer condivisi, definiti in \`site/header.html\` e \`site/footer.html\`; il comando \`node scripts/sincronizza-layout.cjs --check\` ne controlla la coerenza.
- L'esperienza dell'autore con CAF/Patronato Tarcento è in una pagina di testimonianza separata; le guide nazionali non devono indicare Tarcento come procedura nazionale.
- Home orientata all'Italia; sitemap completata con tre nuovi URL; rimosse le etichette di sito globalmente in costruzione dai footer.
- App PWA preservata, nessun reset dei dati offline, sorgente dei testi dalle rubriche e guide del sito.
- Nuovo test riproducibile per pagine, collegamenti, sitemap, differenze territoriali e PWA.

**Non certificati:** ogni affermazione normativa presente nelle guide precedenti; test manuale con screen reader e telefono reale; indicizzazione effettiva Google. Valutare separatamente e non attribuire arbitrariamente 100/100.