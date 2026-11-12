import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import SupabaseNotice from "@/components/admin/SupabaseNotice";
import WindowFrame from "@/components/os/WindowFrame";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export default async function AdminPage() {
  if (!isSupabaseConfigured()) return <SupabaseNotice />;

  const supabase = await createClient();
  const [{ count: posts }, { count: stories }] = await Promise.all([
    supabase.from("logs_posts").select("*", { count: "exact", head: true }),
    supabase.from("logs_stories").select("*", { count: "exact", head: true }),
  ]);

  return (
    <AdminShell>
      <h1 className="font-pixel mb-6 text-[0.7rem] text-amber">PANEL</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <WindowFrame title="LOGS_POSTS.DB">
          <p className="font-term text-4xl text-fg">{posts ?? 0}</p>
          <p className="font-term text-lg text-dim">posts en la bitácora</p>
          <Link
            href="/admin/posts"
            className="font-term mt-3 inline-block text-lg text-amber underline decoration-dotted"
          >
            Gestionar →
          </Link>
        </WindowFrame>
        <WindowFrame title="LOGS_STORIES.DB" accent="phosphor">
          <p className="font-term text-4xl text-fg">{stories ?? 0}</p>
          <p className="font-term text-lg text-dim">stories publicadas</p>
          <Link
            href="/admin/stories"
            className="font-term mt-3 inline-block text-lg text-phosphor underline decoration-dotted"
          >
            Gestionar →
          </Link>
        </WindowFrame>
      </div>
    </AdminShell>
  );
}
