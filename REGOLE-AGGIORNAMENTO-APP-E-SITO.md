# Per Me — Regole editoriali permanenti per sito e app

Ultimo aggiornamento: 14 ottobre 2026.

## Esperienza personale CAF UIL di Tarcento

Quando un contenuto tratta ISEE, DSU, 730, dichiarazioni, agevolazioni fiscali oppure richiede di individuare un CAF, inserire, **solo se pertinente**, il riferimento personale:

> **CAF UIL di Tarcento (UD). Io mi sono appoggiato a questo CAF.**

È un'esperienza personale, non una raccomandazione esclusiva e non indica alcuna convenzione o sponsorizzazione.

Nei contenuti che consentono collegamenti aggiungere il pulsante:

**Apri sedi e contatti CAF UIL**

URL ufficiale: https://extranet.cafuil.it/sediuil/sedi.asp

Telefono sede Tarcento: 0432 785746 (cliccabile con `tel:+390432785746` dove supportato). Prima di pubblicare indirizzo e orari di una sede confrontare le fonti aggiornate.

## Distinzione di competenze

- **CAF:** fiscalità, ISEE/DSU, dichiarazioni e servizi specifici offerti.
- **Patronato e INPS:** pensioni, contributi, prestazioni e tutele previdenziali.
- **Sindacato, consulente del lavoro o legale:** CCNL, inquadramenti, differenze di retribuzione e vertenze.
- **Agenzia delle entrate-Riscossione:** atti, scadenze e procedure di riscossione.

Non attribuire a un CAF l'esclusiva o competenze non previste. Il link a CAF UIL va distinto dalle fonti normative e istituzionali che sostengono ogni guida.

## Ad ogni futuro aggiornamento del sito

1. Cercare riferimenti a CAF, ISEE, dichiarazioni, agevolazioni e assistenza competente.
2. Dove pertinente, riproporre la frase personale e il pulsante a `https://extranet.cafuil.it/sediuil/sedi.asp`, evitando duplicazioni nella stessa pagina.
3. Non aggiungere la segnalazione dove l'argomento è estraneo (per esempio salute o tecnologia).
4. Controllare visualizzazione e clic del pulsante su schermi piccoli, leggibilità, apertura in nuova scheda e link `tel:`.

## Ad ogni futuro aggiornamento dell'app offline

**File dati dell'app:** `app-content.json` nella radice del repository. Aggiornare la versione e `updatedAt`, preservando `editorialPolicy` e `resources`, e aggiornare il riferimento quando i nuovi contenuti lo rendono pertinente.

La scheda `caf-uil-tarcento` in `diritti-pratiche` riporta la frase, il numero e l'indirizzo web. La proprietà `action` con `label` e `url` è la definizione richiesta del collegamento/pulsante. **Non presumere** che il lettore dell'app visualizzi queste proprietà aggiuntive come pulsante: la visualizzazione del controllo richiede che l'interfaccia dell'app supporti `action`. Conservare quindi anche l'URL nel corpo testuale, consultabile offline.

Se si modifica il programma dell'app, implementare `action` come pulsante accessibile con link esterno, funzionante online e con un avviso comprensibile se il telefono è offline.

## Verifica finale obbligatoria

Verificare i testi pubblicati su GitHub, la validità JSON, la presenza del riferimento solo dove pertinente e le due destinazioni: il sito pubblicato su GitHub Pages e l'app esterna già installata, tenendo distinto l'aggiornamento del file dati dalla distribuzione di una nuova interfaccia.
