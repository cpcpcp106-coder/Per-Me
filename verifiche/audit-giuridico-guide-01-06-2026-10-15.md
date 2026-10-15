# Per Me — Audit giuridico Guide 01–06, Rubrica 03

**Data della verifica:** 15 ottobre 2026.  
**Oggetto:** cartelle, situazione debitoria, sospensione legale, rateizzazione, definizione agevolata, cautelari/esecuzione.  
**Criterio:** controllo della disciplina legale, distinzione fra rimedi, scadenze, fonti primarie e casi pratici. Tutte le modifiche sono tracciate nei commit della PR #2.

## Risultato per guida

| Guida | Controlli legali principali | Correzione editoriale apportata |
|---|---|---|
| 01 — Leggere la cartella | Cartella, intimazione, fermo, avviso INPS; differenza fra notifica, pagamento e impugnazione. I 60 giorni della cartella non sono termine universale per impugnare. | Esplicitato il rischio di perdere un termine di ricorso più breve; le comunicazioni successive non riaprono necessariamente i termini di contestazione. |
| 02 — Controllare i debiti | Situazione debitoria AdeR, riepilogo nazionale, tempi di rilascio del prospetto, creditori esclusi, rate/pagamenti distinti da carichi originari. | Precisato che il prospetto è una fotografia riferita alla data di consultazione e non certifica tutti i debiti; invitato a contattare altri enti e concessionari non compresi nel portale. |
| 03 — Debito sbagliato | Art. 120 D.Lgs. 33/2025, sospensione legale SL1, motivi tassativi, termine di 60 giorni, esito ente, annullamento condizionato dopo 220 giorni, distinzione da autotutela e ricorso. | Reso esplicito che i 220 giorni NON sono un termine ordinario applicabile a qualunque reclamo; avvertenza a non impiegare SL1 per richieste estranee ai casi previsti. |
| 04 — Rateizzazione | D.Lgs. 110/2024/art. 19 DPR 602/1973: 84 rate semplici nel 2026 per istanza ≤120.000 €, 85–120 documentate, per importi superiori documentazione, rata minima 50 €. Decadenza ordinaria a otto rate, anche non consecutive, per piani richiesti dal 16/07/2022. Verificati tassi AdeR 4,5% erariale e 4,65% previdenziale. | **Rimosso un errore di merito:** l'ultima rata non determina autonomamente la decadenza dalla rateizzazione ordinaria come nella Rottamazione-quinquies. Precisata la disciplina INPS 2026: 36 rate per debiti contributivi fino a 500.000 €, fino a 60 oltre. |
| 05 — Rottamazione | Distinzione nazionale (domande chiuse 30/04/2026) e territoriale (adesioni 16/10–15/12/2026 se ente aderente), legge 199/2025 e leggi 88 e 113/2026, 54 rate bimestrali, rata minima 100 €, interesse 3%, principali eccezioni di decadenza. | Chiarito che la mancata disponibilità del link al modulo nella verifica mattutina del 15/10 è un'osservazione datata e non una dichiarazione su disponibilità corrente. |
| 06 — Fermo, ipoteca, pignoramento | Distinte misure cautelari/esecutive, 30 giorni di preavviso, limite 20.000 € per ipoteca, condizioni per espropriazione immobiliare, art. 171 D.Lgs. 33/2025 sulle quote di stipendio e art. 545 c.p.c. su pensioni/accrediti. Assegno sociale INPS 2026: 546,24 €. | Richiamata la differenza fra retribuzione lorda e somme soggette a trattenuta; richiesti estratti conto e cedolini per verificare la provenienza degli accrediti. |

## Le criticità che devono restare visibili

1. **Atti esecutivi e processuali:** per precetto, pignoramento e ricorsi il termine dipende dall'atto e dal vizio; nessuna guida può calcolare la scadenza individuale senza la notifica.
2. **Rateizzazione versus rottamazione:** non sono intercambiabili. La disciplina della decadenza della Rottamazione-quinquies include il mancato pagamento dell'ultima rata; quella ordinaria richiede di norma otto rate insolute, anche non consecutive, nei piani post 16/07/2022.
3. **Sospensione legale:** i 220 giorni si riferiscono soltanto ai presupposti di legge e non garantiscono un annullamento generalizzato per silenzio su reclami.
4. **Conto corrente e pensione:** distinzione fra prestazioni assistenziali e previdenziali, provenienza e data dell'accredito; non proporre un unico "minimo protetto" valido per ogni caso.
5. **Rottamazione territoriale:** l'adesione dell'ente e la definibilità del singolo carico sono requisiti autonomi; le novità sul modulo online possono cambiare dopo la verifica editoriale.

## Fonti istituzionali essenziali (consultazione 15/10/2026)

- Agenzia entrate-Riscossione, rateizzazione 2025–2026: https://www.agenziaentrateriscossione.gov.it/it/cittadini/Rateizzazione/la-rateizzazione/
- Agenzia entrate-Riscossione, decadenza e normativa: https://www.agenziaentrateriscossione.gov.it/it/rateizzazione-delle-cartelle-di-pagamento/decadenza/
- INPS, rateazione dei debiti contributivi 2026: https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.05.nuova-disciplina-per-la-rateazione-dei-debiti-contributivi.html
- AdeR, sospensione legale, motivi, 60 e 220 giorni: https://www.agenziaentrateriscossione.gov.it/it/cittadini/Sospensione/index.html
- D.Lgs. 33/2025 (art. 120 e art. 171): https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2025-03-24;33
- AdeR, legge 113/2026 e rottamazione territoriale: https://www.agenziaentrateriscossione.gov.it/it/il-gruppo/lagenzia-comunica/novita/Legge-n.-113-2026-piu-tempo-per-la-Rottamazione-degli-enti-territoriali/
- AdeR, definizione agevolata nazionale: https://www.agenziaentrateriscossione.gov.it/it/Per-saperne-di-piu/definizione-agevolata-rottamazione-quinquies/
- AdeR, procedure esecutive e quote stipendio: https://www.agenziaentrateriscossione.gov.it/it/Per-saperne-di-piu/le-procedure/procedure-esecutive/
- INPS, importo assegno sociale 2026: https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.assegno-sociale-50184.assegno-sociale.html

## Verifica tecnica

Workflow GitHub Actions dedicato: https://github.com/cpcpcp106-coder/Per-Me/actions/runs/38712227085 — **success**. Si controllano 10 pagine (indice + 9 guide), presenza immagini, unicità percorsi, 1 H1 per pagina, metadati, navigazione e ancore, oltre a tre verifiche di testo sulle regole critiche. Non è un controllo visivo: immagini differenti come percorso potrebbero comunque risultare visivamente simili.

Test app: https://github.com/cpcpcp106-coder/Per-Me/actions/runs/38710193038 — **success** sui test di sincronizzazione unitaria. Non è stata simulata la lettura offline su Android reale.

## Limitazioni e vincoli

La presente verifica è editoriale e non costituisce certificazione professionale di ogni possibile situazione, sentenza o prassi applicativa. L'apertura pubblica di tutte le URL esterne e il collaudo Android reale non sono stati completati tramite questi strumenti. La revisione giuridica Guide 07–09 è documentata separatamente in `audit-giuridico-guide-07-09-2026-10-15.md`.
