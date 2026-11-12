import AdminShell from "@/components/admin/AdminShell";
import SupabaseNotice from "@/components/admin/SupabaseNotice";
import WindowFrame from "@/components/os/WindowFrame";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { deleteStory, saveStory } from "../actions";
import type { StoryRow } from "@/lib/types";

const inputCls =
  "font-term mt-1 w-full border-2 border-line bg-ink-2 px-3 py-2 text-lg text-fg outline-none focus:border-amber";
const labelCls = "font-term block text-lg text-dim";

export default async function StoriesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (!isSupabaseConfigured()) return <SupabaseNotice />;
  const { error } = await searchParams;

  const supabase = await createClient();
  const { data } = await supabase
    .from("logs_stories")
    .select("*")
    .order("position", { ascending: true });
  const stories = (data ?? []) as StoryRow[];

  return (
    <AdminShell>
      <h1 className="font-pixel mb-6 text-[0.7rem] text-amber">STORIES</h1>

      {error && (
        <p className="font-term mb-4 text-lg text-alert">
          Error al guardar. Revisa el archivo y los campos requeridos.
        </p>
      )}

      <WindowFrame title="UPLOAD.STORY" accent="phosphor" className="mb-8">
        <form action={saveStory} className="grid gap-4 sm:grid-cols-2">
          <label className={labelCls}>
            Título (ES) *
            <input name="title_es" required className={inputCls} />
          </label>
          <label className={labelCls}>
            Título (EN)
            <input name="title_en" className={inputCls} />
          </label>
          <label className={labelCls}>
            Video (sube a Storage)
            <input
              name="video"
              type="file"
              accept="video/*"
              className={`${inputCls} file:font-term file:mr-3 file:border-0 file:bg-amber file:px-3 file:py-1 file:text-ink`}
            />
          </label>
          <label className={labelCls}>
            …o URL de video externa
            <input
              name="video_url"
              placeholder="https://…"
              className={inputCls}
            />
          </label>
          <label className={labelCls}>
            Plataforma
            <input name="platform" defaultValue="web" className={inputCls} />
          </label>
          <label className={labelCls}>
            Posición
            <input
              name="position"
              type="number"
              defaultValue={stories.length + 1}
              className={inputCls}
            />
          </label>
          <label className="font-term flex items-center gap-3 text-xl text-fg sm:col-span-2">
            <input
              type="checkbox"
              name="published"
              defaultChecked
              className="h-5 w-5 accent-amber"
            />
            Publicada
          </label>
          <button
            type="submit"
            className="font-pixel pixel-border-amber bg-amber px-5 py-3 text-[0.6rem] text-ink sm:col-span-2 sm:w-fit"
          >
            SUBIR →
          </button>
        </form>
      </WindowFrame>

      {stories.length === 0 ? (
        <p className="font-term text-xl text-dim">Sin stories todavía.</p>
      ) : (
        <ul className="space-y-3">
          {stories.map((story) => (
            <li
              key={story.id}
              className="pixel-border flex flex-wrap items-center justify-between gap-3 bg-panel p-4"
            >
              <div className="min-w-0">
                <p className="font-term truncate text-xl text-fg">
                  #{story.position} {story.title_es}
                </p>
                <p className="font-term truncate text-base text-dim">
                  {story.video_url} ·{" "}
                  {story.published ? (
                    <span className="text-phosphor">publicada</span>
                  ) : (
                    <span className="text-alert">oculta</span>
                  )}
                </p>
              </div>
              <form action={deleteStory}>
                <input type="hidden" name="id" value={story.id} />
                <button className="font-term text-lg text-alert hover:underline">
                  Borrar
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </AdminShell>
  );
}
