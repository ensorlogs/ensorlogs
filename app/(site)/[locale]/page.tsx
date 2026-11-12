import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { getPosts, getStories } from "@/lib/data";
import type { Locale } from "@/lib/types";
import HeroSection from "@/components/hero/HeroSection";
import ServicesGrid from "@/components/services/ServicesGrid";
import LogCard from "@/components/logs/LogCard";
import StoryFeed from "@/components/stories/StoryFeed";
import ContactForm from "@/components/contact/ContactForm";
import { Link } from "@/i18n/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [posts, stories] = await Promise.all([
    getPosts(locale as Locale),
    getStories(locale as Locale),
  ]);

  return <HomeContent posts={posts} stories={stories} />;
}

function HomeContent({
  posts,
  stories,
}: {
  posts: Awaited<ReturnType<typeof getPosts>>;
  stories: Awaited<ReturnType<typeof getStories>>;
}) {
  const t = useTranslations();

  return (
    <div className="space-y-20">
      <HeroSection />

      <ServicesGrid />

      <section aria-labelledby="logs-title">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-term text-dim">{t("logs.kicker")}</p>
            <h2
              id="logs-title"
              className="font-pixel mt-2 text-sm text-amber sm:text-base"
            >
              {t("logs.title")}
            </h2>
          </div>
          <Link
            href="/logs"
            className="font-term shrink-0 text-lg text-amber underline decoration-dotted underline-offset-4 hover:text-amber-soft"
          >
            {t("logs.read")} →
          </Link>
        </div>
        {posts.length === 0 ? (
          <p className="font-term mt-6 text-xl text-dim">{t("logs.empty")}</p>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <LogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      <section aria-labelledby="stories-title">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-term text-dim">{t("stories.kicker")}</p>
            <h2
              id="stories-title"
              className="font-pixel mt-2 text-sm text-amber sm:text-base"
            >
              {t("stories.title")}
            </h2>
            <p className="font-term mt-2 text-xl text-dim">
              {t("stories.subtitle")}
            </p>
          </div>
          <Link
            href="/stories"
            className="font-term shrink-0 text-lg text-amber underline decoration-dotted underline-offset-4 hover:text-amber-soft"
          >
            {t("stories.watch")} →
          </Link>
        </div>
        <div className="mt-6 flex justify-center sm:justify-start">
          <StoryFeed stories={stories} />
        </div>
      </section>

      <ContactForm />
    </div>
  );
}
