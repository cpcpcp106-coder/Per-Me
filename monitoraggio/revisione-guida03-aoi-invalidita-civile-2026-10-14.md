# Per Me — Revisione critica della guida 03: AOI e invalidità civile

> **Aggiornamento vincolante del 15 ottobre 2026:** le precedenti indicazioni di mantenere blocchi di indicizzazione sono superate dalla richiesta di Enrico. Tutte le pagine pubbliche del sito e dell’app devono consentire `index,follow`. Le descrizioni sottostanti documentano lo stato storico e non autorizzano a ripristinare i blocchi. Vedi [regola vigente](../REGOLE-AGGIORNAMENTO-APP-E-SITO.md#indicizzazione-delle-pagine-pubbliche).

**Data:** 14 ottobre 2026  
**Pagina:** `aoi-invalidita-civile-differenze.html`  
**Rubrica:** Pensione e invalidità, punto 03.

## Pubblicazione e perimetro
Il testo è presente sul ramo `main`, la guida è collegata dall'indice della rubrica e dispone di un'immagine specifica `assets/pensione-guida-03.webp`. Le immagini delle guide 01, 02 e 03 sono file diversi, con SHA Git differenti; ispezione delle tre anteprime effettuata. La pagina resta `noindex,nofollow`, come le altre pagine del progetto in costruzione, fino al collaudo richiesto dal piano editoriale. L'accessibilità dal sito pubblicato, la resa sul telefono e la persistenza offline non sono state collaudate mediante browser reale in questa sessione.

## Verifiche medico-legali e previdenziali
- **AOI**: distinto dall'accertamento di invalidità civile; requisiti sanitari (capacità lavorativa ridotta a meno di un terzo), assicurativi e contributivi (5 anni, 260 settimane totali, 156 nel quinquennio). Fonte: scheda INPS AOI aggiornata 24/08/2026; legge 222/1984.
- **Assegno mensile civile 74–99%**: 18–67 anni, nel 2026 limite reddito personale annuo **5.852,21 €**, redditi valutati secondo criteri INPS; regola sull'inattività lavorativa ex art. 12-ter DL 146/2021. L'assegno è incompatibile con l'AOI; esiste facoltà di opzione. Fonte: scheda INPS assegno mensile aggiornata 20/07/2026.
- **Pensione di inabilità civile 100%**: 18–67 anni, nel 2026 reddito personale sotto **20.029,55 €**; compatibilità con attività lavorativa e pensioni dirette di invalidità previdenziale indicate nella scheda INPS, nei limiti dei requisiti. Non confondere con pensione previdenziale di inabilità che esclude il lavoro.
- **67 anni**: per il 2026 l'età dell'assegno sociale è 67 anni. Assegno civile 74–99% e pensione civile di inabilità si trasformano in assegno sociale sostitutivo a tale età.
- **Accompagnamento**: presupposti sanitari ulteriori rispetto al solo 100%; senza requisito reddituale generale, compatibile con il lavoro, con incompatibilità e sospensioni specifiche.
- **Riforma 2026**: dal 1° marzo 2026 la sperimentazione della nuova valutazione di base è stata estesa a 40 province, fra cui Udine e Pordenone; il certificato medico introduttivo avvia l'accertamento nei nuovi casi previsti, con eccezioni transitorie. Il procedimento civile non sostituisce la domanda previdenziale AOI.

## Correzioni pubblicate in questa revisione
1. Indicata esplicitamente la fascia 18–67 anni per le due prestazioni assistenziali civili principali.
2. Aggiunto il passaggio a assegno sociale sostitutivo al raggiungimento dell'età prevista per il 2026.
3. Precisato l'obbligo di comunicazione previsto da INPS per incompatibilità sopravvenuta nell'ipotesi specifica di un trattamento pensionistico di invalidità incompatibile riconosciuto da altro ente: 30 giorni dalla notifica del provvedimento. Non applicare tale termine indistintamente.
4. Resa più informativa la descrizione SEO.

## Controlli repository
- 58 collegamenti complessivi censiti nella pagina (interni ed esterni); verificati staticamente tutti i percorsi locali e gli ancoraggi: nessun collegamento locale o ancoraggio mancante. I link a siti esterni non sono stati tutti collaudati in un browser.
- 12 identificativi `id`; nessun duplicato.
- 8 voci nelle fonti, con schede INPS e riferimento a Normattiva.
- Guida 03 presente nell'indice della rubrica `pensione-invalidita.html`.
- Immagine 03 caricata nel repository e diversa dalle immagini 01 e 02.
- L'app `app/main.js` legge online i collegamenti alle guide dalla rubrica e scarica il testo; al primo avvio online e ai successivi aggiornamenti effettua una sincronizzazione. Non si attesta la corretta lettura offline sul dispositivo finché non viene provata.

## Fonti istituzionali
- INPS — AOI: https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.assegno-ordinario-di-invalidit-per-persone-con-capacit-lavorativa-ridotta-50294.assegno-ordinario-di-invalidit-per-persone-con-capacit-lavorativa-ridotta.html
- INPS — Assegno mensile: https://www.inps.it/it/it/dettaglio-approfondimento.schede-informative.assegno-mensile-di-assistenza.html
- INPS — Pensione di inabilità civile: https://www.inps.it/it/it/dettaglio-approfondimento.schede-informative.pensione-di-inabilit-agli-invalidi-civili.html
- INPS — Accompagnamento: https://www.inps.it/it/it/dettaglio-approfondimento.schede-informative.indennit-di-accompagnamento-agli-invalidi-civili.html
- INPS — Riforma fase 3: https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.03.avviata-la-terza-fase-sperimentale-della-riforma-della-disabilit.html
- Normattiva — legge 222/1984: https://www.normattiva.it/atto/caricaDettaglioAtto?atto.codiceRedazionale=084U0222&atto.dataPubblicazioneGazzetta=1984-06-16

## Limiti espliciti
La verifica è di coerenza con le informazioni istituzionali consultate e con il codice GitHub. Non costituisce parere sul diritto individuale alla prestazione; per casi concreti si devono controllare provvedimenti, decorrenze, redditi e posizione contributiva. Non è stato possibile confermare mediante browser la risposta del dominio GitHub Pages, quindi non dichiarare un collaudo live completato.
