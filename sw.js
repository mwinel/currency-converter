// Install service worker
self.addEventListener('install', function(event) {
  console.log('Service Worker installing.');
});

// Activate service worker
self.addEventListener('activate', function(event) {
  console.log('Service Worker activating.');
});