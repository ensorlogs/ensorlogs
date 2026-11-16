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

