var cacheName = 'weather1';
var filesToCache = [
  '',
  'work/index.html',
  'work/scripts/app.js',
  'work/styles/inline.css',
  'work/images/clear.png',
  'work/images/cloudy-scattered-showers.png',
  'work/images/cloudy.png',
  'work/images/fog.png',
  'work/images/ic_add_white_24px.svg',
  'work/images/ic_refresh_white_24px.svg',
  'work/images/partly-cloudy.png',
  'work/images/rain.png',
  'work/images/scattered-showers.png',
  'work/images/sleet.png',
  'work/images/snow.png',
  'work/images/thunderstorm.png',
  'work/images/wind.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
  });
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

