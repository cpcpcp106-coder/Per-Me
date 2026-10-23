# Per Me — Revisione mirata ad alto rischio: ricorsi, pignoramenti, sovraindebitamento e urgenze del diabete

**Data:** 23 ottobre 2026. **Scopo:** approfondire lacune residue dopo l'audit di secondo livello delle 78 guide, preservando le informazioni documentate come corrette. Revisione documentale ed editoriale, non validazione indipendente di ogni frase né consulenza su un singolo provvedimento.

## 1. Ricorsi e riesami INPS — controllo mirato della Guida 08
**Pagina:** `riesame-ricorso-inps-termini.html`.

**Fonti ufficiali:** INPS, Istanza di riesame e ricorso amministrativo pensionistico (ultimo aggiornamento 21 maggio 2026), https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.ricorso-amministrativo-pensionistico-51189.ricorso-amministrativo-pensionistico.html ; INPS, Ricorso giurisdizionale https://www.inps.it/it/it/dettaglio-approfondimento.schede-informative.51293.ricorso-giurisdizionale.html ; INPS, Terza fase riforma https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.02.riforma-della-disabilit-al-via-la-terza-fase-sperimentale.html .

**Esito:** confermata la distinzione fra riesame in autotutela e ricorso amministrativo, la regola generale dei 90 giorni dal ricevimento, le eccezioni di 30 giorni per specifici comitati Gestione Dipendenti Pubblici e il ricorso dopo il silenzio dal 121° giorno. Il riesame non sospende i termini di impugnazione. Per i verbali sanitari restano differenze nella formulazione ufficiale della decorrenza del termine semestrale; la guida già raccomanda una verifica immediata del provvedimento e della notifica. Udine è tra le province entrate nella sperimentazione della riforma della disabilità il 1° marzo 2026. **Nessuna ulteriore modifica testuale** nella presente fase: la precedente integrazione del 23 ottobre è considerata sufficiente sui punti verificati. La decadenza giudiziaria previdenziale va accertata sul singolo caso e non dedotta dal solo termine del ricorso amministrativo.

## 2. Pignoramenti simultanei e cessione del quinto — correzione eseguita
**Pagina modificata:** `debiti-guida-06-fermo-pignoramento.html`.

**Problema:** il testo si limitava a un rinvio generico alla verifica di pignoramenti concorrenti, senza spiegare la distinzione fra più creditori ordinari, cause diverse, crediti alimentari, cessione del quinto e pluralità di terzi. Questo poteva indurre a sommare frazioni meccanicamente.

**Correzione:** inserito richiamo all'articolo 545 c.p.c. sul concorso simultaneo di cause differenti e sul limite complessivo della metà, spiegando espressamente che **non significa poter trattenere sempre il 50%**; distinta la cessione volontaria del quinto dal pignoramento; indicata la possibilità, nei casi previsti dall'articolo 546 c.p.c., di chiedere al giudice la riduzione proporzionale se sono pignorati più terzi. Richiesta verifica congiunta degli atti, delle assegnazioni, del reddito rilevante e dei vincoli preesistenti.

**Fonti:**
- C.p.c., articolo 545, Ministero della Giustizia Tributaria: https://def.giustiziatributaria.gov.it/DocTribFrontend/getAttoNormativoDetail.do?ACTION=getArticolo&articolo=Articolo+545&codiceOrdinamento=0000000000005450000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000&id=%7B57BBB567-1573-4FC0-BD87-BE4D68CB1B5F%7D
- C.p.c., articolo 546, fonte ufficiale: https://def.giustiziatributaria.gov.it/DocTribFrontend/getAttoNormativoDetail.do?ACTION=getArticolo&articolo=Articolo+546&codiceOrdinamento=0000000000005460000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000&id=%7B57BBB567-1573-4FC0-BD87-BE4D68CB1B5F%7D
- DPR 180/1950, cessioni: https://www.normattiva.it/atto/caricaDettaglioAtto?atto.codiceRedazionale=050U0180&atto.dataPubblicazioneGazzetta=1950-04-29&tipoDettaglio=vigente

**Controllo tecnico:** esteso `scripts/audit-debiti.cjs` alle avvertenze su articolo 546, cumulo, cessione del quinto e regola del 50%. Workflow `Per Me - Integrita rubriche Debiti`, ultima esecuzione conclusa positivamente (id 40023002669).

## 3. Sovraindebitamento e rischio aste/pignoramenti — correzione eseguita
**Pagina modificata:** `debiti-guida-08-sovraindebitamento.html`.

**Problema:** la pagina già diceva che la prenotazione di un OCC non ferma l'esecuzione, ma non collegava in modo abbastanza esplicito il piano del consumatore all'articolo 70, comma 4, e alla necessità di un provvedimento giudiziale.

**Correzione:** precisato che il giudice **può** disporre su istanza del debitore determinate misure protettive nella ristrutturazione dei debiti del consumatore, senza che la sola presentazione della domanda all'OCC sia sufficiente; ricordata la necessità di esaminare immediatamente gli atti, eventuali garanti e l'esecuzione già avviata. Il riferimento normativo apre il testo vigente del Codice della crisi.

**Verifica aggiuntiva sull'incapiente:** articolo 283 come corretto dal D.Lgs. 136/2024: la limitazione alle utilità che sopravvengono entro **tre anni**, l'esdebitazione una sola volta, gli obblighi periodici e le condizioni reddituali risultavano già spiegati. **Non corretti dati già coerenti**, senza inventare diritti automatici all'esdebitazione.

**Fonti:**
- Codice della crisi D.Lgs. 14/2019, testo vigente: https://www.normattiva.it/atto/caricaDettaglioAtto?atto.codiceRedazionale=19G00007&atto.dataPubblicazioneGazzetta=2019-02-14&tipoDettaglio=vigente
- Correzzione 2024 art. 283: https://www.gazzettaufficiale.it/atto/serie_generale/caricaArticolo?art.codiceRedazionale=24G00154&art.dataPubblicazioneGazzetta=2024-09-27&art.flagTipoArticolo=0&art.idArticolo=43&art.idGruppo=1&art.idSottoArticolo=1&art.idSottoArticolo1=10&art.progressivo=0&art.versione=1

## 4. Sicurezza del diabete — controllo incrociato, nessuna modifica inutile
**Pagine esaminate:** `diabete-guida-27-urgenze-metaboliche-ipoglicemia-chetoacidosi-stato-iperosmolare.html`; `diabete-guida-28-effetti-indesiderati-sicurezza-farmaci.html`.

**Fonti:** ADA Standards of Care 2026, capitoli 6, 9 e 16, https://doi.org/10.2337/dc26-S006 , https://doi.org/10.2337/dc26-S009 , https://doi.org/10.2337/dc26-S016 .

**Punti riscontrati:**
- Ipoglicemia: livello 1 sotto 70 e da 54 mg/dL; livello 2 sotto 54; livello 3 per necessità di assistenza indipendentemente dalla glicemia misurata.
- Per la maggior parte degli adulti coscienti che possono deglutire, circa 15 g carboidrati a rapido assorbimento con rivalutazione dopo 15 minuti; non somministrare nulla per bocca a chi non può deglutire. Nei sistemi automatizzati le raccomandazioni possono differire.
- Gli utilizzatori di insulina o ad alto rischio dovrebbero avere accesso a glucagone prescritto e formazione dei conviventi, secondo ADA 6.16.
- La DKA può presentarsi anche con glicemia sotto 200 mg/dL, soprattutto in presenza di SGLT2-inibitori, e non può essere esclusa da un numero del sensore.
- Per chirurgia elettiva, le fonti ADA 2026 richiedono sospensione pianificata degli SGLT2-inibitori circa 3–4 giorni prima, secondo la molecola, e gestione da parte del team curante; nessuna indicazione di sospensione autonoma.

**Esito:** le due guide erano già coerenti sui punti controllati; **nessuna modifica alle istruzioni cliniche**. Questo controllo non equivale a revisione clinica indipendente integrale.

## 5. Limiti e prossimo lavoro
- Non stimare limiti di pignorabilità su uno stipendio o una pensione specifici senza atti, natura del creditore, cessione e assegnazioni giudiziali.
- Non dichiarare automaticamente estinti crediti o sospese aste per la sola domanda di composizione del sovraindebitamento.
- Non applicare decadenze INPS astratte a un atto personale senza verificare la decorrenza della notifica.
- Una verifica tecnica GitHub non prova indicizzazione Google, lettura su dispositivo reale o comprensione con persone di 50–70 anni.
- Revisione documentale fatta con fonti primarie: **nessuna certificazione clinica o giuridica esterna indipendente**.

Il metodo Per Me resta quello di correggere errori e lacune documentate, non di duplicare modifiche o aggiungere guide per raggiungere un numero.
