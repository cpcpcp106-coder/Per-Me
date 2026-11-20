# Per Me — Punto 3: contenuti, fotografie e fonti

**Data: 20 novembre 2026.** Base esaminata: commit `29c5252f675b424af97dfc2ee9c84aed4703c5ab`, successivo ai punti 1 e 2. Il controllo integra i registri precedenti senza trasformarli in una certificazione professionale.

## Risultato e modifiche

Inventariate tutte le **143 pagine della sitemap**: un titolo H1, contenuto principale e immagini registrate con attributo alternativo. L’audit editoriale automatico specifico copre **137 pagine nella radice**; i sei file in sottocartelle sono distinti nell’inventario. Verificati foto e componente Facebook nelle **127 pagine di guide e indici** coperte dai rispettivi controlli.

La revisione visiva ha esaminato **127 immagini e schermate distinte**, escluse icone e loghi tecnici. Trovate e corrette due incongruenze:

- Nella home il testo alternativo descriveva una fermata dell’autobus non visibile: ora descrive la donna con una cartellina che cammina in città.
- Nella Guida 20 sul fegato la fotografia mostrava un’ecografia ostetrica. Sostituita con un’immagine originale di un colloquio medico, generata il 20 novembre e dichiarata come tale. Non rappresenta un caso clinico documentato. Inserita anche l’immagine di condivisione; aggiornato il lastmod della pagina.

La nuova fotografia è in `assets/diabete-guida-20-colloquio-fegato-originale.webp`, 1200 × 800 pixel, 103.148 byte. Prompt, provenienza e impronte dei file sono documentati in `FONTI/immagine-fegato-2026-11-20.json`. Il patrimonio locale comprende ora **104 file registrati**, dei quali 88 richiamati; le fotografie stock usate scendono da 43 a **42**. Le 41 immagini storiche dichiarate dal curatore restano distinte dalle immagini con provenienza documentata individualmente; non sono state promosse a una verifica mai effettuata.

Corretto inoltre il rapporto automatico editoriale: riportava sempre il 19 ottobre, anche nelle esecuzioni successive. Ora registra data e ora effettive e specifica il proprio perimetro. Aggiunta al registro storico del 23 ottobre una nota sul rinvio del Testo unico della riscossione al 2027: le guide pubbliche erano **già corrette dal 18 novembre**.

## Confronto fattuale mirato

Sono stati ricontrollati punti selezionati di **14 pagine**, identificati uno per uno nell’inventario JSON. Non viene dichiarata una nuova verifica di ogni frase dell’intero sito.

| Argomento | Riscontro e limite | Fonte primaria |
|---|---|---|
| Ricorsi INPS | Confermati 90 giorni come regola generale, specifiche eccezioni di 30 giorni e mancata sospensione dei termini per l’autotutela. La decorrenza concreta dipende dall’atto. | [INPS, riesame e ricorso pensionistico, aggiornamento 21 maggio 2026](https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.ricorso-amministrativo-pensionistico-51189.ricorso-amministrativo-pensionistico.html) |
| Riscossione | Le disposizioni del nuovo Testo unico si applicano dal 1° gennaio 2027; conservati i riferimenti alla disciplina applicabile nel 2026. | [Normattiva, D.L. 200/2025, art. 4](https://www.normattiva.it/atto/caricaDettaglioAtto?atto.articolo.numero=4&atto.codiceRedazionale=25G00213&atto.dataPubblicazioneGazzetta=2025-12-31) |
| Pignoramento dello stipendio da AdeR | Le frazioni particolari sono distinte dalla disciplina ordinaria e dal calcolo sul singolo caso. | [AdeR, procedure esecutive](https://www.agenziaentrateriscossione.gov.it/it/Per-saperne-di-piu/le-procedure/procedure-esecutive/) |
| Sovraindebitamento | Confermata la disciplina dell’incapiente modificata nel 2024; nessun beneficio o arresto dell’esecuzione presentato come automatico. | [Gazzetta Ufficiale, D.Lgs. 136/2024, art. 43](https://www.gazzettaufficiale.it/atto/serie_generale/caricaArticolo?art.codiceRedazionale=24G00154&art.dataPubblicazioneGazzetta=2024-09-27&art.flagTipoArticolo=0&art.idArticolo=43&art.idGruppo=1&art.idSottoArticolo=1&art.idSottoArticolo1=10&art.progressivo=0&art.versione=1) |
| Trasporti FVG | Riscontrati i regimi agevolati. Il tetto reddituale numerico 2026 resta da accertare: non sostituito con una cifra del 2025. | [Regione FVG, agevolazioni](https://www.regione.fvg.it/rafvg/cms/RAFVG/infrastrutture-lavori-pubblici/infrastrutture-logistica-trasporti/FOGLIA105/) |
| Ticket FVG | Riscontrate categorie reddituali e validità particolare dell’E02. Il reddito fiscale è distinto dall’ISEE. | [ASUFC, esenzione ticket, aggiornamento 11 giugno 2026](https://asufc.sanita.fvg.it/it/servizi/esenzione.html) |
| Farmaci e rene nel diabete | Ricontrollati punti di sicurezza di metformina e SGLT2, precauzioni durante malattia e chirurgia. Non introdotte istruzioni di modifica autonoma delle terapie. | [ADA 2026, sezione 9](https://doi.org/10.2337/dc26-S009); [KDIGO 2024](https://kdigo.org/wp-content/uploads/2026/04/KDIGO-2024-CKD-Guideline.pdf); [EMA, SGLT2 e chetoacidosi](https://www.ema.europa.eu/en/medicines/human/referrals/sglt2-inhibitors) |
| Giorni di malattia e urgenze | Confermati il piano individuale, il rischio di chetoacidosi anche senza glicemie molto alte e la distinzione fra persona cosciente che deglutisce e persona che necessita di soccorso. | [NICE NG28, aggiornamento 2026](https://www.nice.org.uk/guidance/ng28/resources/type-2-diabetes-in-adults-managementpdf-1837338615493); [ADA 2026, sezione 6](https://doi.org/10.2337/dc26-S006) |
| Fragilità e gravidanza | Ricontrollati gli obiettivi differenziati negli anziani e l’aggiornamento EMA sull’allattamento con tirzepatide; conservato il rinvio alle decisioni specialistiche. | [ADA 2026, sezione 13](https://doi.org/10.2337/dc26-S013); [EMA, Mounjaro, informazioni di prodotto](https://www.ema.europa.eu/en/documents/product-information/mounjaro-epar-product-information_en.pdf) |
| INPS Mobile | Confermate le date e le novità annunciate dall’Istituto. Le funzioni dell’app non sono state provate direttamente. | [INPS, notizia dell’11 novembre 2026](https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.11.rilasciata-la-versione-5-0-dell-app-inps-mobile.html) |

I punti ricontrollati risultavano già trattati correttamente: nessuna modifica arbitraria delle indicazioni cliniche, dei termini o dei requisiti. Le nuove guide sulla panificazione sono state confrontate con i registri di revisione e le loro avvertenze; questo non costituisce una prova pratica delle ricette.

## Fotografie e collegamenti esterni

Tutte le **43 fotografie stock in uso all’avvio** sono state scaricate con successo per la revisione; verificati 46 URL comprendenti varianti dimensionali. Rilette le licenze [Pexels](https://www.pexels.com/license/) e [Unsplash](https://unsplash.com/license/). Per tutte le 43 schede Pexels in inventario sono stati riscontrati autore, ID, licenza e gratuità nei metadati della scheda primaria. La scheda Unsplash è stata letta attraverso la ricerca web, perché il fetch diretto riceveva 401. Le schede comprendono anche immagini storiche non più impiegate.

Riesaminati i 14 link segnalati dal controllo automatico delle 09:40 UTC: **CNAS Romania ora HTTP 200**, altri **13 inconcludenti** in questo ambiente, con HTTP 503 anziché il precedente errore di certificato. Non è stata disabilitata la verifica TLS. Non sono stati eliminati collegamenti per il solo esito di una richiesta automatizzata; ove possibile il contenuto è stato confrontato anche con la fonte ufficiale alternativa già presente nella guida.

## Verifiche e limiti

Passati in locale: audit editoriale, diritti delle immagini, componente Facebook, registro normativo, debiti, Salute 01 e Salute 02/rubriche. Passati anche i **13 controlli dell’app su sincronizzazione e percorsi offline** e la verifica sintattica dello script di collaudo browser.

Il collaudo Chromium è stato esteso alla nuova foto e al pulsante Facebook della Guida 20 e alla lettura offline del suo testo aggiornato. La relativa esecuzione su GitHub e il controllo del sito pubblico devono essere registrati dopo la pubblicazione; i controlli locali non ne anticipano l’esito.

Restano distinti: revisione documentale, verifica tecnica, revisione clinica/giuridica indipendente e prova con persone reali. Le ultime due non sono dichiarate eseguite. I 13 link inconcludenti e il tetto reddituale FVG 2026 restano indicati come tali. Le prove sul Samsung appartengono al punto 4 e non sono simulate come prove fisiche.

Evidenze: `punto-3-inventario-pagine-2026-11-20.json`, `punto-3-verifica-schede-foto-2026-11-20.json`, `punto-3-caricamento-e-revisione-immagini-2026-11-20.json`, `punto-3-riesame-link-2026-11-20.json` nella cartella `monitoraggio`.
