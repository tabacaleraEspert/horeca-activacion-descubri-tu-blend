-- Van Kiff · Descubrí tu Blend — tabla de leads
-- Ejecutar en el SQL Editor de Supabase.

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  nombre      text not null,
  email       text not null,
  telefono    text,
  edad        int  not null,
  genero      text,
  blend       text,        -- nombre comercial resultante (ej. AMERICAN)
  personalidad text        -- personalidad resultante (ej. El Curador)
);

-- RLS: permitir solo INSERT anónimo desde la app (sin lectura pública).
alter table public.leads enable row level security;

create policy "insert anon leads"
  on public.leads
  for insert
  to anon
  with check (true);

-- La lectura/exportación se hace desde el dashboard de Supabase (service role).
