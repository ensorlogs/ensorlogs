import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getProjects } from "@/lib/data";
import type { Project } from "@/data/projects";
import type { Locale } from "@/lib/types";
import Breadcrumbs from "@/components/site/Breadcrumbs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const projects = await getProjects();

  return <ProjectsView locale={locale as Locale} projects={projects} />;
}

export const revalidate = 60;

function ProjectsView({ locale, projects }: { locale: Locale; projects: Project[] }) {
  const t = useTranslations("projects");

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-20">
      <Breadcrumbs items={[{ label: "proyectos" }]} />
      <p className="font-term mt-2 text-dim">{t("kicker")}</p>
      <h1 className="font-pixel mt-2 text-sm text-amber sm:text-base">
        {t("title")}
      </h1>
      <p className="font-term mt-2 max-w-2xl text-xl text-dim">
        {t("subtitle")}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <article
            key={p.slug}
            className="pixel-border bg-panel/90 flex flex-col overflow-hidden"
          >
            <Link href={`/proyectos/${p.slug}`} className="relative block aspect-video w-full">
              <Image
                src={p.image}
                alt={p.name}
                fill
                unoptimized
                className="object-cover"
              />
            </Link>
            <div className="flex flex-1 flex-col p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="font-pixel text-[0.6rem] leading-relaxed text-fg">
                  {p.name}
                </h2>
                <p className="font-term mt-1 text-base text-amber">{p.tag[locale]}</p>
              </div>
              {p.metric && (
                <div className="shrink-0 text-right">
                  <p className="font-pixel phosphor-glow text-sm text-phosphor">
                    {p.metric.value}
                  </p>
                  <p className="font-term max-w-[7rem] text-xs leading-tight text-dim">
                    {p.metric[locale]}
                  </p>
                </div>
              )}
            </div>

            <p className="font-term mt-3 flex-1 text-lg leading-snug text-fg/85">
              {p.summary[locale]}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="font-term border-line border px-1.5 py-0.5 text-sm text-dim"
                >
                  {s}
                </span>
              ))}
            </div>

            <Link
              href={`/proyectos/${p.slug}`}
              className="font-term mt-3 inline-block text-base text-amber underline decoration-dotted underline-offset-4 hover:text-amber-soft"
            >
              {t("visit")}
            </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="pixel-border-amber mt-10 bg-ink/80 p-5 text-center">
        <p className="font-term text-xl text-fg">{t("cta_text")}</p>
        <Link
          href="/?z=contact"
          className="font-pixel mt-3 inline-block bg-amber px-4 py-2.5 text-[0.55rem] text-ink transition-opacity hover:opacity-90"
        >
          {t("cta_button")}
        </Link>
      </div>
    </section>
  );
}
