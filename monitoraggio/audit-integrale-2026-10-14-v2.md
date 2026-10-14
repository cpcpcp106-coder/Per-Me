# PER ME — RAPPORTO DI AUDIT E QUALITÀ
**Seconda valutazione, 14 ottobre 2026 · revisione V2 · fonte di verità: GitHub `main`**

**Sito:** https://cpcpcp106-coder.github.io/Per-Me/  
**Repository:** https://github.com/cpcpcp106-coder/Per-Me  
**Rapporto precedente (non sovrascritto):** [audit-integrale-2026-10-14.md](audit-integrale-2026-10-14.md)

> **Esito: qualità documentabile 57/100, PROVVISORIA. NON CERTIFICATO per la pubblicazione affidabile di consulenza normativa.** Il voto misura le prove disponibili, non la probabilità che ogni affermazione sia corretta. Non è un voto all'autore. I contenuti normativi richiedono un fact-check analitico completo e nuovi controlli quando cambiano le disposizioni.

## 1. Perimetro reale e inventario delle pagine

Esaminato l'intero albero del repository `main` (87 file prima di questo rapporto). Letto il codice di **26/26 file HTML operativi**, comprendendo l'interfaccia PWA e tutte le **14/14 guide**. Sono state ispezionate staticamente struttura, H1, metadati, link, ancore proprie, alternative testuali delle immagini e presenza dei file richiamati; sono stati letti i contenuti di tutte le guide con estrazione di paragrafi normativi rilevanti. Verifica qualitativa normativa **su un insieme mirato**, non su tutte le singole frasi.

| Tipologia | File effettivamente esaminati |
|---|---|
| Home | `index.html` |
| Rubriche (6) | `soldi-lavoro.html`; `pensione-invalidita.html`; `debiti-cartelle.html`; `agevolazioni-diritti.html`; `salute-autonomia.html`; `tutor-ai.html` |
| Pagina tematica aggiuntiva | `dieta-mediterranea-ricette.html` |
| Pagine editoriali (3) | `metodo.html`; `monitoraggio.html`; `chi-siamo.html` |
| Guide Soldi & Lavoro (6) | `come-leggere-busta-paga.html`; `dal-lordo-al-netto.html`; `ore-ferie-permessi-malattia-straordinari.html`; `stipendio-diminuito-cosa-controllare.html`; `ccnl-inquadramento-livello-superminimo.html`; `controllare-cedolino-cassa-integrazione-solidarieta.html` |
| Guide Pensione e invalidità (8) | `inps-prestazione-sospesa-respinta-cosa-fare.html`; `assegno-ordinario-invalidita-requisiti-conferma.html`; `aoi-invalidita-civile-differenze.html`; `verbale-invalidita-civile-legge-104-come-leggerlo.html`; `cedolino-pensione-obism-arretrati-verificare-importi.html`; `contributi-inps-estratto-conto-pensione-vicina.html`; `redditi-red-comunicazioni-obbligatorie-inps.html`; `riesame-ricorso-inps-termini.html` |
| Interfaccia installabile | `app/index.html` |

**Ulteriore file HTML non operativo:** `Riprendi progetto blog.html` (circa 1,2 MB) NON ispezionato integralmente; non incluso nelle 26 pagine. Esiste pubblicamente nel repository, pur non essendo collegato dalla navigazione. Potrebbe contenere informazioni non destinate alla pubblicazione: **NON VERIFICABILE** senza esame del contenuto, rischio di esposizione da affrontare. Non eliminato per non distruggere un possibile archivio utile.

**Perimetro non raggiungibile:** la navigazione HTTP di GitHub Pages dalla sessione di audit ha restituito un errore; il sito pubblicato e la PWA sono stati verificati **come codice sul branch pubblicato**, non mediante test HTTP end-to-end. La pubblicazione GitHub Actions va controllata dopo gli ultimi commit. Non sono disponibili prova reale di installazione Android, modalità aereo, browser DevTools/console, screenshot di tutte le pagine, Lighthouse o axe.

## 2. Misure tecniche riproducibili

- File HTML operativi: **26/26 letti staticamente**. Guide: **14/14** esaminate a livello di struttura e testo; **0/14** completamente scomposte e verificate frase-per-frase contro tutte le fonti (lacuna esplicita).
- **919 riferimenti `href`** nel primo censimento delle 26 pagine; **242 occorrenze di indirizzi assoluti HTTP(S)** comprese ripetizioni (alcuni appartenenti allo stesso dominio del sito). Questi valori descrivono il primo snapshot, non un test HTTP. I collegamenti aggiunti nella PWA e nella Home modificano il totale in seguito.
- **0 destinazioni di file locali mancanti** nel controllo statico; `app/` è una directory valida con `app/index.html`. Nessuna ancora locale della stessa pagina mancante nei controlli eseguiti sulle 26 pagine. Collegamenti fra file o verso siti esterni non garantiti dalla sola presenza dei nomi.
- **26/26 pagine con un H1 e meta description**; 0 immagini senza attributo `alt` nei tag esaminati. Non è stata certificata la qualità semantica di tutti gli `alt`.
- **5 delle 6 guide Soldi & Lavoro** sono `noindex` malgrado siano accessibili dalla rubrica; non sono attualmente candidabili a Google tramite normale indicizzazione. Tale stato va conservato finché le guide non siano validate integralmente, o modificato su decisione editoriale consapevole. Fonte tecnica: Google Search Central, regole robots meta.
- La vecchia `sitemap.xml` aveva **11 URL**: mancavano le guide Pensione 06–08. Ora il file ne contiene **14 senza duplicati**, corrispondenti alle pagine esplicitamente indicizzabili identificate.
- `app/manifest.webmanifest` è JSON valido con id, start_url, scope, icone `any` e `maskable`. `app/main.js` e `app/sw.js`: controllo di compilabilità della sintassi JavaScript superato, non esecuzione browser.
- Nuovo service worker: `perme-reader-v7-20261014-audit`; HTML PWA, cache shell, JS e CSS riportano versioni coerenti `v=7`.
- **NON VERIFICABILE in questa sessione:** numero di risposte HTTP 200 dei 242 indirizzi assoluti HTTP(S), effettiva installabilità su Chrome/Samsung, disponibilità offline dopo svuotamento cache, piena accessibilità WCAG 2.2 AA, prestazioni su rete lenta e comportamento reale del browser.

## 3. Campione di affermazioni normative confrontate con le fonti

**Definizione del conteggio:** il campione manuale è composto da **14 nuclei fattuali distinti**, selezionati per gravità del possibile errore e distribuzione fra le guide; più frasi della stessa materia contano come un solo nucleo. **13 CONFERMATI; 1 AMBIGUO; 0 ERRATI, 0 SUPERATI, 0 NON DIMOSTRATI nel campione scelto.** Questo NON significa zero errori nel sito. Tutte le altre affermazioni non sono state classificate singolarmente: il totale complessivo e la percentuale di affermazioni verificate su tutto il sito **non sono quantificabili** con rigore (nessun inventario completo di proposizioni). Non presentare 13/14 come percentuale di affidabilità generale.

| # | Nucleo esaminato | Classificazione e motivo | Fonte primaria |
|---|---|---|---|
| 1 | Prospetto paga e codice CCNL dal 28/06/2026 | **CONFERMATO** | [Legge 4/1953, Normattiva](https://www.normattiva.it/eli/id/1953/01/27/053U0004/CONSOLIDATED/20260628) |
| 2 | Scaglioni IRPEF 2026: 23/33/43% | **CONFERMATO** | [Camera, Tassazione persone fisiche, luglio 2026](https://temi.camera.it/leg19/temi/19_tl18_irpef) |
| 3 | CIGO: 80% della retribuzione persa, nei massimali | **CONFERMATO** | [INPS, CIGO](https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.50599.cassa-integrazione-guadagni-ordinaria.html) |
| 4 | AOI: conferma nel semestre precedente o nei 120 giorni successivi | **CONFERMATO** | [INPS, Conferma AOI](https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.assegno-ordinario-di-invalidit-richiesta-di-conferma.html) |
| 5 | Integrazione al minimo AOI contributivo 2026 con limiti | **CONFERMATO** | [INPS, comunicazione febbraio 2026](https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.02.invalidit-novit-per-gli-assegni-ordinari.html) |
| 6 | Invalidità civile 74–99%, reddito personale 2026 di 5.852,21 € per assegno mensile | **CONFERMATO** | [INPS, assegno mensile, aggiornato luglio 2026](https://www.inps.it/it/it/dettaglio-approfondimento.schede-informative.assegno-mensile-di-assistenza.html) |
| 7 | ObisM 2026 disponibile dal 30 aprile; certifica importi e ritenute, non versamento bancario | **CONFERMATO** | [INPS, modello ObisM 2026](https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.04.prestazioni-previdenziali-e-assistenziali-online-modello-obism.html) |
| 8 | Anticipata ordinaria 2027/2028 e adeguamenti | **CONFERMATO** | [INPS, circolare 28/2026](https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.2026.03.circolare-numero-28-del-16-03-2026_15199.html) |
| 9 | 35 anni al netto di specifici figurativi nell'AGO per anticipata ordinaria | **CONFERMATO** | [INPS, pensione anticipata](https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.pensione-anticipata-50308.pensione-anticipata.html) |
| 10 | RED non sempre sostituito dal 730, per redditi aggiuntivi rilevanti | **CONFERMATO** | [INPS, RED](https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.la-dichiarazione-della-situazione-reddituale-red--50574.la-dichiarazione-della-situazione-reddituale-red-.html) |
| 11 | Ricorso amministrativo generalmente entro 90 giorni e silenzio-rigetto dal 121° giorno, se ammesso | **CONFERMATO** | [INPS, ricorso pensionistico](https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.ricorso-amministrativo-pensionistico-51189.ricorso-amministrativo-pensionistico.html) |
| 12 | Riesame in autotutela non sospende automaticamente termini | **CONFERMATO** | [INPS, medesima scheda ricorsi](https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.ricorso-amministrativo-pensionistico-51189.ricorso-amministrativo-pensionistico.html) |
| 13 | Sei mesi per ricorso sanitario: data di «emissione» vs «notifica» | **AMBIGUO nelle fonti divulgative INPS**: la scheda riporta «emissione» e la circolare 42/2025 richiama la notifica. La guida avverte di verificare la decorrenza con un legale. | [INPS, ricorso giurisdizionale](https://www.inps.it/it/it/dettaglio-approfondimento.schede-informative.51293.ricorso-giurisdizionale.html), [circolare 42/2025](https://www.inps.it/content/dam/inps-site/it/scorporati/circolari-e-messaggi/2025/02/Circolare_14832/Allegati/15908_Circolare-numero-42-del-17-02-2025.pdf) |
| 14 | Sperimentazione riforma disabilità estesa a Udine nel marzo 2026 | **CONFERMATO** | [INPS, fase sperimentale 2026](https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.03.avviata-la-terza-fase-sperimentale-della-riforma-della-disabilit.html) |

**Fonti indipendenti effettivamente consultate in questo audit:** 14 risorse istituzionali principali (pagine distinte, inclusa la circolare sul ricorso quando esaminata), più W3C WCAG, Google Search Central e web.dev per criteri tecnici. Conteggio delle voci per nuclei, non verifica delle centinaia di link esterni del sito. Data controllo: **14 ottobre 2026**. Fonti menzionate nelle guide, ma non aperte direttamente durante questo audit, rimangono **NON VERIFICATE** in questa passata.

## 4. Problemi, classificazione e correzioni

| Priorità | Rilievo supportato | Classe | Intervento |
|---|---|---|---|
| Alta | PWA: `persist()` poteva fallire per quota/storage, ma `sync()` sovrascriveva l'avviso con «pagine salvate» | **ERRATO** comportamento informativo | **CORRETTO** in `app/main.js`: `storageOk` e avviso finale inequivocabile «NON salvate» |
| Media | Pulsante in Home presentava «Apri app» senza un'azione d'installazione spiegata | **AMBIGUO** UX | **CORRETTO** in Home e `app/index.html`; pulsante «Installa Per Me», proposta browser `beforeinstallprompt` quando disponibile e indicazione menu come alternativa |
| Media | Testi offline potevano suggerire disponibilità permanente | **NON DIMOSTRATO** | **PRECISATO**: serve primo salvataggio online, foto/fonti esterne richiedono rete, dati locali soggetti a eliminazione |
| Media | Sitemap con 11 URL mentre 14 pagine erano segnalate indicizzabili | **SUPERATO** SEO | **CORRETTO**: aggiunte guide Pensioni 06–08, ora 14 URL |
| Media | Contrasto/dimensione pulsanti UIL da uniformare, in alcune regole `min-height:48px` e `font-size:1.03rem` | **AMBIGUO** UX/accessibilità | **CORRETTO nel CSS**: altezza minima 56px, font almeno 1.08rem, colori espliciti su link visitati e focus |
| Media | Rapporto precedente elencava solo 8 guide e 19 pagine operative | **SUPERATO** | **CORRETTO storicamente**: presente V2, il rapporto originale è conservato |
| Aperta | Cinque guide Soldi & Lavoro riportano `noindex` | SEO/decisione editoriale | **NON CAMBIATO**, in attesa di verifica normativa completa prima dell'indicizzazione |
| Alta, aperta | File HTML di 1,2 MB esterno alla navigazione non controllato per dati personali | Privacy | **NON RISOLTO**: controllo dei contenuti e possibile bonifica da valutare; nessuna cancellazione effettuata |
| Media, aperta | La Home pubblica nome e cognome dell'autore, ritratto e **data di nascita completa** | Privacy / minimizzazione | **NON CAMBIATO**: non è automaticamente un illecito, ma merita una decisione esplicita dell'autore sull'opportunità di mantenere la data completa online |
| Alta, aperta | Non risultano test completi reali su 14 guide normative e PWA | Affidabilità | **NON RISOLTO**: richiede inventario delle proposizioni e prove browser/telefono |
| Aperta | Necessità di test HTTP sistematico degli indirizzi HTTP(S) | Qualità fonti | **NON RISOLTO**: link presenti nel sorgente non equivale a disponibilità o prova della citazione |

**Correzioni realmente scritte su GitHub `main`:** `sitemap.xml`, `index.html`, `app/index.html`, `app/main.js`, `app/sw.js`, `app/app.css`, `style.css` e successivamente `monitoraggio.html` (rimando a questo rapporto). Modifiche della PWA senza pubblicazione su store esterni o su siti ChatGPT non collegati.

**Elementi non alterati:** fotografie delle guide 01–08, testimonianza in prima persona, numeri distinti CAF UIL e patronato ITAL UIL. Non sono state introdotte dichiarazioni personali nuove a nome dell'autore.

## 5. Rubrica numerica 0–100 — versione V2, applicabile nel tempo

Ogni voce non verificata prende **0 nel sotto-test corrispondente**, non viene presunta superata. Punteggi assegnati esclusivamente a evidenze documentabili:

| Criterio (peso) | Regole di attribuzione | Prima | Dopo |
|---|---|---:|---:|
| Accuratezza/fonti **30** | 4 presenza fonti, 4 data e territorio, 4 confronto diretto di nuclei principali, **18** copertura di tutte le affermazioni | 12 | 12 |
| Coerenza/organizzazione **15** | 5 struttura/inventario, 5 numerazione e destinazioni locali, 5 coerenza sitemap/indicizzazione con penalizzazione per residui | 10 | 13 |
| Correttezza normativa **15** | 5 distinzione dei procedimenti e limiti, 3 riscontro normativo prioritario, **7** verifica completa delle norme citate | 8 | 8 |
| UX/accessibilità **15** | 5 struttura semantica, 3 CSS/mobile e comandi, **7** prova reale WCAG su dispositivo | 7 | 8 |
| Tecnica/funzionamento **15** | 5 riferimenti locali, 3 sintassi e asset PWA, 2 gestione degli errori e salvataggio (prima 0, dopo 1 dimostrato sul sorgente), **5** prove runtime reali, ancora tutte 0 | 8 | 9 |
| Editoriale **10** | 4 problema/azioni, 3 limiti ed esperienza personale distinta, **3** revisione completa delle ripetizioni e dell'esattezza editoriale | 7 | 7 |
| **TOTALE** | Le regole e la documentazione utilizzate sono identiche nel confronto prima/dopo di questa V2 | **52/100** | **57/100** |

**Nota metodologica:** il criterio tecnico contiene 5+3+2+5=15 punti; il miglioramento 8→9 deriva dalla correzione verificata nel sorgente del feedback di storage (1 dei 2 punti dedicati agli errori), e non da una prova offline sul dispositivo. Questo punteggio rimane un indicatore **provvisorio di verificabilità**, non un voto sulla legalità del sito. Lo storico precedente (55→60) utilizzava sotto-test e perimetro differenti; NON confrontarlo come miglioramento o peggioramento matematico. D'ora in poi usare questa scala V2.

### Punteggi per tutte le 14 guide

Scala derivata V2 per guida: 12 accuratezza/fonti (fonti+data+un riscontro campionario, niente revisione esaustiva), 10 coerenza/navigazione, 8 normativa cautelativa, 8 UX statica, 8 tecnica per metadati/links quando indicizzabile (**6 se noindex**), 7 editoriale = **53 punti**; nessun punteggio per collaudi browser e verifica integrale. La differenza di 2 punti segnala **stato SEO**, non maggiore correttezza delle norme.

| Rubrica | Guida | Stato | Voto V2 |
|---|---|---|---:|
| Lavoro | 01 Leggere la busta paga | Indicizzabile | **53** |
| Lavoro | 02 Dal lordo al netto | `noindex` | **51** |
| Lavoro | 03 Ore, ferie e permessi | `noindex` | **51** |
| Lavoro | 04 Stipendio diminuito | `noindex` | **51** |
| Lavoro | 05 CCNL, livello, superminimo | `noindex` | **51** |
| Lavoro | 06 Cassa integrazione e solidarietà | `noindex` | **51** |
| Pensioni | 01 Prestazione sospesa/respinta | Indicizzabile | **53** |
| Pensioni | 02 AOI: requisiti e conferma | Indicizzabile | **53** |
| Pensioni | 03 AOI e invalidità civile | Indicizzabile | **53** |
| Pensioni | 04 Verbale invalidità e 104 | Indicizzabile | **53** |
| Pensioni | 05 Cedolino, ObisM, arretrati | Indicizzabile | **53** |
| Pensioni | 06 Estratto conto e pensione vicina | Indicizzabile | **53** |
| Pensioni | 07 Redditi e RED | Indicizzabile | **53** |
| Pensioni | 08 Riesame e ricorso | Indicizzabile | **53** |

Il voto per guida è deliberatamente **poco discriminante**: i controlli profondi non completati impediscono oggi una graduatoria attendibile. Un numero alto privo di riscontri frase-per-frase sarebbe fuorviante.

## 6. Priorità residue prima di dichiarare il sito affidabile

1. **Urgente: revisione privacy del file HTML storico da 1,2 MB**, incluse eventuali copie in GitHub history. Non cancellarlo senza esaminarlo, ma non assumere che l'assenza di link lo renda privato. Nella stessa valutazione considerare la **data di nascita completa mostrata nella Home** accanto al nome e al ritratto; non modificarla senza decisione dell'autore.
2. **Fact-check delle 14 guide a livello di singole proposizioni**, con matrice `affermazione → norma vigente → territorio → applicabilità → fonte → esito`, compresi benefici AOI, invalidità, redditi e termini; qualificare tutte le scadenze transitorie.
3. **Test PWA Android e offline**: installazione reale da Home, icona unica, ritorno alla Home del sito, primo sync completo, navigazione in modalità aereo, perdita di memoria e aggiornamento di un articolo. Il codice consente un percorso ma non prova il risultato.
4. **Test WCAG 2.2 AA** con tastiera, zoom 200% e 400%, contrasto calcolato, screen reader e area di tocco, in particolare sulle tabelle su mobile e dentro la PWA.
5. **Controllo link HTTP su tutte le destinazioni esterne** e verifica contenuto della fonte (il solo HTTP 200 non prova l'affermazione).
6. **Decisione SEO sulle cinque guide `noindex`** solo dopo validazione sostanziale, mantenendo `sitemap.xml` coerente e controllando Google Search Console.
7. **Prestazioni**: valutare immagini PNG archiviate di 2 MB e HTML storico da 1,2 MB; non necessariamente impattano sul caricamento della Home se non utilizzati, ma rappresentano materiale pubblicato nel repository.
8. **Controllare che GitHub Pages distribuisca il commit finale**; lo stato Actions certifica la pipeline, non una prova di lettura in browser.

## 7. Stato della pubblicazione e conclusione

La pagina può essere utile come orientamento generale, ma è **ancora in costruzione e non ancora sottoposta a una certificazione completa di correttezza normativa né WCAG/PWA**. Un lettore non dovrebbe decidere da solo di cessare il lavoro, non presentare una domanda, accettare un recupero o lasciar scadere un ricorso basandosi esclusivamente su una guida.

**Non verificato = non superato.** Il prossimo audit con la stessa rubrica V2 deve riportare nuovamente il perimetro e i numeri reali. I commit di correzione e il rapporto V1 sono mantenuti in GitHub per tracciare la storia.
