# PER ME — RAPPORTO DI AUDIT E QUALITÀ

> **Aggiornamento del 15 ottobre 2026:** questo documento descrive la *prima fase* dell'audit, con voto provvisorio 56/100 e controlli browser non ancora eseguiti. È conservato per lo storico e **non rappresenta più lo stato corrente**. Il rapporto successivo [audit-completamento-2026-10-15.md](audit-completamento-2026-10-15.md) registra i collaudi eseguiti, le correzioni e il nuovo voto provvisorio **67/100**. Restano incompleti il fact-check atomico esaustivo, i test WCAG manuali e la prova su Samsung.

**Data: 15 ottobre 2026. Stato: AUDIT PARZIALE DELLE FONTI, INVENTARIO STATICO COMPLETO, PUBBLICAZIONE NON CERTIFICATA IN BROWSER.**

Sito: https://cpcpcp106-coder.github.io/Per-Me/  
Codice: https://github.com/cpcpcp106-coder/Per-Me/  
Snapshot tecnico completo: [ultimo-audit-statico.json](ultimo-audit-statico.json)  
Affermazioni controllate con fonte e data: [audit-2026-10-15-fatti.json](audit-2026-10-15-fatti.json)  
Storico precedente conservato: [audit-storico.json](audit-storico.json).

## 1. Esito e copertura

**Punteggio di qualità dimostrata, nuova scala con perimetro 23 guide: 54/100 prima e 56/100 dopo.** Sono voti prudenziali e PROVVISORI, non certificazioni legali né test WCAG. Il precedente audit V2 (57/100 su 14 guide, 14 ottobre) **NON** è numericamente comparabile perché copriva una diversa quantità di contenuti.

- Repository censito: **122 oggetti nella prima lettura del 15 ottobre**, esclusi i file aggiunti dall'audit stesso; 36 file HTML esaminati staticamente (**36/36**), compresi app/index.html e il documento tecnico per Google.
- Pagina editoriali HTML: **34**; guide vere e proprie: **23**, esaminate in codice e struttura **23/23**. **Guide sottoposte a verifica normativa atomica esaustiva: 0/23**.
- **1.000** occorrenze di riferimenti locali (href/src/link/script): **0 file mancanti**; **0 ancore locali mancanti** secondo il verificatore. Si tratta di esistenza nel repository, non di navigazione in browser.
- **442** occorrenze di riferimenti esterni, **221 URL esterni distinti**; **0/221 verificati tutti nel medesimo test HTTP end-to-end**. Alcune fonti sono state consultate manualmente; HTTP 403 può indicare un blocco verso strumenti automatici, non necessariamente un sito rotto.
- **70** immagini usate nell'HTML, **0 senza attributo alt** staticamente. L'appropriatezza semantica di ogni testo alternativo resta da controllare con test assistiti.
- **24/24** URL nella sitemap coerenti con pagine indicizzabili; **11 pagine noindex**, incluse 5 guide sul lavoro in attesa di convalida. La pagina di verifica Google non è una pagina editoriale.
- **318 menzioni numeriche o normative** rilevate automaticamente nelle pagine (indicatore euristico, NON numero di proposizioni); l'archivio precedente censiva **476 paragrafi candidati nelle sole 14 guide lavoro/pensione**. **Totale delle affermazioni atomiche sull'intero sito: NON CALCOLATO.** Perciò la percentuale di fact-check sull'intero sito è **NON DETERMINABILE** senza falsare il denominatore.
- Registro manuale su un sottoinsieme di **32 proposizioni atomiche:** **31 CONFERMATE** e **1 NON VERIFICABILE con fonte primaria nel turno**; **0 ERRATE riscontrate in questo sottoinsieme**, **0 SUPERATE nel sottoinsieme**, **0 NON DIMOSTRATE ulteriori nel sottoinsieme**. Non estendere tali conteggi all'intero sito.
- Fonti/organismi effettivamente consultati: AdeR, MEF (testo normativo), INPS, ARERA, Consap, Ministero della Giustizia, Gazzetta Ufficiale, ITAL UIL, CAF UIL, ARDiS FVG, ABF. Ogni prova del registro ha il link esatto e la data.

## 2. Inventario completo

L'inventario analitico delle **36 pagine** (file, titolo, noindex, presenza H1/alt, immagini, link, menzioni) è nel JSON [ultimo-audit-statico.json](ultimo-audit-statico.json), chiave `inventario`.

- **Home e pagine trasversali (5):** `index.html`, `chi-siamo.html`, `metodo.html`, `monitoraggio.html`, `dieta-mediterranea-ricette.html`.
- **Rubriche (6):** `soldi-lavoro.html`, `pensione-invalidita.html`, `debiti-cartelle.html`, `agevolazioni-diritti.html`, `salute-autonomia.html`, `tutor-ai.html`.
- **Lavoro: 6 guide:** `come-leggere-busta-paga.html`, `dal-lordo-al-netto.html`, `ore-ferie-permessi-malattia-straordinari.html`, `stipendio-diminuito-cosa-controllare.html`, `ccnl-inquadramento-livello-superminimo.html`, `controllare-cedolino-cassa-integrazione-solidarieta.html`.
- **Pensioni/invalidità: 8 guide:** `inps-prestazione-sospesa-respinta-cosa-fare.html`, `assegno-ordinario-invalidita-requisiti-conferma.html`, `aoi-invalidita-civile-differenze.html`, `verbale-invalidita-civile-legge-104-come-leggerlo.html`, `cedolino-pensione-obism-arretrati-verificare-importi.html`, `contributi-inps-estratto-conto-pensione-vicina.html`, `redditi-red-comunicazioni-obbligatorie-inps.html`, `riesame-ricorso-inps-termini.html`.
- **Debiti/cartelle: 9 guide:** `debiti-guida-01-leggere-cartella.html`, `debiti-guida-02-controllare-debiti.html`, `debiti-guida-03-cartella-errata.html`, `debiti-guida-04-rateizzazione.html`, `debiti-guida-05-rottamazione.html`, `debiti-guida-06-fermo-pignoramento.html`, `debiti-guida-07-banche-bollette.html`, `debiti-guida-08-sovraindebitamento.html`, `debiti-guida-09-a-chi-rivolgersi.html`.
- **Tecniche:** `app/index.html` (interfaccia PWA), `googled120465f7b693b08.html` (verifica Google).

Nel repository sono stati controllati inoltre `style.css`, `app/app.css`, `app/main.js`, `app/sw.js`, `app/manifest.webmanifest`, `sitemap.xml`, `app-content.json` (archivio storico distinto dal lettore dinamico), il monitoraggio preesistente e i riferimenti alle immagini. **Non equivale a testare ogni dichiarazione CSS o ogni percorso browser**.

## 3. Problemi rilevati, evidenze e priorità

| Gravità | Categoria e stato | Prova concreta | Esito al 15 ottobre |
|---|---|---|---|
| **ALTA** | NON VERIFICABILE completamente | Nessun test di installazione PWA su Samsung/Android, modalità aereo, aggiornamento cache dopo modifica, icona unica; il sorgente da solo non prova il funzionamento | **APERTO** |
| **ALTA** | NON DIMOSTRATO globalmente | 23 guide, centinaia di paragrafi; solo 32 proposizioni selezionate confrontate con fonti in questo audit. Le 9 verifiche INPS registrate il 14 ottobre sono storiche, non ripetute in questa sessione | **APERTO** |
| **ALTA** | RISCHIO PRIVACY da verificare | Gli audit del 14 ottobre registrano un vecchio HTML storico di 1,2 MB non più nel ramo principale, ma potenzialmente ancora raggiungibile nella cronologia Git; la Home mostra volontariamente data di nascita completa | **APERTO**; nessuna riscrittura distruttiva di Git history |
| **MEDIA** | AMBIGUO / INCOERENTE | Home indicava CAF UIL Tarcento 0432 785746, mentre la Guida 09 diceva «recapito diretto non confermato» | **CORRETTO** con la fonte ARDiS FVG del 2025, esplicitando che apertura/orari 2026 non sono stati verificati |
| **MEDIA** | COPERTURA TECNICA | Monitoraggio precedente analizzava solo file HTML alla radice, non tutta la PWA `app/` | **CORRETTO**: script/azione separati con snapshot riproducibile |
| **MEDIA** | NON VERIFICABILE | 221 URL esterni distinti non aperti integralmente tramite browser e risposta sostanziale; alcune fonti istituzionali restituiscono 403 o richiedono applicazioni particolari | **APERTO** |
| **MEDIA** | ACCESSIBILITÀ | Nessun audit WCAG 2.2 AA strumentale e umano su 200/400%, reflow, tastiera, screen reader, contrasti di tutti gli stati | **APERTO** |
| **MEDIA** | SEO e governance | Cinque guide sul lavoro mantengono noindex e non sono in sitemap; scelta prudente fino a verifica sostanziale | **APERTO, INTENZIONALE** |
| **BASSA** | ARCHIVI | Immagini PNG di lavoro da circa 2 MB restano nel repository; non risultano caricate automaticamente dalla Home in qualità di PNG grandi | **DA VALUTARE** prima di eliminarle |
| **BASSA** | CONTENUTI TRANSITORI | La Guida 05 rispecchia la finestra del 16 ottobre–15 dicembre 2026 ma necessita della verifica di apertura e del link telematico diretto all'attivazione | **APERTO**, non inserito link inventato |

**Attenzione alle definizioni:** «0 riferimenti interni mancanti» non dimostra che un pulsante esegua ciò che promette; «0 errori normativi confermati nel sottoinsieme» non certifica le guide non confrontate; una fonte raggiungibile non dimostra automaticamente una frase.

## 4. Correzioni ESEGUITE e controllate

1. **`debiti-guida-09-a-chi-rivolgersi.html`**: sostituita la dichiarazione incoerente sul CAF UIL Tarcento con recapito **0432 785746**, riferimento alla fonte ARDiS FVG del 2025, pulsante telefonico e cautela sugli orari. Nessuna modifica alla testimonianza personale, distinzione intatta tra CAF e patronato.
2. **`monitoraggio/audit_statico.py`**: creato un verificatore per tutte le 36 pagine, asset e ancore, sitemap e componenti PWA. Segnala chiaramente ciò che non testa.
3. **`.github/workflows/audit-statico.yml`**: creato controllo automatico che verifica sintassi `main.js`/`sw.js`, esegue audit statico e salva snapshot su GitHub senza sovrascrivere la storia delle revisioni editoriali.
4. **`monitoraggio/ultimo-audit-statico.json`**: pubblicato lo snapshot automatico con inventario e metriche; workflow eseguito con esito **success**.
5. **Il presente rapporto, il registro delle affermazioni e lo storico** sono conservati su GitHub.

**Non eseguito**: riscrivere tutta la normativa delle 23 guide; certificare accessibilità; effettuare prove reali offline/Android; verificare manualmente tutti i 221 URL esterni; bonificare la cronologia Git. Queste operazioni non vengono chiamate «completate».

## 5. Scala riproducibile per il voto (stessa prima/dopo)

| Ambito (peso) | Regole osservabili di attribuzione | Prima | Dopo |
|---|---|---:|---:|
| Accuratezza/fonti (30) | Fonte istituzionale pertinente, data e campo d'applicazione; riscontri puntuali solo quando realmente consultati. Punteggio severamente limitato se mancano verifiche atomiche esaustive | 8 | 8 |
| Coerenza/organizzazione (15) | 1 H1, ordine di numerazione, navigazione Home–rubrica–guida, assenza contraddizioni verificate, file e ancore | 12 | 13 |
| Normativa/amministrazione (15) | Terminologia e competenza corretta, eccezioni, scadenze, confronto attuale con fonte: punti non conferiti a norme non esaminate | 7 | 7 |
| UX/accessibilità (15) | Alt e skip link, caratteri, pulsanti e layout statico; non assegnare punti ai collaudi WCAG/browser mancanti | 10 | 10 |
| Qualità tecnica (15) | Asset, link/ancore, SEO e sitemap, validità sintattica di JS/manifest, copertura PWA statica; riservare punti ai test live non effettuati | 10 | 11 |
| Qualità editoriale (10) | Problema comprensibile, istruzioni, distinzione esperienza/regole, limiti e fonti; la revisione stilistica integrale non è attestata | 7 | 7 |
| **Totale (100)** | **Voto della QUALITÀ DIMOSTRATA, non della correttezza presunta** | **54** | **56** |

Per riprodurre il confronto: ripetere `python monitoraggio/audit_statico.py` sul commit considerato, riesaminare le stesse proposizioni nel registro con le fonti alla nuova data e riapplicare le sei sottoscale. Il punto di coerenza aggiunto deriva dalla contraddizione CAF risolta; il punto tecnico aggiunto dalla copertura automatica della PWA. I 2 punti **non** significano che il software Android sia stato collaudato.

### Voti prudenziali per guida (tutti su 100)

Nella colonna delle componenti l'ordine è: **accuratezza (30) / coerenza (15) / normativa (15) / UX (15) / tecnica (15) / editoriale (10)**. I numeri attribuiscono maggiore credito solo alle guide con più evidenze effettivamente controllate; l'accessibilità in browser e il fact-check esaustivo non ricevono punteggio. Per ciascuna guida, il punteggio precedente a questo audit è il totale qui indicato **meno 1 punto tecnico**; per Debiti 09 sottrarre **anche 1 punto di coerenza** per l'incongruenza CAF poi risolta.

| Guida | File | Componenti | Voto dopo |
|---|---|---|---:|
| Lavoro 01 | `come-leggere-busta-paga.html` | 6 / 13 / 6 / 9 / 11 / 7 | **52** |
| Lavoro 02 | `dal-lordo-al-netto.html` | 4 / 12 / 5 / 9 / 10 / 7 | **47** |
| Lavoro 03 | `ore-ferie-permessi-malattia-straordinari.html` | 4 / 12 / 5 / 9 / 10 / 7 | **47** |
| Lavoro 04 | `stipendio-diminuito-cosa-controllare.html` | 5 / 12 / 5 / 9 / 10 / 7 | **48** |
| Lavoro 05 | `ccnl-inquadramento-livello-superminimo.html` | 5 / 12 / 5 / 9 / 10 / 7 | **48** |
| Lavoro 06 | `controllare-cedolino-cassa-integrazione-solidarieta.html` | 5 / 12 / 5 / 9 / 10 / 7 | **48** |
| Pensioni 01 | `inps-prestazione-sospesa-respinta-cosa-fare.html` | 7 / 13 / 7 / 9 / 11 / 7 | **54** |
| Pensioni 02 | `assegno-ordinario-invalidita-requisiti-conferma.html` | 8 / 13 / 7 / 9 / 11 / 7 | **55** |
| Pensioni 03 | `aoi-invalidita-civile-differenze.html` | 8 / 13 / 7 / 9 / 11 / 7 | **55** |
| Pensioni 04 | `verbale-invalidita-civile-legge-104-come-leggerlo.html` | 7 / 13 / 7 / 9 / 11 / 7 | **54** |
| Pensioni 05 | `cedolino-pensione-obism-arretrati-verificare-importi.html` | 7 / 13 / 7 / 9 / 11 / 7 | **54** |
| Pensioni 06 | `contributi-inps-estratto-conto-pensione-vicina.html` | 7 / 13 / 7 / 9 / 11 / 7 | **54** |
| Pensioni 07 | `redditi-red-comunicazioni-obbligatorie-inps.html` | 7 / 13 / 7 / 9 / 11 / 7 | **54** |
| Pensioni 08 | `riesame-ricorso-inps-termini.html` | 7 / 13 / 7 / 9 / 11 / 7 | **54** |
| Debiti 01 | `debiti-guida-01-leggere-cartella.html` | 9 / 13 / 8 / 9 / 11 / 7 | **57** |
| Debiti 02 | `debiti-guida-02-controllare-debiti.html` | 7 / 13 / 6 / 9 / 11 / 7 | **53** |
| Debiti 03 | `debiti-guida-03-cartella-errata.html` | 9 / 13 / 8 / 9 / 11 / 7 | **57** |
| Debiti 04 | `debiti-guida-04-rateizzazione.html` | 14 / 13 / 9 / 9 / 11 / 7 | **63** |
| Debiti 05 | `debiti-guida-05-rottamazione.html` | 14 / 13 / 9 / 9 / 11 / 7 | **63** |
| Debiti 06 | `debiti-guida-06-fermo-pignoramento.html` | 13 / 13 / 9 / 9 / 11 / 7 | **62** |
| Debiti 07 | `debiti-guida-07-banche-bollette.html` | 14 / 13 / 9 / 9 / 11 / 7 | **63** |
| Debiti 08 | `debiti-guida-08-sovraindebitamento.html` | 10 / 13 / 7 / 9 / 11 / 7 | **57** |
| Debiti 09 | `debiti-guida-09-a-chi-rivolgersi.html` | 14 / 14 / 9 / 9 / 11 / 7 | **64** |

Sono **stime strutturate e cautelative**, non certificazioni. I 23 voti sono confrontabili con questa versione della scala e questi test, non con gli score del 14 ottobre basati su 14 guide.

## 6. PWA, SEO, privacy e test realmente eseguiti

**PWA (sorgente):** `manifest.webmanifest` JSON valido; icone 192/512/maskable presenti; service worker `app/sw.js` e shell statici presenti; sintassi JS superata in GitHub Actions; aggiornamento online previsto da `app/main.js`, salvataggio di testi estratti in localStorage, avviso su fotografie e link esterni offline. Non è provato che il dispositivo conceda il salvataggio, che il sistema mostri una sola icona né che la cache sopravviva all'eliminazione dei dati. Il file `app-content.json` è storico e non va confuso con il catalogo sincronizzato automaticamente.

**SEO:** inventario HTML, title, H1, meta description, canonical o noindex, sitemap analizzati staticamente; 24 URL indicizzabili in sitemap, nessuna URL indicizzabile mancante. Il fatto che la sitemap sia corretta non certifica indicizzazione effettiva presso Google.

**WCAG 2.2:** verifica statica di attributi alt e skip link e classi CSS; **nessuna certificazione AA**. Zoom 200–400%, contrasto computato su tutti i pulsanti, screen reader/tastiera Android e navigazione reale sono test da effettuare.

**Privacy:** nessuna trasmissione di dati dei lettori rilevata nell'app statica esaminata; questo non basta per attestare conformità GDPR dell'intero progetto, dati di analytics/servizi esterni o sicurezza della cronologia Git. L'autore mantiene la responsabilità delle informazioni personali che pubblica.

## 7. Fonti consultate nella revisione del 15 ottobre 2026

- AdeR: cartella e termini: https://www.agenziaentrateriscossione.gov.it/it/la-guida-alla-cartella-di-pagamento/la-cartella-di-pagamento/index.html
- AdeR: sospensione legale: https://www.agenziaentrateriscossione.gov.it/it/imprese/Sospensione/
- AdeR: rateizzazione 2026: https://www.agenziaentrateriscossione.gov.it/it/cittadini/Rateizzazione/la-rateizzazione/
- AdeR: rottamazione territoriale: https://www.agenziaentrateriscossione.gov.it/it/il-gruppo/lagenzia-comunica/novita/Legge-n.-113-2026-piu-tempo-per-la-Rottamazione-degli-enti-territoriali/
- AdeR: quinquies nazionale: https://www.agenziaentrateriscossione.gov.it/it/Per-saperne-di-piu/definizione-agevolata-rottamazione-quinquies/ambito-applicativo/index.html
- MEF: art.171 D.Lgs.33/2025: https://def.giustiziatributaria.gov.it/DocTribFrontend/executePrintArticolo.do?articolo=Articolo+171&codiceOrdinamento=0000000000001710000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000&id=%7B656DFD1E-F9EF-4BDA-B1F3-60EDE4E903B7%7D
- INPS: assegno sociale 2026: https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.assegno-sociale-50184.assegno-sociale.html
- ARERA: bonus sociali 2026: https://www.arera.it/comunicati-stampa/dettaglio/bonus-sociali-arera-alza-a-9796-euro-la-soglia-isee-per-laccesso-alle-agevolazioni-per-acqua-luce-gas-e-rifiuti
- Consap: sospensione mutui: https://www.consap.it/fondo-di-sospensione-mutui-per-l-acquisto-della-prima-casa/
- Gazzetta: patrocinio: https://www.gazzettaufficiale.it/atto/vediMenuHTML?atto.codiceRedazionale=25A03904&atto.dataPubblicazioneGazzetta=2025-07-11&tipoSerie=serie_generale&tipoVigenza=originario
- ITAL UIL: Tarcento: https://www.italuil.it/jsps/233/ALTRE_VOCI/234/Sedi_IT.jsp?regioni=6
- CAF UIL: sedi: https://extranet.cafuil.it/sediuil/sedi.asp
- ARDiS FVG: elenco 2025: https://www.ardis.fvg.it/upload/news/1753696924.pdf
- ARERA: conciliazione: https://www.arera.it/consumatori/conciliazione/servizio-conciliazione-domande-e-risposte
- ABF: verifiche preliminari: https://www.arbitrobancariofinanziario.it/presentare-ricorso/verifiche-preliminari/index.html
- Giustizia: registro OCC: https://www.giustizia.it/giustizia/it/mg_3_14_1.wp

Una fonte può essere accessibile in ricerca e bloccata quando aperta direttamente; l'effettiva compatibilità del link nel browser di un lettore non è stata attestata. La connessione alla fonte ufficiale e la correttezza di una singola affermazione sono registrate distintamente nel JSON delle prove.

## 8. Livello di affidabilità e prossime priorità

**Affidabilità residua: MODERATA per orientamento introduttivo; NON CERTIFICATA per decisioni individuali su ricorsi, pagamenti, pignoramenti, pensioni o salute.** L'indice è percorribile staticamente e i principali riscontri 2026 scelti sono favorevoli, ma gli errori non ancora cercati possono essere rilevanti.

Priorità: (1) atomizzare e verificare integralmente gli enunciati della rubrica debiti e delle guide INPS; (2) provare sul dispositivo reale prima installazione, aggiornamento online, lettura con rete disattivata e ripresa dopo riavvio; (3) completare check HTTP e **pertinenza** di ciascuna fonte; (4) test WCAG 2.2 AA e prestazioni su schermi piccoli; (5) valutare privacy della cronologia e dell'esposizione della data di nascita senza cambiamenti non autorizzati; (6) verificare il servizio di rottamazione locale dal 16 ottobre e attivare link diretto solo dopo prova.

**Regola finale: nessun test non effettuato è considerato superato.**
