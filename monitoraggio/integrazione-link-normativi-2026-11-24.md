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

Le modifiche hanno superato i controlli locali e sono pronte per l'integrazione. Commit, controlli GitHub e verifica del sito pubblico saranno registrati dopo il rispettivo esito.
