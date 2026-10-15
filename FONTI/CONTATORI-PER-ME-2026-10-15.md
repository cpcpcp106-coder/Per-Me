# Contatori essenziali Per Me — 15 ottobre 2026

Misure: `visita` è una sessione per scheda del browser, non un visitatore unico. `installazione` è un evento `appinstalled` comunicato dal browser, non il clic sul pulsante; rilevamento parziale (Chromium, non tutte le installazioni manuali). Su Android l'evento può precedere il completamento del pacchetto WebAPK. https://web.dev/learn/pwa/detection/

Servizio esterno: https://counterapi.com/; namespace `cpcpcp106-coder.github.io`, azioni `visita` e `installazione`, chiave `per-me`. La lettura dei valori non è più pubblicata sul sito; l'API di CounterAPI rimane accessibile da Internet senza autenticazione. Sono contatori pubblici, non resistenti ad alterazioni volontarie. La perdita di connettività non impedisce l'uso delle guide offline. Nessun dato storico antecedente all'attivazione viene ricostruito.

Copertura richiesta: tutte le pagine HTML pubbliche (eccetto file tecnico Google) e la PWA `app/index.html`. La pagina pubblica statistiche.html è stata rimossa; la PWA avviata come applicazione non conta come visita al sito. Nessuna analisi personale o dati aggiuntivi richiesti.

## Scelta di riservatezza (15 ottobre 2026)
Su richiesta dell'autore, rimossi i due numeri dalla home, il collegamento pubblico, la pagina statistiche.html e il relativo URL nella sitemap. Il monitoraggio degli eventi continua. ATTENZIONE: CounterAPI conserva valori tecnicamente leggibili da terzi che conoscano l'endpoint; la riservatezza assoluta richiede la sostituzione con un pannello autenticato (es. Google Analytics 4). Non presentare questo servizio pubblico come protetto da password.
