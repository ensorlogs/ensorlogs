"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import RoomScene from "./RoomScene";
import { HOTSPOT_IDS, type HotspotId } from "./hotspots";
import RetroWindow from "@/components/os/RetroWindow";
import ContactForm from "@/components/contact/ContactForm";
import type { Log } from "@/lib/types";
import { Link } from "@/i18n/navigation";

export default function HeroSection({ logs }: { logs: Log[] }) {
  const t = useTranslations();
  const locale = useLocale();
  const [active, setActive] = useState<HotspotId | null>(null);

  const labels = Object.fromEntries(
    HOTSPOT_IDS.map((id) => [id, t(`hotspots.${id}.label`)])
  ) as Record<HotspotId, string>;

  const fmt = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const isText = active !== null && active !== "contact" && active !== "logs";
  const body = isText ? t(`hotspots.${active}.body`) : "";
  const tags: string[] = isText
    ? (t.raw(`hotspots.${active}.tags`) as string[])
    : [];
  const hasCta = isText ? t.has(`hotspots.${active}.cta`) : false;

  return (
    <section className="relative flex min-h-[calc(100dvh-5rem)] flex-col justify-center">
      <div className="pixel-border-amber relative overflow-hidden">
        <RoomScene onHotspot={setActive} labels={labels} />
      </div>

      <p className="font-term mt-3 hidden text-center text-dim md:block">
        <span className="text-phosphor">▸</span> {t("hero.hint_desktop")}
      </p>
      <p className="font-term mt-3 text-center text-dim md:hidden">
        <span className="text-phosphor">▸</span> {t("hero.hint_mobile")}
      </p>

      <RetroWindow
        open={active !== null}
        onClose={() => setActive(null)}
        title={active ? t(`hotspots.${active}.title`) : ""}
      >
        {active === "contact" && <ContactForm />}

        {active === "logs" && (
          <div>
            {logs.length === 0 ? (
              <p className="font-term text-lg text-dim">
                {t("hotspots.logs.empty")}
              </p>
            ) : (
              <ul className="divide-line divide-y-2">
                {logs.slice(0, 6).map((log) => (
                  <li key={log.id}>
                    <Link
                      href={`/logs/${log.slug}`}
                      className="group flex items-baseline gap-3 py-2.5"
                    >
                      <span className="font-term shrink-0 text-sm text-phosphor">
                        {log.type === "story" ? "▶" : "▪"}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="font-term block truncate text-lg text-fg group-hover:text-amber">
                          {log.title}
                        </span>
                        <span className="font-term text-sm text-dim">
                          {log.publishedAt
                            ? fmt.format(new Date(log.publishedAt))
                            : `#${log.logNumber}`}
                          {log.category ? ` · ${log.category}` : ""}
                        </span>
                      </span>
                      <span className="font-term text-lg text-amber opacity-0 transition-opacity group-hover:opacity-100">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <Link
              href="/logs"
              className="font-term mt-4 inline-block text-lg text-amber underline decoration-dotted underline-offset-4 hover:text-amber-soft"
            >
              {t("hotspots.logs.all")}
            </Link>
          </div>
        )}

        {isText && (
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
                  className="font-term border-line bg-ink-2 border px-2 py-0.5 text-sm text-dim"
                >
                  #{tag}
                </li>
              ))}
            </ul>
            {hasCta && (
              <button
                onClick={() => setActive("contact")}
                className="font-pixel pixel-border-amber mt-5 inline-block bg-amber px-4 py-2.5 text-[0.55rem] text-ink"
              >
                {t(`hotspots.${active}.cta`)}
              </button>
            )}
          </div>
        )}
      </RetroWindow>
    </section>
  );
}
