const C='kansai-v2';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||/firebase|er-api|currency-api/.test(u.href))return;
const page=r.mode==='navigate'||u.pathname.endsWith('.html')||u.pathname.endsWith('/');
e.respondWith(fetch(page?new Request(r.url,{cache:'no-store'}):r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(page?'./':r,cp));return res}).catch(()=>caches.match(page?'./':r).then(x=>x||caches.match('./'))))});
