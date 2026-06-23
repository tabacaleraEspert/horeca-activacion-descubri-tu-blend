import { ALL_BLENDS, BLENDS } from "./blends";
import { LIFESTYLE, MONTANA } from "./questions";
import type {
  Blend,
  Lead,
  Option,
  PersonalityKey,
  Question,
  QuizResult,
} from "./types";

const PERSONALITY_ORDER: PersonalityKey[] = [
  "contemplativo",
  "nativo",
  "indulgente",
  "romantico",
  "sommelier",
  "fiestero",
  "curador",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

/**
 * Selecciona las preguntas de una sesión respetando las reglas:
 * - al menos 2 de Montaña y 3 de Lifestyle
 * - total entre 5 y 7
 * Montaña va primero (set the scene), luego lifestyle.
 */
export function selectQuestions(): Question[] {
  const nMontana = 2 + Math.floor(Math.random() * 3); // 2..4
  const nLifestyle = 3 + Math.floor(Math.random() * 2); // 3..4
  // cap total en 7
  let m = nMontana;
  let l = nLifestyle;
  while (m + l > 7) {
    if (m > 2) m--;
    else l--;
  }
  return [...pick(MONTANA, m), ...pick(LIFESTYLE, l)];
}

function genderEligible(blend: Blend, lead: Lead): boolean {
  if (lead.genero === "otro") return true; // sin filtro de género
  if (blend.gender === "ambos") return true;
  return blend.gender === lead.genero;
}

function ageEligible(blend: Blend, lead: Lead): boolean {
  return lead.edad >= blend.minAge && lead.edad <= blend.maxAge;
}

export function eligibleBlends(lead: Lead): Blend[] {
  return ALL_BLENDS.filter((b) => genderEligible(b, lead) && ageEligible(b, lead));
}

/**
 * Calcula el resultado:
 * 1. Suma los puntajes de personalidad según las respuestas.
 * 2. Arma el ranking.
 * 3. Gana la personalidad mejor rankeada que esté DENTRO del pool elegible
 *    (segmentación por edad + sexo). Si la #1 no aplica pero la #2 sí, va la #2.
 */
export function computeResult(answers: Option[], lead: Lead): QuizResult {
  const scores: Record<PersonalityKey, number> = {
    contemplativo: 0,
    nativo: 0,
    indulgente: 0,
    romantico: 0,
    sommelier: 0,
    fiestero: 0,
    curador: 0,
  };
  for (const a of answers) scores[a.personality] += 1;

  // jitter chico para desempatar sin sesgo fijo
  const jitter: Record<PersonalityKey, number> = {} as Record<PersonalityKey, number>;
  for (const k of PERSONALITY_ORDER) jitter[k] = Math.random();

  const ranking = PERSONALITY_ORDER.map((key) => ({ key, score: scores[key] }))
    .sort((a, b) => b.score - a.score || jitter[b.key] - jitter[a.key]);

  const pool = new Set(eligibleBlends(lead).map((b) => b.key));

  // primer rankeado dentro del pool elegible
  let winnerKey: PersonalityKey | null = null;
  for (const r of ranking) {
    if (pool.has(r.key)) {
      winnerKey = r.key;
      break;
    }
  }

  // fallback defensivo: si nadie del pool puntuó/aplica, el #1 global
  const fellBack = winnerKey !== null && winnerKey !== ranking[0].key;
  const finalKey = winnerKey ?? ranking[0].key;

  return { blend: BLENDS[finalKey], ranking, fellBack };
}
