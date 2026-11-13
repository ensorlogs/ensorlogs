"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="pointer-events-auto flex items-center gap-2 bg-ink/70 px-2 py-1.5 backdrop-blur-sm"
        >
          <Image
            src="/ensor-avatar.png"
            alt="Ensor"
            width={28}
            height={28}
            className="pixelated border-line-2 border-2"
            priority
          />
          <span className="font-pixel text-[0.55rem] text-amber sm:text-[0.6rem]">
            ENSOR<span className="text-fg">.LOGS</span>
          </span>
        </Link>
        <div className="pointer-events-auto bg-ink/70 px-2 py-1.5 backdrop-blur-sm">
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
