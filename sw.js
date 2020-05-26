const cacheName = 'EaseStudy-v0.3';

// const staticAssets = [
//   './',
//   './includes/app.js',
//   './includes/styles.css',
//   './includes/fallback.json',
//   './includes/images/fetch-dog.jpg'
// ];

const staticAssets = [
  // './',
  './includes/app.js',
  './includes/styles.css',
  './includes/fallback.json',
  './static/assets/vendor/bootstrap/css/bootstrap.min.css',
  './static/assets/vendor/font-awesome/css/font-awesome.min.css',
  './static/assets/vendor/linearicons/style.css',
  './static/assets/vendor/metisMenu/metisMenu.css',
  './static/assets/vendor/toastr/toastr.min.css',
  './static/assets/css/main.css',

  'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700',

  'static/assets/vendor/jquery/jquery.min.js',
  'static/assets/vendor/bootstrap/js/bootstrap.min.js',
  'static/assets/vendor/metisMenu/metisMenu.js',
  'static/assets/vendor/jquery-slimscroll/jquery.slimscroll.min.js',
  'static/assets/vendor/toastr/toastr.js',
  'static/assets/scripts/common.js'
];

self.addEventListener('install', async function () {
  const cache = await caches.open(cacheName);
  cache.addAll(staticAssets);
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  return cachedResponse || fetch(request);
}

async function networkFirst(request) {
  const dynamicCache = await caches.open('EaseStudy-v0.3');
  try {
    const networkResponse = await fetch(request);
    dynamicCache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (err) {
    const cachedResponse = await dynamicCache.match(request);
    return cachedResponse || await caches.match('./fallback.json');
  }
}
