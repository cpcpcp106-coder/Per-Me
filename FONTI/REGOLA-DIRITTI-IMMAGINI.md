# Per Me — Diritti delle immagini e regola zero spese
**Verifica iniziale: 15 ottobre 2026 · Ambito esclusivo: Per Me**

## Esito: fotografie esterne del sito
Le otto fotografie esterne attive nella rubrica Agevolazioni e diritti sono riconducibili a pagine originali pubblicate su Pexels o Unsplash con licenza gratuita. La pagina originale, l'autore, il tipo di licenza e la singola pagina HTML sono registrati in [registro-diritti-immagini.json](registro-diritti-immagini.json). Non sono previsti canoni o corrispettivi periodici per l'uso ordinario editoriale conforme a tali licenze.

- Unsplash (Guida 01, Vitaly Gariev): https://unsplash.com/photos/elderly-couple-using-a-laptop-together-at-home-Gi8-DM56n6Y ; https://unsplash.com/license
- Pexels (Guide 02–06 e due approfondimenti locali): https://www.pexels.com/license/
- Esempi di fonti identificate: https://www.pexels.com/photo/elderly-woman-reading-a-document-7545331/ ; https://www.pexels.com/photo/men-and-woman-waiting-at-bus-stop-15965909/ ; https://www.pexels.com/photo/man-walking-at-railway-station-23720159/ ; https://www.pexels.com/photo/a-man-consulting-a-doctor-8413217/ ; https://www.pexels.com/photo/a-woman-talking-to-her-doctor-4266930/ ; https://www.pexels.com/photo/couple-and-social-worker-sitting-at-table-9870140/ ; https://www.pexels.com/photo/a-woman-holding-a-clipboard-8962383/.

**Restrizioni**: niente rivendita di stock come prodotto autonomo, niente false dichiarazioni di approvazione di Per Me da parte di persone/brand ritratti, niente rappresentazioni offensive o diffamatorie di soggetti riconoscibili. Usare sempre la dicitura “fotografia illustrativa”; non far credere che le persone rappresentate siano malate, indebitate o beneficiarie delle misure descritte. La licenza fotografica non risolve automaticamente diritti sui marchi o diritti all'immagine dei soggetti riconoscibili.

## Immagini generate per Per Me con ChatGPT — 41 file locali
L'autore del progetto ha confermato esplicitamente, il 15 ottobre 2026, che le immagini locali considerate inizialmente «non documentate» erano state **generate o elaborate con ChatGPT per Per Me**. È stata quindi corretta la classificazione di tutti i **41 file locali** nel registro, senza modificare né cancellare gli originali (compresi logo, icone, foto, copertine e bozze).

**Classificazione:** `AI_CHATGPT_DICHIARATA_AUTORE`. È una dichiarazione esplicita del responsabile del progetto, non il risultato di una verifica retrospettiva di tutte le singole chat di generazione. Per ogni file restano conservati nome, impronta Git (`git_blob_sha`) e note di provenienza. Se una specifica immagine incorpora una fotografia preesistente, un marchio o altro materiale di terzi, si devono verificare anche i relativi diritti; ciò vale in particolare per ritratti, logo e rielaborazioni.

**Condizioni d'uso OpenAI:** nei rapporti tra l'utente e OpenAI, l'utente è titolare dei diritti sull'Output, nei limiti delle leggi applicabili; la titolarità non annulla automaticamente eventuali diritti di terzi. Fonti: [Condizioni d'uso OpenAI, in italiano](https://openai.com/it-IT/policies/terms-of-use/) e [Guida OpenAI per l'utilizzo dell'output](https://help.openai.com/en/articles/6783457-custom-gpts-overview). Non esiste un canone fotografico OpenAI successivo da pagare per il semplice riutilizzo dell'Output nel sito.

### Categorie nel registro
- `AI_CHATGPT_DICHIARATA_AUTORE`: i 41 file locali preesistenti, ricondotti alla generazione o elaborazione con ChatGPT in base alla dichiarazione dell'autore.
- `LICENZA_PIATTAFORMA_VERIFICATA`: le otto fotografie esterne Pexels/Unsplash con collegamenti alla fonte, autore e licenza.
- `PROVENIENZA_DOCUMENTATA`: eventuali nuove immagini locali, ammesse solo con evidenza individuale della generazione o autorizzazione e dei relativi diritti.

**Non esiste una categoria generica di 41 foto sconosciute o una spesa futura accertata.** L'inventario documenta con trasparenza sia la dichiarazione di provenienza sia il suo livello di verifica.

## Procedura per nuove immagini
1. **Prima di pubblicare**, usare un'immagine generata appositamente con ChatGPT (conservandone una prova specifica) oppure una fotografia stock gratuita con pagina originale e licenza controllate. Nessun acquisto, prova gratuita o abbonamento.
2. Registrare fonte, autore quando applicabile, termini d'uso/licenza, data ed evidenza individuale della provenienza in `FONTI/registro-diritti-immagini.json`. Una dichiarazione generale sulla storia del progetto non è sufficiente per nuove immagini.
3. Usare immagini diverse per ogni nuova guida, realistiche, pertinenti, senza marchi indebiti o sottintesi offensivi. Indicare chiaramente che sono illustrative.
4. Il controllo GitHub `scripts/audit-diritti-immagini.cjs` impedisce di aggiungere immagini esterne non registrate, modificare file locali senza aggiornare il registro oppure aggiungere nuove immagini locali senza evidenza specifica di provenienza.
5. **Un esito verde non è una certificazione legale universale**: verifica inventario, impronte, corrispondenza dei collegamenti e requisiti per nuovi file. La provenienza ChatGPT dei 41 file storici è attestata dall'autore, non verificata una per una con le sessioni originali.

### Comandi di verifica
```bash
node scripts/audit-diritti-immagini.cjs
```
Il test eseguito automaticamente è `.github/workflows/audit-diritti-immagini.yml`.

**Obiettivo gestionale:** zero spese per immagini, nessuna attribuzione inventata, nessun cambiamento distruttivo degli asset approvati.
