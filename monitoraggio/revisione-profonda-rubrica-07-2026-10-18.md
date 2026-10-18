# Per Me — Revisione approfondita Rubrica 07 «Diabete tipo 2»

**Data:** 18 ottobre 2026 · **Ambito:** pagina `diabete-tipo-2.html`, Guide 01–30, classificazione, collegamenti, immagini, accessibilità, SEO, PWA e fonti sanitarie/normative. **Territorio:** tutta Italia.  
**Tipo di verifica:** analisi effettiva dei file nel repository GitHub e dei rapporti GitHub Actions; confronto puntuale con fonti istituzionali esterne. Questa relazione **non** è un referto clinico né una certificazione professionale di tutte le affermazioni scientifiche. Ogni sezione «da approfondire» indica esplicitamente un controllo non concluso.

## 1. Sintesi verificata

- **30 guide HTML presenti su 30**, tutte accessibili tramite un collegamento dalla pagina della rubrica.
- **30 guide su 30 nella sitemap XML** e **30 su 30 nel catalogo del voto a stelle**.
- Per le 30 guide: `robots=index,follow`, `canonical` coerente con il nome file, meta description presente, un unico `h1`; verifica di link locali, immagini referenziate, ID e ancore interne del medesimo file senza errori evidenziati.
- Rubrica nazionale: nessun riferimento personale a Tarcento, Udine, Attimis o a nominativi dell'autore rilevato nella scansione testuale delle 30 guide. La rubrica distingue giustamente patologie causalmente correlate, condizioni associate e rischi aumentati.
- GitHub Actions «Indicizzazione di tutte le pagine», «Collaudo struttura nazionale», «Audit statico integrale» e «Controllo diritti e immagini»: successi osservati nelle esecuzioni verificate. **Non dimostrano che Google abbia realmente indicizzato le pagine**.
- Il collaudo browser, precedentemente fallito per `scrollable-region-focusable` nella tabella della Guida 30, è poi risultato **success** sul commit `b4e9b51` (esecuzione https://github.com/cpcpcp106-coder/Per-Me/actions/runs/39151079016). Il rapporto registra 21 test PASS, comprendenti reflow mobile, verifiche axe automatizzate, PWA offline, registrazione del service worker e consultazione delle copie salvate. I test automatici non garantiscono usabilità con ogni lettore di schermo o telefono.

## 2. Azioni tecniche effettuate

| Intervento | File interessati | Risultato documentato |
|---|---|---|
| Registro licenze e provenienza immagini | `FONTI/registro-diritti-immagini.json` | Aggiunte dieci foto Pexels delle Guide 19–25 e 27–29, più sei SVG di riserva Guide 24–29; risolte 16 anomalie nell'audit immagini; esecuzione successiva PASS |
| Ripristino struttura del registro | `FONTI/registro-diritti-immagini.json` | Ripristinata la natura di array del campo `notes` e specificati percorsi completi delle guide |
| Accessibilità tabella mobile | Guida 30 | Tabella scorrevole ora focalizzabile, etichetta accessibile e bordo di evidenziazione; successivo collaudo browser PASS |
| Fonte AIFA | Guida 28 | Sostituito URL AIFA che restituiva 404 con la pagina ufficiale sulle segnalazioni di sospette reazioni avverse |
| Nuovo avviso semaglutide orale 2026 | Guida 03 | Avviso AIFA sulle confezioni Rybelsus da 1,5/4/9 mg in sostituzione di 3/7/14 mg e rischio di errori di somministrazione |
| Lettura più semplice della rubrica | `diabete-tipo-2.html` | Aggiunti cinque collegamenti tematici ad alta leggibilità e grandi almeno 56 px: Guide 01–04, 05–08, 09–18, 19–26, 27–30 |

**Immagini:** per le foto Pexels sono documentati autore, originale, licenza e utilizzo. Per i sei SVG di riserva sono archiviati SHA dei file e i commit in cui sono stati introdotti. La cronologia di un commit **non prova da sola tutti i diritti d'autore**; il registro lo dichiara esplicitamente.

## 3. Riesame delle 30 guide, classificate per criticità prioritaria

La colonna di verifica **non** è una certificazione scientifica; identifica il capitolo e l'area da sottoporre al controllo sanitario o normativo più rigoroso.

| Guide | Ambito | Nucleo di rischio che richiede sorveglianza editoriale |
|---|---|---|
| 01–02 | Diagnosi, glicemia, HbA1c, sensori, ipo | Soglie diagnostiche distinte da obiettivi terapeutici; glucometro e regola del 15; allarmi e sicurezza delle persone incapaci di deglutire |
| 03–04 | Farmaci, insulina e alimentazione | Controindicazioni e sicurezza dell'insulina; Nota 100; nutrizione individuale, ipo da pasti saltati, carboidrati di cereali/legumi |
| 05–08 | Coronarie, scompenso, ictus, vasculopatie | Emergenze 112, diagnosi differenziali, antitrombotici e protezione cardiovascolare senza «sospensioni fai da te» |
| 09–10 | Retina, macula, cataratta, glaucoma | Non confondere retinopatia diabetica con altre cause di perdita della vista; segni di allarme e accesso alle cure |
| 11–16 | Reni, neuropatie, gastroparesi, vescica, piedi | Funzione renale e dosaggi, esami UACR/eGFR, autonomia, urgenze per infezioni e ischemia |
| 17–18 | Bocca e cute | Distingure correlazione e causalità, farmaci e necessità di una valutazione clinica per lesioni sospette |
| 19–21 | Infezioni, vaccini, fegato, pancreas | Piani per malattia acuta, differenze tra MASLD e altre epatopatie, pancreatite e patologie del pancreas |
| 22–24 | Mani, ossa, sonno e udito | Diagnosi alternative, fratture e fragilità, limiti clinici e regolatori di CPAP/valutazione del sonno |
| 25–26 | Salute mentale e tumori | Evitare di attribuire tutte le condizioni al diabete, screening secondo età e categorie eleggibili, interventi non stigmatizzanti |
| 27–28 | Crisi metaboliche, effetti indesiderati | Ipo, DKA anche euglicemica, HHS, emergenze 112, segnalazione reazioni avverse e AIFA/EMA |
| 29–30 | Gravidanza; anziani e pensioni basse | Differenze diabete pregestazionale/GDM, farmaci da rivalutare, assistenza domiciliare, ticket, INPS e costi sostenibili |

**Stato della revisione clinica:** controllo trasversale delle priorità di sicurezza, apertura delle pagine e verifica puntuale delle fonti ad alto rischio (ADA 2026, SNLG SID–AMD, Nota AIFA 100, reazioni avverse, anziani). **Non è stata completata una validazione riga-per-riga da un team sanitario indipendente per tutte le 30 guide**: dichiararlo sarebbe improprio. Le guide non devono essere etichettate come «certificate», «validate» o «approvate dal SSN» senza una vera procedura esterna.

## 4. Fonti cliniche e aggiornamenti con riscontro

- ISS/SNLG — `https://www.iss.it/-/snlg-terapia-diabete-tipo2`, linea guida SID–AMD, aggiornamento registrato **27 ottobre 2025**, metodi GRADE e raccomandazioni su terapia farmacologica e non farmacologica.
- ADA — `https://diabetesjournals.org/care/article/49/Supplement_1/S277/163921/13-Older-Adults-Standards-of-Care-in-Diabetes-2026`, valutazione multidimensionale degli anziani, ipoglicemie, polifarmacia, fragilità e barriere economiche.
- AIFA — `https://www.aifa.gov.it/it/elenco-note-aifa`, **Nota 100 aggiornata 15 dicembre 2025** (verificare indicazioni, prescrivibilità e schede vigenti al momento dell'uso, non assumere rimborsabilità per tutti).
- AIFA — `https://www.aifa.gov.it/-/diabete-mellito-2-nuove-posologie-semaglutide`, comunicazione sulle nuove formulazioni orali di Rybelsus dal **1° gennaio 2026**.
- AIFA — `https://www.aifa.gov.it/content/segnalazioni%E2%80%93reazioni%E2%80%93avverse`, segnalazione di sospette reazioni avverse.
- Governo/ministeri, INPS e Sistema Tessera Sanitaria — per esenzioni, prestazioni economiche, cure domiciliari e variazioni annuali di soglie e importi controllare ogni requisito individuale nell'anno della domanda.

## 5. Accessibilità, navigazione e telefoni

**Accertato:** un `h1` per pagina; immagini in pagina con attributo `alt`; collegamenti delle 30 guide presenti; nessuna ancora locale inesistente nel controllo; con il collaudo successivo 21 test browser PASS. La pagina di rubrica ora offre navigazione per gruppi con tasti grandi e visibili. Nella Guida 30 il focus sulla tabella è stato corretto.

**Da non dichiarare verificato senza test dedicato:** ingrandimento fino al 200–400% con tutti i dispositivi reali, VoiceOver/TalkBack, navigazione per tutte le combinazioni di input, comprensibilità per lettori con bassa alfabetizzazione sanitaria, verifica visiva soggettiva di ogni fotografia, contrasto manuale nei diversi temi. Questi aspetti possono sfuggire all'automazione WCAG/axe.

## 6. App PWA e lettura offline

Il lettore in `app/main.js` recupera le pagine collegate dagli otto indici di rubrica e salva il testo depurato dai media in `localStorage`; il service worker mette in cache il guscio `app/`. Nei test GitHub risultano PASS la sincronizzazione e il ripristino offline, ma **non equivale a test su ogni Samsung/Android**.

Limiti residui: la prima sincronizzazione richiede Internet; immagini, foto e fonti esterne non sono disponibili offline; quando il browser limita lo spazio `localStorage` la PWA deve avvisare, non proclamare il salvataggio; i contenuti sanitari e i benefici economici devono mostrare una data di aggiornamento e invitare a verificarla online prima di agire.

## 7. Privacy, contatori e stelle: criticità non risolta

Il sistema gradimento usa richieste HTTP a `countapi.mileshilliard.com`; il contatore visitatori usa `counterapi.com` e `localStorage`/cookie di esclusione per il proprietario e un valore temporale per evitare duplicazioni. Il codice non richiede nome, email o profilo per esprimere un voto; conserva localmente preferenze operative per la PWA.

**Criticità:** ogni richiesta a un servizio esterno può necessariamente esporre dati tecnici della connessione (ad esempio indirizzo IP e intestazioni di rete), anche senza identificativi inseriti nel payload; non si può garantire «raccolta esclusivamente di numeri, neppure dati tecnici temporanei» con l'architettura attuale. Non alterare o disattivare senza decisione esplicita dell'autore l'attuale classifica: necessaria una scelta architetturale e una verifica privacy informata, distinguendo metriche aggregate e dati tecnici HTTP.

I risultati dei contatori non sono una misura certificata di persone uniche e non vanno confusi con clic e impression della Ricerca Google.

## 8. Google Search e indicizzazione: confine fra diagnosi tecnica e risultato reale

**Verificabile:** pagine pubbliche nel repository, tutti i 30 URL in sitemap, `canonical` corretti, `index,follow`, navigazione e audit indicizzazione GitHub PASS. L'assenza di `robots.txt` nel repository non implica automaticamente un blocco: occorre verificare la risposta pubblica effettiva, che per GitHub Pages può anche dipendere dal livello del dominio.

**Non verificato:** stato reale «Indicizzata/Non indicizzata» di ciascuna delle 30 URL, scansioni Googlebot, motivazioni dell'esclusione, URL selezionata da Google come canonical, efficacia della sitemap registrata in Search Console. Il connettore GSC Wizard al 18 ottobre rifiuta le richieste per fine prova e non va richiesto all'autore di pagare un servizio aggiuntivo per usare la Search Console gratuita. Lo strumento pubblico `site:` non costituisce un inventario esaustivo.

Fonti Google:
- `https://developers.google.com/search/docs/essentials/technical?hl=it` (criteri minimi; indicizzazione non garantita).
- `https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview?hl=it` (sitemap favorisce discovery ma non obbliga scansione e indicizzazione).
- `https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors` (non ripresentare senza motivo la stessa sitemap molte volte).

## 9. Link esterni e affidabilità delle fonti

Nel rapporto conservato il 18 ottobre per l'intero sito risultavano 677 URL esterni unici, di cui 556 raggiungibili, 112 con blocchi di accesso o riserva, 4 non verificati per trasporto e 5 con risposta classificata come errore HTTP. Questi numeri riguardano **tutto il sito**, non soltanto Rubrica 07. Una risposta 403 da editori o riviste non dimostra che la fonte sia falsa; un 307 redirect non è per forza un errore.

In Rubrica 07 il rapporto indicava un 404 AIFA in Guida 28 (corretto) e un 307 SID nella Guida 04. La pagina SID è stata consultata e si apre; il 307 non deve essere trattato come link rotto senza analizzare il redirect. La nuova URL AIFA è stata verificata su pagina ufficiale. Tutti i 677 URL non sono stati verificati manualmente uno per uno nell'ambito di questa revisione.

## 10. Priorità residue, in ordine di criticità

1. **Alta — Verifica medico-scientifica indipendente:** campionamento puntuale delle raccomandazioni ad alto rischio, poi validazione riga-per-riga delle 30 guide con fonti primarie e data; registrare per ciascuna affermazione provenienza, aggiornamento e grado di evidenza.
2. **Alta — Privacy delle votazioni e dei contatori:** riconciliare il vincolo «solo numero di clic e nessun dato tecnico temporaneo» con il funzionamento inevitabile delle richieste HTTP a servizi esterni. Valutare la sospensione del messaggio di garanzia assoluta prima di qualunque promessa di anonimato.
3. **Alta — Search Console autenticata:** raccogliere per ogni URL il motivo esatto di eventuale mancata indicizzazione usando il rapporto «Indicizzazione delle pagine» o API URL Inspection, senza dedurre l'esito dai test GitHub.
4. **Media — QA reale su Android:** TalkBack, zoom 200%, lettura in modalità offline dopo chiusura/riavvio e controllo di tutte le 30 guide salvate, testando quota locale piena e aggiornamento incompleto.
5. **Media — Revisione link e cambi normativi ricorrenti:** sorvegliare nuove versioni ADA, SNLG, AIFA, LEA e aggiornamenti INPS/ARERA; mantenere data e fonte vicino a importi e soglie.
6. **Media — Rendere più snella la rubrica:** verificare con lettori reali se i nuovi cinque salti tematici e il testo dei collegamenti riducono lo sforzo; non sostituire i titoli scientifici con formule pubblicitarie.
7. **Bassa — Prestazioni e Core Web Vitals:** misurare in ambiente reale LCP, CLS, INP, peso immagini e costo dati mobile; senza misure non è corretto assegnare un punteggio Lighthouse inventato.

## 11. Giudizio finale documentato

**Completezza editoriale: 30/30 guide presenti.** **Struttura HTML, riferimenti locali, SEO tecnico di base: controlli favorevoli.** **Licenze immagini: inventario tecnico corretto e test superato.** **Accessibilità automatizzata: superata dopo correzione Guida 30.** **PWA: test browser automatici superati.** **Indicizzazione reale Google: non accertata.** **Rigorosa validazione scientifica e legale di tutte le singole frasi: ancora da completare.** **Garanzia privacy assoluta dei contatori: non sostenibile con l'attuale sistema esterno.**

Non esiste quindi una base per dichiarare «rubrica perfetta» o attribuire 100/100; esistono invece miglioramenti dimostrabili e una lista circoscritta di verifiche da chiudere.
