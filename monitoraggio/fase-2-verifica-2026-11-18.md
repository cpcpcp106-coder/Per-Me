# Fase 2 — realizzazione e limiti, 18 novembre 2026

## Modifiche effettive
- Creato `strumenti/orientamento-benefici.html`: selezioni anonime di età, fascia ISEE, nucleo e situazione; risultati come possibili verifiche, non diritto riconosciuto. Elaborazione locale, nessun campo identificativo, nessuna trasmissione dei dati inseriti.
- Creato `strumenti/costo-pasto-mediterraneo.html`: costo osservato di ingrediente al kg e olio EVO al litro, quantità in g/ml, porzioni, origine dichiarata, fonte e data inseribili. Nessun prezzo nazionale inventato; il calcolo non è un piano clinico né il costo completo del pasto.
- Collegati gli strumenti dalle rubriche `agevolazioni-diritti.html` e `dieta-mediterranea-scientifica.html`.
- Entrambi gli URL inseriti nella sitemap.
- Verificati su GitHub i due file immagine usati e riletti i file modificati.

## Cosa era già disponibile
`app/menu-mediterraneo.html`: menu settimanale e lista spesa; già presente nel repository. Non rivendicare come nuova la funzionalità.

## Limiti e verifiche aperte
- Non effettuati test browser pubblici, interazioni su Android, audit WCAG, HTTP e deploy GitHub Pages; non dichiarare la fase 2 integralmente collaudata.
- Le fonti ufficiali e le soglie economiche sono riferite al 2026: richiedono manutenzione e controllo prima di uso in altri anni.
- L'orientatore non accerta compatibilità delle prestazioni né l'effettiva eleggibilità; evitare risultati personalizzati deterministici.
- Il calcolatore copre due ingredienti, non tutto il paniere, non ha listino prezzi verificato né valuta fabbisogni clinici. Il menu esistente non incorpora automaticamente i prezzi osservati.
- L'origine 100% italiana dell'olio è una preferenza editoriale, non un requisito nutrizionale.
- Fase 1 precedentemente non certificata come conclusa: il programma complessivo resta condizionato ai collaudi mancanti.

## Estensione della fase 2 — 18 novembre
Creato `strumenti/costo-spesa-settimanale.html`: fino a 60 righe ingredienti, prezzo osservato al kg o litro, quantità in g o ml, totale e costo per persona, stampa/PDF da browser. Link inseriti in `app/menu-mediterraneo.html` e `dieta-mediterranea-scientifica.html`; sitemap aggiornata. Commit creazione edf8784d8f7ed983dd5877846ac44eaa64f35f2d. È un calcolatore manuale: non importa automaticamente la lista dal menu, non registra listini verificati e non comprende spese non inserite. Il browser pubblico ha respinto l'apertura degli strumenti in questo ambiente; collaudo online non attestato. Fase 2 funzionalità implementate nel repository ma NON certificata integralmente come collaudata.
