# Per Me — controllo del 20 novembre 2026

**Perimetro:** Fase 1, controllo in sola lettura delle evidenze esistenti e delle fonti primarie. Nessun ampliamento delle Fasi 2 o 3. Tutte le osservazioni sono limitate alle prove esplicitate.

## Controllo straordinario WhatsApp, una sola volta (20 novembre)
- Verificati in sola lettura i profili di browser associati: un profilo predefinito senza siti con accesso registrato e uno usato per Facebook; **nessun profilo riporta una sessione WhatsApp Web registrata**.
- Questo **non permette di stabilire** se WhatsApp Web sul telefono o in un altro browser sia ancora scollegato. Non consente neppure di verificare se sia ancora attiva la restrizione del 19/11 («Il tuo account è soggetto a restrizioni. Non è possibile avviare nuove chat in questo momento»).
- Dal registro precedente: 94 invii verificati, circa 117 contatti da esaminare; invio a Francesco Settingiano non confermato; Clemente e Celeste esclusi. Non sono conteggi aggiornati.
- **Nessun invito inviato, nessun nuovo tentativo di chat, nessun aggiramento di limitazioni**. Ripresa consentita solo dopo verifica della rimozione della restrizione da parte di WhatsApp e disponibilità di una sessione Web regolarmente collegata. Non ripetere questo controllo speciale dopo il 20/11.

## Stato repository prima di qualsiasi scrittura
- Repository pubblico `cpcpcp106-coder/Per-Me`, ramo predefinito. Ultimo commit individuato prima del presente rapporto: `354ee280571295ed28b85212b319cd4cff08baf7` (19/11/2026 09:48 UTC): https://github.com/cpcpcp106-coder/Per-Me/commit/354ee280571295ed28b85212b319cd4cff08baf7
- Riletti i registri `monitoraggio/avanzamento-completamento-2026-11-19.md`, `monitoraggio/revisione-trasversale-tre-fasi-2026-11-18.md` e il workflow `.github/workflows/collaudo-tre-fasi.yml`.
- Esecuzioni GitHub del 19/11 recuperate per ID con stato dei job: [collaudo strumenti, success](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44477717860), [audit statico, success](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44477580951), [controllo tecnico indicizzabilità, success](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44477717748), [build e deploy Pages, success](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44477717500). **Sono prove del 19/11 e non certificano il commit o la pubblicazione del 20/11.**

## Confronto con fonti primarie accessibili il 20/11
- **ARERA:** soglia ISEE 2026 per bonus economici ordinari non superiore a €9.796, oppure €20.000 con almeno quattro figli a carico, fermo il rispetto degli altri requisiti. Fonte 23/01/2026: https://www.arera.it/comunicati-stampa/dettaglio/bonus-sociali-arera-alza-a-9796-euro-la-soglia-isee-per-laccesso-alle-agevolazioni-per-acqua-luce-gas-e-rifiuti
- **ARERA teleriscaldamento:** delibera annunciata il 05/11/2026; i bonus 2026 e 2027 sono previsti nella prima erogazione entro ottobre 2027. Fonte: https://www.arera.it/comunicati-stampa/dettaglio/teleriscaldamento-arera-approva-bonus-sociale-famiglie-disagio-economico
- **INPS:** Carta acquisti per ultrasessantacinquenni e minori di tre anni; ISEE 2026 inferiore a €8.230,81 e ulteriori requisiti reddituali/patrimoniali. Fonte: https://www.inps.it/it/it/dettaglio-approfondimento.schede-informative.la-carta-acquisti.html
- **Ministero della Salute:** pagina esenzioni patologie croniche aggiornata al 05/10/2026, con riferimento all'allegato 8 del DPCM LEA 2017, DM 03/08/2026 e DPCM 07/08/2026. Fonte: https://www.salute.gov.it/new/it/tema/esenzioni-dal-ticket/esenzioni-malattie-croniche/
- **ISTAT:** dati definitivi per ottobre 2026, pubblicati 17/11/2026: NIC +1,0% mensile e +5,5% annuo; NON rappresentano prezzi di un paniere alimentare osservato in un supermercato. Fonte: https://www.istat.it/comunicato-stampa/prezzi-al-consumo-ottobre-2026/
- **CREA:** Linee guida per una sana alimentazione, edizione 2018 pubblicata online il 20/12/2019; sono raccomandazioni generali e NON piano clinico per diabete e cardiopatia. Fonte: https://www.crea.gov.it/en/-/on-line-le-linee-guida-per-una-sana-alimentazione-2018
- **Normativa AIRE:** verificata legge 12 giugno 2026 n.111, pubblicata 27/06 e in vigore dal 27/07/2026, per residenti fuori UE/EFTA; contributo annuo €2.000 per tessera sanitaria italiana secondo legge. Fonte primaria: https://www.normattiva.it/eli/id/2026/06/27/26G00127/CONSOLIDATED
- **ADA Standards of Care 2026:** raccomandazione 5.30 verificata per il modello mediterraneo; evidenza A per prevenzione cardiovascolare e B per metabolismo glucidico. Fonte: https://diabetesjournals.org/care/article/49/Supplement_1/S89/163932
- Le cifre confrontate nelle pagine campionate risultano coerenti con queste fonti. **Non si tratta di revisione articolo per articolo delle 141 URL.**

## Controlli struttura e collegamenti
- `sitemap.xml` letta dal ramo predefinito: **141 elementi <loc>, tutti distinti**, 141 campi <lastmod>, nessuna data successiva al 20/11. Questo è un controllo del file XML, **non prova di indicizzazione Google né di raggiungibilità HTTP** di tutte le pagine.
- Esaminate staticamente 12 pagine a maggiore rilevanza (bonus, agevolazioni, esenzioni, dieta, diabete/cuore, pensionati estero, orientatore, due calcolatori, home, nuova navigazione e app menu): in questi 12 sorgenti sono presenti canonical e attributi alt per tutte le immagini esaminate, e non è stata trovata una chiamata visibile a «Offrimi un caffè». Non è una garanzia su tutti i file né sullo stato della funzione privata.
- L'URL romeno `https://cnas.ro/case-judetene/`, classificato HTTP 503 nel monitoraggio del 19/11, oggi ha restituito il contenuto informativo ufficiale nel servizio di consultazione web. Il precedente errore appare quindi non persistente nel controllo effettuato: **nessuna sostituzione arbitraria del collegamento**.
- Un tentativo di accesso diretto al sito GitHub Pages e alle API GitHub dall'ambiente locale è fallito per risoluzione DNS; la consultazione web del sito ha dato errore. **Non è una prova che il sito sia indisponibile agli utenti.** Non è stato certificato un nuovo deployment o un nuovo collaudo live del 20/11.

## Decisione e blocchi
- **Fase 1: NON ancora certificata** nel suo insieme: rimangono verifica completa dei testi giuridico-sanitari, diritti delle singole immagini, collegamenti esterni con esiti inconcludenti, live Pages verificabile e test assistivi con dispositivi reali.
- **Fasi 2 e 3:** nessuna modifica né progressione di stato; rispettato il vincolo di sequenza.
- **Nessun prezzo osservato, diritto individuale o test inventato. Nessun invio WhatsApp e nessuna modifica alla funzione privata «Offrimi un caffè».**
- Non sono state individuate correzioni puntuali del contenuto pubblico giustificate dalle verifiche oggi condotte; perciò nessun file editoriale è stato modificato. La sola scrittura è questo registro.
