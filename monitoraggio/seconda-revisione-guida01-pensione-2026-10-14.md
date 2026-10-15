# Per Me — Seconda revisione indipendente della guida 01 «Pensione e invalidità»

> **Aggiornamento vincolante del 15 ottobre 2026:** le precedenti indicazioni di mantenere blocchi di indicizzazione sono superate dalla richiesta di Enrico. Tutte le pagine pubbliche del sito e dell’app devono consentire `index,follow`. Le descrizioni sottostanti documentano lo stato storico e non autorizzano a ripristinare i blocchi. Vedi [regola vigente](../REGOLE-AGGIORNAMENTO-APP-E-SITO.md#indicizzazione-delle-pagine-pubbliche).

Data: 14 ottobre 2026. Pagina: `inps-prestazione-sospesa-respinta-cosa-fare.html`.

## Metodo
Lettura completa del testo pubblicato nel repository; controllo incrociato di asserzioni normative con portale INPS e Normattiva; rilettura della struttura, sequenza operativa, termini e note; verifica automatica dei collegamenti locali, delle ancore e dei tag HTML. Il collaudo visuale su dispositivo e l'accesso autenticato a MyINPS restano esclusi.

## Problemi individuati e modifiche applicate
1. **Riferimento normativo errato.** Il link Normattiva all'art. 42 del d.l. 269/2003 presentava il suffisso `~art42-com7=` pur richiamando nel testo il comma 3. Sostituito con pagina Normattiva aggiornata dell'atto (codice 003G0303), con istruzione di consultare l'articolo 42, comma 3. Fonte: https://www.normattiva.it/atto/caricaDettaglioAtto?atto.codiceRedazionale=003G0303&atto.dataPubblicazioneGazzetta=2003-10-02
2. **Eccezione riforma disabilità over 70 assente.** Inserita novità INPS dal 1° giugno 2026: in particolari casi anche in provincia sperimentale vale procedura previgente con domanda amministrativa. Non basta la sola età. Fonti: https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.05.disabilit-over-70-le-novit-dal-1-giugno.html e messaggio INPS 1377/2026.
3. **Transitorio marzo 2026 poco preciso.** Specificata riapertura limitata fino al 31 marzo 2026 per certificati vecchio regime inviati entro il 28 febbraio 2026 (terza fase); non è una modalità disponibile indefinitamente. Fonte: https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.03.riforma-disabilit-riapertura-domande-online-per-invalidit-civile.html
4. **Ricorsi incompleti.** Integrata eccezione 30 giorni per spettacolo e sportivi professionisti, esclusione del silenzio-rigetto per i ricorsi amministrativi della Gestione Dipendenti Pubblici, differente decorrenza per pensioni pubbliche. Fonte: https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.ricorso-amministrativo-pensionistico-51189.ricorso-amministrativo-pensionistico.html
5. **Due differenti periodi di 90 giorni.** Precisato che i 90 giorni ordinatori per la DECISIONE di un ricorso amministrativo invalidità civile socio-economica non sono il termine per PRESENTARLO. Fonte: https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.ricorso-amministrativo-invalidit-civile-50296.ricorso-amministrativo-invalidit-civile.html
6. **AOI dopo 120 giorni.** Sostituita la formula vaga «verificare l'eventuale nuova domanda» con l'indicazione fondata sulle istruzioni INPS secondo cui la domanda tardiva è trattata come nuova domanda, conservando invito a leggere gli atti. Fonte: https://servizi2.inps.it/servizi/Bussola/visualizzadoc.aspx?sVirtuAlURL=%2Fcircolari%2FCircolare+numero+119+del+27-5-1993.htm
7. **Titolo fonti «verificate».** Reso «Fonti istituzionali e normative» e aggiunta spiegazione circa l'applicabilità al caso concreto. Rimossa la duplicazione del link Stato di un pagamento.

## Parti che la verifica conferma
- AOI: conferma da sei mesi prima o entro 120 giorni dopo la scadenza; diversa decorrenza secondo art. 1, co. 7-8, legge 222/1984.
- Cassetta postale online dal 2006 con copie PDF e ricevute quando disponibili.
- «Stato di un pagamento»: non espone pagamenti disposti oltre i due mesi precedenti la consultazione.
- Dal 1° marzo 2026 terza fase sperimentazione disabilità a Udine e Pordenone; procedura non da confondere con AOI.
- Dinieghi sanitari: ATPO e termine legale di sei mesi, con divergenza lessicale INPS («emissione») vs d.l. 269/2003, art. 42, co. 3 («comunicazione all'interessato»). Per tutela non calcolare da soli la data di scadenza.

## Controllo tecnico dopo la modifica
- Dieci titoli H2 (nove capitoli e fonti), 14 fonti numerate, 24 link esterni HTTPS complessivi.
- Assenza di riferimenti locali non esistenti o ancore interne mancanti.
- Bilanciati h1, h2, p, nav, ol, ul, li, tr, td, table, blockquote, div, article, main.
- Mantenuti i metadati `noindex,nofollow`.
- Non eseguiti: navigazione autenticata MyINPS, controllo grafico su browser e smartphone o test di ciascun URL dopo accesso.

## Giudizio
Sono stati individuati e corretti errori di fonte, omissioni procedurali e lacune sulle eccezioni. La guida è più solida sul piano normativo, ma non può garantire che ogni caso individuale ricada nelle regole generali: per una decisione su ricorso e termini occorrono il provvedimento completo, la notifica e la posizione previdenziale/assistenziale concreta.
