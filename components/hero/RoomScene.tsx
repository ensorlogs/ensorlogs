"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { DESKTOP_ZONES, MOBILE_ZONES, type Zone } from "./room-zones";
import type { HotspotId } from "./hotspots";
import {
  playWoof,
  playPour,
  playNintendo,
  playXbox,
  playBulb,
  playPlug,
  playBoot,
  playTiger,
} from "@/lib/sfx";

type RoomSceneProps = {
  onHotspot: (id: HotspotId) => void;
  labels: Record<HotspotId, string>;
};

function ZoneButton({
  zone,
  zoneKey,
  label,
  ctaHint,
  active,
  onActivate,
  onHotspot,
}: {
  zone: Zone;
  zoneKey: string;
  label?: string;
  ctaHint?: string;
  active: boolean;
  onActivate: (key: string | null) => void;
  onHotspot: (id: HotspotId) => void;
}) {
  const isEgg = Boolean(zone.egg);

  // keep the tooltip chip inside the scene: anchor to the nearest side and
  // drop below zones that sit near the top edge
  const cx = zone.x + zone.w / 2;
  const hPos =
    cx < 25 ? "left-0" : cx > 75 ? "right-0" : "left-1/2 -translate-x-1/2";
  const vPos = zone.y < 15 ? "top-full mt-2" : "bottom-full mb-2";

  return (
    <button
      type="button"
      aria-label={label}
      className="group absolute cursor-pointer rounded-sm outline-none"
      style={{
        left: `${zone.x}%`,
        top: `${zone.y}%`,
        width: `${zone.w}%`,
        height: `${zone.h}%`,
      }}
      onMouseEnter={() => onActivate(zoneKey)}
      onMouseLeave={() => onActivate(null)}
      onFocus={() => onActivate(zoneKey)}
      onBlur={() => onActivate(null)}
      onClick={() => {
        if (zone.sfx === "woof") playWoof();
        if (zone.sfx === "coffee") playPour();
        if (zone.sfx === "nintendo") playNintendo();
        if (zone.sfx === "xbox") playXbox();
        if (zone.sfx === "bulb") playBulb();
        if (zone.sfx === "plug") playPlug();
        if (zone.sfx === "boot") playBoot();
        if (zone.sfx === "tiger") playTiger();
        if (zone.id) onHotspot(zone.id);
        else if (zone.cta) onHotspot(zone.cta);
        else onActivate(active ? null : zoneKey);
      }}
    >
      {/* centered dot highlight — same language as the pulsing markers */}
      <span
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      >
        <span
          className={`block h-4 w-4 rounded-full border-2 ${
            isEgg
              ? "border-phosphor bg-phosphor/60 shadow-[0_0_14px_3px_rgba(51,255,51,0.5)]"
              : "border-amber bg-amber/60 shadow-[0_0_14px_3px_rgba(255,176,0,0.5)]"
          }`}
        />
      </span>
      {/* label / tooltip chip — anchored so it never clips the scene edge */}
      {label && (
        <span
          className={`font-term pointer-events-none absolute z-10 w-max max-w-[85vw] whitespace-normal border-2 px-2 py-0.5 text-base transition-all duration-150 ${hPos} ${vPos} ${
            isEgg
              ? "border-phosphor bg-ink text-phosphor"
              : "border-amber bg-ink text-amber"
          } ${active ? "opacity-100" : "opacity-0"}`}
        >
          {label}
          {ctaHint && (
            <span className="font-term block text-sm text-amber">
              {ctaHint}
            </span>
          )}
        </span>
      )}
    </button>
  );
}

function Markers({ zones }: { zones: Zone[] }) {
  return (
    <>
      {zones
        .filter((z) => z.marker)
        .map((z, i) => (
          <div
            key={i}
            className="pointer-events-none absolute"
            style={{ left: `${z.marker!.x}%`, top: `${z.marker!.y}%` }}
          >
            <span className="animate-pulse-dot block h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber bg-amber/60 shadow-[0_0_12px_2px_rgba(255,176,0,0.6)]" />
          </div>
        ))}
    </>
  );
}

export default function RoomScene({ onHotspot, labels }: RoomSceneProps) {
  const t = useTranslations();
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const zoneLabel = (z: Zone) =>
    z.egg ? t(`eggs.${z.egg}`) : z.id ? labels[z.id] : undefined;

  const renderZones = (zones: Zone[], prefix: string) =>
    zones.map((z, i) => {
      const key = `${prefix}-${i}`;
      return (
        <ZoneButton
          key={key}
          zone={z}
          zoneKey={key}
          label={zoneLabel(z)}
          ctaHint={z.cta ? t("eggs.cta") : undefined}
          active={activeZone === key}
          onActivate={setActiveZone}
          onHotspot={onHotspot}
        />
      );
    });

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      {/* desktop scene — shown on landscape-ish viewports; the inner box
          covers the screen at the image's aspect ratio (crops, never
          stretches) so %-positioned zones stay aligned */}
      <div className="absolute top-1/2 left-1/2 hidden aspect-[16/9] w-[max(100vw,177.78dvh)] -translate-x-1/2 -translate-y-1/2 [@media(min-aspect-ratio:4/3)]:block">
        <Image
          src="/room-desktop-4x.jpg"
          alt="La habitación de Ensor: escritorio con doble monitor, rack de servidor, dispositivos de domótica y su Schnauzer"
          fill
          priority
          unoptimized
          className="object-cover"
        />
        {renderZones(DESKTOP_ZONES, "d")}
        <Markers zones={DESKTOP_ZONES} />
      </div>

      {/* mobile scene — portrait-ish viewports */}
      <div className="absolute top-1/2 left-1/2 aspect-[9/16] w-[max(100vw,56.25dvh)] -translate-x-1/2 -translate-y-1/2 [@media(min-aspect-ratio:4/3)]:hidden">
        <Image
          src="/room-mobile-4x.jpg"
          alt="La habitación de Ensor en versión vertical"
          fill
          priority
          unoptimized
          className="object-cover"
        />
        {renderZones(MOBILE_ZONES, "m")}
        <Markers zones={MOBILE_ZONES} />
      </div>
    </div>
  );
}
