import { ALL_BLENDS } from "@/lib/blends";
import { selectCovering } from "@/lib/engine";
import type { Blend, GameConfig, PersonalityKey } from "@/lib/types";
import { IDOLO_WELCOME_IMAGE, IDOLO_WELCOME_VIDEO } from "./assets";
import IdoloWelcome from "./IdoloWelcome";
import { IDOLO } from "./questions";

// Juego Premios Ídolo (ruta "/idolo"): influencers/streamers, totem vertical.
// Sin toma de datos → sin segmentación; 4 preguntas; arte generado con
// Higgsfield (scripts/idolo).

// Personalidad sin género (no hay formulario que lo diga).
const PERSONALITY: Record<PersonalityKey, string> = {
  contemplativo: "Alma contemplativa",
  nativo: "Espíritu nativo",
  indulgente: "Modo indulgente",
  romantico: "Alma romántica",
  sommelier: "Paladar sommelier",
  fiestero: "Modo fiesta",
  curador: "Ojo curador",
};

const slug = (b: Blend) => b.name.toLowerCase();
const resVideo = (b: Blend) => `/idolo/res/${slug(b)}.mp4`;
const resImage = (b: Blend) => `/idolo/res/${slug(b)}.webp`;

const QUIZ_BGS = [1, 2, 3, 4].map((n) => `/idolo/bg/quiz-${n}.webp`);

const optionImages = IDOLO.flatMap((q) => q.options.map((o) => o.image!));

export const IDOLO_GAME: GameConfig = {
  id: "idolo",
  selectQuestions: () => selectCovering(IDOLO, 4),
  collectLead: false,
  idleMs: 20000,
  Welcome: IdoloWelcome,
  quizBgs: QUIZ_BGS,
  accent: "#f5c542",
  attract: {
    videos: [IDOLO_WELCOME_VIDEO, ...ALL_BLENDS.map(resVideo)],
    images: [],
  },
  result: {
    video: resVideo,
    image: resImage,
    personality: (b) => PERSONALITY[b.key],
    cta: {
      title: "Sacale foto y etiquetá a @vankiff 📸",
      subtitle: "Subilo a tu story · #PremiosÍdolo",
    },
  },
  preload: {
    images: [
      ...optionImages,
      ...QUIZ_BGS,
      IDOLO_WELCOME_IMAGE,
      ...ALL_BLENDS.map(resImage),
      ...ALL_BLENDS.map((b) => b.pkg),
      "/brand/logo-art.png",
    ],
    videos: [IDOLO_WELCOME_VIDEO, ...ALL_BLENDS.map(resVideo)],
  },
};
