import { NextResponse } from "next/server";

// URL del Web App de Google Apps Script (ver supabase/../sheets/README).
// Se setea como env var; si falta, no rompemos la experiencia del evento.
const WEBHOOK = process.env.SHEETS_WEBHOOK_URL;

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

  // los leads encolados offline llegan tarde: respetar su timestamp original
  const clientTs = String(b.ts ?? "");
  const record = {
    ts: Number.isNaN(Date.parse(clientTs)) ? new Date().toISOString() : clientTs,
    nombre,
    email,
    telefono,
    edad,
    genero,
    blend,
    personalidad,
  };

  // Sin webhook configurado: no rompemos el evento, solo logueamos.
  if (!WEBHOOK) {
    console.warn("[leads] SHEETS_WEBHOOK_URL no configurado — lead no persistido:", record);
    return NextResponse.json({ ok: true, persisted: false });
  }

  try {
    // text/plain evita el preflight CORS de Apps Script; el body sigue siendo JSON.
    const res = await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(record),
    });
    if (!res.ok) {
      console.error("[leads] webhook respondió", res.status);
      return NextResponse.json({ ok: false, error: `webhook ${res.status}` }, { status: 502 });
    }
    return NextResponse.json({ ok: true, persisted: true });
  } catch (e) {
    console.error("[leads] error posteando al webhook:", e);
    return NextResponse.json({ ok: false, error: "webhook unreachable" }, { status: 502 });
  }
}
