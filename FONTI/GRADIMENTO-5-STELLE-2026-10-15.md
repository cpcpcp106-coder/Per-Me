# Per Me — Votazioni a cinque stelle

Avvio: 15 ottobre 2026.

Le pagine editoriali mostrano cinque stelle e una classifica pubblica in gradimento.html, ordinata per **numero di voti** e a parità per **media**. A ogni nuova pubblicazione aggiungere lo script defer gradimento.js e aggiornare gradimento-articoli.json.

Backend: il servizio esistente counterapi.com, namespace cpcpcp106-coder.github.io, azioni perme-stelle-1 fino a perme-stelle-5, chiave corrispondente allo slug della pagina senza .html. La lettura richiede readOnly=true; l'azione any aggrega i 5 contatori. Un clic confermato invia un solo incremento. Caricare la pagina o consultare la classifica non invia voti. localStorage conserva solo lo stato di voto per articolo nello stesso browser: non si usano email, login, commenti, cookie identificativi o fingerprint. Il fornitore esterno riceve inevitabilmente dati tecnici della connessione e può trattarli: non dichiarare anonimato assoluto. Non archiviare né inviare IP per conto del sito.

Limiti: le API sono pubbliche e i conteggi sono manipolabili; localStorage non garantisce un voto per persona. Non adatto a sondaggi certificati. La PWA visualizza la valutazione durante la lettura e vota soltanto quando online; offline la lettura resta possibile. Se la conferma del voto remoto fallisce il voto viene bloccato nel browser per evitare duplicazioni.

Collaudo: verificare la presenza delle stelle nelle 44 pagine editoriali, la classifica completa, l'assenza di incrementi in sola lettura, il blocco del secondo voto e il comportamento PWA offline. La verifica della persistente disponibilità e compatibilità di counterapi.com deve essere ripetuta periodicamente.
