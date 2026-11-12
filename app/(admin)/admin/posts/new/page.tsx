import AdminShell from "@/components/admin/AdminShell";
import SupabaseNotice from "@/components/admin/SupabaseNotice";
import PostForm from "@/components/admin/PostForm";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export default async function NewPostPage() {
  if (!isSupabaseConfigured()) return <SupabaseNotice />;

  return (
    <AdminShell>
      <h1 className="font-pixel mb-6 text-[0.7rem] text-amber">NUEVO POST</h1>
      <PostForm />
    </AdminShell>
  );
}
