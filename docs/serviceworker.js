'use strict';

let cn = '1.01';
let cacheWhiteList = ['1.01'];
let assetsList = [
    '/project-numero/index.html',
    '/project-numero/index.js',
    '/project-numero/assets/fonts/iconfont/material-icons.css',
    '/project-numero/assets/fonts/iconfont/MaterialIcons-Regular.eot',
    '/project-numero/assets/fonts/iconfont/MaterialIcons-Regular.ijmap',
    '/project-numero/assets/fonts/iconfont/MaterialIcons-Regular.svg',
    '/project-numero/assets/fonts/iconfont/MaterialIcons-Regular.ttf',
    '/project-numero/assets/fonts/iconfont/MaterialIcons-Regular.woff',
    '/project-numero/assets/fonts/iconfont/MaterialIcons-Regular.woff2',
    '/project-numero/assets/images/icon/128.png',
    '/project-numero/assets/images/icon/144.png',
    '/project-numero/assets/images/icon/152.png',
    '/project-numero/assets/images/icon/192.png',
    '/project-numero/assets/images/icon/384.png',
    '/project-numero/assets/images/icon/512.png',
    '/project-numero/assets/images/icon/72.png',
    '/project-numero/assets/images/icon/96.png',
    '/project-numero/assets/js/jquery.min.js',
    '/project-numero/assets/js/lodash.min.js',
    '/project-numero/assets/materialize/css/materialize.min.css',
    '/project-numero/assets/materialize/js/materialize.min.js'
];

// Install Event
self.addEventListener('install', event=>{
    // Open the cache
    event.waitUntil(caches.open(cn)
        .then(cache=>{
            // Fetch all the assets from the array
            return cache.addAll(assetsList);
        }).then(()=>{
            console.log("done caching");
        })
    );
});


self.addEventListener('fetch', event=>{
    event.respondWith(
        caches.match(event.request)
            .then(response=>{
                //Fallback to network
                return response || fetch(event.request);
            })
            .catch(r=>{
                let method = event.request.method;
                let urlContainsApi = event.request.url.indexOf("api");

                if(method !== 'POST'){
                    return caches.match('index.html');
                }

            })
    );
});

// Remove Old Caches
self.addEventListener('activate', (event)=>{
    event.waitUntil(
        caches.keys().then((keyList)=>{
            return Promise.all(keyList.map((key)=>{
                if(cacheWhiteList.indexOf(key) === -1){
                    return caches.delete(key);
                }
            }));
        })
    );
});