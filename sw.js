const CACHE_NAME = 'currency-converter-v1';
const urlsToCache = [
  'currency-converter/',
  'currency-converter/css/style.css',
  'currency-converter/js/main.js',
  'currency-converter/https://fonts.googleapis.com/css?family=Inconsolata:700'
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

// Update a service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
    	cacheNames.filter((cacheName) => {
    	  return cacheName.startsWith('converter-') &&
    		cacheName != CACHE_NAME;
    	  })
        .map(function(cacheName) {
    		  return cache.delete(cacheName)
    	  })
      )
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
    .then((response) => {
      return response || fetch(event.request);
    })
  );
});