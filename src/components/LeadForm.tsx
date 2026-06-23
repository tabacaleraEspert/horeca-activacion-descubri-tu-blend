"use client";

import { useState } from "react";
import type { Lead } from "@/lib/types";

export default function LeadForm({ onSubmit }: { onSubmit: (lead: Lead) => void }) {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [genero, setGenero] = useState<Lead["genero"] | "">("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const edadNum = Number(edad);
    if (!nombre.trim()) return setError("Ingresá tu nombre.");
    if (!Number.isFinite(edadNum) || edadNum < 18 || edadNum > 99)
      return setError("Ingresá una edad válida (18+).");
    if (!genero) return setError("Elegí una opción.");
    setError("");
    onSubmit({
      nombre: nombre.trim(),
      email: "",
      telefono: "",
      edad: edadNum,
      genero,
    });
  }

  const inputCls =
    "w-full rounded-xl border-2 border-white/20 bg-white/5 px-4 py-3 text-base font-medium text-white outline-none transition placeholder:text-white/40 focus:border-teal focus:bg-white/10";

  const generos: { v: Lead["genero"]; label: string }[] = [
    { v: "mujer", label: "Mujer" },
    { v: "hombre", label: "Hombre" },
    { v: "otro", label: "Prefiero no decir" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="vk-rise relative z-10 mx-auto w-full max-w-md px-6 text-white"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/wordmark.png"
        alt="Van Kiff"
        className="mx-auto mb-8 w-40 opacity-90"
      />

      <h2 className="font-display text-4xl font-black uppercase tracking-tight">
        Antes de
        <br />
        <span className="text-teal">empezar</span>
      </h2>
      <p className="mb-7 mt-3 text-sm font-medium text-white/55">
        Solo unos datos para armar tu resultado.
      </p>

      <div className="space-y-3.5">
        <input
          className={inputCls}
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          autoComplete="given-name"
        />
        <input
          className={inputCls}
          placeholder="Edad"
          type="number"
          inputMode="numeric"
          min={18}
          max={99}
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />

        <div>
          <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-white/55">
            Género
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {generos.map((g) => (
              <button
                type="button"
                key={g.v}
                onClick={() => setGenero(g.v)}
                className={`rounded-xl border-2 px-2 py-3 text-xs font-bold uppercase leading-tight tracking-wide transition ${
                  genero === g.v
                    ? "border-white bg-teal text-ink shadow-[3px_3px_0_0_rgba(0,0,0,0.5)]"
                    : "border-white/25 bg-white/5 text-white/75 hover:border-white/50"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-4 text-center text-sm font-semibold text-orange">{error}</p>
      )}

      <button
        type="submit"
        className="vk-sticker mt-7 w-full rounded-full bg-teal py-4 font-display text-lg font-extrabold uppercase tracking-wide text-ink"
        style={{ borderColor: "#fff", boxShadow: "5px 5px 0 0 rgba(0,0,0,0.5)" }}
      >
        Empezar el quiz
      </button>
    </form>
  );
}
