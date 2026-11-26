# Per Me — Correzioni dalla valutazione del 26 novembre 2026

Base di lavoro: `9a3936273b08c805d723d499cffb36e7267ae85a`. Incarico autorizzato da Enrico: procedere alle correzioni con un agente dedicato fino alla risoluzione delle parti concretamente verificabili.

## Modifiche predisposte

| Problema osservato | Correzione | Verifica |
| --- | --- | --- |
| Ricerca «badante» vuota, «badanti» trova la guida | Normalizzazione condivisa di varianti frequenti, singolari e plurali. Conservato il sinonimo busta paga/cedolino e la priorità dei risultati. Stessa logica nell’app, anche offline. | Browser anteprima: «badante» trova la guida giusta. Aggiunte prove di regressione per quattro ricerche, ranking e assenza di risultati. |
| Rubriche dopo molte notizie e homepage lunga | Collegamenti immediati alle sezioni; rubriche prima delle notizie; una novità visibile e le sette precedenti nello stesso riepilogo apribile. | Stessa finestra desktop 1363×936: altezza 8182px contro 10719; inizio rubriche 2727 contro 6307. Misure della sessione, non prestazioni di caricamento. |
| Collegamento visita troppo generico | «Devo preparare un controllo per diabete o cuore», coerente con la destinazione. | Letto nel percorso pubblico di anteprima; aggiunta prova automatica. |
| Guide lunghe | Aperture operative brevi caregiver e menù, con collegamenti alle sezioni. Approfondimenti mantenuti. | Verificate ancore caregiver#da-dove/#casi e menù#settimana. Prove a 320/390 e 200% aggiunte al collaudo. |
| Riscontri poco uniformi | Facebook come primo canale nel metodo; GitHub alternativa. In Prova lettori ingresso diretto per un solo riscontro, prove facoltative. | Collegamenti e testo verificati, nessun messaggio inviato. |

Sitemap: aggiornate le date delle sei pagine HTML modificate. Il numero di URL resta 159. Cache dell’app aggiornata per distribuire la ricerca corretta. Nessun nuovo dato personale, nessun pagamento o attivazione di abbonamenti.

## Verifiche preliminari

- 19 test dell’app superati; sincronizzazione, memoria e fallback offline inclusi.
- Layout condiviso coerente su 153 pagine; controllo struttura: nessun errore di destinazioni locali o ancore.
- Audit editoriale automatico:153 pagine e zero errori; gli avvisi preesistenti sulle immagini remote non equivalgono a fotografie rotte.
- Audit indicizzabilità:159 pagine pubbliche, quattro tecniche,159 URL in sitemap,159 raggiungibili dalla home e zero problemi.
- Sintassi JavaScript e `git diff --check` superati.
- La prova browser mobile completa sul candidato è da confermare dai workflow: le verifiche preliminari non la sostituiscono.

## Confronto documentale mirato delle guide sensibili

Un agente AI distinto ha confrontato parti delle guide caregiver e preparazione della visita con le fonti primarie. Nessun errore sostanziale accertato nei punti campionati. Non è una revisione clinica, previdenziale o giuridica professionale indipendente e non copre ogni affermazione del sito.

Fonti effettivamente lette dal controllo dedicato:

- [INPS permessi 104](https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.50098.indennit-per-permessi-fruiti-dai-lavoratori-per-assistere-familiari-disabili-in-situazione-di-gravit-o-fruiti-dai-lavoratori-disabili.html): requisiti, parentela, alternanza e totale giorni.
- [INPS congedo straordinario](https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.50097.indennit-per-congedi-straordinari-assistenza-familiari-disabili-.html): ordine di priorità, convivenza e limiti.
- [INPS accompagnamento](https://www.inps.it/it/it/dettaglio-approfondimento.schede-informative.indennit-di-accompagnamento-agli-invalidi-civili.html) e [Prestazione universale](https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.decreto-anziani-prestazione-universale.html): requisiti/importi campionati coerenti.
- [INPS procedura dai 70 anni](https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.05.disabilit-over-70-le-novit-dal-1-giugno.html): distinzione territoriale e condizioni del procedimento.
- [ATS Pavia](https://www.ats-pavia.it/riconciliazione-della-terapia-farmacologica-cosa-e-importante-sapere): elenco aggiornato farmaci e modifiche affidate ai professionisti.

L’iter parlamentare caregiver resta un riscontro storico datato 23 novembre. Il risultato indicizzato del Senato segnala un passaggio successivo, ma l’apertura diretta non è stata completata per protezione del sito: nessuna data aggiornata arbitrariamente. Gli accessi problematici a Ministero/ISSalute non sono stati trasformati in dichiarazioni di link rotti.

## Google: fatti distinti dalla predisposizione tecnica

Il canale GSC Wizard risponde `payment_required`; non acquistato. Il percorso gratuito in browser funziona con la proprietà già autorizzata.

- Rapporto Pagine letto 26 novembre: ultimo aggiornamento 16/11/2026,3 indicizzate,5 non indicizzate, motivo «Pagina scansionata, ma attualmente non indicizzata».
- [Ispezione homepage letta 26 novembre](https://search.google.com/search-console/inspect?resource_id=https%3A%2F%2Fcpcpcp106-coder.github.io%2FPer-Me%2F&id=LIoYRs5YzajuXN92iyJAIw): «L’URL si trova su Google», ultima scansione 15 novembre 2026, recupero positivo, scansione e indicizzazione consentite, canonical della homepage. È l’esito di quell’URL e di quella scansione.
- [Dettaglio sitemap XML](https://search.google.com/search-console/sitemaps/info-drilldown?resource_id=https:%2F%2Fcpcpcp106-coder.github.io%2FPer-Me%2F&sitemap=https:%2F%2Fcpcpcp106-coder.github.io%2FPer-Me%2Fsitemap.xml): lettura 26/11,0 URL, «Impossibile leggere la Sitemap». Anche sitemapTXT e varianteXML precedente compaiono con recupero non riuscito. Il sito le serve HTTP 200; causa del mancato recupero da Google non accertata.

Non sono stati confusi HTTP 200, validità della sitemap, indicizzabilità tecnica e indicizzazione effettiva. Resta da verificare la scansione delle pagine modificate dopo la pubblicazione. Le richieste di indicizzazione non possono garantire inclusione o tempi. Riferimento: [Google, risoluzione problemi di scansione](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors).

## Stato

Candidato predisposto e verifiche preliminari completate. Pubblicazione, controlli sul commit candidato, prove offline del comportamento modificato e riscontro finale saranno annotati con collegamenti solo dopo l’esito effettivo. Restano esterni al lavoro software la certificazione professionale delle guide, una prova su Samsung reale e la decisione di indicizzazione di Google.

## Correzione del collaudo della prova lettori

Il [primo collaudo browser](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45809861913) sul candidato 712ca9b si è interrotto perché cercava il vecchio collegamento «Inizia la prova», sostituito nell’interfaccia con «Scegli una prova». La causa è confermata dall’errore nell’artefatto del workflow. I quattro percorsi di ricerca a 320/390 e testo 200% erano già superati, con zero violazioni automatiche sulla homepage; il resto del collaudo non era stato completato.

Il test ora usa il nome visibile aggiornato e verifica anche l’ingresso Facebook diretto. Aggiunta la stampa dell’errore fatale nei log: nessun requisito di prova rimosso e nessuna soglia di accessibilità allentata. Nuovo esito da attendere prima dell’integrazione.

## Nuova prova delle guide lunghe al 200%

Il [collaudo strumenti 45809854613](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45809854613) ha superato 60 prove di percorsi e strumenti, poi ha rilevato scorrimento orizzontale nella guida caregiver a 320 px con testo al 200%. I due nuovi collegamenti iniziali funzionano. Questo controllo più esteso ha fatto emergere un difetto non coperto dalle precedenti prove di sola homepage. Il resto della suite è rimasto ineseguito e non è conteggiato come superato.

L’agente ha aggiunto ritorno a capo ereditabile alla pagina caregiver e didascalia, permesso il restringimento dei contenitori interessati e rimosso il ritaglio delle righe-tabella mobile. Font e foto invariati. Versione CSS aggiornata in entrambe le guide caregiver. Il menù riceve un’analoga regola di ritorno a capo, senza cambiare le dimensioni del testo. Il test conserva la soglia di due pixel e ora stampa gli elementi fuori schermo in caso di errore. Verifica finale del nuovo candidato da attendere.
