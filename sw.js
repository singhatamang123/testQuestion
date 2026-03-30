self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("mcq-cache").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/manifest.json",
        "/css/styles.css",
        "/js/script.js",
        "/js/pdf-export.js"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
