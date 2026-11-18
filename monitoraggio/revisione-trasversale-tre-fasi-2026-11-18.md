# Revisione trasversale delle tre fasi — 18 novembre 2026

## Metodo
Riletti direttamente su GitHub i file di orientamento benefici, costo pasto, costo spesa settimanale, navigazione per problemi, le rubriche principali e i registri delle tre fasi. Verifica di codice e collegamenti dichiarati, non prova di esecuzione browser. Non confondere audit statico, pubblicazione, indicizzazione e usabilità.

## Esito
**Programma NON certificabile come concluso.** Le tre fasi hanno prodotto file e collegamenti, ma i criteri di accettazione non sono ancora tutti soddisfatti.

### Fase 1 — Affidabilità
- Evidenza: audit statico del 18/11: 131 HTML, 128 pagine editoriali, zero link locali e ancore interrotte, 128 URL indicizzabili presenti in sitemap; rapporto esterni: 866 URL distinti, 727 raggiungibili, 122 bloccati/riservati, 16 inconcludenti, 1 HTTP 503.
- Aperto: revisione puntuale di affermazioni normative e scientifiche, controllo semantico delle fonti, licenze delle immagini, test pubblici HTTP, Google Search Console e WCAG.
- Correzione editoriale prioritaria: distinguere chiaramente la validità 2026 delle soglie e l'effettiva attribuzione di benefici.

### Fase 2 — Utilità
- Orientamento benefici: è un filtro informativo a quattro domande, non un motore completo di eleggibilità; non verifica tutte le esclusioni e incompatibilità. Carta acquisti e maggiorazioni non sono trattate come schede distinte nel risultato. Necessario ampliare la copertura con regole ufficiali verificate prima di chiamarlo controllo personalizzato.
- Calcolo pasto: copre due ingredienti; non il costo del pasto completo.
- Calcolo settimanale: supporta righe manuali, non importa la lista della spesa dall'app; non registra un paniere di prezzi osservati con prove di etichetta, fonte e data. Non confondere costo consumato con esborso per confezioni intere.
- Menu mediterraneo già esistente: non è stato collaudato insieme ai nuovi strumenti. Non garantisce un piano clinico individuale.
- Criterio olio EVO 100% italiano: corretto come preferenza di origine da verificare in etichetta, non requisito di efficacia nutrizionale.

### Fase 3 — Semplicità
- Nuova pagina con 12 percorsi; link presenti in sitemap, canonical, alt, skip link e CSS responsive presenti nel sorgente.
- Il pulsante dalla homepage è presente nel codice.
- Mancano prove effettive a 320/390 px, navigazione con tastiera e screen reader, lettura a zoom 200%, test touch e Android, offline.
- Controllare che i nuovi pulsanti non duplicano funzioni della navigazione esistente e che gli stili inline siano progressivamente consolidati in CSS condiviso.

## Priorità di correzione
1. Collaudare in browser pubblico la homepage, i 12 percorsi e i tre strumenti, inclusi campi vuoti, valori limite, tastiera, stampa e smartphone.
2. Verificare con fonti primarie tutte le soglie e le prestazioni presentate nel filtro; correggere copertura incompleta e mantenere avvertenze sull'eleggibilità.
3. Integrare il calcolo dei prezzi con la lista settimanale, distinguendo confezioni acquistate, quantità consumate e prezzi osservati con data e origine dell'olio.
4. Verificare accessibilità, collegamenti esterni critici e immagini prima di certificare le tre fasi.
5. Ricontrollare il deployment pubblico e registrare URL, data, esito e prove riproducibili.

## Stato
Questa revisione è un controllo editoriale e statico parziale; non è un collaudo funzionale né un'approvazione clinica, giuridica o previdenziale indipendente.
