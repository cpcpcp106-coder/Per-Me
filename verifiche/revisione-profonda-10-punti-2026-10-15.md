# PER ME — Revisione critica approfondita dei 10 punti

**Data:** 15 ottobre 2026. **Perimetro:** esclusivamente sito https://cpcpcp106-coder.github.io/Per-Me/, applicazione PWA e repository pubblico `cpcpcp106-coder/Per-Me`.

**Qualità documentata:** precedente voto 70/100 provvisorio, **non automaticamente aumentato** in questo ciclo. La revisione ha scoperto problemi assenti dal rapporto precedente. Il controllo non costituisce certificazione di conformità WCAG 2.2 AA, parere legale, referto clinico o verifica amministrativa di Google Search Console.

## Legenda

- **CONFERMATO:** supportato da sorgente del repository, risultato dei test o fonte istituzionale.
- **CORRETTO NEL CODICE:** modifica committata su `main`; il collaudo e il deployment sono verifiche distinte.
- **PARZIALE:** copertura campionaria, non esaustiva.
- **NON VERIFICATO:** mancano dati, autorizzazione tecnica o controllo fisico. Non equivale a errore confermato.

## 1. Ricorsi INPS, termini e decadenze — PRIORITÀ MASSIMA

**Controlli di merito:** `riesame-ricorso-inps-termini.html` distingue chiarimento, autotutela, ricorso amministrativo e giudiziario. Confrontate le prescrizioni su termini ordinari di **90 giorni**, eccezioni di **30 giorni** (alcuni comitati, gestione pubblica, fondi specifici), mancanza di sospensione automatica del riesame e ricorsi sanitari nei termini previsti. Fonti ufficiali: [INPS Ricorsi amministrativi](https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.ricorsi-amministrativi.html), [INPS Ricorso amministrativo pensionistico](https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.ricorso-amministrativo-pensionistico-51189.ricorso-amministrativo-pensionistico.html), [INPS Ricorso giurisdizionale invalidità civile](https://www.inps.it/it/it/dettaglio-approfondimento.schede-informative.51293.ricorso-giurisdizionale.html), [Circolare 42/2025](https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.2025.02.circolare-numero-42-del-17-02-2025_14832.html).

**Rischio:** la scheda INPS sui sei mesi parla di «emissione», mentre la circolare richiama notifica in fattispecie indicate; la guida presenta la divergenza come motivo di verifica immediata da parte di un legale, senza promettere una decorrenza generale. La riforma disabilità nella provincia di Udine dal **1 marzo 2026** trova conferma nella [comunicazione INPS](https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.03.avviata-la-terza-fase-sperimentale-della-riforma-della-disabilit.html).

**Esito:** principali avvisi e distinzioni **confermati**. Non è stato certificato articolo per articolo l'intero contenzioso, né effettuata una peer review da legale abilitato; i termini della singola pratica NON sono calcolabili dal sito. **Azione aperta P1:** completare campionamento atomico e confronto con legislazione vigente per tutte le eccezioni.

## 2. Tutte le guide giuridiche e procedure — PRIORITÀ ALTA

**Inventario:** 24 guide (non 23), più sei rubriche e pagine di supporto. Il registro `monitoraggio/audit-2026-10-15-fatti.json` conserva 62 affermazioni giuridiche selezionate confermate con riferimenti documentati, con `fully_exhaustive=false`. Le guide Debiti 01–09 hanno verifiche dedicate; nel presente ciclo controllate anche le regole principali della Guida 01 ISEE corrente 2026 e delle scadenze territoriali AdeR.

**ISEE 2026:** un ISEE ordinario valido è prerequisito; la variazione reddituale superiore al 25%, patrimoniale superiore al 20% dal 1 aprile e le variazioni di lavoro/trattamenti sono alternative con requisiti differenti; possibilità dei redditi di due mesi solo nelle categorie ammesse; validità 6 mesi se soltanto redditi, fino a 31 dicembre se patrimoni; variazioni ulteriori richiedono aggiornamenti secondo le regole. Conferma: [Istruzioni modello MS 2026 Ministero del Lavoro](https://www.lavoro.gov.it/strumenti-e-servizi/isee-istruzioni-2026), [INPS Portale unico ISEE](https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.Portale-unico-ISEE.html).

**Rottamazione territoriale:** le date 16 ottobre–15 dicembre 2026 e la distinzione dalla rottamazione nazionale sono conformi alle [comunicazioni AdeR sulla legge 113/2026](https://www.agenziaentrateriscossione.gov.it/it/il-gruppo/lagenzia-comunica/novita/Legge-n.-113-2026-piu-tempo-per-la-Rottamazione-degli-enti-territoriali/). Alla data del 15 ottobre NON attestata l'operatività del modulo che dovrebbe aprire il 16 ottobre. Da non confondere la data programmata con disponibilità già verificata.

**Esito:** parzialmente verificato; non certificati tutti gli importi, eccezioni, periodi, modulistica, procedimenti e aggiornamenti futuri di 24 guide. **Azione aperta P1:** fact-check atomico, prioritariamente decadenze, ricorsi, rateizzazioni, misure in apertura, soglie economiche.

## 3. Applicazione PWA — PRIORITÀ ALTA

**Verificato in codice:** manifest con ID `./`, icone 192/512/maskable, service worker, archivio testi in localStorage, marcatura delle copie non aggiornate, salvataggio e riepilogo nuove/aggiornate/invariate. Il collaudo Playwright emula Android 390 px, scarica **31 pagine** e prova la lettura offline e il successivo ritorno online. Non prova il dispositivo fisico.

**Correzioni:** collegamento del footer PWA reso leggibile su fondo scuro in `app/app.css`; cambio versione da `app.css?v=8` a `v=9` in `app/index.html` e `app/sw.js`, cache SW da v9 a v10 per provocare sostituzione della shell; test `app/tests/sync-summary.test.cjs` reso coerente con CSS versionato anziché vincolato a `v=8`. Un test iniziale è fallito per questo vincolo, poi il test unitario di sincronizzazione sul commit `d79ff878` è terminato **SUCCESS**.

**Da eseguire:** installazione su Samsung reale, copia offline dopo chiusura app e riavvio del telefono, aggiornamenti multipli consecutivi, mancata connettività prolungata, archiviazione esaurita e conservazione preferiti.

## 4. Accessibilità WCAG 2.2 AA — PRIORITÀ ALTA

**Problema confermato nel report `ultimo-collaudo-browser.json`:** nuova pagina `agevolazioni-guida-01-isee-corrente.html` con **6 violazioni di contrasto** nella navigazione e **1 violazione target-size** al pulsante Patronato. Anche il footer dell'app segnalava una violazione di contrasto sull'ancora per il sito.

**Correzioni effettuate:** sulla pagina ISEE colore e fondo con selettori sufficientemente specifici per prevalere sui CSS generali; pulsanti CAF/Patronato in colonne separate, min 60 px, spaziatura e contrasto elevato. Sul footer PWA colore chiaro per il link su fondo scuro. Il primo tentativo CSS per i pulsanti ISEE non era applicabile perché la pagina non usava il contenitore `experience-caf-uil`; corretto successivamente il selettore per `uil-contact-actions`.

**Attestabile:** controllo automatico axe su 35 pagine, reflow mobile, alt presenti. **Non attestabile:** conformità completa WCAG 2.2 AA, zoom 200%–400%, lettore schermo, navigazione tastiera reale, test con persone dai 50 ai 70 anni.

## 5. Rubriche e navigazione — PRIORITÀ MEDIA

**Inventario aggiornato:** 37 file HTML, di cui 35 editoriali; 24 guide da conteggiare correttamente; 25 pagine contrassegnate indicizzabili e **25 presenti in sitemap**; **zero file locali o ancore mancanti** nei test statici. Rubrica Debiti ha nove guide distinte. La nuova Guida 01 ISEE è presente nella Rubrica Agevolazioni.

**Correzione effettuata:** `monitoraggio/audit_statico.py` ora include le guide `agevolazioni-guida-` nell'inventario. Prima contava erroneamente 23 anziché 24. **Rimane da fare:** completare le rubriche previste senza inventare guide già pubblicate; osservare i percorsi reali di utenti non esperti.

## 6. Google, indicizzazione e SEO — PRIORITÀ MEDIA

**Verificato:** sitemap 25/25 pagine indicizzabili senza incongruenze; altre pagine sono intenzionalmente marcate `noindex` perché in costruzione; file di verifica Google nel repository; canonical su pagine pubbliche rilevanti. L'esistenza della sitemap non dimostra l'indicizzazione. Google spiega che `noindex` impedisce la comparsa della pagina indicizzata e che la sitemap è un suggerimento di scansione, non una garanzia.

**Limite tecnico:** nessun accesso in questa sessione ai rapporti Search Console autenticati (l'integrazione GSC Wizard risponde `payment_required`). Non inventare pagine già indicizzate, click, performance o Core Web Vitals. Il `robots.txt` è riferito alla radice dell'host github.io; un file nel sottopercorso del progetto non sostituirebbe quello dell'origine.

**Da fare:** URL Inspection/Search Console, pagine escluse, ragioni di scansione, CWV e Lighthouse misurati in condizioni reali.

## 7. Immagini editoriali — PRIORITÀ MEDIA

**Verificato:** nove guide Debiti con file immagine differenti per percorso; alt e vari formati WebP presenti, senza che questo certifichi la varietà visiva. La nuova guida ISEE carica una fotografia da Unsplash con attribuzione; il checker URL attribuzione rileva HTTP **401** da robot, mentre i restanti **236 URL esterni su 237** hanno risposto raggiungibili al controllo automatico. Questo non dimostra che la foto o il link siano inutilizzabili per il lettore.

**Non verificato:** confronto visivo dei nove soggetti/composizioni, licenze e provenienza di ogni altra immagine, percezione di autenticità; peso effettivamente scaricato in rete del portfolio immagini.

**Da fare:** verifica umana immagine per immagine, diritti e ottimizzazione dei soli file usati; non sostituire o eliminare senza prova.

## 8. Sicurezza, privacy, dipendenze e automazioni — PRIORITÀ ALTA

**Bug corretto nel ciclo precedente:** workflow GitHub che tentavano di pubblicare report da rami di sviluppo sul ramo principale; ora audit limitati a main e serializzati.

**Nuovo bug importante (accertato):** `monitoraggio/collaudo_browser.cjs` registrava test `FAIL` e violazioni `axe` nel JSON, ma concludeva il processo senza un codice d'uscita di errore: GitHub poteva mostrare il job riuscito nonostante problemi gravi. **Correzione:** ora esito browser diverso da `COMPLETED`, test `FAIL`, violazioni/errore axe o errori della pagina impostano `process.exitCode=1`. Questo evita falsi esiti positivi.

**Da verificare:** dati personali pubblicati e cronologia Git, policy di conservazione, biblioteche utilizzate per collaudi, segreti esposti storicamente e autorizzazioni Actions. Non è stata riscritta né cancellata la storia Git (operazione distruttiva non giustificata).

## 9. Salute, diabete, cardiopatie, dieta e ricette — PRIORITÀ EDITORIALE ALTA

**Stato attuale:** sezioni `salute-autonomia.html` e `dieta-mediterranea-ricette.html` descrivono correttamente i percorsi futuri e mantengono `noindex`; le ricette non sono ancora pubblicate. Citano fonti ministeriali, ISS e CREA; distinguono orientamento generale da terapia individuale; non forniscono dosi di insulina o cure autonome. La mancata pubblicazione di ricette non è un errore scientifico del contenuto attuale, ma una **lacuna editoriale**.

**Prima della pubblicazione:** linee guida scientifiche aggiornate, calcoli nutrizionali riproducibili, pesi crudo/cotto, carboidrati per porzione, indicazioni non prescrittive, validazione specialistica sui contenuti clinici.

## 10. Collaudo complessivo e pubblicazione — PRIORITÀ ALTA

**Distinguere:** file modificato, commit su `main`, workflow riuscito, deploy Pages riuscito, apertura e comportamento verificati online e su Samsung reale.

**Evidenze:** `monitoraggio/ultimo-audit-statico.json`, `monitoraggio/ultimo-collaudo-browser.json`, `monitoraggio/ultimo-controllo-url-esterni.json` e storico GitHub Actions. Risultati precedenti: 0 link/ancore mancanti, PWA offline emulata, 236/237 URL esterni raggiungibili (un robot 401 Unsplash). Nel presente ciclo è stato corretto il fatto che il job browser non rispettasse i FAIL registrati: verificare la nuova run GitHub prima di dichiarare completo il collaudo.

**Limiti non eliminabili automaticamente:** prova su dispositivo fisico, giudizio umano sul testo e sulle immagini, misure reali Google, revisione medico-legale esterna.

## Registro delle correzioni, 15 ottobre 2026

| File | Modifica |
| --- | --- |
| `agevolazioni-guida-01-isee-corrente.html` | CSS contrasto navigazione e dimensione/spaziatura pulsanti CAF/Patronato, due passaggi correttivi |
| `monitoraggio/audit_statico.py` | Conta anche le nuove guide Agevolazioni |
| `app/app.css` | Colore accessibile del link nel footer |
| `app/index.html` | Carica stylesheet versione 9 |
| `app/sw.js` | Shell CSS versione 9, cache v10 per aggiornamento dell'app installata |
| `app/tests/sync-summary.test.cjs` | Verifica coerenza della versione CSS anziché richiedere v8 |
| `monitoraggio/collaudo_browser.cjs` | Il processo fallisce realmente davanti a test FAIL e violazioni axe |

## Qualità, priorità e prossimo intervento

**Punteggio globale:** resta **70/100 provvisorio** finché l'audit comparabile dell'intero progetto non è ripetuto dopo il deploy; non incrementare il voto in base al numero di modifiche. **P1:** completare il collaudo browser post-correzioni (nessuna violazione axe). **P1 contenutistico successivo:** completare l'audit atomico sui termini INPS e sui rimedi con decadenza, prima di aggiungere funzionalità.

**Fonti ufficiali ulteriori:**
- Google noindex https://developers.google.com/search/docs/crawling-indexing/block-indexing?hl=it
- Google sitemap https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=it
- WCAG 2.2 AA reflow https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
- AdeR rottamazione territoriale https://www.agenziaentrateriscossione.gov.it/it/il-gruppo/lagenzia-comunica/novita/Legge-n.-113-2026-piu-tempo-per-la-Rottamazione-degli-enti-territoriali/

