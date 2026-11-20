# Per Me — consolidamento Fase 4 del 20 novembre 2026

## Esito di questo intervento

Correzioni confluite nella [PR 28](https://github.com/cpcpcp106-coder/Per-Me/pull/28), pubblicate sul ramo main dal commit `edd1087b2e8a6300fdc161ca74979cbf48abd32d`. Il controllo precedente sul commit `5adc8e9` aveva cinque gruppi di prove falliti: non è stato considerato superato.

- Corretto un difetto effettivo: i tre comandi di dimensione del testo avevano un nome accessibile che non conteneva il testo visibile. Ora mostrano **Riduci**, **Ingrandisci** e **Normale**, con nomi accessibili coerenti. Le violazioni automatiche risultavano su 128 pagine del precedente rapporto.
- Allineate le prove alla homepage approvata, con ricerca dopo la presentazione; conservate le ricerche e le destinazioni, il reflow a 320/390 px e al 200%.
- I test Facebook verificano il componente editoriale, il suo indirizzo e la dimensione del pulsante, distinguendolo dal collegamento del modulo di riscontro. Riconosciute sia le versioni statiche sia quelle inserite dal componente condiviso.
- Nell’app offline l’indice è riconosciuto dal riepilogo «In questa guida»: il filtro di sicurezza del lettore non conserva la classe CSS della pagina originale. Il modulo «Segnala un problema» rimane distinto.
- Aggiornati insieme script di lettura, pagina dell’app e cache alla risorsa `lettura-guide.js?v=2`; una prima prova ha rilevato la mancata corrispondenza della pagina dell’app ed è stata corretta prima del merge.
- Il collaudo browser esteso ora funziona anche nelle PR, conserva le evidenze e non scrive su main i rapporti della PR. I soli collaudi di PR superati da una nuova revisione sono annullati; quelli su main restano seriali. Il collaudo degli strumenti si attiva anche sulle modifiche di `app/index.html`.

## Prove concluse prima del merge

| Prova | Esito e collegamento |
| --- | --- |
| Strumenti | **52 superati, zero falliti** nella [run 44772291934](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44772291934), commit `be70d26`. |
| Cinque miglioramenti | **77 superati, zero falliti** nella stessa run: testo al 200%, voce simulata, riepiloghi PDF, trasferimento del paniere e riapertura offline. |
| Lieviti, fotografie e offline | **173 controlli superati** nella stessa run. |
| Browser esteso | **30 PASS, zero FAIL**, nessuna violazione automatica o errore JavaScript nel [collaudo della revisione finale](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44772388363), commit `01c0b9d`. Controllate 138 pagine HTML nella radice, oltre ai percorsi app e menu. |
| Struttura e indicizzabilità locale | 143 pagine pubbliche, 143 URL in sitemap, 143 raggiungibili dalla homepage; nessun problema rilevato. |
| Componente Facebook statico | 127 guide e pagine coperte dal controllo condiviso. |

Il commit `01c0b9d` differisce da `be70d26` soltanto nella gestione delle esecuzioni superate del workflow browser; i file e gli ingressi del collaudo strumenti non sono cambiati. Anche gli altri controlli PR della revisione finale risultano superati.

Chromium locale non si avvia per il limite sui socket dell’ambiente; le prove valide sopra sono quelle effettivamente eseguite in GitHub Actions. Non sono prove su Samsung reale, TalkBack o una certificazione WCAG completa.

## Google: nuova ispezione, nessuna nuova richiesta ripetuta

Search Console ufficiale è accessibile. La dashboard continua a mostrare tre indirizzi indicizzati. La sitemap XML mostra ancora «Impossibile leggere la Sitemap», ultima lettura esposta 20/11/26 e zero pagine rilevate.

L’ispezione individuale di `inps-mobile-5-novita.html` registra ora **«Pagina scansionata, ma attualmente non indicizzata»**, anziché il precedente URL sconosciuto. Ultima scansione esposta: **20 novembre 2026, 11:17:54** (ora riportata nell’interfaccia, fuso non esplicitato). Googlebot per smartphone, scansione consentita, recupero riuscito, indicizzazione consentita e canonical dichiarato corretto. Questo conferma il recupero della guida e non l’ingresso nell’indice. La richiesta già accettata non è stata ripetuta.

L’errore ordinario della sitemap non è risolto e la sua causa non è dimostrata. Il riscontro non giustifica modifiche arbitrarie a canonical, robots o contenuti.

## Collegamenti e pianificazione

Riesaminati i 13 URL inconcludenti: tutti restituiscono HTTP 503 in questo ambiente, con verifica TLS mantenuta. [Risultati puntuali](fase-4-riesame-13-link-2026-11-20.json). Non è stato dichiarato che siano inutilizzabili per tutti i lettori e non sono stati sostituiti per il solo errore automatizzato.

L’attività giornaliera «Completamento Per Me» è attiva e aggiornata al piano residuo Fase 4, conservando la frequenza. Evita di ricominciare le tre fasi, ripetere le prove Samsung concluse dall’utente e inviare inviti WhatsApp o messaggi social in questa attività.

## Limiti ancora aperti

La Fase 4 resta aperta per l’errore sitemap e l’indicizzazione delle guide, i collegamenti ancora inconcludenti, il tetto reddituale FVG 2026 non documentato, la provenienza individuale delle immagini storiche non integralmente documentata e le revisioni professionali indipendenti non attestate. Restano distinti i limiti di disponibilità al CAP, etichetta fisica/lotto dell’olio e validazione dietistica del paniere già pubblicato.

Le prove assistive reali non vengono inventate. L’utente ha concluso il percorso sul Samsung: non sono richieste ulteriori operazioni manuali. «Offrimi un caffè» resta in bozza privata.

## Verifica sul sito pubblico dopo la pubblicazione

[Deployment 44772997468](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44772997468) completato con successo. Nel browser pubblico della Guida 20 confermati i tre testi visibili e i rispettivi nomi assistivi. «Ingrandisci» porta l’indicazione a 125%; «Normale» la riporta al 100%. Fotografia caricata a 1200 × 800, canonical corretto e collegamento editoriale Facebook `https://www.facebook.com/PerMeGuide` verificati. Nessun voto o riscontro fittizio inviato. Questi riscontri pubblici si aggiungono ai test offline e PDF effettivamente eseguiti in Actions; non rappresentano una nuova prova manuale sul Samsung.
