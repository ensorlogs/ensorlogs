<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project notes — ensorlogs.com

Personal brand site: retro 1-bit / pixel-art aesthetic, dark theme, amber accent.

- `npm run dev` / `npm run build` / `npm run lint` — verify changes with build + lint.
- **Next 16 specifics**: `proxy.ts` (not middleware.ts), `params`/`searchParams` are awaited Promises, `cacheComponents` is disabled in `next.config.ts`.
- **Multiple root layouts**: `app/(site)/[locale]/layout.tsx` and `app/(admin)/admin/layout.tsx` each render `<html>` — there is intentionally NO `app/layout.tsx`.
- **i18n**: next-intl, locales `es` (default, no URL prefix) + `en` (`/en`). Texts live in `messages/{es,en}.json`.
- **Data layer**: `lib/data.ts` returns seed data (`data/seed-*.ts`) until `NEXT_PUBLIC_SUPABASE_URL` exists, then reads Supabase. Posts/stories use `_es`/`_en` columns localized by locale.
- **Admin** `/admin`: Supabase Auth guard in `proxy.ts` → `lib/supabase/session.ts`. Without env vars it renders `SupabaseNotice`.
- **Brevo**: `app/api/contact/route.ts` simulates sends when `BREVO_API_KEY` is unset.
- New hotspot: id in `components/hero/hotspots.ts` + SVG zone in `Room.tsx` + `hotspots.<id>` strings in both message files.
