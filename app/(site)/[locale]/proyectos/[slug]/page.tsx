import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getProjectBySlug, getProjectSlugs } from "@/lib/data";
import type { Project } from "@/data/projects";
import type { Locale } from "@/lib/types";
import Breadcrumbs from "@/components/site/Breadcrumbs";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary[locale as Locale] ?? project.summary.es,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return <ProjectView project={project} locale={locale as Locale} />;
}

function ProjectView({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const t = useTranslations("projects");
  const d = project.detail[locale] ?? project.detail.es;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 pb-16 pt-20">
      <Breadcrumbs
        items={[
          { label: "proyectos", href: "/proyectos" },
          { label: project.slug },
        ]}
      />

      <div className="pixel-border mt-4 overflow-hidden bg-panel/90">
        <div className="relative aspect-video w-full">
          <Image
            src={project.image}
            alt={project.name}
            fill
            unoptimized
            className="object-cover"
            priority
          />
        </div>

        <div className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="font-pixel text-xs leading-relaxed text-amber sm:text-sm">
                {project.name}
              </h1>
              <p className="font-term mt-1 text-lg text-dim">
                {project.tag[locale]}
              </p>
            </div>
            {project.metric && (
              <div className="text-right">
                <p className="font-pixel phosphor-glow text-xl text-phosphor">
                  {project.metric.value}
                </p>
                <p className="font-term max-w-[9rem] text-sm leading-tight text-dim">
                  {project.metric[locale]}
                </p>
              </div>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="font-term border-line border px-1.5 py-0.5 text-sm text-dim"
              >
                {s}
              </span>
            ))}
          </div>

          <section className="mt-6">
            <h2 className="font-pixel text-[0.6rem] text-phosphor">
              {t("context")}
            </h2>
            <p className="font-term mt-2 text-lg leading-snug text-fg/85">
              {d.context}
            </p>
          </section>

          <section className="mt-5">
            <h2 className="font-pixel text-[0.6rem] text-phosphor">
              {t("solution")}
            </h2>
            <p className="font-term mt-2 text-lg leading-snug text-fg/85">
              {d.solution}
            </p>
          </section>

          {d.results && (
            <section className="mt-5">
              <h2 className="font-pixel text-[0.6rem] text-phosphor">
                {t("results")}
              </h2>
              <p className="font-term mt-2 text-lg leading-snug text-fg/85">
                {d.results}
              </p>
            </section>
          )}

          {project.images && project.images.length > 0 && (
            <section className="mt-6">
              <h2 className="font-pixel text-[0.6rem] text-phosphor">
                {t("gallery")}
              </h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {project.images.map((src) => (
                  <a
                    key={src}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pixel-border relative block aspect-video overflow-hidden"
                  >
                    <Image
                      src={src}
                      alt={`${project.name} — captura`}
                      fill
                      unoptimized
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </a>
                ))}
              </div>
            </section>
          )}

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-term mt-5 inline-block text-base text-amber underline decoration-dotted underline-offset-4 hover:text-amber-soft"
            >
              {t("site")}
            </a>
          )}
        </div>
      </div>

      <div className="pixel-border-amber mt-8 bg-ink/80 p-5 text-center">
        <p className="font-term text-xl text-fg">{t("cta_text")}</p>
        <Link
          href="/?z=contact"
          className="font-pixel mt-3 inline-block bg-amber px-4 py-2.5 text-[0.55rem] text-ink transition-opacity hover:opacity-90"
        >
          {t("cta_button")}
        </Link>
      </div>
    </article>
  );
}
