# Per Me — Seconda revisione critica della Guida 04: esenzioni sanitarie FVG

**Data:** 15 ottobre 2026  
**Guida:** `agevolazioni-guida-04-esenzioni-ticket-fvg.html`  
**Fonti:** ASUFC (servizio esenzioni, anagrafe sanitaria, ticket/rimborsi, CUP Cividale), Ministero della Salute (invalidità, cronicità), Regione Emilia-Romagna (FAQ interpretativa della disciplina nazionale E02).  
**Ambito:** controllo giuridico, amministrativo, editoriale, navigazione e leggibilità; non è una pratica individuale né una certificazione professionale.

## Riscontri e correzioni documentate

| Controllo | Esito del secondo audit |
| --- | --- |
| Soglie reddito | E01 fino a €36.151,98; E02 ed E04 con soglie familiari €8.263,31 / €11.362,05 + €516,46 per figlio. Nella spiegazione distinto **E03**, che discende dal trattamento sociale, dalle altre soglie numeriche. Nessuna sostituzione del reddito fiscale con ISEE. |
| Disoccupazione E02 | Precisata la cessazione di un **precedente rapporto dipendente**; la mera assenza di lavoro, la cessazione di sola attività autonoma, CIG e contratto di solidarietà **non implicano di per sé** l'E02. Status alla data della prescrizione; condizioni particolari da verificare presso ASUFC. |
| E02 rinnovo | Confermato obbligo di autocertificazione annuale al CUP, fino al 31 dicembre; distinto da E01/E03/E04 in genere 1 aprile–31 marzo, salvo proroghe. |
| **Revoca/annullo (nuovo)** | Il sito ASUFC prevede modulistica specifica per E01–E04 quando reddito o status non corrispondono più; deposito al CUP o invio PEC con documenti; possibili recuperi. Aggiunta procedura e avvertenza, prima mancanti. |
| Competenze e costo | ASUFC registra l'esenzione e accetta autocertificazioni **gratuitamente**, ma CUP non fornisce assistenza fiscale. Per autocertificazioni legate al reddito si fa riferimento all'azienda di **residenza**, anche se si è domiciliati altrove. |
| Malattie croniche | Confermato codice diabete comunemente **013**, dettagliato in banca dati nazionale come **013.250**; possibilità di più esenzioni per differenti patologie, ciascuna con le prestazioni pertinenti; durata attestato in base alle regole specifiche, non come E02. |
| Invalidità civile | C01, C02 e C03 verificati sul Ministero. Dal 67% al 99% invalidità civile (C03) esenzione per tutte le prestazioni LEA di specialistica ambulatoriale necessarie/appropriate; **non significa gratuità generale dei farmaci**. AOI e Disability Card non equivalgono al codice sanitario. |
| Esenzione totale e reddito | Se già presente un'esenzione totale per invalidità che copre la specialistica, ASUFC chiarisce che non è necessario richiedere anche un'esenzione per reddito per le stesse prestazioni. |
| Farmaci | Confermata l'assenza in FVG di ticket regionale ordinario sulla fascia A; rimangono le regole sulla differenza di prezzo dell'equivalente e sulla fascia C. |
| Tarcento: contatti | **Divergenza su due pagine ASUFC**, entrambe ufficiali: pagina anagrafe sanitaria generale 0432 780233; pagina della struttura specifica 0432 780230. La guida segnala entrambi con attribuzione, senza scambiare uno per numero errato. Indirizzo e orari confermati alla data. |
| Cividale | Via Carraria 29, numero 0432 1796345 e orari confermati su anagrafe sanitaria ASUFC. CUP Cividale: cancellazione almeno due giorni prima per non rischiare addebito anche a soggetti esenti. |
| Rimborso | Richiesta presso CUP ASUFC, procedimento di 30 giorni indicato dalla fonte, presentazione gratuita; nessun riconoscimento automatico. |
| Fotografia | Identificativo Pexels **8413217**: pagina originale, autore SHVETS production, scena ambulatoriale con paziente anziano e professionista sanitaria. È immagine remota e non integrata nei contenuti offline della PWA. |
| Pagina e pubblicazione | Modificato testo mantenendo URL/canonical, navigazione verso Rubrica 04, foto e struttura. Il test Node verifica presenza dei punti di diritto, ma **non** dimostra da solo resa su Android o riconoscimento di un diritto sanitario. |

## Fonti primarie

- ASUFC, esenzioni, criteri E01–E04, autocertificazione e modulo di revoca: https://asufc.sanita.fvg.it/it/servizi/esenzione.html
- ASUFC, anagrafe sanitaria e servizi (contatti Tarcento e Cividale): https://asufc.sanita.fvg.it/it/servizi/anagrafe_sanitaria.html
- ASUFC, anagrafe sanitaria struttura Tarcento (numero alternativo): https://asufc.sanita.fvg.it/it/strutture/dir_sanitaria/dip_assistenza_territoriale/distretto_tarcento/servizi_amministrativi/anagrafe_sanitaria/
- ASUFC, ticket sui farmaci: https://asufc.sanita.fvg.it/it/schede/ticket.html
- ASUFC, rimborso ticket: https://asufc.sanita.fvg.it/it/servizi/richiesta_rimborso_ticket.html
- ASUFC, CUP Cividale, disdette: https://asufc.sanita.fvg.it/it/strutture/dir_sanitaria/dip_assistenza_territoriale/distretto_cividale/servizi_amministrativi_cividale/cup_cividale/
- Ministero della Salute, invalidità civile e prestazioni non farmaceutiche: https://www.salute.gov.it/new/it/tema/esenzioni-dal-ticket/esenzioni-invalidita/
- Ministero della Salute, malattie croniche: https://www.salute.gov.it/new/it/tema/esenzioni-dal-ticket/esenzioni-malattie-croniche/
- Ministero della Salute, FAQ esenzioni per malattie croniche: https://www.salute.gov.it/new/it/faq/faq-esenzioni-malattie-croniche/
- Ministero, banca dati malattie croniche (codice 013.250): https://www.salute.gov.it/new/it/banche-dati/banca-dati-delle-malattie-croniche-esenti/
- Regione Emilia-Romagna, FAQ E02 nazionale per CIG e disoccupazione: https://salute.regione.emilia-romagna.it/cure-primarie/ticket-esenzioni/esenzioni/esenzione-ticket-per-reddito/faq
- Foto illustrativa originale e credito: https://www.pexels.com/photo/a-man-consulting-a-doctor-8413217/

## Rischi residui

1. E02: la verifica del singolo status occupazionale/reddituale resta competenza amministrativa della ASL di residenza.
2. I due recapiti telefonici di Tarcento provengono da due pagine ufficiali con numeri differenti; non è stato possibile confermare quale sia il canale preferenziale in tempo reale.
3. La verifica automatizzata WCAG non sostituisce TalkBack Android e revisione umana di accessibilità cognitiva, tastiera/zoom e resa visiva.
4. Restano da provare su dispositivo reale l'aggiornamento automatico PWA, l'accesso al sito da rete mobile e l'assenza dell'immagine fotografica offline.
5. Mai trattare questo documento come autorizzazione a non pagare una prestazione SSN senza esenzione verificata.

**Non si attribuisce un punteggio 100/100 in assenza di questi collaudi.**
