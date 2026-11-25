# Conteggi dinamici e conservazione dei contenuti

## Intervento autorizzato

Il 25 novembre 2026 Enrico ha approvato l'applicazione in una PR dedicata della proposta sui conteggi automatici. La proposta iniziale era preparata sul commit `dc001a78077aa6ea7fab37757b123129c041484a`. L'implementazione parte invece da [main aggiornato, e3a4472](https://github.com/cpcpcp106-coder/Per-Me/commit/e3a44724dafbc392e83ba45b27ad3ec596340dee), conservando anche la nuova rubrica Digitale quotidiano e le sue due guide.

## Comportamento dei controlli

L'inventario condiviso ricava file, schede e identità dalla struttura effettiva. Gli audit di Agevolazioni 05–08, Diabete e Dieta, Debiti, Tutor AI, ricette e registro normativo usano questi dati invece dei totali editoriali fissi. I collaudi confrontano le identità delle pagine salvate offline, senza affidarsi soltanto a una soglia minima.

Il registro iniziale conserva le identità già pubblicate. Il nuovo workflow confronta inoltre la versione fidata precedente di Git: vengono segnalate anche cancellazioni coordinate di pagina e riferimenti, sostituzioni a totale invariato e rimozioni di guide aggiunte dopo il registro iniziale. La cronologia mancante produce un errore. Il workflow si attiva su ogni PR verso main e su ogni push a main.

Restano i requisiti editoriali e funzionali: un solo H1 quando richiesto, sette giorni e tre pasti nel menù, regole nutrizionali, importi e dosi, soglie di accessibilità, fonti e controlli delle fotografie. I totali visibili nei contenuti devono ancora essere aggiornati da chi aggiunge una guida. Rimozioni e rinomine intenzionali richiedono una decisione editoriale esplicita.

L'adattamento della patch alla base aggiornata riguarda `gradimento-articoli.json`: aggiunti i metadati di ambito alle voci previste, preservando tutte le voci nuove. Nessuna pagina della rubrica Digitale quotidiano è stata rimossa o sovrascritta. Il collaudo Lievito riconosce sia i pulsanti specifici del percorso sia quelli condivisi delle guide, usati dalla pagina Farine; conserva il requisito di almeno un pulsante e la soglia di contrasto 7:1.

## Verifica locale sulla base aggiornata

| Verifica | Esito |
| --- | --- |
| Inventario confrontato con la base Git | Superato: 154 pagine pubbliche e identità coerenti |
| Test Python di aggiunte, cancellazioni e coerenza | 30 superati |
| Test Node del catalogo offline e dell'app | 22 superati: 3 nuovi e 19 esistenti |
| Audit statici aggiornati | 10 superati |
| Sintassi JavaScript, lettura YAML e controllo della patch | Superati |

Le mutazioni dei test avvengono in memoria o in cartelle temporanee. La cancellazione del solo Bonus mamme e la sostituzione di una guida a totale invariato sono rilevate.

## Collaudi GitHub e limiti

I workflow della PR eseguono l'inventario e i collaudi browser, Tutor AI e strumenti, compresi i percorsi offline interessati. Gli esiti effettivi e i collegamenti alle esecuzioni sono riportati nella descrizione della PR. Questo registro documenta i risultati locali disponibili alla creazione della proposta di modifica; non attribuisce ai controlli ancora da eseguire un esito positivo.

Le prove automatiche non certificano un Samsung fisico, una revisione indipendente dei contenuti o l'indicizzazione Google. L'incarico riguarda la preparazione della PR; non comprende il merge in main, il rilascio del sito o cambiamenti alle regole di protezione del repository.

PR dedicata: [#38 — Conteggi automatici e protezione da cancellazioni delle guide](https://github.com/cpcpcp106-coder/Per-Me/pull/38).

Ramo dedicato: [audit/conteggi-dinamici-2026-11-25](https://github.com/cpcpcp106-coder/Per-Me/tree/audit/conteggi-dinamici-2026-11-25).
