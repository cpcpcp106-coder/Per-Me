# Per Me — Correzioni dalla valutazione del 26 novembre 2026

Base di lavoro: `9a3936273b08c805d723d499cffb36e7267ae85a`. Incarico autorizzato da Enrico: procedere alle correzioni con un agente dedicato fino alla risoluzione delle parti concretamente verificabili.

## Esito finale verificato il 26 novembre 2026

Le correzioni software sono integrate e pubblicate nella [PR #47](https://github.com/cpcpcp106-coder/Per-Me/pull/47). Tutti i **23 workflow sul candidato finale `a23f3c9d981ec88a0d2154eb71f679d5b8084ad1` sono riusciti** prima dell'integrazione. Il commit di integrazione è `712d31a17f7644d43cb9e35cb5bb605ec489b958`.

- [Collaudo strumenti](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45812249993): 60 verifiche ordinarie e 148 verifiche delle migliorie superate; riuscita anche la fase finale sui percorsi lievito, foto e offline.
- [Collaudo browser completo](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45812258734): riuscito, inclusi accessibilità automatica, ricerche, stampa e percorsi offline. Le nuove prove controllano il raddoppio effettivo del testo e l'assenza di scorrimento orizzontale nelle guide caregiver e menù a 320/390 px e testo 200%.
- [Pubblicazione Pages](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45812734384): riuscita sul commit `bd2ebc8267aa062d4f4998ed7847ab2d9c8cb984`. La prima pubblicazione sull'integrazione è stata sostituita da questo avvio successivo, non conteggiata come riuscita.
- Verifica sul sito pubblico dopo la pubblicazione: 13 risorse modificate HTTP 200 e contenuto SHA-256 identico al candidato verificato; tre fotografie HTTP 200 con tipo immagine e contenuto attesi. La ricerca pubblica «badante» trova e apre la guida colf/badanti; foto e collegamento Facebook osservati.
- Audit di indicizzabilità: 159 pagine pubbliche, quattro tecniche, 159 URL nella sitemap e nessun problema rilevato. Questo controllo non misura l'indicizzazione di Google.

### Google: interventi completati ed esito ancora aperto

È stato usato l'accesso gratuito ufficiale a Search Console, già autorizzato. Il test pubblicato della sitemap dà HTTP 200, XML valido e 159 URL; anche il [test live di Google](https://search.google.com/search-console/inspect?resource_id=https%3A%2F%2Fcpcpcp106-coder.github.io%2FPer-Me%2F&id=G70APXZLh9dCSKPrbRFUGw&alt_id=uCHftzlvWbqz4_LGVqfyJg) ha restituito recupero positivo e disponibilità per Google.

Dopo la pubblicazione è stata reinviata **una sola volta** `sitemap.xml`, con ricevuta «Sitemap inviata». Al successivo controllo il [rapporto Sitemap](https://search.google.com/search-console/sitemaps?resource_id=https%3A%2F%2Fcpcpcp106-coder.github.io%2FPer-Me%2F) mostrava ancora «Impossibile recuperare» e zero URL rilevati. Il reinvio è accettato, la lettura della sitemap non è confermata. La causa resta da accertare: non è stata attribuita all'AI o ad altri fattori senza prova.

Accettate da Google le richieste di indicizzazione della [homepage](https://search.google.com/search-console/inspect?resource_id=https%3A%2F%2Fcpcpcp106-coder.github.io%2FPer-Me%2F&id=1lHQs2Ygjo8t7CvQl9HBFA) e della [guida caregiver](https://search.google.com/search-console/inspect?resource_id=https%3A%2F%2Fcpcpcp106-coder.github.io%2FPer-Me%2F&id=NxPS_y3LvwbVLwq0J_ZqQg), con ricevuta «URL aggiunto a coda di scansione prioritaria». Non significa indicizzazione completata. All'ispezione la homepage risulta già su Google; caregiver risulta sconosciuta a Google, ma il suo test live è positivo. Il rapporto Pagine aggregato consultato è aggiornato al 16 novembre (tre indicizzate, cinque scansionate ma non indicizzate): non descrive lo stato attuale di tutte le 159 pagine.

Riferimenti ufficiali: [gestione sitemap](https://support.google.com/webmasters/answer/7451001?hl=it) e [problemi di scansione](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors?hl=it). Non sono state ripetute richieste a raffica e non sono stati acquistati servizi.

### Limiti che restano dichiarati

Non è confermata l'indicizzazione delle 159 pagine, né è risolta la segnalazione di recupero della sitemap. La revisione AI delle fonti sensibili è documentale e campionaria: non equivale a revisione indipendente di un medico, professionista previdenziale o legale. Le prove mobili sono simulate; Samsung fisico, TalkBack e riscontri con lettori reali non sono stati collaudati in questa sessione. Nessuna certificazione o collaborazione attribuita senza prova.

Il controllo periodico «Stato del progetto Per Me» è risultato attivo: prossima esecuzione configurata venerdì 27 novembre 2026 alle 09:00, Europe/Rome. Non ne sono stati modificati frequenza o contenuto.

## Cronologia delle verifiche e delle correzioni

Le sezioni successive documentano gli stati intermedi. Le indicazioni di attesa qui sotto sono superate dagli esiti finali riportati sopra.

## Modifiche realizzate

| Problema osservato | Correzione | Verifica |
| --- | --- | --- |
| Ricerca «badante» vuota, «badanti» trova la guida | Normalizzazione condivisa di varianti frequenti, singolari e plurali. Conservato il sinonimo busta paga/cedolino e la priorità dei risultati. Stessa logica nell’app, anche offline. | Browser anteprima: «badante» trova la guida giusta. Aggiunte prove di regressione per quattro ricerche, ranking e assenza di risultati. |
| Rubriche dopo molte notizie e homepage lunga | Collegamenti immediati alle sezioni; rubriche prima delle notizie; una novità visibile e le sette precedenti nello stesso riepilogo apribile. | Stessa finestra desktop 1363×936: altezza 8182px contro 10719; inizio rubriche 2727 contro 6307. Misure della sessione, non prestazioni di caricamento. |
| Collegamento visita troppo generico | «Devo preparare un controllo per diabete o cuore», coerente con la destinazione. | Letto nel percorso pubblico di anteprima; aggiunta prova automatica. |
| Guide lunghe | Aperture operative brevi caregiver e menù, con collegamenti alle sezioni. Approfondimenti mantenuti. | Verificate ancore caregiver#da-dove/#casi e menù#settimana. Prove a 320/390 e 200% aggiunte al collaudo. |
| Riscontri poco uniformi | Facebook come primo canale nel metodo; GitHub alternativa. In Prova lettori ingresso diretto per un solo riscontro, prove facoltative. | Collegamenti e testo verificati, nessun messaggio inviato. |

Sitemap: aggiornate le date delle sette pagine HTML modificate. Il numero di URL resta 159. Cache dell’app aggiornata per distribuire la ricerca corretta. Nessun nuovo dato personale, nessun pagamento o attivazione di abbonamenti.

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

### Ingrandimento effettivo dei testi

Il controllo del widget ha mostrato che imposta la dimensione della radice: le dimensioni assolute del corpo nelle due guide non seguivano questa impostazione. Convertite in rem mantenendo le dimensioni di partenza: caregiver 22 px su radice 20 px; menù 21 px desktop e 20 px mobile su radice 17 px, metadati 19 px e tabella 18 px. Il test verifica ora che il testo del corpo raddoppi effettivamente, oltre all’assenza di scorrimento orizzontale. Nessuna riduzione della leggibilità iniziale.

## Ordine dei risultati dell’app

Sul candidato 3b61eb7 sono passati ricerca al singolare/plurale online e offline, effettivo raddoppio dei caratteri e reflow delle due guide a 320/390, home 200%, stampa e calcoli. Il collaudo si è poi fermato nella ricerca offline della frase «Ricette mediterranee semplici»: la ricerca per parole separata trovava più guide e non dava precedenza alla corrispondenza completa del titolo.

L’app ora ordina prima il titolo che contiene l’intera frase, poi la frase nel contenuto, quindi le parole separate, conservando l’ordine quando non si cerca nulla. Il requisito precedente sul paniere non è stato rimosso. Nuove versioni main.js/cache per distribuire la correzione. Il comportamento va confermato dal prossimo collaudo completo.
