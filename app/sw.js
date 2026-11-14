const CACHE='perme-reader-v21-20261114-menu-mediterraneo';
const SHELL=['./','./index.html','./app.css?v=15','./main.js?v=15','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png'];
const MENU='./menu-mediterraneo.html';
const MENU_ASSETS=['./menu-mediterraneo.css?v=1','./menu-mediterraneo.js?v=1','./ricette-mediterranee.js?v=1','../assets/logo-per-me.png','../assets/dieta-menu-spesa-originale.webp'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll([...SHELL,MENU,...MENU_ASSETS])).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('perme-reader-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==self.location.origin)return;
 const menuAsset=MENU_ASSETS.includes('../assets/'+url.pathname.split('/').pop())&&url.pathname.includes('/assets/');
 if(!url.pathname.includes('/app/')&&!menuAsset)return;
 if(req.mode==='navigate'){
  const entry=url.pathname.endsWith('/menu-mediterraneo.html')?MENU:'./index.html';
  event.respondWith(fetch(req).then(res=>{
   if(res.ok){const copy=res.clone();event.waitUntil(caches.open(CACHE).then(c=>c.put(entry,copy)).catch(()=>{}))}
   return res;
  }).catch(async()=>await caches.match(entry)||Response.error()));
  return;
 }
 // In rete prendi le nuove risorse. Offline ripiega sulla cache.
 event.respondWith(fetch(req,{cache:'no-store'}).then(response=>{
  if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(req,copy)).catch(()=>{}))}
  return response;
 }).catch(()=>caches.match(req).then(hit=>hit||Response.error())));
});
