# Per Me — Seconda revisione della Guida 03 «Trasporti FVG» (15 ottobre 2026)

## Esito
**Revisione editoriale e confronto con fonti ufficiali completati.** Guida oggetto del controllo: `agevolazioni-guida-03-trasporti-fvg.html`. Questa verifica non costituisce una decisione amministrativa sulla pratica di un singolo richiedente.

### Regole confermate
| Punto | Regola verificata | Fonte |
|---|---|---|
| Agevolazione invalidità/disabilità | Abbonamento annuale al prezzo dell'**1,5%** di quello ordinario corrispondente, non semplice sconto dell'1,5%; eventuale accompagnatore aumenta il costo secondo il titolo autorizzato | Regione FVG trasporto pubblico agevolato; TPL FVG Disabilità |
| Accesso | Disability Card o categorie ammesse dalla LR 23/2007, art.34, comma 3, lettera a) e dalle istruzioni in vigore; è richiesta verifica regionale prima dell'acquisto | Regione FVG; TPL FVG Disabilità |
| Reddito invalidità | Limite di **reddito complessivo**, non ISEE, aggiornato dalla Giunta regionale. Valore per il **2026 non accertato documentalmente**: il 35.340 € comunicato per il 2025 è storico e non viene presentato come soglia attuale | TPL FVG Disabilità; Regione comunicato 31/08/2025 |
| Domanda | AgileFVG esclusivamente telematica via SPID/CIE/CRS, conferma e invio, mail di protocollazione, eventuali integrazioni; **15 giorni dalla mail di istruttoria positiva prima dell'acquisto** | Regione FVG FOGLIA105, aggiornata 04/09/2026 |
| Rinnovo | Autorizzazione regionale permanente o a scadenza; se scaduta occorre rifare l'istruttoria | TPL FVG Disabilità |
| Over 65 | Per residenti FVG con almeno 65 anni, **50%** su abbonamenti semestrali e annuali ammessi, bus e treni su tratte interne FVG. Nessun requisito ISEE | Regione FVG FOGLIA33; TPL FVG Agevolazioni |
| Cumulo | Per lo sconto over 65 alcune promozioni commerciali sono cumulabili, ma non si deve presumere un ulteriore 50% sul prezzo già fissato all'1,5% per invalidità | TPL FVG; Regione FVG |
| Acquisto invalidità | Presso biglietteria/rivendita TPL FVG dopo esito positivo; **non disponibile online** | TPL FVG Disabilità/Webticketing |
| Servizi ferroviari | Over 65 con modalità diverse: Trenitalia su canali dell'impresa, FUC con richiesta/autocertificazione specifica presso rete di vendita | Regione FVG FOGLIA33 |
| Carta Blu | Strumento nazionale Trenitalia distinto dall'agevolazione autobus FVG e dai criteri over 65 | Trenitalia, altre riduzioni |

### Correzioni apportate in seconda revisione
1. **Tesserino TPL FVG:** aggiunti i tre canali (CORE, ACTIVE, online), costo **gratuito presso biglietteria/rivendita** oppure **5 € online**, rilascio provvisorio, durata **5 anni** e indicazione di attivazione normalmente il giorno seguente.
2. **Over 65:** precisato che agli abbonati già censiti non serve nuova autocertificazione e che il primo tesserino/registrazione richiede dati e autocertificazione; non confondere con procedure ferroviarie.
3. **Ferrovia:** aggiunte istruzioni distinte per Trenitalia e Ferrovie Udine Cividale, con link al percorso operativo indicato dalla Regione.
4. **Limite dei titoli TPL FVG:** abbonamenti ordinari urbani/extraurbani non includono **i servizi marittimi**, che seguono regole proprie.
5. **Soglia reddito:** eliminato dal corpo della guida il numero 2025 per ridurre il rischio di utilizzarlo per errore nel 2026; aggiunto invito a verificare valore vigente e anno del reddito.
6. **Fonti:** inseriti link diretti alla scheda TPL FVG per tesserini e alla pagina tariffe/servizi esclusi; verificata pagina fotografica Pexels, autore Ernst-Günther Krause (NID), ambientazione reale in Germania.
7. **Regressioni:** aggiornato test `scripts/audit-agevolazioni-03.cjs` per controllare le nuove condizioni e impedire l'uso nel testo del limite storico 35.340 € come soglia dell'anno.

### Fonti istituzionali consultate
- Regione FVG, domanda invalidità: https://www.regione.fvg.it/rafvg/cms/RAFVG/infrastrutture-lavori-pubblici/infrastrutture-logistica-trasporti/FOGLIA105/
- TPL FVG, abbonamenti disabilità: https://tplfvg.it/it/abbonamenti/disabilita/
- TPL FVG, tesserini identificativi: https://tplfvg.it/it/abbonamenti/tesserini/
- TPL FVG, tariffe e servizi marittimi: https://tplfvg.it/it/abbonamenti/tariffe/
- Regione FVG, over 65 autobus e ferrovia: https://www.regione.fvg.it/rafvg/cms/RAFVG/infrastrutture-lavori-pubblici/infrastrutture-logistica-trasporti/FOGLIA33/
- TPL FVG, agevolazioni e sconti: https://tplfvg.it/it/abbonamenti/agevolazioni-e-sconti/
- Trenitalia, Carta Blu e carte sconto: https://www.trenitalia.com/it/informazioni/la-guida-del-viaggiatore/altre-riduzioni-e-carte-sconto-a-tua-disposizione.html
- Fonte della fotografia: https://www.pexels.com/photo/men-and-woman-waiting-at-bus-stop-15965909/

### Verifiche ancora necessarie per un collaudo integrale
- Verifica formale della **soglia reddituale annuale 2026** presso Regione FVG, con provvedimento specifico: non ancora disponibile in queste fonti.
- Test del percorso AgileFVG autenticato, della registrazione presso TPL FVG, dei canali acquisto.
- Test su Android della resa e accessibilità, prova offline dell'app, prova HTTP della pagina GitHub Pages; l'apertura pubblica della pagina non è stata confermata dal browser di ricerca durante questo audit.
- La fotografia è un'immagine **esterna**: la pagina sorgente è corretta, ma caricamento rete e visualizzazione sul dispositivo finale non sono attestati.

**Conclusione:** la revisione mantiene le percentuali originariamente corrette e risolve lacune pratiche che possono causare acquisti e richieste errate; non assegna punteggi fittizi di 100/100.
