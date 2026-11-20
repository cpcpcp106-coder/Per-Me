# Per Me — avanzamento Fase 2, 20 novembre 2026

**Perimetro:** intervento aggiuntivo autorizzato dall'utente sulla Fase 2, pur essendo la Fase 1 ancora aperta. Fase 3 non ampliata. Nessuna pubblicazione di «Offrimi un caffè», nessun pagamento attivato.

## Verifiche prima delle modifiche
- Repository GitHub pubblico `cpcpcp106-coder/Per-Me`, ramo `main` (permessi push verificati).
- Ultimo commit iniziale `c1a121dd56dba8514dd7eafb94f7d687a3c0002d`.
- Riletti `monitoraggio/avanzamento-completamento-2026-11-20.md`, `monitoraggio/fase-2-verifica-2026-11-18.md`, `monitoraggio/revisione-trasversale-tre-fasi-2026-11-18.md`, i tre strumenti pubblicati, il test `scripts/collaudo-tre-fasi.cjs`, il dataset e la guida per diabete/cardiopatia.
- La Fase 2 aveva già orientatore, menu con lista della spesa, calcolatore pasto e calcolatore settimanale. Non si è rivendicata la loro creazione.

## Modifiche documentate
1. **Spesa settimanale:** `strumenti/costo-spesa-settimanale.html` consente di calcolare un subtotale se non tutti i prodotti hanno un prezzo, indicando le righe non valutate. Aggiunto campo facoltativo per dimensione confezione nella stessa unità, con stima separata dell'esborso per confezioni intere rispetto alla quantità utilizzata. Non considera scorte di casa o sconti a quantità. Aggiunti campi facoltativi per negozio/fonte e data della rilevazione. Apertura con una sola riga anziché sei per ridurre la fatica su smartphone.
2. **Prezzi pubblicati e tracciabili (consultazione 20/11/2026):** tre esempi non precaricati nel calcolatore, con prezzi esposti dal rivenditore e relativo URL della singola scheda:
   - Carrefour Classic Penne Rigate Integrali 500 g: €0,89 (€/kg 1,78). https://www.carrefour.it/p/carrefour-classic-penne-rigate-integrali-n.137-500-g/8012666048694.html
   - Lenticchie rosse intere 800 g: €2,48 (€/kg 3,10). https://www.carrefour.it/p/lenticchie-800-g/8020204325749.html
   - Barbera EVO Filtrato da olive italiane 1 L: €11,99 (€/L 11,99). https://www.carrefour.it/p/barbera-olio-extra-vergine-di-oliva-100-da-olive-italiane-filtrato-1-l/8002591201042.html
   - **Avvertenza essenziale:** tutte e tre le schede indicavano *Prodotto al momento non disponibile*. Non sono listini validi per tutta Italia, né prezzi localmente acquistabili verificati. Le fonti possono cambiare. Non sono state usate offerte scadute.
   - Esempio aritmetico sulle tre referenze: consumo di 250 g pasta + 400 g lenticchie secche + 100 ml EVO = €2,884, presentato arrotondato a €2,88. Esborso per confezioni intere = €15,36. Non è un pasto né una spesa settimanale completa.
3. **Origine olio:** conferma documentale (non analisi di lotto) tra dichiarazione del rivenditore *olive coltivate e molite in Italia* e pagina ufficiale Barbera (Filtrato 100% italiano, provenienza Sicilia/Puglia): https://oliobarbera.it/olio/filtrato/ . Articolo 8 del regolamento delegato UE 2022/2104: https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX%3A32022R2104 . La provenienza del **singolo lotto acquistato** non è stata verificata; la guida invita a leggere la vera etichetta. Origine italiana = preferenza editoriale, non superiorità nutrizionale automatica.
4. **Orientatore benefici:** precisata, senza calcoli di eleggibilità, la soglia ISEE Carta acquisti 2026 *inferiore* a €8.230,81 per over 65 e aggiunto link diretto ai requisiti INPS. Fonte: https://www.inps.it/it/it/dettaglio-approfondimento.schede-informative.la-carta-acquisti.html . Requisiti ulteriori e incompatibilità non sono accertati dallo strumento; gli scaglioni grossolani dell'ISEE non consentono di dichiarare l'idoneità. Bonus sociali ARERA 2026 verificati (ordinario ≤€9.796, almeno quattro figli ≤€20.000): https://www.arera.it/consumatori/bonus-sociale/bonus-sociale-per-disagio-economico/quali-sono-i-requisiti .
5. **Collaudi:** ampliato `scripts/collaudo-tre-fasi.cjs` con costo confezione e subtotali parziali, per 320 e 390 px. Rilevata e corretta una discrepanza preesistente nel test `scripts/collaudo-lievito-madre.cjs`: la pizza ha sei link nell'indice, non cinque come le altre guide; ora si controlla anche che ogni ancora abbia una destinazione reale, senza alterare la guida.

## Commits e verifiche
- `253a2a27753cdc40b73f5448a8c1b6605cb557e6`: estensione calcolatore; [commit](https://github.com/cpcpcp106-coder/Per-Me/commit/253a2a27753cdc40b73f5448a8c1b6605cb557e6).
- `e1ee4bffbe7aa518901701888f4d4ab2be3500eb`: correzione arrotondamento dell'esempio.
- `4650993ff099d096dc8932ef7169befe5e4bc7e4`: soglia e fonte Carta acquisti.
- `443483f32b1d93fe6668c1e9ffbdc1258ae6f329`: nuovi test.
- `35fcf0f8529da54cc6faac304a1d13d30e5024e7`: schede prezzo dirette e riscontro produttore EVO.
- `098ab7b2aa11fe1b3975e0a558a838a8193ea9e4`: correzione del test indice pizza, con ancore effettive.
- `b0c3e1c3f18fd3412c27e68d7c6ce817a299f869`: una riga iniziale per la spesa.
- **Esecuzione Playwright riuscita su commit 098ab7b2**: [workflow](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44694697087); log: *20 superati, 0 falliti* per strumenti e *156 controlli superati* sul percorso pane/pizza e offline. Sono browser simulati su Linux, non il Samsung reale.
- **Esecuzione sul commit b0c3e1c3:** [workflow](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44694755502), [indicizzabilità tecnica](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44694755499), [deployment](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44694755255). **Alla stesura del rapporto:** indicizzabilità tecnica in stato `success`, test e deployment ancora in corso/in attesa. Non attribuire a questo commit l'esito della versione precedente.

## Stato reale e blocchi
- **Fase 2: avanzata ma NON conclusa o certificata.** Prezzi reali citati, ma la disponibilità locale è assente nelle schede osservate; non esiste un paniere settimanale completo di prezzi commerciali acquistabili verificati. Origine documentata a livello di prodotto EVO, non su bottiglia/lotto. Lo strumento rimane informativo, non una prescrizione clinica o un accertamento delle prestazioni.
- Fase 1 ancora aperta secondo il rapporto del 20/11: revisione integrale giuridico-scientifica, diritti foto e controlli assistivi/telefonici reali.
- Le pagine del sito pubblico `github.io` non sono state raggiungibili da questo ambiente di consultazione; tale esito **non dimostra un guasto del sito** e non certifica i contenuti deployati.
- Nessuna introduzione di dati personali, prezzi inventati, nuove funzionalità a pagamento o nuovi inviti WhatsApp.
