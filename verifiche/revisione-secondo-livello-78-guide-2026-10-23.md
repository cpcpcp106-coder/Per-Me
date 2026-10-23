# Per Me — Revisione di secondo livello delle 78 guide
**Data di controllo:** 23 ottobre 2026. **Metodo:** lettura del contenuto sorgente e controllo di struttura, fonti, rischi e affermazioni ad alto impatto, con confronti documentali selettivi. Questo è un audit editoriale **non** un parere professionale, una verifica esaustiva di ogni frase o una certificazione esterna.

## 1. Perimetro effettivamente controllato
Al 23 ottobre, il ramo `main` presenta **78 guide / approfondimenti HTML**: 30 Diabete tipo 2, 5 Dieta mediterranea, 6 Tutor AI, 4 Salute e autonomia, 9 Debiti, 10 Agevolazioni nazionali e FVG, 14 Soldi/lavoro/pensione. Sono stati recuperati e letti tutti i 78 file per riconoscere struttura, riferimenti esterni, titoli, presenza dei componenti condivisi e aree di rischio. La ricetta con foto e valori per porzione è un contenuto aggiuntivo, non incluso nelle 78.

Per le guide cliniche e per i provvedimenti legali/previdenziali la verifica di secondo livello ha confrontato **specifiche affermazioni selezionate** con fonti ufficiali aggiornate; questo non prova l'esattezza di ogni singola affermazione contenuta nei 78 file, né di ogni pagina esterna citata.

Non ci sono nuove guide inventate per aumentare il numero di pubblicazioni.

## 2. Riscontri documentali di secondo livello

| Area verificata | Risultato del confronto | Stato |
| --- | --- | --- |
| **Riscossione e pignoramento stipendio** | Art. 171 D.Lgs. 33/2025, con efficacia dal 1° gennaio 2026: 1/10 fino a 2.500 €, 1/7 oltre 2.500 e fino a 5.000 €, riferimento a art. 545 c.p.c. sopra 5.000 €. Concorde con Guida Debiti 06; non applicare tali frazioni agli altri tipi di creditore. | **Confermato sui punti controllati, senza modifica** |
| **Pignorabilità pensioni/conto nel 2026** | INPS: assegno sociale mensile 546,24 €; doppio 1.092,48 € e triplo 1.638,72 €. Le soglie matematiche riportate nella guida sono coerenti. Altri vincoli, rapporti bancari e cumuli richiedono valutazione individuale. | **Confermato sui punti controllati** |
| **AOI: requisiti, durata e rinnovo** | INPS: validità tre anni, domanda di conferma nel semestre precedente o nei 120 giorni successivi; dopo tre riconoscimenti consecutivi opera conferma automatica salvo revisione. INPS 2026 conferma le novità sull'integrazione al minimo degli assegni contributivi introdotte da sentenza 94/2025 e circolare 20/2026. | **Confermato sui punti controllati** |
| **Ricorsi per invalidità civile** | INPS descrive i sei mesi per la tutela giurisdizionale; le pagine divulgative e i riferimenti normativi presentano formulazioni non perfettamente identiche della decorrenza. Nelle nuove province sperimentali (inclusa Udine dal 1° marzo 2026) il percorso di base è cambiato; un termine non deve essere applicato senza identificare il provvedimento. | **Chiarimento editoriale eseguito** |
| **Assegno unico 18–21 anni** | L'art. 2 D.Lgs. 230/2021 elenca il limite di 8.000 € in corrispondenza della condizione di tirocinio o lavoro; la scheda riassuntiva INPS usa una formulazione che estende grammaticalmente il requisito alla serie di condizioni. La guida già corretta mostra questa difformità e non promette né nega il diritto nei casi dubbi. | **Correzione del primo audit mantenuta; non reinterpretare senza fonte ufficiale inequivoca** |
| **Patrocinio statale** | Decreto 22 aprile 2025, GU 11 luglio 2025: limite ordinario di reddito 13.659,64 €; le regole sui redditi dei conviventi e sulle eccezioni sono distinte dall'ISEE. | **Confermato sui punti controllati** |
| **Sostegno affitto genitori separati** | MIT conferma finestra dalle ore 12 del 7/10/2026 alle ore 12 del 28/10/2026; contributo fino al 50% dei canoni e 6.000 € annui nei limiti del bando. Non è una misura generale per tutti gli inquilini. La guida deve essere aggiornata a scadenza avvenuta, salvo proroghe ufficiali. | **Confermato oggi; monitorare la data di fine** |
| **Trasporti FVG** | Regione: agevolazione invalidità al 1,5% del prezzo ordinario per le categorie ammesse, su istanza telematica; distinto il regime over 65 con sconto del 50% per abbonamenti semestrali/annuali ammessi. La guida specifica entrambi senza estendere la misura automaticamente fuori regione. | **Confermato sui punti controllati** |
| **Ticket ASUFC/FVG** | ASUFC: codici E01–E04, per E02 autocertificazione annuale con termine 31 dicembre dell'anno di emissione; gli altri codici seguono regole proprie. L'esenzione per patologia o invalidità deve essere correttamente registrata e riportata sulla ricetta nei casi pertinenti. | **Confermato sui punti controllati** |
| **Dopo infarto, stent o bypass** | ACC/AHA 2025: dopo sindrome coronarica acuta, DAPT di norma almeno 12 mesi senza alto rischio emorragico; AHA/ACC 2026 e ESC distinguono aspirina a lungo termine dopo bypass, e regimi selezionati secondo rischi. | **Confermato il chiarimento già pubblicato; nessuna modifica terapeutica individuale** |
| **Dieta, carboidrati e foto ricette** | Restano separati grammi, millilitri, pesi cotti/crudi e nutrienti per porzione. La ricetta pubblicata usa quattro fonti CREA con 36,1 g carboidrati disponibili e 287 kcal stimati per porzione, foto AI originale chiaramente illustrativa. | **Verifica già documentata: non duplicata** |
| **Tutor AI e Facebook** | La maggior parte delle pagine non contiene un URL Facebook scritto direttamente nell'HTML: lo inserisce il componente `gradimento.js` quando caricato. `scripts/controlla-facebook-guide.cjs` verifica il componente condiviso su tutte le guide presenti. | **Nessun difetto del link statico; rafforzato controllo automatico** |

## 3. Interventi tecnici/editoriali effettivamente eseguiti in questa seconda revisione

1. **Guide ricorsi INPS:** in `riesame-ricorso-inps-termini.html` ampliato il passaggio sulla riforma sperimentale 2026, ora con riferimento diretto alla notizia INPS del 12/03/2026; chiarito che il certificato medico introduttivo avvia le nuove valutazioni di base nelle province sperimentali, non la domanda di AOI. Esplicitato che la tutela del singolo provvedimento va valutata per data, tipo di atto e regime transitorio. Nessun termine giudiziario automatico proposto.
2. **Controllo Facebook continuativo:** `.github/workflows/audit-editoriale-integrale.yml` esegue ora anche `node scripts/controlla-facebook-guide.cjs`, con trigger su nuove guide, `gradimento.js`, catalogo e script. Questo presidia automaticamente la presenza del collegamento condiviso nelle guide, anche quando esso non compare nell'HTML statico.
3. **Precedenti correzioni di primo livello confermate:** nella guida AUU maggiore precisione della soglia di reddito; nella guida cardiologica maggior chiarezza sugli antiaggreganti. Non vengono dichiarate come correzioni appena eseguite.

## 4. Fonti ufficiali confrontate nel controllo approfondito
- MEF, D.Lgs. 33/2025 art. 171: https://def.finanze.it/DocTribFrontend/getAttoNormativoDetail.do?ACTION=getArticolo&codiceOrdinamento=0000000000001710000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000&id=%7B656DFD1E-F9EF-4BDA-B1F3-60EDE4E903B7%7D
- Agenzia delle Entrate-Riscossione, procedure esecutive: https://www.agenziaentrateriscossione.gov.it/it/Per-saperne-di-piu/le-procedure/procedure-esecutive/
- INPS, assegno sociale 2026: https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.assegno-sociale-50184.assegno-sociale.html
- INPS, AOI: https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.assegno-ordinario-di-invalidit-per-persone-con-capacit-lavorativa-ridotta-50294.assegno-ordinario-di-invalidit-per-persone-con-capacit-lavorativa-ridotta.html
- INPS, riforma 1° marzo 2026: https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.03.avviata-la-terza-fase-sperimentale-della-riforma-della-disabilit.html
- INPS, ricorso giurisdizionale: https://www.inps.it/it/it/dettaglio-approfondimento.schede-informative.51293.ricorso-giurisdizionale.html
- INPS, assegno unico: https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.assegno-unico-e-universale-per-i-figli-a-carico-55984.assegno-unico-e-universale-per-i-figli-a-carico.html
- Normattiva, D.Lgs. 230/2021 art. 2: https://www.normattiva.it/atto/caricaDettaglioAtto?atto.codiceRedazionale=21G00252&atto.dataPubblicazioneGazzetta=2021-12-30&tipoDettaglio=vigente
- Ministero Giustizia, limite patrocinio 2025: https://www.gazzettaufficiale.it/eli/id/2025/07/11/25A03904/SG
- MIT, finestra bonus affitto: https://www.mit.gov.it/index.php/comunicazione/news/casa-genitori-separati-da-oggi-online-la-piattaforma-per-il-contributo-affitto
- Regione FVG, trasporto agevolato: https://www.regione.fvg.it/rafvg/cms/RAFVG/infrastrutture-lavori-pubblici/infrastrutture-logistica-trasporti/FOGLIA105/
- ASUFC, esenzioni: https://asufc.sanita.fvg.it/it/servizi/esenzione.html
- ACC/AHA, ACS 2025: https://professional.heart.org/en/science-news/2025-guideline-for-the-management-of-patients-with-acute-coronary-syndromes/top-things-to-know
- AHA, prevenzione CABG 2026: https://professional.heart.org/en/science-news/secondary-prevention-after-coronary-artery-bypass-graft-surgery-2026-update/top-things-to-know

## 5. Limiti rigorosi e azioni residue

- Il controllo *di struttura* delle 78 guide non autorizza a dichiarare che tutte siano state sottoposte a revisione medica, giuridica o previdenziale **frase per frase**. Le 12 famiglie di affermazioni nella tabella sono punti riscontrati, non il numero totale di affermazioni presenti.
- Il successo di GitHub Actions non prova che una fonte ufficiale sia ancora vigente, che Google abbia indicizzato una pagina, che il link esterno funzioni su ogni telefono, o che i lettori comprendano il contenuto.
- La data di scadenza del contributo MIT del 28/10/2026 deve essere trattata come evento futuro, non come termine già scaduto il 23/10. Aggiornare la guida dopo tale data solo sulla base di un riscontro ufficiale, tenendo conto di possibili proroghe.
- Sono ancora necessarie verifiche specialistiche di singole controversie INPS, sovraindebitamento, pignoramenti multipli e informazioni sanitarie soggette a nuove linee guida. Queste non possono essere certificate in chat come esami indipendenti.
- Restano necessari test di comprensione con lettori 50–70 anni, Android fisico e dati autenticati Google Search Console/Cloudflare per misurare l'effettivo utilizzo.

**Conclusione:** il secondo livello ha migliorato un punto previdenziale ad alto rischio e reso automatico un controllo di usabilità già presente. Le verifiche campionate non hanno richiesto altre correzioni indiscriminate alle norme e agli importi confermati da fonti ufficiali. Non confondere assenza di errori trovati nel campione con assenza assoluta di errori nel sito.
