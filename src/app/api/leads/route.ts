import { NextResponse } from "next/server";
import { supabase, supabaseEnabled } from "@/lib/supabase";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const nombre = String(b.nombre ?? "").trim();
  const email = String(b.email ?? "").trim();
  const telefono = String(b.telefono ?? "").trim();
  const edad = Number(b.edad);
  const genero = String(b.genero ?? "");
  const blend = String(b.blend ?? "");
  const personalidad = String(b.personalidad ?? "");

  if (!nombre || !Number.isFinite(edad)) {
    return NextResponse.json(
      { ok: false, error: "Faltan datos obligatorios" },
      { status: 400 }
    );
  }

  const record = { nombre, email, telefono, edad, genero, blend, personalidad };

  // Sin Supabase configurado: no rompemos la experiencia del evento.
  if (!supabaseEnabled || !supabase) {
    console.warn("[leads] Supabase no configurado — lead no persistido:", record);
    return NextResponse.json({ ok: true, persisted: false });
  }

  const { error } = await supabase.from("leads").insert(record);
  if (error) {
    console.error("[leads] error al insertar:", error.message);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, persisted: true });
}
