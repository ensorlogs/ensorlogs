import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import SupabaseNotice from "@/components/admin/SupabaseNotice";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { deletePost } from "../actions";
import type { PostRow } from "@/lib/types";

export default async function PostsAdminPage() {
  if (!isSupabaseConfigured()) return <SupabaseNotice />;

  const supabase = await createClient();
  const { data } = await supabase
    .from("logs_posts")
    .select("*")
    .order("created_at", { ascending: false });
  const posts = (data ?? []) as PostRow[];

  return (
    <AdminShell>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-pixel text-[0.7rem] text-amber">POSTS</h1>
        <Link
          href="/admin/posts/new"
          className="font-pixel pixel-border-amber bg-amber px-3 py-2 text-[0.55rem] text-ink"
        >
          + NUEVO
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="font-term text-xl text-dim">Sin posts todavía.</p>
      ) : (
        <ul className="space-y-3">
          {posts.map((post) => (
            <li
              key={post.id}
              className="pixel-border flex flex-wrap items-center justify-between gap-3 bg-panel p-4"
            >
              <div className="min-w-0">
                <p className="font-term truncate text-xl text-fg">
                  {post.title_es}
                </p>
                <p className="font-term text-base text-dim">
                  /{post.slug} · #{post.category} ·{" "}
                  {post.published ? (
                    <span className="text-phosphor">publicado</span>
                  ) : (
                    <span className="text-alert">borrador</span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="font-term text-lg text-amber underline decoration-dotted"
                >
                  Editar
                </Link>
                <form action={deletePost}>
                  <input type="hidden" name="id" value={post.id} />
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
