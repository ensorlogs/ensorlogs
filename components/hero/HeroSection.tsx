"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import RoomScene from "./RoomScene";
import { HOTSPOT_IDS, type HotspotId } from "./hotspots";
import RetroWindow from "@/components/os/RetroWindow";
import ContactForm from "@/components/contact/ContactForm";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import type { Log } from "@/lib/types";
import { Link } from "@/i18n/navigation";

const STACKS: Partial<Record<HotspotId, { icon: string; name: string }[]>> = {
  server: [
    { icon: "ubuntu", name: "Ubuntu" },
    { icon: "docker", name: "Docker" },
    { icon: "homeassistant", name: "Home Assistant" },
    { icon: "truenas", name: "TrueNAS" },
    { icon: "nginx", name: "Nginx" },
  ],
  dev: [
    { icon: "nodedotjs", name: "Node.js" },
    { icon: "python", name: "Python" },
    { icon: "devin", name: "Devin AI" },
    { icon: "cursor", name: "Cursor" },
    { icon: "wordpress", name: "WordPress" },
  ],
  iot: [
    { icon: "homeassistant", name: "Home Assistant" },
    { icon: "homey", name: "Homey" },
    { icon: "zigbee", name: "Zigbee" },
    { icon: "matter", name: "Matter" },
    { icon: "apple", name: "Apple Home" },
    { icon: "googleassistant", name: "Google Assistant" },
    { icon: "alexa", name: "Alexa" },
    { icon: "tuya", name: "Tuya" },
  ],
};

export default function HeroSection({ logs }: { logs: Log[] }) {
  const t = useTranslations();
  const locale = useLocale();
  const [active, setActive] = useState<HotspotId | null>(null);

  // menu (or ?z= param) can open a hotspot modal from anywhere
  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if ((HOTSPOT_IDS as readonly string[]).includes(id)) {
        setActive(id as HotspotId);
      }
    };
    window.addEventListener("ensor:open-zone", handler);
    const z = new URLSearchParams(window.location.search).get("z");
    if (z && (HOTSPOT_IDS as readonly string[]).includes(z)) {
      requestAnimationFrame(() => setActive(z as HotspotId));
    }
    return () => window.removeEventListener("ensor:open-zone", handler);
  }, []);

  const labels = Object.fromEntries(
    HOTSPOT_IDS.map((id) => [id, t(`hotspots.${id}.label`)])
  ) as Record<HotspotId, string>;

  const fmt = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const isText =
    active !== null &&
    active !== "contact" &&
    active !== "logs" &&
    active !== "newsletter";
  const body = isText ? t(`hotspots.${active}.body`) : "";
  const hasCta = isText ? t.has(`hotspots.${active}.cta`) : false;

  return (
    <section className="relative h-dvh w-full">
      <RoomScene onHotspot={setActive} labels={labels} />

      <p className="font-term pointer-events-none absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap bg-ink/70 px-3 py-1 text-center text-dim backdrop-blur-sm md:block">
        <span className="text-phosphor">▸</span> {t("hero.hint_desktop")}
      </p>
      <p className="font-term pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap bg-ink/70 px-3 py-1 text-center text-dim backdrop-blur-sm md:hidden">
        <span className="text-phosphor">▸</span> {t("hero.hint_mobile")}
      </p>

      <RetroWindow
        open={active !== null}
        onClose={() => setActive(null)}
        title={active ? t(`hotspots.${active}.title`) : ""}
      >
        {active === "contact" && <ContactForm />}

        {active === "newsletter" && (
          <div>
            <p className="font-term mb-4 text-lg text-fg">
              {t("hotspots.newsletter.body")}
            </p>
            <NewsletterForm />
          </div>
        )}

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
                  {line.split("Nina Marquina").flatMap((part, j) =>
                    j === 0
                      ? [part]
                      : [
                          <a
                            key={j}
                            href="https://ninamarquina.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber underline decoration-dotted underline-offset-4 hover:text-amber-soft"
                          >
                            Nina Marquina
                          </a>,
                          part,
                        ]
                  )}
                </p>
              )
            )}
            {active && STACKS[active] && (
              <div className="mt-5 flex flex-wrap gap-2">
                {STACKS[active]!.map((s) => (
                  <span
                    key={s.name}
                    className="pixel-border bg-ink-2 flex items-center gap-2 px-2.5 py-1.5"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/stack/${s.icon}.svg`}
                      alt=""
                      className="h-4 w-4"
                    />
                    <span className="font-term text-sm text-fg">{s.name}</span>
                  </span>
                ))}
              </div>
            )}
            {hasCta && (
              <button
                onClick={() => setActive("contact")}
                className="font-pixel pixel-border-amber mt-5 inline-block bg-amber px-4 py-2.5 text-[0.55rem] text-ink"
              >
                {t(`hotspots.${active}.cta`)}
              </button>
            )}
            {active === "dev" && (
              <>
                <Link
                  href="/proyectos"
                  className="font-pixel pixel-border mt-4 inline-block border-amber bg-ink-2 px-4 py-2.5 text-[0.55rem] text-amber transition-colors hover:bg-amber hover:text-ink"
                >
                  {t("hotspots.dev.cta_projects")}
                </Link>
                <div className="border-line mt-4 border-t-2 pt-3">
                  <p className="font-term mb-2 text-base text-dim">
                    {t("newsletter.pitch")}
                  </p>
                  <button
                    onClick={() => setActive("newsletter")}
                    className="font-term text-lg text-amber underline decoration-dotted underline-offset-4 hover:text-amber-soft"
                  >
                    {t("newsletter.cta")}
                  </button>
                </div>
              </>
            )}
            {active === "me" && (
              <div className="border-line mt-4 border-t-2 pt-4">
                <ContactForm />
              </div>
            )}
          </div>
        )}
      </RetroWindow>
    </section>
  );
}
