// service-worker.js

const CACHE_NAME = 'beer-ManagementRefactor-v1';

// Liste des ressources à mettre en cache
const resourcesToCache = [
  '/',
  '/index.html',
  '/add-beer.html',
  '/assets/img/beer.jpeg',
  '/assets/js/fetch.js',
  '/assets/img/favicon.ico'
  // Ajoutez ici toutes les ressources que vous souhaitez mettre en cache
];

// Gestion de l'installation
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(resourcesToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si la ressource est présente dans le cache, on la renvoie
        if (response) {
          return response;
        }

        // Sinon, on effectue la requête réseau et on met en cache la réponse
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(cacheName)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
  );
});
