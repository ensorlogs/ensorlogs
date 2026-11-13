"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Log } from "@/lib/types";

function LogTile({ log, videoLabel }: { log: Log; videoLabel: string }) {
  return (
    <Link
      href={`/logs/${log.slug}`}
      className="pixel-border hover:border-amber group relative block aspect-[9/16] overflow-hidden bg-ink-2 transition-colors"
    >
      {log.videoUrl ? (
        <video
          src={log.videoUrl}
          poster={log.thumbnailUrl ?? undefined}
          muted
          playsInline
          loop
          preload="metadata"
          onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
          onMouseLeave={(e) => {
            e.currentTarget.pause();
            e.currentTarget.currentTime = 0;
          }}
          className="h-full w-full object-cover"
        />
      ) : log.thumbnailUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={log.thumbnailUrl}
          alt={log.title}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col justify-center p-4">
          <p className="font-pixel text-[0.5rem] text-phosphor">
            LOG_{String(log.logNumber).padStart(3, "0")}
          </p>
          <p className="font-term mt-3 text-dim">&gt; cat {log.slug}.md</p>
          {log.excerpt && (
            <p className="font-term mt-3 line-clamp-4 text-base leading-relaxed text-fg">
              {log.excerpt}
            </p>
          )}
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 to-transparent p-3 pt-10">
        <h3 className="font-term group-hover:text-amber text-base leading-tight text-fg transition-colors">
          {log.title}
        </h3>
        <p className="font-term mt-1 flex items-center justify-between text-sm text-dim">
          <span>#{log.category}</span>
          {log.type === "story" && (
            <span className="border-amber text-amber border px-1 text-xs">
              ▶ {videoLabel}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}

export default function LogExplorer({ logs }: { logs: Log[] }) {
  const t = useTranslations("logs");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(
    () => [...new Set(logs.map((l) => l.category))],
    [logs]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return logs.filter(
      (l) =>
        (!category || l.category === category) &&
        (!q ||
          l.title.toLowerCase().includes(q) ||
          (l.excerpt ?? "").toLowerCase().includes(q))
    );
  }, [logs, query, category]);

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("search")}
        aria-label={t("search")}
        className="font-term w-full border-2 border-line bg-ink-2 px-3 py-2 text-lg text-fg outline-none placeholder:text-dim/60 focus:border-amber"
      />

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={() => setCategory(null)}
          className={`font-term border-2 px-3 py-1 text-base transition-colors ${
            category === null
              ? "border-amber bg-panel text-amber"
              : "border-line bg-ink-2 text-fg hover:border-line-2"
          }`}
        >
          {t("allcats")}
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c === category ? null : c)}
            className={`font-term border-2 px-3 py-1 text-base transition-colors ${
              category === c
                ? "border-amber bg-panel text-amber"
                : "border-line bg-ink-2 text-fg hover:border-line-2"
            }`}
          >
            #{c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="font-term mt-6 text-lg text-dim">{t("no_results")}</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((log) => (
            <LogTile key={log.id} log={log} videoLabel={t("video")} />
          ))}
        </div>
      )}
    </div>
  );
}
