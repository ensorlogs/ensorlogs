import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { getLogs, getVideoLogs } from "@/lib/data";
import type { Locale } from "@/lib/types";
import HeroSection from "@/components/hero/HeroSection";
import ServicesGrid from "@/components/services/ServicesGrid";
import LogCard from "@/components/logs/LogCard";
import LogFeed from "@/components/logs/LogFeed";
import ContactForm from "@/components/contact/ContactForm";
import { Link } from "@/i18n/navigation";

export default async function HomePage({
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

  return <HomeContent logs={logs} videoLogs={videoLogs} />;
}

function HomeContent({
  logs,
  videoLogs,
}: {
  logs: Awaited<ReturnType<typeof getLogs>>;
  videoLogs: Awaited<ReturnType<typeof getVideoLogs>>;
}) {
  const t = useTranslations();

  return (
    <div className="space-y-20">
      <HeroSection />

      {/* Ensor Logs — the core of the site: video feed + latest entries */}
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
            <p className="font-term mt-2 text-xl text-dim">
              {t("logs.subtitle")}
            </p>
          </div>
          <Link
            href="/logs"
            className="font-term shrink-0 text-lg text-amber underline decoration-dotted underline-offset-4 hover:text-amber-soft"
          >
            {t("logs.all")} →
          </Link>
        </div>

        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start">
          {videoLogs.length > 0 && (
            <div className="mx-auto shrink-0 lg:mx-0">
              <LogFeed logs={videoLogs} />
            </div>
          )}
          {logs.length === 0 ? (
            <p className="font-term text-xl text-dim">{t("logs.empty")}</p>
          ) : (
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              {logs.slice(0, 4).map((log) => (
                <LogCard key={log.id} log={log} />
              ))}
            </div>
          )}
        </div>
      </section>

      <ContactForm />

      <ServicesGrid />
    </div>
  );
}
