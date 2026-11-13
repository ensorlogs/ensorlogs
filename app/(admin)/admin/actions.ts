"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { notifySubscribers } from "@/lib/push";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function sendOtp(formData: FormData) {
  if (!isSupabaseConfigured()) redirect("/admin/login");
  const email = String(formData.get("email") ?? "").trim();
  const supabase = await createClient();
  const siteUrl = process.env.SITE_URL ?? "https://ensorlogs.com";
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: `${siteUrl}/auth/confirm`,
    },
  });
  if (error) redirect("/admin/login?error=1");
  redirect(`/admin/login?sent=1&email=${encodeURIComponent(email)}`);
}

export async function verifyOtp(formData: FormData) {
  if (!isSupabaseConfigured()) redirect("/admin/login");
  const email = String(formData.get("email") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    email,
    token: String(formData.get("token") ?? "").trim(),
    type: "email",
  });
  if (error) {
    redirect(`/admin/login?sent=1&code_error=1&email=${encodeURIComponent(email)}`);
  }
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

  // Was it already published? (to only push on the draft → published transition)
  let wasPublished = false;
  if (id) {
    const { data: prev } = await supabase
      .from("logs")
      .select("published")
      .eq("id", id)
      .maybeSingle();
    wasPublished = Boolean(prev?.published);
  }

  const { error } = id
    ? await supabase.from("logs").update(row).eq("id", id)
    : await supabase.from("logs").insert(row);

  if (error) redirect(`/admin/logs${id ? `/${id}` : "/new"}?error=1`);

  if (published && !wasPublished) {
    const siteUrl = process.env.SITE_URL ?? "https://ensorlogs.com";
    notifySubscribers({
      title: "Nuevo log en Ensor.Logs",
      body: row.title_es,
      url: `${siteUrl}/logs/${row.slug}`,
    }).catch(() => {});
  }

  revalidatePath("/admin/logs");
  revalidatePath("/logs");
  redirect("/admin/logs");
}

export async function deleteLog(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("logs").delete().eq("id", String(formData.get("id")));
  revalidatePath("/admin/logs");
  redirect("/admin/logs");
}

export async function saveProject(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const published = formData.get("published") === "on";

  let image = String(formData.get("image") ?? "").trim() || null;
  const file = formData.get("image_file");
  if (file instanceof File && file.size > 0) {
    const ext = file.name.split(".").pop() ?? "webp";
    const path = `projects/${crypto.randomUUID()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("stories-media")
      .upload(path, file, { contentType: file.type });
    if (upErr) redirect("/admin/projects?error=1");
    const { data } = supabase.storage.from("stories-media").getPublicUrl(path);
    image = data.publicUrl;
  }

  const row = {
    slug: String(formData.get("slug") ?? "").trim() || slugify(name),
    name,
    tag_es: String(formData.get("tag_es") ?? "").trim() || null,
    tag_en: String(formData.get("tag_en") ?? "").trim() || null,
    summary_es: String(formData.get("summary_es") ?? "").trim() || null,
    summary_en: String(formData.get("summary_en") ?? "").trim() || null,
    context_es: String(formData.get("context_es") ?? "").trim() || null,
    context_en: String(formData.get("context_en") ?? "").trim() || null,
    solution_es: String(formData.get("solution_es") ?? "").trim() || null,
    solution_en: String(formData.get("solution_en") ?? "").trim() || null,
    results_es: String(formData.get("results_es") ?? "").trim() || null,
    results_en: String(formData.get("results_en") ?? "").trim() || null,
    stack: String(formData.get("stack") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    metric_value: String(formData.get("metric_value") ?? "").trim() || null,
    metric_es: String(formData.get("metric_es") ?? "").trim() || null,
    metric_en: String(formData.get("metric_en") ?? "").trim() || null,
    image,
    external_url: String(formData.get("external_url") ?? "").trim() || null,
    position: Number(formData.get("position") ?? 0),
    published,
    updated_at: new Date().toISOString(),
  };

  const { error } = id
    ? await supabase.from("projects").update(row).eq("id", id)
    : await supabase.from("projects").insert(row);

  if (error) redirect(`/admin/projects${id ? `/${id}` : "/new"}?error=1`);
  revalidatePath("/admin/projects");
  revalidatePath("/proyectos");
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("projects").delete().eq("id", String(formData.get("id")));
  revalidatePath("/admin/projects");
  revalidatePath("/proyectos");
  redirect("/admin/projects");
}

export async function updateLeadStatus(formData: FormData) {
  const supabase = await createClient();
  const status = String(formData.get("status") ?? "new");
  await supabase
    .from("contacts")
    .update({ status })
    .eq("id", String(formData.get("id")));
  revalidatePath("/admin/leads");
  redirect("/admin/leads");
}

export async function deleteLead(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("contacts").delete().eq("id", String(formData.get("id")));
  revalidatePath("/admin/leads");
  redirect("/admin/leads");
}
