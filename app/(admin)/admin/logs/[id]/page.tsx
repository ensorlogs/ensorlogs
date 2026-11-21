import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import SupabaseNotice from "@/components/admin/SupabaseNotice";
import LogForm from "@/components/admin/LogForm";
import { isSupabaseConfigured, requireAdmin } from "@/lib/supabase/server";
import type { LogRow } from "@/lib/types";

export default async function EditLogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!isSupabaseConfigured()) return <SupabaseNotice />;
  const { id } = await params;

  const supabase = await requireAdmin();
  const { data } = await supabase
    .from("logs")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  return (
    <AdminShell>
      <h1 className="font-pixel mb-6 text-[0.7rem] text-amber">EDITAR LOG</h1>
      <LogForm log={data as LogRow} />
    </AdminShell>
  );
}
