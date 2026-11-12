import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import SupabaseNotice from "@/components/admin/SupabaseNotice";
import PostForm from "@/components/admin/PostForm";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { PostRow } from "@/lib/types";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!isSupabaseConfigured()) return <SupabaseNotice />;
  const { id } = await params;

  const supabase = await createClient();
  const { data } = await supabase
    .from("logs_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  return (
    <AdminShell>
      <h1 className="font-pixel mb-6 text-[0.7rem] text-amber">EDITAR POST</h1>
      <PostForm post={data as PostRow} />
    </AdminShell>
  );
}
