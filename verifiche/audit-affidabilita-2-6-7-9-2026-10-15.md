# PER ME — Audit di affidabilità: punti 2, 6, 7 e 9

**Data:** 15 ottobre 2026. **Ambito esclusivo:** https://cpcpcp106-coder.github.io/Per-Me/ — GitHub `cpcpcp106-coder/Per-Me`.  
**Metodo:** confronto delle pagine con fonti primarie/istituzionali, lettura del codice, controlli automatici già presenti e ispezione delle immagini conservate nel repository.  
**Esito complessivo:** **PARZIALMENTE VERIFICATO, migliorato e pubblicato nel codice**. *Non è possibile certificare l'intero sito come giuridicamente e clinicamente corretto senza verificare ogni singola affermazione e le eccezioni applicabili. Non assegnare 100/100 per il solo successo dei test.*

## 2. Affidabilità di guide e procedure — PRIORITÀ P1

### Copertura dimostrabile
- L'audit statico ha censito **25 guide** e **38 file HTML** totali (inclusi documenti amministrativi del sito); nessun collegamento interno o ancora assente nelle verifiche automatiche più recenti.
- Il registro `monitoraggio/audit-2026-10-15-fatti.json` passa da **62 a 72 proposizioni campionate confermate**, con link a fonti istituzionali e `fully_exhaustive=false`. **72/72 riguarda soltanto le proposizioni selezionate**, non tutte le 25 guide.
- `monitoraggio/inventario-affermazioni-da-verificare-2026-10-14.json` contiene **476 paragrafi candidati tratti da 14 guide**: sono paragrafi da scomporre in affermazioni, **non 476 affermazioni già validate**. Tale inventario è storico e non include tutte le guide nuove.
- Per ogni dichiarazione su scadenze, rimedi e importi, va distinto l'atto normativo vigente dal servizio online e dalla posizione individuale.

### Fatti ricontrollati con fonte primaria
1. **INPS riesame/ricorso pensionistico:** autotutela non sospende automaticamente i termini; ricorso amministrativo in generale entro 90 giorni, con alcune specificità a 30 giorni per Gestione Dipendenti Pubblici. <https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.ricorso-amministrativo-pensionistico-51189.ricorso-amministrativo-pensionistico.html>.
2. **Riforma disabilità:** provincia di Udine inserita nella terza fase sperimentale dal 1° marzo 2026. <https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.03.avviata-la-terza-fase-sperimentale-della-riforma-della-disabilit.html>.
3. **ISEE corrente:** ISEE ordinario valido necessario; variazione reddituale complessiva superiore al 25% come una delle alternative; patrimoni oltre il 20% a partire dal 1° aprile; ultime due mensilità ammesse solo per casi specifici. <https://www.lavoro.gov.it/strumenti-e-servizi/isee-istruzioni-2026>.
4. **Bonus sociali 2026:** ARERA 9.796 euro soglia ordinaria e 20.000 euro per nuclei con almeno quattro figli a carico; bonus rifiuti 25%. <https://www.arera.it/comunicati-stampa/dettaglio/bonus-sociali-arera-alza-a-9796-euro-la-soglia-isee-per-laccesso-alle-agevolazioni-per-acqua-luce-gas-e-rifiuti>.
5. **Contratto forniture dirette:** intestazione a componente dello stesso nucleo ISEE fra i requisiti per bonus economico elettrico/gas/idrico. <https://www.arera.it/consumatori/bonus-sociale/bonus-sociale-per-disagio-economico/quali-sono-i-requisiti>.
6. **Disagio fisico:** bonus elettrico separato, in relazione alla necessità di apparecchiature elettromedicali salvavita previste, non automatico per la mera invalidità. <https://www.arera.it/consumatori/bonus-sociale/bonus-per-gravi-condizioni-di-salute/quali-sono-i-requisiti-per-accedere-al-bonus-per-disagio-fisico>.
7. **Rottamazione enti territoriali:** finestra prevista 16 ottobre–15 dicembre 2026, subordinata all'adesione dell'ente e all'ammissibilità del carico; l'apertura effettiva del modulo al 16 ottobre non è attestata il 15. <https://www.agenziaentrateriscossione.gov.it/it/il-gruppo/lagenzia-comunica/novita/Legge-n.-113-2026-piu-tempo-per-la-Rottamazione-degli-enti-territoriali/>.

**Rischi ancora aperti:** scadenze processuali e tutte le eccezioni 2026, eventuali atti successivi, fattispecie individuali, controlli professionali indipendenti e affermazioni non ancora campionate. Nessun termine personale può essere calcolato senza il documento notificato.

### Intervento eseguito
Ampliato il registro da 62 a **72** con dieci proposizioni verificate su ISEE, ARERA e informazioni sanitarie generali, ciascuna con fonte. Non sono stati trasformati i paragrafi non verificati in affermazioni `CONFERMATO`.

## 6. SEO e Google — PRIORITÀ P2

- Ultimo controllo statico disponibile: **26 pagine dichiarate indicizzabili e 26 URL nella sitemap**, corrispondenza esatta; nessun canonical o meta-description mancante fra le pagine indicizzabili; nessuna immagine senza attributo `alt`.
- `noindex` sulle rubriche cliniche ancora in costruzione e sulle nuove guide con revisione professionale da completare è **intenzionale**. Non rimuovere `noindex` soltanto per accrescere il numero di URL.
- La presenza dei tag, della sitemap e di un file di verifica Google **non** dimostra indicizzazione effettiva. Google segnala che la sitemap è un suggerimento, non una garanzia.
- L'accesso in questa sessione al profilo Search Console tramite l'integrazione GSC Wizard non è disponibile: il provider restituisce `payment_required`. Non acquistare abbonamenti o dichiarare valori di indicizzazione non letti.
- **Intervento richiesto all'utente:** consultazione authenticated della Search Console per lo stato delle pagine e screenshot, solo per la porzione non accessibile dagli strumenti disponibili. Gli aspetti tecnici restano in carico allo sviluppo.

**Correzione:** testo di spiegazione del pulsante app nella Home riportato a circa 17 px di base e interlinea 1,5 dopo una regressione che lo aveva riportato a 13 px. Commit `58c2826d3167ec55c234a5bb461955dc4a575f02`.

Fonti Google: <https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=it>, <https://developers.google.com/search/docs/crawling-indexing/block-indexing?hl=it>.

## 7. Fotografie, immagini, diritti e pertinenza — PRIORITÀ P2

### Ispezione visiva effettuata
Le nove fotografie della rubrica Debiti 01–09 sono state ispezionate singolarmente dai blob WebP del repository: consegna notifica alla porta, consultazione online in biblioteca, archivio documenti, spesa alimentare, avvisi comunali esterni, auto ferma, lettura dei contatori, panorama dal balcone, colloquio con consulente. **Sono nove composizioni differenti, fotorealistiche e tematicamente pertinenti**; il controllo non certifica provenienza/licenza di ogni file.

Le otto fotografie della rubrica Pensione 01–08 sono state ispezionate; **alcune ricorrono alla composizione persona-fogli-scrivania-interno**, pur non essendo copie identiche. La varietà potrebbe essere migliorata scegliendo scene più diverse, senza riutilizzare immagini delle altre guide.

### Problema sostanziale individuato e corretto
- `assets/pensione-guida-01.jpg` rappresenta insegne/simboli che sembrano di un ufficio INPS e modulistica ricostruita, pur non essendo una foto-documentazione ufficiale.
- `assets/pensione-guida-02.jpg` mostra un foglio con simbolo apparentemente INPS.
- **Correzione:** le didascalie delle due pagine ora precisano chiaramente che si tratta di scene ricostruite e moduli non autentici: `inps-prestazione-sospesa-respinta-cosa-fare.html` e `assegno-ordinario-invalidita-requisiti-conferma.html`.

### Licenze e prestazioni
- La foto esterna Unsplash della Guida ISEE e la foto esterna Pexels della Guida bonus sono accompagnate da attribuzione. Le **licenze generali** pubblicate dai rispettivi servizi consentono l'impiego in un blog con condizioni; non è stata documentata qui una catena di licenza per ogni asset fotografico locale. <https://unsplash.com/it/licenza>, <https://www.pexels.com/it-it/license/>.
- L'audit HTTP di un precedente ciclo restituisce risposta 401/limitazioni automatiche ad alcuni link a fotografie; **un blocco del robot non dimostra che il link non funzioni sul telefono**.
- Le nove immagini delle Guide Debiti sono WebP distinti (circa 63–144 kB). La rubrica Debiti ha anche una grande immagine PNG di fallback, ma nella Home rubrica viene preferito il sorgente WebP mediante `<picture><source type="image/webp">`; non è un carico obbligatorio di 2 MB nei browser moderni.
- Testi alternativi presenti per tutte le immagini censite; non valutata l'autenticità documentale di ogni singola foto oltre ai due casi corretti.

**Prossimo miglioramento:** scene più differenziate nella Rubrica Pensioni, con verifica licenze/provenienza prima di sostituzioni, e analisi prestazionale reale.

## 9. Salute, diabete, cardiopatia, alimentazione — PRIORITÀ P2

### Progetto e sicurezza
La Rubrica 05 prevedeva solo una presentazione. Realizzata e collegata la prima guida organizzativa:
`salute-guida-01-preparare-visita.html` — **«Diabete e cuore: come preparare un controllo medico»**.
La pagina aiuta a preparare documenti, elenco farmaci, sintomi, referti e domande; descrive senza dosaggi o soglie universali i temi da discutere con curanti, e distingue educazione sanitaria da prescrizione. Include collegamenti a diabete tipo 2, prevenzione delle complicanze, cuore e tabelle nutrizionali, con fonti istituzionali.

**Sicurezza editoriale:** `meta robots=noindex,follow` fino a revisione sanitaria professionale; accessibile dalla rubrica e dall'app dopo sincronizzazione online, perché la PWA importa i testi delle pagine collegate. Non è proposta alcuna modifica autonoma a insulina, farmaci cardiaci o trattamento di emergenze.

Fonti consultate:
- Ministero della Salute: <https://www.salute.gov.it/new/it/tema/diabete/diabete-mellito-tipo-2/>.
- ISS EpiCentro: <https://www.epicentro.iss.it/igea/diabete/>.
- Ministero della Salute sulle malattie cardiocerebrovascolari: <https://www.salute.gov.it/new/it/faq/faq-malattie-cardio-cerebrovascolari/>.
- CREA Linee guida 2018: <https://www.crea.gov.it/web/alimenti-e-nutrizione/-/linee-guida-per-una-sana-alimentazione-2018>.
- CREA Tabelle alimenti: <https://www.crea.gov.it/en/-/tabella-di-composizione-degli-alimenti>.

**Mancano ancora:** guide cliniche specifiche validate, ricette effettive con pesi crudi/cotti e carboidrati calcolati da dati CREA, revisione specialistica di soglie cliniche o procedure sanitarie individuali. Non dichiarare il contenuto clinico completo.

## Problema aggiuntivo: affidabilità dei workflow

Durante il controllo dei punti 2/6/7/9, le azioni browser riuscivano nei test ma talvolta fallivano nel passo finale `git pull --rebase origin main` a causa di conflitti sui rapporti JSON che altri workflow aggiornano quasi contemporaneamente.

**Riparazione:** introdotto `monitoraggio/pubblica_report.sh`, che conserva i report generati in uno spazio temporaneo, ricarica il `main` corrente e prova fino a cinque invii **senza force push né rebase di report precedenti**. Richiamato da:
- `.github/workflows/audit-statico.yml`;
- `.github/workflows/collaudo-browser.yml`.

I due workflow conservano limitazione su `main` e concorrenza condivisa. I fallimenti storici restano tracciati; un errore di salvataggio non è un risultato negativo del test contenutistico, ma è un problema di affidabilità che deve essere riparato.

**Ultimi controlli automatici disponibili prima della pubblicazione di questo documento:** 16 test browser PASS su 16, nessuna violazione axe o errore di pagina registrati; 33 pagine scaricate nell'archivio testuale offline Chromium (non su Android reale); 25 guide censite; 26/26 URL nella sitemap; nessun link interno mancante.

## Distinzione finale degli stati e giudizio

| Ambito | Stato |
| --- | --- |
| Codice dei correttivi, guida salute e registro delle 72 proposizioni | **Commit su `main` effettuati** |
| Test statici e browser sulle modifiche pertinenti | **Passati nelle esecuzioni specificate; da riaccertare dopo ulteriori commit** |
| Google Search Console: stato effettivo delle pagine | **NON VERIFICATO** per assenza di accesso al report autenticato |
| Fotografie Debiti (varietà visuale) | **VERIFICATA** per nove immagini |
| Autenticità moduli INPS nell'illustrazione 01–02 | **Problema comunicativo corretto con didascalie** |
| Affidabilità giuridica di tutte le 25 guide, ogni proposizione | **NON ESAUSTIVA**; 72 proposizioni campionate confermate |
| Revisione clinica specialistica e conformità WCAG umana | **NON ESEGUITE** |
| Punteggio 100/100 | **NON ATTRIBUIBILE** |

**Resta valido il punteggio storico provvisorio di 70/100 fino alla ricalibrazione completa**, senza confondere attività svolte e punti dimostrati.

**Unico prossimo intervento prioritario per qualità dei contenuti:** scomporre e verificare tutte le indicazioni giuridiche ad alto rischio (termini, perdita di diritti, pagamenti e scadenze) confrontandole con testi vigenti e procedure ufficiali. La verifica tecnica delle nuove run di CI va fatta dopo i commit.
