const CACHE_NAME = "watw-cache-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./cities.js",
  "./map.js",
  "./costumes.js",
  "./manifest.json",
  "./icon.svg",
  "./apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// ネット優先: オンラインなら常に最新を取得し、オフライン時のみキャッシュを使う
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
