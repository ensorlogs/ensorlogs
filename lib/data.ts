import { seedPosts } from "@/data/seed-posts";
import { seedStories } from "@/data/seed-stories";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { createPublicClient } from "@/lib/supabase/public";
import type { Locale, Post, PostRow, Story, StoryRow } from "@/lib/types";

function localizePost(row: PostRow, locale: Locale, index: number): Post {
  return {
    id: row.id,
    slug: row.slug,
    title: locale === "en" ? row.title_en : row.title_es,
    excerpt: locale === "en" ? row.excerpt_en : row.excerpt_es,
    content: locale === "en" ? row.content_en : row.content_es,
    category: row.category,
    coverUrl: row.cover_url,
    publishedAt: row.published_at,
    logNumber: index + 1,
  };
}

function localizeStory(row: StoryRow, locale: Locale): Story {
  return {
    id: row.id,
    title: locale === "en" ? row.title_en : row.title_es,
    videoUrl: row.video_url,
    thumbnailUrl: row.thumbnail_url,
    platform: row.platform,
    externalLink: row.external_link,
  };
}

function sortPosts(rows: PostRow[]) {
  return [...rows].sort((a, b) =>
    (b.published_at ?? b.created_at).localeCompare(a.published_at ?? a.created_at)
  );
}

export async function getPosts(locale: Locale): Promise<Post[]> {
  if (!isSupabaseConfigured()) {
    return sortPosts(seedPosts)
      .filter((p) => p.published)
      .map((row, i) => localizePost(row, locale, i));
  }

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("logs_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error || !data) return [];
  return (data as PostRow[]).map((row, i) => localizePost(row, locale, i));
}

export async function getPostBySlug(
  locale: Locale,
  slug: string
): Promise<Post | null> {
  if (!isSupabaseConfigured()) {
    const idx = sortPosts(seedPosts).findIndex(
      (p) => p.slug === slug && p.published
    );
    if (idx === -1) return null;
    return localizePost(sortPosts(seedPosts)[idx], locale, idx);
  }

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("logs_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error || !data) return null;
  const { count } = await supabase
    .from("logs_posts")
    .select("*", { count: "exact", head: true })
    .eq("published", true)
    .lte("published_at", (data as PostRow).published_at);
  return localizePost(data as PostRow, locale, Math.max((count ?? 1) - 1, 0));
}

export async function getAllSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) {
    return seedPosts.filter((p) => p.published).map((p) => p.slug);
  }
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("logs_posts")
    .select("slug")
    .eq("published", true);
  return (data ?? []).map((r: { slug: string }) => r.slug);
}

export async function getStories(locale: Locale): Promise<Story[]> {
  if (!isSupabaseConfigured()) {
    return seedStories
      .filter((s) => s.published)
      .sort((a, b) => a.position - b.position)
      .map((row) => localizeStory(row, locale));
  }

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("logs_stories")
    .select("*")
    .eq("published", true)
    .order("position", { ascending: true });

  if (error || !data) return [];
  return (data as StoryRow[]).map((row) => localizeStory(row, locale));
}
