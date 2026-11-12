import type { StoryRow } from "@/lib/types";

/**
 * Local seed stories — sample videos are public test assets (Google's
 * gtv-videos-bucket). Replaced by Supabase Storage URLs once connected.
 */
export const seedStories: StoryRow[] = [
  {
    id: "story-3",
    title_es: "Unboxing: sensor Zigbee de calidad de aire",
    title_en: "Unboxing: Zigbee air quality sensor",
    video_url:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail_url: null,
    platform: "web",
    external_link: null,
    published: true,
    position: 1,
    created_at: "2026-11-01T12:00:00Z",
  },
  {
    id: "story-2",
    title_es: "Setup express: cerradura inteligente en 60s",
    title_en: "Quick setup: smart lock in 60s",
    video_url:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnail_url: null,
    platform: "web",
    external_link: null,
    published: true,
    position: 2,
    created_at: "2026-10-20T12:00:00Z",
  },
  {
    id: "story-1",
    title_es: "Tour por el rack: el cerebro de la casa",
    title_en: "Rack tour: the brain of the house",
    video_url:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnail_url: null,
    platform: "web",
    external_link: null,
    published: true,
    position: 3,
    created_at: "2026-10-05T12:00:00Z",
  },
];
