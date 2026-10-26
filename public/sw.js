// Service Worker — Van Kiff · Descubrí tu Blend (kiosko offline-first)
// El Preloader manda la lista completa de assets (PRECACHE) al arrancar; acá
// se descargan enteros (respuestas 200) y quedan en Cache Storage → tras la
// primera carga online la app funciona entera sin wifi.

const CACHE = "vk-blend-v4";
const CORE = ["/", "/manifest.webmanifest"];

self.addEventListener("install", (event) => {
  // Disponible apenas se instala.
  self.skipWaiting();
  event.waitUntil(
    caches
      .open(CACHE)
      .then((c) => Promise.allSettled(CORE.map((u) => c.add(u))))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

// Precache explícito: la página conoce la lista de assets (imágenes + videos)
// y la manda por postMessage. Fetch normal (sin Range) → respuesta 200 entera.
self.addEventListener("message", (event) => {
  const data = event.data;
  if (!data || data.type !== "PRECACHE" || !Array.isArray(data.urls)) return;
  event.waitUntil(
    caches.open(CACHE).then((c) =>
      Promise.allSettled(
        data.urls.map((u) =>
          c.match(u).then(
            (hit) =>
              hit ||
              fetch(u).then((res) => {
                if (res && res.status === 200) return c.put(u, res);
              })
          )
        )
      )
    )
  );
});

// Los <video> piden rangos de bytes y la Cache Storage no guarda parciales
// (206): se responde rebanando el cuerpo completo que tenemos cacheado.
async function sliceRange(rangeHeader, cached) {
  const buf = await cached.arrayBuffer();
  const size = buf.byteLength;
  const m = /bytes=(\d+)-(\d*)/.exec(rangeHeader);
  const start = m ? Number(m[1]) : 0;
  const end = m && m[2] ? Math.min(Number(m[2]), size - 1) : size - 1;
  return new Response(buf.slice(start, end + 1), {
    status: 206,
    statusText: "Partial Content",
    headers: {
      "Content-Type": cached.headers.get("Content-Type") || "",
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Content-Length": String(end - start + 1),
      "Accept-Ranges": "bytes",
    },
  });
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // solo same-origin

  // Navegación (HTML): network-first con fallback a caché (offline).
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          caches.open(CACHE).then((c) => c.put("/", res.clone()));
          return res;
        })
        .catch(() => caches.match("/").then((r) => r || caches.match(req)))
    );
    return;
  }

  // Resto (chunks, imágenes, videos, fuentes): cache-first, y poblamos al vuelo.
  const range = req.headers.get("range");
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return range ? sliceRange(range, cached) : cached;
      return fetch(req).then((res) => {
        // solo respuestas completas: un 206 parcial no sirve para reusar
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      });
    })
  );
});
