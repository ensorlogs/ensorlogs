import { seedLogs } from "@/data/seed-logs";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { createPublicClient } from "@/lib/supabase/public";
import type { Locale, Log, LogRow } from "@/lib/types";

function localizeLog(row: LogRow, locale: Locale, index: number): Log {
  return {
    id: row.id,
    slug: row.slug,
    type: row.type,
    title: locale === "en" ? row.title_en : row.title_es,
    excerpt: locale === "en" ? row.excerpt_en : row.excerpt_es,
    content: locale === "en" ? row.content_en : row.content_es,
    category: row.category,
    videoUrl: row.video_url,
    thumbnailUrl: row.thumbnail_url,
    platform: row.platform,
    externalLink: row.external_link,
    publishedAt: row.published_at,
    logNumber: index + 1,
  };
}

function sortLogs(rows: LogRow[]) {
  return [...rows].sort((a, b) =>
    (b.published_at ?? b.created_at).localeCompare(a.published_at ?? a.created_at)
  );
}

async function fetchPublished(): Promise<LogRow[]> {
  if (!isSupabaseConfigured()) {
    return sortLogs(seedLogs.filter((l) => l.published));
  }
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("logs")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error || !data) return [];
  return data as LogRow[];
}

/** All published logs (text + video) newest first. */
export async function getLogs(locale: Locale): Promise<Log[]> {
  const rows = await fetchPublished();
  return rows.map((row, i) => localizeLog(row, locale, i));
}

/** Published video logs (type=story), ordered by position for the feed. */
export async function getVideoLogs(locale: Locale): Promise<Log[]> {
  const rows = await fetchPublished();
  const stories = rows
    .filter((r) => r.type === "story" && r.video_url)
    .sort((a, b) => a.position - b.position);
  return stories.map((row, i) => localizeLog(row, locale, i));
}

export async function getLogBySlug(
  locale: Locale,
  slug: string
): Promise<Log | null> {
  const rows = await fetchPublished();
  const idx = rows.findIndex((r) => r.slug === slug);
  if (idx === -1) return null;
  return localizeLog(rows[idx], locale, idx);
}

export async function getAllSlugs(): Promise<string[]> {
  const rows = await fetchPublished();
  return rows.map((r) => r.slug);
}
