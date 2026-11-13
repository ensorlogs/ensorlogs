import type { HotspotId } from "./hotspots";

export type Zone = {
  /** main hotspot — opens the retro modal */
  id?: HotspotId;
  /** easter egg key — shows a hover/tap tooltip only */
  egg?: string;
  /** rect in % of image size */
  x: number;
  y: number;
  w: number;
  h: number;
  /** pulsing marker position in % — omit for hidden easter eggs */
  marker?: { x: number; y: number };
};

/** Zones over room-desktop.jpg (1024×576). */
export const DESKTOP_ZONES: Zone[] = [
  { id: "iot", x: 0, y: 0, w: 27, h: 24, marker: { x: 13, y: 3 } },
  { id: "iot", x: 0, y: 24, w: 11, h: 16 },
  { id: "iot", x: 0, y: 38, w: 11, h: 24 },
  { id: "iot", x: 0, y: 64, w: 11, h: 33 },
  { id: "iot", x: 81, y: 7, w: 8, h: 9 },
  { id: "iot", x: 88, y: 37, w: 12, h: 12, marker: { x: 94, y: 35 } },
  { id: "iot", x: 74, y: 13, w: 13, h: 62, marker: { x: 80, y: 11 } },
  { id: "server", x: 10, y: 41, w: 10, h: 22, marker: { x: 15, y: 39 } },
  { id: "about", x: 28, y: 16, w: 10, h: 17, marker: { x: 33, y: 14 } },
  { id: "about", x: 47, y: 33, w: 14, h: 38 },
  { id: "about", x: 33, y: 77, w: 13, h: 19 },
  { id: "dev", x: 29, y: 40, w: 20, h: 26, marker: { x: 39, y: 38 } },
  { id: "fun", x: 87, y: 10, w: 13, h: 15, marker: { x: 93, y: 8 } },
  { id: "fun", x: 88, y: 25, w: 12, h: 14 },
  { id: "contact", x: 58, y: 51, w: 14, h: 14, marker: { x: 64, y: 50 } }, // laptop + mug
  { id: "logs", x: 11, y: 24, w: 10, h: 15, marker: { x: 15, y: 23 } }, // books

  // easter eggs — rendered last so they win clicks over main zones
  { egg: "tigre", x: 41, y: 16, w: 9, h: 17 },
  { egg: "window", x: 52, y: 11, w: 22, h: 33 },
  { egg: "tux", x: 20, y: 24, w: 6, h: 15 },
  { egg: "machine", x: 83, y: 45, w: 10, h: 20 },
];

/** Zones over room-mobile.jpg (576×1024). */
export const MOBILE_ZONES: Zone[] = [
  { id: "iot", x: 0, y: 1, w: 26, h: 15, marker: { x: 13, y: 3 } },
  { id: "iot", x: 0, y: 16, w: 13, h: 15 },
  { id: "iot", x: 0, y: 33, w: 12, h: 10 },
  { id: "iot", x: 0, y: 65, w: 13, h: 32 },
  { id: "iot", x: 74, y: 10, w: 9, h: 7 },
  { id: "iot", x: 87, y: 35, w: 13, h: 12, marker: { x: 93, y: 33 } },
  { id: "iot", x: 73, y: 26, w: 12, h: 47, marker: { x: 79, y: 24 } },
  { id: "server", x: 8, y: 41, w: 12, h: 16, marker: { x: 14, y: 39 } },
  { id: "about", x: 33, y: 16, w: 17, h: 12, marker: { x: 41, y: 14 } },
  { id: "about", x: 40, y: 42, w: 26, h: 29 },
  { id: "about", x: 22, y: 77, w: 25, h: 16 },
  { id: "dev", x: 13, y: 47, w: 30, h: 15, marker: { x: 28, y: 45 } },
  { id: "fun", x: 82, y: 10, w: 18, h: 13, marker: { x: 91, y: 8 } },
  { id: "fun", x: 82, y: 25, w: 18, h: 10 },
  { id: "contact", x: 70, y: 54, w: 16, h: 12, marker: { x: 77, y: 52 } },
  { id: "logs", x: 13, y: 17, w: 9, h: 13, marker: { x: 17, y: 15 } },

  { egg: "tigre", x: 51, y: 16, w: 16, h: 12 },
  { egg: "window", x: 32, y: 26, w: 41, h: 19 },
  { egg: "tux", x: 21, y: 17, w: 7, h: 13 },
  { egg: "machine", x: 82, y: 46, w: 13, h: 13 },
];
