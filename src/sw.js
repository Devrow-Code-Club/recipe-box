const PRECACHE = 'precache';
const CACHE = 'cache';
const precacheManifest = (self.__WB_MANIFEST);
const entryToUrl = ({ url, revision }) => new URL(`${location.origin}/${url}?v=${revision}`).toString();
const precacheManifold = Object.fromEntries(precacheManifest.map(entry => [new URL(`${location.origin}/${entry.url}`).toString(), entryToUrl(entry)]));

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

self.addEventListener('fetch', async event => {
    let requestUrl = event.request.url;
    if (requestUrl === `${location.origin}/`) requestUrl = new URL(`${location.origin}/index.html`).toString();
    if (Object.keys(precacheManifold).includes(requestUrl))
        return event.respondWith(
            (async () => {
            const cache = await caches.open(PRECACHE);
            const url = precacheManifold[requestUrl];
            if(!url) return fetch(requestUrl);
            const match = await cache.match(url);
            return match;
            })()
        );  
    const cache = await caches.open(CACHE);
    const match = await cache.match(requestUrl);
    if(match) return event.responseWith(match);
    const response = await fetch(requestUrl);
    cache.put(response.clone());
    return event.respondWith(response);
})