export const HOTSPOT_IDS = [
  "about",
  "dev",
  "server",
  "iot",
  "fun",
  "contact",
  "logs",
] as const;
export type HotspotId = (typeof HOTSPOT_IDS)[number];
