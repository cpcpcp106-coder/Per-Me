# Per Me — Riorganizzazione nazionale (15 ottobre 2026)

## Decisione
**Il sito non va cancellato**. Preservare contenuti e URL; separare regole nazionali da informazioni territoriali, correggere l'infrastruttura editoriale per evitarne la ricomparsa.

## Inventario verificato
- Repository `cpcpcp106-coder/Per-Me`: **39 pagine HTML del sito** (escluse la pagina `app/index.html` e il file Google Search Console).
- Sei rubriche: Soldi e lavoro; Pensione e invalidità; Debiti e cartelle; Agevolazioni e diritti; Salute e autonomia; Tutor AI.
- PWA indipendente tecnicamente ma editorialmente collegata, con recupero delle guide dalle pagine pubblicate.
- Principali problemi: ripetizione di testimonianze personali CAF/Patronato in guide nazionali e homepage; dati biografici non necessari sulla home; confusione tra perimetro nazionale e schede FVG 03/04; file `app-content.json` e regole storiche che reintroducevano localismi; diciture «sito in costruzione» su pagine già pubblicate.

## Interventi di base
1. Homepage e progetto: linguaggio rivolto a un pubblico **nazionale**, non a una vicenda o luogo personali; niente selezione di servizi sulla base della residenza dell'autore.
2. Pulizia dei riquadri ripetitivi con CAF/Patronato di Tarcento dalle guide generali e sostituzione con ruoli nazionali, senza promuovere un'organizzazione commerciale.
3. Rubrica 04: guida ISEE 01 e bonus ARERA 02 in percorso **nazionale**, schede 03 trasporti FVG e 04 ticket FVG in gruppo **regionale** nettamente separato. Gli URL non si cambiano, per preservare link storici.
4. Avviso di validità territoriale inserito all'inizio delle due schede FVG.
5. Aggiornate regole permanenti in `FONTI/PERIMETRO-NAZIONALE-2026-10-15.md`; corrette vecchie regole confliggenti e catalogo storico `app-content.json`.
6. Test CI `scripts/audit-perimetro-nazionale.cjs` impedisce di ripresentare sedi/nomi personali nelle guide, identifica guida nazionale e scheda locale, e controlla i vecchi messaggi «in costruzione».

## Lavori editoriali ancora necessari (distinti dalla base strutturale)
- **Guida nazionale 05:** Comune e servizi sociali. Definire competenze nazionali, ATS/segretariato, accesso ai servizi, domanda e documenti, fondi locali come varianti (senza scegliere un Comune di riferimento).
- **Trasporti nazionali:** condizioni e agevolazioni valide sul territorio italiano, esclusi importi/regimi validi esclusivamente in FVG; collegare le singole schede regionali soltanto come approfondimenti.
- **Esenzioni sanitarie nazionali:** codici nazionali per reddito/patologia/invalidità e metodo per individuare ASL e servizi territoriali senza usare ASUFC come ufficio nazionale. Scheda FVG come esempio opzionale.
- Revisione pagina-per-pagina di accuratezza dei contenuti, periodi 2026, fonti e immagini; giudizio professionale indipendente sui casi sanitari e legali complessi.
- Controllo completo su GitHub Pages via HTTP 200, contrasto WCAG con audit automatizzato, lettura realistica Android, aggiornamento PWA/offline. Non dichiarare 100/100 prima di queste verifiche.

## Criterio architetturale futuro
Ogni guida nazionale deve rispondere nell'ordine: problema → norma nazionale → requisiti/documenti → procedura → ufficio nazionale / come trovare ufficio locale → varianti territoriali dichiarate → errori → fonti / data. Le schede locali hanno un avviso visibile e non appaiono come guide nazionali.

**Questa revisione non autorizza la cancellazione dell'intero sito o dei contenuti validi.** La progressione è controllata, verificabile e reversibile tramite GitHub.
