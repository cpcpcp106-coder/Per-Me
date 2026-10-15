# PER ME — RAPPORTO DI AUDIT E QUALITÀ

> **Aggiornamento vincolante del 15 ottobre 2026:** le precedenti indicazioni di mantenere blocchi di indicizzazione sono superate dalla richiesta di Enrico. Tutte le pagine pubbliche del sito e dell’app devono consentire `index,follow`. Le descrizioni sottostanti documentano lo stato storico e non autorizzano a ripristinare i blocchi. Vedi [regola vigente](../REGOLE-AGGIORNAMENTO-APP-E-SITO.md#indicizzazione-delle-pagine-pubbliche).

**Data:** 14 ottobre 2026 · **Oggetto:** https://cpcpcp106-coder.github.io/Per-Me/ · **Stato:** audit strutturale esteso e fact-check normativo CAMPIONARIO, non certificazione integrale.

## 1. Perimetro e metodo
Analizzato l'albero del repository pubblico cpcpcp106-coder/Per-Me (branch main), letto il sorgente di tutte le 19 pagine HTML operative e analizzati staticamente tutti i riferimenti `href`, ancore, `img src`, titoli H1, metadati e alt. Otto file rappresentano guide operative. Consultata via web la Home pubblicata; lo strumento di navigazione non ha consentito la lettura delle altre pagine GitHub Pages. Per esse si è analizzato il codice sorgente in GitHub. Ispezionati `app/index.html`, `app/main.js`, `app/sw.js`, `app/manifest.webmanifest` e `app-content.json`. Non sono stati eseguiti veri test su smartphone, installazione, offline con rete disattivata, Lighthouse, axe o console browser.

### Inventario esaustivo dei 19 file HTML operativi
1. `index.html` — Home
2. `soldi-lavoro.html` — rubrica 01
3. `pensione-invalidita.html` — rubrica 02
4. `debiti-cartelle.html` — rubrica 03, in preparazione
5. `agevolazioni-diritti.html` — rubrica 04, in preparazione
6. `salute-autonomia.html` — rubrica 05, in preparazione
7. `tutor-ai.html` — rubrica 06, in preparazione
8. `come-leggere-busta-paga.html` — lavoro guida 01
9. `dal-lordo-al-netto.html` — lavoro guida 02
10. `ore-ferie-permessi-malattia-straordinari.html` — lavoro guida 03
11. `stipendio-diminuito-cosa-controllare.html` — lavoro guida 04
12. `ccnl-inquadramento-livello-superminimo.html` — lavoro guida 05
13. `controllare-cedolino-cassa-integrazione-solidarieta.html` — lavoro guida 06
14. `inps-prestazione-sospesa-respinta-cosa-fare.html` — pensione guida 01
15. `assegno-ordinario-invalidita-requisiti-conferma.html` — pensione guida 02
16. `metodo.html` — metodo editoriale
17. `monitoraggio.html` — monitoraggio
18. `chi-siamo.html` — progetto
19. `app/index.html` — interfaccia PWA

Nota: il repository contiene anche `Riprendi progetto blog.html` (circa 1,2 MB), non integrato nell'architettura di navigazione ordinaria; contenuto non ispezionato a causa dei limiti di restituzione del file, richiede verifica di eventuali informazioni private prima di decidere se mantenerlo pubblico.

### Misure verificabili
- 19/19 file HTML operativi analizzati mediante controllo statico; 8/8 guide con lettura iniziale del sorgente e della struttura.
- 0/8 guide completamente sottoposte a inventario di **tutte** le affermazioni e a riscontro individuale con fonte primaria: verifica normativa campionaria, NON esaustiva.
- **Prima delle correzioni:** 468 riferimenti `href` HTML: 349 locali e 119 esterni/azioni. **Dopo le correzioni:** 471 riferimenti `href`: 351 locali e 120 esterni/azioni. Nel controllo statico iniziale nessun file/ancora locale assente; i nuovi riferimenti puntano a una pagina esistente nel repository o al rapporto GitHub. NON si tratta di 351 test HTTP/browser riusciti. La maggioranza delle destinazioni esterne/non HTTP NON è stata provata: non è corretto indicarle tutte come funzionanti.
- 19 tag `img` nei file HTML operativi; 0 file immagine mancanti e 0 attributi `alt` mancanti nel controllo statico. Questo non certifica appropriatezza semantica delle alternative testuali o caricamento reale.
- 19/19 pagine con un H1 e un link «salta al contenuto» riconosciuti staticamente.
- Prima degli interventi: 17/19 pagine con `noindex`; dopo: 18/19. L'unica esclusa è `app/index.html`; scelta di non indicizzare temporaneamente il sito principale mantenuta intenzionalmente finché l'audit non è concluso.
- Prima: 3 pagine senza `meta description`; dopo: 0, sulla base del codice aggiornato.
- Affermazioni fattuali: catalogazione completa NON effettuata; il totale reale e la percentuale verificata non sono quantificabili. Non è lecito utilizzare l'assenza di errori nel campione come assenza di errori nel sito.

## 2. Riscontri normativi, ottobre 2026
**CONFERMATO su campione:**
1. Obbligo e contenuto del prospetto paga, incluso codice alfanumerico unico del CCNL applicato dal testo vigente dal 28 giugno 2026: legge 4/1953, art. 1, Normattiva: https://www.normattiva.it/eli/id/1953/01/27/053U0004/CONSOLIDATED/20260628
2. IRPEF ordinaria 2026: 23% fino a 28.000 euro, 33% da 28.000 a 50.000 euro, 43% oltre: Camera dei deputati: https://temi.camera.it/leg19/temi/19_tl18_irpef
3. CIGO: misura generale pari all'80% della retribuzione persa entro massimali e condizioni specifiche, non 80% del vecchio netto: https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.50599.cassa-integrazione-guadagni-ordinaria.html
4. Massimali 2026: circolare INPS n. 4/2026: https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.01.integrazione-salariale-assegni-disoccupazione-e-fondi-importi-2026.html
5. AOI: capacità lavorativa ridotta a meno di un terzo, 5 anni di contribuzione di cui 3 negli ultimi 5, durata triennale: https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.assegno-ordinario-di-invalidit-per-persone-con-capacit-lavorativa-ridotta-50294.assegno-ordinario-di-invalidit-per-persone-con-capacit-lavorativa-ridotta.html
6. AOI: conferma nei 6 mesi prima della scadenza o entro 120 giorni dopo, con diverso effetto sulla decorrenza: https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.assegno-ordinario-di-invalidit-richiesta-di-conferma.html
7. Dal 2026 integrazione al minimo per alcuni AOI interamente contributivi a certe condizioni, in applicazione della sentenza Corte costituzionale 94/2025 e circolare INPS 20/2026: https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.02.invalidit-novit-per-gli-assegni-ordinari.html
8. Ricorso amministrativo pensionistico: termine generale di 90 giorni, eccezioni di 30 giorni, riesame non sospensivo dei termini: https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.ricorso-amministrativo-pensionistico-51189.ricorso-amministrativo-pensionistico.html
9. Sperimentazione riforma disabilità dal 1° marzo 2026 estesa anche a Udine e Pordenone: https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.03.avviata-la-terza-fase-sperimentale-della-riforma-della-disabilit.html

**Recapiti CAF e patronato:** controllate entrambe le pagine ufficiali di sedi, raggiungibili il 14 ottobre 2026. Il Patronato ITAL UIL Tarcento conferma telefono **0432 782024**, Via Dante Alighieri 27: https://www.italuil.it/jsps/233/ALTRE_VOCI/234/Sedi_IT.jsp?regioni=6 . Il CAF UIL Tarcento ha telefono **0432 785746** e sede in Via Dante 27 secondo il prospetto sedi ARDiS/CAF UIL FVG: https://ardis.fvg.it/upload/news/1753696924.pdf . La pagina ufficiale CAF UIL permette di cercare le sedi: https://extranet.cafuil.it/sediuil/sedi.asp . I due collegamenti sono stati aperti e il contenuto pertinente controllato; gli orari sono soggetti a variazioni.

Questi 9 nuclei tematici sono stati confrontati con fonti primarie disponibili alla data dell'audit. **ERRATO, SUPERATO o NON DIMOSTRATO** non possono essere quantificati sull'intero sito: non sono state classificate tutte le singole affermazioni. La falsa destinazione del pulsante in Home è invece un errore editoriale/navigazionale accertato, non una falsa norma.

## 3. Problemi, gravità, stato
| Gravità | Problema provato | Stato |
| --- | --- | --- |
| Alta | PWA: sincronizzazione sommava nuovi articoli al catalogo vecchio, senza rimuovere i documenti rimossi dall'indice; per quelli temporaneamente irraggiungibili nessuna segnalazione di obsolescenza | Codice corretto; test funzionale reale pendente |
| Media | Home: «Leggi la prima guida» apriva la guida 06 e non la 01 | Corretto su branch main |
| Media | Service worker: cache-first per risorse dell'app, potenziale permanenza di file statici vecchi fino a cambio versione del service worker | Passaggio a network-first con fallback e versione cache 3; test reale pendente |
| Media | Informazione sull'uso offline insufficiente: prima installazione e aggiornamenti online non distinti con chiarezza | Testi aggiornati in Home e interfaccia app |
| Media | «Tutor AI essenziale» indicizzabile mentre altri contenuti erano marcati `noindex` | Allineato all'avviso in costruzione |
| Bassa | Assenza di descrizione meta in guida CIG, monitoraggio e Tutor AI | Corretto |
| Aperto | Quattro rubriche su sei senza guide operative, espressamente indicate come «in preparazione» | Nessuna guida inventata o pubblicata |
| Aperto | Tutte le affermazioni normative, i 119 link esterni/azioni, WCAG 2.2, velocità, installazione Android, comportamento offline e cronologia della cache non verificati end-to-end | Richiedono audit aggiuntivi e prove browser/dispositivo |
| Aperto | `app-content.json` contiene testi legacy, tra cui «Il tuo cedolino è corretto?», ma la PWA in `app/` usa in realtà estrazione delle pagine HTML | File storico conservato, da rivedere prima di riutilizzarlo |
| Aperto | File HTML non navigato da 1,2 MB nel repository pubblico: contenuto non ispezionabile con il mezzo utilizzato | Potenziale esposizione da valutare; nessuna cancellazione non autorizzata |
| Aperto | Immagini PNG di diversi megabyte nel repository: possibile impatto sulle prestazioni di alcune guide | Compressione e test non effettuati |
| Aperto | Installabilità Chromium/Android con icone SVG e un'unica istanza riconoscibile | Manifest ispezionato; prova sul telefono non eseguita |
| Bassa | In Monitoraggio mancava un collegamento al rapporto integrale di audit | Corretto: collegato il presente rapporto; resta distinto dal monitoraggio automatico |

## 4. Correzioni effettuate nel repository
- `index.html`: collegamento iniziale guida 01, messaggio online/offline comprensibile e dicitura di accesso all'app non equivalente a download istantaneo.
- `app/main.js`: catalogo ricostruito a ogni sincronizzazione; copie non aggiornabili segnalate come `stale`, invece di essere silenziosamente considerate attuali.
- `app/index.html`: interfaccia aggiornata, inclusa segnalazione di pagina da verificare; versioni v3 dei file statici.
- `app/sw.js`: cache `perme-reader-v3-20261014`; politica network-first per le risorse dell'app, cache fallback quando offline.
- `tutor-ai.html`, `controllare-cedolino-cassa-integrazione-solidarieta.html`, `monitoraggio.html`: correzioni di metadati e indicizzazione.

Tali modifiche sono state scritte direttamente su `main` attraverso GitHub; il sorgente è stato riletto dopo i principali interventi, con verifica della sintassi JavaScript di `app/main.js` e `app/sw.js`. La pubblicazione effettiva tramite GitHub Pages e la resa nei browser non sono dimostrate da questo controllo.

## 5. Rubrica numerica provvisoria
La scala è 0–100, suddivisa come richiesto: accuratezza/fonti 30; organizzazione 15; normativa 15; UX/accessibilità 15; tecnica 15; editoriale 10. *La stima misura la qualità dimostrata dai test disponibili, non la piena attendibilità del sito.*

- Accuratezza (30): 4 data/fonti indicate, 4 fonti primarie presenti, 4 riscontri campionari, 18 inventario completo delle dichiarazioni (0) = **12/30**.
- Coerenza (15): 5 numerazione, 5 riferimenti locali, 5 primo collegamento coerente = **10/15 prima; 15/15 dopo**.
- Normativa (15): 5 distinzioni/avvertenze, 3 riscontri su campione, 7 verifica di tutte le regole (0) = **8/15**.
- UX/accessibilità (15): 5 marcatori strutturali, 3 segnali CSS/viewport, 7 prova WCAG con browser (0) = **8/15**.
- Tecnica (15): 5 integrità link locali, 3 sintassi dei file JavaScript, 7 prova runtime/installa/offline (0) = **8/15**.
- Editoriale (10): 5 azioni comprensibili, 4 avvertenze e distinzione esperienza/regole, 1 controllo completo duplicazioni (0) = **9/10**.

**Punteggio iniziale: 55/100. Punteggio dopo le correzioni: 60/100, PROVVISORIO.** Non è un indice di sicurezza giuridica e può scendere dopo ulteriori controlli. I punti non verificati sono zero, non considerati superati.

### Voti provvisori per singola guida
Applicazione di un indicatore più conservativo: 4 pt data di controllo, 4 pt almeno due riferimenti istituzionali, 4 pt riscontro diretto di almeno una regola specifica (0 altrimenti), 15 pt collocazione/numerazione/link locali, 5 pt avvertenze normative, 5 pt ulteriore riscontro normativo (0 se assente), 8 pt HTML semantico/viewport/skip, 8 pt immagine e link staticamente risolti, 10 pt organizzazione procedurale e avvertenze. Tutti i punti per controllo completo delle dichiarazioni e test runtime sono trattenuti; punteggi non sommabili al voto globale.

| Rubrica | Guida | Punteggio provvisorio | Verifica fattuale |
| --- | --- | ---: | --- |
| Lavoro | 01 — Leggere la busta paga | 63/100 | Legge 4/1953, campione |
| Lavoro | 02 — Dal lordo al netto | 63/100 | IRPEF 2026, campione |
| Lavoro | 03 — Ore, ferie e malattia | 54/100 | Non ancora riscontrata in dettaglio |
| Lavoro | 04 — Stipendio diminuito | 63/100 | Legge 4/1953, campione |
| Lavoro | 05 — CCNL e superminimo | 63/100 | Obbligo codice CCNL, campione |
| Lavoro | 06 — CIG e solidarietà | 63/100 | CIGO e massimali, campione |
| Pensioni | 01 — Prestazione INPS sospesa/respinta | 63/100 | Ricorsi e riforma disabilità, campione |
| Pensioni | 02 — Assegno ordinario invalidità | 63/100 | Requisiti, conferma e novità 2026, campione |

I voti per guida non sono graduatorie qualitative affidabili: differenze significano soprattutto **quali riscontri sono stati eseguiti**, non che una guida sia intrinsecamente più corretta di un'altra.

## 6. Fonti per accessibilità
W3C, WCAG 2.2 — contrasto minimo: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html ; modifiche WCAG 2.2: https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/ . Fonte italiana AgID: https://www.agid.gov.it/it/design-servizi/accessibilita/linee-guida-accessibilita-pa . La conformità non è certificata con la sola presenza di tag, viewport e colori.

## 7. Rischi residui e priorità
**Rischio maggiore:** il lettore può prendere decisioni su termini di impugnazione, pensioni o buste paga usando una guida non interamente verificata. Le avvertenze non sostituiscono la validazione delle singole frasi. La copia offline può essere vecchia o essere eliminata dalla memoria del dispositivo; non garantire permanenza indefinita. I riferimenti esterni non sono stati testati uno per uno. Alcuni file pubblici richiedono ispezione per privacy.

**Ordine prima della pubblicazione affidabile:** (1) inventario di tutte le affermazioni e confronto uno-a-uno con fonte e data; (2) revisione di tutte le scadenze/procedure secondo la gestione e il territorio; (3) verifica di tutti i link esterni e recapiti CAF/patronato; (4) test Android Chrome/Samsung Internet online/offline, aggiornamento PWA e installazione; (5) test WCAG 2.2 AA, dimensioni dei testi, contrasto e navigazione tastiera; (6) performance; (7) revisione del file HTML non navigato, privacy e politica SEO; (8) ricalcolo dei voti con copertura piena e regression test.

**Storico:** il documento è versionato in GitHub. Ogni successivo audit dovrà annotare commit/versione, inventario, affermazioni verificate con riferimenti, test eseguiti, correzioni, score e regressioni. **Non rimuovere il banner «In costruzione» né il noindex generale sulla sola base di questo audit.**
