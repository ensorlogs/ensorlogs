"use client";

import type { HotspotId } from "./hotspots";

type RoomProps = {
  onHotspot: (id: HotspotId) => void;
  labels: Record<HotspotId, string>;
};

const INK = "#e8dfc9";
const DIM = "#9a90b0";
const WALL = "#1a1128";
const DARK = "#0f0a18";
const PANEL = "#221636";
const AMBER = "#ffb000";
const GREEN = "#4dff88";
const RED = "#e0483f";

function T({
  x,
  y,
  children,
  size = 5,
  fill = INK,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  fill?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      fontFamily="var(--font-press-start), monospace"
      fontSize={size}
      fill={fill}
    >
      {children}
    </text>
  );
}

function Marker({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g className="pointer-events-none">
      <rect
        x={x - 5}
        y={y - 5}
        width={10}
        height={10}
        fill="none"
        stroke={AMBER}
        strokeWidth={1}
        className="origin-center animate-pulse-dot"
      />
      <rect x={x - 2} y={y - 2} width={4} height={4} fill={AMBER} />
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

/** Interactive pixel-art room — dense 1-bit illustration. 400×250 viewBox. */
export default function Room({ onHotspot, labels }: RoomProps) {
  return (
    <svg
      viewBox="0 0 400 250"
      className="pixelated block h-auto w-full"
      role="img"
      aria-label="Ensor's pixel room"
    >
      <defs>
        {/* brick wall */}
        <pattern id="brick" width="24" height="8" patternUnits="userSpaceOnUse">
          <rect width="24" height="8" fill={WALL} />
          <path d="M0 0.5H24M0 4.5H24" stroke="#241a38" strokeWidth="1" />
          <path d="M6 0.5V4.5M18 4.5V8" stroke="#241a38" strokeWidth="1" />
        </pattern>
        {/* halftone dots */}
        <pattern id="dots" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect x="1" y="1" width="1" height="1" fill={INK} opacity="0.25" />
        </pattern>
        {/* dense crosshatch for shading */}
        <pattern id="hatch" width="4" height="4" patternUnits="userSpaceOnUse">
          <path d="M0 4L4 0" stroke={DIM} strokeWidth="0.6" opacity="0.35" />
        </pattern>
        {/* scattered paw/pet doodles for the big poster */}
        <pattern id="pets" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#241a38" />
          <rect x="6" y="8" width="4" height="3" fill={INK} opacity="0.8" />
          <rect x="5" y="5" width="1.5" height="2" fill={INK} opacity="0.8" />
          <rect x="7.5" y="4.5" width="1.5" height="2" fill={INK} opacity="0.8" />
          <rect x="10" y="5" width="1.5" height="2" fill={INK} opacity="0.8" />
        </pattern>
      </defs>

      {/* ── Shell ─────────────────────────────────────────── */}
      <rect width="400" height="250" fill={DARK} />
      <rect width="400" height="172" fill="url(#brick)" />
      <rect y="170" width="400" height="3" fill={INK} opacity="0.55" />
      <rect y="173" width="400" height="77" fill="#150d22" />
      {[195, 218, 240].map((y) => (
        <rect key={y} y={y} width="400" height="1" fill="#241a38" />
      ))}

      {/* ── Top-left sign + window/blind ──────────────────── */}
      <g>
        <rect x="4" y="2" width="58" height="20" fill={DARK} stroke={INK} strokeWidth="1" />
        <T x={7} y={9} size={4}>SIGH. ADD.</T>
        <T x={7} y={14} size={4}>NEVERUZEN</T>
        <T x={7} y={19} size={4}>BY THE WAY</T>
        {/* bookshelf strip */}
        <rect x="0" y="28" width="10" height="58" fill={PANEL} />
        {[30, 44, 58, 72].map((y) => (
          <g key={y}>
            <rect x="1" y={y} width="8" height="12" fill={DARK} />
            <rect x="2" y={y + 1} width="1.5" height="10" fill={DIM} />
            <rect x="4.5" y={y + 2} width="1.5" height="9" fill={INK} opacity="0.6" />
            <rect x="7" y={y + 1} width="1.5" height="10" fill={DIM} />
          </g>
        ))}
        {/* window with blind */}
        <rect x="16" y="24" width="48" height="34" fill={DARK} stroke={INK} strokeWidth="1.5" />
        {[28, 32, 36, 40, 44, 48, 52].map((y) => (
          <rect key={y} x="18" y={y} width="44" height="1.5" fill={DIM} opacity="0.7" />
        ))}
        <rect x="16" y="22" width="48" height="3" fill={INK} />
      </g>

      {/* ── Chandelier ────────────────────────────────────── */}
      <g>
        <rect x="198" y="0" width="2" height="16" fill={DIM} />
        <rect x="190" y="16" width="18" height="6" fill={INK} />
        <rect x="182" y="18" width="8" height="3" fill={INK} />
        <rect x="208" y="18" width="8" height="3" fill={INK} />
        <rect x="184" y="12" width="3" height="7" fill={INK} />
        <rect x="211" y="12" width="3" height="7" fill={INK} />
        <rect x="192" y="10" width="3" height="7" fill={INK} />
        <rect x="203" y="10" width="3" height="7" fill={INK} />
        <rect x="184.5" y="9" width="2" height="3" fill={AMBER} className="animate-led" />
        <rect x="211.5" y="9" width="2" height="3" fill={AMBER} className="animate-led" style={{ animationDelay: ".4s" }} />
        <rect x="192.5" y="7" width="2" height="3" fill={AMBER} className="animate-led" style={{ animationDelay: ".7s" }} />
        <rect x="203.5" y="7" width="2" height="3" fill={AMBER} className="animate-led" style={{ animationDelay: ".2s" }} />
        <rect x="194" y="22" width="10" height="4" fill={INK} />
      </g>

      {/* ── Posters top-right ─────────────────────────────── */}
      <g>
        {/* react atom */}
        <rect x="262" y="8" width="30" height="42" fill={PANEL} stroke={INK} strokeWidth="1.5" />
        <ellipse cx="277" cy="26" rx="10" ry="4" fill="none" stroke={INK} strokeWidth="1.2" transform="rotate(-30 277 26)" />
        <ellipse cx="277" cy="26" rx="10" ry="4" fill="none" stroke={INK} strokeWidth="1.2" transform="rotate(30 277 26)" />
        <rect x="275" y="24" width="4" height="4" fill={INK} />
        <T x={268} y={45} size={4}>REACT</T>
        {/* tux mini */}
        <rect x="296" y="12" width="20" height="30" fill={PANEL} stroke={INK} strokeWidth="1.5" />
        <rect x="302" y="20" width="8" height="10" fill={INK} />
        <rect x="304" y="24" width="4" height="5" fill={PANEL} />
        <rect x="304" y="31" width="4" height="2" fill={AMBER} />
        {/* palm poster */}
        <rect x="320" y="6" width="34" height="44" fill={PANEL} stroke={INK} strokeWidth="1.5" />
        <rect x="322" y="38" width="30" height="4" fill={INK} opacity="0.5" />
        <path d="M334 36c-1-8 1-14 1-14" stroke={INK} strokeWidth="1.5" fill="none" />
        <path d="M335 22c-4-3-8-2-8-2M335 22c4-3 8-2 8-2M335 24c-5 1-7 4-7 4M335 24c5 1 7 4 7 4" stroke={INK} strokeWidth="1.5" fill="none" />
        <rect x="330" y="40" width="10" height="3" fill={INK} opacity="0.6" />
        <T x={328} y={48} size={3.5}>TAKUTACK</T>
        {/* ZIG poster */}
        <rect x="358" y="10" width="38" height="30" fill={PANEL} stroke={INK} strokeWidth="1.5" />
        <T x={362} y={24} size={9} fill={INK}>ZIG</T>
        <T x={362} y={32} size={3.5}>FOR THE SAKE</T>
        <T x={362} y={37} size={3.5}>OF FUN</T>
        {/* green arrow */}
        <polygon points="390,2 396,10 393,10 393,20 387,20 387,10 384,10" fill={GREEN} />
      </g>

      {/* ── Family photo (ABOUT) ──────────────────────────── */}
      <g>
        <rect x="46" y="62" width="112" height="88" fill={INK} />
        <rect x="49" y="65" width="106" height="82" fill={PANEL} />
        <rect x="49" y="65" width="106" height="82" fill="url(#dots)" />
        {/* him */}
        <rect x="62" y="84" width="26" height="5" fill={INK} />
        <rect x="67" y="76" width="16" height="10" fill={INK} />
        <rect x="66" y="89" width="18" height="16" fill={INK} />
        <rect x="68" y="93" width="6" height="5" fill={PANEL} />
        <rect x="77" y="93" width="6" height="5" fill={PANEL} />
        <rect x="74" y="95" width="3" height="1.5" fill={PANEL} />
        <rect x="71" y="99" width="8" height="2" fill={PANEL} />
        <rect x="62" y="105" width="26" height="34" fill={INK} />
        <rect x="70" y="105" width="4" height="34" fill={PANEL} opacity="0.5" />
        {/* her */}
        <rect x="100" y="86" width="30" height="5" fill={INK} />
        <rect x="106" y="78" width="16" height="10" fill={INK} />
        <rect x="104" y="91" width="20" height="14" fill={INK} />
        <rect x="102" y="91" width="4" height="18" fill={INK} />
        <rect x="126" y="91" width="4" height="18" fill={INK} />
        <rect x="106" y="95" width="16" height="4" fill={PANEL} />
        <rect x="111" y="102" width="6" height="2" fill={PANEL} />
        <rect x="102" y="105" width="28" height="34" fill={INK} />
        <rect x="110" y="105" width="3" height="34" fill={PANEL} opacity="0.4" />
        {/* schnauzer between them */}
        <rect x="88" y="118" width="18" height="14" fill={INK} />
        <rect x="86" y="115" width="4" height="8" fill={INK} />
        <rect x="104" y="115" width="4" height="8" fill={INK} />
        <rect x="90" y="126" width="14" height="7" fill={DIM} />
        <rect x="91" y="120" width="3" height="3" fill={DARK} />
        <rect x="100" y="120" width="3" height="3" fill={DARK} />
        <rect x="95" y="125" width="4" height="3" fill={DARK} />
      </g>

      {/* ── Pets-pattern poster + deep-thought bubble ─────── */}
      <g>
        <rect x="168" y="56" width="70" height="82" fill={INK} />
        <rect x="171" y="59" width="64" height="76" fill="url(#pets)" />
        {/* speech bubble */}
        <rect x="164" y="142" width="118" height="34" fill={DARK} stroke={INK} strokeWidth="1.5" />
        <polygon points="176,176 176,184 184,176" fill={DARK} stroke={INK} strokeWidth="1.5" />
        <T x={170} y={150} size={4.5} fill={AMBER}>[DEEP THOUGHT]</T>
        <T x={170} y={157} size={4}>This system is more</T>
        <T x={170} y={163} size={4}>powerful than my first 20.</T>
        <T x={170} y={169} size={4}>Automate cat&apos;s dinner?</T>
        <T x={170} y={175} size={4} fill={GREEN}>#ENSORLOGS</T>
      </g>

      {/* ── Sensor column left wall (IOT) ─────────────────── */}
      <g>
        <rect x="4" y="92" width="30" height="14" fill={PANEL} stroke={INK} strokeWidth="1" />
        <rect x="7" y="96" width="5" height="5" fill={GREEN} className="animate-led" />
        <T x={14} y={99} size={3.5}>MOTION</T>
        <T x={7} y={104} size={3}>AIR QUALITY</T>
        <rect x="4" y="110" width="24" height="13" fill={PANEL} stroke={INK} strokeWidth="1" />
        <rect x="7" y="113" width="2" height="6" fill={RED} />
        <rect x="10" y="115" width="2" height="4" fill={AMBER} />
        <T x={14} y={119} size={3.5}>22°C</T>
        {/* wifi + lock icons */}
        <path d="M38 96a8 8 0 0 1 10 0M40 99a4.5 4.5 0 0 1 6 0" stroke={INK} strokeWidth="1.2" fill="none" />
        <rect x="42" y="102" width="2" height="2" fill={INK} />
        <rect x="54" y="94" width="7" height="8" fill={INK} />
        <rect x="55.5" y="92" width="4" height="4" fill="none" stroke={INK} strokeWidth="1" />
        <rect x="56.5" y="97" width="2" height="3" fill={DARK} />
        {/* outlet */}
        <rect x="38" y="110" width="10" height="12" fill={PANEL} stroke={INK} strokeWidth="1" />
        <rect x="41" y="113" width="1.5" height="2" fill={INK} />
        <rect x="44" y="113" width="1.5" height="2" fill={INK} />
        <rect x="41" y="117" width="1.5" height="2" fill={INK} />
        <rect x="44" y="117" width="1.5" height="2" fill={INK} />
        <rect x="4" y="130" width="30" height="12" fill={PANEL} stroke={INK} strokeWidth="1" />
        <rect x="7" y="134" width="5" height="5" fill={INK} />
        <T x={14} y={138} size={3}>AIR 2/2</T>
      </g>

      {/* ── Server rack + labels (SERVER) ─────────────────── */}
      <g>
        <rect x="52" y="112" width="54" height="12" fill={PANEL} stroke={INK} strokeWidth="1" />
        <T x={55} y={120} size={3.5}>[CLICK ITEMS</T>
        <T x={55} y={124} size={3.5}> FOR LOGS]</T>
        {/* mini terminal on rack */}
        <rect x="58" y="98" width="34" height="13" fill={DARK} stroke={INK} strokeWidth="1" />
        <T x={61} y={103} size={3}>HOME ASSISTANT</T>
        <T x={61} y={108} size={3}>UBUNTU</T>
        <rect x="64" y="92" width="22" height="5" fill={PANEL} stroke={INK} strokeWidth="0.8" />
        {/* rack */}
        <rect x="52" y="126" width="56" height="92" fill={PANEL} stroke={INK} strokeWidth="1.5" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <rect x="56" y={130 + i * 14} width="48" height="11" fill={DARK} />
            <rect x="58" y={133 + i * 14} width="20" height="1" fill={DIM} />
            <rect x="58" y={136 + i * 14} width="20" height="1" fill={DIM} />
            <rect x="82" y={133 + i * 14} width="6" height="5" fill={PANEL} />
            <rect
              x="97"
              y={133 + i * 14}
              width="3"
              height="3"
              fill={i % 2 === 0 ? GREEN : AMBER}
              className="animate-led"
              style={{ animationDelay: `${i * 0.28}s` }}
            />
            <rect x="92" y={133 + i * 14} width="3" height="3" fill={GREEN} opacity="0.7" className="animate-led" style={{ animationDelay: `${i * 0.45}s` }} />
          </g>
        ))}
        <rect x="52" y="218" width="56" height="8" fill={INK} />
        <T x={55} y={224} size={3.5} fill={DARK}>HOME ASSISTANT UBUNTU</T>
      </g>

      {/* ── Pump corner (IOT) ─────────────────────────────── */}
      <g>
        <rect x="2" y="196" width="44" height="14" fill={PANEL} stroke={INK} strokeWidth="1" />
        <T x={4} y={202} size={3}>REVIEN LOG·</T>
        <T x={4} y={207} size={3}>SMART PUMP</T>
        <rect x="8" y="214" width="26" height="20" fill={PANEL} stroke={INK} strokeWidth="1.5" />
        <rect x="12" y="208" width="8" height="8" fill={INK} />
        <rect x="11" y="206" width="10" height="3" fill={INK} />
        <rect x="13" y="218" width="16" height="12" fill={DARK} />
        <rect x="15" y="221" width="12" height="2" fill={DIM} />
        <rect x="15" y="225" width="12" height="2" fill={DIM} />
        <rect x="30" y="216" width="3" height="3" fill={GREEN} className="animate-led" />
        <rect x="36" y="218" width="8" height="16" fill={PANEL} />
      </g>

      {/* ── Desk, person, schnauzer (DEV) ─────────────────── */}
      <g>
        {/* rug */}
        <rect x="120" y="206" width="120" height="34" fill={PANEL} opacity="0.8" />
        <rect x="120" y="206" width="120" height="3" fill={INK} opacity="0.4" />
        <rect x="120" y="237" width="120" height="3" fill={INK} opacity="0.4" />
        {/* desk */}
        <rect x="112" y="176" width="140" height="7" fill={INK} />
        <rect x="118" y="183" width="6" height="40" fill={INK} />
        <rect x="238" y="183" width="6" height="40" fill={INK} />
        {/* laptop */}
        <rect x="116" y="160" width="26" height="16" fill={DARK} stroke={INK} strokeWidth="1.2" />
        <rect x="127" y="166" width="4" height="4" fill={INK} />
        <rect x="116" y="176" width="30" height="3" fill={INK} />
        {/* chair */}
        <rect x="188" y="150" width="8" height="48" fill={INK} />
        <rect x="172" y="188" width="34" height="6" fill={INK} />
        <rect x="186" y="194" width="5" height="24" fill={DIM} />
        <rect x="178" y="218" width="22" height="4" fill={DIM} />
        {/* person: seated, thinking */}
        <rect x="164" y="140" width="20" height="18" fill={INK} />          {/* head */}
        <rect x="162" y="136" width="24" height="8" fill={INK} />          {/* hair top */}
        <rect x="162" y="144" width="4" height="10" fill={INK} />          {/* hair side */}
        <rect x="166" y="145" width="6" height="5" fill={DARK} />          {/* glasses l */}
        <rect x="176" y="145" width="6" height="5" fill={DARK} />          {/* glasses r */}
        <rect x="172" y="146.5" width="4" height="1.5" fill={DARK} />      {/* bridge */}
        <rect x="166" y="158" width="18" height="32" fill={INK} />         {/* torso */}
        <rect x="182" y="160" width="10" height="18" fill={INK} />         {/* arm */}
        <rect x="180" y="152" width="8" height="10" fill={INK} />          {/* forearm→chin */}
        <rect x="180" y="150" width="6" height="4" fill={DARK} />          {/* hand on chin */}
        <rect x="168" y="190" width="9" height="24" fill={INK} />          {/* leg l */}
        <rect x="180" y="190" width="9" height="24" fill={INK} />          {/* leg r */}
        <rect x="166" y="214" width="11" height="5" fill={DARK} />         {/* shoe l */}
        <rect x="178" y="214" width="11" height="5" fill={DARK} />         {/* shoe r */}
        {/* schnauzer lying under desk */}
        <rect x="200" y="222" width="34" height="12" fill={INK} />
        <rect x="196" y="218" width="10" height="14" fill={INK} />
        <rect x="194" y="216" width="4" height="6" fill={INK} />
        <rect x="204" y="216" width="4" height="6" fill={INK} />
        <rect x="196" y="228" width="10" height="5" fill={DIM} />
        <rect x="198" y="221" width="2" height="2" fill={DARK} />
        <rect x="203" y="221" width="2" height="2" fill={DARK} />
        <rect x="200" y="225" width="3" height="2" fill={DARK} />
        <rect x="232" y="226" width="6" height="4" fill={INK} />           {/* tail */}
        {/* click tag over desk */}
        <rect x="116" y="150" width="62" height="10" fill={DARK} stroke={INK} strokeWidth="1" />
        <T x={119} y={157} size={3.5}>[CLICK ITEMS FOR LOGS]</T>
      </g>

      {/* ── Door + smart lock (IOT) ───────────────────────── */}
      <g>
        {/* sign above door */}
        <rect x="248" y="62" width="146" height="42" fill={DARK} stroke={INK} strokeWidth="1.5" />
        <T x={253} y={72} size={4} fill={GREEN}>← GO BACK</T>
        <T x={253} y={81} size={4}>WHAT&apos;S THIS?/</T>
        <T x={253} y={88} size={4}>[CLICK ITEMS FOR LOGS]</T>
        <T x={253} y={95} size={4}>SYSTEM ARCHITECTURE</T>
        <T x={253} y={101} size={4}>WEB DEVELOPMENT</T>
        {/* neon sign */}
        <rect x="258" y="108" width="130" height="18" fill={PANEL} stroke={INK} strokeWidth="1.5" />
        <T x={262} y={120} size={7} fill={AMBER}>Campfire Loving</T>
        <rect x="276" y="128" width="78" height="12" fill={GREEN} />
        <T x={282} y={137} size={5} fill={DARK}>ENSORLOGS</T>
        {/* door */}
        <rect x="254" y="142" width="58" height="80" fill={PANEL} stroke={INK} strokeWidth="1.5" />
        <rect x="259" y="147" width="48" height="70" fill="#1a1128" />
        <rect x="263" y="151" width="40" height="26" fill="none" stroke={DIM} strokeWidth="1" />
        <rect x="263" y="184" width="40" height="28" fill="none" stroke={DIM} strokeWidth="1" />
        {/* smart lock keypad */}
        <rect x="307" y="176" width="10" height="18" fill={INK} />
        <rect x="309" y="178" width="6" height="3" fill={DARK} />
        <rect x="309" y="183" width="2" height="2" fill={DARK} />
        <rect x="313" y="183" width="2" height="2" fill={DARK} />
        <rect x="309" y="187" width="2" height="2" fill={DARK} />
        <rect x="313" y="187" width="2" height="2" fill={DARK} />
        <rect x="310" y="191" width="4" height="2" fill={GREEN} className="animate-led" />
        {/* handle */}
        <rect x="300" y="196" width="8" height="3" fill={INK} />
        {/* air temp tag */}
        <rect x="216" y="118" width="34" height="14" fill={PANEL} stroke={INK} strokeWidth="1" />
        <T x={219} y={123} size={3}>AIR TEMP:</T>
        <T x={219} y={129} size={3}>  22°C</T>
      </g>

      {/* ── Right wall: outlets, switch, red sox tv (FUN) ─── */}
      <g>
        {/* outlets */}
        <rect x="372" y="146" width="12" height="10" fill={PANEL} stroke={INK} strokeWidth="1" />
        <rect x="375" y="149" width="1.5" height="2" fill={INK} />
        <rect x="380" y="149" width="1.5" height="2" fill={INK} />
        <rect x="372" y="160" width="12" height="10" fill={PANEL} stroke={INK} strokeWidth="1" />
        <rect x="375" y="163" width="1.5" height="2" fill={INK} />
        <rect x="380" y="163" width="1.5" height="2" fill={INK} />
        {/* switch on shelf */}
        <rect x="342" y="150" width="24" height="14" fill={DARK} stroke={INK} strokeWidth="1" />
        <rect x="345" y="152" width="14" height="10" fill={INK} />
        <rect x="342" y="150" width="3" height="14" fill="#3b82f6" />
        <rect x="363" y="150" width="3" height="14" fill={RED} />
        <T x={342} y={170} size={3.5}>NINTENDO</T>
        <T x={345} y={175} size={3.5}>SWITCH</T>
        {/* red sox tv */}
        <rect x="334" y="178" width="62" height="44" fill={DARK} stroke={INK} strokeWidth="1.5" />
        <rect x="338" y="182" width="54" height="30" fill={PANEL} />
        <rect x="338" y="182" width="54" height="30" fill="url(#hatch)" />
        <T x={346} y={200} size={7} fill={INK}>RED SOX</T>
        <rect x="352" y="212" width="26" height="4" fill={INK} />
        <rect x="356" y="216" width="18" height="3" fill={DIM} />
        {/* domotica tag */}
        <rect x="332" y="226" width="66" height="16" fill={PANEL} stroke={INK} strokeWidth="1" />
        <T x={334} y={232} size={3}>DOMOTICA:</T>
        <T x={334} y={238} size={3}>LIGHTS,SENSORS,LOCKS</T>
        {/* books under tv */}
        <rect x="318" y="228" width="12" height="14" fill={PANEL} />
        <rect x="320" y="229" width="1.5" height="12" fill={DIM} />
        <rect x="323" y="230" width="1.5" height="11" fill={INK} opacity="0.6" />
        <rect x="326" y="229" width="1.5" height="12" fill={DIM} />
      </g>

      {/* ── Right side desk + system log monitor ──────────── */}
      <g>
        <rect x="252" y="222" width="146" height="7" fill={INK} />
        <rect x="258" y="229" width="6" height="20" fill={INK} />
        <rect x="388" y="229" width="6" height="20" fill={INK} />
        {/* monitor */}
        <rect x="286" y="180" width="76" height="44" fill={DARK} stroke={INK} strokeWidth="1.5" />
        <rect x="290" y="184" width="68" height="32" fill={PANEL} />
        <rect x="292" y="186" width="8" height="26" fill={DARK} />
        {[188, 194, 200, 206].map((y) => (
          <rect key={y} x="294" y={y} width="4" height="3" fill={DIM} />
        ))}
        <T x={302} y={194} size={4}>SYSTEM LOG:</T>
        <T x={302} y={202} size={4}>BACKUP</T>
        <T x={302} y={210} size={4} fill={GREEN}>COMPLETE</T>
        <rect x="318" y="216" width="12" height="6" fill={DIM} />
        {/* quality tags */}
        <rect x="264" y="188" width="20" height="16" fill={PANEL} stroke={INK} strokeWidth="1" />
        <T x={266} y={194} size={3}>MOTION</T>
        <T x={266} y={200} size={3} fill={GREEN}>2.0</T>
        <rect x="264" y="206" width="20" height="12" fill={PANEL} stroke={INK} strokeWidth="1" />
        <T x={266} y={214} size={3}>QUALITY</T>
        {/* mug */}
        <rect x="272" y="214" width="8" height="8" fill={INK} />
        <rect x="280" y="216" width="3" height="4" fill={INK} />
      </g>

      {/* ── Hotspot zones + markers ───────────────────────── */}
      <Zone x={40} y={56} w={124} h={98} id="about" label={labels.about} onHotspot={onHotspot} />
      <Zone x={108} y={132} w={148} h={108} id="dev" label={labels.dev} onHotspot={onHotspot} />
      <Zone x={280} y={172} w={90} h={56} id="dev" label={labels.dev} onHotspot={onHotspot} />
      <Zone x={48} y={88} w={64} h={140} id="server" label={labels.server} onHotspot={onHotspot} />
      <Zone x={246} y={140} w={76} h={86} id="iot" label={labels.iot} onHotspot={onHotspot} />
      <Zone x={0} y={88} w={52} h={58} id="iot" label={labels.iot} onHotspot={onHotspot} />
      <Zone x={0} y={190} w={50} h={58} id="iot" label={labels.iot} onHotspot={onHotspot} />
      <Zone x={316} y={142} w={80} h={102} id="fun" label={labels.fun} onHotspot={onHotspot} />

      <Marker x={102} y={52} label={labels.about} />
      <Marker x={182} y={128} label={labels.dev} />
      <Marker x={324} y={168} label={labels.dev} />
      <Marker x={80} y={84} label={labels.server} />
      <Marker x={283} y={136} label={labels.iot} />
      <Marker x={25} y={84} label={labels.iot} />
      <Marker x={24} y={186} label={labels.iot} />
      <Marker x={354} y={140} label={labels.fun} />
    </svg>
  );
}
