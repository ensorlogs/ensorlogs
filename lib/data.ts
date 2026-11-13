import { seedLogs } from "@/data/seed-logs";
import { projects as seedProjects, type Project } from "@/data/projects";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { createPublicClient } from "@/lib/supabase/public";
import type { Locale, Log, LogRow, ProjectRow } from "@/lib/types";

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

function localizeProject(row: ProjectRow): Project {
  return {
    slug: row.slug,
    name: row.name,
    image: row.image ?? "",
    tag: { es: row.tag_es ?? "", en: row.tag_en ?? row.tag_es ?? "" },
    summary: {
      es: row.summary_es ?? "",
      en: row.summary_en ?? row.summary_es ?? "",
    },
    stack: Array.isArray(row.stack) ? row.stack : [],
    images: Array.isArray(row.images) ? row.images : [],
    metric: row.metric_value
      ? {
          value: row.metric_value,
          es: row.metric_es ?? "",
          en: row.metric_en ?? row.metric_es ?? "",
        }
      : undefined,
    url: row.external_url ?? undefined,
    detail: {
      es: {
        context: row.context_es ?? "",
        solution: row.solution_es ?? "",
        results: row.results_es ?? undefined,
      },
      en: {
        context: row.context_en ?? row.context_es ?? "",
        solution: row.solution_en ?? row.solution_es ?? "",
        results: row.results_en ?? row.results_es ?? undefined,
      },
    },
  };
}

async function fetchProjects(): Promise<ProjectRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("position", { ascending: true });
  if (error || !data) return [];
  return data as ProjectRow[];
}

/** Published projects — Supabase first, seed data as fallback. */
export async function getProjects(): Promise<Project[]> {
  const rows = await fetchProjects();
  const source = rows.length > 0 ? rows.map(localizeProject) : seedProjects;
  return source;
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | null> {
  const list = await getProjects();
  return list.find((p) => p.slug === slug) ?? null;
}

export async function getProjectSlugs(): Promise<string[]> {
  const list = await getProjects();
  return list.map((p) => p.slug);
}
