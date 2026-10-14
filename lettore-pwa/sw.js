// Service worker: rende l'app installabile e utilizzabile offline.
// File dell'app: aggiornati in background. Librerie e voci: salvate dopo il primo download.
const CORE = 'lettore-core-v6';
const RUNTIME = 'lettore-runtime-v1';
const CORE_FILES = ['./', './index.html', './tts-worker.js', './kokoro-worker.js', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CORE).then(c => c.addAll(CORE_FILES)).then(() => self.skipWaiting()));
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
    // stale-while-revalidate per i file dell'app
    e.respondWith(caches.open(CORE).then(async cache => {
      const cached = await cache.match(req, { ignoreSearch: true });
      const network = fetch(req).then(res => { if(res.ok) cache.put(req, res.clone()); return res; }).catch(() => cached);
      return cached || network;
    }));
    return;
  }

  // librerie (cdnjs, jsdelivr): cache-first. Le voci si salvano da sole, non serve duplicarle
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
