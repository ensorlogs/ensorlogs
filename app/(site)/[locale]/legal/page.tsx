import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Breadcrumbs from "@/components/site/Breadcrumbs";

const SECTIONS = ["aviso", "privacidad", "cookies", "accesibilidad"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalView />;
}

function LegalView() {
  const t = useTranslations("legal");

  return (
    <article className="mx-auto w-full max-w-3xl px-4 pt-20">
      <Breadcrumbs items={[{ label: "legal" }]} />
      <Link href="/" className="font-term mt-2 inline-block text-lg text-dim hover:text-amber">
        {t("back")}
      </Link>
      <h1 className="font-pixel mt-4 text-sm text-amber sm:text-base">
        {t("title")}
      </h1>
      <p className="font-term mt-2 text-xl text-dim">{t("subtitle")}</p>

      <nav className="font-term mt-6 flex flex-wrap gap-x-4 gap-y-1 text-lg">
        {SECTIONS.map((s) => (
          <a
            key={s}
            href={`#${s}`}
            className="text-amber underline decoration-dotted underline-offset-4 hover:text-amber-soft"
          >
            {t(`${s}.title`)}
          </a>
        ))}
      </nav>

      {SECTIONS.map((s) => (
        <section
          key={s}
          id={s}
          className="pixel-border mt-8 scroll-mt-24 bg-panel p-5"
        >
          <h2 className="font-pixel text-xs text-amber">{t(`${s}.title`)}</h2>
          {t(`${s}.body`)
            .split("\n")
            .map((line, i) =>
              line.trim() === "" ? (
                <div key={i} className="h-3" />
              ) : (
                <p
                  key={i}
                  className="font-term mt-3 text-lg leading-relaxed text-fg"
                >
                  {line}
                </p>
              )
            )}
        </section>
      ))}
    </article>
  );
}
