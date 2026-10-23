const CACHE='perme-reader-v16-20261023-tutor-android';
const SHELL=['./','./index.html','./app.css?v=13','./main.js?v=12','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('perme-reader-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==self.location.origin)return;
 if(!url.pathname.includes('/app/'))return;
 if(req.mode==='navigate'){
  event.respondWith(fetch(req).then(res=>{
   if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy)).catch(()=>{})}
   return res;
  }).catch(async()=>await caches.match('./index.html')||Response.error()));
  return;
 }
 // In rete prendi le nuove risorse. Offline ripiega sulla cache.
 event.respondWith(fetch(req,{cache:'no-store'}).then(response=>{
  if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(req,copy)).catch(()=>{})}
  return response;
 }).catch(()=>caches.match(req).then(hit=>hit||Response.error())));
});
