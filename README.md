# Van Kiff · Descubrí tu Blend

App de activación BTL (Cerro Catedral, invierno 2026). El consumidor responde un
quiz corto y recibe el **blend Van Kiff** que describe su personalidad, con CTA
final hacia el Master Blender.

## Cómo funciona el resultado

1. **Datos del consumidor** (nombre, email, tel, edad, género) al inicio.
2. **Segmentación demográfica** → define el *pool de blends elegibles* según
   edad + sexo (de la presentación de perfiles).
3. **Quiz** de 5–7 preguntas (≥2 Montaña + ≥3 Lifestyle, <7 min). Cada opción
   suma a una personalidad.
4. **Resultado**: gana la personalidad mejor rankeada **que esté dentro del pool
   elegible**. Si la #1 no aplica al perfil pero la #2 sí, sale la #2.

### Los 7 blends

| Blend | Sabor | Personalidad | Sexo | Edad |
|---|---|---|---|---|
| MELLOW | Vainilla | ☕ Contemplativo | Mujer | 25–45 |
| NATIVE | Natural | 🌲 Nativo | Ambos | 18–45 |
| HAZEL | Chocolate | 🍫 Indulgente | Ambos | 18–30 |
| BLOSSOM | Cherry | 🌹 Romántico | Mujer | 18–28 |
| VID | Uva | 🍷 Sommelier | Ambos | 28+ |
| MINE | Menta | 🎉 Fiestero | Ambos | <30 |
| AMERICAN | Americano | 🥃 Curador | Masculino | 30+ |

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind v4 · Supabase (leads).

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
```

La app funciona sin Supabase (los leads se loguean en consola, no se persisten).

## Supabase (leads)

1. Crear proyecto en supabase.com.
2. SQL Editor → ejecutar `supabase/schema.sql`.
3. Copiar `.env.example` a `.env.local` y completar `NEXT_PUBLIC_SUPABASE_URL` y
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Settings → API).
4. Reiniciar `npm run dev`. Los leads se guardan en la tabla `leads`.

## Estructura

```
src/lib/
  blends.ts      # 7 blends + segmentación demográfica
  questions.ts   # banco Montaña (29) + Lifestyle (10)
  engine.ts      # selección de preguntas + scoring + resultado
  supabase.ts    # cliente (degrada si no hay credenciales)
src/components/
  BlendQuiz.tsx  # máquina de estados: welcome → lead → quiz → result
  Welcome / LeadForm / Quiz / Result
src/app/api/leads/route.ts   # POST guarda lead + resultado
```

## Deploy

Vercel: importar el repo, cargar las dos env vars, deploy. Acceder desde la
tablet del stand por navegador.
