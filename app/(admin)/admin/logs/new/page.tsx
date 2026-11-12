import AdminShell from "@/components/admin/AdminShell";
import SupabaseNotice from "@/components/admin/SupabaseNotice";
import LogForm from "@/components/admin/LogForm";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export default async function NewLogPage() {
  if (!isSupabaseConfigured()) return <SupabaseNotice />;

  return (
    <AdminShell>
      <h1 className="font-pixel mb-6 text-[0.7rem] text-amber">NUEVO LOG</h1>
      <LogForm />
    </AdminShell>
  );
}
