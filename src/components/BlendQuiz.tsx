"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { computeResult, selectQuestions } from "@/lib/engine";
import type { Lead, Option, Question, QuizResult } from "@/lib/types";
import AttractMode from "./AttractMode";
import LeadForm from "./LeadForm";
import Quiz from "./Quiz";
import Result from "./Result";
import Welcome from "./Welcome";

type Stage = "welcome" | "lead" | "quiz" | "result";

const IDLE_MS = 40000; // 40s sin tocar → modo atractor

export default function BlendQuiz() {
  const [stage, setStage] = useState<Stage>("welcome");
  const [lead, setLead] = useState<Lead | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [attract, setAttract] = useState(false);

  function startQuiz(l: Lead) {
    setLead(l);
    setQuestions(selectQuestions());
    setStage("quiz");
  }

  async function finishQuiz(answers: Option[]) {
    if (!lead) return;
    const r = computeResult(answers, lead);
    setResult(r);
    setStage("result");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lead,
          blend: r.blend.name,
          personalidad: r.blend.personality,
        }),
      });
    } catch {
      /* el evento no se interrumpe por la red */
    }
  }

  function restart() {
    setLead(null);
    setQuestions([]);
    setResult(null);
    setStage("welcome");
  }

  // Modo atractor: tras inactividad muestra el loop de marca y resetea al inicio.
  useEffect(() => {
    if (attract) return; // sin timer mientras corre el atractor
    let t: ReturnType<typeof setTimeout>;
    const arm = () => {
      clearTimeout(t);
      t = setTimeout(() => setAttract(true), IDLE_MS);
    };
    window.addEventListener("pointerdown", arm);
    window.addEventListener("keydown", arm);
    arm();
    return () => {
      clearTimeout(t);
      window.removeEventListener("pointerdown", arm);
      window.removeEventListener("keydown", arm);
    };
  }, [attract]);

  function dismissAttract() {
    setAttract(false);
    restart();
  }

  if (attract) {
    return <AttractMode onDismiss={dismissAttract} />;
  }

  if (stage === "result" && result) {
    return (
      <Result
        blend={result.blend}
        nombre={lead?.nombre ?? ""}
        genero={lead?.genero ?? "otro"}
        onRestart={restart}
      />
    );
  }

  return (
    <main
      className="relative flex min-h-dvh w-full items-center justify-center overflow-x-hidden py-12"
      style={{
        background:
          "radial-gradient(125% 90% at 50% 0%, #16222e 0%, #0c1017 55%, #08090d 100%)",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full"
        >
          {stage === "welcome" && <Welcome onStart={() => setStage("lead")} />}
          {stage === "lead" && <LeadForm onSubmit={startQuiz} />}
          {stage === "quiz" && <Quiz questions={questions} onComplete={finishQuiz} />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
