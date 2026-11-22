# Per Me — integrazione della presentazione e degli strumenti

Intervento del 22 novembre 2026, a partire dal main `6ba1ca3a8bfc86c272559c54613200b36b4efe52`.

La proposta originaria [#29](https://github.com/cpcpcp106-coder/Per-Me/pull/29) non si integra automaticamente con gli aggiornamenti social successivi. Questo intervento ne recupera le parti editoriali sulla versione corrente del sito.

## Cambiamenti

- La presentazione iniziale esplicita il pubblico 50–70 anni, l'aiuto ai familiari e l'accesso gratuito senza registrazione.
- «Da usare questa settimana» collega direttamente menu mediterraneo, calcolatore della spesa e modelli già pubblicati.
- Le due notizie INPS sono raccolte in un riepilogo apribile con mouse, tocco e tastiera; restano i titoli e gli indirizzi esistenti.
- Il footer condiviso contiene un collegamento leggibile alla Pagina Facebook. Instagram, WhatsApp e Pinterest restano nella fascia alta, con le destinazioni attuali.
- Template, 139 pagine e generatore delle ricette usano la stessa versione del CSS. I workflow dei collaudi includono modifiche ai componenti condivisi e al generatore.

## Perimetro conservato

Il codice dei contatori, compresa la provenienza Pinterest, non viene modificato. Le sei nuove serie della PR #29, i controlli di consenso, il pannello marketing e la raccolta programmata non fanno parte di questa pubblicazione. Nessuna nuova misurazione viene attivata.

I contenuti delle altre pagine sono stati confrontati con main dopo aver normalizzato soltanto footer e versione CSS: nessuna modifica editoriale aggiuntiva. Header, sitemap, app, service worker e pannelli dei contatori sono identici alla base. «Offrimi un caffè» resta fuori dall'intervento.

## Verifiche prima della pubblicazione

- Layout coerente su 139 pagine; controllo di struttura: 3.581 collegamenti locali, zero errori.
- Audit statico: 149 HTML, 5.255 collegamenti locali, zero file o ancore mancanti; sitemap coerente. Questo non dimostra indicizzazione Google.
- Generatore: 28 ricette in sette pagine, dati del menu coerenti.
- Pulsante Facebook condiviso presente nelle 129 guide/pagine controllate.
- 25 prove isolate delle provenienze superate, senza richieste ai contatori reali.
- Audit editoriale strutturale senza problemi bloccanti; restano le segnalazioni preesistenti sulle fotografie remote. Non costituisce revisione scientifica o giuridica articolo per articolo.
- Anteprima aperta nel browser: verificati nuova presentazione, tre accessi agli strumenti, fascia social conservata e apertura delle due notizie.

Il collaudo GitHub della versione risultante deve completarsi prima dell'integrazione in main. Comprende schermi stretti, testo al 200%, navigazione dei nuovi accessi, tastiera e frammenti delle notizie, ricerca, menu–spesa, fotografie e lettura offline. L'esito e i collegamenti diretti saranno aggiunti dopo l'esecuzione. Nessuna nuova prova su Samsung fisico viene attribuita a questo intervento.
