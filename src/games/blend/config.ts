import Welcome from "@/components/Welcome";
import { PRELOAD_IMAGES, PRELOAD_VIDEOS } from "@/lib/assets";
import { ALL_BLENDS } from "@/lib/blends";
import { selectQuestions } from "@/lib/engine";
import type { GameConfig } from "@/lib/types";

// Juego original — activación Cerro Catedral (ruta "/", QRs impresos).
export const BLEND_GAME: GameConfig = {
  id: "blend",
  selectQuestions,
  collectLead: true,
  idleMs: 40000,
  Welcome,
  accent: "#0fb1a4",
  attract: {
    videos: PRELOAD_VIDEOS,
    images: ALL_BLENDS.flatMap((b) => b.bgs),
  },
  result: {
    cta: {
      title: "Acercate al Master Blender 🔥",
      subtitle: "Probá tu sabor y descubrí los demás",
    },
  },
  preload: { images: PRELOAD_IMAGES, videos: PRELOAD_VIDEOS },
};
