import type { Lead } from "./types";

// Cola offline de leads (kiosko sin wifi): si el POST falla por red, el lead
// queda en localStorage y se reintenta al arrancar la app o al volver la
// conexión. Nunca interrumpe la experiencia del evento.

const KEY = "vk-lead-queue";

export type LeadRecord = Lead & {
  blend: string;
  personalidad: string;
  ts: string;
};

function load(): LeadRecord[] {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function save(queue: LeadRecord[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(queue));
  } catch {
    /* sin storage no hay cola, pero el evento sigue */
  }
}

// true = listo (aceptado, o rechazado por datos inválidos: reintentar no ayuda)
async function post(record: LeadRecord): Promise<boolean> {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  });
  return res.ok || (res.status >= 400 && res.status < 500);
}

export async function submitLead(record: LeadRecord) {
  try {
    if (await post(record)) return;
  } catch {
    /* sin red */
  }
  save([...load(), record]);
}

let flushing = false;

export async function flushLeadQueue() {
  if (flushing) return;
  const queue = load();
  if (!queue.length) return;
  flushing = true;
  try {
    const pending: LeadRecord[] = [];
    for (const record of queue) {
      try {
        if (!(await post(record))) pending.push(record);
      } catch {
        pending.push(record);
      }
    }
    save(pending);
  } finally {
    flushing = false;
  }
}
