# Per Me — cinque miglioramenti del 20 novembre 2026

Intervento richiesto dall’utente dopo il collaudo Samsung del calcolatore. Pubblicazione tramite [PR 27](https://github.com/cpcpcp106-coder/Per-Me/pull/27), commit `5adc8e9c3913df2bdd9c6d96acc582874a338739`. Ambito: i cinque miglioramenti approvati, senza dichiarare chiusa tutta la Fase 4 del progetto.

| Punto | Risultato implementato | Evidenza |
| --- | --- | --- |
| Lettura | A−, A+, Normale, Ascolta, Pausa/Riprendi e Interrompi nelle guide e nel lettore dell’app. Dimensione ricordata solo sul dispositivo, fino al 200%. Messaggi espliciti quando la voce non è disponibile. | Prove di reflow 320/390 px, persistenza e ripristino; logica vocale con API simulate; riapertura offline della PWA. |
| PDF della spesa | Il pulsante ricalcola i dati correnti e stampa solo ingredienti, quantità, prezzi, confezioni, fonte e totali. Le righe incomplete rimangono dichiarate parziali. | PDF effettivamente generati da Chromium: esempio con un ingrediente in una pagina, paniere completo di 22 ingredienti in due pagine. |
| Homepage | Ingresso per problema e ricerca subito dopo la presentazione. Invito alle prove spostato verso il fondo; rubriche e percorsi conservati. | Ordine del DOM e collegamento principale verificati a 320/390 px; ricerca «paniere» trova l’esempio. |
| Settimana e spesa per due | Ampliata la guida esistente sulle ricette: sette giorni, colazioni e spuntini, 22 ingredienti, formati, costi, residui e fonti per prodotto. Trasferimento al calcolatore con prezzi, quantità, unità, confezioni, data e fonte. | Conteggio indipendente di tutti gli ingredienti, concordanza menu/lista, importazione di grammi, millilitri e pezzi, stesso totale nel calcolatore; menu e lista leggibili offline nel lettore. |
| Riscontri | Tre categorie accanto alle stelle: chiarezza, collegamento, aggiornamento. Messaggio facoltativo pronto da copiare e pannello per leggere i conteggi. | Test dell’invio simulato, assenza di incremento delle stelle, prevenzione del doppio invio immediato, lettura senza incremento e indisponibilità distinta da zero. Nessuna segnalazione fittizia inviata ai contatori pubblici per il collaudo. |

## Dati del paniere

[Guida e settimana documentata](https://cpcpcp106-coder.github.io/Per-Me/dieta-guida-08-ricette-mediterranee-economiche-valori.html#spesa-settimana-documentata).
[Dati originali della rilevazione](../FONTI/paniere-mediterraneo-2026-11-20.json).
[Calcolatore](https://cpcpcp106-coder.github.io/Per-Me/strumenti/costo-spesa-settimanale.html).

Prezzi letti sulle schede pubbliche Cicalia nel browser il 20 novembre 2026, con formato e comando «AGGIUNGI AL CARRELLO» presenti per ciascuno dei 22 prodotti selezionati. Esclusi i prodotti osservati come non disponibili. Non è stato effettuato alcun ordine e non sono stati inseriti dati personali o indirizzi di consegna.

Il costo proporzionale delle quantità elencate è **115,19 €**; l’esborso teorico per tutte le confezioni intere, partendo senza scorte, è **149,06 €**. Rimanenza nominale per un valore proporzionale di **33,87 €**. Sono esclusi acqua, energia, spedizione e acquisti aggiuntivi; per i freschi il peso indicato dal venditore è approssimativo. Per la passata si usa l’offerta osservata di 1,59 € fino a tre bottiglie: il paniere ne richiede due; scadenza dell’offerta non accertata.

Il menu è un esempio contabile e organizzativo, non un piano alimentare clinico validato. Fabbisogni, calorie e nutrienti dell’intera settimana non sono stati validati da un professionista indipendente. Origine italiana dell’olio dichiarata dal venditore, etichetta fisica e lotto non controllati. Disponibilità al CAP e preventivo di consegna non accertati. Non è dimostrato il minor prezzo rispetto ad altri negozi.

L’immagine `assets/dieta-menu-spesa-originale.webp`, già documentata come originale generata per il progetto il 14 novembre, è riutilizzata nella guida con descrizione coerente; uso aggiunto al registro immagini. Non vengono copiate foto commerciali dei prodotti.

## Collaudo prima della pubblicazione

Sul commit `5e2d88ebb422c12e4a84e1d36a744718bee10e86` tutti i **20 workflow** della PR risultano conclusi con successo. [Collaudo completo](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44744582352):

- **52** verifiche degli strumenti, zero fallite.
- **77** nuove verifiche per i cinque miglioramenti, zero fallite.
- **173** verifiche del percorso lieviti/foto/app offline, superate.

Superati anche audit editoriale, diritti/registro immagini, struttura e indicizzabilità tecnica e sincronizzazione dell’app. Il pannello `monitoraggio/riscontri.html` è classificato come pagina tecnica, con `noindex,nofollow`, fuori dalla sitemap. Questo non modifica il numero delle guide pubbliche.

Questi controlli non certificano una conformità assistiva completa, una revisione scientifica indipendente o l’indicizzazione in Google. L’audio reale sul Samsung e TalkBack non sono stati provati. L’utente aveva concluso le prove manuali: non sono state richieste altre operazioni sul telefono.

## Verifica dopo la pubblicazione

Pubblicazione completata da [GitHub Pages](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44745249643). Dopo il merge è stata precisata la didascalia della fotografia nel commit `4880b85f50f83d2f1f6e47a26b1b9429f66c907a`; il [controllo delle ricette](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44745150582) e il [collaudo completo sul main](https://github.com/cpcpcp106-coder/Per-Me/actions/runs/44745150512) sono conclusi con successo.

Controlli eseguiti nel browser sul sito pubblico:

- Homepage aggiornata, ricerca visibile; cercando «paniere» compare il collegamento diretto alla nuova sezione della guida esistente.
- Guida: sette giorni e 22 prodotti presenti; totali 115,19 € e 149,06 €, residui ed esclusione della spedizione leggibili.
- Comando A+ porta il testo al 125%; Normale lo ripristina. Foto originale caricata; tre categorie di riscontro presenti e collegamento Facebook corretto.
- Trasferimento al calcolatore: tutte le 22 righe importate. Il calcolo pubblico restituisce 115,19 € utilizzati e 149,06 € per le confezioni, copertura 22 su 22. Pulsante «Stampa il riepilogo» presente. Il PDF è verificato in Chromium nei test, non come nuovo file salvato sul Samsung.
- [Pannello dei riscontri](https://cpcpcp106-coder.github.io/Per-Me/monitoraggio/riscontri.html): selezionata la guida locazioni, letti tre conteggi pari a zero con conferma «Nessuna segnalazione aggiunta». Non sono stati inviati conteggi o messaggi fittizi.

I cinque punti richiesti sono implementati, collaudati e pubblicati. Rimangono gli altri compiti della Fase 4 documentati nel registro generale, separati da questo incarico.
