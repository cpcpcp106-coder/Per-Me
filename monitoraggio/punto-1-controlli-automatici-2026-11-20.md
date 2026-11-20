# Per Me — Punto 1: ripristino dei due controlli automatici

Data: 20 novembre 2026. Incarico: correggere e verificare il punto 1 prima dei successivi.
Base esaminata: `12ad15ccc1249d49243642cd15ae01e8b2b86cb4`.

## Cause verificate

- [Tutor AI, esecuzione fallita](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44712293297): il job si ferma durante l'installazione del browser. Il log riporta `Playwright does not support chromium on ubuntu26.04-x64`; le prove del Tutor non iniziano.
- [Audit rubriche, esecuzione fallita](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44712292877): lo script pretende ancora `5,5%` e `16 ottobre 2026` per gli alimentari non lavorati di settembre. Le sezioni pubblicate e il registro riportano già ottobre definitivo: `+7,5%`, comunicato del 17 novembre. Riprodotto localmente lo stesso errore prima della modifica.
- Fonte primaria ricontrollata: [ISTAT, prezzi al consumo di ottobre 2026](https://www.istat.it/comunicato-stampa/prezzi-al-consumo-ottobre-2026/). Alimentari non lavorati `+7,5%`; carrello della spesa `+2,3%`; NIC generale `+5,5%`: sono indicatori distinti.

## Correzioni

1. Workflow del Tutor: fissato `ubuntu-24.04`, compatibile con la versione Playwright 1.56.1 già usata nel progetto; installazione di Chromium con dipendenze tramite `--with-deps`. Stessa combinazione del collaudo strumenti già funzionante. [Indicazioni ufficiali Playwright per CI](https://playwright.dev/docs/ci).
2. Audit: seleziona dal registro il mese definitivo più recente dello stesso indicatore ISTAT. Controlla valore, mese, data di pubblicazione e fonte ufficiale nelle due sezioni effettive di Agevolazioni e Dieta. Non dipende dall'ordine delle voci del registro e conserva i controlli su importi, cautele, fonti, immagini e PWA.

Non modificati i contenuti delle guide, il registro economico, l'app, i social o la bozza privata «Offrimi un caffè».

## Verifiche locali

- Audit completo: superato dopo la correzione; prima falliva sul controllo di settembre.
- Tre prove negative: il controllo rifiuta la percentuale di settembre in Agevolazioni, la vecchia fonte ISTAT nella Dieta e la vecchia data di pubblicazione nella Dieta.
- Registro in ordine inverso: audit superato, selezione corretta del mese definitivo più recente.
- Controllo del diff: nessun errore di spaziatura.

## Verifica GitHub

Da completare con commit pubblicato, collegamenti alle nuove esecuzioni ed esiti osservati. Il superamento locale dell'audit non viene presentato come esecuzione riuscita del browser su GitHub.

Limiti: le prove browser restano emulazione Chromium e non un collaudo fisico Samsung o una revisione clinica indipendente. I punti 2–7 non sono eseguiti nell'ambito di questo intervento.
