"use client";

export default function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <div className="vk-rise relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center px-6 text-center text-white">
      {/* Logo de marca (reemplaza el texto VAN KIFF · Art Edition) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/logo-art.png"
        alt="Van Kiff · Art Edition"
        className="mb-9 w-64 landscape:mb-4 landscape:w-40"
      />

      <h1
        className="font-display font-black uppercase leading-[0.92] tracking-tight"
        style={{ fontSize: "clamp(3.25rem, 12.5vmin, 6rem)" }}
      >
        Descubrí
        <br />
        tu <span className="text-teal">blend</span>
      </h1>

      <p className="mt-6 max-w-lg text-lg font-medium leading-relaxed text-white/65 landscape:mt-3 landscape:max-w-md landscape:text-base">
        Contestá unas preguntas sobre la montaña y tu forma de vivir. En menos de
        7 minutos sabés qué sabor Van Kiff sos.
      </p>

      <button
        onClick={onStart}
        className="vk-sticker mt-9 rounded-full bg-teal px-14 py-5 font-display text-xl font-extrabold uppercase tracking-wide text-ink landscape:mt-5 landscape:px-12 landscape:py-4 landscape:text-lg"
        style={{ borderColor: "#fff", boxShadow: "5px 5px 0 0 rgba(0,0,0,0.5)" }}
      >
        Empezar
      </button>

      <p className="mt-7 text-xs font-bold uppercase tracking-[0.25em] text-white/40 landscape:mt-4 landscape:text-[11px]">
        7 personalidades · 7 blends · 1 es el tuyo
      </p>
    </div>
  );
}
