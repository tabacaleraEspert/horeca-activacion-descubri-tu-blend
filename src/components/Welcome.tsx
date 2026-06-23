"use client";

export default function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <div className="vk-rise relative z-10 mx-auto flex max-w-xl flex-col items-center px-6 text-center text-white">
      {/* Logo de marca (reemplaza el texto VAN KIFF · Art Edition) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/logo-art.png"
        alt="Van Kiff · Art Edition"
        className="mb-9 w-56 sm:w-64"
      />

      <h1 className="font-display text-6xl font-black uppercase leading-[0.92] tracking-tight sm:text-7xl">
        Descubrí
        <br />
        tu <span className="text-teal">blend</span>
      </h1>

      <p className="mt-6 max-w-md text-base font-medium leading-relaxed text-white/65">
        Contestá unas preguntas sobre la montaña y tu forma de vivir. En menos de
        7 minutos sabés qué sabor Van Kiff sos.
      </p>

      <button
        onClick={onStart}
        className="vk-sticker mt-9 rounded-full bg-teal px-12 py-4 font-display text-lg font-extrabold uppercase tracking-wide text-ink"
        style={{ borderColor: "#fff", boxShadow: "5px 5px 0 0 rgba(0,0,0,0.5)" }}
      >
        Empezar
      </button>

      <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.25em] text-white/40">
        7 personalidades · 7 blends · 1 es el tuyo
      </p>
    </div>
  );
}
