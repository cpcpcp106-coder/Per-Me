# Per Me — revisione approfondita delle due guide ai lieviti

**Data:** 19 novembre 2026. **Ambito:** soltanto la prima fase, ossia creare da zero e portare a maturazione la pasta madre solida e il LI.CO.LI. Le fasi successive (pane e pizza) non sono incluse.

## Esito editoriale pubblicato

- [Pasta madre solida da zero](https://cpcpcp106-coder.github.io/Per-Me/pasta-madre-solida-da-zero.html): chiariti strumenti, contenitore, temperature, pesatura e impasto iniziale, osservazioni nelle 72 ore, conservazione di 100 g e scarto delle quantità residue, calendario giornaliero, passaggio condizionato a due rinfreschi, verifica ripetuta della triplicazione e mantenimento dopo maturazione. Rinfresco confermato: **100 g pasta madre precedente + 200 g farina + 100 g acqua = 400 g**.
- [LI.CO.LI. da zero](https://cpcpcp106-coder.github.io/Per-Me/licoli-da-zero.html): chiariti idratazione, consistenza e temperature; prima miscela di 50 g farina integrale e 50 g acqua; rinfreschi, scarti, calendario a 24 e poi 12 ore, raddoppio ripetuto in 6–8 ore, falsa crescita iniziale, problemi comuni, conservazione e riattivazione. Rinfresco confermato: **50 g LI.CO.LI. precedente + 50 g farina + 50 g acqua = 150 g**.
- Entrambe le guide hanno scheda dosi in evidenza, indice interno, calendario, quattro risposte ai problemi più comuni, avvertenze di igiene e sicurezza, testi alternativi delle foto, riferimenti verificabili, pulsante Facebook. Sono state mantenute le due immagini illustrative originali generate con AI, con dichiarazione esplicita; i diritti sono registrati in `FONTI/registro-diritti-immagini.json`.
- L'indice [Pasta madre e pane](https://cpcpcp106-coder.github.io/Per-Me/lievito-madre.html) ora chiarisce che i due tipi di lievito non sono intercambiabili grammo per grammo perché l'acqua contenuta è diversa.

## Fonti primarie utilizzate

- Istituto Zooprofilattico Sperimentale delle Venezie / Regione FVG, [*Pane e prodotti da forno*, sezione pasta madre](https://ppl.regione.fvg.it/public/News/2017/MANUALE%20PPL%20PANE_FVG.pdf): avvio, proporzione del rinfresco solido, passaggio ai rinfreschi ravvicinati e criterio della triplicazione in circa 4 ore a 28 °C.
- King Arthur Baking, [*Sourdough Starter Recipe*](https://www.kingarthurbaking.com/recipes/sourdough-starter-recipe) e [*Feeding and Maintaining Your Sourdough Starter*](https://www.kingarthurbaking.com/recipes/feeding-and-maintaining-your-sourdough-starter-recipe): rinfresco 1:1:1, ritmo indicativo, maturazione, mantenimento e riattivazione.
- Colorado State University Extension, [*Sourdough Starter Best Practices*](https://extension.colostate.edu/resource/sourdough-starter-best-practices/): igiene, farina cruda, contaminazioni, muffe e conservazione.
- King Arthur Baking, [*Debunking the biggest sourdough myths*](https://www.kingarthurbaking.com/blog/2024/04/24/sourdough-myths): limiti della prova del galleggiamento.

Il metodo è originale e adattato alle pesature concordate da Enrico; non proviene da un testo di Sara Papa e non ne attesta partecipazione, endorsement o revisione. La verifica è documentale/editoriale, **non** una prova in cucina né una validazione scientifica indipendente.

## Verifiche

- Modifiche pubblicate con commit [`6c62822`](https://github.com/cpcpcp106-coder/Per-Me/commit/6c62822c1c61abc48e5c32bb61846ba76005f514).
- Audit locale: **133 pagine, 3.400 link interni, zero errori**; **123 pagine** con componente Facebook; **99 asset** nel registro dei diritti, nessuna eccezione; audit editoriale senza anomalie; `git diff --check` senza errori.
- Browser pubblico, 19 novembre 2026: entrambi gli URL mostrano le nuove schede, i calendari, i collegamenti alle sezioni, le fonti e i pulsanti Facebook; fotografie visibili e layout iniziale leggibile su desktop.
- [Deploy GitHub Pages](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44492533004): completato con successo sul ramo aggiornato dopo il commit della revisione.
- [Collaudo Playwright](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44492506307): **completato con successo** (verifica successiva il 19 novembre 2026). Comprende viewport 320/390/768 px, contrasto minimo 7:1 per pulsanti e indice interno, fotografie, link e lettura offline delle due guide iniziali.

Non è stato inviato alcun nuovo post Facebook come parte di questa revisione.
