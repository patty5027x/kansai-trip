const C='kansai-v3',FONT=/fonts\.(googleapis|gstatic)\.com/;
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./manifest.webmanifest','./icon-192.png','./icon-512.png']).catch(()=>{})));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET')return;
if(/firebase|er-api|currency-api|photon|nominatim|overpass|bigdatacloud|open-meteo/.test(u.href))return;
if(FONT.test(u.href)){e.respondWith(caches.open(C).then(c=>c.match(r).then(hit=>hit||fetch(r).then(res=>{c.put(r,res.clone());return res}))));return}
const page=r.mode==='navigate'||u.pathname.endsWith('.html')||u.pathname.endsWith('/');
e.respondWith(fetch(page?new Request(r.url,{cache:'no-store'}):r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(page?'./':r,cp));return res}).catch(()=>caches.match(page?'./':r).then(x=>x||caches.match('./'))))});
