# Per Me — Pinterest nel sito e nei contatori

Incarico autorizzato da Enrico il 22 novembre 2026: aggiungere il collegamento al profilo Pinterest e distinguere le aperture riconosciute provenienti dai suoi link.

## Comportamento introdotto

- Pulsante «Per Me su Pinterest» nel piè di pagina condiviso di 139 pagine pubbliche, compresa la homepage. Destinazione: https://it.pinterest.com/permeguide/ . Area tattile di almeno 48 pixel, carattere di 19 pixel, contrasto tra bianco e verde scuro; collegamento normale senza script di Pinterest.
- Nuova provenienza `pinterest`, con conteggio dal 22 novembre 2026. Riconoscimento tramite `utm_source=pinterest`, domini `pinterest.com` e `pinterest.it` e sottodomini, oppure `pin.it`; confronto del dominio completo, senza corrispondenze con nomi ingannevoli.
- La campagna esplicita Pinterest prevale su un eventuale `fbclid`. Le provenienze Facebook, Instagram, Google e WhatsApp conservano il proprio comportamento.
- Voce Pinterest nel pannello corrente e in quello storico. Il pannello corrente conserva gli ultimi valori disponibili senza rete; nuova versione della cache per distribuire la schermata aggiornata.
- Versione dello script di conteggio aggiornata nei collegamenti delle pagine, per richiedere il nuovo codice anche ai browser che avevano salvato il precedente.

## Significato dei dati

La nuova voce conta le aperture riconosciute dei link sul sito, con il limite già previsto di una visita ogni trenta minuti per lo stesso browser. Conserva l’esclusione del curatore e quella dell’app installata. Non misura persone uniche, visualizzazioni o salvataggi dei post su Pinterest. Un link inoltrato mantiene la propria etichetta; il browser può omettere la provenienza.

Le aperture passate non sono ricostruite né spostate da «altri». Un contatore non ancora creato restituisce zero alla lettura; un errore del servizio rimane un errore e non prova l’assenza di aperture. Leggere i pannelli non incrementa i contatori. Nessun annuncio o servizio a pagamento attivato.

## Verifiche prima della distribuzione

- 25 test isolati di attribuzione, priorità delle campagne, domini ingannevoli, altre provenienze, esclusione del curatore, assenza di rete, app installata e mancati doppioni: superati senza richieste reali ai contatori.
- Layout condiviso coerente su 139 pagine e 3.577 collegamenti locali validi.
- Audit di indicizzabilità: 145 pagine pubbliche, 145 URL in sitemap, tutte raggiungibili dalla home, zero problemi. Questo verifica la struttura tecnica, non la presenza nell’indice di Google.
- Componente Facebook verificato su 129 guide/pagine; copertura del conteggio verificata su 141 pagine. Instagram dispone della propria provenienza nel contatore. I pulsanti per il profilo Instagram e per il canale WhatsApp sono stati aggiunti e verificati nel successivo intervento del 22 novembre: [registro dei pulsanti social](pulsanti-instagram-whatsapp-2026-11-22.md).
- 19 test della PWA e dei dati delle ricette: superati, comprese lettura e navigazione offline già previste.
- Sintassi JavaScript e diff: nessun errore.

Il collaudo browser del repository è esteso a Pinterest, ai pulsanti della homepage e della guida sulle farine a larghezze 320/390/768 pixel, ai pannelli, ai nuovi contatori ancora assenti e al recupero offline. Tutte le richieste di incremento sono simulate o intercettate.

## Distribuzione

**Pubblicazione e collaudo completati il 22 novembre 2026.**

- [Modifica del sito](https://github.com/cpcpcp106-coder/Per-Me/commit/204ab2388c3f2eb6fca166bfa90cdfcdea97c2f1), [allineamento del generatore ricette](https://github.com/cpcpcp106-coder/Per-Me/commit/cc2270b2a6fde1353cd165164ab380202ec7ee7d) e [collaudo finale](https://github.com/cpcpcp106-coder/Per-Me/commit/b825181a41a71da7bf14a4dfa09e168e11a3e547).
- [Test browser contatori riuscito](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45040849306): 42 verifiche browser e 25 test isolati superati. Pulsante presente in un solo esemplare sulle pagine campione; altezza misurata 50,59 pixel; nessuno scorrimento orizzontale a 320/390/768 pixel. Verificati caricamento dei valori Pinterest, risposta zero per una nuova chiave assente, lettura offline degli ultimi valori e assenza di incrementi reali nei test.
- [Controllo ricette riuscito](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45040570097): il generatore usa la nuova versione dello script e conserva i dati nutrizionali.
- [Distribuzione GitHub Pages riuscita](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45040848756), [struttura nazionale riuscita](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45040849327), [indicizzabilità tecnica riuscita](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45040849305).
- Controllo HTTP pubblico concluso alle 16:56 circa, ora italiana: 144 file letti, 144 risposte HTTP 200 e corrispondenza esatta con i contenuti collaudati. Tutte le 139 pagine del layout condiviso contengono il collegamento Pinterest.
- Nell’interfaccia pubblica il pulsante apre il profilo Per Me Guide corretto. Nel pannello aggiornato è visibile la voce Pinterest, con lettura iniziale pari a 0. Una prima lettura parziale del servizio si è risolta aggiornando i valori; l’esito finale del pannello era «Aggiornato». La lettura non dimostra risultati futuri o persone uniche.

Nessun intervento richiesto sul telefono per questa modifica. Nessuna spesa attivata.

Registri collegati: [133 post Pinterest](registro-pinterest-2026-11-22.md), [collegamenti delle provenienze](collegamenti-social-2026-11-20.md).
