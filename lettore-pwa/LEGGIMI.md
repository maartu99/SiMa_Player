# Lettore - web app installabile

App per ascoltare PDF ed EPUB in italiano con voci naturali Piper (Paola e Riccardo), che girano direttamente sul telefono, gratis e anche offline dopo il primo download. Restano disponibili anche le voci dell'iPhone.

## File del progetto

- **index.html** - l'app
- **tts-worker.js** - il motore vocale Piper (gira in background)
- **sw.js** - rende l'app installabile e utilizzabile offline
- **manifest.webmanifest** - nome e icona dell'app
- **icon-192.png, icon-512.png, apple-touch-icon.png** - icone

## Pubblicazione su GitHub Pages (anche da iPhone)

1. Apri lo zip in File: si estrae in una cartella con i file sopra.
2. Vai su github.com in Safari e crea un account gratuito (o accedi).
3. Tocca **+** in alto, poi **New repository**. Nome: `lettore`, visibilità **Public**, poi **Create repository**.
4. Tocca **uploading an existing file**, seleziona tutti i file della cartella e tocca **Commit changes**.
5. Vai in **Settings > Pages**. In **Source** scegli **Deploy from a branch**, branch **main**, cartella **/ (root)**, poi **Save**.
6. Dopo un paio di minuti l'app è online su `https://TUONOMEUTENTE.github.io/lettore/`.

## Installazione sull'iPhone

1. Apri il link in **Safari**.
2. Tocca **Condividi > Aggiungi alla schermata Home**.
3. Apri l'app dall'icona, scegli la voce **Paola** e tocca **Prova**: la voce viene scaricata una sola volta (circa 60 MB, meglio con Wi-Fi). Riccardo pesa meno (circa 20 MB) ma suona meno naturale.

## Note

- I libri non vengono caricati da nessuna parte: restano sul telefono.
- Il repository è pubblico: chi ha il link vede l'app, non i tuoi file.
- Con le voci Piper la velocità cambia al volo senza interrompere, e la pausa riprende a metà frase.
- La generazione della voce avviene sul telefono: la prima frase può richiedere qualche secondo, poi l'app prepara in anticipo le frasi successive.
- A schermo bloccato la lettura può proseguire, ma dipende da come iOS gestisce le web app: se si ferma, tienila in primo piano.
- PDF scansionati e libri Kindle non sono supportati.

## Aggiornamenti

Per aggiornare l'app basta ricaricare su GitHub i file modificati. Sul telefono la nuova versione compare dalla seconda apertura.
