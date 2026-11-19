# Per Me — pubblicazione delle guide per pane e pizza

**Data:** 19 novembre 2026. **Ambito:** seconda e terza fase del percorso «Pasta madre e pane».

## Guide e immagini

- [Pane semplice da circa 500 g in friggitrice da 8 litri e in forno](https://cpcpcp106-coder.github.io/Per-Me/pane-500g-friggitrice-8-litri.html): ricetta da 608 g d'impasto, alternativa con pasta madre solida o LI.CO.LI., utensili, dosi, preparazione, calendario, temperatura e durata di cottura, raffreddamento, problemi comuni. La capienza della friggitrice è indicata senza marca o modello.
- [Pizza alla napoletana con LI.CO.LI.](https://cpcpcp106-coder.github.io/Per-Me/pizza-napoletana-con-licoli.html): ricetta per due panetti da circa 251 g, rinfresco, ingredienti, impasto, puntata, staglio, appretto, calendario di 24 ore, stesura a mano, Margherita e cottura. È esplicitata la differenza tra riferimento AVPN, ricetta domestica e disciplinare europeo STG.
- Fotografie illustrative originali generate con AI, non documentazione di cotture eseguite: `assets/pane-500g-friggitrice-8l-originale.webp` e `assets/pizza-napoletana-licoli-originale.webp`. Dati e provenienza aggiunti in `FONTI/registro-diritti-immagini.json`; testo alternativo presente nelle due guide.
- Aggiornati [indice del percorso](https://cpcpcp106-coder.github.io/Per-Me/lievito-madre.html), home, collegamenti tra tutte le fasi e `sitemap.xml`. Entrambe le nuove guide hanno collegamento alla Pagina Facebook Per Me Guide e comandi adatti alla lettura da smartphone.

## Fonti e limiti

- [AVPN, disciplinare 2024](https://www.pizzanapoletana.org/public/pdf/Disciplinare-2024-ITA.pdf) e [AVPN, *I lieviti in pizzeria*, 25 maggio 2026](https://www.pizzanapoletana.org/it/371-i_lieviti_in_pizzeria): vincoli tecnici di riferimento per la pizza e uso del lievito in coltura liquida.
- [Regolamento UE 97/2010](https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:32010R0097) e [regolamento UE 2022/2313](https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:32022R2313): la denominazione STG è distinta dal riferimento AVPN.
- [King Arthur Baking, cottura del pane](https://www.kingarthurbaking.com/recipes/crusty-dutch-oven-sourdough-bread-recipe): riferimento pratico per la temperatura interna del pane cotto.
- Le ricette e le fotografie non attestano una prova pratica in cucina, una validazione indipendente o un'affiliazione/approvazione di chef o organismi di certificazione. I tempi di lievitazione e cottura sono indicativi e dipendono da ingredienti e apparecchi effettivi.

## Verifiche effettuate

- Primo commit di pubblicazione: [`14ce9dd`](https://github.com/cpcpcp106-coder/Per-Me/commit/14ce9dd6f1657255d30ffa4a7d23f516df59931c). Successivo aggiornamento di riservatezza della guida al pane: [`7b83b23`](https://github.com/cpcpcp106-coder/Per-Me/commit/7b83b239d085540e5e09f98b8a004d7446701fad), per eliminare una menzione personale non indispensabile.
- Audit in locale: **135 pagine, 3459 collegamenti, zero errori di struttura; 125 guide con componenti Facebook; 101 immagini con provenienza registrata, senza eccezioni**; audit editoriale e controllo delle differenze senza errori.
- [Collaudo automatizzato](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44496967860): **superato, 156 controlli**. Include visualizzazioni a 320, 390 e 768 px, contrasto dei pulsanti almeno 7:1, presenza delle fotografie, collegamenti e accesso offline alle quattro guide del percorso.
- [Deploy GitHub Pages](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44497020908): completato con successo per il primo commit di pubblicazione e successivo audit automatico.
- Controllo con browser sul sito pubblico il 19 novembre 2026: entrambe le nuove pagine raggiungibili; fotografie, calendari, fonti, collegamenti e pulsanti Facebook presenti. La verifica del nuovo deploy successivo alla correzione di riservatezza è distinta dal controllo del primo rilascio.

Non sono stati pubblicati nuovi post sulla Pagina Facebook in questo intervento.

## Integrazione del 19 novembre 2026 — disciplinare originale

- Nella [guida alla pizza](https://cpcpcp106-coder.github.io/Per-Me/pizza-napoletana-con-licoli.html) è stato aggiunto, immediatamente sotto la fotografia e la spiegazione AVPN/STG, un riquadro con pulsante grande per consultare il [PDF originale integrale AVPN 2024](https://www.pizzanapoletana.org/public/pdf/Disciplinare-2024-ITA.pdf), verificato come documento ufficiale di **28 pagine**. Il file resta ospitato dall'associazione e non viene copiato o alterato nel repository.
- Il riquadro distingue il disciplinare AVPN dalla [disciplina europea STG pubblicata su EUR-Lex](https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:32010R0097). Aggiunto anche il collegamento nell'indice interno della guida.
- Aggiornamento pubblicato con commit [`0f12bc1`](https://github.com/cpcpcp106-coder/Per-Me/commit/0f12bc1ccac8beea82864a662d8a72e9956ae39b). Verifiche locali: struttura di 135 pagine senza errori, 125 guide con pulsante Facebook, `git diff --check` senza errori.
