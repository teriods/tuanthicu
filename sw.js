/* Service worker: lưu toàn bộ ứng dụng vào bộ nhớ đệm để mở được khi mất mạng. */
const CACHE = 'ltA26-v5';
const ASSETS = [
  './', 'index.html', 'css/style.css', 'manifest.webmanifest',
  'js/core.js', 'js/data/math.js', 'js/data/physics.js', 'js/data/chemistry.js', 'js/data/classic.js', 'js/data/guide.js', 'js/exam.js', 'js/store.js', 'js/app.js',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png',
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
/* Mạng trước, lỗi mạng thì dùng bản đệm: luôn lấy bản mới khi có mạng, vẫn chạy khi mất mạng. */
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match('index.html')))
  );
});
