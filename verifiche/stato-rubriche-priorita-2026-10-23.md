# Per Me — Stato delle rubriche e priorità editoriali (23 ottobre 2026)

## Evidenze dal repository, verificate sul ramo principale

- **Rubrica 06, Tutor AI:** percorso base e sei approfondimenti pubblicati. Collaudo automatico browser mobile con 26 controlli superati; restano da svolgere test su un Android fisico e con lettori reali 50–70 anni. Non dichiarare esperienza utente validata.
- **Rubrica 07, Diabete tipo 2:** trenta pagine numerate presenti e collegate dalla rubrica. Non equivalgono a una revisione clinica indipendente di ogni affermazione; controlli e aggiornamenti clinici restano necessari.
- **Rubrica 05, Salute e autonomia:** quattro guide nazionali pubblicate, ulteriori guide generali ancora da definire e sviluppare. Lo stato di completamento editoriale rimane **aperto**.
- **Rubrica 08, Dieta mediterranea scientifica:** pubblicate le Guide 01 e 02 sulle evidenze cliniche e sulla prevenzione cardiovascolare; **sei guide ancora programmate (03–08)**. Pubblicata inoltre una ricetta originale di esempio con carboidrati disponibili e calorie per porzione, che non conta fra le otto guide.
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
