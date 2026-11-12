import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getStories } from "@/lib/data";
import type { Locale } from "@/lib/types";
import StoryFeed from "@/components/stories/StoryFeed";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "stories" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function StoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const stories = await getStories(locale as Locale);

  return <StoriesView stories={stories} />;
}

function StoriesView({
  stories,
}: {
  stories: Awaited<ReturnType<typeof getStories>>;
}) {
  const t = useTranslations("stories");

  return (
    <section className="flex flex-col items-center">
      <p className="font-term self-start text-dim">{t("kicker")}</p>
      <h1 className="font-pixel mt-2 self-start text-sm text-amber sm:text-base">
        {t("title")}
      </h1>
      <p className="font-term mt-2 self-start text-xl text-dim">
        {t("subtitle")}
      </p>
      <div className="mt-8">
        <StoryFeed stories={stories} />
      </div>
    </section>
  );
}
