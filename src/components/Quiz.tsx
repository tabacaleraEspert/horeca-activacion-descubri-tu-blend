"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { useMemo, useState } from "react";
import { ALL_BLENDS } from "@/lib/blends";
import type { GameConfig, Option, Question, QuestionCategory } from "@/lib/types";

// Todos los fondos de arte disponibles (Drive).
const ALL_BGS = ALL_BLENDS.flatMap((b) => b.bgs);

const CATEGORY_LABEL: Record<QuestionCategory, string> = {
  montana: "Montaña",
  lifestyle: "La vida misma",
  idolo: "Premios Ídolo",
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const list: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.5, staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 22 },
  },
};

export default function Quiz({
  game,
  questions,
  onComplete,
}: {
  game: GameConfig;
  questions: Question[];
  onComplete: (answers: Option[]) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Option[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  // un fondo distinto por pregunta (orden aleatorio por sesión)
  const bgs = useMemo(() => {
    const pool = game.quizBgs ?? ALL_BGS;
    return pool.length ? shuffle(pool) : [];
  }, [game.quizBgs]);
  const q = questions[idx];
  const hasImages = q.options.some((o) => o.image);
  const bg = bgs.length ? bgs[idx % bgs.length] : null;
  const progress = ((idx + (selected !== null ? 1 : 0)) / questions.length) * 100;

  function choose(optIndex: number) {
    if (selected !== null) return;
    setSelected(optIndex);
    const nextAnswers = [...answers, q.options[optIndex]];
    setTimeout(() => {
      if (idx + 1 < questions.length) {
        setAnswers(nextAnswers);
        setIdx(idx + 1);
        setSelected(null);
      } else {
        onComplete(nextAnswers);
      }
    }, 360);
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ "--accent": game.accent } as React.CSSProperties}
    >
      {/* Fondo de arte por pregunta */}
      <AnimatePresence mode="popLayout">
        {bg && (
          <motion.img
            key={bg}
            src={bg}
            alt=""
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.12 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.6 }, scale: { duration: 8, ease: "linear" } }}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
          />
        )}
      </AnimatePresence>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 50% 52%, rgba(6,8,14,0.5) 0%, rgba(6,8,14,0.18) 100%)",
        }}
      />

      {/* Contenido */}
      <div className="absolute inset-0 z-10 flex overflow-y-auto py-10 landscape:py-6">
        <div className="m-auto w-full max-w-2xl px-6 text-white landscape:max-w-4xl">
          {/* progreso */}
          <div className="relative mb-8 landscape:mb-5">
            <span aria-hidden className="vk-text-halo" />
            <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-[0.25em]">
              <span className="text-white">
                {CATEGORY_LABEL[q.category]}
              </span>
              <span className="text-white/85">
                {idx + 1}/{questions.length}
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full border-2 border-white bg-black/50">
              <div
                className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={q.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.22 } }}
            >
              <motion.h2
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative mb-7 font-display text-4xl font-black uppercase leading-[1.02] tracking-tight landscape:mb-5 landscape:text-3xl"
                style={{
                  textShadow:
                    "0 2px 0 rgba(0,0,0,0.85), 0 0 18px rgba(0,0,0,0.9), 0 6px 32px rgba(0,0,0,0.7)",
                }}
              >
                <span aria-hidden className="vk-text-halo" />
                {q.text}
              </motion.h2>

              {hasImages ? (
                <motion.div
                  className={`grid grid-cols-2 gap-4 ${
                    q.options.length > 2
                      ? "landscape:grid-cols-4"
                      : "landscape:mx-auto landscape:max-w-xl"
                  }`}
                  variants={list}
                  initial="hidden"
                  animate="show"
                >
                  {q.options.map((opt, i) => {
                    const isSel = selected === i;
                    return (
                      <motion.button
                        key={i}
                        variants={item}
                        onClick={() => choose(i)}
                        disabled={selected !== null}
                        whileTap={{ scale: 0.96 }}
                        // Marco blanco grueso + sombra profunda: separa la foto del
                        // fondo (que también es foto y de tonos parecidos).
                        className={`group relative aspect-square overflow-hidden rounded-2xl border-4 text-left shadow-[0_14px_36px_rgba(0,0,0,0.7)] transition-[opacity,border-color] ${
                          isSel ? "border-[var(--accent)]" : "border-white"
                        } ${selected !== null && !isSel ? "opacity-40" : ""}`}
                      >
                        <img
                          src={opt.image}
                          alt={opt.text}
                          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ${
                            isSel ? "scale-105" : "group-hover:scale-105"
                          }`}
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(6,8,14,0.95) 0%, rgba(6,8,14,0.7) 26%, rgba(6,8,14,0.15) 52%, rgba(6,8,14,0) 65%)",
                          }}
                        />
                        <span
                          // grande y grueso: se lee a distancia en el totem
                          className={`absolute inset-x-0 bottom-0 px-4 pb-3.5 pt-8 font-display font-extrabold leading-[1.08] ${
                            isSel ? "text-[var(--accent)]" : "text-white"
                          }`}
                          style={{
                            fontSize: "clamp(1.05rem, 3.6vmin, 1.6rem)",
                            textShadow: "0 1px 2px rgba(0,0,0,0.9), 0 2px 14px rgba(0,0,0,0.85)",
                          }}
                        >
                          {opt.text}
                        </span>
                      </motion.button>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  className="space-y-3.5 landscape:mx-auto landscape:max-w-2xl"
                  variants={list}
                  initial="hidden"
                  animate="show"
                >
                  {q.options.map((opt, i) => {
                    const isSel = selected === i;
                    return (
                      <motion.button
                        key={i}
                        variants={item}
                        onClick={() => choose(i)}
                        disabled={selected !== null}
                        whileTap={{ scale: 0.97 }}
                        className={`w-full rounded-2xl border-2 px-6 py-5 text-left text-lg font-semibold transition-colors landscape:py-4 landscape:text-base ${
                          isSel
                            ? "border-white bg-[var(--accent)] text-ink shadow-[5px_5px_0_0_rgba(0,0,0,0.5)]"
                            : "border-white/80 bg-black/60 text-white shadow-[4px_4px_0_0_rgba(0,0,0,0.45)] hover:bg-black/70"
                        } ${selected !== null && !isSel ? "opacity-40" : ""}`}
                      >
                        {opt.text}
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
