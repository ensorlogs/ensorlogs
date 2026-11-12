import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getAllSlugs, getLogBySlug } from "@/lib/data";
import type { Locale } from "@/lib/types";
import { Link } from "@/i18n/navigation";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return ["es", "en"].flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const log = await getLogBySlug(locale as Locale, slug);
  if (!log) return {};
  return { title: log.title, description: log.excerpt ?? undefined };
}

export default async function LogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const log = await getLogBySlug(locale as Locale, slug);
  if (!log) notFound();

  return <LogView log={log} />;
}

function LogView({
  log,
}: {
  log: NonNullable<Awaited<ReturnType<typeof getLogBySlug>>>;
}) {
  const t = useTranslations("logs");

  const date = log.publishedAt
    ? new Date(log.publishedAt).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <article>
      <Link href="/logs" className="font-term text-lg text-dim hover:text-amber">
        {t("back")}
      </Link>

      <header className="pixel-border mt-4 bg-panel p-5">
        <p className="font-pixel text-[0.5rem] text-phosphor">
          LOG_{String(log.logNumber).padStart(3, "0")}
          {log.type === "story" && (
            <span className="ml-2 text-amber">▶ VIDEO</span>
          )}
        </p>
        <h1 className="font-term mt-2 text-3xl leading-tight text-fg">
          {log.title}
        </h1>
        <p className="font-term mt-3 text-base text-dim">
          {date && (
            <>
              {t("published")}: {date} ·{" "}
            </>
          )}
          {t("category")}: <span className="text-amber">#{log.category}</span>
        </p>
      </header>

      {log.videoUrl && (
        <div className="pixel-border mx-auto mt-6 max-w-sm bg-ink-2">
          <video
            src={log.videoUrl}
            poster={log.thumbnailUrl ?? undefined}
            controls
            playsInline
            preload="metadata"
            className="aspect-[9/16] w-full object-contain"
          />
        </div>
      )}

      <div className="log-body font-term mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-fg">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{log.content}</ReactMarkdown>
      </div>
    </article>
  );
}
