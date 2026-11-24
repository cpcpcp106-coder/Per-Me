# Per Me — Esame del sito, fonti e collegamenti

Data: **24 novembre 2026**, ora italiana. Sito: https://cpcpcp106-coder.github.io/Per-Me/ . Base iniziale: commit `77beb6b0c12b45defbfbccc6e12cc70271b3ff30`. Verifica svolta con un agente dedicato ai contenuti e una revisione dell’integrazione e dei controlli tecnici.

## Perimetro verificato

Il controllo strutturale comprende **154 file HTML: 150 pagine pubbliche e quattro pagine tecniche**. Tutte le 150 pagine pubbliche sono raggiungibili dalla homepage attraverso link HTML e presenti nella sitemap. Non risultano file locali o ancore mancanti, canonical incoerenti o direttive che impediscono la scansione delle pagine pubbliche.

La [verifica online iniziale](verifica-live-iniziale-2026-11-24.json) confronta il sito con i sorgenti di partenza: **157 URL**, comprendendo i tre indirizzi alternativi index.html, tutti con HTTP 200, contenuto corrispondente e nessuna anomalia rilevata. Il robots.txt dell’origine risponde 404: in questo caso non introduce divieti di scansione. Questi risultati dimostrano accessibilità tecnica, non indicizzazione su Google.

La [verifica mirata delle fonti](audit-fonti-guide-2026-11-24.md) elenca per ogni guida i fatti confrontati, le fonti primarie consultate e i limiti. Non costituisce una revisione clinica o giuridica indipendente di ogni affermazione del sito.

## Errori corretti

| Area | Problema riscontrato | Correzione |
|---|---|---|
| Rottamazione | Date di verifica contraddittorie e un riferimento futuro a un servizio già annunciato disponibile. | Date e formulazioni allineate alle fonti AdeR consultate il 24 novembre; conservata la distinzione fra misura territoriale e nazionale. |
| Bonus nido | L’indicatore ISEE 2026 era spiegato nella premessa ma richiamato in modo generico nel paragrafo operativo. | Precisato l’ISEE per specifiche prestazioni familiari e per l’inclusione, riferito al minore. |
| Glicemia e sensori | Due duplicazioni nella spiegazione di CGM e TIR. | Eliminate le ripetizioni senza cambiare soglie o indicazioni terapeutiche. |
| Rubrica Salute | Indicava ancora sette ricette. | Reso coerente il testo con le 28 ricette presenti nell’archivio, specificando che i valori nutrizionali sono stimati. |
| Pagina Controllo delle fonti | Il riepilogo principale era fermo a 82 pagine e alla verifica del 22 ottobre. | Mostrato il controllo strutturale attuale di 150 pagine pubbliche, con rinvio alle evidenze e mantenimento dei rapporti storici datati. |
| Verificatore dei link esterni | Esaminava soltanto la radice e app/, omettendo strumenti e altre sottocartelle. | Raccolta ricorsiva di tutti gli HTML del sito; esclusione delle dipendenze e delle directory di build. Ampliati anche gli eventi del workflow interessato. |

Sitemap aggiornata soltanto per le pagine modificate. Nessuna nuova fotografia o nuovo dato personale pubblicato.

## Prove eseguite

- Controllo statico globale, struttura condivisa, sitemap, raggiungibilità dalla homepage e componente Facebook delle guide.
- Controllo editoriale automatico e perimetro nazionale: nessun errore nei controlli eseguiti; il controllo editoriale di radice copre 144 pagine e non certifica i fatti.
- Registro delle immagini: integrità, presenza e collegamento dei file; non attestazione individuale nuova dei diritti delle immagini storiche.
- Suite applicazione: **19 test superati**, compresi conservazione delle guide, sincronizzazione, gestione degli errori e percorso offline simulato.
- Nel browser pubblico: ricerca “SEND”, apertura del risultato corretto, presenza della foto e dei collegamenti alla Pagina Facebook. Nessun voto o messaggio inviato.

## Collegamenti esterni e pubblicazione

Gli esiti estesi e quelli successivi alla pubblicazione saranno aggiunti prima della chiusura del lavoro. Un HTTP 200 da solo non dimostra che una fonte sostenga una frase; una risposta 403, 429 o un problema di trasporto non dimostra che l’URL sia sbagliato.

CNAS, AIFA e alcune pagine AdeR sono state controllate anche attraverso il canale di ricerca: i risultati e i limiti sono documentati nel rapporto delle fonti. Nessun collegamento è stato sostituito soltanto per un blocco del controllo automatico.

## Limiti

Nessuna nuova verifica autenticata in Search Console: non si dichiara risolto il problema storico di elaborazione della sitemap né una nuova indicizzazione. Nessuna prova su telefono Samsung fisico o con TalkBack. Nessuna revisione professionale indipendente, nessuna attivazione dei pagamenti, nessun invio social o email in questo incarico. La bozza privata «Offrimi un caffè» resta esclusa dalle modifiche.
