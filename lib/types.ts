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

/** Row shape in Supabase `projects` (bilingual fields). */
export type ProjectRow = {
  id: string;
  slug: string;
  name: string;
  tag_es: string | null;
  tag_en: string | null;
  summary_es: string | null;
  summary_en: string | null;
  context_es: string | null;
  context_en: string | null;
  solution_es: string | null;
  solution_en: string | null;
  results_es: string | null;
  results_en: string | null;
  stack: string[];
  metric_value: string | null;
  metric_es: string | null;
  metric_en: string | null;
  image: string | null;
  images: string[];
  external_url: string | null;
  position: number;
  published: boolean;
  created_at: string;
};

/** Row shape in Supabase `contacts` (form leads). */
export type ContactRow = {
  id: string;
  email: string;
  name: string | null;
  service: string | null;
  message: string | null;
  source: "contact" | "newsletter";
  status: "new" | "contacted" | "quoted" | "closed";
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
