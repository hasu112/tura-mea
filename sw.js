// Service worker: face aplicația să meargă și fără internet.
// Când schimbi ceva în aplicație, mărește numărul versiunii de mai jos.
const CACHE = 'tura-mea-v26';
const FONTURI = 'tura-mea-fonturi';
const FISIERE = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FISIERE)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE && x !== FONTURI).map(x => caches.delete(x)))));
  self.clients.claim();
});

// Întâi încearcă internetul, ocolind memoria browserului (ca să ai imediat ultima versiune), iar fără semnal folosește copia salvată.
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Fonturile de la Google se păstrează pe telefon, ca aplicația să arate la fel și fără internet.
  if (e.request.method === 'GET' && /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.open(FONTURI).then(c => c.match(e.request).then(r => r || fetch(e.request).then(x => { c.put(e.request, x.clone()); return x; }))));
    return;
  }
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request.url, { cache: 'no-cache' })
      .then(r => { const copie = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copie)); return r; })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
