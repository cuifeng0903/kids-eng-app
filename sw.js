// Simple service worker for GitHub Pages (relative paths and tolerant caching)
const CACHE = 'kids-en-v1';
const ASSETS = [
  './', './index.html', './styles.css', './app.js',
  './manifest.webmanifest', './icon-192.png', './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.all(ASSETS.map(u => cache.add(u).catch(()=>{}))); // 404でも失敗しない
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then(res => res || fetch(event.request)));
});
