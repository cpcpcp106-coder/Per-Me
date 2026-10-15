# Per Me — revisione completa dei blocchi di indicizzazione

Verifica online: 2026-10-15T13:33:25.534683+00:00.
Sorgente verificato: `c4433725bdaf413b7e9981ef1841517dd090e50a`.

## Perimetro e risultato

Inventario ricorsivo dell’intero repository: **41 file HTML**, di cui **40 pagine pubbliche** comprendenti home, rubriche, guide, pagine di servizio e PWA, più il file tecnico di verifica della proprietà Google.

- **40/40 pagine pubbliche** prive di istruzioni bloccanti in HTML, script caricati e intestazioni HTTP; canonical coerenti.
- **40/40 URL pubblici** inclusi nella sitemap, senza duplicati o URL eccedenti.
- **43/43 URL online** verificati con HTTP 200 e contenuto identico al sorgente esaminato: i 40 canonici, il file tecnico Google e gli alias espliciti `index.html` e `app/index.html`.
- Il file tecnico Google è stato controllato e non presenta blocchi; la sua esclusione dalla sitemap è corretta e non equivale a un divieto di scansione o indicizzazione.
- `https://cpcpcp106-coder.github.io/robots.txt`: HTTP 404, quindi nessuna regola robots.txt che vieti la scansione delle pagine. Verificati Googlebot, Googlebot-Image, Bingbot e agente generico su tutti gli URL.
- Nessun blocco in configurazioni robots/header locali; nessuna direttiva `noindex`, `nofollow`, `none`, `noimageindex` o `unavailable_after` applicata alle pagine.

## Correzioni di questa revisione

La precedente rimozione dai file HTML è risultata completa. Restavano istruzioni editoriali e rapporti storici che richiedevano di mantenere i blocchi: aggiornati il piano editoriale e le regole permanenti; aggiunta a 14 rapporti storici una nota che revoca esplicitamente quella indicazione senza cancellare la cronologia.

Aggiunti `scripts/audit-indicizzazione.py` e il workflow «Per Me - Indicizzazione di tutte le pagine». Il controllo enumera ricorsivamente le pagine, incluse future sottocartelle; rileva direttive nei metadati generali o per singolo crawler, link con nofollow, script, configurazioni, canonical incoerenti e omissioni dalla sitemap. Il workflow esegue la modalità statica a ogni push e pull request; un errore fa fallire il controllo e deve essere corretto. Questo workflow non modifica i contenuti.

## Riproduzione e verifiche

```bash
python scripts/audit-indicizzazione.py
python scripts/audit-indicizzazione.py --live --report /tmp/per-me-indicizzazione.json
python monitoraggio/audit_statico.py
```

Verificati dieci casi negativi in un sito temporaneo: noindex, nofollow, alias none, regola Googlebot, link nofollow, canonical errato, nuova pagina in sottocartella assente dalla sitemap, Disallow, intestazione noindex in .htaccess e noindex inserito da JavaScript. Tutti rilevati; un Disallow vuoto è correttamente consentito.

Passati anche i cinque audit esistenti delle rubriche Agevolazioni/Debiti e gli undici test PWA. Audit statico: 1.109 riferimenti locali, nessun file o ancora mancante, nessuna omissione/eccedenza nella sitemap.

## Limite della conclusione

Il risultato riguarda **il 100% delle pagine pubbliche presenti al momento della verifica e l’assenza dei blocchi tecnici esaminati**. Non attesta che Google abbia già indicizzato tutte le pagine o che lo farà. I rapporti Search Console vanno verificati separatamente.
