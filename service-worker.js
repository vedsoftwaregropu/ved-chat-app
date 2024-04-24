const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/chat.html',
  '/index.html',
  'chat.html',
  'index.html',
  'home.html',
  '/chat.html',
  '/index.html',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('push', (event) => {
  const data = event.data.json();

  const options = {
    body: data.body,
    icon: 'image.png',
    badge: 'image.png',
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
});

self.addEventListener('notificationclose', (event) => {
  // to be implemented
});
