# PER ME — Piano di riorganizzazione strutturale
**Data:** 15 ottobre 2026  
**Stato:** PROPOSTA DI ARCHITETTURA, SOLO RAMO DI LAVORO — NON PUBBLICATA  
**Ambito:** esclusivamente il sito e la PWA `cpcpcp106-coder/Per-Me`.

## Decisione
Ristrutturare l'intero progetto **senza cancellare il repository, gli URL storici o i contenuti recuperabili**. Sospendere l'aggiunta di nuove rubriche/guide e gli interventi cosmetici isolati finché struttura e flusso editoriale non siano consolidati. Il sito pubblico sul ramo `main` rimane invariato durante questo lavoro.

## Riscontri effettivamente verificati
- Inventario Git `main` al 15/10: **173 elementi** nel tree (comprende file e directory); **37 file HTML** inclusa l'app, **12 workflow YAML** e numerosi rapporti/audit. I test già passati non certificano la correttezza giuridica, l'accessibilità WCAG completa o l'esperienza Android reale.
- La Home indica sei rubriche e mette in primo piano anche testimonianze e recapiti locali; la rubrica Agevolazioni propone guide 03 e 04 costruite sul Friuli Venezia Giulia. Questo è legittimo come caso territoriale, ma **non è la struttura nazionale richiesta per il progetto**.
- Le pagine HTML hanno molta struttura ripetuta per intestazioni, navigazione, footer e CSS locali. Questo aumenta il rischio di divergenza nelle correzioni.
- L'app in `app/main.js` legge le pagine HTML del sito e salva testi in `localStorage`. Esiste inoltre `app-content.json` con contenuti storici: il suo impiego attuale deve essere verificato prima di eliminarlo. **Non affermare che l'app usi questo file senza prova**.
- Il rapporto `verifiche/audit-master-per-me-2026-10-15.md` attribuisce **70/100 provvisorio** e riconosce controlli non esaustivi.
- L'ultima run Pages esaminata sul commit `c4433725bdaf413b7e9981ef1841517dd090e50a` è `success` (GitHub Actions #38741399102); ciò dimostra solo il successo del workflow, non una verifica completa sul telefono o sull'indice Google.
- Nessun intervento su `main` è autorizzato da questo documento in modo automatico.

## Principi editoriali non negoziabili
1. **Copertura nazionale:** le indicazioni valide in tutta Italia precedono sempre eventuali approfondimenti regionali/comunali. Le varianti locali devono avere una sezione o una scheda autonoma, con territorio, ente, data e fonte espliciti. Il FVG può essere un esempio **non predefinito per tutti**.
2. **Separazione dei ruoli:** una pagina “Chi sono / La mia esperienza” conserva l'origine personale del progetto; le guide operative non devono trattare l'esperienza o i recapiti di Tarcento come soluzione nazionale, né presentare il loro autore come destinatario delle guide. Un link a questa esperienza è possibile solo quando utile e ben identificato.
3. **Una sola fonte editoriale:** testo della guida, sommario, titolo, classificazione, fonti, ultima verifica, avvertenze, variante territoriale e stato sono definiti una sola volta. Sito e PWA sono due presentazioni generate dai medesimi dati.
4. **Le guide con effetti sui diritti:** termini, soglie, decorrenze, procedure e prestazioni richiedono verifica delle fonti ufficiali vigenti, incluso il campo di applicazione; non pubblicare affermazioni non verificate come istruzioni definitive.
5. **Destinatari 50–70 anni e accessibilità:** testi leggibili sul telefono, pulsanti grandi, contrasto, navigazione lineare, nessuna dipendenza da schermate minuscole; verifica automatizzata e manuale.
6. **Nessuna promessa inesatta:** offline solo dei testi realmente memorizzati, aggiornamento effettivo solo online; niente pretesa di conformità certificata o di indicizzazione Google senza riscontro.
7. **Rispetto dell'identità visiva approvata:** logo, icone, foto realistiche distinte, palette e leggibilità conformi alle regole già archiviate.

## Architettura informativa desiderata
- **Home nazionale:** quale problema risolvere, categorie comprensibili, ricerca/indice, accesso all'app e alla presentazione dell'autore. Non ripetere ovunque informazioni su un singolo Comune/CAF.
- **Rubriche:** 01 Soldi e lavoro; 02 Pensione e invalidità; 03 Debiti e cartelle; 04 Agevolazioni e diritti; 05 Salute e autonomia; 06 Tutor AI. In ciascuna: indice delle guide effettivamente pubblicate, stato aggiornamento, percorso per argomento.
- **Guide nazionali:** un formato stabile — sintesi; a chi si applica; azione iniziale; requisiti/documenti; passaggi; scadenze e rischi; differenze territoriali pertinenti; fonti primarie; data verifica e note sui limiti.
- **Schede territoriali:** per esempio trasporti FVG ed esenzioni ticket FVG come approfondimenti collegati alla guida nazionale corrispondente; non eliminate e non confinate arbitrariamente a un unico territorio. Le altre Regioni vengono aggiunte solo con fonti verificate.
- **Testimonianze e metodo:** sezione separata e dichiarata soggettiva, senza endorsement commerciale; contatti CAF/patronato di Tarcento come esperienza personale, non indicazione universale.
- **App:** archivio testuale delle stesse guide; ricerca, preferiti e aggiornamento; nessun contenuto editoriale indipendente dalla fonte unica.

## Architettura tecnica proposta
1. Conservare gli URL pubblicati con una tabella di migrazione `vecchio URL → nuova posizione/alias`, per evitare perdite di collegamenti e indicizzazione. GitHub Pages non offre redirect HTTP 301 nativi per i file statici: quando necessario usare compatibilità con pagine/URL esistenti e canonical corretti, senza promettere 301.
2. Isolare i contenuti in documenti strutturati (es. Markdown con metadati YAML/JSON), le parti comuni in **un solo layout**, e i dati di rubriche/schede in un indice centralizzato. Scegliere un generatore statico leggero compatibile con il sottopercorso `/Per-Me/`, evitando di complicare il progetto senza vantaggio provato.
3. Generare nello stesso processo HTML del sito, catalogo dei contenuti per la PWA, sitemap e metadati SEO. Non usare più un elenco guide annotato manualmente in più luoghi.
4. Per la PWA conservare lo stato offline e i preferiti durante la migrazione oppure documentare un percorso testato di conservazione/trasferimento: non cancellare arbitrariamente `localStorage`, service worker o icone già installate.
5. Consolidare i workflow: una pipeline chiara di validazione e una di pubblicazione, senza scritture concorrenti su `main`. Conservare i controlli specialistici necessari, ma non produrre ogni volta report ridondanti in pagine visibili ai lettori.
6. Definire componenti riutilizzabili per intestazione, navigazione, indice, articolo, box avvertenze, fonti, varianti territoriali, pulsanti e footer.
7. Pubblicare su `main` solo dopo collaudo e confronto con la versione corrente; ricostruzione sempre su ramo dedicato.

## Sequenza di lavoro e criteri di accettazione
**Fase A — Inventario e salvaguardia**: mappa URL/guide/immagini/fonti e distinzione tra contenuti nazionali, locali, incompleti, duplicati o obsoleti. Nessuna cancellazione prima dell'inventario.

**Fase B — Modello nazionale e prototipo**: tassonomia approvata di fatto dai requisiti, layout comune, Home prototipo e una rubrica pilota (Agevolazioni) con guida nazionale + scheda FVG. Nessun contenuto sensibile ai diritti cambia senza nuova verifica delle fonti.

**Fase C — Migrazione sistematica**: tutte le guide, provenienza fonti, fotografìe, strumenti di navigazione e URL. Verificare la coerenza tra indice, Home, guide, sitemap e app.

**Fase D — Collaudo**: link interni e esterni, contrasto, reflow 320/390, zoom 200%, interazioni tastiera, lettore schermo se disponibile, scansione SEO/noindex/canonical, prove PWA online-offline (incluse fonti esterne non disponibili offline), assenza di regressioni e verifica delle affermazioni normative prioritarie. Distinguere test automatici da prova su telefono reale e Search Console.

**Fase E — Rilascio controllato**: confronto finale del ramo con `main`, build Pages, lettura live della Home e delle guide chiave, verifica del catalogo PWA e conservazione URL. Solo dopo dichiarare pubblicato.

## Bloccanti per la pubblicazione
- Guide operative orientate impropriamente a un territorio o a un singolo autore come se fossero nazionali.
- Titoli/percorsi nel catalogo differenti dal sito, link rotti, contenuti incompleti dichiarati completi, perdite evitabili degli URL storici.
- Fonti e date non tracciabili per scadenze/diritti ad alto rischio.
- Regressioni di leggibilità o perdita delle guide offline e dei preferiti.
- Test di pubblicazione non riuscito.

**Misura della qualità:** niente voto 100/100 dichiarato senza prove riproducibili. Il 70/100 precedente non è automaticamente confrontabile con una nuova griglia. Valutare prima affidabilità delle guide, copertura nazionale, coerenza, navigazione accessibile, solidità della PWA e stato reale del deploy.
