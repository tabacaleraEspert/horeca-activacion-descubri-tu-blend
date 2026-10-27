"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import type { Blend, GameConfig, Lead } from "@/lib/types";
// Import estático a propósito (kiosko offline): un chunk lazy que falle sin
// wifi rompe la pantalla de resultado. three.js va al bundle inicial y queda
// precacheado siempre. Result nunca se renderiza en SSR (stage inicial es
// "welcome"), así que el Canvas no corre en el server.
import PackageReveal from "./three/PackageReveal";

export default function Result({
  game,
  blend,
  nombre,
  genero,
  onRestart,
}: {
  game: GameConfig;
  blend: Blend;
  nombre: string;
  genero: Lead["genero"];
  onRestart: () => void;
}) {
  const video = game.result.video?.(blend) ?? null;
  const bg = useMemo(() => {
    const own = game.result.image?.(blend);
    if (own) return own;
    if (!blend.bgs.length) return null;
    return blend.bgs[Math.floor(Math.random() * blend.bgs.length)];
  }, [blend, game]);

  // En landscape (tablet apaisada) el paquete va a la izquierda y el texto a
  // la derecha; en portrait, paquete arriba y texto abajo.
  const [landscape, setLandscape] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(orientation: landscape)");
    const update = () => setLandscape(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const neutral = game.result.personality?.(blend);
  const personality =
    neutral ?? (genero === "mujer" ? blend.personalityF : blend.personality);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Fondo */}
      {video || bg ? (
        <>
          {video ? (
            <video
              src={video}
              poster={bg ?? undefined}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={bg!}
              alt=""
              className="vk-kenburns absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 30%, rgba(8,8,10,0.55) 55%, rgba(8,8,10,0.88) 85%)",
            }}
          />
        </>
      ) : (
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            background: `radial-gradient(125% 95% at 50% 16%, ${blend.color} 0%, ${blend.color}cc 36%, #0a0a0c 100%)`,
          }}
        >
          <div
            className="vk-orb"
            style={{
              width: "55vmax",
              height: "55vmax",
              left: "-15vmax",
              top: "-12vmax",
              background: blend.color,
              animation: "vk-float-a 16s ease-in-out infinite",
            }}
          />
          <div
            className="vk-orb"
            style={{
              width: "48vmax",
              height: "48vmax",
              left: "8vmax",
              bottom: "-22vmax",
              background: blend.color,
              animation: "vk-float-c 18s ease-in-out infinite",
            }}
          />
        </div>
      )}

      {/* Reveal WebGL del paquete (arriba en portrait, izquierda en landscape) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-full landscape:w-1/2">
        <PackageReveal
          pkg={blend.pkg}
          color={blend.color}
          yOffset={landscape ? 0.35 : 1.25}
        />
      </div>

      {/* Contenido: mitad inferior en portrait, mitad derecha en landscape */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end overflow-y-auto px-5 pb-14 pt-[45vh] landscape:left-1/2 landscape:justify-center landscape:px-8 landscape:pb-8 landscape:pt-8">
        {/* flex + items-center: si el nombre es más ancho que la columna, desborda
            parejo a ambos lados (centrado) en vez de solo a la derecha */}
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center text-white landscape:max-w-lg">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.45, duration: 0.5 }}
            className="text-lg font-bold uppercase tracking-[0.35em] text-white/85 sm:text-xl"
          >
            {nombre ? `${nombre}, tu blend es` : "Tu blend es"}
          </motion.p>

          {/* SABOR / BLEND — lo más grande */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.84, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.5, type: "spring", stiffness: 170, damping: 15 }}
            className="whitespace-nowrap font-display font-black uppercase leading-[0.85] tracking-tight"
            style={{
              // tope por ancho: "AMERICAN" (el más largo) debe entrar entero en
              // su columna (media pantalla en landscape); si no, desborda y se
              // ve descentrado
              fontSize: landscape
                ? "min(11.5vmin, 6.2vw, 6rem)"
                : "min(16vmin, 13vw, 9rem)",
              textShadow: "0 6px 40px rgba(0,0,0,0.6)",
            }}
          >
            {blend.name}
          </motion.h1>

          {/* PERSONALIDAD — segunda en importancia */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.85, duration: 0.5 }}
            className="mt-2 font-display font-extrabold uppercase tracking-tight text-white"
            style={{
              fontSize: "clamp(1.5rem, 6.5vmin, 3rem)",
              // Blanco para garantizar contraste; el color de marca queda como
              // glow detrás (el fondo puede ser del mismo tono del blend).
              textShadow: `0 0 22px ${blend.color}, 0 0 8px ${blend.color}, 0 2px 10px rgba(0,0,0,0.55)`,
            }}
          >
            {neutral ? personality : `sos ${personality}`}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.5 }}
            className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-white/55"
          >
            {blend.flavor}
          </motion.p>

          {/* EXPLICACIÓN — la más chica */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.15, duration: 0.5 }}
            className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/80"
          >
            {blend.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.35, duration: 0.5 }}
            className="mt-6"
          >
            <div className="inline-flex flex-col items-center rounded-3xl bg-white px-8 py-5 text-ink shadow-[0_14px_50px_rgba(0,0,0,0.45)]">
              <span className="font-display text-base font-black uppercase tracking-wide">
                {game.result.cta.title}
              </span>
              <span className="mt-0.5 text-[13px] font-semibold text-ink/60">
                {game.result.cta.subtitle}
              </span>
            </div>

            <div>
              <button
                onClick={onRestart}
                className="mt-4 rounded-full border border-white/30 px-8 py-3 text-base font-semibold text-white/80 transition hover:bg-white/10 active:scale-95"
              >
                Hacer otro perfil
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
