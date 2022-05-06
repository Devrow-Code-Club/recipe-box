const PRECACHE = 'precache';
const precacheManifest = (self.__WB_MANIFEST);
const entryToUrl = ({ url, revision }) => new URL(`${location.origin}/${url}?v=${revision}`).toString();
const precacheUrls = precacheManifest.map((entry) => entryToUrl(entry));
const cleanPrecacheUrls = precacheManifest.map(({ url }) =>
  new URL(`${location.origin}/${url}`).toString()
);

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
            if(!precacheUrls.includes(url)) cache.delete(url);
        })
    })());
});

self.addEventListener('fetch', event => {
    let requestUrl = event.request.url;
    if (requestUrl === `${location.origin}/`) requestUrl = new URL(`${location.origin}/index.html`);
      if (cleanPrecacheUrls.includes(requestUrl))
        event.respondWith(
          (async () => {
            const cache = await caches.open(PRECACHE);
            const url = entryToUrl(
              precacheManifest.find((entry) => entry.url === requestUrl)
            );
            const match = cache.match(url);
            return match || fetch(requestUrl);
          })()
        );
})