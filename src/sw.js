const PRECACHE = 'precache';
const precacheManifest = (self.__WB_MANIFEST);
const entryToUrl = ({ url, revision }) => new URL(`/${url}?v=${revision}`).toString();
const precacheUrls = precacheManifest.map((entry) => entryToUrl(entry));
const cleanPrecacheUrls = precacheManifest.map(({url}) => (new URL(`/${url}`)).toString());

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
        urls.forEach(url => {
            console.log(url, precacheUrls);
            if(!precacheUrls.includes(urlPath)) cache.delete(url);
        })
    })());
});

self.addEventListener('fetch', event => {
    console.log(event.request);
    if(cleanPrecacheUrls.includes(event.request.url)) event.respondWith((async () => {
        const cache = await caches.open(PRECACHE);
        const url = entryToUrl(precacheManifest.find(entry => entry.url === event.request.url));
        return cache.match(url);
    })());
})