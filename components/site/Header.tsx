"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import MusicToggle from "./MusicToggle";
import SocialLinks from "./SocialLinks";

// zone entries open the matching hotspot modal on the home room;
// href entries navigate to a page
const MENU_ITEMS = [
  { key: "services", zone: "dev" },
  { key: "logs", zone: "logs" },
  { key: "projects", href: "/proyectos" },
  { key: "contact", zone: "contact" },
  { key: "newsletter", zone: "newsletter" },
] as const;

export default function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function openZone(zone: string) {
    setOpen(false);
    if (pathname === "/") {
      window.dispatchEvent(
        new CustomEvent("ensor:open-zone", { detail: zone })
      );
    } else {
      router.push(`/?z=${zone}`);
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="flex items-center justify-end gap-2 px-4 py-3">
        <Link
          href="/"
          className="pixel-border bg-ink/80 px-3 py-2 backdrop-blur-sm"
        >
          <span className="font-pixel terminal-glow text-sm text-amber sm:text-base">
            ENSOR<span className="text-fg">.LOGS</span>
          </span>
        </Link>

        <MusicToggle />

        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={t("a11y.open_menu")}
            aria-expanded={open}
            className="pixel-border font-pixel bg-ink/80 px-3 py-2.5 text-[0.65rem] text-amber backdrop-blur-sm"
          >
            {open ? "×" : "≡"}
          </button>
          {open && (
            <nav className="pixel-border absolute right-0 top-full mt-2 w-52 bg-ink/90 backdrop-blur-sm">
              <ul>
                {MENU_ITEMS.map((item) => (
                  <li key={item.key}>
                    {"href" in item ? (
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="font-pixel block w-full px-4 py-3 text-left text-[0.55rem] tracking-wider text-fg hover:bg-panel hover:text-amber"
                      >
                        <span className="text-phosphor">▸</span>{" "}
                        {t(`nav.${item.key}`)}
                      </Link>
                    ) : (
                      <button
                        onClick={() => openZone(item.zone)}
                        className="font-pixel block w-full px-4 py-3 text-left text-[0.55rem] tracking-wider text-fg hover:bg-panel hover:text-amber"
                      >
                        <span className="text-phosphor">▸</span>{" "}
                        {t(`nav.${item.key}`)}
                      </button>
                    )}
                  </li>
                ))}
                <li className="border-line flex items-center justify-between border-t-2 px-4 py-3">
                  <span className="font-pixel text-[0.55rem] text-dim">
                    {t("nav.lang")}
                  </span>
                  <LocaleSwitcher />
                </li>
                <li className="border-line flex items-center justify-between border-t-2 px-4 py-3">
                  <span className="font-pixel text-[0.55rem] text-dim">
                    {t("nav.social")}
                  </span>
                  <SocialLinks />
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
