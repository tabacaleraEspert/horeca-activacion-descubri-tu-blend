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
            "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0.78) 100%)",
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-end px-8 pb-[5vh] pt-[6vh] text-center text-white">
        <div className="flex flex-col items-center">
          {/* Título sobre el trofeo (zona más brillante del video): halo oscuro detrás */}
          <div className="relative flex flex-col items-center">
            <span aria-hidden className="vk-text-halo" />
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.32em" }}
              transition={{ delay: 0.3, duration: 1.1 }}
              className="mb-4 text-sm font-bold uppercase text-white sm:text-base"
              style={{
                textShadow:
                  "0 1px 2px rgba(0,0,0,0.9), 0 0 14px rgba(0,0,0,0.8)",
              }}
            >
              Premios Ídolo × Van Kiff
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.45,
                type: "spring",
                stiffness: 140,
                damping: 14,
              }}
              className="vk-gold whitespace-nowrap pt-[0.12em] font-display font-black uppercase leading-[0.95] tracking-tight"
              style={{ fontSize: "min(15vmin, 12.5vw, 8.5rem)" }}
            >
              ¿Qué blend
              <br />
              sos?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-5 max-w-md text-lg font-semibold text-white sm:text-xl"
              style={{
                textShadow:
                  "0 1px 2px rgba(0,0,0,0.9), 0 0 14px rgba(0,0,0,0.8)",
              }}
            >
              4 preguntas. 30 segundos. Tu sabor Van Kiff.
            </motion.p>
          </div>

          <motion.button
            onClick={onStart}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.15,
              type: "spring",
              stiffness: 200,
              damping: 16,
            }}
            whileTap={{ scale: 0.95 }}
            className="vk-pulse-gold mt-10 whitespace-nowrap rounded-full px-10 py-6 font-display text-xl min-[400px]:px-12 min-[400px]:text-2xl font-black uppercase tracking-wide text-black sm:text-3xl"
            style={{
              background:
                "linear-gradient(135deg, #fff3b0 0%, #f5c542 45%, #d18f1c 100%)",
            }}
          >
            Tengo +18 · Jugar
          </motion.button>

          <p className="mt-5 max-w-sm text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            Al tocar declarás ser mayor de 18 años
          </p>

          {/* Logo abajo, sobre la zona oscura: no compite con el trofeo del fondo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-[5vh] landscape:mt-[3vh]"
          >
            <span aria-hidden className="vk-text-halo" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo-art.png"
              alt="Van Kiff"
              className="w-[46vmin] max-w-[26rem] landscape:w-[30vmin]"
              style={{
                filter:
                  "drop-shadow(0 2px 2px rgba(0,0,0,0.9)) drop-shadow(0 6px 24px rgba(0,0,0,0.85))",
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
