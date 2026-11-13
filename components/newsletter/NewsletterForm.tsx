"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "sending" | "success" | "error";

export default function NewsletterForm() {
  const t = useTranslations("newsletter");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="font-term phosphor-glow py-4 text-center text-xl text-phosphor">
        {t("success")}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        name="email"
        type="email"
        required
        placeholder={t("placeholder")}
        aria-label={t("placeholder")}
        className="font-term w-full flex-1 border-2 border-line bg-ink-2 px-3 py-2.5 text-lg text-fg outline-none focus:border-amber placeholder:text-dim/60"
      />
      {/* honeypot */}
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="font-pixel pixel-border-amber shrink-0 bg-amber px-4 py-2.5 text-[0.55rem] text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "sending" ? t("sending") : t("subscribe")}
      </button>
      {status === "error" && (
        <p className="font-term text-lg text-alert sm:col-span-2">
          {t("error")}
        </p>
      )}
    </form>
  );
}
