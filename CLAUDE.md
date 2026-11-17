# Regole di lavoro su SiMa Player

Queste regole le ha stabilite Mattia, il proprietario dell'app. Valgono per ogni sessione che lavora su questo repository e vengono prima di qualsiasi altra scelta.

## 1. La chiave Gemini di Mattia non si usa mai

- Nessun test, prova o verifica deve mandare richieste a Google con la chiave di Mattia.
- Vale anche per pagine di prova da aprire sul suo telefono, per "una sola richiesta" e per i controlli di un errore.
- Le richieste a Gemini le fa partire solo Mattia, ascoltando dal suo telefono.
- Nei test automatici la chiave è sempre finta e ogni chiamata a Google viene intercettata: se una chiamata prova a uscire verso Google, il test deve fallire senza inviarla.
- Se una cosa si può verificare solo con una richiesta vera a Google, non si fa: si scrive a Mattia che non è verificata.

## 2. Prima di proporre: cosa costa a Mattia

Ogni proposta comincia dicendo cosa consuma di suo:
- richieste Google (Gemini), anche indirette o in caso di errori e nuovi tentativi
- crediti del suo abbonamento a Claude
- dati e spazio sul suo telefono

Una proposta che non lo dice è incompleta.

## 3. Prima di modificare: cosa può rompersi

Per ogni modifica, prima di farla, si elencano a Mattia le altre funzioni del player che usano lo stesso codice e che quindi potrebbero rompersi (per esempio lettura EPUB, ripresa dal punto giusto, audio già scaricato, passaggi bloccati, statistiche).

## 4. Prima di pubblicare: verifica fatta da Claude

- Si prova il player nell'ambiente di lavoro, con Google finto, prima e dopo la modifica.
- Si controllano anche le funzioni a rischio elencate al punto 3, non solo la funzione modificata.
- A Mattia si dice cosa è stato verificato e cosa no. Ciò che non è stato provato (per esempio il comportamento reale di Gemini o sul suo iPhone) si scrive come "non verificato", mai come funzionante.
- Mattia non legge i diff di GitHub: controllare cosa cambia davvero è compito di Claude.

## 5. Permesso

- Niente modifiche al codice senza il sì di Mattia.
- Eccezione: le modifiche minime (un colore, un'ombra, un testo) si pubblicano subito.

## Requisiti fissi dell'app

- L'audio già generato o scaricato resta sempre disponibile sul telefono: si deve poter tornare in qualsiasi punto del libro, anche all'inizio, senza nuove richieste.
- L'app non salta mai da sola un passaggio: se Google blocca un pezzo si ferma lì e la scelta di andare avanti è di Mattia.
- Niente zoom con il doppio tocco; la pagina sotto resta ferma quando si aprono finestre o pop-over.
