# Per Me — Punto 8: Tutor AI, collaudo del percorso base e programma di approfondimenti

**Data:** 23 ottobre 2026  
**Ambito:** rubrica 06 «Tutor AI essenziale», pubblico principale 50–70 anni e familiari che aiutano, in tutta Italia.  
**Stato complessivo (aggiornato al 23 ottobre):** percorso base pubblicato e sei approfondimenti realizzati e collegati (Android più cinque lezioni); verifiche automatiche in corso dopo l'ampliamento; collaudi con lettori reali 50–70 anni e su dispositivi Android fisici non eseguiti.

## 1. Stato verificato: distinguere quanto esiste da quanto resta da fare

La homepage `index.html` collega la rubrica 06 alla pagina `tutor-ai.html`. La pagina pubblicata nel repository include:
- sei prompt distinti (avviso, messaggio, lista, domande per un ufficio, verifica di una fonte, riscrittura semplice), con sei pulsanti `data-copy` corrispondenti agli identificativi dei riquadri;
- esempi inventati, indicazioni sulla privacy, esercizio sugli errori e quattro domande di autoverifica con soluzioni;
- metodo in cinque elementi: **compito, testo, forma, limiti, controllo**;
- avvertenza che Per Me non ospita una chat AI e che le risposte esterne vanno verificate.

Il codice della PWA in `app/main.js` include la rubrica tra le sezioni da sincronizzare, estrae i testi per la lettura offline e prevede di ricreare i comandi per copiare i prompt. Il service worker in `app/sw.js` conserva la struttura di lettura dell'app. La revisione pregressa è documentata in `FONTI/REVISIONE-DIDATTICA-TUTOR-AI-2026-10-15.md`.

**Limiti della verifica del 23 ottobre:** lettura del codice e confronto statico dei sei riquadri con i sei pulsanti; **non** sono stati eseguiti in questa verifica clic su un dispositivo Android reale, installazioni o sessioni offline reali, né interviste o osservazioni di lettori. La disponibilità del codice non dimostra da sola l'esperienza reale su Android. Non dichiarare quindi «collaudato su Android», «validato dagli utenti» o «rubrica completa».

## 2. Collaudo Android da eseguire

Usare almeno un telefono Android reale, con Chrome aggiornato, tastiera e impostazioni comuni; registrare modello/versione solo come dato tecnico del test, non del lettore. Una seconda dimensione di schermo o un altro browser è auspicabile.

**A. Nel sito mobile, con Internet**
1. Aprire la homepage, raggiungere «Tutor AI essenziale» senza ricorrere alla ricerca e individuare l'inizio del percorso.
2. Provare il pulsante «Copia» di ciascuno dei sei prompt; verificare che il testo copiato sia completo e senza aggiunte.
3. Incollare almeno il primo prompt in un campo di testo vuoto; non inviare dati personali e non richiedere la creazione di un account.
4. Aprire una soluzione di autoverifica con un tocco e richiuderla; verificare pulsanti, contrasto, zoom del testo, scorrimento e assenza di tagli orizzontali.

**B. Nella PWA, dopo sincronizzazione online**
1. Aprire `app/`, aggiornare le guide e accertare che «Tutor AI essenziale» compaia nel catalogo.
2. Aprire il testo salvato e verificarne intestazioni, esercizi e sei comandi di copia.
3. Disattivare la connessione **solo dopo** la sincronizzazione, riaprire la PWA e verificare lettura e copia del testo offline.
4. Confermare che viene spiegato chiaramente che le risposte del servizio AI esterno richiedono normalmente Internet.

Per ogni prova annotare **riuscita / non riuscita / non verificata**, versione e problema riproducibile. In caso di errore correggere il codice e ripetere la prova. I risultati non sono ancora disponibili.

## 3. Prova di comprensione con lettori reali

Reclutare, **solo dopo consenso e senza inviare inviti a nome del progetto in assenza di autorizzazione**, un piccolo gruppo esplorativo di circa cinque volontari fra 50 e 70 anni oppure familiari facilitatori. Non attribuire al campione valore statistico. Osservare senza suggerire cosa premere, poi chiedere una valutazione facoltativa.

Compiti osservabili:
1. Trovare Tutor AI dalla homepage e capire che Per Me fornisce istruzioni ma non risponde come una chat.
2. Copiare il prompt dell'avviso e spiegare come usarlo senza inserire dati personali.
3. Identificare **due errori** nell'esempio dell'avviso: giorno sbagliato e documento inventato.
4. Spiegare se una legge citata da una chat è attendibile quando la fonte non si trova; identificare il passo successivo corretto.

Scheda anonima per ogni partecipante: compito riuscito senza aiuto (sì/no), motivo dell'eventuale blocco, parola o pulsante poco chiari, difficoltà di lettura e miglioramento proposto. Non raccogliere nomi, recapiti, età esatta, dati sanitari, credenziali, screenshot di conversazioni personali né informazioni riservate. In presenza di un blocco sulla privacy o sulla verifica delle fonti, correggere la guida prima di divulgarla come percorso testato.

## 4. Programma editoriale per proseguire Tutor AI

Il **primo approfondimento** è stato creato nel file [tutor-ai-android-primi-passi.html](../tutor-ai-android-primi-passi.html), collegato dalla rubrica, e inserito nella sitemap. È una guida su un servizio AI esterno, con tre passaggi, esercizio copiabile, controllo degli errori, privacy, accessibilità e fonti ufficiali. Gli altri cinque approfondimenti restano in programma. Pubblicare **una guida alla volta**, dopo controllo editoriale e verifica delle affermazioni sensibili. I titoli sono di lavoro e possono essere modificati in base agli ostacoli emersi dai test.

| Priorità | Approfondimento | Risultato concreto per il lettore | Come si distingue dal percorso base |
| --- | --- | --- | --- |
| 1 | **Usare una chat AI su Android, passo dopo passo — GUIDA CREATA** | Aprire il servizio scelto, distinguere sito/app, copiare e incollare, controllare le impostazioni privacy | Istruzioni operative e un esercizio originale; non è ancora una prova su un telefono reale |
| 2 | **Fare domande successive e correggere una risposta** | Modificare una richiesta dopo una risposta incompleta, confrontare versione originale e corretta | Laboratorio in più turni con errori deliberati |
| 3 | **Verificare informazioni, date e fonti ufficiali** | Trovare un documento pubblico, leggere l'ente e la data, distinguere fatto, ipotesi e dato mancante | Esercitazione completa di verifica senza fidarsi delle citazioni prodotte dall'AI |
| 4 | **Riassumere e confrontare testi pubblici** | Costruire una tabella di differenze senza inventare fatti e citando i brani utilizzati | Compito su due brevi testi inventati o pubblici, non su documenti personali |
| 5 | **Privacy, truffe digitali e contenuti ingannevoli** | Riconoscere richieste anomale, immagini o testi sospetti e decidere quando non condividere dati | Casi guidati di prevenzione delle frodi senza promesse di rilevamento infallibile |
| 6 | **Quando serve una persona: salute, denaro, diritti e scadenze** | Preparare domande da porre a enti e professionisti, senza delegare decisioni alla chat | Casi simulati con punti di arresto e controlli esterni |

Per ogni futura guida: una situazione reale e comune; risultato di apprendimento osservabile; tre passaggi sul telefono; esercizio con testo inventato; soluzione verificabile; controllo errori e privacy; fonti primarie quando sono necessarie; rinvio al percorso base e alla rubrica. Nessuna guida deve richiedere l'acquisto di servizi, presentare prodotti come obbligatori o dichiarare certificazioni non ottenute.

## 5. Sequenza e criteri di avanzamento

1. **Adesso:** percorso base presente nel sito e collegato dalla homepage; piano formalizzato. Il completamento editoriale della pagina non vale come conferma del suo uso reale.
2. **Prima espansione:** svolgere il collaudo Android e la prova esplorativa con lettori; registrare gli ostacoli concreti.
3. **Correzioni:** risolvere gli ostacoli riscontrati e ripetere le prove non riuscite.
4. **Pubblicazione progressiva:** iniziare dall'approfondimento più necessario in base alle prove; rivalutare l'ordine prima degli altri.
5. **Chiusura della rubrica:** possibile solo quando sono definiti il perimetro editoriale e gli esiti di controllo di tutti gli approfondimenti che si decide effettivamente di pubblicare.

**Misure da riportare, senza dati inventati:** numero di persone che hanno effettivamente partecipato; compiti riusciti senza aiuto; problemi di lettura/navigazione/copia; correzioni applicate; guide aggiuntive realmente pubblicate. Non confondere queste misure con impressioni, clic o visite del sito.

**Decisione sul punto 8:** percorso introduttivo verificato documentalmente e incluso; ampliamento pianificato ma **aperto**; collaudo Android e comprensione sul campo **da eseguire**.


## 6. Aggiornamento del 23 ottobre 2026 — collaudo automatico realmente eseguito

È stato creato il test eseguibile `monitoraggio/collaudo_tutor_mobile.cjs` e il relativo workflow `.github/workflows/collaudo-tutor-mobile.yml`, con esecuzione GitHub Actions [#39971129027](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/39971129027), conclusa con **successo**. Il rapporto JSON è conservato come artifact nel workflow.

**Risultato: 14 controlli superati su 14, nessun errore JavaScript segnalato dal test.** Controlli: percorso homepage → Tutor AI; corrispondenza sei riquadri/sei pulsanti; copia effettiva e lettura dalla clipboard di ciascuno dei sei prompt; apertura/chiusura di soluzioni; assenza di scorrimento orizzontale a 390 e 320 px e dimensioni del pulsante; sincronizzazione e presenza della pagina nella PWA; creazione dei sei pulsanti nell'app; riapertura, lettura e copia di prompt in modalità offline.

**Condizioni e limiti:** è stato utilizzato **Playwright Chromium su Linux con emulazione mobile e touch**, servendo il codice del repository con HTTP locale. È quindi una prova funzionale riproducibile del browser mobile simulato, **non** una verifica su un dispositivo Samsung/Android fisico, né una misura di accessibilità assistiva o un test di comprensione con lettori 50–70 anni. L'esito dell'azione GitHub Pages di pubblicazione precedente è stato confermato separatamente; il test mobile qui descritto esegue i file del repository in locale.

**Stato aggiornato del punto 8:** percorso base disponibile; **collaudo browser mobile emulato superato**; prova su Android fisico e comprensione con persone reali ancora aperte; ampliamento della rubrica pianificato ma non ancora pubblicato. Non dichiarare la rubrica interamente conclusa.


## 7. Avanzamento editoriale e tecnico del 23 ottobre 2026

- Creata la guida nazionale `tutor-ai-android-primi-passi.html` con canonical, `index,follow`, fonti primarie, esercizio inventato e pulsante copia.
- Aggiornata la rubrica `tutor-ai.html` con collegamento interno e descrizione dello stato reale.
- Aggiornata `sitemap.xml` per segnalare la nuova URL e la revisione della rubrica.
- Estesa la PWA `app/main.js` per offrire il pulsante di copia del prompt della guida Android nel lettore, anche offline; aggiornate versione di `app/index.html` e cache di `app/sw.js`.
- Ampliato il test `monitoraggio/collaudo_tutor_mobile.cjs` con navigazione, copia del prompt, tocchi, dimensioni mobile e lettura/copia della nuova guida nella PWA online/offline.
- La prova qualitativa con lettori 50–70 anni e un collaudo su Android fisico restano **non eseguiti**. Nessun risultato di tali prove va dichiarato per implicazione.

**Nota metodologica:** la pubblicazione della prima guida non dimostra che il programma delle sei lezioni sia terminato.


## 8. Esito automatico del primo approfondimento Android

Il workflow [«Tutor AI collaudo smartphone emulato» — esecuzione #39972463061](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/39972463061) è terminato con **successo**, con **19 verifiche PASS su 19** e **nessun errore** riportato dallo script.

Oltre ai 14 controlli della guida base sono stati verificati:
- navigazione dalla pagina Tutor AI al primo approfondimento Android;
- copia effettiva del nuovo esercizio, con confronto del contenuto della clipboard;
- apertura delle soluzioni e nessuno scorrimento orizzontale alle larghezze 390/320 pixel;
- copia del nuovo esercizio nel lettore PWA online;
- lettura e copia dello stesso esercizio nella PWA offline.

La simulazione usa Chromium/Playwright su Linux. Questo esito **non sostituisce** una prova su Samsung Android fisico, con eventuali strumenti di accessibilità, o una prova di comprensione con persone reali. Non sono disponibili tali dati. Restano aperti cinque approfondimenti editoriali successivi.

## 9. Immagini editoriali originali — richiesta del 23 ottobre 2026

Sono state generate due fotografie illustrative iperrealistiche originali e pubblicate in formato WebP ottimizzato, senza dipendenze da immagini esterne:
- `assets/tutor-ai-base-foto-originale.webp`: immagine del percorso introduttivo, presente anche nella scheda della rubrica in homepage;
- `assets/tutor-ai-android-originale.webp`: immagine dell'approfondimento Android, usata anche come anteprima sociale della guida.

**Criterio editoriale per le prossime lezioni Tutor AI:** immagini originali create per la specifica guida, rappresentazione fotografica naturale e credibile di attività quotidiane per adulti 50–70 anni; non riutilizzare sempre la stessa scena. Non raffigurare interfacce fittizie come se fossero schermate ufficiali, né persone generate come testimonianze reali. Inserire un testo alternativo pertinente e una didascalia che dichiari esplicitamente la generazione AI. Preferire WebP leggeri, dimensioni responsive e lettura dei soli testi nell'app offline.


## 9. Completamento degli approfondimenti 2–6 (23 ottobre 2026)

Le cinque guide seguenti sono state create, collegate al percorso introduttivo e aggiunte alla sitemap. **Sono pagine editoriali pubblicabili, non un corso empiricamente validato:**

| Approfondimento | File | Esercizio centrale |
| --- | --- | --- |
| 2. Conversazione e correzione | [tutor-ai-conversazione-correzioni.html](../tutor-ai-conversazione-correzioni.html) | Due messaggi in sequenza, controllo delle aggiunte |
| 3. Fonti e date | [tutor-ai-verifica-fonti-date.html](../tutor-ai-verifica-fonti-date.html) | Separare confermato, smentito e non indicato |
| 4. Riassunti e confronti | [tutor-ai-riassumere-confrontare.html](../tutor-ai-riassumere-confrontare.html) | Confronto fedele di due avvisi inventati |
| 5. Privacy e truffe | [tutor-ai-privacy-truffe.html](../tutor-ai-privacy-truffe.html) | Segnali di rischio senza condividere codici |
| 6. Quando chiedere aiuto | [tutor-ai-quando-chiedere-aiuto.html](../tutor-ai-quando-chiedere-aiuto.html) | Domande da preparare per enti e professionisti |

**Fotografie:** cinque scene originali generate con AI, tagliate da una composizione creata appositamente per Per Me, archiviate come `assets/tutor-ai-{dialogo,fonti,confronto,sicurezza,professionisti}-originale.webp`. Le immagini sono illustrative e nessun soggetto è una persona reale. Ogni guida indica esplicitamente l'origine sintetica.

**Accessibilità e PWA:** testi leggibili anche con immagine non caricata, pulsanti grandi, due prompt copiabili in ogni approfondimento e soluzioni espandibili. I testi possono essere letti e copiati offline dopo una sincronizzazione online. Le immagini non sono incluse nel lettore offline di solo testo, coerentemente con l'impostazione PWA del progetto. Sono stati aggiornati `tutor-ai.html`, `app/main.js`, `app/index.html`, `app/sw.js`, `sitemap.xml` e il collaudo `monitoraggio/collaudo_tutor_mobile.cjs`.

**Prove ancora necessarie:** effettiva facilità di lettura, comprensione e capacità di svolgere gli esercizi da parte di volontari 50–70 anni; eventuali impedimenti su un Android fisico; aggiornamento futuro dei riferimenti alle piattaforme. Non dichiarare risultati non osservati.
