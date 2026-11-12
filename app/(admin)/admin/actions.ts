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

export async function savePost(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  const titleEs = String(formData.get("title_es") ?? "").trim();
  const published = formData.get("published") === "on";

  const row = {
    slug: String(formData.get("slug") ?? "").trim() || slugify(titleEs),
    title_es: titleEs,
    title_en: String(formData.get("title_en") ?? "").trim() || titleEs,
    excerpt_es: String(formData.get("excerpt_es") ?? "").trim() || null,
    excerpt_en: String(formData.get("excerpt_en") ?? "").trim() || null,
    content_es: String(formData.get("content_es") ?? ""),
    content_en: String(formData.get("content_en") ?? ""),
    category: String(formData.get("category") ?? "general").trim(),
    published,
    published_at: published ? new Date().toISOString() : null,
  };

  const { error } = id
    ? await supabase.from("logs_posts").update(row).eq("id", id)
    : await supabase.from("logs_posts").insert(row);

  if (error) redirect(`${id ? `/admin/posts/${id}` : "/admin/posts/new"}?error=1`);
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function deletePost(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("logs_posts").delete().eq("id", String(formData.get("id")));
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function saveStory(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  const file = formData.get("video");
  let videoUrl = String(formData.get("video_url") ?? "").trim();

  if (file instanceof File && file.size > 0) {
    const ext = file.name.split(".").pop() ?? "mp4";
    const path = `stories/${crypto.randomUUID()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("stories-media")
      .upload(path, file, { contentType: file.type });
    if (upErr) redirect("/admin/stories?error=1");
    const { data } = supabase.storage.from("stories-media").getPublicUrl(path);
    videoUrl = data.publicUrl;
  }

  if (!videoUrl) redirect("/admin/stories?error=1");

  const titleEs = String(formData.get("title_es") ?? "").trim();
  const row = {
    title_es: titleEs,
    title_en: String(formData.get("title_en") ?? "").trim() || titleEs,
    video_url: videoUrl,
    thumbnail_url: String(formData.get("thumbnail_url") ?? "").trim() || null,
    platform: String(formData.get("platform") ?? "web").trim(),
    external_link: String(formData.get("external_link") ?? "").trim() || null,
    position: Number(formData.get("position") ?? 0),
    published: formData.get("published") === "on",
  };

  const { error } = id
    ? await supabase.from("logs_stories").update(row).eq("id", id)
    : await supabase.from("logs_stories").insert(row);

  if (error) redirect("/admin/stories?error=1");
  revalidatePath("/admin/stories");
  redirect("/admin/stories");
}

export async function deleteStory(formData: FormData) {
  const supabase = await createClient();
  await supabase
    .from("logs_stories")
    .delete()
    .eq("id", String(formData.get("id")));
  revalidatePath("/admin/stories");
  redirect("/admin/stories");
}
