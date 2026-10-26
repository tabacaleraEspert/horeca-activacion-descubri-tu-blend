import type { Question } from "@/lib/types";

// Banco Premios Ídolo (influencers / streamers). Todas con foto.
// Cada partida sortea 4 que cubran las 7 personalidades (ver engine).
// ☕ contemplativo · 🌲 nativo · 🍫 indulgente · 🌹 romantico · 🍷 sommelier · 🎉 fiestero · 🥃 curador
const img = (id: string, slug: string) => `/idolo/q/${id}-${slug}.webp`;

export const IDOLO: Question[] = [
  {
    id: "i1",
    category: "idolo",
    text: "Ganaste el Ídolo. ¿Cómo festejás?",
    options: [
      { text: "After hasta que salga el sol", personality: "fiestero", image: img("i1", "after") },
      { text: "Cena top con maridaje", personality: "sommelier", image: img("i1", "cena") },
      { text: "Delivery, manta y la gala repetida", personality: "indulgente", image: img("i1", "manta") },
      { text: "Me escapo a la montaña", personality: "nativo", image: img("i1", "montana") },
    ],
  },
  {
    id: "i2",
    category: "idolo",
    text: "Son las 3 am. ¿Qué estás haciendo?",
    options: [
      { text: "Stream con el chat explotado", personality: "fiestero", image: img("i2", "stream") },
      { text: "Anotando ideas en mi libreta", personality: "contemplativo", image: img("i2", "libreta") },
      { text: "Atacando la heladera", personality: "indulgente", image: img("i2", "heladera") },
      { text: "Durmiendo: mañana hay agenda", personality: "curador", image: img("i2", "agenda") },
    ],
  },
  {
    id: "i3",
    category: "idolo",
    text: "Tu rider de camarín tiene sí o sí…",
    options: [
      { text: "Velas, flores y luz cálida", personality: "romantico", image: img("i3", "velas") },
      { text: "Un buen vino y tabla de quesos", personality: "sommelier", image: img("i3", "vino") },
      { text: "Kombucha y fruta orgánica", personality: "nativo", image: img("i3", "kombucha") },
      { text: "Whisky y silencio", personality: "curador", image: img("i3", "whisky") },
    ],
  },
  {
    id: "i4",
    category: "idolo",
    text: "Te viralizás sin querer. ¿Qué hacés?",
    options: [
      { text: "Lo exprimo: colab, merch y gira", personality: "fiestero", image: img("i4", "gira") },
      { text: "Apago el celu y me voy a caminar", personality: "nativo", image: img("i4", "caminar") },
      { text: "Lo analizo y armo la estrategia", personality: "curador", image: img("i4", "estrategia") },
      { text: "Me emociono y respondo uno por uno", personality: "romantico", image: img("i4", "responder") },
    ],
  },
  {
    id: "i5",
    category: "idolo",
    text: "Tu feed tiene más…",
    options: [
      { text: "Atardeceres y libros", personality: "contemplativo", image: img("i5", "libros") },
      { text: "Comida que da hambre", personality: "indulgente", image: img("i5", "comida") },
      { text: "Outfits y flores", personality: "romantico", image: img("i5", "flores") },
      { text: "Brindis en bares lindos", personality: "sommelier", image: img("i5", "brindis") },
    ],
  },
  {
    id: "i6",
    category: "idolo",
    text: "Elegí tu look para la alfombra roja",
    options: [
      { text: "Negro impecable", personality: "curador", image: img("i6", "negro") },
      { text: "Brillos por todos lados", personality: "fiestero", image: img("i6", "brillos") },
      { text: "Vintage con historia", personality: "contemplativo", image: img("i6", "vintage") },
      { text: "Romántico en tonos pastel", personality: "romantico", image: img("i6", "pastel") },
    ],
  },
  {
    id: "i7",
    category: "idolo",
    text: "Tu colab soñada es con…",
    options: [
      { text: "Un chef con estrella", personality: "sommelier", image: img("i7", "chef") },
      { text: "Una banda en un festival", personality: "fiestero", image: img("i7", "festival") },
      { text: "Una marca outdoor en la Patagonia", personality: "nativo", image: img("i7", "patagonia") },
      { text: "Un artista en su taller", personality: "contemplativo", image: img("i7", "taller") },
    ],
  },
  {
    id: "i8",
    category: "idolo",
    text: "¿Qué superpoder elegís?",
    options: [
      { text: "Teletransportarme a la naturaleza", personality: "nativo", image: img("i8", "naturaleza") },
      { text: "Que el finde dure 5 días", personality: "indulgente", image: img("i8", "finde") },
      { text: "Paladar infalible", personality: "sommelier", image: img("i8", "paladar") },
      { text: "Que todo se vea hermoso", personality: "romantico", image: img("i8", "hermoso") },
    ],
  },
];
