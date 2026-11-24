// Service worker pentru versiunea de probă (folderul nou/). Ține minte paginile și bibliotecile Firebase,
// ca aplicația să pornească și fără internet după prima intrare în cont.
const CACHE = 'tura-mea-nou-v15';
const EXT = 'tura-mea-nou-ext';
const FISIERE = ['./', './index.html', './manifest.webmanifest'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FISIERE)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x.startsWith('tura-mea-nou') && x !== CACHE && x !== EXT).map(x => caches.delete(x)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // Fonturile și bibliotecile Firebase au versiunea în adresă: le păstrăm pe telefon.
  if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname) || (url.hostname === 'www.gstatic.com' && url.pathname.startsWith('/firebasejs/'))) {
    e.respondWith(caches.open(EXT).then(c => c.match(e.request).then(r => r || fetch(e.request).then(x => { if (x.ok) c.put(e.request, x.clone()); return x; }))));
    return;
  }
  if (url.origin !== location.origin) return;
  // Pornire rapidă: dăm imediat varianta ținută pe telefon și o aducem pe cea nouă în fundal
  // (o modificare a aplicației se vede de la următoarea deschidere). Fără copie, așteptăm internetul.
  const proaspat = fetch(e.request.url, { cache: 'no-cache' })
    .then(r => { if (r.ok) { const copie = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copie)); } return r; });
  e.respondWith(
    caches.match(e.request).then(r => {
      if (r) { e.waitUntil(proaspat.catch(() => {})); return r; }
      return proaspat.catch(() => caches.match('./index.html'));
    })
  );
});
