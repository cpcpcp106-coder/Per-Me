# PER ME — RAPPORTO DI COMPLETAMENTO DELL’AUDIT E QUALITÀ

**15 ottobre 2026.** Aggiornamento del [rapporto integrale](audit-integrale-2026-10-15.md). I controlli tecnici automatizzabili sono stati eseguiti. La verifica normativa integrale, i test umani WCAG 2.2 AA e il collaudo fisico sul Samsung restano **non completati**.

## Inventario, fatti e verifiche

| Test | Copertura effettiva | Risultato |
|---|---|---|
| Sorgenti HTML | 36/36 file | Inventario statico effettuato |
| Guide | 23/23 | Struttura esaminata, nessuna interamente verificata frase per frase |
| Fatti normativi nel registro | 62 selezionati in 23 guide | 61 confermati, 1 non verificabile dalla fonte primaria |
| Accessibilità axe-core | 34 pagine editoriali | Nessuna violazione automatica residua (NON certificazione WCAG) |
| Adattamento mobile | 34 pagine a 320 e 390 px | Nessuno scorrimento orizzontale imprevisto |
| PWA | 30 testi, service worker, manifest | Salvataggio, apertura offline e ritorno online superati in Chromium |
| Sito pubblico | Home, Guida 09, app | 3/3 HTTP 200 e principali elementi presenti |
| Collegamenti esterni | 224 URL distinti, 452 occorrenze | 223 raggiungibili HTTP, 1 HTTP 403 dal robot (CREA) |
| Collegamenti locali | 1.000 riferimenti statici | Nessun file e ancora mancanti nel test |

Il codice HTTP **non** dimostra che una fonte sostenga il testo citato. Il 403 del sito CREA non dimostra che sia inaccessibile ai lettori. Il totale delle affermazioni atomiche dell'intero sito non è noto: **percentuale complessiva di fact-check non calcolabile**.

## Valutazione prudenziale (criteri su 100)

| Criterio | Max | Prima | Dopo |
|---|---:|---:|---:|
| Accuratezza e fonti | 30 | 8 | 11 |
| Coerenza e organizzazione | 15 | 12 | 13 |
| Correttezza normativa/amministrativa | 15 | 7 | 9 |
| Usabilità e accessibilità | 15 | 10 | 13 |
| Qualità tecnica | 15 | 10 | 14 |
| Qualità editoriale | 10 | 7 | 7 |
| **Totale** | **100** | **54** | **67** |

**67/100** è un voto **provvisorio della qualità documentata**, non una percentuale di affermazioni vere. L'incremento riconosce 30 nuovi riscontri, test browser effettivi, correzioni CSS e PWA offline, senza assegnare il massimo ai controlli incompleti.

## Voti provvisori per guida, prima fase → dopo

**Lavoro:** 01 52→56; 02 47→51; 03 47→51; 04 48→52; 05 48→52; 06 48→52.

**Pensione e invalidità:** 01 54→58; 02 55→59; 03 55→59; 04 54→58; 05 54→58; 06 54→58; 07 54→58; 08 54→58.

**Debiti e cartelle:** 01 57→60; 02 53→57; 03 57→60; 04 63→66; 05 63→66; 06 62→65; 07 63→66; 08 57→60; 09 64→67.

Regola di aggiornamento: +2 usabilità e +1 tecnica per i test dinamici su ogni guida; +1 accuratezza per guide Lavoro/Pensione e Debiti 02, coperte da nuovi riscontri specifici. Sono voti di evidenza, non certificazioni.

## Problemi corretti

1. Link e intestazioni con contrasto insufficiente nella rubrica Debiti, Salute e nel footer app: CSS corretto; nuovo test axe-core senza violazioni automatiche.
2. Tabelle della guida «Dal lordo al netto» inizialmente non raggiungibili correttamente da tastiera: attributi e layout per schermi piccoli corretti e ricontrollati.
3. Guida 09: contraddizione con la Home sul contatto CAF UIL Tarcento risolta mediante fonte ARDiS FVG 2025, lasciando non verificati orari correnti.
4. Monitoraggio: GitHub Actions ora esegue collaudo Chromium, axe-core, prova offline PWA, controllo di tutte le URL esterne e apertura del sito pubblico; conserva risultati.
5. Registro normativo esteso a 62 affermazioni in 23 guide.

## Problemi e rischi non risolti

- **Normativa:** non è stato svolto fact-check atomico ESAUSTIVO di tutte le guide. Per ricorsi, termini, pignoramenti, INPS, contributi e salute sono indispensabili fonti vigenti e valutazione della singola pratica.
- **WCAG:** le analisi automatizzate non sostituiscono test reali con screen reader, navigazione da tastiera, focus e zoom 200%–400%; non affermare conformità WCAG 2.2 AA.
- **Samsung Android:** installazione della singola icona, offline reale dopo riavvio e aggiornamento senza duplicati non sono stati verificati sul dispositivo fisico.
- **Privacy:** vecchie informazioni forse ancora accessibili nella cronologia Git richiedono valutazione; nessuna riscrittura distruttiva della storia effettuata.
- **CREA:** pagina di linee guida alimentari restituisce HTTP 403 al robot; verificare in browser umano prima di chiamarla link guasto.
- **Rottamazione territoriale:** servizio in apertura programmata il 16 ottobre, da verificare effettivamente alla data; non è stato inventato un collegamento alla domanda.

## Evidenze salvate

- [Inventario statico](ultimo-audit-statico.json)
- [Browser, accessibilità e offline](ultimo-collaudo-browser.json)
- [Collegamenti esterni](ultimo-controllo-url-esterni.json)
- [Affermazioni con fonti e data](audit-2026-10-15-fatti.json)
- [Storico](audit-storico.json)

**Conclusione:** la componente tecnica automatizzabile è stata collaudata e corretta. **L'audit integrale richiesto resta parziale sotto il profilo normativo e manuale**, con rischi esplicitamente documentati.
