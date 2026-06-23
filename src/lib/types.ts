// Dominio Van Kiff — "Descubrí tu Blend"

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

export type QuestionCategory = "montana" | "lifestyle";

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
