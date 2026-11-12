import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import SupabaseNotice from "@/components/admin/SupabaseNotice";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { deleteLog } from "../actions";
import type { LogRow } from "@/lib/types";

export default async function LogsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (!isSupabaseConfigured()) return <SupabaseNotice />;
  const { error } = await searchParams;

  const supabase = await createClient();
  const { data } = await supabase
    .from("logs")
    .select("*")
    .order("created_at", { ascending: false });
  const logs = (data ?? []) as LogRow[];

  return (
    <AdminShell>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-pixel text-[0.7rem] text-amber">LOGS</h1>
        <Link
          href="/admin/logs/new"
          className="font-pixel pixel-border-amber bg-amber px-3 py-2 text-[0.55rem] text-ink"
        >
          + NUEVO
        </Link>
      </div>

      {error && (
        <p className="font-term mb-4 text-lg text-alert">
          Error al guardar. Revisa los campos requeridos (los video logs
          necesitan un video).
        </p>
      )}

      {logs.length === 0 ? (
        <p className="font-term text-xl text-dim">Sin logs todavía.</p>
      ) : (
        <ul className="space-y-3">
          {logs.map((log) => (
            <li
              key={log.id}
              className="pixel-border flex flex-wrap items-center justify-between gap-3 bg-panel p-4"
            >
              <div className="min-w-0">
                <p className="font-term truncate text-xl text-fg">
                  {log.type === "story" && (
                    <span className="mr-2 text-amber">▶</span>
                  )}
                  {log.title_es}
                </p>
                <p className="font-term text-base text-dim">
                  /{log.slug} · #{log.category} ·{" "}
                  {log.published ? (
                    <span className="text-phosphor">publicado</span>
                  ) : (
                    <span className="text-alert">borrador</span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/logs/${log.id}`}
                  className="font-term text-lg text-amber underline decoration-dotted"
                >
                  Editar
                </Link>
                <form action={deleteLog}>
                  <input type="hidden" name="id" value={log.id} />
                  <button className="font-term text-lg text-alert hover:underline">
                    Borrar
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </AdminShell>
  );
}
