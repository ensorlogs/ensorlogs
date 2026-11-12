# DEPLOY — ensorlogs.com

Checklist para conectar los servicios y desplegar. Orden recomendado.

## 1 · Supabase (base de datos, storage, auth)

1. Crea el proyecto en <https://supabase.com> → Project → New.
2. **SQL Editor** → pega y ejecuta `supabase/migrations/0001_init.sql`
   (crea `logs_posts`, `logs_stories`, políticas RLS y el bucket `stories-media`).
3. **Authentication → Users → Add user** → crea tu usuario admin
   (email + password; desmarca "auto confirm" si quieres confirmar por correo).
4. **Settings → API** → copia:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`
5. Prueba local: rellena `.env.local`, `npm run dev` → `/admin` debe pedir login.

> Los posts/stories seed dejan de mostrarse en cuanto Supabase está conectado —
> migra el contenido que quieras conservar creándolo desde `/admin`.

## 2 · Brevo (formulario de contacto)

1. Crea la cuenta en <https://brevo.com> → **SMTP & API → API Keys** → genera una
   → `BREVO_API_KEY`.
2. **Senders & IP** → verifica tu dominio `ensorlogs.com` (o usa el email de la
   cuenta mientras tanto) → `BREVO_SENDER_EMAIL`.
3. `CONTACT_TO_EMAIL` = el buzón donde quieres recibir los avisos.
4. (Opcional) **Contacts → Lists** → crea una lista "leads" y apunta su ID
   numérico en `BREVO_LIST_ID` para captar prospectos automáticamente.
5. Prueba local: envía el formulario y comprueba que llega el correo.

## 3 · GitHub

```bash
cd ensorlogswebsite
git remote add origin git@github.com:TU_USUARIO/ensorlogs-website.git
git push -u origin main
```

## 4 · Vercel

1. <https://vercel.com/new> → Import → elige el repo.
2. **Environment Variables** → añade todas las de `.env.example` +
   `SITE_URL=https://ensorlogs.com`.
3. Deploy → la primera build debe quedar verde en ~1 min.

## 5 · Dominio

1. **Vercel → Settings → Domains** → añade `ensorlogs.com` y `www.ensorlogs.com`.
2. En tu registrador: registro `A` → `76.76.21.21` y `CNAME` `www` →
   `cname.vercel-dns.com` (o delega los nameservers a Vercel DNS).
3. SSL automático en minutos. Redirige `www` → apex si quieres.

## Verificación post-deploy

- [ ] `/` muestra la habitación y los 5 hotspots abren sus ventanas
- [ ] `/en` cambia todos los textos a inglés
- [ ] `/logs` lista los posts de Supabase (no los seed)
- [ ] `/admin` pide login → crear un post → aparece en `/logs`
- [ ] Subir un video en `/admin/stories` → aparece en `/stories`
- [ ] El formulario envía correo real vía Brevo
- [ ] `sitemap.xml` y `robots.txt` responden
