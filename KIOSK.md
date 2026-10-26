# Kiosco — Galaxy Tab S10 Lite

URL de la app: **https://horeca-blend-espert.azurewebsites.net**

## Opción recomendada: Fully Kiosk Browser (cubre kiosco + fullscreen + control remoto de la app)

La app estándar para kioscos web en Android. Licencia Plus: ~US$10 una sola vez por dispositivo.

1. Instalar **Fully Kiosk Browser** desde Play Store.
2. Start URL: `https://horeca-blend-espert.azurewebsites.net`
3. En Settings activar:
   - **Web Content** → Enable Service Workers ✔ (offline)
   - **Web Browsing** → deshabilitar pull-to-refresh y navegación con gestos
   - **Kiosk Mode (Plus)** → activar + **PIN de salida** → bloquea Home, Back, Recents, barra de estado. Nadie sale de la app sin el PIN.
   - **Device Management** → Keep Screen On ✔, Launch on Boot ✔, brillo fijo
   - **Remote Administration (Plus)** → "Enable Remote Admin" + "Remote Admin from Fully Cloud"
4. Control remoto de la app: entrar a **fully-kiosk.com** (Fully Cloud) con la cuenta → ver la pantalla, recargar la URL, reiniciar la app, cambiar ajustes, todo a distancia.

## Alternativa gratis: PWA + Anclar ventanas

1. Abrir la URL en Chrome → menú ⋮ → **"Agregar a pantalla de inicio"** (se instala como app, pantalla completa sin barra — el manifest ya está en modo `fullscreen`).
2. Abrir la app instalada.
3. Anclarla: Ajustes → **Seguridad y privacidad → Más ajustes de seguridad → Anclar ventanas** → activar + "Solicitar PIN antes de desanclar". Después: botón Recientes → ícono de la app → **Anclar**.

Limitación: el anclaje es menos robusto que Fully (sin arranque automático, sin remoto).

## Control remoto TOTAL de la tablet (ver/tocar la pantalla a distancia)

- **AnyDesk** (gratis): instalar AnyDesk + el plugin **AnyDesk control plugin (AD1)** de Samsung desde Play Store. En Ajustes de AnyDesk fijar contraseña de acceso desatendido. Desde tu PC entrás con el ID y controlás la tablet como si la tuvieras en la mano.
- Alternativa: TeamViewer Host + add-on Samsung (mismo esquema).

Para el día a día del evento alcanza con Fully Cloud (recargar app, ver estado); AnyDesk es para intervenir a fondo (cambiar wifi, actualizar, etc.).

## Ajustes de la tablet (una vez)

- Pantalla: brillo alto fijo, **tiempo de espera = nunca** (o dejarlo en manos de Fully), quitar bloqueo de pantalla.
- Sonido: silencio / No molestar.
- Wifi: la primera carga necesita internet (precachea ~15 MB); después funciona **100% sin red**.
- Los leads capturados sin wifi quedan guardados en la tablet y se envían solos cuando vuelve la conexión (no cerrar/limpiar datos de la app antes de reconectar).

## Checklist antes de cada evento

1. Con wifi: abrir la app, esperar ~30 s (precache completo), hacer un quiz de prueba.
2. Modo avión → recargar → hacer otro quiz de prueba: todo debe andar igual.
3. Volver a conectar wifi al final del día para que suban los leads pendientes.
