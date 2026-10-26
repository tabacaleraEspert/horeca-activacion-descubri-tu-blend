"use client";

import { motion } from "motion/react";
import { IDOLO_WELCOME_IMAGE, IDOLO_WELCOME_VIDEO } from "./assets";

// Bienvenida Premios Ídolo: video full-bleed + puerta 18+ obligatoria
// (producto de tabaco; no hay formulario que valide la edad).
export default function IdoloWelcome({ onStart }: { onStart: () => void }) {
  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <video
        src={IDOLO_WELCOME_VIDEO}
        poster={IDOLO_WELCOME_IMAGE}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.92) 100%)",
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-between px-8 pb-[9vh] pt-[7vh] text-center text-white">
        <motion.img
          src="/brand/logo-art.png"
          alt="Van Kiff"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-[34vmin] max-w-64"
        />

        <div className="flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.32em" }}
            transition={{ delay: 0.3, duration: 1.1 }}
            className="mb-4 text-sm font-bold uppercase text-white/80 sm:text-base"
          >
            Premios Ídolo × Van Kiff
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45, type: "spring", stiffness: 140, damping: 14 }}
            className="vk-gold pt-[0.12em] font-display font-black uppercase leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(3.5rem, 15vmin, 8.5rem)" }}
          >
            ¿Qué blend
            <br />
            sos?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-5 max-w-md text-lg font-medium text-white/80 sm:text-xl"
          >
            4 preguntas. 30 segundos. Tu sabor Van Kiff.
          </motion.p>

          <motion.button
            onClick={onStart}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, type: "spring", stiffness: 200, damping: 16 }}
            whileTap={{ scale: 0.95 }}
            className="vk-pulse-gold mt-10 rounded-full px-12 py-6 font-display text-2xl font-black uppercase tracking-wide text-black sm:text-3xl"
            style={{
              background: "linear-gradient(135deg, #fff3b0 0%, #f5c542 45%, #d18f1c 100%)",
            }}
          >
            Tengo +18 · Jugar
          </motion.button>

          <p className="mt-5 max-w-sm text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            Al tocar declarás ser mayor de 18 años
          </p>
        </div>
      </div>
    </div>
  );
}
