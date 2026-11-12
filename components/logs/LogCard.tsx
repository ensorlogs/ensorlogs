import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Log } from "@/lib/types";

export default function LogCard({ log }: { log: Log }) {
  const t = useTranslations("logs");

  const date = log.publishedAt
    ? new Date(log.publishedAt).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <Link
      href={`/logs/${log.slug}`}
      className="pixel-border hover:border-amber group block bg-panel transition-colors"
    >
      <div className="border-line flex items-center justify-between border-b-2 px-3 py-1.5">
        <span className="font-pixel text-[0.5rem] text-phosphor">
          LOG_{String(log.logNumber).padStart(3, "0")}
        </span>
        <span className="flex items-center gap-2">
          {log.type === "story" && (
            <span className="font-term border border-amber px-1 text-sm text-amber">
              ▶ {t("video")}
            </span>
          )}
          <span className="font-term text-sm text-dim">{date}</span>
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-term group-hover:text-amber text-xl leading-tight text-fg transition-colors">
          {log.title}
        </h3>
        {log.excerpt && (
          <p className="font-term mt-2 line-clamp-2 text-lg text-dim">
            {log.excerpt}
          </p>
        )}
        <p className="font-term mt-3 flex items-center justify-between text-base">
          <span className="border-line text-dim border px-1.5 py-0.5">
            #{log.category}
          </span>
          <span className="text-amber">{t("read")} →</span>
        </p>
      </div>
    </Link>
  );
}
