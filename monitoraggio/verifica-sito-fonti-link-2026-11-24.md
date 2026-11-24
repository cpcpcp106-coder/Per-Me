# Per Me — Esame del sito, fonti e collegamenti

Data: **24 novembre 2026**, ora italiana. Sito: https://cpcpcp106-coder.github.io/Per-Me/ . Base iniziale: commit `77beb6b0c12b45defbfbccc6e12cc70271b3ff30`. Verifica svolta con un agente dedicato ai contenuti e una revisione dell’integrazione e dei controlli tecnici.

## Perimetro verificato

Il controllo strutturale comprende **154 file HTML: 150 pagine pubbliche e quattro pagine tecniche**. Tutte le 150 pagine pubbliche sono raggiungibili dalla homepage attraverso link HTML e presenti nella sitemap. Non risultano file locali o ancore mancanti, canonical incoerenti o direttive che impediscono la scansione delle pagine pubbliche.

La [verifica online iniziale](verifica-live-iniziale-2026-11-24.json) confronta il sito con i sorgenti di partenza: **157 URL**, comprendendo i tre indirizzi alternativi index.html, tutti con HTTP 200, contenuto corrispondente e nessuna anomalia rilevata. Il robots.txt dell’origine risponde 404: in questo caso non introduce divieti di scansione. Questi risultati dimostrano accessibilità tecnica, non indicizzazione su Google.

La [verifica mirata delle fonti](audit-fonti-guide-2026-11-24.md) e la [sua appendice](audit-fonti-guide-appendice-2026-11-24.md) coprono **21 guide** ed elencano per ogni guida i fatti confrontati, le fonti primarie consultate e i limiti. Non costituisce una revisione clinica o giuridica indipendente di ogni affermazione del sito.

## Errori corretti

| Area | Problema riscontrato | Correzione |
|---|---|---|
| Rottamazione | Date di verifica contraddittorie e un riferimento futuro a un servizio già annunciato disponibile. | Date e formulazioni allineate alle fonti AdeR consultate il 24 novembre; conservata la distinzione fra misura territoriale e nazionale. |
| Bonus nido | L’indicatore ISEE 2026 era spiegato nella premessa ma richiamato in modo generico nel paragrafo operativo. | Precisato l’ISEE per specifiche prestazioni familiari e per l’inclusione, riferito al minore. |
| Glicemia e sensori | Due duplicazioni nella spiegazione di CGM e TIR. | Eliminate le ripetizioni senza cambiare soglie o indicazioni terapeutiche. |
| Ricorsi INPS | Il termine generale era descritto dalla comunicazione dell’atto; il richiamo alla sperimentazione privilegiava Udine. | Precisata la notifica del provvedimento e indicato il criterio nazionale con l’elenco INPS delle ulteriori 40 province. |
| Locazioni | Il collegamento al PDF della Cassazione era etichettato come ordinanza integrale. | Precisato che si tratta di una massima nella rassegna ufficiale; aggiunto il salto alla pagina 104. |
| Date delle guide Debiti 01, 02 e 04 | Il testo mostrava 15 ottobre ma l’attributo leggibile dai programmi indicava il 14 ottobre. | Attributi allineati alla data visibile; nuovo controllo automatico della concordanza delle date. |
| Rubrica Salute | Indicava ancora sette ricette. | Reso coerente il testo con le 28 ricette presenti nell’archivio, specificando che i valori nutrizionali sono stimati. |
| Pagina Controllo delle fonti | Il riepilogo principale era fermo a 82 pagine e alla verifica del 22 ottobre. | Mostrato il controllo strutturale attuale di 150 pagine pubbliche, con rinvio alle evidenze e mantenimento dei rapporti storici datati. |
| Verificatore dei link esterni | Esaminava soltanto la radice e app/, omettendo strumenti e altre sottocartelle. | Raccolta ricorsiva di tutti gli HTML del sito; esclusione delle dipendenze e delle directory di build. Ampliati anche gli eventi del workflow interessato. |
| Controllo automatico Debiti | Imponeva la stringa fissa «15 ottobre 2026», rifiutando una data di revisione successiva. | Verificata una data valida non anteriore alla revisione storica; il controllo editoriale verifica anche la concordanza fra attributo e testo. |

Sitemap aggiornata soltanto per le pagine modificate. Nessuna nuova fotografia o nuovo dato personale pubblicato.

## Prove eseguite

- Controllo statico globale, struttura condivisa, sitemap, raggiungibilità dalla homepage e componente Facebook delle guide.
- Controllo editoriale automatico e perimetro nazionale: nessun errore nei controlli eseguiti; il controllo editoriale di radice copre 144 pagine e non certifica i fatti.
- [Controllo online di tutte le 96 immagini locali](verifica-immagini-pubbliche-2026-11-24.json): HTTP 200, tipo immagine e primi 64 byte corrispondenti ai sorgenti, nessuna anomalia. Non è una verifica visiva di ogni foto.
- Registro delle immagini: integrità, presenza e collegamento dei file; non attestazione individuale nuova dei diritti delle immagini storiche.
- Verificato che il controllo editoriale rifiuti una data incoerente e accetti la versione corretta.
- Suite applicazione: **19 test superati**, compresi conservazione delle guide, sincronizzazione, gestione degli errori e percorso offline simulato.
- Nel browser pubblico: ricerca “SEND”, apertura del risultato corretto, presenza della foto e dei collegamenti alla Pagina Facebook. Nessun voto o messaggio inviato.

## Collegamenti esterni e pubblicazione

Il [controllo HTTP iniziale](verifica-url-esterni-iniziale-2026-11-24.json) ha esaminato 1.005 indirizzi distinti della radice e dell’app: 848 raggiungibili, 135 bloccati o riservati, 15 risposte HTTP 503 e sette errori di trasporto. Il controllo integrativo delle sei destinazioni individuate nelle ulteriori sottocartelle ha ottenuto cinque risposte 200 e una 202. La raccolta ora comprende ricorsivamente tutti i 154 HTML. Il [rapporto ricorsivo finale](verifica-url-esterni-finale-2026-11-24.json) comprende **1.012 indirizzi distinti su 154 HTML** (2.776 occorrenze): **855 risposte positive**, 135 accessi bloccati/riservati, 15 risposte HTTP 503 e sette errori di trasporto. Non resta alcun URL omesso dalla raccolta HTML del sito; i limiti delle risposte remote rimangono espliciti. Un HTTP 200 da solo non dimostra che una fonte sostenga una frase; una risposta 403, 429 o un problema di trasporto non dimostra che l’URL sia sbagliato.


Il riesame tramite fonti ufficiali ha recuperato le pagine AIFA che erano terminate in timeout (Nota 100, Nota 98, elenco Note, nuove formulazioni di semaglutide, aggiornamento anti-VEGF e restrizioni della metoclopramide) e la pagina UNESCO. I contenuti delle due guide aggiuntive su retinopatia e gastroparesi risultano coerenti con i punti AIFA confrontati, senza nuova revisione integrale. NICE e la pagina MIT sulla morosità sono presenti nella ricerca ufficiale, ma non completamente accessibili in apertura diretta. Restano non risolti in questo canale gli accessi a nove URL DEF, due ISSalute, tre MIT e al capitolo NICE. Non risultano 404 o 410 nel controllo esteso. Nessun URL è stato eliminato sulla base di un 503.

La nuova scansione ha invece ottenuto una risposta positiva da CNAS: la segnalazione 503 descritta nei rapporti precedenti non si è riprodotta. Per AIFA e UNESCO il riscontro documentale attraverso ricerca/apertura è distinto dall’esito del verificatore HTTP, che resta conservato senza trasformarlo in un successo fittizio.

CNAS, AIFA e alcune pagine AdeR sono state controllate anche attraverso il canale di ricerca: i risultati e i limiti sono documentati nel rapporto delle fonti. Nessun collegamento è stato sostituito soltanto per un blocco del controllo automatico.

## Pubblicazione e verifica conclusiva

La [PR 34](https://github.com/cpcpcp106-coder/Per-Me/pull/34) è stata integrata in `main` al commit `8296b4c57c7be48d43a5192edd9ae8131e152a86`, dopo **20 controlli GitHub superati sul commit funzionale `d4233e7152f0854f222f134a553bbbf61aa829df`**. Le [evidenze dei controlli](controlli-pr34-2026-11-24.json) riportano i collegamenti a ciascun job. Il [deployment Pages 45385304264](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45385304264), sul successivo aggiornamento automatico dello snapshot `9452736`, è terminato con successo.

La [verifica online conclusiva](verifica-live-finale-2026-11-24.json) ha ricontrollato **157 URL**, dopo la pubblicazione: tutte le pagine rispondono HTTP 200 e coincidono con i sorgenti modificati; nessuna anomalia su canonical, sitemap, intestazioni o scansione. Il confronto comprende i 154 HTML e i tre alias espliciti index.html. Nessun errore locale o di ancoraggio nell’audit statico conclusivo.

Nel browser pubblico sono state aperte tutte le **dieci pagine HTML modificate**: le nove guide/indici mostrano la fotografia e il collegamento Facebook nel contenuto; le tre date Debiti corrette mostrano 15 ottobre anche nell’attributo datetime. La pagina Controllo delle fonti mostra il riepilogo aggiornato a 150 pagine pubbliche. È stata inoltre provata la ricerca SEND e l’apertura del risultato corretto. Nessuna nuova prova di installazione su smartphone fisico.

Gli interventi successivi a questo rilascio aggiornano i registri, le evidenze e la gestione delle interruzioni di connessione nel monitoraggio settimanale; non modificano le pagine appena collaudate. Il controllo automatico delle destinazioni esterne avviato anche dal workflow di `main` può pubblicare un rapporto più recente: i risultati HTTP cambiano nel tempo e vanno letti insieme alla loro data.

## Riparazione del controllo settimanale

Il [controllo pianificato del 23 novembre](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45246725730/job/137945313023) si era interrotto per `http.client.RemoteDisconnected`: una fonte remota aveva chiuso la connessione senza risposta, impedendo di salvare tutto il rapporto. Il vecchio report visibile nella sezione automatica era quindi rimasto al 16 novembre.

Il verificatore `monitoraggio/controlla.py` ora intercetta gli errori di connessione del sistema e le risposte HTTP incomplete sia nelle fonti monitorate sia nei link esterni: registra l’indirizzo da verificare e continua. Due prove con errori indotti (`RemoteDisconnected` e `IncompleteRead`) hanno verificato che il rapporto venga comunque salvato, con gli errori espliciti e senza esiti positivi fittizi. Il riesame del controllo pubblicato verrà registrato al suo completamento.

## Limiti

Nessuna nuova verifica autenticata in Search Console: non si dichiara risolto il problema storico di elaborazione della sitemap né una nuova indicizzazione. Nessuna prova su telefono Samsung fisico o con TalkBack. Nessuna revisione professionale indipendente, nessuna attivazione dei pagamenti, nessun invio social o email in questo incarico. La bozza privata «Offrimi un caffè» resta esclusa dalle modifiche.
