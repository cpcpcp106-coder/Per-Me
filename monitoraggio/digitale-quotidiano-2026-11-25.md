# Digitale quotidiano — 25 novembre 2026

Nuova rubrica con due guide: telefono più leggibile (Samsung, altri Android, iPhone) e SPID/CIE (accesso, recupero, assistenza). Foto diverse generate per le tre pagine, senza materiale di riferimento; conversione in WebP. Provenienza in `FONTI/digitale-immagini-2026-11-25.json` e nel registro immagini.

## Integrazione

- Homepage: nuova scheda nella sezione rubriche.
- Ricerca e PWA: catalogo condiviso aggiornato, cache versione 32; testi scaricabili e disponibili nel lettore.
- Sitemap: tre nuove URL, canonical e metadati social. Pulsante Facebook nel contenuto di ciascuna pagina.
- Nessun nuovo dato personale del curatore aggiunto.

## Verifiche eseguite prima della pubblicazione

Layout condiviso, struttura e link interni, indicizzabilità statica, audit editoriale, registro immagini e componente Facebook superati. Tutti i 19 test unitari dell'app superati. 154 URL pubbliche in sitemap e raggiungibili dalla home nel controllo statico.

Nel browser è stata aperta la rubrica e sono stati seguiti i percorsi delle guide; foto caricate e pulsanti Facebook presenti. Nell'app la sincronizzazione ha salvato 138 pagine, comprese le tre nuove; aperto il testo SPID/CIE dal lettore. Queste prove non certificano il funzionamento dei servizi SPID/CIE o delle impostazioni su telefoni fisici.

Il collaudo dedicato in GitHub verifica viewport 320/390, ingrandimento del testo, navigazione, foto, Facebook e riapertura delle guide senza rete. Esito da registrare dopo l'esecuzione.

## Fonti

Documentazione primaria Google, Samsung, Apple, portale SPID e Ministero dell'Interno, collegata nelle guide. Il controllo HTTP diretto è registrato in `digitale-fonti-http-2026-11-25.json`: le fonti Google sono state lette tramite ricerca web ufficiale, mentre la sessione diretta ha ricevuto HTTP 429. I collegamenti non sono stati sostituiti per questo limite temporaneo.

## Pubblicazione

In attesa dell'esito dei controlli GitHub e della verifica sul sito pubblico. I riferimenti canonici delle nuove pagine non costituiscono ancora prova di avvenuta pubblicazione.

## Prosecuzione

Calendario aggiornato in `piano-rubriche-2026-11-25.json`, con avvio oggi e obiettivo di completamento il 30 novembre. L'eventuale esecuzione programmata va verificata tramite lo strumento delle attività, non dedotta dalla sola presenza del calendario.
