import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { jobs, events, education } from "@/data/experience";
import type { Locale } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "experience" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "experience" });
  const lang = locale as Locale;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-20">
      <p className="font-term text-dim">{t("kicker")}</p>
      <h1 className="font-pixel mt-2 text-sm text-amber sm:text-base">
        {t("title")}
      </h1>
      <p className="font-term mt-2 max-w-2xl text-xl text-dim">
        {t("subtitle")}
      </p>

      {/* ── Trayectoria ─────────────────────────────────────── */}
      <h2 className="font-pixel mt-10 text-xs text-phosphor">
        {t("jobs_heading")}
      </h2>
      <div className="mt-4 space-y-4">
        {jobs.map((job) => (
          <article
            key={job.company}
            className="pixel-border bg-panel/90 p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-term text-xl text-amber">{job.company}</h3>
              <span className="font-term text-sm text-dim">
                {job.period} · {job.place[lang]}
              </span>
            </div>
            <p className="font-term mt-1 text-lg text-phosphor">
              {job.role[lang]}
            </p>
            <p className="font-term mt-2 max-w-3xl text-lg leading-relaxed text-fg">
              {job.desc[lang]}
            </p>
            {job.url && (
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-term mt-2 inline-block text-base text-dim underline decoration-dotted underline-offset-4 hover:text-amber"
              >
                {job.url.replace(/^https?:\/\//, "")} ↗
              </a>
            )}
          </article>
        ))}
      </div>

      {/* ── Ponencias & comunidad ───────────────────────────── */}
      <h2 className="font-pixel mt-12 text-xs text-phosphor">
        {t("events_heading")}
      </h2>
      <p className="font-term mt-2 max-w-2xl text-lg text-dim">
        {t("events_intro")}
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((ev) => (
          <article key={ev.name} className="pixel-border bg-panel/90 p-4">
            <h3 className="font-term text-lg text-amber">{ev.name}</h3>
            <p className="font-term mt-1 text-base leading-relaxed text-dim">
              {ev.desc[lang]}
            </p>
          </article>
        ))}
      </div>

      {/* ── Formación ───────────────────────────────────────── */}
      <h2 className="font-pixel mt-12 text-xs text-phosphor">
        {t("edu_heading")}
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {education.map((ed) => (
          <article key={ed.school} className="pixel-border bg-panel/90 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-term text-lg text-amber">{ed.school}</h3>
              <span className="font-term text-sm text-dim">{ed.period}</span>
            </div>
            <p className="font-term mt-1 text-base text-phosphor">
              {ed.title[lang]}
            </p>
            <p className="font-term mt-2 text-base leading-relaxed text-dim">
              {ed.desc[lang]}
            </p>
            {ed.url && (
              <a
                href={ed.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-term mt-2 inline-block text-sm text-dim underline decoration-dotted underline-offset-4 hover:text-amber"
              >
                {ed.url.replace(/^https?:\/\//, "")} ↗
              </a>
            )}
          </article>
        ))}
      </div>

      <p className="font-term mt-12 text-lg text-dim">
        {t("cta_text")}{" "}
        <Link
          href="/?z=contact"
          className="text-amber underline decoration-dotted underline-offset-4 hover:text-amber-soft"
        >
          {t("cta_button")}
        </Link>
      </p>
    </section>
  );
}
