"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { useMemo } from "react";
import type { Blend, Lead } from "@/lib/types";

const PackageReveal = dynamic(() => import("./three/PackageReveal"), {
  ssr: false,
});

export default function Result({
  blend,
  nombre,
  genero,
  onRestart,
}: {
  blend: Blend;
  nombre: string;
  genero: Lead["genero"];
  onRestart: () => void;
}) {
  const bg = useMemo(() => {
    if (!blend.bgs.length) return null;
    return blend.bgs[Math.floor(Math.random() * blend.bgs.length)];
  }, [blend]);

  const personality =
    genero === "mujer" ? blend.personalityF : blend.personality;

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Fondo */}
      {bg ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bg}
            alt=""
            className="vk-kenburns absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 28%, rgba(8,8,10,0.94) 78%)",
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

      {/* Reveal WebGL del paquete (arriba) */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <PackageReveal pkg={blend.pkg} color={blend.color} yOffset={2.4} />
      </div>

      {/* Contenido: centrado en la mitad inferior para usar el espacio */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end overflow-y-auto px-5 pb-7 pt-[38vh]">
        <div className="mx-auto w-full max-w-2xl text-center text-white">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.45, duration: 0.5 }}
            className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/70 sm:text-sm"
          >
            {nombre ? `${nombre}, tu blend es` : "Tu blend es"}
          </motion.p>

          {/* SABOR / BLEND — lo más grande */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.84, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.5, type: "spring", stiffness: 170, damping: 15 }}
            className="font-display font-black uppercase leading-[0.85] tracking-tight"
            style={{
              fontSize: "clamp(4rem, 19vw, 11rem)",
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
            className="mt-2 font-display font-extrabold uppercase tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 7vw, 3.25rem)", color: blend.color }}
          >
            sos {personality}
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
            className="mx-auto mt-4 max-w-md text-[13px] leading-relaxed text-white/80"
          >
            {blend.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.35, duration: 0.5 }}
            className="mt-6"
          >
            <div className="inline-flex flex-col items-center rounded-3xl bg-white px-7 py-4 text-ink shadow-[0_14px_50px_rgba(0,0,0,0.45)]">
              <span className="font-display text-sm font-black uppercase tracking-wide">
                Acercate al Master Blender 🔥
              </span>
              <span className="mt-0.5 text-[12px] font-semibold text-ink/60">
                Probá tu sabor y descubrí los demás
              </span>
            </div>

            <div>
              <button
                onClick={onRestart}
                className="mt-4 rounded-full border border-white/30 px-7 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 active:scale-95"
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
