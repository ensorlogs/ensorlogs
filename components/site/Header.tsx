"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/logs", key: "logs" },
  { href: "/#contact", key: "contact" },
] as const;

export default function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-line sticky top-0 z-40 border-b-2 bg-ink/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/ensor-avatar.png"
            alt="Ensor"
            width={36}
            height={36}
            className="pixelated border-line-2 border-2"
            priority
          />
          <span className="font-pixel text-[0.65rem] text-amber sm:text-xs">
            ENSOR<span className="text-fg">.LOGS</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          {NAV_ITEMS.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className={`font-term text-xl transition-colors hover:text-amber ${
                pathname === href ? "text-amber" : "text-dim"
              }`}
            >
              {t(`nav.${key}`)}
            </Link>
          ))}
          <LocaleSwitcher />
        </nav>

        <div className="flex items-center gap-3 sm:hidden">
          <LocaleSwitcher />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={t("a11y.open_menu")}
            aria-expanded={open}
            className="pixel-border font-pixel bg-panel px-2 py-2 text-[0.55rem] text-amber"
          >
            {open ? "×" : "≡"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-line border-t-2 bg-ink-2 sm:hidden">
          <ul>
            {NAV_ITEMS.map(({ href, key }) => (
              <li key={key}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`font-term block px-4 py-3 text-xl ${
                    pathname === href ? "text-amber" : "text-fg"
                  }`}
                >
                  <span className="text-phosphor">▸</span> {t(`nav.${key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
