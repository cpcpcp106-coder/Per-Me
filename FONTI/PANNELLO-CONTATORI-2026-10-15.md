# Pannello di lettura contatori (15 ottobre 2026)

Percorso tecnico: /Per-Me/contatori-personali/; non collegato dalla home e non inserito in sitemap. Destinato al proprietario: meta robots noindex, con eccezione esplicita nell'audit indicizzazione per questa pagina tecnica; il divieto dei noindex sulle guide pubbliche resta invariato.

È una PWA installabile in Android da Chrome con manifest e service worker dedicati, separati dall'app delle guide. Lettura dei contatori con fetch JSON HTTPS e CORS consentito; mai da file://. Due chiavi: visita / per-me-visite-da-zero-20261015 e installazione / per-me. Entrambe le letture specificano readOnly=true. Cache locale degli ultimi numeri, con stato di aggiornamento esplicito, per non mostrare zero inventati offline.

L'apertura con ?perme_escludimi=1 attiva sul browser utilizzato l'esclusione dal conteggio pubblico del sito. Il pannello non carica analytics.js e quindi non conta le proprie aperture.

**Limite di riservatezza**: GitHub Pages è un sito pubblico, la pagina non è autenticata, e i dati CounterAPI sono accessibili senza chiave. Noindex e assenza di link non realizzano un controllo di accesso. Per vera esclusività del proprietario è necessario un sistema autenticato. Non presentare questo pannello come privato in senso tecnico.

Il vecchio file locale HTML non è affidabile nel visualizzatore di file di Android: i browser locali possono bloccare fetch o immagini remote. Usare sempre questa pagina HTTPS per i numeri aggiornati.
