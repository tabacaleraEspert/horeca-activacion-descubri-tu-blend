"use client";

import { useEffect } from "react";
import { PRELOAD_IMAGES, PRELOAD_VIDEOS } from "@/lib/assets";
import { flushLeadQueue } from "@/lib/leadQueue";

// Precachea TODO al arrancar (kiosko): el SW descarga fotos, packs y videos
// completos a Cache Storage → tras la primera carga online la app funciona
// entera sin wifi. También drena la cola de leads pendientes.
export default function Preloader() {
  useEffect(() => {
    // Los chunks JS/fuentes del build no pasan por el SW en la primera carga
    // (todavía no controla la página): se listan acá — performance entries +
    // tags del documento — y se mandan a precachear explícitamente.
    const toPath = (u: string) => {
      const url = new URL(u, location.origin);
      return url.origin === location.origin ? url.pathname + url.search : null;
    };

    const loadedResources = () => {
      const fromPerf = performance
        .getEntriesByType("resource")
        .map((e) => toPath(e.name));
      const fromDom = Array.from(
        document.querySelectorAll<HTMLScriptElement | HTMLLinkElement>(
          'script[src], link[rel="stylesheet"][href], link[rel="preload"][href]'
        )
      ).map((el) => toPath("src" in el && el.src ? el.src : (el as HTMLLinkElement).href));
      return [...fromPerf, ...fromDom].filter((p): p is string => Boolean(p));
    };

    const assets = () =>
      Array.from(
        new Set([...PRELOAD_IMAGES, ...PRELOAD_VIDEOS, ...loadedResources()])
      );

    let swReg: ServiceWorkerRegistration | null = null;
    const precache = () =>
      (swReg?.active ?? navigator.serviceWorker?.controller)?.postMessage({
        type: "PRECACHE",
        urls: assets(),
      });

    // Service worker: habilita offline (kiosko) y cachea los assets.
    // En local NO se usa: el SW + rebuilds genera pantallas en blanco por
    // caché stale. Además, si quedó uno viejo registrado, lo limpiamos.
    if ("serviceWorker" in navigator) {
      const host = location.hostname;
      const isLocal =
        host === "localhost" ||
        host === "127.0.0.1" ||
        host.endsWith(".local") ||
        /^(10|127|192\.168|172\.(1[6-9]|2\d|3[01]))\./.test(host);
      if (isLocal) {
        navigator.serviceWorker
          .getRegistrations()
          .then((rs) => rs.forEach((r) => r.unregister()));
        if (window.caches) {
          caches.keys().then((ks) => ks.forEach((k) => caches.delete(k)));
        }
      } else {
        navigator.serviceWorker
          .register("/sw.js")
          .then(() => navigator.serviceWorker.ready)
          .then((reg) => {
            swReg = reg;
            precache();
            // segunda pasada: agarra chunks lazy y recursos que llegaron tarde
            setTimeout(precache, 6000);
          })
          .catch(() => {
            /* sin SW la app igual funciona online */
          });
        // Tras un deploy el SW nuevo purga la caché vieja: repoblar.
        navigator.serviceWorker.addEventListener("controllerchange", precache);
      }
    }

    // Warm-up en memoria (y única precarga cuando no hay SW, p. ej. local).
    const imgs = PRELOAD_IMAGES.map((src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      return img;
    });

    // Cola de leads: reintenta lo pendiente al arrancar y al volver la red.
    flushLeadQueue();
    const onOnline = () => flushLeadQueue();
    window.addEventListener("online", onOnline);

    return () => {
      // soltar referencias para que el GC libere los detached elements
      imgs.length = 0;
      window.removeEventListener("online", onOnline);
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.removeEventListener("controllerchange", precache);
      }
    };
  }, []);

  return null;
}
