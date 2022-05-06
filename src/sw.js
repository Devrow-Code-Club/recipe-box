const PRECACHE = 'precache';
const precacheManifest = (self.__WB_MANIFEST);
const entryToUrl = ({ url, revision }) => `${url}?v=${revision}`;
const precacheUrls = precacheManifest.map((entry) => entryToUrl(entry));
const cleanPrecacheUrls = precacheManifest.map(({url}) => url);

self.addEventListener('install', event => {
    event.waitUntil(async () => {
        const cache = await caches.open(PRECACHE);
        return Promise.all(precacheManifest.map(entry => cache.add(entryToUrl(entry))));
    });
});

self.addEventListener('activate', event => {
    event.waitUntil(async () => {
        const cache = await caches.open(PRECACHE);
        const urls = await cache.keys();
        urls.forEach(url => {
            if(precacheUrls.includes(url)) return;
            cache.delete(url);
        })
    });
});

self.addEventListener('fetch', event => {
    if(cleanPrecacheUrls.includes(event.request.url)) event.respondWith(async () => {
        const cache = await caches.open(PRECACHE);
        const url = entryToUrl(precacheManifest.find(entry => entry.url === event.request.url));
        return cache.match(url);
    })
})