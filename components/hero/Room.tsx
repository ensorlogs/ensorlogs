"use client";

import type { HotspotId } from "./hotspots";

type RoomProps = {
  onHotspot: (id: HotspotId) => void;
  labels: Record<HotspotId, string>;
};

function Marker({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g className="pointer-events-none">
      <rect
        x={x - 5}
        y={y - 5}
        width={10}
        height={10}
        fill="none"
        stroke="#ffb000"
        strokeWidth={1}
        className="origin-center animate-pulse-dot"
      />
      <rect x={x - 2} y={y - 2} width={4} height={4} fill="#ffb000" />
      <title>{label}</title>
    </g>
  );
}

function Zone({
  x,
  y,
  w,
  h,
  id,
  label,
  onHotspot,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  id: HotspotId;
  label: string;
  onHotspot: (id: HotspotId) => void;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      fill="transparent"
      role="button"
      tabIndex={0}
      aria-label={label}
      className="cursor-pointer outline-none focus-visible:stroke-[#ffb000] focus-visible:stroke-2"
      onClick={() => onHotspot(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onHotspot(id);
        }
      }}
    >
      <title>{label}</title>
    </rect>
  );
}

/** Interactive pixel-art room. 384×216 viewBox, drawn with hard-edged rects. */
export default function Room({ onHotspot, labels }: RoomProps) {
  return (
    <svg
      viewBox="0 0 384 216"
      className="pixelated block h-auto w-full"
      role="img"
      aria-label="Ensor's pixel room"
    >
      {/* ── Shell ─────────────────────────────────────────── */}
      <rect width="384" height="216" fill="#14141a" />
      <rect y="150" width="384" height="66" fill="#1a1a22" />
      <rect y="148" width="384" height="4" fill="#2b2b34" />
      {[162, 176, 192, 206].map((y) => (
        <rect key={y} y={y} width="384" height="1" fill="#22222c" />
      ))}
      {[40, 110, 200, 300].map((x) => (
        <rect key={x} x={x} y="150" width="1" height="66" fill="#20202a" />
      ))}

      {/* rug */}
      <rect x="140" y="158" width="112" height="42" fill="#22222c" />
      <rect x="140" y="158" width="112" height="3" fill="#8a5f00" />
      <rect x="140" y="197" width="112" height="3" fill="#8a5f00" />
      <rect x="146" y="166" width="100" height="26" fill="#26262f" />

      {/* ── Neon sign ─────────────────────────────────────── */}
      <text
        x="204"
        y="42"
        fontFamily="var(--font-press-start), monospace"
        fontSize="11"
        fill="#ffb000"
        style={{ filter: "drop-shadow(0 0 4px rgba(255,176,0,.7))" }}
      >
        ENSOR
      </text>
      <rect x="204" y="48" width="58" height="2" fill="#8a5f00" />

      {/* ── Family picture (ABOUT) ────────────────────────── */}
      <g>
        <rect x="118" y="20" width="64" height="50" fill="#8a5f00" />
        <rect x="122" y="24" width="56" height="42" fill="#1a2030" />
        {/* him */}
        <rect x="132" y="34" width="8" height="8" fill="#d9a066" />
        <rect x="132" y="36" width="3" height="3" fill="#14141a" />
        <rect x="137" y="36" width="3" height="3" fill="#14141a" />
        <rect x="131" y="33" width="10" height="2" fill="#3a2a18" />
        <rect x="130" y="42" width="12" height="14" fill="#26262f" />
        {/* her */}
        <rect x="148" y="36" width="8" height="8" fill="#e3b184" />
        <rect x="146" y="33" width="12" height="4" fill="#5c3a1e" />
        <rect x="146" y="44" width="12" height="12" fill="#5a3a5a" />
        {/* schnauzer */}
        <rect x="164" y="50" width="10" height="6" fill="#7a7a80" />
        <rect x="169" y="44" width="6" height="7" fill="#8a8a90" />
        <rect x="169" y="50" width="6" height="3" fill="#c0c0c4" />
        <rect x="170" y="46" width="2" height="2" fill="#14141a" />
        <rect x="168" y="42" width="2" height="3" fill="#7a7a80" />
        <rect x="174" y="42" width="2" height="3" fill="#7a7a80" />
      </g>

      {/* ── Desk + dual monitors (DEV) ────────────────────── */}
      <g>
        {/* monitor 1 — terminal */}
        <rect x="126" y="74" width="48" height="34" fill="#0c0c10" />
        <rect x="130" y="78" width="40" height="26" fill="#0f1a12" />
        <rect x="133" y="81" width="18" height="2" fill="#4dff88" />
        <rect x="133" y="85" width="28" height="2" fill="#4dff88" opacity="0.7" />
        <rect x="133" y="89" width="12" height="2" fill="#4dff88" opacity="0.5" />
        <rect x="133" y="93" width="24" height="2" fill="#4dff88" opacity="0.7" />
        <rect x="133" y="97" width="6" height="2" fill="#4dff88" className="animate-blink" />
        {/* monitor 2 — UI */}
        <rect x="182" y="74" width="48" height="34" fill="#0c0c10" />
        <rect x="186" y="78" width="40" height="26" fill="#12141c" />
        <rect x="189" y="81" width="34" height="3" fill="#ffb000" opacity="0.85" />
        <rect x="189" y="87" width="22" height="2" fill="#93908a" opacity="0.7" />
        <rect x="189" y="91" width="30" height="2" fill="#93908a" opacity="0.45" />
        <rect x="189" y="95" width="16" height="5" fill="#ffb000" opacity="0.55" />
        <rect x="207" y="95" width="16" height="5" fill="#5ec8ff" opacity="0.45" />
        {/* stands */}
        <rect x="148" y="108" width="6" height="10" fill="#2b2b34" />
        <rect x="204" y="108" width="6" height="10" fill="#2b2b34" />
        <rect x="142" y="116" width="18" height="3" fill="#2b2b34" />
        <rect x="198" y="116" width="18" height="3" fill="#2b2b34" />
        {/* desk */}
        <rect x="112" y="118" width="160" height="6" fill="#3a3a46" />
        <rect x="120" y="124" width="6" height="26" fill="#2b2b34" />
        <rect x="256" y="124" width="6" height="26" fill="#2b2b34" />
        <rect x="232" y="124" width="30" height="24" fill="#26262f" />
        <rect x="235" y="129" width="24" height="2" fill="#3f3f4d" />
        <rect x="235" y="137" width="24" height="2" fill="#3f3f4d" />
        {/* keyboard */}
        <rect x="158" y="113" width="46" height="4" fill="#33333e" />
        <rect x="162" y="114" width="38" height="1" fill="#55555f" />
        {/* coffee mug + steam */}
        <rect x="118" y="110" width="7" height="8" fill="#ffb000" />
        <rect x="125" y="112" width="2" height="4" fill="#ffb000" />
        <rect x="120" y="106" width="2" height="3" fill="#93908a" opacity="0.6" className="animate-led" />
        {/* tux plush */}
        <rect x="238" y="100" width="10" height="14" fill="#0c0c10" />
        <rect x="240" y="105" width="6" height="8" fill="#e8e6df" />
        <rect x="240" y="102" width="2" height="2" fill="#e8e6df" />
        <rect x="245" y="102" width="2" height="2" fill="#e8e6df" />
        <rect x="242" y="104" width="3" height="2" fill="#ffb000" />
        <rect x="238" y="114" width="4" height="3" fill="#ffb000" />
        <rect x="244" y="114" width="4" height="3" fill="#ffb000" />
      </g>

      {/* ── Server rack (SERVER) ──────────────────────────── */}
      <g>
        <rect x="274" y="78" width="40" height="72" fill="#1e1e28" />
        <rect x="274" y="78" width="40" height="3" fill="#2b2b34" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={278} y={84 + i * 13} width={32} height={10} fill="#262632" />
            <rect x={280} y={87 + i * 13} width={14} height="1" fill="#3f3f4d" />
            <rect x={280} y={89 + i * 13} width={14} height="1" fill="#3f3f4d" />
            <rect
              x={306}
              y={86 + i * 13}
              width={3}
              height={3}
              fill={i % 2 === 0 ? "#4dff88" : "#ffb000"}
              className="animate-led"
              style={{ animationDelay: `${i * 0.33}s` }}
            />
          </g>
        ))}
        <rect x="280" y="148" width="4" height="4" fill="#4dff88" className="animate-led" />
      </g>

      {/* ── Pumps + door + sensors (IOT) ──────────────────── */}
      <g>
        {/* water pumps */}
        <rect x="320" y="136" width="14" height="14" fill="#26262f" />
        <rect x="322" y="138" width="10" height="6" fill="#33333e" />
        <rect x="326" y="130" width="3" height="6" fill="#3f3f4d" />
        <rect x="324" y="128" width="7" height="3" fill="#5ec8ff" />
        <rect x="331" y="145" width="4" height="3" fill="#4dff88" className="animate-led" />
        {/* door */}
        <rect x="340" y="58" width="38" height="92" fill="#2e2e38" />
        <rect x="344" y="62" width="30" height="84" fill="#22222c" />
        <rect x="348" y="68" width="22" height="28" fill="#2b2b34" />
        <rect x="348" y="104" width="22" height="32" fill="#2b2b34" />
        {/* smart lock */}
        <rect x="366" y="98" width="6" height="12" fill="#3f3f4d" />
        <rect x="368" y="100" width="2" height="2" fill="#4dff88" className="animate-led" />
        {/* sensors on wall */}
        <rect x="352" y="26" width="10" height="6" fill="#3f3f4d" />
        <rect x="354" y="22" width="6" height="4" fill="#55555f" />
        <rect x="344" y="34" width="8" height="10" fill="#2b2b34" />
        <rect x="346" y="36" width="4" height="3" fill="#4dff88" />
        <rect x="366" y="36" width="8" height="8" fill="#2b2b34" />
        <rect x="368" y="39" width="4" height="2" fill="#5ec8ff" />
      </g>

      {/* ── Leisure zone (FUN) ────────────────────────────── */}
      <g>
        {/* red sox pennant */}
        <polygon points="20,16 72,16 20,42" fill="#a03028" />
        <text
          x="26"
          y="28"
          fontFamily="var(--font-press-start), monospace"
          fontSize="8"
          fill="#e8e6df"
        >
          B
        </text>
        {/* shelf */}
        <rect x="14" y="96" width="80" height="6" fill="#3a3a46" />
        <rect x="20" y="102" width="5" height="48" fill="#2b2b34" />
        <rect x="88" y="102" width="5" height="48" fill="#2b2b34" />
        {/* crt on shelf */}
        <rect x="20" y="72" width="30" height="22" fill="#26262f" />
        <rect x="23" y="75" width="24" height="15" fill="#0f1a12" />
        <rect x="26" y="78" width="6" height="5" fill="#4dff88" opacity="0.8" />
        <rect x="34" y="80" width="4" height="4" fill="#ffb000" opacity="0.7" />
        <rect x="30" y="94" width="10" height="2" fill="#2b2b34" />
        {/* switch dock + joycons */}
        <rect x="58" y="84" width="20" height="12" fill="#1c1c22" />
        <rect x="61" y="86" width="14" height="8" fill="#10331c" />
        <rect x="55" y="84" width="3" height="12" fill="#3b82f6" />
        <rect x="78" y="84" width="3" height="12" fill="#ff5f56" />
        {/* game cases */}
        <rect x="84" y="88" width="3" height="8" fill="#a03028" />
        <rect x="88" y="88" width="3" height="8" fill="#5ec8ff" />
        {/* plant between shelf and desk */}
        <rect x="98" y="136" width="14" height="14" fill="#8a5f00" />
        <rect x="100" y="126" width="4" height="10" fill="#2e7d32" />
        <rect x="105" y="120" width="4" height="16" fill="#388e3c" />
        <rect x="110" y="128" width="3" height="8" fill="#2e7d32" />
      </g>

      {/* ── Hotspot zones + markers ───────────────────────── */}
      <Zone x={112} y={14} w={76} h={58} id="about" label={labels.about} onHotspot={onHotspot} />
      <Zone x={118} y={70} w={116} h={56} id="dev" label={labels.dev} onHotspot={onHotspot} />
      <Zone x={272} y={74} w={44} h={80} id="server" label={labels.server} onHotspot={onHotspot} />
      <Zone x={318} y={14} w={62} h={138} id="iot" label={labels.iot} onHotspot={onHotspot} />
      <Zone x={8} y={8} w={92} h={122} id="fun" label={labels.fun} onHotspot={onHotspot} />

      <Marker x={150} y={12} label={labels.about} />
      <Marker x={178} y={66} label={labels.dev} />
      <Marker x={294} y={70} label={labels.server} />
      <Marker x={360} y={12} label={labels.iot} />
      <Marker x={50} y={10} label={labels.fun} />
    </svg>
  );
}
