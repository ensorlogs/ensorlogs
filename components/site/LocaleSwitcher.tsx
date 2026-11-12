"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LocaleSwitcher() {
  const t = useTranslations("a11y");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const next = locale === "es" ? "en" : "es";

  return (
    <button
      onClick={() => router.replace(pathname, { locale: next })}
      aria-label={t("switch_locale")}
      className="font-pixel border-line-2 hover:border-amber border-2 bg-panel px-2 py-1.5 text-[0.55rem] text-fg transition-colors hover:text-amber"
    >
      {next.toUpperCase()}
    </button>
  );
}
