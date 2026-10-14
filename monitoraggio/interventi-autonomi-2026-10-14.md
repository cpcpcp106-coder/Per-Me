# PER ME — Interventi autonomi dopo l'audit V2

**Data:** 14 ottobre 2026  
**Sito:** https://cpcpcp106-coder.github.io/Per-Me/  
**Versione precedente:** [Audit V2](audit-integrale-2026-10-14-v2.md)

## Sintesi: che cosa è stato effettivamente fatto

1. **Privacy: rimossa una pagina salvata da ChatGPT dal ramo pubblico.** Il file `Riprendi progetto blog.html` (1.202.511 byte) si è rivelato essere una **pagina ChatGPT esportata/salvata in HTML**, non un articolo del blog, con metadati della sessione e tracce di informazioni personali. Rimosso dal ramo `main` tramite commit `097bb3eb70e0dceaaf291d8e7b20829937bfc1e4`. **Attenzione: non è una cancellazione definitiva**: la cronologia Git pubblica e gli eventuali indici/cache di terzi possono conservare vecchie copie. La riscrittura permanente della storia richiederebbe una procedura separata, con rischi per tutti i commit, e non è stata eseguita senza specifica autorizzazione. Non è stata pubblicata in questa relazione alcuna informazione privata contenuta nell'esportazione.
2. **PWA: corretto il messaggio offline ingannevole.** Il codice `app/main.js` non afferma più che siano disponibili guide quando non sono state salvate. Mostra invece il numero di pagine presenti o avverte di collegarsi a Internet per il primo salvataggio.
3. **PWA: segnalazione del rischio normativo delle copie offline.** Quando una guida viene letta senza rete, il lettore mostra la data dell'ultimo controllo e ricorda che scadenze e norme devono essere ricontrollate online. Le copie stale e gli errori di quota memoria sono segnalati separatamente.
4. **PWA: aggiornamento della cache applicativa** a `perme-reader-v8-20261014-safety`; `app/index.html` richiama `main.js?v=8` e `app/sw.js` precachea lo stesso script. La chiave di `localStorage` non è stata cambiata, per non cancellare i testi precedentemente memorizzati.
5. **Monitoraggio periodico:** in `monitoraggio/controlla.py` la presenza di un collegamento alla cartella `app/` con `index.html` è riconosciuta come valida. Il controllo degli URL esterni viene eseguito con un pool limitato di 8 richieste simultanee per ridurre i timeout. Il codice è stato scritto su GitHub, ma l'esito della prossima esecuzione del workflow non va anticipato.
6. **Inventario delle affermazioni:** creato [inventario-asserzioni 2026-10-14](inventario-affermazioni-da-verificare-2026-10-14.json), con **476 blocchi candidati** distribuiti fra tutte le 14 guide. Sono **paragrafi, liste o celle di tabella**, non 476 proposizioni atomiche: saranno scomposti e verificati singolarmente. Nessuno è marcato «confermato» dalla sola estrazione.
7. **Verifiche puntuali aggiuntive:** creato [registro di nove riscontri istituzionali](verifiche-fonti-integrative-2026-10-14.json), riguardanti AOI, assegno di invalidità civile, ricorsi amministrativi e rendita vitalizia per contributi omessi. Tutti e nove sono confermati dalle fonti INPS consultate (vedere URL e singoli enunciati nel registro). Sono aggiuntivi alla raccolta storica, ma alcuni argomenti si sovrappongono a vecchi controlli: non si sommano meccanicamente come 23 verifiche distinte senza deduplicazione.

## Differenza tra risultato e limiti

- **Eseguito:** rimozione del documento improprio dalla versione corrente del repository, modifiche PWA, aggiornamento programma di controllo, salvataggio inventario e verifiche INPS.
- **Non eseguito:** cancellazione del contenuto da tutta la cronologia Git e dalle cache esterne, test di navigazione online del sito con browser reale, prova d'installazione/offline sul dispositivo Samsung, verifica completa WCAG 2.2 AA, confronto delle 476 voci contro le fonti.
- **Qualità globale:** non ricalcolata artificiosamente; il riferimento rimane **57/100 provvisorio** nella rubrica V2. Le modifiche migliorano la sicurezza e la chiarezza della PWA ma il punteggio globale richiede una nuova misurazione con i medesimi criteri e prove reali.
- **Rischi residui alti:** cronologia Git del file rimosso ancora pubblica, valutazione giuridica di tutte le affermazioni ancora incompleta; sulle decisioni economiche e scadenze la guida non sostituisce un provvedimento e una verifica presso INPS o professionista.
- **Privacy della Home:** data di nascita completa e ritratto dell'autore rimangono, perché sono scelte di rappresentazione personale sulle quali non si apportano modifiche arbitrarie.

## Fonti istituzionali usate nella verifica puntuale del 14 ottobre 2026
- [INPS: richiesta di conferma AOI](https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.assegno-ordinario-di-invalidit-richiesta-di-conferma.html)
- [INPS: disciplina AOI e conferma automatica](https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.assegno-ordinario-di-invalidit-per-persone-con-capacit-lavorativa-ridotta-50294.assegno-ordinario-di-invalidit-per-persone-con-capacit-lavorativa-ridotta.html)
- [INPS: assegno mensile di assistenza](https://www.inps.it/it/it/dettaglio-approfondimento.schede-informative.assegno-mensile-di-assistenza.html)
- [INPS: ricorso amministrativo pensionistico](https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.ricorso-amministrativo-pensionistico-51189.ricorso-amministrativo-pensionistico.html)
- [INPS: rendita vitalizia per contributi omessi prescritti](https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.riscatto-dei-periodi-per-contributi-omessi-e-prescritti-50255.riscatto-dei-periodi-per-contributi-omessi-e-prescritti.html)
- [INPS: delibera 222/1984, conferma AOI e decorrenza](https://www.inps.it/content/dam/inps-site/it/scorporati/circolari-e-messaggi/1984/06/Circolare_12357/Allegati/12079_Delibera-numero-222-del-12-06-1984.pdf)

## Verifica tecnica successiva
Alla fine della sessione si devono confrontare le versioni richiamate dalla PWA, l'esistenza/assenza dei file in `main`, la sintassi JS del codice modificato e l'esito dell'ultimo workflow di GitHub Pages e del controllo fonti. Un workflow riuscito dimostra il rilascio del codice, non che l'app abbia sincronizzato sul telefono.


## Secondo controllo del monitoraggio automatico — 14 ottobre 2026

Il workflow periodico, attivato dal cambiamento del programma di controllo, ha completato una prima esecuzione con esito **success**. Nel rapporto generato risultavano **26 pagine HTML**, **129 indirizzi esterni** controllati, di cui 128 rispondevano e 1 restituiva HTTP 404. Non è una prova che tutti i contenuti esterni siano pertinenti o giuridicamente corretti: è un controllo HTTP.

Il rapporto segnalava 6 file-immagine "mancanti"; la verifica dei nomi nel repository ha dimostrato che **tutti e sei esistono**: erano falsi positivi causati da percorsi con spazi percent-encoded (`%20`) e caratteri Unicode. Il programma `monitoraggio/controlla.py` è stato corretto per applicare `urllib.parse.unquote()` alla parte locale del collegamento prima di controllare i file. I sei errori precedenti non indicavano quindi sei immagini rotte.

L'unico collegamento HTTP effettivamente non raggiungibile nel controllo era un PDF INPS storico della campagna RED 2025, precedentemente nella Guida 07. Il collegamento è stato **sostituito direttamente nella guida** con il documento INPS ufficiale sulla convenzione RED 2024–2025, accessibile nella verifica web:

https://www.inps.it/content/dam/inps-site/it/scorporati/circolari-e-messaggi/2024/07/Circolare_14621/Allegati/15225_Messaggio-numero-2563-del-09-07-2024_Allegato-n-1.pdf

Il testo della fonte è stato aggiornato per descrivere correttamente **redditi dei familiari e dichiarazione breve NO RED**, e non essere scambiato per la guida tecnica del 2025. Il documento è più risalente, ma pertinente a queste specifiche disposizioni. Gli altri 128 URL HTTP raggiungibili possono comunque essere non pertinenti o superati, e devono essere controllati separatamente.

**Stato del nuovo controllo:** dopo la correzione dei nomi URL e del PDF, il workflow va nuovamente eseguito e ne va confermato l'esito prima di dichiarare zero collegamenti rotti. La fonte INPS non restituisce più l'errore 404 nella verifica separata eseguita, ma questo non garantisce che sia accessibile da qualsiasi telefono o browser.


## Collaudo automatico dopo gli interventi — completato

L'esecuzione del workflow `Per Me - Controllo fonti e collegamenti` sul commit `5b6175cee5dbd33f69f335dc210b59e4c6bca146` è terminata con esito **success**. Il nuovo `monitoraggio/ultimo-controllo.json` ha data **2026-10-14T14:14:13+00:00**.

**Misure effettive:** 26 pagine HTML controllate, **zero** collegamenti locali problematici, **130** URL esterni controllati, **zero** non raggiungibili nell'esecuzione. Il precedente problema dei sei falsi positivi è risolto. Il nuovo PDF RED risulta raggiungibile nel controllo HTTP del monitor.

Il controllo ha registrato modifiche nei contenuti di due fonti monitorate (rubriche **lavoro** e **salute**): sono **segnali da esaminare**, non prove automatiche di novità normativa o di errori delle guide. Non è stata apportata alcuna modifica normativa sulla sola base dell'hash cambiato.

La nuova esecuzione del controllo dei link **non** certifica conformità WCAG, disponibilità offline su Samsung o correttezza giuridica di ogni frase: questi collaudi rimangono aperti.
