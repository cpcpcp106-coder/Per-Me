# Fase 3 — navigazione e accessibilità: 18 novembre 2026

## Realizzato
- `da-dove-cominciare.html`: 12 percorsi per problemi reali, collegati a guide e strumenti già presenti.
- `index.html`: riquadro iniziale con accesso al percorso, pulsante da almeno 60 px, contrasto previsto e testo leggibile.
- `sitemap.xml`: nuova pagina inserita.
- La nuova pagina contiene meta description, canonical, skip link, immagine con alt, collegamento Facebook e CSS responsive per smartphone.
- File riletti via GitHub dopo la scrittura; presenza dei collegamenti verificata nel codice.

## Limitazioni da non confondere con collaudo
- Nessun test pubblico HTTP/browser verificato per questa modifica, né test con lettori di schermo, navigazione da tastiera su dispositivo reale o prove WCAG 2.2 AA.
- Non sono state eseguite prove Android reali né test offline dopo le nuove pagine.
- Gli strumenti della fase 2 sono implementati ma il collaudo pubblico rimane aperto.
- La fase 1 ha ancora verifiche normative e scientifiche non concluse.
- La fase 3 è implementata come primo percorso per problemi reali; la conclusione integrale delle tre fasi richiede prove pubbliche e accessibilità effettiva.

## Verifica supplementare della pagina «Da dove cominciare?»
La pagina è stata riletta su GitHub: tutti i 12 collegamenti ai percorsi principali compaiono nella sitemap, così come i link a metodo e home. Il file contiene canonical, immagine con testo alternativo, skip link e collegamento Facebook. La verifica è statica: non misura effettivamente contrasto, dimensioni su dispositivo o usabilità con lettore di schermo.
Tentativi indipendenti di raggiungere https://cpcpcp106-coder.github.io/Per-Me/da-dove-cominciare.html: il runtime ha restituito errore DNS; l'accesso tramite web non è riuscito. Un browser remoto alternativo non ha avviato il test perché il servizio richiede credito a pagamento: nessun pagamento è stato autorizzato e non è stato effettuato. Questi fallimenti non dimostrano che il sito sia irraggiungibile per i lettori.
**Conclusione rigorosa:** Fase 3 implementata e controllata staticamente, ma collaudo pubblico e su Samsung non eseguiti; non certificabile come integralmente conclusa.
