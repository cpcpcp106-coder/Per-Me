# Per Me — Audit Rubrica 03 «Debiti e cartelle»
**Data:** 15 ottobre 2026
**Ambito:** `debiti-cartelle.html`, nove pagine `debiti-guida-01…09`, `sitemap.xml`, `style.css`, catalogo dell'app testuale.
**Stato:** REVISIONE DEL CODICE, NON COLLAUDO VISIVO LIVE; modifiche in ramo separato, non pubblicate.

## 1. Verifiche strutturali eseguite

| Controllo | Risultato |
| --- | --- |
| Pagine guida rintracciate su GitHub | 9/9 |
| Pagina indice rintracciata | 1/1 |
| Titolo `h1` univoco | 10/10 |
| Meta description e URL canonico | 10/10 |
| Presenza delle nove guide nella sitemap | 9/9 |
| Collegamenti fra indice e guide, inclusi frammenti locali | Nessuna destinazione mancante nei controlli automatici |
| URL delle immagini principali delle guide | 9 differenti; resa visuale NON collaudata |
| Fonti esterne | Presenti; non tutti gli URL sono stati aperti/testati end-to-end |
| Copia offline nell'app | Il codice di `app/main.js` acquisisce dai link delle rubriche le pagine disponibili. Nessuna prova di sincronizzazione reale su dispositivo eseguita durante questo audit |

La verifica di riferimenti e ancore è strutturale, non equivale a un test dei click nel browser. Nel sito si trovano anche collegamenti esterni ad amministrazioni che possono rifiutare richieste automatizzate.

## 2. Controlli a campione sui fatti più sensibili

- **Cartella di pagamento:** 60 giorni ordinari dalla notifica per pagare; termini d'impugnazione separati. Fonte: https://www.agenziaentrateriscossione.gov.it/it/la-guida-alla-cartella-di-pagamento/la-cartella-di-pagamento/
- **Situazione debitoria AdeR:** nuova versione comunicata il 7 aprile 2026, con riepilogo unitario e prospetto entro 24 ore. Fonte: https://www.agenziaentrateriscossione.gov.it/link-esterni/Online-la-nuova-versione-del-servizio-Situazione-debitoria-e-la-guida
- **Sospensione legale:** motivi specifici, domanda entro 60 giorni e disciplina dei 220 giorni, con eccezioni. Fonti: https://www.agenziaentrateriscossione.gov.it/it/imprese/Sospensione/ e art. 120 D.Lgs. 33/2025 (testo unico con effetto dal 1° gennaio 2026).
- **Rateizzazione 2026:** per importi fino a 120.000 € contenuti in ciascuna istanza, massimo 84 rate su semplice richiesta; fino a 120 in casi documentati; rata minima 50 €. Fonte: https://www.agenziaentrateriscossione.gov.it/it/cittadini/Rateizzazione/la-rateizzazione/
- **Rottamazione-quinquies:** presentazione nazionale chiusa il 30 aprile 2026; la legge 88/2026 come modificata stabilisce la finestra 16 ottobre–15 dicembre 2026 per i carichi ammessi degli enti territoriali aderenti. Il servizio nuovo non è stato qui collaudato. Fonti: https://www.agenziaentrateriscossione.gov.it/it/Per-saperne-di-piu/ultimi-provvedimenti-normativi-riscossione/legge-n.-88-2026/index.html e https://www.agenziaentrateriscossione.gov.it/link-esterni/Link_Domanda_Adesione_Rottamazione_Quinquies_AP.ext
- **Fermo, ipoteca e stipendio:** preavviso fermo di 30 giorni; soglia ipoteca AdeR 20.000 €; quote stipendiali speciali 1/10, 1/7, 1/5 per gli scaglioni indicati. Fonti: https://www.agenziaentrateriscossione.gov.it/it/Per-saperne-di-piu/le-procedure/procedurecautelari/index.html e https://www.agenziaentrateriscossione.gov.it/it/Per-saperne-di-piu/le-procedure/procedure-esecutive/
- **Patronato ITAL UIL Tarcento:** numero 0432 782024 e indirizzo via Dante Alighieri 27 riscontrati nella pagina ufficiale https://www.italuil.it/jsps/233/ALTRE_VOCI/234/Sedi_IT.jsp?regioni=6.

Questi controlli sono **a campione**; non rappresentano una validazione giuridica di ciascuna frase e delle eccezioni delle nove guide. La presenza di fonti non certifica da sola l'assenza di errori.

## 3. Problemi rilevati e patch preparate in questo ramo

1. **Leggibilità smartphone:** la dimensione dei testi piccoli (note, didascalie e card) dipendeva da regole di pagina con dimensioni inferiori al corpo principale. Aggiunta regola CSS mirata alla sola rubrica Debiti e cartelle, con testo secondario aumentato e spaziatura adeguata. Non è un certificato WCAG e richiede un test visivo Android.
2. **Data editoriale disallineata:** indice fermo al 14 ottobre nonostante alcune guide revisionate il 15. Allineato l'indice al 15 ottobre.
3. **Necessità di collaudo finale:** prima di pubblicare, verificare la prima apertura, i nove collegamenti, lo zoom, le interruzioni di riga, gli eventuali scorrimenti orizzontali e gli ingrandimenti su Android; nessuna attestazione di test dispositivo viene fatta senza esecuzione.

## 4. Lavori ancora aperti

- Revisione giuridica **riga per riga** delle guide 07–09 e riesame delle eccezioni nei casi giudiziari della 06. La casistica del sovraindebitamento richiede prudenza.
- Test con browser reale, emulazione mobile/lettore schermo e verifica di tutti i link verso risorse esterne. Taluni siti non consentono la lettura automatica.
- Riscontro visivo delle nove fotografie: gli URL sono differenti, ma originalità e realismo non sono stati giudicati dalle immagini.
- Ripetere la verifica della Guida 05 dopo l'apertura del 16 ottobre, controllando il percorso ufficiale di adesione per gli enti territoriali, senza confonderlo con quello nazionale scaduto.
- Test pratico dell'app online/offline; il ramo separato della PR #1 relativo ai contatori di sincronizzazione **non va unito senza autorizzazione**.

## 5. Politica di rilascio
Questo ramo prepara soltanto correzioni editoriali/accessibili. Non effettuare merge né pubblicazione senza una nuova indicazione. Le modifiche dell'app attualmente in PR #1 rimangono indipendenti.
