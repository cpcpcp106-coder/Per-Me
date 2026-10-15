# Per Me — Diritti delle immagini e regola zero spese
**Verifica iniziale: 15 ottobre 2026 · Ambito esclusivo: Per Me**

## Esito: fotografie esterne del sito
Le otto fotografie esterne attive nella rubrica Agevolazioni e diritti sono riconducibili a pagine originali pubblicate su Pexels o Unsplash con licenza gratuita. La pagina originale, l'autore, il tipo di licenza e la singola pagina HTML sono registrati in [registro-diritti-immagini.json](registro-diritti-immagini.json). Non sono previsti canoni o corrispettivi periodici per l'uso ordinario editoriale conforme a tali licenze.

- Unsplash (Guida 01, Vitaly Gariev): https://unsplash.com/photos/elderly-couple-using-a-laptop-together-at-home-Gi8-DM56n6Y ; https://unsplash.com/license
- Pexels (Guide 02–06 e due approfondimenti locali): https://www.pexels.com/license/
- Esempi di fonti identificate: https://www.pexels.com/photo/elderly-woman-reading-a-document-7545331/ ; https://www.pexels.com/photo/men-and-woman-waiting-at-bus-stop-15965909/ ; https://www.pexels.com/photo/man-walking-at-railway-station-23720159/ ; https://www.pexels.com/photo/a-man-consulting-a-doctor-8413217/ ; https://www.pexels.com/photo/a-woman-talking-to-her-doctor-4266930/ ; https://www.pexels.com/photo/couple-and-social-worker-sitting-at-table-9870140/ ; https://www.pexels.com/photo/a-woman-holding-a-clipboard-8962383/.

**Restrizioni**: niente rivendita di stock come prodotto autonomo, niente false dichiarazioni di approvazione di Per Me da parte di persone/brand ritratti, niente rappresentazioni offensive o diffamatorie di soggetti riconoscibili. Usare sempre la dicitura “fotografia illustrativa”; non far credere che le persone rappresentate siano malate, indebitate o beneficiarie delle misure descritte. La licenza fotografica non risolve automaticamente diritti sui marchi o diritti all'immagine dei soggetti riconoscibili.

## Foto e file locali: documentazione non ancora sufficiente
Il repository contiene **41 file di immagini locali** (conteggio tecnico al momento del registro), compresi logo, icone PWA, foto, immagini di lavoro non utilizzate sul sito. Lo storico delle approvazioni dell'autore e i nomi come “Immagine ChatGPT” **non dimostrano da soli** l'origine giuridica di ogni file. Perciò sono registrati con **PROVENIENZA_DA_DOCUMENTARE**, senza attribuire falsamente loro una licenza o un autore.

Questa condizione non significa che una fattura o un'obbligazione di pagamento esista: non ne abbiamo identificata alcuna. L'unico modo per attestare pienamente l'origine è conservare le prove (generazione originale, file di produzione, licenza ricevuta o autorizzazione). Non cancellare foto già approvate soltanto perché mancano le prove, salvo indizi concreti di violazione. Nessuna immagine locale è stata cancellata in questa verifica.

## Procedura per nuove immagini
1. **Prima di pubblicare**, scegliere un'immagine creata per il progetto con origine documentata, oppure un'originale stock gratuita di cui siano stati controllati la pagina e la licenza. Nessun acquisto, prova gratuita o abbonamento.
2. Registrare fonte, autore, licenza, pagina di destinazione, data, ed evidenza di provenienza in `FONTI/registro-diritti-immagini.json`. Se un'immagine locale è stata generata, conservare la traccia che lo documenta.
3. Usare immagini diverse per ogni nuova guida, realistiche, pertinenti, senza marchi indebiti o sottintesi offensivi. Indicare chiaramente che sono illustrative.
4. Il controllo GitHub `scripts/audit-diritti-immagini.cjs` blocca immagini esterne non registrate, modifiche a file immagine locali senza aggiornamento del registro e nuovi file grafici privi di registrazione.
5. **Non interpretare mai un esito verde del controllo come certificazione universale dei diritti**: significa solo che inventario e impronte corrispondono. I 41 file locali rimangono in verifica finché non si recupera documentazione effettiva.

### Comandi di verifica
```bash
node scripts/audit-diritti-immagini.cjs
```
Il test eseguito automaticamente è `.github/workflows/audit-diritti-immagini.yml`.

**Obiettivo gestionale:** zero spese per immagini, nessuna attribuzione inventata, nessun cambiamento distruttivo degli asset approvati.
