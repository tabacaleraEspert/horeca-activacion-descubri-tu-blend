import { ALL_BLENDS } from "./blends";
import { LIFESTYLE, MONTANA } from "./questions";

// Imágenes de opciones del quiz (las que tienen foto).
const quizImages = [...MONTANA, ...LIFESTYLE]
  .flatMap((q) => q.options.map((o) => o.image))
  .filter((s): s is string => Boolean(s));

// Fondos de arte + packs de cada blend + marca.
const blendBgs = ALL_BLENDS.flatMap((b) => b.bgs);
const blendPkgs = ALL_BLENDS.map((b) => b.pkg);
const brand = [
  "/brand/logo-art.png",
  "/brand/logo-premium.png",
  "/brand/wordmark.png",
];

// Todas las imágenes a precachear (sin duplicados).
export const PRELOAD_IMAGES = Array.from(
  new Set([...quizImages, ...blendBgs, ...blendPkgs, ...brand])
);

// Videos del modo atractor (también consumidos por AttractMode).
export const PRELOAD_VIDEOS = [
  "/attract/short1.mp4",
  "/attract/afterski1.mp4",
  "/attract/cobertura.mp4",
  "/attract/nico.mp4",
];
