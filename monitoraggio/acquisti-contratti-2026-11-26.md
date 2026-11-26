# Acquisti e contratti senza sorprese – 26 novembre 2026

Controllati main 2cdb7b5 e PR aperte: #38 riguarda conteggi/audit e non viene integrata. PR #37 effettivamente unita il 25 novembre; evidenza di pubblicazione in monitoraggio/digitale-verifica-pubblica-2026-11-25.json. Ricontrollato HTTP 200 della rubrica Digitale. Nessun lavoro editoriale incompleto della prossima rubrica trovato nel piano o nelle PR aperte.

Tre pagine nuove, due guide originali complete con esempi inventati e modelli di messaggio; collegamenti a contenuti esistenti senza duplicarli. Homepage, catalogo condiviso ricerca/PWA, sitemap XML/TXT e gradimento aggiornati; cache PWA v33. Due fotografie distinte generate con ImageGen integrato, prompt e provenienza documentati; rubrica e annuncio riusano la foto recesso. Nessun riferimento specialistico o personale aggiunto. Caffè privato e pagamenti non modificati.

Fonti primarie consultate il 26 novembre: MIMIT recesso e FAQ garanzie; Gazzetta Ufficiale D.Lgs. 209/2025 artt. 1 e 4 (funzione di recesso dal 19 giugno 2026); Normattiva D.Lgs.176/2026 art.1 e Gazzetta art.3 (nuove tutele per contratti dal 31 luglio 2026). Le sintesi MIMIT non riflettono tutte le novità 2026, per cui prevalgono le norme. Link lunghi della banca dati tributaria con timeout sostituiti dal permalink Gazzetta. Nessuna revisione legale specialistica documentata.

Controlli locali: struttura e 3.915 collegamenti interni, layout condiviso, audit editoriale senza errori, 158 URL indicizzabili e raggiungibili, diritti immagini e Facebook superati; 19 test Node dell’app superati. Il browser locale non è eseguibile (launcher Chromium presente, binario assente): collaudo dedicato 320/390 px e offline predisposto nel workflow, da verificare su GitHub prima del merge. Nessuna prova su telefono fisico.

Annuncio concreto con foto in divulgazione/acquisti-contratti-2026-11-26.md; nessun invio esterno senza autorizzazione specifica. Stato finale: pubblicato e verificato; dettagli e risorse nel rapporto pubblico collegato sotto.

URL previsti:
- https://cpcpcp106-coder.github.io/Per-Me/acquisti-contratti.html
- https://cpcpcp106-coder.github.io/Per-Me/acquisti-recesso-resi-rimborsi.html
- https://cpcpcp106-coder.github.io/Per-Me/acquisti-garanzia-prodotto-difettoso.html

CI iniziale: corretta omissione della voce nella navigazione statica delle rubriche dell’app. Confermato anche il difetto preesistente della home al 200%/320px già documentato dalla Fase 4 e PR41: ripresa qui la correzione CSS minima necessaria per completare il collaudo della homepage, senza integrare altri contenuti o ridurre le soglie.

## Esito effettivo della pubblicazione

[PR #42](https://github.com/cpcpcp106-coder/Per-Me/pull/42) unita dopo 23 workflow superati sul commit 549b43564d48b52945784c12b434b4ec932d4023. Merge 2d4846e06cd081d49b6945528ad6301d84dc4891. [Collaudo dedicato](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45779183542): 50 verifiche superate, foto, Facebook, navigazione, testo ingrandito e salvataggio/lettura offline a 320/390px. Digitale quotidiano nuovamente superato; strumenti: 60 e 103 verifiche più percorso lieviti offline superati. Nessuna prova su telefono fisico.

La sitemap TXT è un modello Liquid generato dalla XML: rimosse le tre aggiunte manuali ridondanti. [Deployment finale verificato](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45780640638) riuscito; anche i deployment automatici precedenti agli ultimi report sono riusciti. La cancellazione del primo deployment del merge è stata sostituita da pubblicazioni successive riuscite, non classificata come rilascio fallito.

Verifica pubblica in `acquisti-verifica-pubblica-2026-11-26.json`: 12 risorse HTTP 200; tre pagine, homepage, catalogo, shell e cache app, sitemap XML e CSS corrispondono ai sorgenti; due foto WebP scaricate e decodificate, 1536×1024; destinazione e markup Facebook presenti nel contenuto delle tre pagine. Sitemap TXT generata: i tre nuovi URL compaiono una sola volta. Non confrontata byte per byte con il modello Liquid. Alcune fonti MIMIT hanno restituito 503 al controllo HTTP da runtime, pur essendo consultabili nel canale di ricerca; norme primarie alternative collegate. Nessuna promessa di indicizzazione o traffico.

Annuncio con foto e URL pronto in `divulgazione/acquisti-contratti-2026-11-26.md`; nessun invio esterno. Prossima rubrica del piano: Fisco semplice, lasciata da preparare per il ciclo successivo.
