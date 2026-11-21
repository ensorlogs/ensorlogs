import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import SupabaseNotice from "@/components/admin/SupabaseNotice";
import { isSupabaseConfigured, requireAdmin } from "@/lib/supabase/server";
import { deleteProject } from "../actions";
import type { ProjectRow } from "@/lib/types";

export default async function ProjectsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (!isSupabaseConfigured()) return <SupabaseNotice />;
  const { error } = await searchParams;

  const supabase = await requireAdmin();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("position", { ascending: true });
  const projects = (data ?? []) as ProjectRow[];

  return (
    <AdminShell>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-pixel text-[0.7rem] text-amber">PROYECTOS</h1>
        <Link
          href="/admin/projects/new"
          className="font-pixel pixel-border-amber bg-amber px-3 py-2 text-[0.55rem] text-ink"
        >
          + NUEVO
        </Link>
      </div>

      {error && (
        <p className="font-term mb-4 text-lg text-alert">
          Error al guardar. Revisa los campos requeridos.
        </p>
      )}

      {projects.length === 0 ? (
        <p className="font-term text-xl text-dim">Sin proyectos todavía.</p>
      ) : (
        <ul className="space-y-3">
          {projects.map((p) => (
            <li
              key={p.id}
              className="pixel-border flex flex-wrap items-center justify-between gap-3 bg-panel p-4"
            >
              <div className="min-w-0">
                <p className="font-term truncate text-xl text-fg">{p.name}</p>
                <p className="font-term text-base text-dim">
                  /{p.slug} · pos {p.position} ·{" "}
                  {p.published ? (
                    <span className="text-phosphor">publicado</span>
                  ) : (
                    <span className="text-alert">oculto</span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/projects/${p.id}`}
                  className="font-term text-lg text-amber underline decoration-dotted"
                >
                  Editar
                </Link>
                <form action={deleteProject}>
                  <input type="hidden" name="id" value={p.id} />
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
