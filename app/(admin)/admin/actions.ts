"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function signIn(formData: FormData) {
  if (!isSupabaseConfigured()) redirect("/admin/login");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  });
  if (error) redirect("/admin/login?error=1");
  redirect("/admin");
}

export async function signOut() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}

export async function saveLog(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  const titleEs = String(formData.get("title_es") ?? "").trim();
  const type = formData.get("type") === "story" ? "story" : "log";
  const published = formData.get("published") === "on";

    // video upload for story-type logs
  let videoUrl = String(formData.get("video_url") ?? "").trim() || null;
  const file = formData.get("video");
  if (file instanceof File && file.size > 0) {
    const ext = file.name.split(".").pop() ?? "mp4";
    const path = `logs/${crypto.randomUUID()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("stories-media")
      .upload(path, file, { contentType: file.type });
    if (upErr) redirect("/admin/logs?error=1");
    const { data } = supabase.storage.from("stories-media").getPublicUrl(path);
    videoUrl = data.publicUrl;
  }

  const row = {
    slug: String(formData.get("slug") ?? "").trim() || slugify(titleEs),
    type,
    title_es: titleEs,
    title_en: String(formData.get("title_en") ?? "").trim() || titleEs,
    excerpt_es: String(formData.get("excerpt_es") ?? "").trim() || null,
    excerpt_en: String(formData.get("excerpt_en") ?? "").trim() || null,
    content_es: String(formData.get("content_es") ?? ""),
    content_en: String(formData.get("content_en") ?? ""),
    category: String(formData.get("category") ?? "general").trim(),
    video_url: type === "story" ? videoUrl : null,
    thumbnail_url: String(formData.get("thumbnail_url") ?? "").trim() || null,
    platform: String(formData.get("platform") ?? "web").trim(),
    external_link: String(formData.get("external_link") ?? "").trim() || null,
    position: Number(formData.get("position") ?? 0),
    published,
    published_at: published ? new Date().toISOString() : null,
  };

  if (type === "story" && !row.video_url) {
    redirect(`/admin/logs${id ? `/${id}` : "/new"}?error=1`);
  }

  const { error } = id
    ? await supabase.from("logs").update(row).eq("id", id)
    : await supabase.from("logs").insert(row);

  if (error) redirect(`/admin/logs${id ? `/${id}` : "/new"}?error=1`);
  revalidatePath("/admin/logs");
  redirect("/admin/logs");
}

export async function deleteLog(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("logs").delete().eq("id", String(formData.get("id")));
  revalidatePath("/admin/logs");
  redirect("/admin/logs");
}
