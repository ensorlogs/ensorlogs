import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getLogs, getVideoLogs } from "@/lib/data";
import type { Locale } from "@/lib/types";
import LogCard from "@/components/logs/LogCard";
import LogFeed from "@/components/logs/LogFeed";

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
  const [logs, videoLogs] = await Promise.all([
    getLogs(locale as Locale),
    getVideoLogs(locale as Locale),
  ]);

  return <LogsView logs={logs} videoLogs={videoLogs} />;
}

function LogsView({
  logs,
  videoLogs,
}: {
  logs: Awaited<ReturnType<typeof getLogs>>;
  videoLogs: Awaited<ReturnType<typeof getVideoLogs>>;
}) {
  const t = useTranslations("logs");

  return (
    <section>
      <p className="font-term text-dim">{t("kicker")}</p>
      <h1 className="font-pixel mt-2 text-sm text-amber sm:text-base">
        {t("title")}
      </h1>
      <p className="font-term mt-2 text-xl text-dim">{t("subtitle")}</p>

      {videoLogs.length > 0 && (
        <div className="mt-8 flex justify-center sm:justify-start">
          <LogFeed logs={videoLogs} />
        </div>
      )}

      {logs.length === 0 ? (
        <p className="font-term mt-8 text-xl text-dim">{t("empty")}</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {logs.map((log) => (
            <LogCard key={log.id} log={log} />
          ))}
        </div>
      )}
    </section>
  );
}
