export type Locale = "es" | "en";

export type LogType = "log" | "story";

/** Row shape in Supabase `logs` (bilingual fields). type=story → video entry. */
export type LogRow = {
  id: string;
  slug: string;
  type: LogType;
  title_es: string;
  title_en: string;
  excerpt_es: string | null;
  excerpt_en: string | null;
  content_es: string;
  content_en: string;
  category: string;
  video_url: string | null;
  thumbnail_url: string | null;
  platform: string;
  external_link: string | null;
  published: boolean;
  published_at: string | null;
  position: number;
  created_at: string;
};

/** Localized view used by the UI. */
export type Log = {
  id: string;
  slug: string;
  type: LogType;
  title: string;
  excerpt: string | null;
  content: string;
  category: string;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  platform: string;
  externalLink: string | null;
  publishedAt: string | null;
  logNumber: number;
};
