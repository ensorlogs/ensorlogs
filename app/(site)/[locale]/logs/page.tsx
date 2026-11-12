import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getPosts } from "@/lib/data";
import type { Locale } from "@/lib/types";
import LogCard from "@/components/logs/LogCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "logs" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function LogsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = await getPosts(locale as Locale);

  return <LogsList posts={posts} />;
}

function LogsList({ posts }: { posts: Awaited<ReturnType<typeof getPosts>> }) {
  const t = useTranslations("logs");

  return (
    <section>
      <p className="font-term text-dim">{t("kicker")}</p>
      <h1 className="font-pixel mt-2 text-sm text-amber sm:text-base">
        {t("title")}
      </h1>
      <p className="font-term mt-2 text-xl text-dim">{t("subtitle")}</p>

      {posts.length === 0 ? (
        <p className="font-term mt-8 text-xl text-dim">{t("empty")}</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <LogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
