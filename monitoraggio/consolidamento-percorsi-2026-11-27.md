# Per Me — Consolidamento dei percorsi, 27 novembre 2026

## Incarico e perimetro

Enrico ha chiesto di realizzare quanto possibile senza coinvolgere specialisti o pubblico. Intervento sul sito esistente, a costo zero, senza contatti o invii esterni. Non costituisce revisione professionale né prova con lettori reali.

## Modifiche preparate

- [Da dove cominciare](../da-dove-cominciare.html): cinque percorsi (INPS, assistenza familiare, stipendio, visita ed esame, documenti sul telefono), ciascuno con documenti da preparare, tre passi e un’alternativa. Copia con collegamenti completi e fallback manuale, stampa del singolo percorso e uso dei contenuti senza JavaScript.
- [Modelli e strumenti](../modelli-e-strumenti.html): ingressi diretti ai percorsi.
- [Monitoraggio delle fonti](../monitoraggio.html): riepiloghi aggiornati dagli ultimi rapporti tecnici; dati incompleti o controlli non conclusi esplicitamente riconosciuti; elenco delle cinque guide del dossier.
- [Dossier documentale](dossier-percorsi-prioritari-2026-11-27.md): 15 affermazioni selezionate e 13 fonti primarie lette. Corretto il solo rinvio editoriale CUP da sezione 3.2 a sezione 2.2 del PNGLA 2026–2028. Nessuna nuova data di revisione integrale assegnata alle cinque guide.
- [Fonti seguite](fonti.json): sei fonti specifiche aggiunte, per un totale di 15. Il monitoraggio settimanale già esistente mantiene il lunedì alle 07:15 UTC. Stato `active` verificato nell’API GitHub il 27 novembre. Le esecuzioni su push sono limitate a main per evitare scritture automatiche nei rami di lavoro.
- Aggiornate le date sitemap soltanto delle quattro pagine editoriali modificate; nessun nuovo URL editoriale. Nessuna modifica a robots o canonical.

## Verifiche prima della proposta

Sintassi dei nuovi script, audit di indicizzabilità (167 pagine pubbliche, 167 URL in sitemap, zero problemi), audit editoriale (161 pagine, zero problemi bloccanti, 44 avvisi preesistenti per foto remote), pulsanti Facebook, inventario diritti immagini e perimetro nazionale superati. Anteprima interattiva: apertura del percorso documenti, messaggio di copia riuscita e riepiloghi dei controlli osservati nel browser.

Le prove locali automatizzate Chromium non sono partite perché il runtime non contiene l’eseguibile Playwright e il collegamento Chromium di sistema non dispone del relativo binario. Non è un esito del prodotto. Il nuovo collaudo viene eseguito in GitHub Actions, insieme ai controlli esistenti, prima dell’integrazione. Verifica a 320 e 390 pixel, testo al 200%, clipboard reale e fallback, stampa selettiva, contenuto senza JavaScript, controlli automatici di accessibilità e gestione dei rapporti incompleti.

## Esito verificato della PR 53

[PR 53](https://github.com/cpcpcp106-coder/Per-Me/pull/53) integrata nel commit `863158eb7f101fbae97669d84f6c23a6e44fa91b`. Tutti i 20 controlli GitHub del candidato finale `5e9bcbd52d502945e4c1298bbb1d6a363ce8621e` sono riusciti. Il [collaudo strumenti](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/46013124012) comprende 60 verifiche ordinarie, 83 nuove sui percorsi/riepiloghi e 148 sulle migliorie, oltre a lievito e offline. La versione di partenza di Monitoraggio non passava il reflow al 200%: il problema è stato corretto e la soglia resta invariata.

Verifica successiva sul sito pubblico: quattro HTML, due JavaScript, CSS dei percorsi e sitemap HTTP 200, con byte identici ai sorgenti collaudati. Nel browser pubblico sono osservati cinque percorsi, foto caricata con testo alternativo, pulsante Facebook e apertura del percorso documenti. La pubblicazione corrente deriva dal commit automatico `b6a5f31b9f99e7e2b3505458db6a352cba704d9b`, successivo all’integrazione e contenente l’aggiornamento del rapporto statico.

## Recupero aggiuntivo della copia

La verifica nel browser pubblico ha rilevato un’API degli appunti che resta in attesa senza risolversi: il pulsante rimaneva disabilitato. Aggiunto un recupero dopo 1,5 secondi, con testo selezionato per la copia manuale e pulsante nuovamente disponibile. Il collaudo include ora anche un’API simulata che non risponde. Il messaggio di preparazione informa del lavoro in corso. Il passaggio richiede collaudo e verifica pubblica prima di dichiarare concluso il recupero.

La misura del rendimento Google è stata registrata nel rapporto privato di Enrico con fonte e periodo. Nessun dato di indicizzazione, impressioni, clic o visite è dedotto dai controlli tecnici.
