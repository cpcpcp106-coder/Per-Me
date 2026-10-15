# PER ME — Rapporto di priorità, completamenti e attività residue

**Data di verifica:** 15 ottobre 2026  
**Unico progetto:** `cpcpcp106-coder/Per-Me` — [sito pubblico](https://cpcpcp106-coder.github.io/Per-Me/) e PWA `/app/`.  
**Perimetro:** pubblico nazionale; nessuna guida generale costruita sull'utente o su una singola città.

## 1. Operazioni già completate e pubblicate
1. **Assetto editoriale nazionale:** tutte le guide generali distinguono norme statali e procedure regionali/comunali; le due pagine FVG sono etichettate come approfondimenti territoriali. Non sono stati cancellati i vecchi indirizzi, evitando errori 404.
2. **Rubrica 04:** sono disponibili **sei guide nazionali** (ISEE; bonus sociali; trasporti; ticket; Comune e servizi sociali; affitto e sfratto) e due schede territoriali FVG, come risulta dagli attuali collegamenti di homepage e rubrica.
3. **Guida 05 servizi sociali nazionale:** Comune, ATS, segretariato sociale, misure economiche non automatiche, assistenza abitativa, documenti, ADI, SFL, PUA/non autosufficienza e procedura per il colloquio.
4. **Guide nazionali 03 e 04 ampliate:** trasporti e ticket, non più soltanto brevi pagine di presentazione.
5. **Revisione editoriale trasversale:** rapporti `revisione-editoriale-integrale-e-guida05-2026-10-15.md` e `revisione-normativa-31-guide-2026-10-15.md`. Screening su contenuti sensibili: pensioni, ricorsi, debiti, ISEE, bonus e salute. Non si tratta di parere professionale indipendente riga per riga.
6. **Indicizzazione tecnica:** HTML pubblico senza blocchi `noindex` riscontrati nel controllo statico, sitemap e canonical. *La presenza dei tag non obbliga Google a indicizzare.*
7. **PWA testuale:** simulazione Playwright dell'app con 39 pagine sincronizzate, salvate in `localStorage`, rilette offline; service worker e ritorno online funzionanti nel test. Le immagini remote non fanno parte del contenuto offline.

## 2. Evidenze automatizzate già raccolte
- **15/10/2026, ore 15:38 UTC:** audit statico: **45 HTML totali, 43 pagine editoriali, 31 guide operative**, **1.364 ricorrenze di collegamenti locali**, **nessun collegamento locale rotto e nessuna ancora interna rotta** nel campione controllato.
- **15/10/2026, ore 15:40 UTC:** collaudo Chromium con viewport 390×844: **43 pagine senza errori di reflow e senza violazioni rilevate dal controllo automatico axe**, pagina pubblica Guida 05 HTTP 200, app HTTP 200, memorizzazione testuale offline. *Chromium emulato non equivale al telefono fisico.*
- **15/10/2026, ore 15:41 UTC:** controllo **310 URL esterni univoci**: 300 raggiungibili, 9 rifiutati/bloccati da protezioni o autenticazione (soprattutto pagine di accredito immagini Pexels/Unsplash), 1 non verificato per problema di trasporto. **Non dichiarare automaticamente i 9 URL errati**: HTTP 403 da scansione può essere un blocco antibot, non una pagina inesistente. Il collegamento ministeriale non verificabile della Guida 06 è stato sostituito con un canale informativo MIT attivo.

## 3. Ulteriori interventi nel ciclo finale (da verificare nel CI)
- **Guida 06, nuova misura nazionale datata 2026:** inserita l'informazione dell'avviso MIT per alcuni genitori separati o divorziati con figlio minore di 21 anni, reddito individuale massimo 35.000 €, contratto registrato e ulteriori condizioni: contributo fino al 50% del canone, massimo 6.000 €/anno, **domande 7–28 ottobre 2026 ore 12** sulla piattaforma ministeriale. La misura non è presentata come bonus aperto a tutti. Link ufficiali: https://www.mit.gov.it/node/13118 e https://sostegnoabitativogenitoriseparati.mit.gov.it/.
- **Controllo di regressione Guida 06:** inseriti test per data finale, condizioni principali, importi e link.
- **GitHub Actions HTTP:** estesa la copertura pubblica alle Guide 03 e 04 nazionali e alla Guida 06 oltre a home, rubrica, 01, 02, 03/04 FVG, 05 e app. Il test richiede HTTP 200 e un titolo di pagina reale.

## 4. Attività residue, in ordine di priorità

### P1 — Verifica giuridica professionale e dati aggiornabili
- **Ricorsi, decadenze, termini INPS/AdeR, sovraindebitamento, CCNL, previdenza e invalidità:** richiedono una verifica specialistica *frase per frase*, con norma consolidata, fattispecie, destinatari e data di efficacia. I test tecnici verificano struttura e presenza di parole, non interpretazione giuridica.
- **Salute, diabete, cardiopatie e nutrizione:** validazione clinica indipendente prima di affermare una completezza sanitaria. Nessuna terapia individuale va inferita da una guida divulgativa.
- **Scadenze imminenti:** controllare dopo il **16 ottobre 2026** l'eventuale effettiva apertura delle procedure territoriali di definizione agevolata; dopo il **28 ottobre 2026** contrassegnare come chiuso l'avviso MIT separati, salvo proroga.

### P2 — Collaudo reale del dispositivo e fonti esterne
- **Android fisico:** installazione PWA Samsung/Chrome, sincronizzazione durante una connessione lenta, lettura senza rete, aggiornamento successivo, zoom al 200–400%, TalkBack e recupero dopo saturazione dello spazio `localStorage`. La simulazione browser non può certificare questi scenari.
- **Fotografie:** alcune immagini dipendono da Pexels/Unsplash; verificare visivamente corrispondenza fra scena, autore, didascalia e disponibilità HTTP dei file immagine, non solo delle pagine di accredito. Valutare in futuro asset locali ottimizzati se la connessione è scarsa.
- **Search Console:** controllare URL indicizzati ed esclusi nella proprietà Google; `index,follow` e sitemap corretta non garantiscono indicizzazione.

### P3 — Estensione dei contenuti
- **Tutor AI**: funzionalità e prompt pronti all'uso devono essere collaudati come prodotto, non indicati completi sulla sola base dell'indice.
- **Dieta mediterranea e ricette**: sezione ancora da sviluppare con ricette complete, fonti dietetiche generali e immagini distinte, evitando personalizzazione clinica.
- Ulteriori guide locali sono opzionali: devono essere sempre subordinate alla **spiegazione nazionale**, con etichetta territoriale evidente e fonti del territorio interessato.

## 5. Criterio di qualità
Nessun punteggio **100/100** può essere dichiarato: i controlli browser/CI e lo screening editoriale non esauriscono i rischi legali, sanitari, di accessibilità umana o di indicizzazione esterna. Un articolo può essere pubblicato e accessibile ma ancora necessitare di aggiornamenti normativi.

**Questo rapporto è un registro operativo**, non una certificazione giuridica o una dichiarazione di idoneità sanitaria.
