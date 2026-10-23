const CACHE='perme-contatori-shell-v4-20261023-origini';
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
   e.respondWith(fetch(e.request).catch(()=>caches.match('./index.html')));
 }
});
