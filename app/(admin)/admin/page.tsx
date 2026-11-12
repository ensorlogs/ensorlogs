import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import SupabaseNotice from "@/components/admin/SupabaseNotice";
import WindowFrame from "@/components/os/WindowFrame";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export default async function AdminPage() {
  if (!isSupabaseConfigured()) return <SupabaseNotice />;

  const supabase = await createClient();
  const [{ count: logs }, { count: videos }] = await Promise.all([
    supabase
      .from("logs")
      .select("*", { count: "exact", head: true })
      .eq("type", "log"),
    supabase
      .from("logs")
      .select("*", { count: "exact", head: true })
      .eq("type", "story"),
  ]);

  return (
    <AdminShell>
      <h1 className="font-pixel mb-6 text-[0.7rem] text-amber">PANEL</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <WindowFrame title="LOGS.DB">
          <p className="font-term text-4xl text-fg">{logs ?? 0}</p>
          <p className="font-term text-lg text-dim">logs de texto</p>
          <Link
            href="/admin/logs"
            className="font-term mt-3 inline-block text-lg text-amber underline decoration-dotted"
          >
            Gestionar →
          </Link>
        </WindowFrame>
        <WindowFrame title="VIDEOLOGS.DB" accent="phosphor">
          <p className="font-term text-4xl text-fg">{videos ?? 0}</p>
          <p className="font-term text-lg text-dim">video logs (feed vertical)</p>
          <Link
            href="/admin/logs"
            className="font-term mt-3 inline-block text-lg text-phosphor underline decoration-dotted"
          >
            Gestionar →
          </Link>
        </WindowFrame>
      </div>
    </AdminShell>
  );
}
