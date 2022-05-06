const PRECACHE = 'precache';
const precacheManifest = (self.__WB_MANIFEST);
const entryToUrl = ({ url, revision }) => new URL(`${location.origin}/${url}?v=${revision}`).toString();
const precacheManifold = precacheManifest.map(entry => [new URL(`${location.origin}/${url}`).toString(), entryToUrl(entry)]);

self.addEventListener('install', event => {
    console.log('installing');
    event.waitUntil((async () => {
        const cache = await caches.open(PRECACHE);
        return Promise.all(precacheManifest.map(entry => cache.add(entryToUrl(entry)))).then(() => console.log('done install'));
    })());
});

self.addEventListener('activate', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(PRECACHE);
        const urls = (await cache.keys()).map(request => new URL(request.url).toString());
        const precacheUrls = Object.values(precacheManifold);
        urls.forEach(url => {
            if(!precacheUrls.includes(url)) cache.delete(url);
        })
    })());
});

self.addEventListener('fetch', event => {
    let requestUrl = event.request.url;
    if (requestUrl === `${location.origin}/`) requestUrl = new URL(`${location.origin}/index.html`);
      if (Object.keys(precacheManifold).includes(requestUrl))
        event.respondWith(
          (async () => {
            const cache = await caches.open(PRECACHE);
            const entry = precacheManifold[requestUrl];
            if(!entry) {
                console.log(requestUrl);
                return fetch(requestUrl);
            }
            const url = entryToUrl(entry);
            const match = cache.match(url);
            return match || fetch(requestUrl);
          })()
        );
    return fetch(requestUrl);
})