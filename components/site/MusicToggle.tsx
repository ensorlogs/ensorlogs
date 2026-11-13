"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { startChiptune, stopChiptune } from "@/lib/chiptune";

export default function MusicToggle() {
  const t = useTranslations("a11y");
  const [playing, setPlaying] = useState(false);

  // browsers block autoplay — start quietly on the user's first interaction
  useEffect(() => {
    const autoStart = () => {
      startChiptune(0.02);
      setPlaying(true);
    };
    window.addEventListener("pointerdown", autoStart, { once: true });
    window.addEventListener("keydown", autoStart, { once: true });
    return () => {
      window.removeEventListener("pointerdown", autoStart);
      window.removeEventListener("keydown", autoStart);
    };
  }, []);

  async function toggle() {
    if (playing) {
      await stopChiptune();
      setPlaying(false);
    } else {
      startChiptune();
      setPlaying(true);
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={playing ? t("music_off") : t("music_on")}
      aria-pressed={playing}
      title={playing ? t("music_off") : t("music_on")}
      className={`pixel-border font-pixel px-3 py-2.5 text-[0.65rem] backdrop-blur-sm transition-colors ${
        playing
          ? "bg-amber/80 text-ink"
          : "bg-ink/80 text-amber hover:text-amber-soft"
      }`}
    >
      {playing ? "♫" : "♪"}
    </button>
  );
}
