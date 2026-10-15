# Per Me — Regole permanenti per sito e app

Aggiornate il **15 ottobre 2026**. Prevale il perimetro nazionale descritto in `FONTI/PERIMETRO-NAZIONALE-2026-10-15.md`.

## Ambito e assistenza
- Tutti i lettori sono in Italia, non nella zona dell'autore. Le guide partono dalle regole nazionali. I contenuti regionali restano in sezioni e pagine dichiaratamente locali.
- Non inserire testimonianze personali, nomi, telefoni o contatti di un CAF/patronato scelto dall'autore nelle guide. Spiega come cercare il servizio competente nel territorio del lettore, distinguendo CAF (fisco e ISEE), patronato (previdenza), sindacato/consulente/legale (controversie), OCC (sovraindebitamento).
- Non pubblicare un nuovo contenuto esclusivamente locale nell'elenco delle guide nazionali.

## Accessibilità dei pulsanti

Utilizzare pulsanti separati, entrambi grandi e leggibili: **testo bianco (#fff), sfondo verde scuro (#234438), font almeno 1.08rem, altezza almeno 56px e larghezza intera sui telefoni**. Impostare esplicitamente il colore per i link in ogni stato, compreso `:visited`, `:focus-visible`, `:hover`. Evitare i vecchi link viola illeggibili.

## Procedure di aggiornamento

Per **ogni aggiornamento futuro del sito**, rileggere queste regole nazionali e ricontrollare che nessuna guida generica raccomandi una sede personale o un regime locale.

Per **ogni aggiornamento futuro dell'app**, sincronizzare i testi dalle pagine aggiornate del sito e non solo da un file statico di esempi. Nel repository la nuova app GitHub Pages è in `app/` e usa `main.js`, `sw.js` e il manifesto. Il file storico `app-content.json` contiene a sua volta la politica editoriale e i contatti; mantenerlo coerente se in uso.

Non è corretto indicare completato un aggiornamento dell'app esterna `per-me-app.stilljelly65.chatgpt.site` se il relativo sorgente e la pubblicazione non sono accessibili. In tali casi mantenere distinta l'app pubblicata su GitHub Pages da quella esterna.

## Controlli di chiusura

Confermare link, numeri distinti, contrasto, navigazione del sito, lettura delle guide offline dopo un primo aggiornamento riuscito, e sincronizzazione dei nuovi articoli online. Comunicare esplicitamente quali verifiche sono realmente state eseguite.

## Indicizzazione delle pagine pubbliche

Per il sito pubblico, tutte le pagine pubbliche del sito e dell'app devono consentire l'indicizzazione e la scansione dei collegamenti (`index,follow`). Non reintrodurre blocchi `noindex` o `nofollow` su rubriche, guide, pagine di servizio o app. La richiesta supera tutte le precedenti istruzioni presenti in piani e audit storici che richiedevano di conservare tali blocchi fino al collaudo o al completamento delle rubriche.

Il controllo automatico `python scripts/audit-indicizzazione.py` deve coprire ricorsivamente tutte le pagine HTML, comprese nuove pagine e sottocartelle, e fallire in presenza di direttive bloccanti, canonical incoerenti o omissioni dalla sitemap. La modalità `--live` verifica anche HTTP, intestazioni, robots.txt e corrispondenza con la pubblicazione. Il workflow «Indicizzazione di tutte le pagine» lo esegue a ogni push e pull request.

Mantenere gli indirizzi canonici coerenti e la sitemap aggiornata, senza inserire il file tecnico di verifica della proprietà Google. La home non deve presentare il sito nel suo complesso come «in costruzione»; lo stato dei singoli contenuti va comunicato nelle rispettive pagine.

## Identità grafica ufficiale Per Me (vincolante)

Il logo è stato approvato il 14 ottobre 2026 e l'autore ha confermato l'ultima correzione («Risolto»). Prima di modificare testata, grafica o app consultare **[FONTI/DECISIONI-LOGO-SITO-APP-2026-10-14.md](FONTI/DECISIONI-LOGO-SITO-APP-2026-10-14.md)** e **[FONTI/LOGO-UFFICIALE.md](FONTI/LOGO-UFFICIALE.md)**. Formato circolare minimal color cuoio, trasparenza all'esterno; dimensione approvata **82 px mobile / 86 px desktop**; lo stesso logo va conservato in sito, app e icone di installazione. Non tornare ai vecchi simboli PI/PM. Mantenere l'elemento `<img>` esplicito su tutte le pagine, aggiornare versioni CSS e cache quando servono e verificare l'effettiva pubblicazione GitHub Pages. Le fonti sono archiviate anche in **Per Me - Blog / Fonti** su Google Drive e nella **Libreria ChatGPT / Per Me / Fonti**.
