/**
 * Brings the static room illustration to life:
 * - cutout layers (same image, clip-path) get tiny transforms so the dog and
 *   Ensor appear to move — the underlying art fills the gap they leave
 * - radial glow overlays pulse/flicker on bulbs, the door LED strip,
 *   monitors and server-rack LEDs
 * All overlays are pointer-events-none and respect prefers-reduced-motion.
 */

type Cutout = {
  /** clip-path inset % — top right bottom left */
  clip: string;
  className: string;
};

type Glow = {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string; // rgba() center color
  className: string;
};

const DESKTOP_CUTOUTS: Cutout[] = [
  // Ensor — gentle sway while "working" at the desk
  { clip: "inset(33% 39% 30% 46%)", className: "animate-room-sway" },
  // Toffu — tiny bob, reads as tail wag / breathing
  { clip: "inset(77% 54% 4% 33%)", className: "animate-room-bob" },
];

const DESKTOP_GLOWS: Glow[] = [
  // smart bulbs — warm amber pulse on the upper-left shelf
  { x: 8, y: 8, w: 11, h: 17, color: "rgba(255,190,80,0.55)", className: "animate-glow-pulse" },
  // door LED strip — soft violet halo, slower cycle
  { x: 72, y: 4, w: 30, h: 45, color: "rgba(140,80,255,0.28)", className: "animate-glow-pulse-slow" },
  // monitors — cool cyan flicker
  { x: 29, y: 39, w: 20, h: 22, color: "rgba(80,180,255,0.30)", className: "animate-glow-flicker" },
  // window daylight — faint cool shimmer
  { x: 52, y: 11, w: 22, h: 33, color: "rgba(160,210,255,0.12)", className: "animate-glow-pulse-slow" },
  // server rack — green status blink
  { x: 10, y: 42, w: 9, h: 16, color: "rgba(80,255,120,0.22)", className: "animate-glow-flicker" },
];

const MOBILE_CUTOUTS: Cutout[] = [
  { clip: "inset(45% 31% 16% 42%)", className: "animate-room-sway" },
  { clip: "inset(77% 57% 13% 18%)", className: "animate-room-bob" },
];

const MOBILE_GLOWS: Glow[] = [
  { x: 12, y: 14, w: 20, h: 12, color: "rgba(255,190,80,0.55)", className: "animate-glow-pulse" },
  { x: 66, y: 14, w: 34, h: 36, color: "rgba(140,80,255,0.28)", className: "animate-glow-pulse-slow" },
  { x: 15, y: 52, w: 32, h: 12, color: "rgba(80,180,255,0.30)", className: "animate-glow-flicker" },
  { x: 33, y: 27, w: 36, h: 18, color: "rgba(160,210,255,0.12)", className: "animate-glow-pulse-slow" },
  { x: 8, y: 41, w: 18, h: 13, color: "rgba(80,255,120,0.22)", className: "animate-glow-flicker" },
];

export default function RoomLife({
  image,
  variant,
}: {
  image: string;
  variant: "desktop" | "mobile";
}) {
  const cutouts = variant === "desktop" ? DESKTOP_CUTOUTS : MOBILE_CUTOUTS;
  const glows = variant === "desktop" ? DESKTOP_GLOWS : MOBILE_GLOWS;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {cutouts.map((c, i) => (
        <div
          key={i}
          className={`absolute inset-0 motion-reduce:animate-none ${c.className}`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            clipPath: c.clip,
          }}
        />
      ))}
      {glows.map((g, i) => (
        <div
          key={i}
          className={`absolute mix-blend-screen motion-reduce:animate-none ${g.className}`}
          style={{
            left: `${g.x}%`,
            top: `${g.y}%`,
            width: `${g.w}%`,
            height: `${g.h}%`,
            background: `radial-gradient(ellipse at center, ${g.color} 0%, transparent 70%)`,
          }}
        />
      ))}
    </div>
  );
}
