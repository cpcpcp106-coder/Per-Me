# Per Me — Audit editoriale e tecnico Guida 05
Data: 14 ottobre 2026
Pagina: `cedolino-pensione-obism-arretrati-verificare-importi.html`
Sezione: Pensione e invalidità, Guida 05.
Stato: **pubblicata nel repository**, con immagine originale `assets/pensione-guida-05.webp`; diffusione su GitHub Pages da controllare tramite Actions.

## Ambito e pubblico
Lettori 50–70 anni con difficoltà nel comprendere pagamenti pensionistici INPS, accrediti, trattenute, conguagli, pensione di invalidità e situazioni di reddito instabile.
La guida è gratuita, in linguaggio pratico, con esempio numerico dichiaratamente inventato. Non interpreta provvedimenti o documenti personali.

## Verifiche INPS primarie
1. Cedolino della pensione — funzioni «Confronta cedolini», visualizzazione cedolini, TE08, CU, OBIS/M:
https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.cedolino-della-pensione-50615.cedolino-della-pensione.html
2. ObisM 2026, messaggio n. 1443 del 30/04/2026, contenuti, storico 5 anni ed esclusioni:
https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.04.prestazioni-previdenziali-e-assistenziali-online-modello-obism.html
3. Scheda certificato OBIS/M:
https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.il-certificato-di-pensione-modello-ObisM.html
4. CU 2026 redditi 2025:
https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.03.online-la-certificazione-unica-2026.html
5. Fascicolo previdenziale cittadino, pagamenti e comunicazioni:
https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.fascicolo-previdenziale-del-cittadino-50865.fascicolo-previdenziale-del-cittadino.html
6. Cedolino giugno 2026, voci di trattenuta:
https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.05.pensionati-il-cedolino-di-pensione-di-giugno-2026.html
7. Cedolino settembre 2026, conguagli 730 e descrizioni:
https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.08.pensionati-il-cedolino-di-pensione-di-settembre-2026.html
8. Cedolino ottobre 2026, importi e date di pagamento:
https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.09.pensionati-il-cedolino-di-pensione-di-ottobre-2026.html
9. INPS guida 6 passi per pensioni basse, verifiche reddituali e conguagli:
https://www.inps.it/content/dam/inps-site/pdf/inpscomunica/2025-3-6_Guida_interattiva_in_6_passi_per_Pensionati_titolari_di_pensioni_di_importo_basso.pdf
10. INPS Risponde, stato richieste:
https://www.inps.it/it/it/sedi-e-contatti/contatti/inps-risponde.html

## Distinzioni e cautele
- Cedolino mensile, certificato OBIS/M e CU non sono intercambiabili; il CU certifica il precedente anno d'imposta.
- Nessun diritto ad arretrati automaticamente deducibile dalla sola variazione del netto.
- Modello OBIS/M non predisposto per APE sociale, assegni straordinari e isopensioni, salvo eccezioni specifiche.
- Diversi tipi di prestazione possono confluire in unico mandato di pagamento. Controllare provvedimento ed effettivo accredito.
- Una semplice richiesta di chiarimento non è data per sospensiva di termini legali.
- Testimonianza personale «Io mi sono appoggiato al CAF UIL e al Patronato ITAL UIL di Tarcento (UD).» non è sponsorizzazione.
- CAF fiscale; patronato previdenza, pratica INPS; assistenza legale per controversie giudiziarie.

## Controlli tecnici e limiti
- Verificare esistenza nuova pagina, immagine e collegamento nella rubrica.
- Verificare destinazioni interne, ancore e identificativi HTML.
- Layout mobile: tabella trasformata in schede con etichette; controlli sul CSS.
- La PWA `app/main.js` scarica dinamicamente le guide presenti nella rubrica quando torna online. Non modificata l'app; previste **17 pagine** (6 rubriche e 11 guide), da verificare sul dispositivo dopo sincronizzazione. Non dichiarare già salvate 17 pagine.
- Non effettuato un login privato MyINPS e non verificati dati personali.
- Non eseguito collaudo visivo su Samsung né audit WCAG con lettore di schermo; lo screenshot dell'autore resta il riferimento finale quando disponibile.


## Secondo audit critico integrale — 14 ottobre 2026

### Riscontri documentali e correzioni effettivamente applicate
1. **Trattamento fiscale di pensioni e invalidità.** La precedente versione trattava genericamente le trattenute fiscali senza avvisare che molte prestazioni assistenziali di invalidità civile sono esenti IRPEF, mentre le pensioni previdenziali generalmente seguono un diverso regime. Aggiunta nota operativa e distinzione dall'assegno ordinario di invalidità. Fonte: notizia INPS sul cedolino giugno 2026 (sezione «Le trattenute sulla pensione»).
2. **Confronto di documenti non omogenei.** L'OBIS/M contiene anche importi mensili netti, ma non attesta un effettivo accredito. Chiarito che il confronto dei cedolini deve riguardare lo stesso trattamento e periodi identificabili. Fonte: scheda «Certificato di pensione ObisM».
3. **Pagamenti recenti.** Inserito collegamento ufficiale al servizio INPS «Stato di un pagamento» e specificato il limite tecnico dell'interrogazione: i dati di pagamenti disposti oltre due mesi prima non sono consultabili in quel servizio. Per mesi precedenti orientare a documenti nel Fascicolo, cedolini e accrediti. Fonte: scheda del servizio INPS.
4. **730/2026.** Aggiunto il servizio ufficiale «Assistenza fiscale (730/4): servizi al cittadino» per le risultanze trasmesse all'INPS e i relativi esiti; disponibile a chi ha indicato INPS quale sostituto. Fonte: scheda del servizio, aggiornata maggio 2026, e cedolino settembre 2026.
5. **Alcuni bonus di ottobre 2026 non spettano a ogni pensionato.** Inserita specifica avvertenza sui benefici fiscali per prestazioni sostitutive del reddito da lavoro, tra cui alcune misure di accompagnamento alla pensione, distinti dai normali trattamenti pensionistici. Fonte: cedolino ottobre 2026.
6. **Esempio di importo netto.** Formula matematica corretta (1200 - 175 - 20 - 80 + 100 = 1025) ma troppo sintetica sul trattamento degli arretrati: esplicitato che i 100 euro sono ipoteticamente già netti e che nella realtà il dato potrebbe essere lordo, soggetto a trattenute o erogato separatamente. Ribadita la natura inventata.
7. **Privacy e assistenza.** Aggiunto avviso di non diffondere dati sanitari, IBAN, codici fiscali o cedolini integrali in canali pubblici; confermato che una richiesta INPS Risponde non va considerata automaticamente sospensiva dei termini di tutela.
8. **Accessibilità.** Didascalia fotografica allineata a sinistra, colore più leggibile e CSS richiamato con nuova versione per evitare copie obsolete su smartphone; preservata la foto della donna già approvata.

### Fonti primarie direttamente controllate
- INPS, giugno 2026, trattenute e prestazioni esenti da IRPEF:
https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.05.pensionati-il-cedolino-di-pensione-di-giugno-2026.html
- INPS, settembre 2026, conguagli 730:
https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.08.pensionati-il-cedolino-di-pensione-di-settembre-2026.html
- INPS, ottobre 2026, bonus su specifiche prestazioni sostitutive del reddito:
https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.09.pensionati-il-cedolino-di-pensione-di-ottobre-2026.html
- INPS, scheda OBIS/M:
https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.il-certificato-di-pensione-modello-ObisM.html
- INPS, Stato di un pagamento:
https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.stato-di-un-pagamento.html
- INPS, Assistenza fiscale (730/4):
https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.assistenza-fiscale-730-4-servizi-al-cittadino-52056.assistenza-fiscale-730-4-servizi-al-cittadino.html
- INPS, certificazione unica 2026 per redditi 2025:
https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.03.online-la-certificazione-unica-2026.html
- INPS, Guida in sei passi per pensionati, verifica reddituale, arretrati e indebiti:
https://www.inps.it/content/dam/inps-site/pdf/inpscomunica/2025-3-6_Guida_interattiva_in_6_passi_per_Pensionati_titolari_di_pensioni_di_importo_basso.pdf
- Telefonia patronato: elenco ufficiale ITAL UIL per Tarcento, 0432 782024, e fonte UIL FVG per CAF UIL Tarcento, 0432 785746 (indirizzi delle due sedi distinti). Recapiti e orari soggetti ad aggiornamento:
https://www.italuil.it/jsps/233/ALTRE_VOCI/234/Sedi_IT.jsp?regioni=6
https://uilfvg.org/wp-content/uploads/2017/02/Sedi-CAFUIL-nel-FVG_versione-2.pdf

### Collaudo del repository
- **12 voci** nella sezione fonti; **29 rimandi ad ancore** tutti esistenti; **14 identificatori** senza duplicati; **13 link locali** con destinazioni presenti; fotografia `assets/pensione-guida-05.webp` presente e richiamata.
- Testo della guida e CSS aggiornati; rubrica Pensione e invalidità contiene il link alla Guida 05; app configurata per sincronizzazione online dinamica, non verificata su smartphone.
- Commit del testo: `784d86e339c9a57293a95c7f98d9860320c15df5`; CSS `0575e23da5104df5aab56a7f8bcf7797c3a1de8a`; versione CSS guida `6e704f75008fdfa6a3cf60d7a3e45088d6a3e0fe`.
- Non effettuato login MyINPS o controllo di singoli diritti economici; non effettuato collaudo completo WCAG / screen reader sul dispositivo dell'autore.
