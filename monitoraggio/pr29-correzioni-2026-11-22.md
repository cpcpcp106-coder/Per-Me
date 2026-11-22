# PR #29 — Correzioni nel ramo di proposta, 22 novembre 2026

Ambito autorizzato: aggiornamento e collaudo del solo ramo `marketing/sei-punti-2026-11-21`. La PR resta aperta; unione in main, pubblicazione e attivazione delle nuove metriche richiedono una decisione esplicita separata.

PR: https://github.com/cpcpcp106-coder/Per-Me/pull/29

## Modifiche

Il ramo incorpora main `cf1957e30b526627af459df40d309e087d57708b`, preservando la guida alle farine, le immagini, le fonti e la sitemap. Il sincronizzatore esistente ha allineato soltanto il footer della guida alle farine; nella stessa pagina sono aggiornati gli identificativi di versione di stile e analytics.

Il collaudo distingue Facebook nel contenuto e nel footer e verifica anche WhatsApp nel footer, apertura sicura e dimensioni dei comandi. Entrambi i collegamenti Facebook sono conservati.

Il workflow marketing usa un blocco YAML per il comando con «Per Me:» e limita l'intero job a `refs/heads/main`. Nessuno script di pubblicazione dei rapporti viene eseguito durante questa correzione.

Le nuove metriche rileggono consenso e scadenza prima di ciascun evento. Il client interrompe la misurazione alla mezzanotte italiana che apre il 22 dicembre, includendo tutto il 21 dicembre. Restano esclusi curatore, uso offline e app installata; gli input degli strumenti non vengono trasmessi. Queste garanzie riguardano le sei nuove serie facoltative; i contatori e Cloudflare preesistenti restano distinti.

Il pannello distingue serie non attivate, dati mancanti e zero osservato. Il confronto usa soltanto risposte con stato `ok`, dalla prima lettura valida successiva all'attivazione effettiva. Lo storico iniziale resta intatto: i suoi zeri con stato `non_ancora_creato` non sono usati come baseline valida. `marketing_activated_at` resta `null`; la data va registrata soltanto dopo un'eventuale attivazione autorizzata. Lo snapshot non richiede le nuove serie in assenza di tale data e tratta un HTTP 404 come dato mancante.

## Verifiche locali

- 25 prove JavaScript delle metriche superate, con `fetch` simulato e nessuna rete: consenso, revoca da altra scheda, scadenza a pagina aperta, cancellazione della scelta, valori invalidi e limiti del periodo in Italia.
- 8 prove Python dello snapshot superate, con rete e orologio simulati: zero valido, HTTP 404, indisponibilità, dati invalidi, attivazione assente/futura, conservazione dello storico e limite temporale. Nessuna invocazione dello script di pubblicazione.
- Layout coerente su 139 pagine; 3.720 collegamenti locali verificati; componente Facebook presente nelle 129 pagine/guide sottoposte a quel controllo.
- 145 pagine pubbliche, 145 URL nella sitemap e 145 pagine raggiungibili dalla homepage; zero errori del controllo statico di indicizzabilità. Questo esito non attesta l'indicizzazione effettiva in Google.
- Parsing dei 35 workflow YAML superato; verificato il limite a main del job marketing.

## Collaudi browser

I tre script del collaudo strumenti sono stati avviati localmente, ma Chromium viene fermato dalle restrizioni dell'ambiente (`socket() failed: Operation not permitted`) prima di aprire le pagine. Questi tentativi non attestano l'esito delle prove funzionali.

I collaudi sono stati completati nei runner GitHub sul commit `9ea24d724e8c3cac7ef213ab97db60b500a0af50`. Sono superate le prove a 320/390 pixel, testo al 200%, ricerca, collegamenti social, trasferimento dal menu al calcolatore, riepilogo di spesa, fotografie e lettura offline; consenso/revoca tra schede e scadenza; pannello con serie non attivate, prima lettura valida, zero reale e risposte mancanti simulate.

## Esiti GitHub verificati

Tutti i 23 check associati al commit funzionale `9ea24d724e8c3cac7ef213ab97db60b500a0af50` sono conclusi con `success`.

| Esecuzione | Esito verificato |
| --- | --- |
| [Collaudo strumenti](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45023765074) | 64 controlli dei percorsi e strumenti, 99 delle migliorie e 173 dei lieviti/fotografie/offline; zero fallimenti. I due passi che in precedenza erano saltati sono stati eseguiti e superati. |
| [Test browser contatori](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45023771440) | Browser, consenso/revoca tra schede e scadenza a 320/390; 25 prove JavaScript; 8 prove Python. Tutti i passi superati, invii dei contatori e Cloudflare intercettati. |
| [Collaudo browser generale](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/45023771415) | Test responsive, controlli automatici di accessibilità, sincronizzazione e offline superati. Artefatto conservato dal runner. Controllo delle destinazioni esterne e archiviazione su main saltati per la protezione di ramo. |

La verifica YAML attesta la sintassi e la guardia del job marketing. Il workflow di raccolta marketing non è stato avviato come prova: nessuna raccolta o archiviazione reale viene dichiarata riuscita. Le prove automatiche non certificano un telefono Samsung fisico, accessibilità completa con tecnologie assistive o revisione professionale dei contenuti.

Le correzioni sono limitate al ramo della PR; nessuna unione, pubblicazione o attivazione delle nuove metriche. Gli esiti si riferiscono al commit funzionale indicato; l'aggiornamento successivo di questo registro è soltanto documentale.
