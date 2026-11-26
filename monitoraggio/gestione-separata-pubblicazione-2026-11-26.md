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

Pubblicazione sul sito Per Me autorizzata esplicitamente da Enrico il 26 novembre 2026, dopo la lettura della copia completa con foto. Sono in corso i workflow della proposta; integrazione e verifica pubblica saranno registrate con gli esiti effettivi. Nessuna diffusione sui social richiesta o eseguita in questo incarico.

Integrazione preventiva con `ab7b001dbae75d5cd47c6ddfa72323b5d9e0ae33`: conservata la guida ai contatti INPS e tutti i relativi collegamenti, dati e immagini. I registri e la homepage mantengono entrambe le nuove guide.
