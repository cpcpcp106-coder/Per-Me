# Per Me — Stato delle rubriche e priorità editoriali (23 ottobre 2026)

## Evidenze dal repository, verificate sul ramo principale

- **Rubrica 06, Tutor AI:** percorso base e sei approfondimenti pubblicati. Collaudo automatico browser mobile con 26 controlli superati; restano da svolgere test su un Android fisico e con lettori reali 50–70 anni. Non dichiarare esperienza utente validata.
- **Rubrica 07, Diabete tipo 2:** trenta pagine numerate presenti e collegate dalla rubrica. Non equivalgono a una revisione clinica indipendente di ogni affermazione; controlli e aggiornamenti clinici restano necessari.
- **Rubrica 05, Salute e autonomia:** cinque guide nazionali pubblicate, compresa la Guida 05 sul Fascicolo sanitario elettronico (FSE); gli approfondimenti futuri vanno definiti senza duplicare diabete e dieta. Lo stato di completamento editoriale rimane **aperto**.
- **Rubrica 08, Dieta mediterranea scientifica:** tutte le Guide **01–08** del percorso base sono pubblicate; completate 06 su diabete e cuore, 07 su etichette e allergeni, 08 su ricette e costi verificabili. Pubblicate inoltre **due ricette originali fotografate** con carboidrati disponibili e kcal per porzione, non conteggiate fra le otto guide. Revisione e valutazione con lettori reali ancora necessarie.
- **Rubriche 01–04:** diverse guide presenti in ciascuna; questo rapporto non certifica la completezza sostanziale e normativa di ciascuna, che richiede specifico audit.

## Lavoro svolto: avvio della rubrica 08

1. Pubblicata la **Guida 01 — Dieta mediterranea e diabete tipo 2: che cosa sappiamo davvero**, con definizione del modello alimentare, evidenze e limiti, rischi della personalizzazione autonoma con insulina, attenzione al costo del cibo, esercizio di comprensione e fonti primarie.
2. Inserita fotografia iperrealistica originale prodotta per il progetto, archiviata nel repository in `assets/dieta-mediterranea-guida01-originale.webp` (formato WebP).
3. Collegata la guida nella rubrica 08, aggiornata la sitemap con `lastmod` del 23 ottobre, allineati i testi di homepage e Salute e autonomia a **una pubblicata, sette in programma**.
4. Corretta un'informazione temporale datata: il dato ISTAT di settembre 2026 sugli alimentari non lavorati (+5,5% annuo) è **definitivo** dal 16 ottobre, non più provvisorio come nella versione precedente. Fonte ufficiale: https://www.istat.it/comunicato-stampa/prezzi-al-consumo-settembre-2026/

## Verifica delle fonti principali della Guida 01

- American Diabetes Association, *Standards of Care in Diabetes—2026*, sezione 5: https://doi.org/10.2337/dc26-S005 — raccomandazioni 5.10 e 5.30 sulla personalizzazione e sul modello mediterraneo; raccomandazioni 5.27–5.28 sui nutrienti e l'insulina.
- CREA, *Linee guida per una sana alimentazione*: https://www.crea.gov.it/web/alimenti-e-nutrizione/-/linee-guida-per-una-sana-alimentazione-2018 — varietà e modello mediterraneo.
- Ministero della Salute, *Linee guida per una sana alimentazione*: https://www.salute.gov.it/new/it/pubblicazione/linee-guida-una-sana-alimentazione/

Le fonti sono primarie e identificabili, ma il controllo documentale non costituisce revisione clinica esterna. La guida non prescrive porzioni, modifiche di insulina o piani medici individuali.

## Priorità rimanenti

**Prima:** realizzare la Guida 02 del programma mediterraneo, con valutazione critica delle prove sulla prevenzione cardiovascolare, soltanto dopo controllo delle fonti; in parallelo mantenere aggiornati dati ufficiali sensibili al tempo. Le Guide 03–08 seguono il piano della pagina madre. Non pubblicare rapidamente contenuti ripetitivi solo per raggiungere un totale numerico.

**Seconda:** definire il perimetro delle nuove guide di Salute e autonomia, evitando duplicazioni con le trenta guide Diabete e con gli approfondimenti di cardiologia già presenti.

**Terza:** test con lettori reali, Android fisico e verifica di indicizzazione effettiva in Google Search Console; non sostituire questi dati con il successo dei test automatici, la mera presenza in sitemap o le impressioni.

## Esiti non verificabili da questo rapporto

- Non è dimostrata la reale indicizzazione Google delle pagine appena aggiunte.
- Non sono dimostrate visite di lettori esterni né la comprensione da parte di persone 50–70 anni.
- Nessuna verifica qui documentata certifica la correttezza clinica indipendente di ogni contenuto.

Il successo va misurato su affidabilità, facilità d'uso e persone effettivamente raggiunte, non soltanto sul numero di pagine.


## Aggiornamento 23 ottobre — Guide 02 e ricetta quantitativa

- **Guida 02 pubblicata:** `dieta-guida-02-prevenzione-cardiovascolare-studi.html`, con fotografia originale `assets/dieta-mediterranea-guida02-originale.webp`, fonti American Heart Association 2026, ADA 2026, OMS e rianalisi PREDIMED 2018. Distinzione fra prevenzione primaria e secondaria, benefici medi e promesse individuali.
- **Ricetta 01 pubblicata:** `ricetta-insalata-borlotti-riso-integrale-pomodori.html`, ricetta originale per due porzioni con pesi cotti e scolati. **Per porzione: 36,1 g di carboidrati disponibili e circa 287 kcal**. Per l'intera ricetta: 72,22 g di carboidrati disponibili e 574,8 kcal. Nessuna prescrizione clinica o insulina ricavabile automaticamente.
- **Fonti quantitative CREA:** borlotti cotti da secchi `004125` (180 g, 106 kcal/100 g, carboidrati 16,4 g/100 g), riso integrale cotto `000115` (140 g, 113 kcal e 25,5 g/100 g), pomodori freschi `006610` (200 g, 23 kcal e 3,5 g/100 g), olio EVO `009210` (20 g, 899 kcal e 0 g/100 g). **Calcolo:** per ogni ingrediente, (grammi impiegati × valore per 100 g ÷ 100); somma ÷ 2 porzioni. Valori stimati, non analisi di laboratorio.
- **Standard editoriale obbligatorio:** ogni futura ricetta deve riportare carboidrati disponibili `g/porzione` e energia `kcal/porzione`, quantità e stato del peso crudo/cotto, numero porzioni, fonti CREA o etichetta e metodo di arrotondamento. Mai inventare dati mancanti.
- **Controllo CI:** `scripts/verifica-ricetta-carbo-calorie.cjs` e `.github/workflows/verifica-ricette-nutrienti.yml`; verifica quantità e risultati della prima ricetta e presenza di marcatori obbligatori per ciascuna futura pagina `ricetta-*.html`. Non è una validazione dietistica indipendente.
- Sono stati aggiornati pagina madre, pagina introduttiva delle ricette, homepage, collegamenti da Salute e autonomia e sitemap, distinguendo due guide realmente pubblicate da sei programmate.

Restano da verificare su utenti reali la facilità di comprendere i valori e l'uso pratico su Android fisico. L'accessibilità tecnica e la pubblicazione della pagina non implicano indicizzazione Google né visite reali.


## Aggiornamento successivo del 23 ottobre — Guida 03 e fotografia HD della ricetta

- **Guida 03** creata in `dieta-guida-03-carboidrati-fibre-indice-carico-glicemico.html`, collegata dalla rubrica 08 e aggiunta alla sitemap. Contiene definizioni e differenze fra carboidrati disponibili (g), fibre (g), indice glicemico (IG), carico glicemico (CG) ed energia (kcal), formule ed esercizi. Fonte primaria: ADA Standards of Care 2026 sezione 5 (https://doi.org/10.2337/dc26-S005). Riscontro divulgativo: Diabetes UK, Glycaemic index and diabetes, revisione 22 settembre 2025 (https://www.diabetes.org.uk/living-with-diabetes/eating/carbohydrates-and-diabetes/glycaemic-index-and-diabetes).
- La **fotografia del piatto della ricetta borlotti-riso-pomodori** è stata rigenerata come immagine originale iperrealistica e archiviata in formato WebP ad alta definizione: `assets/ricetta-borlotti-riso-piatto-originale-hd.webp`, circa 221 KB. Sostituita la miniatura precedente nel codice e aggiornata l'immagine di anteprima social. Una fotografia generata non certifica ingredienti effettivamente impiegati né apporti nutrizionali: la didascalia dichiara il carattere illustrativo.
- **Controllo CI corretto:** `scripts/verifica-ricetta-carbo-calorie.cjs` ora verifica la nuova guida 03, i suoi collegamenti, formule e fonti, il conteggio 3/8 in homepage e l'uso di una fotografia del piatto realmente salvata con dimensione file superiore a 150 KB; il controllo delle quantità e calorie per porzione resta attivo.
- **Priorità editoriale successiva:** Guida 04 su porzioni, pesi crudi e cotti, lettura CREA ed errori comuni nei calcoli dei nutrienti. Mantenere separati i controlli tecnici dalla comprensione dei lettori reali e dall'indicizzazione Google.


## Aggiornamento — Guida 04, pesi crudi e cotti (23 ottobre 2026)

- Pubblicata `dieta-guida-04-porzioni-pesi-crudo-cotto-tabelle-crea.html`, collegata dalla rubrica 08, homepage e sitemap. Pagine scientifiche pubblicate: **4/8**; restano 05–08.
- Fotografia iperrealistica originale generata per il progetto e archiviata in `assets/dieta-mediterranea-guida04-crudo-cotto-originale.webp`; mostra ciotole di pasta cruda e cotta e bilancia, senza numeri di peso attribuiti alla foto. Il file è dichiarato illustrativo, non prova di laboratorio.
- Fonti primarie di calcolo: schede CREA `000800` (pasta di semola cruda, per 100 g: 72,7 g carboidrati disponibili; 341 kcal), `000805` (pasta bollita, per 100 g: 37,3 g carboidrati disponibili; 175 kcal), tabella C di `alimentinutrizione.it/presentazione-dati` (resa indicativa per pasta corta 1,88, lunga 2,10 e fagioli secchi 2,3). Documentate le differenze fra dati medi e misure individuali, senza dichiarare perfetta equivalenza nutrizionale fra schede crude e cotte.
- Esempi: 80 g pasta secca (58,2 g carboidrati disponibili e 273 kcal circa, senza condimento), resa media di 80 × 1,88 = 150,4 g cotti. Un esempio parallelo su 150 g di pasta cotta usa esclusivamente dati della scheda cotta; gli esiti non coincidono necessariamente per dispersione, acqua, variabilità e arrotondamenti.
- Esempio di prezzo della parte edibile illustrativo, **non un prezzo di mercato realmente rilevato**: 2,40 €/kg ÷ 0,75 di parte edibile = 3,20 €/kg edibile, 250 g = 0,80 €.
- Verificati con il test `scripts/verifica-ricetta-carbo-calorie.cjs`: nuove fonti, numeri, formule, immagine originale, link rubrica, sitemap e testo stato 4/8. Workflow automatico `Per Me - Controllo carboidrati e calorie ricette`, esecuzione [40016726262](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/40016726262), **successo**.
- Restano aperti test di lettura reale su Android fisico e validazione con lettori 50–70 anni; una pagina tecnicamente indicizzabile non equivale a pagina indicizzata né a una visita.

**Priorità editoriale successiva:** Guida 05 su grassi alimentari, olio extravergine, etichetta, provenienza, porzioni e costo per ricetta, senza prezzi inventati. Non confondere la pubblicazione progressiva con revisione professionale indipendente.


## Aggiornamento — Guida 05 su olio EVO, grassi e prezzo (23 ottobre 2026)

- Pubblicata `dieta-guida-05-grassi-olio-evo-origine-etichette-costi.html`, collegata dalla rubrica, indicata in homepage e aggiunta alla sitemap, con `index,follow` e canonical. Stato rubrica: **5 guide su 8**; restano 06–08.
- Fotografia iperrealistica originale generata appositamente per il progetto, archiviata come `assets/dieta-mediterranea-guida05-olio-grassi-originale.webp`, compressa in WebP e dichiarata illustrativa. La foto non certifica origine, prezzo o composizione di una bottiglia reale.
- Fonti primarie: AHA *Dietary Guidance to Improve Cardiovascular Health 2026* (31 marzo 2026); CREA *Olio d'oliva extravergine*, codice 009210 (899 kcal per 100 g, carboidrati disponibili 0 g, 10 g circa 90 kcal); Commissione UE, Regolamento delegato 2022/2104, articolo 8 (origine di vergine/extravergine, olive raccolte e frantoio); Commissione europea, quadro di controlli e etichette.
- La guida distingue **grammi per il calcolo nutrizionale** da **millilitri per il confronto commerciale**. Il prezzo per 10 ml è ottenuto da prezzo effettivamente pagato ÷ volume della bottiglia in ml × 10. Nessun prezzo ipotetico è presentato come rilevazione di mercato.
- È precisato che **origine italiana e qualità nutrizionale non coincidono** e che la presenza di un'indicazione regolamentata non equivale a una verifica indipendente dell'autenticità dello specifico prodotto. Presenti tre esercizi con soluzione, indicazioni di prudenza clinica, link alla pagina Facebook e metodo di Per Me.
- Esteso `scripts/verifica-ricetta-carbo-calorie.cjs` a fotografia della Guida 05, fonti CREA e UE, calcolo 10 g ≈ 90 kcal, navigazione e avanzamento 5/8; mantenuto il controllo delle ricette con carboidrati e calorie per porzione.

La pubblicazione e l'audit tecnico **non equivalgono** a validazione da lettori reali, controllo clinico/giuridico indipendente o indicizzazione effettiva in Search Console.

**Prossima guida programmata:** 06, diabete tipo 2 e cardiopatie: principi alimentari comuni e necessità di personalizzazione, senza ripetere inutilmente le trenta guide già esistenti sul diabete.


## Stato operativo conclusivo — 23 ottobre 2026, pubblicazione percorso Dieta e verifica dati Google

- **Dieta mediterranea, 8/8 pubblicate**. Sono state completate le Guide 06–08 e la ricetta originale «zuppa di lenticchie, patate e carote» con foto del piatto. Seconda ricetta: 240 g lenticchie cotte, 180 g patate bollite, 120 g carote bollite e 16 g olio EVO per due porzioni. Valori CREA: **40,0 g carboidrati disponibili e circa 298 kcal/porzione**. Prima ricetta: **36,1 g e circa 287 kcal/porzione**. Controllo automatico aggiornato e superato.
- **Salute e autonomia:** Guida 05 nazionale sul Fascicolo sanitario elettronico (accesso CIE/SPID, referti, consensi, oscuramento, privacy, servizi FVG) pubblicata, con fonti Ministero della Salute, Garante Privacy e FVG. Totale 5 guide. Non dichiarata conclusa l'intera rubrica.
- **Search Console:** fonte reale Windsor.ai collegata alla proprietà Per Me, periodo disponibile 14–21 ottobre 2026: **22 impressioni e 0 clic Google**. Risultati page-level: `/Per-Me/app/` 19 impressioni e `/Per-Me/tutor-ai.html` 17; i dati page-level non vanno sommati per ricostruire il totale proprietà. Rapporto dedicato `verifiche/google-search-console-dati-reali-e-audit-2026-10-23.md`.
- **Sitemap GitHub:** 99 URL senza duplicati né URL che puntano a file assenti; verificato confronto con il repository. Questo non prova l'indicizzazione. **GSC Wizard ha interrotto l'accesso per abbonamento scaduto**, ma Windsor.ai già connesso ha restituito le metriche senza attivare costi aggiuntivi. Il numero di pagine escluse e le cause non sono stati restituiti.
- **Cloudflare e Facebook:** Beacon Cloudflare nel codice delle pagine, ma non sono disponibili dati autenticati dell'account in questa sessione. Contatori personalizzati e visite di test non dimostrano lettori unici. Materiali divulgativi e piano di test utenti saranno documentati separatamente; nessuna pubblicazione esterna o valutazione fisica Android viene dichiarata senza prova.
