import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import WindowFrame from "@/components/os/WindowFrame";

const ICONS: Record<string, string> = {
  domotics: "⌂",
  ai: "◉",
  construtech: "▦",
  tourism: "✈",
};

const KEYS = ["domotics", "ai", "construtech", "tourism"] as const;
const ACCENTS = ["amber", "phosphor", "sky", "amber"] as const;

export default function ServicesGrid() {
  const t = useTranslations("services");

  return (
    <section aria-labelledby="services-title">
      <p className="font-term text-dim">{t("kicker")}</p>
      <h2
        id="services-title"
        className="font-pixel mt-2 text-sm text-amber sm:text-base"
      >
        {t("title")}
      </h2>
      <p className="font-term mt-2 text-xl text-dim">{t("subtitle")}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {KEYS.map((key, i) => (
          <WindowFrame
            key={key}
            title={`${key.toUpperCase()}.SYS`}
            accent={ACCENTS[i]}
          >
            <div className="flex items-start gap-4">
              <span
                aria-hidden
                className="pixel-border font-pixel flex h-10 w-10 shrink-0 items-center justify-center bg-ink-2 text-base text-amber"
              >
                {ICONS[key]}
              </span>
              <div className="min-w-0">
                <h3 className="font-pixel text-[0.6rem] leading-relaxed text-fg">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="font-term mt-1 text-lg text-dim">
                  {t(`items.${key}.desc`)}
                </p>
              </div>
            </div>
            <ul className="font-term mt-4 space-y-1 text-lg text-fg">
              {(t.raw(`items.${key}.points`) as string[]).map((point) => (
                <li key={point}>
                  <span className="text-phosphor">▪</span> {point}
                </li>
              ))}
            </ul>
            <Link
              href="/#contact"
              className="font-term mt-4 inline-block text-lg text-amber underline decoration-dotted underline-offset-4 hover:text-amber-soft"
            >
              {t("cta")} →
            </Link>
          </WindowFrame>
        ))}
      </div>
    </section>
  );
}
