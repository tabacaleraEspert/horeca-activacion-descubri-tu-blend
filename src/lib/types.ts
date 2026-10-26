// Dominio Van Kiff — "Descubrí tu Blend"

import type { ComponentType } from "react";

export type PersonalityKey =
  | "contemplativo"
  | "nativo"
  | "indulgente"
  | "romantico"
  | "sommelier"
  | "fiestero"
  | "curador";

export type Gender = "mujer" | "hombre" | "ambos";

export interface Blend {
  /** key de personalidad asociada */
  key: PersonalityKey;
  /** nombre comercial del blend (ej. AMERICAN) */
  name: string;
  /** sabor real (ej. Americano) */
  flavor: string;
  /** nombre de la personalidad (ej. El Curador) */
  personality: string;
  /** variante femenina de la personalidad (ej. Romántica) */
  personalityF: string;
  emoji: string;
  tagline: string;
  description: string;
  traits: string[];
  bebida: string[];
  musica: string[];
  /** color principal del blend (hex) */
  color: string;
  /** color de texto sobre el color principal */
  onColor: string;
  /** ruta del render PNG del paquete */
  pkg: string;
  /** fondos artísticos (rutas); puede estar vacío → se usa fallback de color */
  bgs: string[];
  // --- Segmentación demográfica (define el pool elegible) ---
  gender: Gender;
  minAge: number;
  maxAge: number;
}

export type QuestionCategory = "montana" | "lifestyle" | "idolo";

export interface Option {
  text: string;
  personality: PersonalityKey;
  /** ruta de la foto para opciones visuales (ej. /quiz/m8-playa.jpg) */
  image?: string;
}

export interface Question {
  id: string;
  category: QuestionCategory;
  text: string;
  options: Option[];
}

export interface Lead {
  nombre: string;
  email: string;
  telefono: string;
  edad: number;
  genero: "mujer" | "hombre" | "otro";
}

export interface QuizResult {
  blend: Blend;
  /** ranking completo de personalidades por puntaje */
  ranking: { key: PersonalityKey; score: number }[];
  /** true si el ganador natural no era elegible y se cayó al siguiente */
  fellBack: boolean;
}

export type GameId = "blend" | "idolo";

/** Lo que cambia entre juegos; motor, quiz, resultado y kiosco son compartidos. */
export interface GameConfig {
  id: GameId;
  selectQuestions: () => Question[];
  /** false → sin formulario: los 7 blends son elegibles */
  collectLead: boolean;
  /** inactividad antes del modo atractor */
  idleMs: number;
  Welcome: ComponentType<{ onStart: () => void }>;
  /** fondos del quiz; si falta se usa el arte de los blends */
  quizBgs?: string[];
  /** color de acento (progreso, selección) */
  accent: string;
  attract: { videos: string[]; images: string[] };
  result: {
    /** loop de video de fondo por blend */
    video?: (b: Blend) => string;
    /** poster/fondo fijo por blend (si no hay, arte del blend o color) */
    image?: (b: Blend) => string;
    /** etiqueta de personalidad sin género (si falta, usa la del lead) */
    personality?: (b: Blend) => string;
    cta: { title: string; subtitle: string };
  };
  preload: { images: string[]; videos: string[] };
}
