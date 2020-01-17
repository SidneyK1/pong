var cacheName = 'pong-v1';
var filesToCache = [
    '/',
    '/index.html',
    './assets/background2.jpg',
    './assets/button_hauptmenu.png',
    './assets/button_neues-spiel.png',
    './assets/finger2.png',
    './assets/roger2.png',
    './assets/tennisball.png',
    './assets/button_einfach.png',
    './assets/button_items-aus.png',
    './assets/button_normal.png',
    './assets/paddle.png',
    './assets/roger3.png',
    './assets/button_einzelspieler.png',	'./assets/button_items-ein.png',
    './assets/button_steuerung.png',
    './assets/phone.png',
    './assets/specialItem.png',
    './assets/button_hardcore.png',
    './assets/button_mehrspieler.png',
    './assets/button_zuruck.png',
    './assets/play-button.png',
    './assets/start-button.png',
    './index.js',
    'https://cdnjs.cloudflare.com/ajax/libs/phaser-ce/2.13.2/phaser.min.js'
];

self.addEventListener('install', function(event) {
  console.log('sw install');
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('sw caching files');
      return cache.addAll(filesToCache);
    }).catch(function(err) {
      console.log(err);
    })
  );
});

self.addEventListener('fetch', (event) => {
    console.log('sw fetch');
    console.log(event.request.url);
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      }).catch(function (error) {
        console.log(error);
      })
    );
  });

self.addEventListener('activate', function(event) {
    console.log('sw activate');
    event.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== cacheName) {
            console.log('sw removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
});