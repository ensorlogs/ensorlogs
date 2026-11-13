import WindowFrame from "@/components/os/WindowFrame";
import SupabaseNotice from "@/components/admin/SupabaseNotice";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { sendOtp, verifyOtp } from "../actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; sent?: string; code_error?: string; email?: string }>;
}) {
  if (!isSupabaseConfigured()) return <SupabaseNotice />;
  const { error, sent, code_error, email } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <WindowFrame title="ADMIN.LOGIN" className="w-full max-w-sm">
        <h1 className="font-pixel mb-6 text-center text-[0.6rem] text-amber">
          ENSOR.LOGS — ACCESO
        </h1>
        {sent ? (
          <form action={verifyOtp} className="space-y-4">
            <input type="hidden" name="email" value={email ?? ""} />
            <p className="font-term text-lg text-dim">
              Código enviado a <span className="text-amber">{email}</span>.
              Revisa tu correo (y spam).
            </p>
            <label className="font-term block text-lg text-dim">
              Código de 6 dígitos
              <input
                name="token"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={6}
                required
                className="font-term mt-1 w-full border-2 border-line bg-ink-2 px-3 py-2 text-lg tracking-[0.4em] text-fg outline-none focus:border-amber"
              />
            </label>
            {code_error && (
              <p className="font-term text-lg text-alert">
                Código incorrecto o expirado.
              </p>
            )}
            <button
              type="submit"
              className="font-pixel pixel-border-amber w-full bg-amber px-4 py-3 text-[0.6rem] text-ink"
            >
              ENTRAR →
            </button>
          </form>
        ) : (
          <form action={sendOtp} className="space-y-4">
            <label className="font-term block text-lg text-dim">
              Email
              <input
                name="email"
                type="email"
                required
                className="font-term mt-1 w-full border-2 border-line bg-ink-2 px-3 py-2 text-lg text-fg outline-none focus:border-amber"
              />
            </label>
            <p className="font-term text-sm text-dim/70">
              Te enviaremos un código de acceso a tu correo.
            </p>
            {error && (
              <p className="font-term text-lg text-alert">
                No se pudo enviar el código. Verifica el email.
              </p>
            )}
            <button
              type="submit"
              className="font-pixel pixel-border-amber w-full bg-amber px-4 py-3 text-[0.6rem] text-ink"
            >
              ENVIAR CÓDIGO →
            </button>
          </form>
        )}
      </WindowFrame>
    </div>
  );
}
