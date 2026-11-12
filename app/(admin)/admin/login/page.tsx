import WindowFrame from "@/components/os/WindowFrame";
import SupabaseNotice from "@/components/admin/SupabaseNotice";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { signIn } from "../actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (!isSupabaseConfigured()) return <SupabaseNotice />;
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <WindowFrame title="ADMIN.LOGIN" className="w-full max-w-sm">
        <h1 className="font-pixel mb-6 text-center text-[0.6rem] text-amber">
          ENSOR.LOGS — ACCESO
        </h1>
        <form action={signIn} className="space-y-4">
          <label className="font-term block text-lg text-dim">
            Email
            <input
              name="email"
              type="email"
              required
              className="font-term mt-1 w-full border-2 border-line bg-ink-2 px-3 py-2 text-lg text-fg outline-none focus:border-amber"
            />
          </label>
          <label className="font-term block text-lg text-dim">
            Password
            <input
              name="password"
              type="password"
              required
              className="font-term mt-1 w-full border-2 border-line bg-ink-2 px-3 py-2 text-lg text-fg outline-none focus:border-amber"
            />
          </label>
          {error && (
            <p className="font-term text-lg text-alert">
              Credenciales incorrectas.
            </p>
          )}
          <button
            type="submit"
            className="font-pixel pixel-border-amber w-full bg-amber px-4 py-3 text-[0.6rem] text-ink"
          >
            ENTRAR →
          </button>
        </form>
      </WindowFrame>
    </div>
  );
}
