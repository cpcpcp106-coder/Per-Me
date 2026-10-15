# Per Me — Audit giuridico Guida 03 Rubrica 04 (Trasporti FVG)
**Verifica editoriale:** 15 ottobre 2026  
**File pagina:** `agevolazioni-guida-03-trasporti-fvg.html`.  
**Criterio:** primato delle fonti regionali e dei gestori rispetto a generalizzazioni nazionali; disabilità distinta dall'over 65, e tesserini distinti da abbonamenti.

## Matrice dei requisiti (fonti ufficiali)
| Argomento | Risultato e precisazioni | Evidenza primaria |
| --- | --- | --- |
| Categorie protette | Carta europea della disabilità o categorie previste dall'allegato 3 DPCM 159/2013, secondo l'art. 34 LR 23/2007 e i requisiti annuali. Il Portale Disabilità cita il 67% per invalidità, ma non è titolo automatico di viaggio. | Regione FVG; TPL FVG |
| Reddito invalidità | Esiste limite di **reddito complessivo**, non ISEE, aggiornato annualmente. La Regione ha pubblicato 35.340 euro per il **2025**, non va trasportato al 2026 senza determinazione vigente. | TPL FVG, FAQ Disabilità; comunicato regionale 31/08/2025 |
| Non residenti | Possibile accesso per persone dimoranti in FVG per comprovati motivi lavoro/studio/famiglia/salute, previa istruttoria. | Regione domanda AgileFVG; TPL FVG |
| Valore titolo invalidità | Abbonamento annuale al **1,5% della tariffa ordinaria corrispondente**, ossia riduzione del 98,5%; eventuale accompagnatore previsto comporta costo doppio. | Regione FVG FOGLIA105; TPL FVG Disabilità |
| Ambito titolo invalidità | 12 mesi solari, servizio urbano prescelto o fino a cinque percorsi extraurbani; ulteriori configurazioni nei titoli autorizzati dalla Regione. | TPL FVG |
| Istanza | Solo online via SPID/CIE/CRS su AgileFVG, allegando Disability Card/verbale; invio e protocollazione distinti da autorizzazione. | Regione FVG FOGLIA105; AgileFVG idServizio=93389 |
| Acquisto invalidità | Dopo istruttoria positiva, attesa di 15 giorni dalla comunicazione di conclusione e registrazione dati presso TPL FVG; vendita in biglietteria/rivendita, non online. | Regione FOGLIA105; TPL FVG Disabilità |
| Tesserino TPL FVG | Necessario e distinto da Disability Card e titolo di viaggio; validità nominale cinque anni. | TPL FVG |
| Rinnovo | Autorizzazione regionale permanente oppure a scadenza; se in corso di validità si rinnova direttamente al punto vendita, altrimenti prima nuova attestazione. | TPL FVG Disabilità |
| Over 65 | Residenti FVG dai 65 anni; **50%** su annuali e semestrali regionali ammessi per automobilistico e ferroviario su tratte interne. | Regione FOGLIA33; atto di attuazione 2026 |
| Reddito over65 | **Non prevista soglia reddituale**, né DSU; requisito anagrafico e residenza; controllo tramite tesserino e autocertificazione dei nuovi abbonati. | TPL FVG Agevolazioni e sconti; Regione FOGLIA33 |
| Cumulabilità | Normativa regionale consente cumulo nei limiti stabiliti, ma non significa sconto ulteriore automatico del 50% sul prezzo già all'1,5%; evitare calcoli non autorizzati. | LR 23/2007 art.34, c. 4 sexies; gestori |
| Carta Blu nazionale | Agevolazione Trenitalia separata che copre l'accompagnatore per categorie specifiche (accompagnamento/comunicazione e altri requisiti); non automaticamente 67%, non uguale ad abbonamento regionale. | Trenitalia Carta Blu |
| Contatti | Udine 0432 279256, giovedì 9:30–12:30, secondo pagina regionale aggiornata settembre 2026. | Regione FOGLIA105 |

## Fonti puntuali
1. Regione FVG, trasporto pubblico agevolato: https://www.regione.fvg.it/rafvg/cms/RAFVG/infrastrutture-lavori-pubblici/infrastrutture-logistica-trasporti/FOGLIA105/
2. Regione FVG, accesso istanza telematica: https://agilefvg.regione.fvg.it/susfe/a/avvio?idServizio=93389
3. TPL FVG, agevolazioni disabilità: https://tplfvg.it/it/abbonamenti/disabilita/
4. TPL FVG, procedura passo dopo passo: https://tplfvg.it/it/guide-rapide/abbonamenti-agevolati/
5. Regione FVG, over 65: https://www.regione.fvg.it/rafvg/cms/RAFVG/infrastrutture-lavori-pubblici/infrastrutture-logistica-trasporti/FOGLIA33/
6. TPL FVG, sconti e procedure: https://tplfvg.it/it/abbonamenti/agevolazioni-e-sconti/
7. TPL FVG, FAQ reddito non ISEE: https://tplfvg.it/it/faq/disabilita/
8. Portale Disabilità Regione: https://disabilita.regione.fvg.it/it/schede/contributi_agevolazioni/trasportopubblico.html
9. Legge regionale 23/2007, art.34: https://lexview-int.regione.fvg.it/FontiNormative/xml/xmlLex.aspx?anno=2007&legge=0023&id=art34&fx=art
10. Trenitalia, Carta Blu: https://www.trenitalia.com/it/informazioni/la-guida-del-viaggiatore/altre-riduzioni-e-carte-sconto-a-tua-disposizione.html
11. Regione, comunicato soglia 2025 35.340 € (storico): https://www.regione.fvg.it/rafvg/comunicati/comunicato.act?dir=%2Frafvg%2Fcms%2FRAFVG%2Forganigramma%2F&nm=20250831093055002

## Pubblicazione tecnica e limiti
- Nuova guida strutturata, accessibile, con testo orientato ai 50–70 anni, esempi inventati chiaramente etichettati, titolo H1, data di verifica e fonti.
- Fotografia realistica Pexels diversa da quelle delle Guide 01 e 02, con credito; raffigura persone adulte, tra cui utente in carrozzina, in una città tedesca (non dichiarare che sia in FVG). Asset remoto **non memorizzato offline**, poiché l'app conserva testi. L'URL della foto non è stato collaudato su Android.
- Home, indice Rubrica 04 e sitemap da aggiornare contestualmente; la PWA già dispone di scoperta automatica dei link contenuti nelle rubriche.
- Test unitario `node scripts/audit-agevolazioni-03.cjs` in CI, da applicare a ogni PR/push e rispettare anche i test precedenti.
- **Limitazione sostanziale:** assente verifica certa di un atto annuale contenente il valore della **soglia di reddito 2026** per invalidità. Non sostituirla con 35.340 € del 2025. Controllo diretto dell'ufficio regionale prima dell'istanza. Alcune fonti regionali su LexView mostrano testo storico e possono non includere modifiche successive, perciò applicare anche le indicazioni operative correnti TPL FVG.
- **Non testati**: autenticazione CIE, acquisto effettivo allo sportello, carta TPL FVG reale, servizio offline su smartphone e caricamento della fotografia/di tutte le URL esterne.
