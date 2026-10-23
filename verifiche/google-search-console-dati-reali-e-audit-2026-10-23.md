# Per Me — Dati reali Google Search Console e audit di pubblicazione
**Data di rilevazione: 23 ottobre 2026** · Proprietà GSC: `https://cpcpcp106-coder.github.io/Per-Me/`.

## Accessi ai dati: evidenze e limiti
- Il collegamento GSC Wizard è stato interrogato e ha risposto `payment_required`: la prova è terminata. Per Me rimane gratuito; **non è stato attivato alcun abbonamento**.
- È stato individuato un **altro connettore già collegato**, Windsor.ai con account `searchconsole` della proprietà Per Me. Le seguenti cifre provengono da quel connettore e sono dati Google Search Console, **non** da contatori di pagina né da analisi di Chrome.
- Il collegamento Windsor restituisce tabelle Search Analytics ma **non offre in questa sessione il rapporto completo di Copertura/Indicizzazione né URL Inspection**. Non dedurre quindi il numero di URL indicizzati o esclusi.

## Risultati property-level ottenuti
Intervallo richiesto: dal 14 al 22 ottobre 2026. Nella risposta erano disponibili soltanto le date **14–21 ottobre**, dunque le date 22–23 non risultano consolidate nella query.

| Giorno 2026 | Impressioni nella Ricerca Google | Clic da Google |
|---|---:|---:|
| 14 ottobre | 0 | 0 |
| 15 ottobre | 11 | 0 |
| 16 ottobre | 1 | 0 |
| 17 ottobre | 0 | 0 |
| 18 ottobre | 2 | 0 |
| 19 ottobre | 8 | 0 |
| 20 ottobre | 0 | 0 |
| 21 ottobre | 0 | 0 |
| **Totale disponibile** | **22** | **0** |

Conseguenza dimostrata: **Per Me ha generato impressioni nella Ricerca Google**, anche dopo il 15 ottobre; pertanto non è documentato un blocco totale persistente della presenza in SERP per tutto il periodo. **Zero clic da Ricerca Google** nel periodo rilevato non significa zero visite da Facebook, collegamenti diretti o altri canali.

## Risultati page-level ottenuti, non sommabili al totale proprietà
- `https://cpcpcp106-coder.github.io/Per-Me/app/` — **19 impressioni / 0 clic**, posizione media restituita circa **1,16**.
- `https://cpcpcp106-coder.github.io/Per-Me/tutor-ai.html` — **17 impressioni / 0 clic**, posizione media restituita circa **1,71**.
- La somma 19+17 = 36 **non coincide con il totale property-level di 22**: le aggregazioni di Search Console a livello proprietà e pagina possono trattare le impressioni e il raggruppamento diversamente. **Non sostituire mai il totale 22 con la somma 36**. Una posizione media si riferisce alle impressioni osservate, non a una classifica fissa del sito su tutte le parole chiave.
- La query per termini di ricerca ha restituito un elenco vuoto: **non significa zero ricerche**, perché dati per singola query possono essere limitati o anonimizzati.

## Sitemap: cosa possiamo dimostrare e cosa no
- Il sorgente `sitemap.xml` sul ramo `main` è stato verificato rispetto all'albero dei file. Contiene **99 URL**, senza duplicati e senza URL che puntino a file assenti. Include la homepage canonica `/Per-Me/`, la PWA `/Per-Me/app/`, le nuove Guide Dieta 06–08, la seconda ricetta con fotografia, e la Guida Salute 05.
- Le 100 pagine HTML nella radice includono `index.html`, rappresentato dalla URL canonica della homepage `/Per-Me/`; per questo **100 HTML e 99 URL in sitemap non sono una contraddizione**. La PWA ha una URL di directory specifica.
- Il connettore Windsor per la tabella `Sitemaps` ha restituito `path:null` e nessuna informazione utilizzabile su scaricamento, invio, errori o avvisi. **Non riportare «sitemap senza URL» o «nessuna URL indicizzata»** da quel risultato; la query non è diagnostica.
- Un `robots.txt` nella sottocartella `/Per-Me/` non controllerebbe il comportamento del crawler a livello di host come un `robots.txt` nell'origine `cpcpcp106-coder.github.io/`. Non creare un file a scopo decorativo e non dedurre penalizzazioni dalla sua assenza nel repository del progetto.

## Verifiche pubbliche e test di distribuzione
- Guide 06–08 della Dieta mediterranea, ricetta della zuppa e Guida 05 FSE sono state verificate con lettura delle URL pubbliche dopo l'ultima distribuzione riuscita. Sono raggiungibili, con `index,follow`, canonical corrispondente e fotografie locali.
- Workflow `Per Me - Controllo carboidrati e calorie ricette`: **success** sulla versione con due ricette; `Per Me - Verifica tecnica di indicizzabilità`: **success**. GitHub Pages: **success** sull'ultimo deploy esaminato.
- Nessuno di questi test determina quali singole URL Google abbia inserito nel proprio indice.

## Visite e strumenti analitici: attenzione alle definizioni
- `analytics.js` contiene un beacon Cloudflare Web Analytics, caricato soltanto per browser non esclusi secondo la logica locale del sito. Il caricamento pubblico del codice non garantisce che l'account Cloudflare stia mostrando dati aggiornati.
- Il contatore personalizzato registra tentativi di visita per browser/periodo (30 minuti), non visitatori unici certificati; può essere influenzato da cancellazione dati, altri browser e controlli tecnici che non dispongano della specifica esclusione locale. Le visite di test automatizzati **non sono automaticamente escluse solo perché l'autore usa il parametro di esclusione nel proprio telefono**.
- In questa sessione **non è disponibile un connettore autenticato a Cloudflare Web Analytics**, quindi non si possono dichiarare visite reali, provenienza geografica o quota di visitatori Facebook usando dati privati di Cloudflare.

## Azioni successive, senza costi e senza dichiarazioni infondate
1. Usare Windsor.ai già collegato per ulteriori letture delle **impressioni/clic effettivi**, rispettando il ritardo dei dati. Verificare se si aggiungono pagine oltre app e Tutor AI.
2. Per la diagnosi **URL per URL** di indicizzate/escluse e delle motivazioni specifiche di Google occorre l'accesso autenticato al rapporto `Indicizzazione → Pagine` e a `Controllo URL`. Il connettore disponibile in questa sessione non lo sostituisce; evitare di inventare diagnosi.
3. Per visite da Facebook e link diretti occorre leggere Cloudflare autenticato; un contatore pubblico non basta.
4. Promuovere Per Me tramite materiali già pronti e nuovi contenuti verificati, poi distinguere impressioni, clic di ricerca e visite da altri canali.

**Questa evidenza non supporta conclusioni come «Google ha fermato Per Me perché i testi sono scritti con AI».** L'andamento osservato è limitato e descrive un sito giovane: da solo non dimostra né una penalizzazione né un'assenza di problemi di indicizzazione.
