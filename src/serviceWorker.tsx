// This is a service worker file.

// 'self' is of type 'ServiceWorker' and it's the global scope in a service worker.
declare const self: ServiceWorker;

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open('map-tiles').then((cache: Cache) => {
      return cache.addAll([
        '/tiles/0/0/0.png',
        '/tiles/0/0/1.png',
        // Add all the tiles you want to cache here
      ]);
    })
  );
});

self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request).then((response: Response | undefined) => {
      return response || fetch(event.request);
    })
  );
});

export {};