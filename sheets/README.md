# Leads → Google Sheet (sin Supabase)

Los leads del quiz se guardan en una Google Sheet tuya, vía un Web App de Apps Script.
No requiere credenciales ni librerías en la app.

## Setup (una vez, ~5 min)

1. **Crear la Sheet**: andá a https://sheets.new (queda en tu Drive). Nombrala p.ej. `Van Kiff — Leads`.
2. **Apps Script**: en la Sheet → menú **Extensiones → Apps Script**.
3. Borrá el contenido y **pegá todo `Code.gs`** de esta carpeta. Guardá (💾).
4. **Implementar**: botón azul **Implementar → Nueva implementación**.
   - Engranaje → tipo **Aplicación web**.
   - **Ejecutar como:** Yo (tu cuenta).
   - **Quién tiene acceso:** Cualquier usuario.
   - Implementar → autorizá los permisos (es tu propia cuenta).
5. Copiá la **URL del Web App** (termina en `/exec`).
6. **Probala** pegándola en el navegador: debe responder `{"ok":true,"msg":"...activo"}`.

## Conectar la app

La env var `SHEETS_WEBHOOK_URL` debe tener esa URL `/exec`.

- **Local** (`.env.local`):
  ```
  SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfy.../exec
  ```
- **Azure** (cuando se deploye):
  ```bash
  az webapp config appsettings set -g descubri-tu-blend-rg -n descubri-tu-blend \
    --settings SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/AKfy.../exec"
  ```

Si la var no está, la app **no se rompe**: el quiz funciona igual, solo no persiste el lead
(lo loguea en consola). Así el evento nunca se cae por un problema de red/Sheets.

## Notas

- La hoja `Leads` se crea sola con encabezados la primera vez.
- Cada cambio en `Code.gs` requiere **Implementar → Administrar implementaciones → editar → Nueva versión**
  (la URL `/exec` se mantiene).
