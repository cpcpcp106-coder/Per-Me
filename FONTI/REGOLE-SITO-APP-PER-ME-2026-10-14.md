# PER ME — Regole permanenti di coerenza tra sito e app
**Versione:** 1.0 · **Consolidamento:** 14 ottobre 2026
**Ambito:** sito web `https://cpcpcp106-coder.github.io/Per-Me/`, app PWA `https://cpcpcp106-coder.github.io/Per-Me/app/`, manutenzioni e future pubblicazioni.
**Documento di progetto:** conservare e consultare prima di modificare sito, guide o app.

## 1. Identità e finalità
- "Per Me" è un blog personale gratuito, senza scopo di lucro, per persone prevalentemente tra i 50 e i 70 anni con problemi pratici economici, previdenziali, lavorativi, amministrativi, sanitari e di autonomia.
- Priorità a risposte comprensibili, operative, fonti istituzionali aggiornate, limiti espliciti delle informazioni; distinguere fatti, ipotesi, esempi, norme e testimonianze personali.
- Linguaggio chiaro, caratteri grandi e leggibili, buon contrasto, pulsanti riconoscibili e testo leggibile sullo smartphone. Evitare operazioni superflue e percorsi confusi.

## 2. Fonte unica di verità e corrispondenza
- Il **sito web è la fonte editoriale primaria**. L'app è un **lettore delle stesse rubriche e guide**, non un progetto editoriale separato: non inventare, riassumere arbitrariamente, alterare o pubblicare nell'app testi divergenti.
- Le modifiche ai testi del sito devono riflettersi nell'app mediante sincronizzazione quando è online; le copie già salvate devono essere disponibili offline. In caso di mancato aggiornamento indicare correttamente copia da verificare, senza far credere che sia aggiornata.
- Preservare nelle guide offline: testo sostanziale, titoli, numerazione, tabelle, avvertenze, fonti normative, link istituzionali, contatti CAF/Patronato, rimandi alle altre guide.
- Distinguere differenze **volute** da errori: sul sito possono esserci foto, testata, navigazione completa, Home, Il metodo, Monitoraggio, Il progetto; l'app è prevalentemente testuale. Esplicitare con chiarezza ciò che non viene memorizzato offline; non chiamare tali pagine "guide complete".
- Stato verificato al 14/10/2026: **6 rubriche** (Soldi & Lavoro; Pensione e invalidità; Debiti e cartelle; Agevolazioni e diritti; Salute e autonomia; Tutor AI essenziale) e **10 guide complete** (6 + 4), totale **16 pagine nel lettore**. Sono numeri di una fotografia temporale, non un limite fisso. Le nuove guide vanno rilevate automaticamente e verificate; l'app deve evolvere con il sito.

## 3. Navigazione, installazione e funzionamento offline
- I link tra le guide devono aprire la **copia salvata nell'app** quando disponibile, comprese le ancore `#sezione` che devono portare al paragrafo corretto. I ritorni a Home/indice devono riportare correttamente al catalogo offline se pertinente.
- I collegamenti esterni (siti INPS, fonti istituzionali, CAF e patronato) possono richiedere Internet: segnalarlo senza simulare l'accessibilità offline.
- L'app deve scaricare e aggiornare automaticamente le guide quando online e offrire anche un comando manuale `Aggiorna le guide`. Mostrare il numero reale delle pagine salvate e la data dell'ultimo controllo; non scrivere "aggiornamenti disponibili" senza aver trovato novità, ma "puoi verificare gli aggiornamenti".
- Non inserire in un'app già aperta/installata il pulsante **"Scarica app sul telefono"**. L'invito a installare deve comparire **solo nel sito/browser, quando pertinente**, non dentro la PWA avviata in modalità standalone. Evitare pulsanti di installazione duplicati.
- Non confondere le vecchie PWA o scorciatoie collegate al dominio `chatgpt.site` con la PWA ufficiale di GitHub Pages. La versione pubblicata e mantenuta è su GitHub Pages, percorso `/Per-Me/app/`. Prima di chiedere disinstallazioni, verificare origine dell'icona, app installata, dati salvati e preferiti: non far perdere dati per risolvere problemi estetici.
- L'installazione e la sostituzione dell'icona sul telefono possono richiedere una nuova installazione, a seconda di cache, PWA e sistema operativo; una modifica nel manifest non garantisce che l'icona già presente venga aggiornata istantaneamente.

## 4. Identità visiva obbligatoria
- Usare sempre il **logo ufficiale approvato**: rotondo, elegante e minimalista, toni del cuoio naturale, scritta "Per Me" e strada verso il sole, trasparenza fuori dal cerchio. Regole e file di riferimento in `FONTI/LOGO-UFFICIALE.md`.
- Logo coerente in sito, app, manifest PWA, icone Android e favicon/collegamento desktop. **Non tornare alle icone "PI" o "PM"**. Non sostituire il logo approvato senza consenso dell'autore.
- Le fotografie editoriali sul sito devono essere differenti e pertinenti per guida/rubrica; per le immagini delle guide non è richiesta approvazione preventiva prima della pubblicazione. L'autore le verifica successivamente sul sito. L'app può mantenere la lettura prevalentemente solo testo.
- **Coerenza fra copertine:** per le guide privilegiare scene fotografiche realistiche, ambientate e sobrie, con palette naturale (cognac, legno, crema, verde salvia); evitare copertine isolate in stile infografica o fumetto e grandi scritte dentro le immagini. Ogni guida deve avere una propria immagine distinta, non riciclata da altre guide.
- **Varietà di persone e ambientazioni:** non riproporre sistematicamente lo stesso uomo maturo allo stesso tavolo. Alternare in modo realistico figure femminili e maschili, inquadrature, contesti e gesti, mantenendo coerenza con il tema di ciascuna guida e controllando l'anatomia (in particolare mani e braccia) prima della pubblicazione.

## 5. CAF/Patronato e precisione delle fonti
- Quando pertinente, mantenere in prima persona la testimonianza: **"Io mi sono appoggiato al CAF UIL e al Patronato ITAL UIL di Tarcento (UD)."** Non presentarla come convenzione o patrocinio.
- Distinguere: CAF UIL = questioni fiscali/ISEE; Patronato ITAL UIL = previdenza/invalidità; sindacato, consulente del lavoro o legale = controversie retributive e tutela giuridica, secondo il caso.
- Prevedere pulsanti leggibili verso pagine ufficiali dei contatti CAF UIL e Patronato ITAL UIL, con link verificati. Preservarli anche nei testi offline (utilizzabili online). Evitare duplicazioni inutili.
- Per guide su diritti, previdenza, lavoro e scadenze: verifiche critiche con fonti istituzionali, riferimenti pertinenti e aggiornamento documentato; vietate affermazioni non fondate o numeri inventati.

## 6. Metodo tecnico e verifiche obbligatorie
- Prima di dire "risolto", confrontare repository, pagina pubblicata e, quando indispensabile, conferma sul dispositivo. Un commit su GitHub non prova da solo che il telefono mostri l'ultima versione.
- Ogni modifica dell'interfaccia o degli script della PWA deve tenere coerenti i riferimenti a `app/index.html`, `app/main.js`, `app/app.css`, `app/sw.js`, `app/manifest.webmanifest` e gli asset (cache service worker/versioni) per evitare copie obsolete.
- Verificare: stessa quantità di pagine e guide; testi e fonti coincidenti con il sito; navigazione e ancore; collegamenti esterni; primo download; aggiornamenti online; lettura offline; warning per copie non aggiornate; icona ufficiale; leggibilità e accessibilità.
- L'utente non deve eseguire operazioni tecniche che sono eseguibili direttamente dagli strumenti disponibili. Se serve un'azione manuale sul Samsung, guidare **un solo passaggio alla volta**, con istruzioni brevi e precise. Leggere autonomamente gli screenshot forniti, senza richiederne altri quando non necessari.
- **Tutti i link all'utente devono essere in chiaro, completi, copiabili**; preferire anche un pulsante di copia quando possibile. Non fare reinstallare l'app senza motivazione tecnica concreta e precauzione per preferiti e dati salvati.

## Indicizzazione pubblica — aggiornamento del 15 ottobre 2026
- Tutte le pagine pubbliche del sito e dell’app devono consentire `index,follow`, avere un indirizzo canonico coerente ed essere incluse nella sitemap. Il file tecnico di verifica della proprietà Google resta fuori dalla sitemap senza alcun blocco di accesso o indicizzazione.
- Sono superate le precedenti istruzioni di mantenere `noindex`/`nofollow` in attesa di revisione o completamento delle rubriche. Le verifiche editoriali continuano senza reintrodurre tali blocchi.
- Eseguire `python scripts/audit-indicizzazione.py` a ogni modifica; con `--live` verificare anche le pagine pubblicate, le intestazioni HTTP e il robots.txt alla radice dell’host.

## 7. Stato e tracciabilità
- Al 14/10/2026 nell'app risultavano **16 pagine salvate** dopo sincronizzazione, pari alle pagine previste. Questo certifica il conteggio, **non** una verifica automatica bit-per-bit del testo reso sul dispositivo.
- Nella sessione di audit sono stati esaminati 236 riferimenti interni alle sezioni delle pagine, senza ancore mancanti; sono stati aggiornati i rimandi nel lettore e la gestione della cache alla versione 6. Ripetere i test quando cambia il codice.
- Repository: `https://github.com/cpcpcp106-coder/Per-Me`; Home: `https://cpcpcp106-coder.github.io/Per-Me/`; PWA: `https://cpcpcp106-coder.github.io/Per-Me/app/`.

**Regola di prevalenza:** le richieste esplicite più recenti dell'autore e le fonti istituzionali aggiornate prevalgono su questo documento, che va mantenuto aggiornato e non trattato come fotografia immutabile.
