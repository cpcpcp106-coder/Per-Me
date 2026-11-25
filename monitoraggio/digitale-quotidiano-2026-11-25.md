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

Il collaudo dedicato in GitHub ha superato tutte le 50 verifiche: viewport 320/390, ingrandimento del testo, navigazione, foto, Facebook e riapertura delle guide senza rete. Log: https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45578708524/job/139083005336 .

## Fonti

Documentazione primaria Google, Samsung, Apple, portale SPID e Ministero dell'Interno, collegata nelle guide. Il controllo HTTP diretto è registrato in `digitale-fonti-http-2026-11-25.json`: le fonti Google sono state lette tramite ricerca web ufficiale, mentre la sessione diretta ha ricevuto HTTP 429. I collegamenti non sono stati sostituiti per questo limite temporaneo.

## Pubblicazione

Pubblicazione completata e verificata. PR #37 integrata dopo 22 controlli superati sul commit dcd8f54ed539dc433fb833c352bd93b740017a19. Merge b2d1fa2eeda541ba132b6681b2f05be10b3cc5cb. La pubblicazione Pages riuscita riguarda il successivo snapshot automatico b796cda0bf420c5aa62bd64ef4aba5397b6e0201, che comprende le stesse modifiche.

- PR: https://github.com/cpcpcp106-coder/Per-Me/pull/37
- Deployment riuscito: https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45579064508
- Rubrica: https://cpcpcp106-coder.github.io/Per-Me/digitale-quotidiano.html
- Telefono: https://cpcpcp106-coder.github.io/Per-Me/digitale-telefono-leggibile.html
- SPID e CIE: https://cpcpcp106-coder.github.io/Per-Me/digitale-spid-cie-accesso-recupero.html

Verifica HTTP pubblica completata: 12 risorse con risposta 200, comprese le tre pagine, le tre fotografie, CSS, homepage, catalogo app, app, service worker e sitemap. Homepage con 10 rubriche; sitemap con 154 URL. Foto e Facebook verificati anche nel browser pubblico. Dettagli in `digitale-verifica-pubblica-2026-11-25.json`.

Annunci social preparati in `divulgazione/digitale-quotidiano-2026-11-25.md`; non risulta un invio social effettuato in questo intervento.

## Prosecuzione

Calendario aggiornato in `piano-rubriche-2026-11-25.json`, con avvio oggi e obiettivo di completamento il 30 novembre. Pianificazione creata e verificata come attiva: cinque esecuzioni giornaliere dal 26 al 30 novembre, indicativamente alle 08:00 Europe/Rome, partendo da Acquisti e contratti. Le date sono obiettivi subordinati al completamento dei controlli.
