# PER ME — Revisione editoriale dell’intero sito e nuova Guida 05 nazionale
**Data:** 15 ottobre 2026. **Perimetro esclusivo:** Per Me, sito `cpcpcp106-coder.github.io/Per-Me/`, PWA e repository `cpcpcp106-coder/Per-Me`.

## Decisione
Il progetto rimane **nazionale**. Le norme nazionali, le competenze dei singoli enti e le varianti regionali sono elementi distinti. Non utilizzare fatti biografici, sede CAF o residenza del proprietario come modello generale. Conservare URL esistenti, indicizzazione pubblica `index,follow` e copia offline dei testi già sincronizzati nella PWA.

## Metodo e copertura
- **Inventario completo**: 41 pagine editoriali presenti prima dell'intervento, 42 con la Guida 05; esclusi il file di verifica Google e il documento di ingresso PWA. Ogni pagina è inclusa nell'audit automatico: titolo, H1, metadescrizione, canonical, skip link, file e ancore interne, immagini/alt, presenza della fonte, stato editoriale, riferimenti personali impropri.
- **Verifica editoriale orientata al rischio**: esame di rubriche, pagine troppo sintetiche, titoli, avvertenze, struttura e contenuti ad alto rischio; confronto mirato con fonti INPS, AdeR, Ministero del Lavoro, Ministero della Salute, ARERA, Normattiva. Si integrano gli audit precedenti su pensioni, lavoro, debiti, ISEE e trasporti.
- **Limite importante**: non è stata completata una peer review legale e medica *indipendente* di ogni singola frase e di tutti i calcoli dell'intero sito. I test automatici non sono una verifica giuridica e non attestano WCAG 2.2 AA completa.

## Correzioni e contenuti realizzati

### Guida 05 — Comune e servizi sociali (nuova, nazionale)
`agevolazioni-guida-05-comune-servizi-sociali-italia.html`

Guida autonoma con dodici sezioni operative tra introduzione, Comune/ATS, segretariato sociale e pronto intervento, possibili misure comunali non automatiche, sette passi per il colloquio, documenti e DSU/ISEE, Assegno di Inclusione (ADI), Supporto per la Formazione e il Lavoro (SFL), Punto Unico di Accesso e non autosufficienza, domande respinte, esempi inventati ed errori da evitare.

**Presupposti verificati**:
- Articolo 22 legge 328/2000: prestazioni di segretariato sociale, assistenza domiciliare, pronto intervento e accoglienza, secondo pianificazione e risorse; nessuna promessa generalizzata di bonus comunali automatici.
- Piano nazionale degli interventi e servizi sociali 2024–2026 e Linee guida ATS del 2025, distinguendo le responsabilità locali.
- ADI come prestazione INPS nazionale: sottoscrizione PAD su SIISL, primo incontro con i servizi sociali **entro 120 giorni**, rischio sospensione/decadenza nei casi previsti; la prima mensilità di rinnovo 2026 è riconosciuta al **50%** dell'importo rinnovato, con eliminazione del mese obbligatorio di sospensione.
- SFL: persone generalmente 18–59 anni; beneficio di **500 €/mese solo durante effettiva partecipazione** alle attività e nel rispetto degli altri requisiti, non un sussidio comunale.
- PUA e non autosufficienza: coordinamento sociosanitario, valutazione e progetto individualizzato ove previsti.
- Foto Pexels **9870140**, autore Ron Lach, scena di tre persone con documenti; diversa da quelle delle guide precedenti. È remota, quindi la resa online e i diritti di visualizzazione/hotlink vanno monitorati; l'app offline resta testuale.

### Approfondimento Guide nazionali 03 e 04
- `agevolazioni-guida-03-trasporti-italia.html`: la pagina precedente contava circa 245 parole; ora distingue trasporto nazionale, ferroviario, urbano/extraurbano, Disability Card INPS, Carta Blu Trenitalia, assistenza in stazione, tariffe over 65 non uniformi e iter in cinque passi. Nuova fotografia Pexels **23720159** di Altamart, distinta dalla scheda FVG.
- `agevolazioni-guida-04-esenzioni-ticket-italia.html`: la pagina precedente contava circa 195 parole; ora distingue E01–E04, patologie croniche/rare, categorie invalidità C01–C03, medicinali, screening, ricetta e sei controlli prima della prestazione. Nuova fotografia Pexels **4266930** di Cedric Fauntleroy, distinta dalla scheda FVG.
- Le guide FVG 03 e 04 restano chiaramente nel gruppo territoriale della Rubrica 04. Nessun prezzo o contatto locale viene presentato come nazionale.

### Altre correzioni
- `agevolazioni-diritti.html`: aggiunto il collegamento Guida 05 nell'elenco delle **cinque guide nazionali**, mantenendo due schede FVG separate; descrizione della rubrica estesa a tutti i temi.
- `index.html`: conteggio aggiornato a **7 risorse** (5 nazionali + 2 regionali).
- `sitemap.xml`: nuova Guida 05 indicizzabile e con canonical.
- `salute-autonomia.html`: eliminata dicitura obsoleta «in attesa di revisione professionale prima dell'indicizzazione su Google», incompatibile con la policy pubblica `index,follow`.
- `monitoraggio/collaudo_browser.cjs`: aggiunta URL Guida 05 alla verifica pubblica browser; `.github/workflows/verifica-pagine-pubbliche.yml` ora controlla anche il suo HTTP 200.
- Test specifico della Guida 05 e nuovo audit editoriale `scripts/audit-editoriale-integrale.cjs` per tutte le pagine, su PR e su push a main.

## Registro pagina per pagina
**Legenda:** A = già sostanziale, controllo editoriale e documentale di rischio con audit preesistenti; B = migliorata in questo ciclo; C = pagina pubblica ma sviluppata solo in parte, esplicitamente; P = alta sensibilità di soglie o decadenze, da mantenere sotto verifica. Nessuna lettera certifica verità di tutte le affermazioni.

| Pagina | Esito | Verifiche e osservazioni |
| --- | --- | --- |
| `index.html` | B | Ambito Italia già esplicito; conteggio cinque guide nazionali e due schede regionali aggiornato. |
| `chi-siamo.html` | A | Progetto nazionale, no sede locale preferenziale. |
| `metodo.html` | A | Dichiarazioni di finalità, limiti e fonti verificabili; non equivale a certificazione esterna. |
| `monitoraggio.html` | A | Trasparenza delle verifiche, evitare confusione tra automatismo e fact-check professionale. |
| `soldi-lavoro.html` | A/P | Rubrica strutturata; regole CIG e aliquote 2026 da monitorare. |
| `come-leggere-busta-paga.html` | A | Esempi ed elementi del cedolino; da evitare importi universali. |
| `dal-lordo-al-netto.html` | A/P | Scaglioni IRPEF 2026 ed esempi con ipotesi; mantenere annualità corretta. |
| `ore-ferie-permessi-malattia-straordinari.html` | A | Dipendenza da CCNL e contratto chiarita. |
| `stipendio-diminuito-cosa-controllare.html` | A | Casi ed esempi illustrativi; avvertenze prima di contestazioni. |
| `ccnl-inquadramento-livello-superminimo.html` | A/P | Distinguere CCNL applicabile, assorbibilità e documentazione delle mansioni. |
| `controllare-cedolino-cassa-integrazione-solidarieta.html` | A/P | Distinzione lordo/netto/CIG/solidarietà, massimali e indennità con anno. |
| `pensione-invalidita.html` | A/P | Indice 8 guide, aggiornamenti pensione 2027–2028 da presidiare. |
| `inps-prestazione-sospesa-respinta-cosa-fare.html` | A/P | Riesame, ricorso e termini vanno letti dall'atto concreto, non presunti. |
| `assegno-ordinario-invalidita-requisiti-conferma.html` | A/P | AOI previdenziale, conferma e termini specifici. |
| `aoi-invalidita-civile-differenze.html` | A/P | Importi prestazioni e regime invalidità 2026 ad alto rischio di obsolescenza. |
| `verbale-invalidita-civile-legge-104-come-leggerlo.html` | A/P | Percorsi di valutazione e riforma sperimentale variano con data e provincia. |
| `cedolino-pensione-obism-arretrati-verificare-importi.html` | A | Esempi numerici dichiarati, non estratti personali. |
| `contributi-inps-estratto-conto-pensione-vicina.html` | A/P | Pensione 2027 a 67 anni e 1 mese, 2028 a 67 anni e 3 mesi; requisiti anticipata 2027 42a11m/41a11m, 2028 43a1m/42a1m, con eccezioni. Fonte circolare INPS 28/2026. |
| `redditi-red-comunicazioni-obbligatorie-inps.html` | A/P | RED, obblighi reddituali e recuperi: verificare comunicazione per singola prestazione. |
| `riesame-ricorso-inps-termini.html` | A/P | Termini amministrativi/giudiziari e ATPO differenti; no scadenza universale. |
| `debiti-cartelle.html` | A/P | Indice 9 guide; scadenze sempre per tipo di atto e notifica. |
| `debiti-guida-01-leggere-cartella.html` | A/P | Distinzione termini di pagamento, opposizione e notifica. |
| `debiti-guida-02-controllare-debiti.html` | A | Accesso estratto conto AdeR, carichi ulteriori e pagamenti. |
| `debiti-guida-03-cartella-errata.html` | A/P | SL1 e 220 giorni non generalizzabili a qualsiasi contestazione. |
| `debiti-guida-04-rateizzazione.html` | A/P | Rate ordinaria e decadenza, differenti norme INPS/AdeR e misura straordinaria. |
| `debiti-guida-05-rottamazione.html` | A/P | Domanda enti territoriali 16/10–15/12/2026 solo per enti aderenti; ricontrollare effettiva apertura portale il 16/10, senza dichiarare già disponibile il 15. |
| `debiti-guida-06-fermo-pignoramento.html` | A/P | Soglie di pignoramento e tutele dipendono dalla natura del credito e del bene. |
| `debiti-guida-07-banche-bollette.html` | A/P | Reclami e ADR, aggiornare gli importi e i termini di accesso. |
| `debiti-guida-08-sovraindebitamento.html` | A/P | CCII e OCC, prerequisiti e costi non sostituibili da una formula semplice. |
| `debiti-guida-09-a-chi-rivolgersi.html` | A | Competenze nazionali di CAF/patronato/OCC/avvocato e canali pubblici, nessuna sede obbligatoria. |
| `agevolazioni-diritti.html` | B | Separazione nazionale/FVG e aggiunta Guida 05. |
| `agevolazioni-guida-01-isee-corrente.html` | A/P | Modello MS 2026, 25%/20%, validità e condizioni già oggetto di revisione dedicata. |
| `agevolazioni-guida-02-bonus-sociali.html` | A/P | ARERA 9.796 e 20.000 €, elettrico e TARI (25%) distinti; aggiornare se cambiano provvedimenti. |
| `agevolazioni-guida-03-trasporti-italia.html` | B | Guida nazionale ampliata; carta Blu e Disability Card non equivalgono a gratuità universale. |
| `agevolazioni-guida-03-trasporti-fvg.html` | A/P | Rimane scheda regionale soltanto FVG, reddito annuale invalidità da accertare. |
| `agevolazioni-guida-04-esenzioni-ticket-italia.html` | B | Guida nazionale ampliata, invalidità/specialistica distinta dai farmaci. |
| `agevolazioni-guida-04-esenzioni-ticket-fvg.html` | A/P | Soltanto procedura ASUFC/FVG, e non guida nazionale. |
| `agevolazioni-guida-05-comune-servizi-sociali-italia.html` | B | Nuova guida nazionale. Nessun contributo comunale automatico promesso. |
| `salute-autonomia.html` | B/C | Rimossa dicitura Google superata; percorsi clinici futuri ancora da sviluppare. |
| `salute-guida-01-preparare-visita.html` | A/C | Guida organizzativa utile, non sostituisce peer review medica o indicazioni individuali. |
| `dieta-mediterranea-ricette.html` | C | Introduzione presente, ricette complete ancora mancanti: non dichiarare raccolta pronta. |
| `tutor-ai.html` | C | Sezione introduttiva in preparazione, non una guida pratica completa. |

### Foto e accessibilità
- Guida 05: nuova fotografia Pexels con autore identificato; Guides 03/04 nazionali arricchite con due fotografie diverse. Controllare caricamento remoto, licenza e contrasto nel browser reale.
- Analisi statica di tutte le pagine, testi alternativi, ancore e dimensioni di navigazione; audit automatizzato non certifica accessibilità per utenti con disabilità o smartphone Android.

## Rischi e priorità successive
**P1 giuridico** — ricorsi/decadenze, pensioni 2027–2028, rateizzazioni e rottamazione territoriale che apre il 16/10, parametri ISEE e bonus. Necessari controlli delle fonti in prossimità dell'evento e revisione indipendente specialistica.  
**P1 editoriale** — non applicare tariffe o servizi FVG fuori regione; procedure comunali sempre contestuali al Comune e ATS competente.  
**P2 contenuti** — dieta mediterranea senza ricette pubblicate e Tutor AI senza guide operative: sono rubriche dichiaratamente in preparazione, non complete.  
**P2 tecnica** — fotografi esterni non garantiscono offline; test Chromium emulato e axe non sostituiscono collaudo Android reale / TalkBack / zoom 200–400%.  
**P2 SEO** — index,follow e sitemap sono condizioni necessarie ma Google può comunque non indicizzare; Search Console richiede valutazione autonoma delle cause.

## Fonti di verifica 2026 selezionate
1. Legge 328/2000 articolo 22: https://www.normattiva.it/uri-res/N2Ls?urn%3Anir%3Astato%3Alegge%3A2000%3B328~art22-com2=
2. Ministero Lavoro Piano interventi sociali: https://lavoro.gov.it/strumenti-e-servizi/pagine/piano-interventi-e-servizi-sociali
3. Ministero Lavoro organizzazione ATS/LEPS: https://www.lavoro.gov.it/notizie/pagine/linee-guida-per-la-definizione-dei-modelli-organizzativi-omogenei-degli-ambiti-Territoriali-Sociali-per-l-attuazione-dei-LEPS
4. INPS ADI: https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.assegno-di-inclusione-adi.html
5. INPS SFL: https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.supporto-per-la-formazione-e-il-lavoro-sfl-.html
6. INPS pensioni 2027-2028, circolare 28/2026: https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2026.03.pensioni-requisiti-aggiornati-per-il-2027-e-il-2028.html
7. AdeR Rottamazione enti territoriali: https://www.agenziaentrateriscossione.gov.it/it/il-gruppo/lagenzia-comunica/novita/Legge-n.-113-2026-piu-tempo-per-la-Rottamazione-degli-enti-territoriali/
8. Ministero Salute invalidità e ticket: https://www.salute.gov.it/new/it/tema/esenzioni-dal-ticket/esenzioni-invalidita/
9. INPS Disability Card: https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.carta-europea-della-disabilit---disability-card-58828.carta-europea-della-disabilit---disability-card.html
10. Trenitalia Carta Blu: https://www.trenitalia.com/it/informazioni/la-guida-del-viaggiatore/altre-riduzioni-e-carte-sconto-a-tua-disposizione.html

## Criterio di chiusura
Stato finale da determinare **solo dopo i test del ramo**: controllo statico, nuovo audit editoriale, test Guide 01–05, PWA, link e SEO, merge, distribuzione Pages e controllo HTTP 200 della nuova guida. Questa relazione documenta attività, criteri e limiti, ma **non attribuisce alcun 100/100**.
