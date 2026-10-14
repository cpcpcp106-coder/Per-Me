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
