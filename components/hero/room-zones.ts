import type { HotspotId } from "./hotspots";

export type EggId =
  | "tigre"
  | "window"
  | "linux"
  | "hp"
  | "redsox"
  | "machine"
  | "schnauzer"
  | "xbox"
  | "bulbs"
  | "plugs"
  | "humidity"
  | "lock"
  | "camera"
  | "baul";

export type Zone = {
  id?: HotspotId;
  egg?: EggId;
  /** clicking the egg opens this hotspot modal (e.g. domotics → services) */
  cta?: HotspotId;
  /** clicking navigates to this path (locale-aware) */
  link?: string;
  /** sound effect to play on click */
  sfx?:
    | "woof"
    | "coffee"
    | "nintendo"
    | "xbox"
    | "bulb"
    | "plug"
    | "boot"
    | "tiger"
    | "lock";
  x: number; // % from left
  y: number; // % from top
  w: number; // % width
  h: number; // % height
  marker?: { x: number; y: number }; // % — pulsing dot
};

/** Zones for room-desktop.jpg (1024×576). */
export const DESKTOP_ZONES: Zone[] = [
  { id: "iot", x: 18, y: 9, w: 8, h: 15, marker: { x: 22, y: 15 } }, // sensor displays
  { id: "server", sfx: "boot", x: 10, y: 41, w: 9, h: 17, marker: { x: 14, y: 49 } },
  { id: "about", x: 28, y: 15, w: 10, h: 18, marker: { x: 33, y: 24 } },
  { id: "me", x: 46, y: 33, w: 15, h: 37, marker: { x: 53, y: 36 } },
  { id: "dev", x: 29, y: 40, w: 19, h: 20, marker: { x: 39, y: 50 } },
  { id: "fun", sfx: "nintendo", x: 90, y: 10, w: 9, h: 11, marker: { x: 94, y: 15 } },
  { id: "fun", x: 88, y: 24, w: 12, h: 9 },
  { id: "contact", x: 62, y: 51, w: 11, h: 14, marker: { x: 67, y: 57 } }, // laptop
  { id: "logs", x: 9, y: 57, w: 6, h: 8, marker: { x: 12, y: 60 } }, // desk console

  // easter eggs — rendered last so they win clicks over main zones
  { egg: "tigre", sfx: "tiger", x: 41, y: 15, w: 9, h: 18 },
  { egg: "window", x: 52, y: 11, w: 22, h: 33 },
  { egg: "linux", x: 10, y: 23, w: 13, h: 12 }, // LINUX book + Tux
  { egg: "hp", x: 13.5, y: 23, w: 4, h: 12 }, // Harry Potter spine
  { egg: "schnauzer", sfx: "woof", x: 33, y: 77, w: 13, h: 19 },
  { egg: "redsox", x: 58.5, y: 56, w: 5, h: 9 }, // mug on the desk
  { egg: "machine", sfx: "coffee", x: 83, y: 45, w: 11, h: 21 },
  { egg: "xbox", sfx: "xbox", x: 92, y: 51, w: 8, h: 14 },

  // domotics devices — each shows its own tooltip, click opens services
  { egg: "bulbs", cta: "iot", sfx: "bulb", x: 8, y: 9, w: 10, h: 15 },
  { egg: "plugs", cta: "iot", sfx: "plug", x: 0, y: 4, w: 9, h: 13 },
  { egg: "plugs", cta: "iot", sfx: "plug", x: 0, y: 38, w: 10, h: 9 },
  { egg: "humidity", cta: "iot", x: 2, y: 74, w: 7, h: 19 }, // plant sensor
  { egg: "humidity", cta: "iot", x: 73, y: 30, w: 5, h: 9 }, // RH% display
  { egg: "lock", cta: "iot", sfx: "lock", x: 79, y: 37, w: 8, h: 13 },
  { egg: "camera", cta: "iot", x: 81, y: 6, w: 7, h: 11 },
  { egg: "baul", link: "/proyectos", x: 12, y: 66, w: 19, h: 27 }, // mueble bajo la repisa
  { egg: "baul", link: "/proyectos", x: 84, y: 64, w: 15, h: 30 }, // mueble bajo la cafetera
];

/** Zones for room-mobile.jpg (576×1024). */
export const MOBILE_ZONES: Zone[] = [
  { id: "iot", x: 22, y: 25, w: 12, h: 7, marker: { x: 28, y: 28 } },
  { id: "server", sfx: "boot", x: 9, y: 42, w: 16, h: 11, marker: { x: 17, y: 47 } },
  { id: "about", x: 34, y: 18, w: 15, h: 10, marker: { x: 41, y: 22 } },
  { id: "me", x: 42, y: 45, w: 27, h: 39, marker: { x: 53, y: 48 } },
  { id: "dev", x: 16, y: 53, w: 30, h: 10, marker: { x: 30, y: 58 } },
  { id: "fun", sfx: "nintendo", x: 82, y: 19, w: 18, h: 6, marker: { x: 91, y: 21 } },
  { id: "fun", x: 82, y: 28, w: 18, h: 6 },
  { id: "contact", x: 68, y: 56, w: 16, h: 8, marker: { x: 76, y: 59 } },
  { id: "logs", x: 9, y: 50, w: 10, h: 4, marker: { x: 14, y: 51 } },

  { egg: "tigre", sfx: "tiger", x: 52, y: 18, w: 15, h: 9 },
  { egg: "window", x: 33, y: 28, w: 35, h: 16 },
  { egg: "linux", x: 15, y: 28, w: 16, h: 6 },
  { egg: "hp", x: 20, y: 28, w: 6, h: 6 },
  { egg: "schnauzer", sfx: "woof", x: 18, y: 77, w: 25, h: 10 },
  { egg: "redsox", x: 63, y: 60, w: 7, h: 5 },
  { egg: "machine", sfx: "coffee", x: 75, y: 43, w: 20, h: 10 },
  { egg: "xbox", sfx: "xbox", x: 89, y: 46, w: 9, h: 8 },

  { egg: "bulbs", cta: "iot", sfx: "bulb", x: 13, y: 15, w: 18, h: 10 },
  { egg: "plugs", cta: "iot", sfx: "plug", x: 1, y: 37, w: 15, h: 6 },
  { egg: "plugs", cta: "iot", sfx: "plug", x: 93, y: 38, w: 7, h: 5 },
  { egg: "humidity", cta: "iot", x: 2, y: 61, w: 10, h: 11 },
  { egg: "humidity", cta: "iot", x: 64, y: 37, w: 7, h: 5 },
  { egg: "lock", cta: "iot", sfx: "lock", x: 74, y: 42, w: 7, h: 7 },
  { egg: "camera", cta: "iot", x: 74, y: 15, w: 9, h: 6 },
  { egg: "baul", link: "/proyectos", x: 7, y: 51, w: 20, h: 12 }, // mueble bajo la repisa
  { egg: "baul", link: "/proyectos", x: 79, y: 56, w: 20, h: 17 }, // mueble bajo la cafetera
];
