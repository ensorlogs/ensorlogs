import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import SupabaseNotice from "@/components/admin/SupabaseNotice";
import ProjectForm from "@/components/admin/ProjectForm";
import { isSupabaseConfigured, requireAdmin } from "@/lib/supabase/server";
import type { ProjectRow } from "@/lib/types";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!isSupabaseConfigured()) return <SupabaseNotice />;
  const { id } = await params;

  const supabase = await requireAdmin();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  return (
    <AdminShell>
      <h1 className="font-pixel mb-6 text-[0.7rem] text-amber">
        EDITAR PROYECTO
      </h1>
      <ProjectForm project={data as ProjectRow} />
    </AdminShell>
  );
}
