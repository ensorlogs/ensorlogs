import AdminShell from "@/components/admin/AdminShell";
import SupabaseNotice from "@/components/admin/SupabaseNotice";
import ProjectForm from "@/components/admin/ProjectForm";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export default async function NewProjectPage() {
  if (!isSupabaseConfigured()) return <SupabaseNotice />;

  return (
    <AdminShell>
      <h1 className="font-pixel mb-6 text-[0.7rem] text-amber">
        NUEVO PROYECTO
      </h1>
      <ProjectForm />
    </AdminShell>
  );
}
