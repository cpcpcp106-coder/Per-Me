# Per Me — Prima revisione critica separata delle Guide 01–05 della Dieta mediterranea
**23 ottobre 2026 · Ambito:** cinque guide effettivamente pubblicate della rubrica 08, più verifica dei dati della ricetta dei borlotti e riso. **Stato:** revisione editoriale/documentale mirata conclusa per i fatti riportati; **non** una validazione clinica indipendente frase-per-frase.

## Perché questo controllo non duplica i lavori precedenti
Le 30 guide "Diabete tipo 2" sono state già oggetto di cicli di revisione individuali; le Guide 07 e 08 "Agevolazioni" hanno commit di revisioni normative e correzioni del 15/10. Le Guide 01–05 "Dieta mediterranea scientifica" sono state create il 23/10 con audit tecnici, ma **prima di questo ciclo non avevano una seconda revisione critica distinta dalla redazione iniziale**. Questo documento registra tale controllo, non attribuisce risultati mancanti a revisori esterni.

## Esito per singola guida

| Guida | Verifiche critiche effettuate | Modifiche e risultato |
|---|---|---|
| 01 — Modello mediterraneo e diabete | ADA 2026 §5: raccomandazioni 5.10, 5.27–5.30, gradi di evidenza A/B, personalizzazione dei carboidrati e sicurezza dell'insulina. CREA Linee guida italiane e Ministero della Salute. | **Nessuna modifica necessaria sui punti riscontrati.** Restano necessari controlli clinici periodici delle nuove raccomandazioni. |
| 02 — Prevenzione cardiovascolare | AHA 2026, ADA 2026, PREDIMED 2018 (esito combinato), BMJ 2019 e BMJ Nutrition 2024 sui bias metodologici. Distinzione primaria/secondaria. | **Corretto:** precisato che la differenza nell'esito combinato era guidata soprattutto dall'ictus, non da riduzioni individualmente dimostrate di infarto o mortalità totale; ricordata l'interruzione anticipata e aggiunto collegamento a BMJ 2019. Commit `c1bb9641`. |
| 03 — Carboidrati, fibre, IG e CG | ADA 2026, Diabetes UK (22/09/2025), formula del carico glicemico e differenza peso alimento/peso dei carboidrati. | **Corretto:** chiarito che la misura dell'IG usa normalmente alimenti in quantità tali da fornire **50 g di carboidrati disponibili**, non porzioni di **50 g di alimento**. Commit `8f41d65b`. |
| 04 — Porzioni, pesi crudi e cotti | CREA codici 000800 e 000805; tabella C con fattore 1,88 per pasta di semola corta, 2,10 lunga; 2,3 per fagioli secchi e 2,9 per ceci. Parte edibile/costi: esempi inventati esplicitamente. | **Corretto:** distinta la differenza di arrotondamento CREA, **175 kcal/100 g** e **349 kcal per 200 g** nella stessa scheda, per evitare che il lettore interpreti erroneamente come valori esatti i dati medi pubblicati. Commit `a0d9ea7d`. |
| 05 — Grassi ed EVO | AHA 2026, CREA codice 009210, regolamento delegato UE 2022/2104 art. 8, origine olive e frantoio; prezzo per 10 ml distinto da energia per 10 g. | **Nessuna modifica necessaria sui punti riscontrati.** Confermati 899 kcal per 100 g, 90 kcal e 0 g carboidrati disponibili per 10 g; una dicitura italiana del marchio non sostituisce l'indicazione di origine prevista dalla norma. |

## Riscontri puntuali sulla ricetta già pubblicata
`ricetta-insalata-borlotti-riso-integrale-pomodori.html` è una ricetta originale con quattro ingredienti. Riconfrontati con CREA: borlotti cotti da secchi `004125`, riso integrale cotto `000115`, pomodori maturi `006610`, olio EVO `009210`. Dati per 100 g usati nella ricetta: borlotti 106 kcal/16,4 g carboidrati; riso 113/25,5; pomodori 23/3,5; EVO 899/0.

Calcolo con 180 g borlotti, 140 g riso, 200 g pomodori e 20 g olio:
- Totale carboidrati disponibili: `180×16,4/100 + 140×25,5/100 + 200×3,5/100 = 72,22 g`.
- Totale energia: `180×106/100 + 140×113/100 + 200×23/100 + 20×899/100 = 574,8 kcal`.
- Per due porzioni uguali: **36,1 g carboidrati disponibili** e **circa 287 kcal**, stimati e non analisi di laboratorio. La foto è illustrativa; il dato si riferisce ai pesi cotti/scolati quando indicati.

## Fonti verificate nella revisione
- ADA Standards 2026 §5: https://doi.org/10.2337/dc26-S005
- AHA Dietary Guidance 2026: https://professional.heart.org/en/science-news/2026-dietary-guidance-to-improve-cardiovascular-health/top-things-to-know
- CREA, schede: https://www.alimentinutrizione.it/tabelle-nutrizionali/000800 ; https://www.alimentinutrizione.it/tabelle-nutrizionali/000805 ; https://www.alimentinutrizione.it/tabelle-nutrizionali/004125 ; https://www.alimentinutrizione.it/tabelle-nutrizionali/000115 ; https://www.alimentinutrizione.it/tabelle-nutrizionali/006610 ; https://www.alimentinutrizione.it/tabelle-nutrizionali/009210 ; https://www.alimentinutrizione.it/presentazione-dati
- Diabetes UK, IG: https://www.diabetes.org.uk/living-with-diabetes/eating/carbohydrates-and-diabetes/glycaemic-index-and-diabetes
- BMJ 2019, PREDIMED: https://www.bmj.com/content/364/bmj.l341.full
- Regolamento UE EVO: https://eur-lex.europa.eu/legal-content/IT/ALL/?uri=CELEX%3A02022R2104-20240610

Le pagine NEJM e Diabetes Care possono bloccare alcuni accessi automatizzati: non dedurre un URL inesistente da un blocco antibot. Sono state inoltre reperite versioni delle raccomandazioni ADA su siti accessibili.

## Cosa resta da fare, senza ripetere revisioni completate

1. **Rubriche generali lavoro/previdenza e debiti**: revisione documentale trasversale già svolta nel rapporto del 15/10, ma non equivale a controllo *frase-per-frase* di tutte le scadenze e le eccezioni; priorità ai termini di ricorso INPS, pignoramenti, sovraindebitamento, e norme locali FVG.
2. **Salute e autonomia, Guide 01–04:** sono documentati interventi editoriali e scientifici mirati, non una validazione professionale indipendente.
3. **Tutor AI:** base più sei approfondimenti già pubblicati e test tecnici; mancano prove con persone 50–70 anni e Android fisico.
4. **Dieta mediterranea Guide 06–08:** non ancora pubblicate; **non sono guide già revisionabili come pagine complete**.
5. **Indicizzazione e lettori:** Google Search Console, visite esterne e reale comprensione non sono dimostrati dalla sitemap o dai test automatici.

**Regola permanente:** non ripetere controlli già documentati senza nuove prove, ma intervenire se una norma cambia, una fonte si smentisce o emerge un errore concreto.
