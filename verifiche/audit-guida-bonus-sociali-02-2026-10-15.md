# Per Me — Revisione giuridica e audit Guida 02 «Bonus sociali»
**Data:** 15 ottobre 2026  
**Rubrica:** 04, Agevolazioni e diritti  
**Pagina:** `agevolazioni-guida-02-bonus-sociali.html`.

## Oggetto e livello di certezza
Guida divulgativa autonoma per persone 50–70 anni su sconti di energia elettrica, gas naturale, servizio idrico e tassa rifiuti, con distinzione dal bonus elettrico per disagio fisico e dai contributi straordinari 2026. È fondata su ARERA e INPS; il test tecnico non equivale a certificazione legale di un'utenza individuale.

## Matrice normativa 2026
| Perno | Dato verificato il 15/10/26 | Fonte primaria |
| --- | --- | --- |
| Soglia base | ISEE **non superiore a 9.796 €** dal 01/01/2026 (non più 9.530 €) | ARERA, 2/2026/R/com e comunicato 23/01/2026 |
| Famiglie numerose | ISEE **non superiore a 20.000 €** con almeno quattro figli a carico; non significa un nucleo di quattro componenti | ARERA, requisiti |
| Domanda economica | DSU/ISEE sottosoglia + controllo utenze; riconoscimento automatico nei casi previsti, per 12 mesi; nuova DSU ogni anno | ARERA, come si ottengono |
| Intestazione | Per forniture dirette, uno degli intestatari deve appartenere al medesimo nucleo ISEE; contratto domestico e attivo o sospeso per morosità | ARERA, requisiti |
| Gas | Gas naturale domestico, contatore massimo G6 per diretto. Per centralizzato, possibile richiesta PDR condominiale | ARERA, requisiti e tempi |
| Acqua | Domestico residente e contratto diretto o condominiale alle condizioni specifiche; per condominiale una fornitura elettrica domestica intestata al nucleo | ARERA, requisiti |
| Elettricità ordinaria | 2026: 1–2 componenti **146 €**, 3–4 **186,15 €**, più di 4 **204,40 €**, annui (quote in bolletta). | ARERA, importi |
| Gas ordinario | Varia per stagione/trimestre, uso, zona climatica e nucleo | ARERA, importi |
| Idrico ordinario | **50 litri per persona al giorno**, importo effettivo variabile per tariffa locale | ARERA, importi |
| Rifiuti | Sconto **25%** TARI/tariffa corrispettiva, applicato **nell'anno successivo** a quello dell'attestazione ISEE sotto soglia | ARERA, bonus sociale rifiuti, TUBR |
| DSU fine dicembre | Se attestazione arriva a gennaio successivo, slitta anche il riferimento per la TARI; la data della sola DSU non è sempre sufficiente | ARERA, bonus rifiuti |
| Debiti TARI | Possibile compensazione con arretrati solo nelle condizioni stabilite, inclusa comunicazione con sollecito e intenzione di compensare | ARERA, bonus rifiuti |
| Tempi diretti | Luce e gas circa **3–4 mesi**; acqua circa **6–7 mesi** da attestazione ISEE | ARERA, come e quando si ricevono |
| Gas condominiale | Invio codice PDR dell'impianto alla richiesta; possibili pagamenti separati dalla bolletta | ARERA, come e quando si ricevono |
| Disagio fisico | Richiede apparecchiature elettromedicali salvavita certificate da ASL, domanda a Comune/CAF abilitato; non richiede soglia ISEE e può cumularsi con bonus economico | ARERA, requisiti e domanda |
| Straordinario 115 € | Una tantum 2026 per titolari di bonus elettrico economico al **21/02/2026**, automatico secondo disposizioni; distinto dalle altre soglie | ARERA, comunicato 19/03/2026 e D.L. 21/2026 |
| ISEE 25.000 € | Ulteriore contributo 2026–27 **facoltativo per i venditori**, non un bonus ordinario obbligatorio | Art. 1, comma 2, D.L. 21/2026 |
| Contatti | Sportello per il consumatore Energia e Ambiente: **800 166 654**; gestore TARI/Comune per rifiuti; CAF per DSU | ARERA |

## Struttura e controlli tecnici
- Guida autonoma con 12 sezioni numerate più azione iniziale e fonti, casi inventati dichiarati, documenti e passaggi.
- Fotografia **realistica di singola donna anziana con documenti** da Pexels (SHVETS production), diversa dalla Guida 01. È esterna e richiede Internet; non viene scaricata nell'archivio testuale dell'app. La resa sul telefono non è certificata.
- Scoperta tramite link della Rubrica 04 da `app/main.js` durante `sync()`; aggiornamento automatico all'apertura con rete, secondo il codice app già pubblicato. L'utente senza rete mantiene le guide già salvate.
- Link e conteggio aggiornati su Rubrica 04 e home; guida inclusa nella sitemap, canonical e metadescrizione.
- Test `node scripts/audit-agevolazioni-02.cjs` da eseguire nel workflow CI su pull request e main: un H1, metadati, ancore, immagine/alt, soglie/date/importi/soggetti e discovery.

## Fonti ufficiali
- ARERA soglie 2026: https://www.arera.it/comunicati-stampa/dettaglio/bonus-sociali-arera-alza-a-9796-euro-la-soglia-isee-per-laccesso-alle-agevolazioni-per-acqua-luce-gas-e-rifiuti
- ARERA requisiti: https://www.arera.it/consumatori/bonus-sociale/bonus-sociale-per-disagio-economico/quali-sono-i-requisiti
- ARERA riconoscimento: https://www.arera.it/consumatori/bonus-sociale/bonus-sociale-per-disagio-economico/come-si-ottengono-i-bonus
- ARERA importi: https://www.arera.it/consumatori/bonus-sociale/bonus-sociale-per-disagio-economico/a-quanto-ammontano
- ARERA tempistiche: https://www.arera.it/consumatori/bonus-sociale/bonus-sociale-per-disagio-economico/come-e-quando-si-ricevono
- ARERA bonus TARI: https://www.arera.it/consumatori/bonus-sociale/bonus-sociale-per-disagio-economico/bonus-sociale-rifiuti-2-1
- ARERA disagio fisico, requisiti: https://www.arera.it/consumatori/bonus-sociale/bonus-per-gravi-condizioni-di-salute/quali-sono-i-requisiti-per-accedere-al-bonus-per-disagio-fisico
- ARERA disagio fisico, domanda: https://www.arera.it/consumatori/bonus-sociale/bonus-per-gravi-condizioni-di-salute/come-si-ottiene-il-bonus-per-disagio-fisico
- ARERA contributo 115 €: https://www.arera.it/comunicati-stampa/dettaglio/bonus-sociale-elettrico-definite-le-modalita-di-erogazione-del-contributo-straordinario-da-115-euro
- INPS ISEE: https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.Portale-unico-ISEE.html

## Rischi residui
1. Il controllo tecnico non testa la disponibilità HTTP della fotografia esterna, la sua fedeltà al contesto né un eventuale blocco hotlinking. Se non si carica, serve sostituirla con asset locale e ritestare.
2. I numeri ARERA e le delibere possono cambiare per trimestri successivi; le soglie 2026 e gli importi elettrici qui citati sono verificati alla data.
3. Il codice dell'app scarica testi tramite `localStorage`; un dispositivo reale può raggiungere il limite di spazio. Solo collaudo reale può confermare la memorizzazione completa.
4. Non sono eseguiti test reali Android Chrome 200% zoom, TalkBack, lettura offline e risposta dei server Github Pages.
5. La guida non costituisce una decisione individuale dell'ente, un parere giuridico né un calcolo personalizzato; i bonus ulteriori comunali seguono regole autonome.

**Non assegnare 100/100** senza validazione dei punti residui.
