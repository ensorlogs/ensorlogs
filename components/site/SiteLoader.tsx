"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function SiteLoader() {
  const t = useTranslations("loader");
  const phrases = t.raw("phrases") as string[];
  const [mounted, setMounted] = useState(true);
  const [fade, setFade] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    const rotate = setInterval(
      () => setI((v) => (v + 1) % phrases.length),
      480
    );
    const fadeTimer = setTimeout(() => setFade(true), 2000);
    const killTimer = setTimeout(() => setMounted(false), 2500);
    return () => {
      clearInterval(rotate);
      clearTimeout(fadeTimer);
      clearTimeout(killTimer);
    };
  }, [phrases.length]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[80] flex flex-col items-center justify-center gap-6 bg-ink px-4 transition-opacity duration-500 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="rounded-full border-4 border-line-2 bg-panel p-1.5 shadow-[0_0_40px_rgba(255,176,0,0.15)]">
        <Image
          src="/ensor-avatar.png"
          alt="Ensor"
          width={112}
          height={112}
          className="pixelated rounded-full"
          priority
        />
      </div>
      <p className="font-pixel terminal-glow text-xs text-amber">
        ENSOR<span className="text-fg">.LOGS</span>
      </p>
      <p className="font-term max-w-md text-center text-xl text-dim">
        {phrases[i]}
        <span className="animate-blink text-phosphor">_</span>
      </p>
    </div>
  );
}
