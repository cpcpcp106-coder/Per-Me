# PER ME — Audit master integrale, ciclo del 15 ottobre 2026

**Perimetro esclusivo:** https://cpcpcp106-coder.github.io/Per-Me/ e repository `cpcpcp106-coder/Per-Me`. Nessun altro progetto personale incluso.

**Giudizio:** PARZIALMENTE VERIFICATO. **Punteggio iniziale ricalcolato 69/100; punteggio dopo le correzioni 70/100, PROVVISORIO.** Il precedente 67/100 era basato su un'altra ponderazione e resta un riferimento storico, non direttamente confrontabile. Non è una certificazione giuridica, clinica, WCAG o Google.

## Metodo e punteggi

Il valore misura le evidenze disponibili e applica penalità ai test mancanti. Non misura la percentuale delle frasi vere. Voto iniziale e finale di questo ciclo usano *la stessa griglia*. Un punto è recuperato nella leggibilità del banner Home: da circa 13 px e interlinea 1,25 a circa 17 px e interlinea 1,5. Gli altri riscontri legali migliorano la documentazione ma non azzerano la penalità per il fact-check non esaustivo.

| Area | Max | Prima | Dopo | Evidenze e limiti |
| --- | ---: | ---: | ---: | --- |
| Accuratezza giuridica, amministrativa e sanitaria | 18 | 8 | 8 | Registro 62 affermazioni selezionate: **62 confermate**, compresa C24 con Gazzetta Ufficiale. **Non** è completato il fact-check frase per frase delle 23 guide; mancano revisione indipendente professionale e verifica clinica delle future rubriche. |
| Qualità editoriale e utilità pratica | 14 | 10 | 10 | Guide con prossimo passo, documenti, cautele e fonti. Mancano prove con lettori reali e valutazione sistematica della comprensibilità. |
| Accessibilità e facilità d'uso | 13 | 9 | 10 | 34 documenti editoriali senza violazioni automatiche axe-core, reflow 320/390 px; ingrandito testo banner app. **Non** eseguiti lettore schermo Android, zoom 200–400% completo, tastiera su dispositivo e verifiche umane WCAG 2.2 AA. |
| Organizzazione, completezza e navigazione | 13 | 11 | 11 | 6 rubriche, 23 guide individuate, nove guide Debiti separate. Link interni e ancore testati senza riferimenti mancanti. Rubriche in costruzione e percorsi non ancora completi. |
| PWA, offline e aggiornamenti | 12 | 9 | 9 | Manifest, tre icone, service worker; 30 testi salvati e consultati offline in Chromium emulato, ritorno online testato. **Non** verificata l'installazione/offline su Samsung reale o la persistenza dopo aggiornamenti ripetuti. |
| Affidabilità tecnica e sicurezza | 10 | 8 | 8 | JS validato, controlli statici e browser automatizzati, nessun errore locale rilevato; restano audit privacy/storico Git, dipendenze e sicurezza del ciclo di rilascio. |
| SEO e indicizzazione | 8 | 6 | 6 | **24/24** pagine indexable nella sitemap; `noindex` sulle pagine non ancora pronte. La presenza in Search Console, lo stato reale di indicizzazione, Core Web Vitals e il robots.txt **a livello di origine** non sono certificati. |
| Qualità grafica e immagini | 6 | 3 | 3 | Asset distinti collegati alle 9 guide Debiti e ottimizzazione WebP. Non eseguito confronto umano di tutte le scene, dei diritti di uso e dei contrasti contestuali. |
| Pubblicazione e verifiche finali | 6 | 5 | 5 | Precedente distribuzione Pages riuscita per SHA `7775d0ae`; la pubblicazione degli aggiornamenti del presente ciclo deve essere nuovamente controllata. Test mobile reale non completato. |
| **Totale** | **100** | **69** | **70** | **30 punti non riconosciuti: test e revisioni mancanti.** |

## B. Problemi individuati

1. **Accessibilità (gravità media):** descrizione del pulsante «Installa o apri l'app Per Me» nella Home in `font-size:.82rem;line-height:1.25`, poco leggibile su smartphone.
2. **Tracciabilità giuridica (media):** registro C24 segnato NON_VERIFICABILE benché la Gazzetta Ufficiale, D.Lgs. 136/2024 art.43 nelle note all'art. 283 comma 6, riporti esplicitamente la riduzione del compenso OCC. La mancata conferma era un limite dell'accesso alla fonte, non una smentita.
3. **Contraddizione documentale (media):** il rapporto Guide 07–09 indicava correzioni «NON PUBBLICATE», mentre GitHub PR #2 era già unita a `main` il 15/10/2026 09:23 UTC.
4. **Criticità aperte, non da considerare errori accertati:** copertura giuridica non esaustiva, test WCAG/manuali Android, status Google Search Console, licenze e originalità immagini, review indipendente e controllo completo del rilascio odierno.

**Bloccanti accertati in questo ciclo:** nessuno tra i problemi puntualmente esaminati. **Assenza di bloccanti nel resto del sito NON DIMOSTRATA.** Nessun punto può essere attribuito per una verifica assente.

## C. Correzioni effettuate su `main`

- `index.html`: banner Home più leggibile, font circa 17 px e interlinea 1,5. Commit `ace95021b33d359c8d92bd913abe94b4244f0a5a`.
- `monitoraggio/audit-2026-10-15-fatti.json`: C24 confermata su fonte primaria Gazzetta Ufficiale; 62/62 affermazioni **campionate** confermate; `fully_exhaustive=false` conservato. Commit `dfdca596f8bdfe3e0ab6658b65c9eb6949cd8989`.
- `verifiche/audit-giuridico-guide-07-09-2026-10-15.md`: stato PR #2/#3 corretto per non confondere bozza e pubblicazione. Commit `602cc7faa80af67302669ef02831e00a2469489e`.
- Questo rapporto documenta il ciclo; gli audit storici sono preservati per il confronto.

## D. Test effettuati

- **SUPERATI nella pipeline al 15/10/2026:** audit statico 36 file HTML; browser Chromium 34 documenti editoriali, axe-core automatico, nessun overflow mobile rilevato; navigazione e ancore senza file mancanti; PWA 30 pagine salvate/offline; precedentemente **230/230** URL esterni raggiungibili via HTTP nel monitoraggio.
- **SUPERATI dopo la modifica Home:** GitHub Actions audit statico e collaudo browser sul commit `ace95021` con esito `success`.
- **LIMITI:** HTTP 200 non significa che un testo supporti una tesi; axe-core senza violazioni non certifica WCAG; Chromium emulato non equivale a Samsung reale; test passati su un commit non dimostrano il funzionamento di tutte le modifiche successive.
- **NON ESEGUITI in questa sessione:** controllo visivo sul telefono fisico, lettore schermo fisico, misura Lighthouse pubblica comparabile, scansione Search Console autenticata.

## E. Stato GitHub e pubblicazione

- PR #2 Guide Debiti e PR #3 PWA risultano **MERGED**. Prima delle correzioni odierne il deployment GitHub Pages per SHA `7775d0ae9e9046908c18e8932cb53f56a8583822` era **SUCCESS** (run 38713719252).
- Questo file **non** equivale a prova del deployment successivo alle correzioni. Per quello servono una run Pages conclusa `success` sull'ultimo SHA e una lettura live coerente.
- Differenze rigorosamente separate: file modificato → commit `main` → Pages distribuito → funzionalità verificata online.

## F. App

L'app è collegata nella Home, con manifest, icone e service worker coerenti. Il testo della pagina app specifica che l'offline è **solo per i testi già salvati**, non per fotografie, portali esterni e aggiornamenti. La prova in Chromium è positiva. Su Android reale lo stato resta **NON VERIFICATO**.

## G–H. Giudizio e distanza dall'obiettivo

**70/100, provvisorio — 30 punti da dimostrare/recuperare**, non 100/100. Le maggiori penalità riguardano copertura esaustiva delle norme e procedure, controlli manuali WCAG, test reale smartphone e verifica non simulata di indicizzazione/privacy. La correzione documentale di C24 non giustifica un aumento automatico del punteggio giuridico: è una singola proposizione selezionata.

## I. Singolo prossimo intervento prioritario

**Verificare frase per frase, con fonti primarie vigenti, le indicazioni sui termini e sui rimedi nella guida `riesame-ricorso-inps-termini.html`, correggendo immediatamente qualunque imprecisione che possa fare perdere un diritto.**

## Riferimenti delle prove

- Workflow audit browser 15/10 sul cambiamento Home: https://github.com/cpcpcp106-coder/Per-Me/actions/runs/38714459134
- Workflow audit statico 15/10 sul cambiamento Home: https://github.com/cpcpcp106-coder/Per-Me/actions/runs/38714459008
- Deployment già completato: https://github.com/cpcpcp106-coder/Per-Me/actions/runs/38713719252
- Fonte primaria C24: https://www.gazzettaufficiale.it/atto/serie_generale/caricaArticolo?art.codiceRedazionale=24G00154&art.dataPubblicazioneGazzetta=2024-09-27&art.flagTipoArticolo=0&art.idArticolo=43&art.idGruppo=1&art.idSottoArticolo=1&art.idSottoArticolo1=10&art.progressivo=0&art.versione=1
- ABF (ricorsi/reclami): https://www.arbitrobancariofinanziario.it/presentare-ricorso/verifiche-preliminari/index.html
- Consap (mutui): https://www.consap.it/fondo-di-sospensione-mutui-per-l-acquisto-della-prima-casa/
- ARERA (bonus TARI): https://www.arera.it/consumatori/bonus-sociale/bonus-sociale-per-disagio-economico/bonus-sociale-rifiuti-2-1
