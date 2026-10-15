# PER ME — Verifica e pubblicazione Guida 01 «ISEE ordinario e corrente» (Rubrica 04)
Data: 15 ottobre 2026. Scopo: guida operativa, adatta a persone tra 50 e 70 anni, con procedure orientative e fonti ufficiali.

## Controlli legali puntuali

| Punto | Regola verificata | Fonte |
| --- | --- | --- |
| ISEE ordinario 2026 | DSU ordinaria: redditi del 2024 e patrimoni al 31/12/2024; nucleo alla data di DSU; scadenza 31/12/2026. | INPS Portale unico ISEE |
| Requisito preliminare ISEE corrente | Un ISEE ordinario valido è necessario. | INPS e modello MS 2026 |
| Condizioni alternative | Eventi lavorativi/trattamenti secondo categorie normative; **oppure** variazione situazione reddituale del nucleo >25%; **oppure** patrimonio complessivo >20%, dal 1° aprile. Le soglie non si riferiscono al solo stipendio netto. | Istruzioni DSU corrente 2026 e decreto n. 3/2026 |
| Ultimi 12 o 2 mesi | Regola generale dei 12 mesi; 2 mesi solo nei casi espressamente previsti, annualizzati x6 dall'INPS. | INPS Tipologie di ISEE |
| Patrimonio aggiornato | Per DSU corrente presentata nel 2026 dal 1° aprile, patrimonio al 31/12/2025, se ammessi i presupposti. | INPS Portale unico |
| Validità corrente | Solo redditi 6 mesi; patrimonio o redditi+patrimonio fino al 31/12 dell'anno; variazioni occupazionali/trattamenti rilevanti richiedono aggiornamento entro 2 mesi. | INPS Portale unico |
| Modello DSU 2026 | Nuovo modello approvato dal decreto 3 del 2 marzo 2026; INPS ha aggiornato automaticamente le attestazioni 2026 per indicatori specifici. | INPS comunicazione 6 marzo 2026 |
| Indicatore ISEE 2026 per specifiche prestazioni | Distinto da ISEE generale; ADI, SFL, assegno unico, bonus nido, bonus nuovi nati. | Ministero del Lavoro 19 marzo 2026 |
| Costi e intermediari | Esistono convenzioni INPS/CAF 2026 e regole particolari per dichiarazioni successive; evitare promesse di gratuità universale. | INPS messaggio 30 aprile 2026 n. 1442 |

## Struttura realizzata
- `agevolazioni-guida-01-isee-corrente.html`: guida autonoma di oltre 20.000 caratteri, con 11 sezioni, passaggi operativi, 2 esempi dichiaratamente inventati, cautela documentale, fonti.
- Fotografia **realistica diversa** da quelle delle Guide Debiti: coppia anziana al portatile a casa, fotografia Unsplash di Vitaly Gariev con credito e pagina sorgente. **Asset esterno e non conservato offline** (coerente con il lettore dell'App che scarica soltanto i testi). La distinzione visiva effettiva dai nove fotogrammi precedenti richiede ancora un controllo visivo umano.
- `agevolazioni-diritti.html`: indice della Rubrica 04 con collegamento subito visibile alla nuova guida; mantenuto `noindex,follow` poiché la rubrica non è ancora completa.
- `index.html`: home con accesso diretto alla prima guida della Rubrica 04.
- `sitemap.xml`: aggiunta la pagina guida autonoma indicizzabile, **non l'indice della rubrica** che resta noindex.
- `scripts/audit-agevolazioni-01.cjs`: asserzioni su link, SEO, fonti, requisiti e scoperta automatica da parte della PWA.
- `.github/workflows/audit-agevolazioni.yml`: workflow GitHub Actions per PR e main.

## Fonti ufficiali controllate il 15 ottobre 2026
- https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.Portale-unico-ISEE.html
- https://www.lavoro.gov.it/strumenti-e-servizi/isee-istruzioni-2026
- https://www.lavoro.gov.it/documenti-e-norme/normativa/decreto-n-3-del-02032026
- https://www.inps.it/it/it/dettaglio-approfondimento.schede-informative.49936.tipologie-di-isee.html
- https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.03.dichiarazione-sostitutiva-unica-disponibile-il-nuovo-modello.html
- https://www.lavoro.gov.it/notizie/pagine/nuovo-isee-specifiche-prestazioni-familiari-e-linclusione
- https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.04.certificazione-isee-2026-convenzione-tra-l-istituto-e-i-caf.html

## Limiti da dichiarare
Non è stato effettuato l'accesso autenticato all'INPS in qualità di cittadino, il test operativo dentro i sistemi INPS o la simulazione visuale del dispositivo Android. Il controllo automatico del codice **non sostituisce** la verifica professionale della situazione individuale. L'immagine esterna richiede connettività. L'esistenza dei collegamenti non garantisce l'assenza di cambiamenti successivi nei portali.
