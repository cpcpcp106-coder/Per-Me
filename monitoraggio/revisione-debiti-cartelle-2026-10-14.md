# Per Me — revisione approfondita Rubrica 03 «Debiti e cartelle»

**Data della revisione:** 14 ottobre 2026  
**Pagina:** `debiti-cartelle.html`  
**Revisione tecnica:** commit `0c6e82337db784fcdf0bc8d2924b694dfe5df5a9`  
**Perimetro:** correttezza normativa divulgativa, percorso decisionale, link istituzionali, accessibilità di base, leggibilità, distinzione tra misure.

## Interventi eseguiti
1. Chiarita la differenza tra cartella (60 giorni ordinari), intimazione (5 giorni) e preavviso di fermo (30 giorni), separandoli dai termini per impugnare.
2. Aggiunto percorso guidato in cinque passaggi, in ordine di urgenza; indice e pulsanti mantenuti.
3. Migliorata la sezione «Situazione debitoria» con il servizio AdeR aggiornato il 7 aprile 2026, prospetto disponibile entro 24 ore dalla richiesta e link di accesso alla sezione ufficiale.
4. Delimitate le condizioni di sospensione legale della riscossione ai casi della legge 228/2012, ai relativi atti notificati da AdeR e al termine di 60 giorni. Chiarito che il rimedio non sostituisce il ricorso giudiziario.
5. Corrette e approfondite le rateizzazioni del 2026: fino a 84 rate a semplice richiesta per importi fino a 120.000 euro per istanza; istanza documentata fino a 120 rate o per importi superiori; ISEE per persone fisiche; modelli RS/RDF; rata minima 50 euro; rischio decadenza e non-rateizzabilità di vecchi carichi.
6. Distinti gli effetti della richiesta di rateizzazione da quelli dell'avvenuto pagamento della prima rata sulle procedure esecutive.
7. Separata la Rottamazione-quinquies nazionale (termine per nuove adesioni scaduto il 30 aprile 2026) dalla misura degli enti territoriali aderenti (16 ottobre–15 dicembre 2026, legge 88/2026 come modificata dalla 113/2026). Inserito link all'elenco AdeR degli enti aderenti pubblicato il 25 settembre 2026.
8. Introdotte soglie illustrative di pignoramento dello stipendio *da parte di AdeR*, senza estenderle a creditori privati; avvertimento sull'errata equivalenza «prima casa sempre impignorabile».
9. Evidenziata la distinzione fra debiti privati e posizioni affidate ad AdeR, con richiamo al rischio di scadenze giudiziarie autonome.
10. Aggiunta panoramica prudente delle procedure da sovraindebitamento e collegamento al registro OCC ministeriale, segnalando l'accessibilità problematica del registro da smartphone.
11. Mantenuta la fotografia approvata, con alt text, e aumentata l'area tattile dei collegamenti nell'indice. Aggiornata la meta-description.

## Riscontri principali — fonti istituzionali
- AdeR — rateizzazioni dal 1 gennaio 2025: https://www.agenziaentrateriscossione.gov.it/it/cittadini/Rateizzazione/la-rateizzazione/index.html
- AdeR — richiesta e modelli: https://www.agenziaentrateriscossione.gov.it/it/rateizzazione-delle-cartelle-di-pagamento/come-chiedere-la-rateizzazione/
- AdeR — effetti della prima rata: https://www.agenziaentrateriscossione.gov.it/it/rateizzazione-delle-cartelle-di-pagamento/il-pagamento/index.html
- AdeR — cartella e rimedi: https://www.agenziaentrateriscossione.gov.it/it/la-guida-alla-cartella-di-pagamento/la-cartella-di-pagamento/cosa-succede-dopo-la-notifica/index.html
- AdeR — sospensione legale: https://www.agenziaentrateriscossione.gov.it/it/imprese/Sospensione/
- AdeR — novità servizio situazione debitoria (7 aprile 2026): https://www.agenziaentrateriscossione.gov.it/link-esterni/Online-la-nuova-versione-del-servizio-Situazione-debitoria-e-la-guida
- AdeR — legge 113/2026, nuovo calendario enti locali: https://www.agenziaentrateriscossione.gov.it/it/il-gruppo/lagenzia-comunica/novita/Legge-n.-113-2026-piu-tempo-per-la-Rottamazione-degli-enti-territoriali/
- AdeR — elenco enti aderenti (25 settembre 2026): https://www.agenziaentrateriscossione.gov.it/it/il-gruppo/lagenzia-comunica/novita/Online-lelenco-delle-regioni-e-degli-enti-locali-che-hanno-adottato-il-provvedimento-di-Rottamazione-quinquies-per-le-loro-entrate/
- AdeR — fine adesione quinquies ordinaria 30 aprile 2026: https://www.agenziaentrateriscossione.gov.it/link-esterni/Link_Domanda_Adesione_Rottamazione_Quinquies_AP.ext
- AdeR — procedure esecutive: https://www.agenziaentrateriscossione.gov.it/it/Per-saperne-di-piu/le-procedure/procedure-esecutive/
- Ministero giustizia — OCC: https://www.giustizia.it/giustizia/it/mg_3_14_1.wp

## Limiti residui — non confondere i test con una certificazione
- Non è stata eseguita una certificazione legale per tutti i possibili tributi/atti, né una verifica giudiziale personalizzata dei termini.
- Non eseguito collaudo integrale con lettore schermo, smartphone reale, né conformità WCAG 2.2 AA.
- La fotografia originale approvata, circa 2 MB, è ancora pesante; eventuale conversione WebP va effettuata preservando il contenuto approvato.
- Gli orari e i recapiti di CAF UIL/ITAL UIL riportati nella sezione personale non sono stati rivalidati singolarmente durante questa revisione. Restano collegati i riferimenti ufficiali dei servizi.
- Le modalità telematiche della rottamazione territoriale erano previste per pubblicazione entro il 15 ottobre 2026; verificare il portale e i carichi individuali dopo l'apertura. Non fare affidamento su un elenco generico per garantire l'ammissibilità della singola cartella.
- Non è stata eseguita verifica in vivo della sincronizzazione della PWA installata né dei contenuti già memorizzati nella sua cache offline.

## Esito
Revisione testuale e di struttura completata in repository. Il completamento del deployment va verificato sul workflow GitHub Pages prima di dichiarare il rilascio effettivo. Il riscontro di pubblicazione dimostra la presenza del codice online ma non il collaudo della UX su telefono.

## Chiusura tecnica del 14 ottobre 2026 — integrazione
- **Immagine ottimizzata realmente:** conversione automatica eseguita su GitHub Actions con esito `success`: PNG originale 2.016.355 byte, nuova risorsa WebP 140.800 byte (riduzione 93,02%). La pagina usa l'elemento `picture` con WebP prioritario e PNG originale come riserva; foto e geometria della scena sono conservate. La conversione ha imposto una verifica di fedeltà (PSNR ≥ 40 dB) e dimensioni identiche.
- **Collegamenti AdeR:** i due riferimenti alla sospensione sono stati corretti dalla sezione «imprese» a quella specifica **cittadini**: https://www.agenziaentrateriscossione.gov.it/it/cittadini/Sospensione/index.html.
- **App offline:** ispezionato `app/main.js`: richiama `sync()` all'avvio se online e al ritorno della connessione, riscaricando le guide e salvandone solo testi/collegamenti. La routine filtra IMG e PICTURE. Non occorre includere il nuovo WebP nella cache della PWA. La sincronizzazione effettiva su ogni telefono e la persistenza offline non sono verificate su dispositivo reale.
- **Verifiche statiche:** 10 sezioni, collegamenti dell'indice completi, fotografia ottimizzata e alternativa, un solo H1, nessun ID duplicato, collegamenti esterni con `noopener noreferrer`. Non equivalgono a un test WCAG o su browser Android.
- **Qualità normativa:** ricontrollata la pagina AdeR per cittadini su sospensione (art. 1, legge 228/2012) e la differenza con l'avviso di addebito INPS; ricontrollate le 84/120 rate 2026, il periodo 16 ottobre–15 dicembre 2026 per la rottamazione degli enti territoriali e il limite agli enti aderenti. Nessuna pretesa di certificazione legale individuale.
- **Rimane:** test visivo e offline reale sul dispositivo; monitoraggio di eventuali aggiornamenti normativi e dei link esterni. Non richiedere all'autore un'operazione sul telefono solo per chiudere questa revisione del repository.
