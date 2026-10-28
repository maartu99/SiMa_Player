// Service worker: rende l'app installabile e utilizzabile offline.
// File dell'app: sempre la versione più nuova se c'è connessione, la copia salvata se sei offline.
// Librerie e voci: salvate dopo il primo download.
const VERSION = 74;
const CORE = 'lettore-core-v' + VERSION;
const RUNTIME = 'lettore-runtime-v1';
const CORE_FILES = ['./', './index.html', './tts-worker.js', './kokoro-worker.js', './supertonic-worker.js', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  // cache: 'reload' scavalca la copia temporanea del telefono e prende i file appena pubblicati
  e.waitUntil(caches.open(CORE)
    .then(c => Promise.all(CORE_FILES.map(f => fetch(f, { cache: 'reload' }).then(r => r.ok ? c.put(f, r) : null).catch(() => null))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CORE && k !== RUNTIME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;
  const url = new URL(req.url);

  if(url.origin === self.location.origin){
    // prima la rete (controllando che sia la versione più nuova), poi la copia salvata
    e.respondWith((async () => {
      const cache = await caches.open(CORE);
      try{
        const res = await fetch(req, { cache: 'no-cache' });
        if(res.ok) cache.put(req, res.clone());
        return res;
      }catch(err){
        const cached = await cache.match(req, { ignoreSearch: true }) || (req.mode === 'navigate' ? await cache.match('./index.html') : null);
        if(cached) return cached;
        throw err;
      }
    })());
    return;
  }

  // librerie (cdnjs, jsdelivr, font): prima la copia salvata
  if(/cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com/.test(url.hostname)){
    e.respondWith(caches.open(RUNTIME).then(async cache => {
      const cached = await cache.match(req.url);
      if(cached) return cached;
      const res = await fetch(req.url, { mode: 'cors', credentials: 'omit' });
      if(res.ok) cache.put(req.url, res.clone());
      return res;
    }));
  }
});
