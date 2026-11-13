"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { DESKTOP_ZONES, MOBILE_ZONES, type Zone } from "./room-zones";
import type { HotspotId } from "./hotspots";

type RoomSceneProps = {
  onHotspot: (id: HotspotId) => void;
  labels: Record<HotspotId, string>;
};

function ZoneButton({
  zone,
  zoneKey,
  label,
  active,
  onActivate,
  onHotspot,
}: {
  zone: Zone;
  zoneKey: string;
  label?: string;
  active: boolean;
  onActivate: (key: string | null) => void;
  onHotspot: (id: HotspotId) => void;
}) {
  const isEgg = Boolean(zone.egg);

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
        if (zone.id) onHotspot(zone.id);
        else onActivate(active ? null : zoneKey);
      }}
    >
      {/* glow on hover */}
      <span
        className={`absolute inset-0 rounded-sm transition-all duration-200 ${
          active
            ? "shadow-[0_0_0_2px_#ffb000,0_0_24px_4px_rgba(255,176,0,0.35),inset_0_0_30px_rgba(255,176,0,0.12)]"
            : "shadow-none"
        }`}
      />
      {/* label / tooltip chip */}
      {label && (
        <span
          className={`font-term pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 whitespace-nowrap border-2 px-2 py-0.5 text-base transition-all duration-150 ${
            isEgg
              ? "border-phosphor bg-ink text-phosphor"
              : "border-amber bg-ink text-amber"
          } ${active ? "-top-8 opacity-100" : "-top-6 opacity-0"}`}
        >
          {label}
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
          active={activeZone === key}
          onActivate={setActiveZone}
          onHotspot={onHotspot}
        />
      );
    });

  return (
    <div className="relative">
      {/* desktop scene */}
      <div className="relative hidden md:block">
        <Image
          src="/room-desktop.jpg"
          alt="La habitación de Ensor: escritorio con doble monitor, rack de servidor, dispositivos de domótica y su Schnauzer"
          width={1024}
          height={576}
          priority
          className="h-auto w-full"
        />
        {renderZones(DESKTOP_ZONES, "d")}
        <Markers zones={DESKTOP_ZONES} />
      </div>

      {/* mobile scene */}
      <div className="relative md:hidden">
        <Image
          src="/room-mobile.jpg"
          alt="La habitación de Ensor en versión vertical"
          width={576}
          height={1024}
          priority
          className="h-auto w-full"
        />
        {renderZones(MOBILE_ZONES, "m")}
        <Markers zones={MOBILE_ZONES} />
      </div>
    </div>
  );
}
