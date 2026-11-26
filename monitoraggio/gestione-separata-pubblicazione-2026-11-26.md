# Gestione Separata — guida al rimborso oltre il massimale

Verifica editoriale e tecnica: 26 novembre 2026.

## Contenuto e fonti

Nuova guida nazionale: `gestione-separata-rimborso-contributi-massimale.html`. Destinatari: parasubordinati della Gestione Separata, committenti e familiari che li aiutano.

Sono distinti avvisi per il massimale 2026 e importi rimborsabili 2024/2025; quote di un terzo e due terzi sui contributi eccedenti; più committenti; esclusione temporanea degli sportivi dilettantistici dal primo invio; assenza di necessità di una seconda domanda per somme già richieste. Il massimale 2026 di 122.295 euro non viene applicato alle annualità precedenti e non viene descritto come importo del rimborso.

Fonti e risposte HTTP: `FONTI/gestione-separata-fonti-2026-11-26.json`. PDF ufficiali del messaggio 3575/2026 e della circolare 8/2026 consultati. Istruzioni del messaggio 3247/2026 confrontate con la notizia INPS del 13 ottobre 2026. La pagina HTML del messaggio restituisce HTTP 200 ma il testo non era incluso nel corpo restituito all’accesso diretto: presente collegamento alla sintesi ufficiale completa. Nessuna revisione previdenziale o giuridica indipendente attribuita, nessuna domanda personale presentata.

## Immagine e integrazione

Fotografia iperrealistica originale generata in questa sessione, con persona immaginaria e documenti generici. Provenienza, prompt e impronte in `FONTI/gestione-separata-immagine-2026-11-26.json`; JPEG per anteprima sociale e WebP per la pagina. Testo alternativo e didascalia trasparente.

Collegamenti da homepage, Soldi e lavoro, Pensione e invalidità, guida all’estratto contributivo. Inserimento nel catalogo del gradimento e nella sitemap. La ricerca del sito e il lettore PWA scoprono la guida dai collegamenti delle rubriche, senza modifiche ai sorgenti dell’app.

## Verifiche prima della pubblicazione

- `node scripts/controlla-struttura.cjs`: 155 pagine, 4.006 link locali, zero errori.
- `node scripts/controlla-facebook-guide.cjs`: componente condiviso presente in 145 pagine/guide; anche pulsante Facebook esplicito nella nuova guida.
- `python scripts/audit-indicizzazione.py`: 161 pagine pubbliche e 161 URL in sitemap; tutte raggiungibili dalla home, zero problemi tecnici. Questo non dimostra indicizzazione Google.
- `node scripts/audit-diritti-immagini.cjs`: inventario e impronte superati; nuova immagine documentata.
- `node --test app/tests/*.test.cjs`: 19 test superati, compresi conservazione offline e sincronizzazione. Non è un collaudo specifico della nuova guida su Samsung.
- Browser nell’anteprima: fotografia caricata a 1536 × 1024, pulsante Facebook con destinazione corretta, indice aperto e navigazione alla tabella funzionanti. Comando di ingrandimento fino al 200% funzionante e assenza di overflow sul viewport desktop osservato (1363 px). Le prove 320/390 px sono demandate al workflow browser che visita tutte le pagine.
- `git diff --check`: superato.

## Pubblicazione

Pubblicazione sul sito Per Me autorizzata esplicitamente da Enrico il 26 novembre 2026, dopo la presentazione della copia completa con foto. Tutti i 21 workflow della proposta sono superati; pubblicazione e verifica pubblica completate. Nessuna diffusione sui social richiesta o eseguita in questo incarico.

Integrazione preventiva con `ab7b001dbae75d5cd47c6ddfa72323b5d9e0ae33`: conservata la guida ai contatti INPS e tutti i relativi collegamenti, dati e immagini. I registri e la homepage mantengono entrambe le nuove guide.

## Esito della pubblicazione

- [PR #49](https://github.com/cpcpcp106-coder/Per-Me/pull/49) integrata con commit `7f79a09bec65fe5576d405743cad44a66e78a4c8`. Tutti i 21 workflow sul commit proposto `4b9580f7639fa1b3de3ad80a4cb0d1a2f93f0878` sono superati, incluso il [collaudo browser, responsive e offline](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45838515904).
- [Deployment Pages riuscito](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45838974507) sul commit `deb035204333b62f126bade3d8f58e4755a8566e`, che aggiunge soltanto lo snapshot automatico all’audit statico dopo il merge.
- [Guida pubblicata](https://cpcpcp106-coder.github.io/Per-Me/gestione-separata-rimborso-contributi-massimale.html): dieci risorse pubbliche verificate HTTP 200 e identiche alle sorgenti validate, comprese pagina, due foto, CSS, home, rubriche, guida collegata, catalogo e sitemap. Canonical corretto e direttive `index,follow`.
- Browser sul sito pubblico: aperta la guida dal nuovo collegamento in home, fotografia caricata a 1536 × 1024, pulsante Facebook alto 56 px con destinazione corretta, indice espandibile e collegamento alla sezione della domanda funzionanti, quattro fonti ufficiali presenti.
- Nel lettore in anteprima la ricerca “massimale” trova la nuova guida: testo di 13.006 caratteri, tabella, fonti e collegamento Facebook conservati nella copia salvata. Non è una prova di rete assente su Samsung fisico.
- Anche il [collaudo degli strumenti sul ramo principale](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45838944887), che include il controllo della home a 320 px con testo al 200%, è superato.

Evidenze dettagliate: `monitoraggio/gestione-separata-verifica-pubblica-2026-11-26.json`. Nessuna conferma di indicizzazione Google attribuita a questi controlli tecnici.
