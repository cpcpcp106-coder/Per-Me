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
- Componente Facebook verificato su 129 guide/pagine; copertura del conteggio verificata su 141 pagine. Instagram dispone della propria provenienza nel contatore ma non di un pulsante pubblico nel sito corrente.
- 19 test della PWA e dei dati delle ricette: superati, comprese lettura e navigazione offline già previste.
- Sintassi JavaScript e diff: nessun errore.

Il collaudo browser del repository è esteso a Pinterest, ai pulsanti della homepage e della guida sulle farine a larghezze 320/390/768 pixel, ai pannelli, ai nuovi contatori ancora assenti e al recupero offline. Tutte le richieste di incremento sono simulate o intercettate.

## Distribuzione

Preparazione completata; esito di GitHub Actions, distribuzione Pages e lettura dei file pubblici da aggiungere dopo la pubblicazione.

Registri collegati: [133 post Pinterest](registro-pinterest-2026-11-22.md), [collegamenti delle provenienze](collegamenti-social-2026-11-20.md).
