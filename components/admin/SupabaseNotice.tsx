import WindowFrame from "@/components/os/WindowFrame";

export default function SupabaseNotice() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <WindowFrame title="SETUP.REQUIRED" accent="phosphor" className="max-w-xl">
        <h1 className="font-pixel mb-4 text-[0.65rem] text-amber">
          Supabase no configurado
        </h1>
        <p className="font-term text-lg text-fg">
          El panel se activa cuando estas variables existen en{" "}
          <code className="text-phosphor">.env.local</code>:
        </p>
        <pre className="font-term mt-4 overflow-x-auto border-2 border-line bg-ink-2 p-3 text-base text-phosphor">
{`NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...`}
        </pre>
        <p className="font-term mt-4 text-base text-dim">
          Después ejecuta la migración en{" "}
          <code className="text-amber">supabase/migrations/0001_init.sql</code> y
          crea tu usuario en Authentication → Users. Ver DEPLOY.md.
        </p>
      </WindowFrame>
    </div>
  );
}
