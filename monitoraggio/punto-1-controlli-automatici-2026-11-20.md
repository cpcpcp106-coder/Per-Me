# Per Me — Punto 1: ripristino dei due controlli automatici

Data: 20 novembre 2026. Incarico: correggere e verificare il punto 1 prima dei successivi.
Base esaminata: `12ad15ccc1249d49243642cd15ae01e8b2b86cb4`.

## Cause verificate

- [Tutor AI, esecuzione fallita](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44712293297): il job si ferma durante l'installazione del browser. Il log riporta `Playwright does not support chromium on ubuntu26.04-x64`; le prove del Tutor non iniziano.
- [Audit rubriche, esecuzione fallita](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44712292877): lo script pretende ancora `5,5%` e `16 ottobre 2026` per gli alimentari non lavorati di settembre. Le sezioni pubblicate e il registro riportano già ottobre definitivo: `+7,5%`, comunicato del 17 novembre. Riprodotto localmente lo stesso errore prima della modifica.
- Fonte primaria ricontrollata: [ISTAT, prezzi al consumo di ottobre 2026](https://www.istat.it/comunicato-stampa/prezzi-al-consumo-ottobre-2026/). Alimentari non lavorati `+7,5%`; carrello della spesa `+2,3%`; NIC generale `+5,5%`: sono indicatori distinti.

## Correzioni

1. Workflow del Tutor: fissato `ubuntu-24.04`, compatibile con la versione Playwright 1.56.1 già usata nel progetto; installazione di Chromium con dipendenze tramite `--with-deps`. Stessa combinazione del collaudo strumenti già funzionante. Separati i passaggi per distinguere installazione del pacchetto, browser/dipendenze e prove, con limiti rispettivi di 3, 10 e 5 minuti e limite complessivo di 20 minuti. [Indicazioni ufficiali Playwright per CI](https://playwright.dev/docs/ci).
2. Audit: seleziona dal registro il mese definitivo più recente dello stesso indicatore ISTAT. Controlla valore, mese, data di pubblicazione e fonte ufficiale nelle due sezioni effettive di Agevolazioni e Dieta. Non dipende dall'ordine delle voci del registro e conserva i controlli su importi, cautele, fonti, immagini e PWA.

Non modificati i contenuti delle guide, il registro economico, l'app, i social o la bozza privata «Offrimi un caffè».

## Verifiche locali

- Audit completo: superato dopo la correzione; prima falliva sul controllo di settembre.
- Tre prove negative: il controllo rifiuta la percentuale di settembre in Agevolazioni, la vecchia fonte ISTAT nella Dieta e la vecchia data di pubblicazione nella Dieta.
- Registro in ordine inverso: audit superato, selezione corretta del mese definitivo più recente.
- Controllo del diff: nessun errore di spaziatura.

## Verifica GitHub

- Primo commit: [`ffa0a2ff`](https://github.com/cpcpcp106-coder/Per-Me/commit/ffa0a2ffebecc5c436b57d4b65afaf17ca068663).
- [Audit rubriche](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44722509638): successo, log PASS verificato. Anche pubblicazione Pages, struttura nazionale e indicizzabilità tecnica hanno esito positivo su questo commit.
- [Prima riprova del Tutor](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44722509447): non più errore di compatibilità; interruzione con codice 124 durante il download delle dipendenze Ubuntu, a causa del limite shell di 180 secondi. Le prove non sono iniziate. Questo esito ha motivato la separazione dei passaggi e i nuovi limiti di tempo sopra descritti.
- Commit definitivo del workflow: [`b9922c54`](https://github.com/cpcpcp106-coder/Per-Me/commit/b9922c54400a38519113b6207ffe52887b00aa28), che include anche l'audit già verificato nel commit precedente.
- [Tutor AI, nuova esecuzione riuscita](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44723145440): tutti i passaggi completati, **51 controlli superati**, nessun fallimento e nessun errore nel rapporto. Log letto fino alla sintesi `TUTOR MOBILE REPORT {"overall":"PASS","checks":51,"failures":[],"errors":[]}`; rapporto JSON caricato come artefatto del workflow.
- Le prove includono copia reale dei 30 prompt, esercizi al tocco, layout 320/390 px, guida Android, cinque approfondimenti, sincronizzazione app e lettura/copia offline.
- [Pubblicazione Pages](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44723144920) e [indicizzabilità tecnica](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44723145545): successo sul commit `b9922c54`.
- Controllo HTTP esterno del 20 novembre: `agevolazioni-diritti.html` e `dieta-mediterranea-scientifica.html` rispondono entrambe HTTP 200 e coincidono byte per byte con i sorgenti su cui è stato eseguito l'audit. Non si attribuisce a questa verifica uno stato Google.
- Il tentativo browser nell'ambiente locale non ha eseguito le prove, per il limite `socket() failed: Operation not permitted`; non è conteggiato come prova riuscita. L'esito browser positivo sopra documentato proviene da GitHub Actions.

**Punto 1 concluso:** ripristinati e verificati entrambi i controlli richiesti. Le sole modifiche sono workflow, audit e questo registro; i contenuti pubblici e i dati economici sono rimasti quelli già verificati.

Limiti: le prove browser restano emulazione Chromium e non un collaudo fisico Samsung o una revisione clinica indipendente. I punti 2–7 non sono eseguiti nell'ambito di questo intervento.
