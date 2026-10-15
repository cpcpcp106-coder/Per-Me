# Per Me — Revisione didattica indipendente di «Tutor AI essenziale»

**Data:** 15 ottobre 2026  
**Pagina:** [tutor-ai.html](../tutor-ai.html)  
**Ambito:** alfabetizzazione all'intelligenza artificiale per adulti principianti, lettura da telefono e PWA offline.

## Principio editoriale

Il rigore di livello universitario riguarda **progettazione didattica, verifica e chiarezza epistemica**; non l'uso di un linguaggio complesso, di formule o di tecnicismi. Questa è una guida introduttiva gratuita per persone di tutta Italia, non un corso universitario, una certificazione o una consulenza professionale.

## Diagnosi iniziale — criticità riscontrate

1. **Obiettivi impliciti:** mancavano descrizioni verificabili di ciò che il lettore sarebbe stato in grado di fare.
2. **Contraddizione editoriale:** l'introduzione prometteva cinque esempi, ma la pagina aveva sei prompt copiabili.
3. **Metodo incompleto:** la pagina insegnava soprattutto a *copiare*, non a **formulare una richiesta**.
4. **Esercizi senza pieno feedback attivo:** mancavano casi in cui riconoscere autonomamente un errore prima della soluzione.
5. **Autonomia e sicurezza:** era possibile rafforzare il criterio di verifica di fonti, le situazioni ad alto rischio e le modalità per apprendere senza usare una chat esterna.
6. **Tracciabilità:** l'audit del sito controllava struttura, SEO e funzionamento dei prompt, ma non tutte le componenti del percorso didattico.

## Revisione eseguita

- Quattro obiettivi osservabili: scrittura controllata del prompt, uso per compiti semplici, riconoscimento delle aggiunte e verifica indipendente delle fonti.
- Indicazione della durata solo come **stima orientativa** e possibilità di studiare senza account di chat AI.
- Metodo di richiesta in cinque elementi: **compito, testo, forma, limiti, controllo**.
- Mantenuti sei prompt (avviso, messaggio, lista, domande per un ufficio, verifica documentale, riscrittura); nessun invio automatico.
- Prova guidata con una risposta volutamente errata, presentata **prima** della soluzione.
- Quattro domande di autovalutazione con soluzioni espandibili da tastiera; nessun dato dell'utente è richiesto o raccolto dagli esercizi.
- Precauzioni esplicite per salute, denaro, scadenze legali, privacy e contenuti di terzi; spiegazione dell'inadeguatezza dell'autocertificazione AI.
- Spiegazione della copia dei prompt dal lettore PWA offline, chiarendo che le risposte di un servizio AI esterno richiedono normalmente una connessione.
- Fonti pedagogiche e di sicurezza documentate, senza suggerire accreditamenti istituzionali.

## Criteri di accettazione

| Aspetto | Criterio osservabile | Stato |
| --- | --- | --- |
| Coerenza | Numero dei prompt dichiarati uguale al numero dei pulsanti | Verificato nello script |
| Progressione | Prima spiegazione, poi dimostrazione, esercizio e verifica | Presente nella pagina |
| Autonomia | Metodologia per costruire una richiesta senza copiarne una | Presente |
| Affidabilità | Il lettore deve identificare un dato inventato e aprire una fonte indipendente | Esercizio e checklist presenti |
| Privacy | Esempi fittizi, segnaposto, nessuna raccolta di risposte all'autoverifica | Presente nei contenuti |
| Accessibilità | Unico titolo H1, collegamenti interni, soluzioni con HTML `details/summary` | Verificato staticamente |
| Uso da cellulare | Pulsanti con area tattile ampia e fallback di copia | Verificato staticamente |
| PWA offline | Conservazione del testo e ricreazione dei pulsanti nel lettore | Verificato dal codice e dai test automatici |
| Fonti | Collegamenti a istituzioni e avvertenza che non forniscono certificazione | Presente |

**Limite importante:** un controllo automatico del codice non sostituisce una prova empirica con principianti reali, né può certificare la copia/incolla o la resa visiva su ogni versione di Android. Prima di sostenere che il percorso è stato validato sugli utenti occorrono osservazioni con lettori reali, idealmente con tempi, comprensione ed errori registrati senza raccogliere dati personali superflui.

## Riferimenti pubblici

- [Commissione europea, Joint Research Centre — DigComp 3.0](https://joint-research-centre.ec.europa.eu/scientific-activities/key-competences-lifelong-learning/digital-competence-framework-digcomp/digcomp-30_en), competenze digitali e integrazione trasversale di quelle AI.
- [UNESCO — AI Competency Framework for Students (2024)](https://www.unesco.org/en/articles/ai-competency-framework-students), apprendimento per comprensione, applicazione e creazione, responsabilità e centralità della persona.
- [Garante Privacy — Assistenti digitali](https://www.garanteprivacy.it/temi/assistenti-digitali), buone pratiche generali sulla riservatezza; l'originaria scheda riguarda in particolare assistenti digitali e vocali.
- [OpenAI Help Center — ChatGPT dice la verità?](https://help.openai.com/it-it/articles/8313428-does-chatgpt-tell-the-truth), errori e verifica delle fonti.

**Nota sulle fonti:** la guida è originale e ne adotta principi pedagogici generali; **né UNESCO né Commissione europea hanno valutato o certificato Per Me**.
