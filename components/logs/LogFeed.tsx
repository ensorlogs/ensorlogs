"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Log } from "@/lib/types";

function LogSlide({
  log,
  active,
  muted,
  openLabel,
}: {
  log: Log;
  active: boolean;
  muted: boolean;
  openLabel: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [active]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  return (
    <div className="relative h-full w-full snap-start">
      <video
        ref={videoRef}
        src={log.videoUrl ?? undefined}
        poster={log.thumbnailUrl ?? undefined}
        loop
        muted={muted}
        playsInline
        preload={active ? "auto" : "metadata"}
        className="h-full w-full bg-ink-2 object-contain"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 to-transparent p-4 pt-14">
        <h3 className="font-term text-xl leading-tight text-fg">{log.title}</h3>
        <p className="font-term mt-1 flex items-center justify-between text-sm text-dim">
          <span>#{log.category}</span>
          <Link
            href={`/logs/${log.slug}`}
            className="border-amber text-amber border px-2 py-0.5 text-base hover:bg-amber hover:text-ink"
          >
            {openLabel} →
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LogFeed({ logs }: { logs: Log[] }) {
  const t = useTranslations("logs");
  const feedRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const feed = feedRef.current;
    if (!feed) return;
    const slides = Array.from(feed.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIndex(slides.indexOf(entry.target as HTMLElement));
          }
        });
      },
      { root: feed, threshold: 0.6 }
    );
    slides.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [logs.length]);

  const scrollTo = (i: number) => {
    const feed = feedRef.current;
    if (!feed || i < 0 || i >= logs.length) return;
    (feed.children[i] as HTMLElement).scrollIntoView({ behavior: "smooth" });
  };

  if (logs.length === 0) {
    return <p className="font-term text-xl text-dim">{t("empty")}</p>;
  }

  return (
    <div className="flex items-center gap-3">
      <div
        ref={feedRef}
        className="pixel-border no-scrollbar aspect-[9/16] max-h-[75vh] w-full max-w-sm snap-y snap-mandatory overflow-y-auto sm:max-w-xs"
      >
        {logs.map((log, i) => (
          <LogSlide
            key={log.id}
            log={log}
            active={i === index}
            muted={muted}
            openLabel={t("open")}
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-2">
        <button
          onClick={() => scrollTo(index - 1)}
          disabled={index === 0}
          aria-label={t("prev")}
          className="pixel-border font-pixel h-9 w-9 bg-panel text-xs text-amber disabled:opacity-30"
        >
          ▲
        </button>
        <span className="font-term text-sm text-dim">
          {index + 1}/{logs.length}
        </span>
        <button
          onClick={() => scrollTo(index + 1)}
          disabled={index === logs.length - 1}
          aria-label={t("next")}
          className="pixel-border font-pixel h-9 w-9 bg-panel text-xs text-amber disabled:opacity-30"
        >
          ▼
        </button>
        <button
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? t("unmute") : t("mute")}
          className="pixel-border font-pixel mt-2 h-9 w-9 bg-panel text-[0.5rem] text-phosphor"
        >
          {muted ? "🔇" : "🔊"}
        </button>
      </div>
    </div>
  );
}
