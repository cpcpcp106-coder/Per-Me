# Per Me — Audit Google, AI e affidabilità editoriale
**19 ottobre 2026 — sito** https://cpcpcp106-coder.github.io/Per-Me/

## Obiettivo e valore probatorio
Individuare elementi verificabili che potrebbero ostacolare la visibilità di Per Me su Google, senza inventare una penalizzazione né attribuire automaticamente un problema all'intelligenza artificiale.

**Metodo:** consultazione fonti ufficiali Google, esame sorgenti e controlli automatici GitHub, lettura della pagina personale Search Console comunicata dall'autore con screenshot, lettura dati con il connettore Windsor.ai, ricerca notifiche Search Console in Gmail. Non eseguita una valutazione algoritmica interna a Google né una perizia medica/giuridica indipendente.

## Esito sintetico
1. **Home non indicizzata nel controllo URL condiviso il 19/10/2026.** Stato esatto «Pagina scansionata, ma attualmente non indicizzata». Ultima scansione: 18/10/2026, 11:21:04, Googlebot smartphone. Scansione consentita: sì. Recupero pagina: esito positivo. Indicizzazione consentita: sì. Canonical dichiarata: la home; selezione canonica Google nel pannello indicata come «URL controllato». Questo **non documenta** una penalizzazione né dimostra che il problema sia l'AI.
2. **Rapporto Indicizzazione delle pagine**: allo screenshot del 19/10 risultava «Elaborazione dei dati in corso. Ricontrolla tra un giorno o due». Mancano i conteggi autorevoli indicizzate/non indicizzate e i motivi dettagliati per l'insieme delle pagine. Indicizzazione reale di tutte le URL **non verificata**.
3. **Sitemap:** 82 URL nel file XML del repository, compresi rubrica diabete e 30 guide. Search Console, per la home, riporta alla voce «Sitemap» «Errore temporaneo di elaborazione». Il connettore Windsor non restituisce una riga di stato sitemap sufficientemente attendibile; il test GitHub sulla sitemap non prova che il file sia accettato dai sistemi Google.
4. **Ricerca Google / Windsor.ai:** 13 impressioni aggregate per il sito e 0 clic nel periodo 15–18 ottobre (18/10 dato preliminare); nei dettagli per pagina sono apparsi `/app/` e `/tutor-ai.html`. I conteggi per pagina non vanno sommati ai dati aggregati sul sito per inferire il totale. Impressioni non significano visite.
5. **Azioni manuali:** impossibile controllare il report privato con gli strumenti collegati in questa sessione. Il connettore GSC Wizard è bloccato da scadenza della prova; Windsor consente dati di rendimento ma **non** il report «Azioni manuali». Una ricerca nella posta collegata dal 12/10 non ha restituito notifiche di azione manuale: **assenza di notifiche nella ricerca ≠ assenza certificata di sanzioni**. Il controllo decisivo richiede la lettura dell'apposita pagina in Search Console autenticata.
6. **Fonte Google:** l'uso legittimo di AI non è proibito. È vietato l'abuso di contenuti generati su larga scala principalmente per manipolare il ranking, quando poveri di valore originale. Non si può inferire questo abuso dalla sola rapidità di pubblicazione o dall'uso di ChatGPT.

## Controlli tecnici svolti
- Pagina `index.html`: una H1, title e descrizione, meta robots `index,follow`, canonical `https://cpcpcp106-coder.github.io/Per-Me/`, collegamenti HTML alle otto rubriche. Nulla indica un blocco tecnico intenzionale per il robot.
- GitHub Pages: workflow recenti riusciti. Gli audit HTML, link interni, canonical, sitemap, struttura nazionale e editoriale nel repository risultano riusciti alla data di questo rapporto. Il successo GitHub è **diverso** dalla scansione/indexing Google.
- Il rapporto statico precedente quantificava 82 pagine editoriali pubbliche e nessun collegamento interno/ancora mancanti, con riserve su fotografie remote e contenuto delle fonti.
- Audit editoriale GitHub del 19/10: 81 HTML di root esaminati (escluse alcune pagine tecniche), zero errori bloccanti, ma 46 avvertenze non bloccanti nell'output prima della nuova revisione: 45 relative a fotografie remote e una a una rubrica ricette ancora in preparazione. La PWA è progettata per l'offline dei **testi**; non è corretto chiamare l'assenza offline delle foto un guasto della funzionalità richiesta.
- L'audit segnalava erroneamente che le Guide Diabete 01, 02 e 04 non contenessero fonti istituzionali perché riconosceva soltanto alcuni domini italiani: un'ispezione diretta ha trovato OMS, ISS, CDC, SID, banca CREA, ADA. Ampliato l'elenco dei domini riconosciuti nello script di collaudo; il test editoriale successivo è riuscito e quelle tre segnalazioni non si ripetono.
- **Limite:** le verifiche automatiche di presenza dei link e delle fonti non dimostrano né correttezza di ogni affermazione né originalità dei testi rispetto all'intero Web.

## Diagnosi editoriale AI: fattori da presidiare
**Rischi concreti, non sanzioni accertate:**
- Produzione accelerata di molte guide, 30 nella sola Rubrica Diabete, che può lasciare sovrapposizioni, frasi standardizzate e scarso valore originale rispetto alle fonti già esistenti.
- Ambito «Your Money or Your Life»: istruzioni su cardiopatia, ipoglicemia, terapie, pensioni e debiti richiedono precisione, limiti espliciti e verifiche aggiornate. Non è corretto presentare una bozza prodotta o rivista dall'AI come validata clinicamente/giuridicamente.
- Mancava una dichiarazione leggibile su *chi* cura la produzione, *come* intervengono gli strumenti di AI e *perché*. 
- Nella pagina Metodo era erroneamente dichiarata l'assenza di script esterni: il sistema di gradimento/contatori usa terzi, esponendo potenzialmente dati tecnici HTTP. Questo è anche un problema di fiducia, non solo di privacy.
- Il contenuto basato su esperienza personale concreta è un potenziale elemento distintivo, ma nuove storie, risultati o competenze **non vanno inventati** per migliorare segnali SEO.

**Elementi favorevoli:** scopo sociale riconoscibile e gratuito, autore riconoscibile nella home, informazioni pratiche nazionali, collegamenti alle fonti, avvertenze mediche, pagine distinte per argomento, navigazione per problemi reali e app testuale offline.

## Correzioni pubblicate nel repository il 19/10
1. `metodo.html`: spiegati curatore, impiego di ChatGPT/AI e limiti delle revisioni; rimosso l'assunto scorretto «nessuno script di terze parti»; dichiarata la possibile trasmissione di dati tecnici ai servizi esterni.
2. `chi-siamo.html`: introdotti curatore, ruolo dell'AI e riferimento esplicito al metodo.
3. `index.html`: nota breve e link trasparente a come nascono le guide AI-assisted.
4. `scripts/audit-editoriale-integrale.cjs`: riconoscimento fonti ISS/ISSalute, OMS, CDC, SID e CREA, evitando falsi negativi nel rapporto sul diabete.
**Non eseguiti:** eliminazione in massa di guide, noindex, reinvio della sitemap, falsificazione di esperienza, attestazioni di medici revisori inesistenti, creazione di traffico artificiale.

## Rischi che restano aperti e ordine operativo
**P0 — Dato Google mancante.** Quando disponibile, acquisire il report autenticato «Azioni manuali» (per escludere o confermare una penalizzazione manuale), il rapporto «Indicizzazione delle pagine» con motivi per URL, e il rapporto «Sitemap». Allo stato attuale l'accesso diretto a questi report non è disponibile con i connettori; non affermare il contrario.

**P1 — Validazione YMYL indipendente.** Scegliere un gruppo ristretto di guide sanitarie e amministrative ad alto impatto; verificare riga per riga requisiti, soglie, farmaci, fonti primarie e date. Segnalare in modo esplicito eventuali revisioni professionali indipendenti **soltanto se documentate**.

**P1 — Valore originale per i lettori.** Migliorare le guide già esistenti con percorsi decisionali, errori più frequenti, checklist documentali, differenze tra regole nazionali/locali, casi didattici chiaramente dichiarati e informazioni effettivamente verificabili. Non produrre nuove pagine soltanto per aumentare il numero di URL.

**P1 — Privacy.** Assumere i limiti tecnici dell'attuale votazione/contatore tramite fornitori esterni; verificare necessità di informativa specifica e soluzioni con dati minimi. Non promettere «nessun dato neppure tecnico» mentre esistono richieste di rete a terzi.

**P2 — Monitorare, non forzare.** Verificare lo stato di Google nei prossimi giorni con dati ufficiali prima di interventi globali su canonical, file sitemap e robots. Il messaggio «scansionata, ma attualmente non indicizzata» non impone reinvio dell'URL.

## Fonti primarie Google
- https://developers.google.com/search/blog/2023/02/google-search-and-ai-content?hl=it
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=it
- https://developers.google.com/search/docs/essentials/spam-policies
- https://support.google.com/webmasters/answer/7440203?hl=it
- https://support.google.com/webmasters/answer/9044175?hl=it
- https://support.google.com/webmasters/answer/9012289?hl=it

**Esito finale:** criticità editoriali reali affrontate senza scorciatoie SEO; causa esclusiva del mancato indexing della home non determinabile dai dati accessibili. Nessuna evidenza concreta documentata di una penalizzazione AI o di un'azione manuale; quest'ultima non è stata ispezionata direttamente nell'account.
