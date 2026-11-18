# Fase 1 — verifica parziale del 18 novembre 2026

## Fonte primaria verificata
ISTAT, dati definitivi ottobre 2026, pubblicati 17 novembre: https://www.istat.it/comunicato-stampa/prezzi-al-consumo-ottobre-2026/
NIC +5,5% annuo; alimentari non lavorati +7,5%; carrello della spesa +2,3%; FOI senza tabacchi +5,4%. Distinguere le categorie e non interpretare gli indici come prezzi al dettaglio.

## Correzioni effettuate
- agevolazioni-diritti.html: aggiornamento ISTAT e precisazione delle due annualità della Carta Dedicata a te.
- dieta-mediterranea-scientifica.html: aggiornato riferimento ISTAT da settembre a ottobre 2026.
- Pulsante verso https://www.facebook.com/PerMeGuide/ aggiunto nelle pagine: agevolazioni-diritti.html, agevolazioni-guida-02-bonus-sociali.html, dieta-mediterranea-scientifica.html, pensione-invalidita.html, agevolazioni-guida-04-esenzioni-ticket-italia.html, come-leggere-busta-paga.html, inps-prestazione-sospesa-respinta-cosa-fare.html, assegno-ordinario-invalidita-requisiti-conferma.html, aoi-invalidita-civile-differenze.html, verbale-invalidita-civile-legge-104-come-leggerlo.html, cedolino-pensione-obism-arretrati-verificare-importi.html, contributi-inps-estratto-conto-pensione-vicina.html, redditi-red-comunicazioni-obbligatorie-inps.html, riesame-ricorso-inps-termini.html, soldi-lavoro.html, metodo.html, chi-siamo.html.

## Verifiche documentate
- Sitemap letta nel repository: 126 URL HTML più homepage e altri percorsi, non equivalenti a 126 pagine indicizzate.
- Campione di 16 pagine: tutte contenevano canonical e almeno un elemento immagine. L'assenza della stringa Facebook nel codice non prova da sola l'assenza di collegamenti inseriti dinamicamente.
- Bonus ARERA: nel testo controllato la soglia ordinaria 9.796 euro è correttamente distinta dal precedente 9.530 euro.
- Guide su olio EVO e diabete/cardiopatia consultate: fonti CREA, avvertenze cliniche e origine etichetta presenti; non certificato il controllo esaustivo di tutte le affermazioni.
- Dopo le modifiche, i commit GitHub sono stati restituiti dall'API. La verifica pubblica HTTP del sito non è riuscita nell'ambiente di controllo: non dichiarare collaudo riuscito.

## Ancora da verificare prima di dichiarare conclusa la fase 1
Revisione integrale di tutte le pagine, fonti primarie INPS/ARERA/Salute/MEF/CREA, fotografie e licenze, eventuali link esterni, test reali 320/390 px e offline, accessibilità e controllo deployment GitHub Pages e risposte HTTP pubbliche. Verificare anche le guide con dati ISTAT precedenti. Nessun avanzamento automatico alla fase 2 finché questi controlli non sono documentati.

## Verifica supplementare 18 novembre — rapporto automatico dei collegamenti
Fonte: monitoraggio/ultimo-controllo-url-esterni.json (2026-11-18T09:19:24Z), commit dda0c7ca64a6efa7dda0f9906c5d644744c14bef.
129 pagine, 866 URL esterni distinti, 1968 occorrenze: 727 raggiungibili, 122 bloccati/riservati, 16 inconcludenti per trasporto, 1 HTTP 503 su https://cnas.ro/case-judetene/ (pensionati-estero-mete.html). Fra i 16: 13 errori SSL, 2 timeout, 1 chiusura remota. Nessuna sostituzione automatica dei link: occorre distinguere malfunzionamento del sito sorgente e limiti del verificatore.
Il tentativo indipendente di raggiungere il sito pubblico e raw.githubusercontent.com tramite rete del runtime ha fallito la risoluzione DNS; anche la lettura tramite web non è riuscita. Questo non prova un disservizio pubblico. Lo stato CI associato al commit precedente non forniva controlli; non attribuire un collaudo riuscito.

## Audit statico del 18 novembre 2026 (nuova evidenza)
Fonte: https://github.com/cpcpcp106-coder/Per-Me/blob/main/monitoraggio/ultimo-audit-statico.json, commit a19a823a3b591170ddb72182c97b5111edf5c6d2.
131 file HTML, 128 pagine editoriali, 3 pagine tecniche. 4585 occorrenze di collegamenti locali, nessun percorso locale o ancora interna interrotti. 128 pagine indicizzabili e 128 in sitemap, nessuna discrepanza statica. Nessuna immagine senza alt nelle pagine inventariate. Mancanze di canonical, description, skip link nelle sole tre pagine tecniche; i due contatori sono noindex, il file Google è una verifica proprietà. Manifest PWA valido, icone e file shell presenti. Questo NON equivale a test HTTP pubblico, WCAG 2.2 AA, Android offline o conferma Google Search Console. Audit non sostituisce revisione scientifica e normativa.
