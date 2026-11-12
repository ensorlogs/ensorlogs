"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import WindowFrame from "@/components/os/WindowFrame";

type Status = "idle" | "sending" | "success" | "error";

const TYPES = ["dev", "domotics", "construtech", "tourism", "other"] as const;

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
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

  const inputCls =
    "font-term w-full border-2 border-line bg-ink-2 px-3 py-2 text-lg text-fg outline-none focus:border-amber placeholder:text-dim/60";

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24">
      <p className="font-term text-dim">{t("kicker")}</p>
      <h2
        id="contact-title"
        className="font-pixel mt-2 text-sm text-amber sm:text-base"
      >
        {t("title")}
      </h2>
      <p className="font-term mt-2 text-xl text-dim">{t("subtitle")}</p>

      <WindowFrame title="CONTACT.EXE" className="mt-6">
        {status === "success" ? (
          <p className="font-term phosphor-glow py-6 text-center text-xl text-phosphor">
            {t("success")}
          </p>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
            <label className="font-term block text-lg text-dim">
              {t("name")} *
              <input name="name" required className={`${inputCls} mt-1`} />
            </label>
            <label className="font-term block text-lg text-dim">
              {t("email")} *
              <input
                name="email"
                type="email"
                required
                className={`${inputCls} mt-1`}
              />
            </label>
            <label className="font-term block text-lg text-dim sm:col-span-2">
              {t("type")}
              <select name="type" className={`${inputCls} mt-1`} defaultValue="dev">
                {TYPES.map((key) => (
                  <option key={key} value={key}>
                    {t(`types.${key}`)}
                  </option>
                ))}
              </select>
            </label>
            <label className="font-term block text-lg text-dim sm:col-span-2">
              {t("message")} *
              <textarea
                name="message"
                required
                rows={5}
                className={`${inputCls} mt-1 resize-y`}
              />
            </label>
            {/* honeypot — invisible to humans */}
            <input
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="font-pixel pixel-border-amber w-full bg-amber px-4 py-3 text-[0.6rem] text-ink transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto"
              >
                {status === "sending" ? t("sending") : t("send")}
              </button>
              {status === "error" && (
                <p className="font-term mt-3 text-lg text-alert">{t("error")}</p>
              )}
            </div>
          </form>
        )}
      </WindowFrame>
    </section>
  );
}
