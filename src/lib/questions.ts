import type { Question } from "./types";

// Banco de preguntas MONTAÑA.
// Cada opción está mapeada a una personalidad (emoji del doc original):
// ☕ contemplativo · 🌲 nativo · 🍫 indulgente · 🌹 romantico · 🍷 sommelier · 🎉 fiestero · 🥃 curador
export const MONTANA: Question[] = [
  {
    id: "m2",
    category: "montana",
    text: "¿Qué te copa más?",
    options: [
      { text: "Esquí", personality: "curador", image: "/quiz/m2-esqui.jpg" },
      { text: "Snowboard", personality: "fiestero", image: "/quiz/m2-snowboard.jpg" },
    ],
  },
  {
    id: "m3",
    category: "montana",
    text: "¿Cómo definirías tu nivel?",
    options: [
      { text: "Estoy dando mis primeros pasos, a los golpes pero bien.", personality: "indulgente" },
      { text: "Intermedio, por las pistas voy bien.", personality: "nativo" },
      { text: "Avanzado, me gusta desafiarme en los fuera de pista.", personality: "curador" },
    ],
  },
  {
    id: "m4",
    category: "montana",
    text: "¿Qué tipo de terreno te copa más?",
    options: [
      { text: "Pistas tranquilas y bien pisadas.", personality: "sommelier" },
      { text: "Pistas negras.", personality: "curador" },
      { text: "Entre los árboles.", personality: "nativo" },
      { text: "Fuera de pista.", personality: "fiestero" },
    ],
  },
  {
    id: "m5",
    category: "montana",
    text: "El clima está complicado: viento, nieve y poca visibilidad. ¿Qué hacés?",
    options: [
      { text: "Subo la montaña igual.", personality: "fiestero" },
      { text: "Espero un rato y veo cómo evoluciona.", personality: "curador" },
      { text: "Me tomo un café en Après y disfruto la vista.", personality: "contemplativo" },
      { text: "Aprovecho para descansar, no subo.", personality: "indulgente" },
    ],
  },
  {
    id: "m6",
    category: "montana",
    text: "Bajando la montaña, ¿cómo es tu estilo?",
    options: [
      { text: "Con música a todo volumen.", personality: "fiestero" },
      { text: "Con alguna playlist tranqui.", personality: "romantico" },
      { text: "Prefiero escuchar la montaña.", personality: "contemplativo" },
    ],
  },
  {
    id: "m7",
    category: "montana",
    text: "¿Te animás a ir al snowpark?",
    options: [
      { text: "Sí, siempre estoy buscando saltos y módulos.", personality: "fiestero" },
      { text: "Muy tranquilo, voy de vez en cuando.", personality: "nativo" },
      { text: "Lo miro desde afuera.", personality: "indulgente" },
      { text: "Prefiero recorrer la montaña.", personality: "contemplativo" },
    ],
  },
  {
    id: "m8",
    category: "montana",
    text: "Si tuvieras que elegir una sola opción…",
    options: [
      { text: "Verano y playa.", personality: "romantico", image: "/quiz/m8-playa.jpg" },
      { text: "Invierno y montaña.", personality: "sommelier", image: "/quiz/m8-montana.jpg" },
    ],
  },
  {
    id: "m9",
    category: "montana",
    text: "¿Cuándo te gusta subir a la montaña?",
    options: [
      { text: "Apenas abre la Séxtuple, pista sin pisar.", personality: "curador" },
      { text: "A media mañana, me cuesta madrugar.", personality: "indulgente" },
      { text: "Cuando me dan ganas, no importa la hora.", personality: "fiestero" },
    ],
  },
  {
    id: "m10",
    category: "montana",
    text: "¿Qué tan importante es hacer una pausa?",
    options: [
      { text: "Fundamental, la montaña se disfruta sin apuro.", personality: "contemplativo" },
      { text: "Ando a full, solo descanso cuando subo las aerosillas.", personality: "fiestero" },
    ],
  },
  {
    id: "m11",
    category: "montana",
    text: "Después de esquiar, ¿cómo seguís el día?",
    options: [
      { text: "After Ski, obvio.", personality: "fiestero" },
      { text: "Plan tranqui con amigos en el hotel.", personality: "nativo" },
      { text: "Siesta para recargar y salir de fiesta a la noche.", personality: "fiestero" },
      { text: "Descanso, me guardo energía para mañana.", personality: "curador" },
    ],
  },
  {
    id: "m12",
    category: "montana",
    text: "¿Cuál de estas frases te representa más?",
    options: [
      { text: "“Mientras más aventura, mejor.”", personality: "fiestero" },
      { text: "“Lo importante es disfrutar el momento.”", personality: "indulgente" },
      { text: "“Con amigos siempre es mejor.”", personality: "romantico" },
      { text: "“Me gusta perfeccionar mi técnica.”", personality: "curador" },
    ],
  },
  {
    id: "m15",
    category: "montana",
    text: "Si pudieras elegir una bajada para repetir todo el día, ¿cuál sería?",
    options: [
      { text: "Pista Princesa.", personality: "romantico" },
      { text: "Pista Lynch.", personality: "curador" },
      { text: "La Laguna.", personality: "contemplativo" },
      { text: "Otra, siempre estoy explorando.", personality: "nativo" },
    ],
  },
  {
    id: "m16",
    category: "montana",
    text: "Se anuncia una nevada de 30 cm para mañana. ¿Cuál es tu reacción?",
    options: [
      { text: "Manija, ya estoy preparando todo.", personality: "fiestero" },
      { text: "Le escribo a mis amigos para organizar la salida.", personality: "romantico" },
      { text: "Veo cómo amanezco y decido.", personality: "indulgente" },
      { text: "Disfruto la nieve desde el refugio.", personality: "contemplativo" },
    ],
  },
  {
    id: "m17",
    category: "montana",
    text: "¿Qué es lo primero que hacés al llegar al Cerro Catedral?",
    options: [
      { text: "Voy directo a la Séxtuple.", personality: "curador" },
      { text: "Armo un reel del paisaje.", personality: "romantico" },
      { text: "Busco dónde tomar un café.", personality: "contemplativo" },
      { text: "Encontrarme con mi grupo de amigos.", personality: "fiestero" },
    ],
  },
  {
    id: "m18",
    category: "montana",
    text: "Si la montaña estuviera vacía para vos solo, ¿qué harías?",
    options: [
      { text: "Buscaría la línea más desafiante.", personality: "curador" },
      { text: "Recorrería cada rincón.", personality: "nativo" },
      { text: "Disfrutaría del silencio.", personality: "contemplativo" },
      { text: "Grabaría contenido para mis redes.", personality: "romantico" },
    ],
  },
  {
    id: "m19",
    category: "montana",
    text: "¿Qué hacés cuando vas en la aerosilla?",
    options: [
      { text: "Escucho música, muy tranquilo.", personality: "indulgente" },
      { text: "Charlo con amigos, voy disfrutando el momento.", personality: "fiestero" },
      { text: "Voy planificando por dónde voy a esquiar/surfear.", personality: "curador" },
      { text: "Nada, me dan miedo.", personality: "indulgente" },
    ],
  },
  {
    id: "m20",
    category: "montana",
    text: "¿Cuál es tu plan ideal después de una gran jornada?",
    options: [
      { text: "Una cerveza con amigos.", personality: "fiestero" },
      { text: "Una cena tranquila.", personality: "sommelier" },
      { text: "Seguir explorando Bariloche.", personality: "nativo" },
      { text: "Descansar para repetir mañana.", personality: "curador" },
    ],
  },
  {
    id: "m21",
    category: "montana",
    text: "¿Qué te atrae más de la montaña?",
    options: [
      { text: "La adrenalina.", personality: "fiestero" },
      { text: "La libertad.", personality: "nativo" },
      { text: "Los paisajes.", personality: "contemplativo" },
      { text: "Compartir experiencias.", personality: "romantico" },
    ],
  },
  {
    id: "m22",
    category: "montana",
    text: "Si pudieras elegir una vista para quedarte una hora mirando, ¿cuál sería?",
    options: [
      { text: "La cima del Catedral.", personality: "curador", image: "/quiz/m22-cima.jpg" },
      { text: "El Lago Nahuel Huapi.", personality: "contemplativo", image: "/quiz/m22-lago.jpg" },
      { text: "Un bosque nevado.", personality: "nativo", image: "/quiz/m22-bosque.jpg" },
      { text: "El atardecer desde la montaña.", personality: "romantico", image: "/quiz/m22-atardecer.jpg" },
    ],
  },
  {
    id: "m23",
    category: "montana",
    text: "¿Cómo te describen tus amigos en un viaje?",
    options: [
      { text: "Aventurero.", personality: "nativo" },
      { text: "Relajado.", personality: "indulgente" },
      { text: "Social.", personality: "fiestero" },
      { text: "Espontáneo.", personality: "romantico" },
    ],
  },
  {
    id: "m24",
    category: "montana",
    text: "¿Qué tipo de día te gusta más?",
    options: [
      { text: "Sol y nieve perfecta.", personality: "sommelier" },
      { text: "Nevada intensa.", personality: "fiestero" },
      { text: "Nubes y poca gente.", personality: "contemplativo" },
    ],
  },
  {
    id: "m25",
    category: "montana",
    text: "¿Cuál es tu ritual antes de la primera bajada?",
    options: [
      { text: "Revisar todo el equipo.", personality: "curador" },
      { text: "Tomar un café.", personality: "contemplativo" },
      { text: "Sacar una foto.", personality: "romantico" },
      { text: "Salir sin pensar demasiado.", personality: "fiestero" },
    ],
  },
  {
    id: "m26",
    category: "montana",
    text: "¿Qué tan importante es compartir lo que vivís en redes?",
    options: [
      { text: "Muchísimo.", personality: "romantico" },
      { text: "Bastante.", personality: "fiestero" },
      { text: "Poco.", personality: "sommelier" },
      { text: "Nada, prefiero vivir el momento.", personality: "contemplativo" },
    ],
  },
  {
    id: "m27",
    category: "montana",
    text: "Cuando encontrás un lugar increíble en la montaña…",
    options: [
      { text: "Lo compartís en tus redes.", personality: "romantico" },
      { text: "Disfrutás el momento con amigos.", personality: "fiestero" },
      { text: "Te quedás un rato contemplando la vista.", personality: "contemplativo" },
    ],
  },
  {
    id: "m28",
    category: "montana",
    text: "Si tuvieras un día libre sin esquiar, ¿qué elegirías?",
    options: [
      { text: "Trekking.", personality: "nativo" },
      { text: "Visitar el Gutiérrez.", personality: "romantico" },
      { text: "Ir a pescar al Nahuel Huapi.", personality: "sommelier" },
      { text: "Descansar frente a una chimenea con fuego.", personality: "indulgente" },
    ],
  },
  {
    id: "m29",
    category: "montana",
    text: "¿Qué representa para vos Bariloche?",
    options: [
      { text: "Aventura.", personality: "nativo" },
      { text: "Fiesta.", personality: "fiestero" },
      { text: "Deporte.", personality: "curador" },
      { text: "Desconexión.", personality: "contemplativo" },
    ],
  },
  {
    id: "m30",
    category: "montana",
    text: "Si tu experiencia en la montaña fuera una palabra, ¿cuál sería?",
    options: [
      { text: "Libertad.", personality: "nativo" },
      { text: "Adrenalina.", personality: "fiestero" },
      { text: "Pausa.", personality: "contemplativo" },
      { text: "Amigos.", personality: "romantico" },
    ],
  },
];

// Banco de preguntas LIFESTYLE ("La vida misma").
export const LIFESTYLE: Question[] = [
  {
    id: "l41",
    category: "lifestyle",
    text: "¿Cuál de estas películas volverías a ver mil veces?",
    options: [
      { text: "Una comedia con amigos.", personality: "fiestero" },
      { text: "Una película romántica que me haga llorar.", personality: "romantico" },
      { text: "Un documental que me enseñe algo nuevo.", personality: "curador" },
      { text: "Una película tranquila para disfrutar con algo rico.", personality: "indulgente" },
    ],
  },
  {
    id: "l42",
    category: "lifestyle",
    text: "¿Cómo es tu desayuno ideal?",
    options: [
      { text: "Café negro y algo simple.", personality: "curador", image: "/quiz/l42-cafe-negro.jpg" },
      { text: "Café con leche y medialunas.", personality: "indulgente", image: "/quiz/l42-medialunas.jpg" },
      { text: "Té y fruta.", personality: "contemplativo", image: "/quiz/l42-te-fruta.jpg" },
      { text: "Brunch lindo para sacar fotos.", personality: "romantico", image: "/quiz/l42-brunch.jpg" },
    ],
  },
  {
    id: "l43",
    category: "lifestyle",
    text: "¿Qué valorás más en una amistad?",
    options: [
      { text: "La diversión.", personality: "fiestero" },
      { text: "La profundidad de las conversaciones.", personality: "contemplativo" },
      { text: "La lealtad.", personality: "nativo" },
      { text: "La elegancia y la admiración mutua.", personality: "sommelier" },
    ],
  },
  {
    id: "l44",
    category: "lifestyle",
    text: "¿Cómo sos cuando cocinás?",
    options: [
      { text: "Improviso con lo que haya.", personality: "fiestero" },
      { text: "Sigo la receta al pie de la letra.", personality: "curador" },
      { text: "Cocino algo reconfortante.", personality: "indulgente" },
      { text: "Me gusta que quede rico y lindo.", personality: "romantico" },
    ],
  },
  {
    id: "l45",
    category: "lifestyle",
    text: "¿Qué te comprás primero cuando cobrás?",
    options: [
      { text: "Entradas o salidas.", personality: "fiestero" },
      { text: "Un vino o algo gourmet.", personality: "sommelier" },
      { text: "Algo útil y de calidad.", personality: "curador" },
      { text: "Un mimo para mí.", personality: "romantico" },
    ],
  },
  {
    id: "l46",
    category: "lifestyle",
    text: "¿Cuál es tu lugar favorito para perderte?",
    options: [
      { text: "Un bosque o sendero.", personality: "nativo", image: "/quiz/l46-bosque.jpg" },
      { text: "Una librería o café.", personality: "contemplativo", image: "/quiz/l46-libreria.jpg" },
      { text: "Un bar elegante.", personality: "sommelier", image: "/quiz/l46-bar.jpg" },
      { text: "Una fiesta llena de gente.", personality: "fiestero", image: "/quiz/l46-fiesta.jpg" },
    ],
  },
  {
    id: "l47",
    category: "lifestyle",
    text: "¿Cómo decorás tu casa ideal?",
    options: [
      { text: "Minimalista y funcional.", personality: "curador", image: "/quiz/l47-minimalista.jpg" },
      { text: "Cálida y acogedora.", personality: "indulgente", image: "/quiz/l47-calida.jpg" },
      { text: "Llena de plantas y elementos naturales.", personality: "nativo", image: "/quiz/l47-plantas.jpg" },
      { text: "Estética y muy cuidada.", personality: "romantico", image: "/quiz/l47-estetica.jpg" },
    ],
  },
  {
    id: "l48",
    category: "lifestyle",
    text: "Si te regalaran un día entero sin obligaciones, ¿qué harías?",
    options: [
      { text: "Organizar un plan con amigos.", personality: "fiestero" },
      { text: "Leer, escribir o escuchar música.", personality: "contemplativo" },
      { text: "Dormir y descansar.", personality: "indulgente" },
      { text: "Ir a una degustación o experiencia gastronómica.", personality: "sommelier" },
    ],
  },
  {
    id: "l49",
    category: "lifestyle",
    text: "¿Qué frase te representa más?",
    options: [
      { text: "“La vida es para disfrutarla.”", personality: "fiestero" },
      { text: "“Menos, pero mejor.”", personality: "curador" },
      { text: "“Todo pasa por algo.”", personality: "nativo" },
      { text: "“Los pequeños momentos son los más importantes.”", personality: "contemplativo" },
    ],
  },
  {
    id: "l50",
    category: "lifestyle",
    text: "Si tu personalidad fuera un ritual, ¿cuál sería?",
    options: [
      { text: "Brindar con amigos.", personality: "fiestero" },
      { text: "Preparar un café y mirar por la ventana.", personality: "contemplativo" },
      { text: "Encender una chimenea y disfrutar un postre.", personality: "indulgente" },
      { text: "Abrir una buena botella para una ocasión especial.", personality: "sommelier" },
    ],
  },
];
