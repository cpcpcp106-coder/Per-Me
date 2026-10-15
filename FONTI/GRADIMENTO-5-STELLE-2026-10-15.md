# Per Me — Conteggio gradimento a 5 stelle

**Versione aggiornata: 15 ottobre 2026.**

## Regola inderogabile richiesta dall'editore
Memorizzare esclusivamente cinque numeri aggregati per articolo: quanti clic da 1, 2, 3, 4 e 5 stelle.
Non memorizzare identificativi, preferenze del browser, nome, email, commenti, userId, fingerprint, cookie o altri dati riferibili alle persone, neppure provvisoriamente. Ogni clic incrementa un contatore numerico; per scelta non è possibile garantire un clic per persona. L'eventuale vecchia annotazione locale del prototipo viene cancellata all'apertura dell'articolo.

## Realizzazione
Lo script `gradimento.js` usa il servizio `countapi.mileshilliard.com` per le valutazioni. Il contatore delle visite al sito resta invariato. Un clic esplicito invia soltanto categoria della stella e slug pubblico dell'articolo, aggiornando il contatore aggregato. Non si inviano parametri personali. L'articolo non contatta il servizio esterno finché il lettore non preme una stella. La classifica `gradimento.html` legge **tutti e cinque i contatori per articolo**, somma le stelle effettivamente attribuite (1×clic da 1, 2×clic da 2, 3×clic da 3, 4×clic da 4, 5×clic da 5), e ordina i risultati per **stelle totali**, poi per media. Mostra anche il numero dei clic, senza associarli a persone. I 44 indirizzi editoriali disponibili al 15/10/2026 sono catalogati in `gradimento-articoli.json`. La PWA consente di votare solo online.

## Limite non eliminabile dal solo codice client
Una richiesta HTTP verso un servizio terzo comporta la trasmissione di indirizzo IP e dati tecnici di connessione all'infrastruttura del fornitore. Non possiamo attestare l'assenza di log o di trattamento da parte del fornitore. La garanzia richiesta di **assenza assoluta di raccolta di dati anche transitoria**, intesa anche come trattamento tecnico da parte di qualunque intermediario, **non è dimostrabile usando questo servizio esterno**. Per tale garanzia servirebbe un'infrastruttura sotto diretto controllo con politiche di non registrazione e verifica contrattuale/tecnica, fermo il trattamento tecnico indispensabile al trasporto delle richieste.

## Verifiche
- Verificare cinque stelle in ogni articolo e nel lettore PWA.
- Verificare che aprire una pagina editoriale non esegua richieste al servizio di votazione né scriva dati nel browser.
- Verificare che ogni clic incrementi solo un contatore della categoria selezionata.
- Verificare che aprire la classifica non incrementi nessun contatore e che l'elenco includa tutti gli articoli.
- Verificare che il totale stelle sia la somma ponderata delle cinque categorie e che l'ordinamento segua quel totale, anche per articoli con zero clic.
- Verificare il comportamento offline, la leggibilità mobile e l'informativa sui limiti della connessione.
- Non interpretare i clic come persone uniche o campione statistico rappresentativo.

## Correzione del 15 ottobre 2026 - conteggi verificati
Il vecchio servizio di stelle `counterapi.com` mostrava 1 nell'incremento di prova ma zero nelle letture successive, anche con parametri anticache. Non possiamo ricostruire il voto precedente senza inventarlo. Il servizio sostitutivo `countapi.mileshilliard.com` e' stato collaudato con un contatore isolato: chiave nuova 404, incremento a 1, rilettura 1; CORS autorizzato dal dominio del sito. Le chiavi iniziano con `perme-20261015-perme-stelle-N-`. Non viene salvato alcun dato di voto nel browser. I metadati HTTP possono essere trattati dal servizio esterno: impossibile certificare assenza assoluta di trattamento tecnico.
