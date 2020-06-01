const cacheName = 'EaseStudy-v1.0.6';

const staticAssets = [
  './',
  './index.html',
  './includes/app.js',
  './includes/main.js',
  './pages/home.html',
  './pages/quiz.html',
  './static/assets/img/lazyload.gif',
  './static/assets/img/loader.gif',
  './static/assets/img/about.gif',
  './static/assets/img/welcome.jpg',
  './static/assets/vendor/bootstrap/css/bootstrap.min.css',
  './static/assets/vendor/font-awesome/css/font-awesome.min.css',
  './static/assets/vendor/linearicons/style.css',
  './static/assets/vendor/metisMenu/metisMenu.css',
  './static/assets/vendor/toastr/toastr.min.css',
  './static/assets/css/main.css',
  'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700',
  './static/assets/vendor/jquery/jquery.min.js',
  './static/assets/vendor/bootstrap/js/bootstrap.min.js',
  './static/assets/vendor/metisMenu/metisMenu.js',
  './static/assets/vendor/jquery-slimscroll/jquery.slimscroll.min.js',
  './static/assets/vendor/toastr/toastr.js',
  './static/assets/scripts/common.js',
  './contents/english/2017-obj.json',
  './contents/english/2017-written.json',
  './contents/english/2018-written.json',
  './contents/english/2018-obj.json',
  './contents/maths/2017-obj.json',
  './contents/maths/2017-written.json',
  './contents/maths/2018-written.json',
  './contents/maths/2018-obj.json',
  './contents/science/2017-obj.json',
  './contents/science/2017-written.json',
  './contents/science/2018-written.json',
  './contents/science/2018-obj.json',
  './contents/social/2017-obj.json',
  './contents/social/2017-written.json',
  './contents/social/2018-written.json',
  './contents/social/2018-obj.json'
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
  const dynamicCache = await caches.open('EaseStudy-v1.0.6');
  try {
    const networkResponse = await fetch(request);
    dynamicCache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (err) {
    const cachedResponse = await dynamicCache.match(request);
    return cachedResponse || await caches.match('./fallback.json');
  }
}
