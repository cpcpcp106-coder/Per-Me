# Contatori essenziali Per Me — 15 ottobre 2026

Misure: `visita` è una sessione per scheda del browser, non un visitatore unico. `installazione` è un evento `appinstalled` comunicato dal browser, non il clic sul pulsante; rilevamento parziale (Chromium, non tutte le installazioni manuali). Su Android l'evento può precedere il completamento del pacchetto WebAPK. https://web.dev/learn/pwa/detection/

Servizio esterno: https://counterapi.com/; namespace `cpcpcp106-coder.github.io`, azioni `visita` e `installazione`, chiave `per-me`. La lettura in `statistiche.html` usa `readOnly=true` e non incrementa i valori. Sono contatori pubblici, non resistenti ad alterazioni volontarie. La perdita di connettività non impedisce l'uso delle guide offline. Nessun dato storico antecedente all'attivazione viene ricostruito.

Copertura richiesta: tutte le pagine HTML pubbliche (eccetto file tecnico Google) e la PWA `app/index.html`. La pagina statistiche.html non viene conteggiata; la PWA avviata come applicazione non conta come visita al sito. Nessuna analisi personale o dati aggiuntivi richiesti.
