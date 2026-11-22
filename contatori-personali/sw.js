const CACHE='perme-contatori-shell-v7-20261122-pinterest';
const SHELL=['./','./index.html','./manifest.webmanifest','../app/icon-192.png'];
self.addEventListener('install',e=>{
 e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
 e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('perme-contatori-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);
 if(e.request.mode==='navigate'&&u.origin===location.origin&&u.pathname.includes('/Per-Me/contatori-personali/')){
   e.respondWith(fetch(e.request).then(response=>{
     if(response.ok){
       const copy=response.clone();
       e.waitUntil(caches.open(CACHE).then(cache=>cache.put('./index.html',copy)));
     }
     return response;
   }).catch(()=>caches.match('./index.html')));
 }
});
