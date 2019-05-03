importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
const cacheVersion = 'v3'
workbox.core.setCacheNameDetails({ prefix: `flyin-pwa-${cacheVersion}` })
// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.core.skipWaiting();
workbox.core.clientsClaim();
var homeBuildNumber = '172';
var  webpackPatternPrefix = '^https:\\/\\/static.flyinstatic.com\\/common\\/themes\\/';
self.addEventListener('install', event => {
  const urls = ['/hotels']
  event.waitUntil(
    caches
      .open(workbox.core.cacheNames.runtime)
      .then(cache => cache.addAll(urls))
  )
})
workbox.routing.registerRoute('/hotels', workbox.strategies.staleWhileRevalidate(), "GET");
workbox.routing.registerRoute(
  /.*app.*/,
  workbox.strategies.cacheFirst({
    cacheName: `static-assets-${cacheVersion}`,
    cacheExpiration: {
      maxEntries: 20
    }
  }),
  "GET"
);
console.log(`${webpackPatternPrefix}`)
workbox.routing.registerRoute(
  RegExp('https://static.flyinstatic.com/common.*/themes/.*\.js'),
  //'https://static.flyinstatic.com/common/themes/globalFunction.v26484.js',
  workbox.strategies.cacheFirst({
    cacheName: `static-assets-${cacheVersion}`,
    cacheExpiration: {
      maxEntries: 20
    }
  }),
  "GET"
);


  
self.addEventListener('push', (event) => {
  const title = 'Get Started With Workbox';
  const options = {
    body: event.data.text()
  };
  event.waitUntil(self.registration.showNotification(title, options));
});


workbox.precaching.precacheAndRoute([]);
