# ENSOR.LOGS — ensorlogs.com

Web personal estilo **retro 1-bit / pixel art**: portafolio, bitácora técnica
("Ensor Logs") y feed de stories verticales. Construida a mano con Next.js.

![stack](https://img.shields.io/badge/Next.js-16-black) ![ts](https://img.shields.io/badge/TypeScript-5-blue) ![tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS 4** — tema oscuro con acento ámbar neón
- **next-intl** — ES (raíz `/`) + EN (`/en`)
- **Supabase** — Postgres (`logs_posts`, `logs_stories`), Storage (`stories-media`), Auth (`/admin`)
- **Brevo** — formulario de contacto (email transaccional + captura de leads)
- Despliegue objetivo: **Vercel** + dominio `ensorlogs.com`

## Desarrollo local

```bash
npm install
npm run dev        # http://localhost:3000
```

Sin credenciales el sitio funciona completo con **datos seed**
(`data/seed-*.ts`): la web pública es 100% navegable y `/api/contact`
simula el envío (ver consola). `/admin` muestra el aviso de conexión.

Para activar el backend real, copia `.env.example` → `.env.local` y sigue
**DEPLOY.md**.

## Mapa del proyecto

```
app/(site)/[locale]/   Web pública ES/EN: /, /logs, /logs/[slug], /stories
app/(admin)/admin/     Panel: login, CRUD posts, subida de stories
app/api/contact/       Route handler → Brevo
components/hero/       Room.tsx — habitación pixel art SVG + hotspots
components/os/         RetroWindow (modal), WindowFrame (cards)
components/stories/    StoryFeed — feed vertical scroll-snap tipo TikTok
lib/data.ts            Capa de datos: Supabase si hay env, si no seed local
supabase/migrations/   0001_init.sql — tablas + RLS + bucket
messages/              es.json / en.json
proxy.ts               i18n routing + guard de /admin (antes middleware.ts)
```

## Hotspots de la habitación

| Zona | Abre |
|---|---|
| Cuadro familiar | Sobre mí / filosofía |
| Doble monitor | Servicios de desarrollo |
| Rack servidor | Domótica / Home Assistant |
| Puerta + sensores + bombas | IoT / Construtech |
| Switch + banderín Red Sox | Ocio |

Añadir uno nuevo: nuevo `id` en `components/hero/hotspots.ts`, zona SVG en
`Room.tsx`, y sus textos en `messages/{es,en}.json` → `hotspots.<id>`.

## Scripts

```bash
npm run dev     # desarrollo
npm run build   # build de producción
npm run lint    # eslint
```
