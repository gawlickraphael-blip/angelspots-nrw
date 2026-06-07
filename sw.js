const CACHE_VERSION = 'angelspots-nrw-v3-secure';
const APP_SHELL = [
  '/',
  '/index.html',
  '/index_nrw.html',
  '/styles.css',
  '/app.js',
  '/vendor/leaflet/leaflet.css',
  '/vendor/leaflet/leaflet.js',
  '/vendor/leaflet/images/marker-icon.png',
  '/vendor/leaflet/images/marker-icon-2x.png',
  '/vendor/leaflet/images/marker-shadow.png',
  '/vendor/markercluster/MarkerCluster.css',
  '/vendor/markercluster/MarkerCluster.Default.css',
  '/vendor/markercluster/leaflet.markercluster.js',
  '/manifest.webmanifest',
  '/assets/fish-placeholder.svg',
  '/data/fish_profiles.json',
  '/data/hagen_local_spots.json',
  '/data/nrw_angelspot_candidates.geojson',
  '/data/nrw_curated_ruhrgebiet.json',
  '/data/nrw_curated_niederrhein_duesseldorf.json',
  '/data/nrw_curated_rheinland_koeln_bonn.json',
  '/data/nrw_curated_aachen_eifel.json',
  '/data/nrw_curated_muensterland.json',
  '/data/nrw_curated_owl.json',
  '/data/nrw_curated_sauerland_siegerland_bergisches.json',
  '/data/nrw_curated_round2_west_rheinland.json',
  '/data/nrw_curated_round2_eifel_muensterland.json',
  '/data/nrw_curated_round2_owl_sauerland.json',
  '/data/nrw_curated_round3_quality.json',
  '/data/nrw_curated_round5_osm_triage.json',
  '/data/nrw_curated_round6_regional_deepening.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_VERSION).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

async function networkFirst(request, fallbackUrl = '/index.html') {
  const cache = await caches.open(CACHE_VERSION);
  try {
    const response = await fetch(request);
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  } catch (error) {
    return (await cache.match(request)) || cache.match(fallbackUrl);
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_VERSION);
  const cached = await cache.match(request);
  const fresh = fetch(request).then(response => {
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => cached);
  return cached || fresh;
}

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  if (url.pathname.startsWith('/data/') || url.pathname.endsWith('.webmanifest')) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  event.respondWith(networkFirst(request));
});
