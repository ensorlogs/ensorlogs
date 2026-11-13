import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getLogs } from "@/lib/data";
import type { Locale } from "@/lib/types";
import LogFeed from "@/components/logs/LogFeed";
import LogExplorer from "@/components/logs/LogExplorer";

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
  const logs = await getLogs(locale as Locale);

  return <LogsView logs={logs} />;
}

function LogsView({
  logs,
}: {
  logs: Awaited<ReturnType<typeof getLogs>>;
}) {
  const t = useTranslations("logs");

  return (
    <section className="mx-auto w-full max-w-5xl px-4 pt-20">
      <p className="font-term text-dim">{t("kicker")}</p>
      <h1 className="font-pixel mt-2 text-sm text-amber sm:text-base">
        {t("title")}
      </h1>
      <p className="font-term mt-2 text-xl text-dim">{t("subtitle")}</p>

      {/* mobile: single vertical feed */}
      <div className="mt-8 flex justify-center md:hidden">
        <LogFeed logs={logs} />
      </div>

      {/* search + categories + tile grid (the main view on desktop,
          below the feed on mobile) */}
      <div className="mt-8 md:mt-10">
        <LogExplorer logs={logs} />
      </div>
    </section>
  );
}
