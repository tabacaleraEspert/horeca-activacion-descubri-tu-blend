"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { GameConfig } from "@/lib/types";

type Media = { type: "image" | "video"; src: string };

// Videos de marca del juego + fotos de arte como respaldo.
export default function AttractMode({
  media: { videos, images },
  onDismiss,
}: {
  media: GameConfig["attract"];
  onDismiss: () => void;
}) {
  const MEDIA = useMemo<Media[]>(
    () => [
      ...videos.map((src) => ({ type: "video" as const, src })),
      ...images.map((src) => ({ type: "image" as const, src })),
    ],
    [videos, images]
  );
  const [i, setI] = useState(0);
  const current = MEDIA[i] ?? null;

  const next = useCallback(() => {
    setI((p) => (MEDIA.length ? (p + 1) % MEDIA.length : 0));
  }, [MEDIA]);

  // imágenes: avanzan por tiempo. videos: avanzan al terminar (onEnded).
  useEffect(() => {
    if (!current || current.type !== "image") return;
    const t = setTimeout(next, 5200);
    return () => clearTimeout(t);
  }, [current, next]);

  useEffect(() => {
    const h = () => onDismiss();
    window.addEventListener("pointerdown", h);
    window.addEventListener("keydown", h);
    return () => {
      window.removeEventListener("pointerdown", h);
      window.removeEventListener("keydown", h);
    };
  }, [onDismiss]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-ink">
      <AnimatePresence>
        {current?.type === "video" ? (
          <motion.video
            key={current.src}
            src={current.src}
            autoPlay
            muted
            playsInline
            onEnded={next}
            onError={next}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : current ? (
          // eslint-disable-next-line jsx-a11y/alt-text
          <motion.img
            key={current.src}
            src={current.src}
            onError={next}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2 }, scale: { duration: 6, ease: "linear" } }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
      </AnimatePresence>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,9,13,0.5) 0%, rgba(8,9,13,0.25) 42%, rgba(8,9,13,0.82) 100%)",
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.04, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="font-display font-black uppercase leading-[0.95] tracking-[0.18em]"
          style={{
            fontSize: "clamp(2.75rem, 11vmin, 6rem)",
            textShadow: "0 6px 40px rgba(0,0,0,0.7)",
          }}
        >
          Tocá para
          <br />
          empezar
        </motion.p>
      </div>
    </div>
  );
}
