import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="border-line mt-16 border-t-2 bg-ink-2">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 py-8 text-center">
        <p className="font-pixel text-[0.55rem] text-amber">
          ENSOR<span className="text-fg">.LOGS</span>
        </p>
        <p className="font-term text-lg text-dim">{t("tagline")}</p>
        <p className="font-term text-sm text-line-2">
          {t("built")} — {t("rights", { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
