# Per Me — Protocollo di prova con lettori reali e Android
**Preparato il 23 ottobre 2026. Stato: test sul campo NON ancora eseguiti.**

Questo protocollo integra i test automatici già superati. Non attribuisce a Per Me punteggi di usabilità o giudizi di lettori che non sono stati raccolti.

## Perché serve
Il pubblico di riferimento comprende persone tra 50 e 70 anni e familiari. Un collaudo Chromium emulato verifica elementi tecnici, ma non dimostra che si riesca davvero a leggere, a trovare una guida, a usare i pulsanti con le dita, a copiare prompt o a comprendere valori nutrizionali.

## Sessioni proposte
- Almeno **3 persone reali** nelle fasce d'età di riferimento, preferibilmente con diversa familiarità digitale; i partecipanti possono usare un proprio telefono Android se lo desiderano.
- Chiedere consenso alla prova prima di iniziare. **Non** annotare nomi, account personali, indirizzi, numeri di telefono, dati sanitari o codici di accesso. Se si registrano osservazioni, usare soltanto un codice anonimo per sessione.
- Non accedere al FSE del partecipante e non chiedere credenziali SPID/CIE né screenshot di referti. La prova termina alla visualizzazione del collegamento pubblico al portale ufficiale.
- Per i test del Tutor AI usare soltanto **esempi inventati** e testi dimostrativi, non messaggi veri o dati personali.

## Cinque prove semplici, senza aiuti iniziali
1. **Trovare la dieta:** dalla home raggiungere Dieta mediterranea → Guida 08 → ricetta della zuppa, senza usare la ricerca del browser.
2. **Capire una ricetta:** individuare **40,0 g di carboidrati disponibili e circa 298 kcal PER porzione**. Chiedere di spiegare con parole proprie la differenza tra valori per porzione e valori dell'intera pentola.
3. **Usare l'app:** entrare nella PWA, trovare una guida e leggere il testo salvato senza connessione, **solo se il testo è stato effettivamente sincronizzato**. Non testare download delle immagini offline, perché il requisito dell'app è testo offline.
4. **Tutor AI:** aprire la guida introduttiva, copiare un prompt di esempio e distinguere una risposta AI non verificata da una fonte ufficiale.
5. **Salute e privacy:** dalla rubrica Salute e autonomia aprire la guida al FSE e individuare come si entra tramite i portali ufficiali, senza digitare alcuna credenziale durante il test.

## Scheda di osservazione anonima
Per ciascuna attività segnare `riuscita senza aiuto`, `riuscita con aiuto`, `non riuscita`, `non svolta`. Annotare la frase del partecipante se autorizzato, il punto di blocco e il numero di tocchi errati soltanto se utile. Misurare leggibilità, contrasto, lunghezza dei pulsanti, chiarezza dei nomi e facilità di tornare alla home.

## Prima di dichiarare un risultato
- Distinguere il numero di partecipanti che hanno tentato ciascun compito da quelli che l'hanno completato.
- Se si verifica un problema, riprodurlo su Android fisico e risolverlo su GitHub; poi ripetere la stessa attività.
- Evitare dichiarazioni tipo «testato con anziani» fino a quando le sessioni non siano realmente state svolte e registrate.
- La partecipazione deve essere volontaria; non pubblicare foto, schermate, voci o giudizi riconducibili alle persone senza consenso espresso.

## Limite operativo
Da questa sessione possiamo verificare codice e automazioni. Non possiamo attribuire a utenti umani non presenti un esito di prove fisiche. Questo documento è soltanto un protocollo operativo pronto.
