# ENSOR.LOGS — ensorlogs.com

Web personal estilo **retro 1-bit / pixel art**: portafolio, bitácora técnica
("Ensor Logs") y feed de stories verticales. Construida a mano con Next.js.

![stack](https://img.shields.io/badge/Next.js-16-black) ![ts](https://img.shields.io/badge/TypeScript-5-blue) ![tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS 4** — tema oscuro con acento ámbar neón
- **next-intl** — ES (raíz `/`) + EN (`/en`)
- **Supabase** — Postgres (`logs` unificada: texto + video), Storage (`stories-media`), Auth (`/admin`)
- **Brevo** — formulario de contacto (email transaccional + captura de leads)
- Despliegue objetivo: **Vercel** + dominio `ensorlogs.com`

## Desarrollo local

```bash
npm install
npm run dev        # http://localhost:3000
```

Sin credenciales el sitio funciona completo con **datos seed**
(`data/seed-logs.ts`): la web pública es 100% navegable y `/api/contact`
simula el envío (ver consola). `/admin` muestra el aviso de conexión.

### El concepto: todo es un LOG

Un solo feed de bitácora (`logs`): entradas de **texto** y **video logs**
(verticales, tipo reel) conviven en el mismo listado y comparten página de
detalle — el video arriba y debajo el "qué estaba haciendo" en Markdown.

Para activar el backend real, copia `.env.example` → `.env.local` y sigue
**DEPLOY.md**.

## Mapa del proyecto

```
app/(site)/[locale]/   Web pública ES/EN: /, /logs, /logs/[slug]
app/(admin)/admin/     Panel: login, CRUD de logs (texto y video)
app/api/contact/       Route handler → Brevo
components/hero/       RoomScene.tsx + room-zones.ts — ilustración real
                       (room-desktop.jpg / room-mobile.jpg) con hotspots
components/os/         RetroWindow (modal), WindowFrame (cards)
components/logs/       LogCard + LogFeed — feed vertical scroll-snap tipo TikTok
lib/data.ts            Capa de datos: Supabase si hay env, si no seed local
supabase/migrations/   0001_init.sql — tabla logs unificada + RLS + bucket
messages/              es.json / en.json
proxy.ts               i18n routing + guard de /admin (antes middleware.ts)
```

## Hotspots de la habitación

| Zona | Abre |
|---|---|
| Foto + persona + Schnauzer | Sobre mí / el equipo |
| Doble monitor + laptop | Servicios: dev, IA, sistemas |
| Rack servidor | Infraestructura / self-hosting |
| Sensores, puerta, cámara, bomba | Domótica & IoT (menú de servicios) |
| Switch + estantes | Zona personal |

Además hay **easter eggs** sin marcador (El Tigre, la ventana, Tux, el café):
solo tooltip al pasar el mouse o tocarlos.

Añadir/mover zonas: `components/hero/room-zones.ts` (coordenadas en % para
desktop y mobile). Textos: `messages/{es,en}.json` → `hotspots.<id>` y `eggs.<id>`.

## Scripts

```bash
npm run dev     # desarrollo
npm run build   # build de producción
npm run lint    # eslint
```
