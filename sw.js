const CACHE_NAME = 'currency-converter-v1';
const urlsToCache = [
  '/',
  '/css/style.css',
  '/js/main.js'
];

// Install service worker
self.addEventListener('install', (event) => {
  debugger;
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      console.log('Opened cache');
	  return cache.addAll(urlsToCache);
    })
  );
});

// Activate service worker
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});