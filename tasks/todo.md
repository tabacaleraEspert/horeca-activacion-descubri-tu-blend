# Juego 2 — "Descubrí tu Blend · Premios Ídolo"

Público: influencers / streamers. Objetivo: conocer la marca, NO datos. Totem, poco tiempo.

## Arquitectura
- Mismo repo, misma app Azure. `/` = blend actual (QRs impresos, intacto). `/idolo` = juego nuevo.
- `src/games/{blend,idolo}/config.ts`: preguntas, textos, fondos, `collectLead`, `numQuestions`, `idleMs`, media del atractor.
- `BlendQuiz` recibe `game` por prop. Motor, Quiz, Result, PackageReveal, kiosco/SW compartidos.
- Idolo: sin LeadForm → sin filtro edad/género → los 7 blends elegibles. `computeResult(answers, lead?)`.
- Puerta 18+ de un solo toque en la bienvenida (es producto de tabaco; reemplaza la validación que hacía el form).

## Juego
- 4 preguntas por partida (banco de 8, sorteo que cubra las 7 personalidades). Objetivo: menos de 60 s.
- Todas las preguntas con 4 opciones con imagen, tono humor/creator. Borrador de temas:
  1. Tu story perfecta es…
  2. Ganaste el Ídolo: ¿cómo festejás?
  3. Tu rider del camarín tiene sí o sí…
  4. Son las 3 am, ¿qué estás haciendo?
  5. Tu colab soñada es con…
  6. Te viralizás sin querer: ¿qué hacés?
  7. Tu emoji de cabecera
  8. Tu outfit para la alfombra roja
- Resultado: pantalla tipo "story" (9:16) con el blend + frase compartible → CTA "sacale foto y etiquetá @vankiff".
- Inactividad 20 s → vuelve al atractor.

## Visual (Higgsfield)
- Dirección: noche de premios, alfombra roja, flashes, neón, dorado + color del blend. Sin gente fumando, sin caras de influencers reales.
- Assets: 32 imágenes de opciones · 7 fondos de resultado (paquete en escena del blend) · 7 loops cortos de video de resultado · 1 loop para el atractor/bienvenida.
- Antes de generar: cotizar con la API y confirmar el gasto (saldo actual 527 créditos).
- Pipeline: generar → webp/mp4 comprimidos → `public/idolo/` → precache.

## Pasos
- [x] Refactor a configs por juego (blend sin cambios de comportamiento, verificado)
- [x] Ruta `/idolo` + config + preguntas
- [x] Cotizar Higgsfield → OK de Davor → generar → curar → optimizar
- [x] UI: bienvenida, quiz y resultado estilo premios
- [x] Build + prueba vertical 540×960 con Playwright (offline en tablet: pendiente en sitio)
- [ ] Deploy + QR de `/idolo`

## Revisión (2026-10-26)
- Higgsfield: 44 imágenes gpt_image_2_5 + 8 loops seedance_2_5 (≈357 créditos; quedan 170). Fuentes y scripts en `scripts/idolo/` (raw/ fuera de git).
- Loops: fundido final→inicio de 0,6 s (`loop.sh`), unión RMSE 0,17 → 0,03.
- SW v5: navegación cacheada por ruta (antes todo iba a "/" → offline /idolo mostraba Bariloche).
- `/` verificado igual que antes (captura).
