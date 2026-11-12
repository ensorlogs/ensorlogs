import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getAllSlugs, getPostBySlug } from "@/lib/data";
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
  const post = await getPostBySlug(locale as Locale, slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt ?? undefined };
}

export default async function LogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getPostBySlug(locale as Locale, slug);
  if (!post) notFound();

  return <PostView post={post} />;
}

function PostView({
  post,
}: {
  post: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>;
}) {
  const t = useTranslations("logs");

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <article>
      <Link
        href="/logs"
        className="font-term text-lg text-dim hover:text-amber"
      >
        {t("back")}
      </Link>

      <header className="pixel-border mt-4 bg-panel p-5">
        <p className="font-pixel text-[0.5rem] text-phosphor">
          LOG_{String(post.logNumber).padStart(3, "0")}
        </p>
        <h1 className="font-term mt-2 text-3xl leading-tight text-fg">
          {post.title}
        </h1>
        <p className="font-term mt-3 text-base text-dim">
          {date && (
            <>
              {t("published")}: {date} ·{" "}
            </>
          )}
          {t("category")}: <span className="text-amber">#{post.category}</span>
        </p>
      </header>

      <div className="log-body font-term mt-6 max-w-3xl text-xl leading-relaxed text-fg">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
