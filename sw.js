// sw.js

const STATIC_CACHE_NAME = 'gujarat-darshan-static-v2';
const DYNAMIC_CACHE_NAME = 'gujarat-darshan-dynamic-v2';

// Files that make up the "app shell" - note that constants.ts is removed from this list.
const STATIC_FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/index.tsx',
  '/metadata.json',
  '/types.ts',
  '/translations.ts',
  // App Images
  '/images/somnath.jpg',
  '/images/dwarkadhish.jpg',
  '/images/ambaji.jpg',
  '/images/akshardham.jpg',
];

// Install the service worker and cache the static app shell
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Caching static app shell');
      return cache.addAll(STATIC_FILES_TO_CACHE);
    })
  );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  const cacheWhitelist = [STATIC_CACHE_NAME, DYNAMIC_CACHE_NAME];
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (!cacheWhitelist.includes(key)) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Intercept fetch requests and apply caching strategies
self.addEventListener('fetch', (event) => {
  const dataUrl = '/constants.ts';
  
  // Strategy for dynamic data (temple statuses)
  if (event.request.url.includes(dataUrl)) {
    event.respondWith(
      // Network First, falling back to Cache
      fetch(event.request)
        .then((networkResponse) => {
          // If we get a valid response, cache it and return it
          return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
            console.log(`[ServiceWorker] Caching new data: ${event.request.url}`);
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // If the network request fails, try to get it from the cache
          console.log(`[ServiceWorker] Network failed, serving from cache: ${event.request.url}`);
          return caches.match(event.request);
        })
    );
  } else {
    // Strategy for static assets (app shell)
    event.respondWith(
      // Cache First, falling back to Network
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request).then((networkResponse) => {
          // We don't want to cache third-party scripts or opaque responses
          if (event.request.url.startsWith('https://aistudiocdn.com') || networkResponse.type === 'opaque') {
            return networkResponse;
          }
          // For our own assets not pre-cached, add them to the static cache
          return caches.open(STATIC_CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  }
});