// Version of the offline cache (change this value every time you want to update the cache)
var CACHE_NAME = 'version_04'

// Add a path you want to cache in this list.
var URLS = [
  // Original files
  '/',
  '/index.html',
  '/about.html',
  '/index.css',
  '/celeste.html',
  '/celeste.js',
  '/dusk.html',
  '/dusk.js',
  '/hug.html',
  '/hug.js',
  '/lair.html',
  '/lair.js',
  '/mistigri.html',
  '/mistigri.js',
  '/pool.html',
  '/pool.js',
  '/racer.html',
  '/racer.js',
  '/shooter.html',
  '/shooter.js',
  '/tempest.html',
  '/tempest.js',
  '/tower.html',
  '/tower.js',

  // Files in /drive-mad-main 2
  '/drive-mad-main 2/Jump_Gamemonetize.js',
  '/drive-mad-main 2/index.html',

  // Files in /drive-mad-main 2/webapp
  '/drive-mad-main 2/webapp/baloo2.woff',
  '/drive-mad-main 2/webapp/cover.jpg',
  '/drive-mad-main 2/webapp/e.html',
  '/drive-mad-main 2/webapp/fancade.css',
  '/drive-mad-main 2/webapp/index.data',
  '/drive-mad-main 2/webapp/index.js',
  '/drive-mad-main 2/webapp/index.wasm',
  '/drive-mad-main 2/webapp/source_min.js'
]

console.log(navigator)
console.log(navigator.geolocation)

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) {
        // If cache is available, respond with cache
        console.log('responding with cache : ' + e.request.url)
        return request
      } else {
        // If there are no cache, try fetching request
        console.log('file is not cached, fetching : ' + e.request.url)
        return fetch(e.request)
      }
    })
  )
})

// Cache resources
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME)
      // Cache everything listed in URLS list
      return cache.addAll(URLS)
    })
  )
})

// Delete outdated caches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contains all cache names under appname.glitch.me domain
      return Promise.all(keyList.map(function (key, i) {
        if (keyList[i] !== CACHE_NAME) {
          console.log('deleting cache : ' + keyList[i])
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})
