export type Locale = "es" | "en";

/** Row shape in Supabase (bilingual fields). */
export type PostRow = {
  id: string;
  slug: string;
  title_es: string;
  title_en: string;
  excerpt_es: string | null;
  excerpt_en: string | null;
  content_es: string;
  content_en: string;
  category: string;
  cover_url: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
};

export type StoryRow = {
  id: string;
  title_es: string;
  title_en: string;
  video_url: string;
  thumbnail_url: string | null;
  platform: string;
  external_link: string | null;
  published: boolean;
  position: number;
  created_at: string;
};

/** Localized view used by the UI. */
export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: string;
  coverUrl: string | null;
  publishedAt: string | null;
  logNumber: number;
};

export type Story = {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string | null;
  platform: string;
  externalLink: string | null;
};
