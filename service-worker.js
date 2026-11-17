const CACHE='dayflow-mobile-v1';
const FILES=['./','./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(res=>{
   const copy=res.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));return res;
 }).catch(()=>caches.match('./index.html'))));
});