export const HOTSPOT_IDS = [
  "about",
  "me",
  "dev",
  "server",
  "iot",
  "fun",
  "contact",
  "logs",
  "newsletter",
] as const;
export type HotspotId = (typeof HOTSPOT_IDS)[number];
