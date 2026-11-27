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

## Stato

Candidato preparato. Gli esiti GitHub e la pubblicazione verranno aggiunti soltanto dopo la verifica. Nessun dato di indicizzazione, impressioni, clic o visite è dedotto da questo intervento.
