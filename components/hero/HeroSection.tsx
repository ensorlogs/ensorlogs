"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import RoomScene from "./RoomScene";
import { HOTSPOT_IDS, type HotspotId } from "./hotspots";
import RetroWindow from "@/components/os/RetroWindow";
import { Link } from "@/i18n/navigation";

export default function HeroSection() {
  const t = useTranslations();
  const [active, setActive] = useState<HotspotId | null>(null);

  const labels = Object.fromEntries(
    HOTSPOT_IDS.map((id) => [id, t(`hotspots.${id}.label`)])
  ) as Record<HotspotId, string>;

  const body = active ? t(`hotspots.${active}.body`) : "";
  const tags: string[] = active
    ? (t.raw(`hotspots.${active}.tags`) as string[])
    : [];
  const hasCta = active ? t.has(`hotspots.${active}.cta`) : false;

  return (
    <section className="relative">
      <p className="font-term text-dim">{t("hero.kicker")}</p>
      <h1 className="terminal-glow font-pixel mt-3 text-2xl text-amber sm:text-4xl">
        {t("hero.title")}
      </h1>
      <p className="font-term mt-3 text-xl text-fg sm:text-2xl">
        {t("hero.subtitle")}
      </p>

      <div className="pixel-border-amber relative mt-6 overflow-hidden">
        <RoomScene onHotspot={setActive} labels={labels} />
      </div>

      <p className="font-term mt-3 hidden text-dim md:block">
        <span className="text-phosphor">▸</span> {t("hero.hint_desktop")}
      </p>
      <p className="font-term mt-3 text-dim md:hidden">
        <span className="text-phosphor">▸</span> {t("hero.hint_mobile")}
      </p>

      {/* Mobile shortcut list — same hotspots, larger touch targets */}
      <nav aria-label={t("hero.hotspots_label")} className="mt-4 md:hidden">
        <ul className="grid grid-cols-2 gap-2">
          {HOTSPOT_IDS.map((id) => (
            <li key={id}>
              <button
                onClick={() => setActive(id)}
                className="pixel-border font-term w-full bg-panel px-3 py-2 text-left text-lg text-amber active:bg-panel-2"
              >
                <span className="text-phosphor">▪</span> {labels[id]}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <RetroWindow
        open={active !== null}
        onClose={() => setActive(null)}
        title={active ? t(`hotspots.${active}.title`) : ""}
      >
        {active && (
          <div>
            <h2 className="font-pixel mb-4 text-xs text-amber">
              {t(`hotspots.${active}.heading`)}
            </h2>
            {body.split("\n").map((line, i) =>
              line.trim() === "" ? (
                <div key={i} className="h-3" />
              ) : (
                <p key={i} className="font-term mb-1 text-lg text-fg">
                  {line}
                </p>
              )
            )}
            <ul className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="font-term border border-line bg-ink-2 px-2 py-0.5 text-sm text-dim"
                >
                  #{tag}
                </li>
              ))}
            </ul>
            {hasCta && (
              <Link
                href="/#contact"
                onClick={() => setActive(null)}
                className="font-pixel pixel-border-amber mt-5 inline-block bg-amber px-4 py-2.5 text-[0.55rem] text-ink"
              >
                {t(`hotspots.${active}.cta`)}
              </Link>
            )}
          </div>
        )}
      </RetroWindow>
    </section>
  );
}
