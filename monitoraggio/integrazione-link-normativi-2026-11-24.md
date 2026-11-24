# Per Me — Integrazione dei collegamenti normativi

Data: **24 novembre 2026**, ora italiana. Base: `a9fcf4910442125c8de96bd070e730b2ff24914c`.

## Intervento

Alle nove destinazioni DEF già esaminate nel [controllo del sito](verifica-sito-fonti-link-2026-11-24.md), presenti in quindici occorrenze, è stato affiancato il collegamento al corrispondente articolo su Normattiva. Gli originali sono conservati: il precedente HTTP 503 non dimostra un riferimento errato.

| Guida | Articoli con alternativa Normattiva | Ulteriori precisazioni |
|---|---|---|
| [Sovraindebitamento](https://cpcpcp106-coder.github.io/Per-Me/debiti-guida-08-sovraindebitamento.html) | D.Lgs. 14/2019: 67, 69, 74, 283 | Collegato l'art. 70, comma 7, sull'omologazione; precisati il momento di valutazione dell'attivo, gli atti eccedenti l'ordinaria amministrazione e la condizione «ove positiva» per la dichiarazione annuale dell'incapiente. |
| [Fermo e pignoramento](https://cpcpcp106-coder.github.io/Per-Me/debiti-guida-06-fermo-pignoramento.html) | Codice di procedura civile: 545 (due URL DEF diversi), 546, 617 | Nessuna modifica a soglie, percentuali o termini. |
| [Patrocinio a spese dello Stato](https://cpcpcp106-coder.github.io/Per-Me/agevolazioni-guida-07-patrocinio-spese-stato.html) | DPR 115/2002: 76 | Conservate le fonti specifiche degli importi e delle deroghe. |

Le tre guide indicano la data e il perimetro di questo controllo mirato, conservando le date delle revisioni generali precedenti. Aggiornati esclusivamente i tre corrispondenti `lastmod` della sitemap.

## Fonti e verifica diretta

Le [evidenze HTTP](integrazione-link-normativi-http-2026-11-24.json) registrano nove destinazioni Normattiva diverse: otto disposizioni alternative ai nove URL DEF e l'articolo 70 aggiunto. Tutte hanno risposto **HTTP 200** nell'accesso diretto, mostrando il numero dell'articolo corretto e la vigenza selezionata del **24 novembre 2026**. Verificate anche la presenza di «ove positiva» nell'art. 283 e l'omologazione nel comma 7 dell'art. 70.

Per gli articoli del codice di procedura civile il riferimento URN include **`:1`**, necessario per aprire l'allegato contenente il codice. Un 200 che mostri il decreto di approvazione non sarebbe sufficiente. Il canale di ricerca riscrive alcune query URN e può mostrare una pagina di errore: l'esito positivo qui documentato deriva dalle richieste dirette con l'indirizzo completo, senza quella riscrittura.

Fonti primarie della precisazione sostanziale: [art. 283](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2019-01-12;14~art283), [art. 70](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2019-01-12;14~art70), [art. 67](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2019-01-12;14~art67), [art. 74](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2019-01-12;14~art74). Il confronto mirato precedente è conservato separatamente; questo documento attesta l'applicazione delle modifiche e le verifiche indicate.

## Controlli prima della pubblicazione

Superati: integrità delle nove guide Debiti, controllo della guida Patrocinio, controllo editoriale di radice, componente Facebook, indicizzabilità tecnica e audit statico globale. Quest'ultimo esamina 154 HTML: nessun file locale o ancora mancanti; 150 pagine pubbliche raggiungibili dalla homepage e coerenti con la sitemap. `git diff --check` non segnala errori.

Il controllo editoriale automatico non certifica i contenuti giuridici. Nessuna nuova revisione indipendente o prova su Samsung fisico. Non è stata ripetuta la scansione completa delle destinazioni esterne. L'indicizzazione effettiva su Google non è accertata da questi controlli.

## Pubblicazione

La [PR 35](https://github.com/cpcpcp106-coder/Per-Me/pull/35) è stata integrata in `main` al commit `8797103e691aa69424c668bb9369dec182a05082`, dopo **20 controlli GitHub superati** sul commit funzionale `dd58ffbcd78162a2590f17b8b137debdace2232a`. Tra questi, il collaudo browser comprende prove responsive, controlli di accessibilità automatici, sincronizzazione e offline. Le [evidenze dei controlli e del browser](integrazione-link-normativi-controlli-2026-11-24.json) riportano esiti e collegamenti diretti.

Il primo deployment, relativo al merge, è stato annullato e sostituito da quello del successivo snapshot automatico. Il [deployment Pages 45411670980](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45411670980), sul commit `b6d0d0bc01e85ea1b12adf9451b92095dfd20e8c`, è terminato con successo.

La [verifica pubblica](integrazione-link-normativi-pubblico-2026-11-24.json), avviata alle **15:14, ora italiana**, ha confermato HTTP 200 e corrispondenza completa ai sorgenti per tutte e tre le guide e per la sitemap. Le due fotografie locali corrispondono ai file del repository; la fotografia Pexels del patrocinio risponde HTTP 200 come immagine JPEG. Nel browser pubblico sono stati confermati la data mirata, le fotografie caricate e il collegamento Facebook di ciascuna guida, oltre ai dieci richiami puntuali Normattiva nel sovraindebitamento, ai cinque nel pignoramento e a quello nel patrocinio. Non sono stati inviati voti, commenti o messaggi.

Le evidenze si riferiscono alla pubblicazione verificata. Gli aggiornamenti successivi di soli registri non cambiano le tre pagine già collaudate.
