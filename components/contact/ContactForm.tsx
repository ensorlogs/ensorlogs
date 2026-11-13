"use client";

import { useState } from "react";
import Script from "next/script";
import { useTranslations } from "next-intl";

type Status = "idle" | "sending" | "success" | "error";

const SERVICES = [
  "web",
  "apps",
  "soporte",
  "domotica",
  "camaras",
  "marketing",
] as const;

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  // render timestamp for the time-trap (bots submit instantly)
  const [t0] = useState(() => Date.now().toString());
  // mini captcha — server validates a + b === answer
  const [cap] = useState(() => ({
    a: 2 + Math.floor(Math.random() * 8),
    b: 2 + Math.floor(Math.random() * 8),
  }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: new FormData(form),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) {
        form.reset();
        setFileName(null);
      }
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "font-term w-full border-2 border-line bg-ink-2 px-3 py-2 text-lg text-fg outline-none focus:border-amber placeholder:text-dim/60";

  if (status === "success") {
    return (
      <p className="font-term phosphor-glow py-6 text-center text-xl text-phosphor">
        {t("success")}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
      <fieldset className="sm:col-span-2">
        <legend className="font-pixel mb-2 text-[0.5rem] tracking-wider text-dim">
          {t("type")}
        </legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {SERVICES.map((key) => (
            <label key={key} className="cursor-pointer">
              <input
                type="radio"
                name="type"
                value={key}
                defaultChecked={key === "web"}
                className="peer sr-only"
              />
              <span className="font-term peer-checked:border-amber peer-checked:bg-panel peer-checked:text-amber block border-2 border-line bg-ink-2 px-3 py-2.5 text-center text-lg text-fg transition-colors hover:border-line-2">
                {t(`types.${key}`)}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

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
        {t("phone")}
        <input
          name="phone"
          type="tel"
          placeholder="+58 412 000 0000"
          className={`${inputCls} mt-1`}
        />
      </label>
      <label className="font-term block text-lg text-dim sm:col-span-2">
        {t("message")} *
        <textarea
          name="message"
          required
          rows={4}
          placeholder={t("message_hint")}
          className={`${inputCls} mt-1 resize-y`}
        />
      </label>
      <label className="font-term block cursor-pointer text-lg text-dim sm:col-span-2">
        {t("attach")}
        <input
          name="image"
          type="file"
          accept="image/*"
          className="peer sr-only"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
        />
        <span className="border-line bg-ink-2 hover:border-line-2 mt-1 flex items-center gap-3 border-2 border-dashed px-3 py-3 text-base">
          <span className="font-pixel text-[0.5rem] text-amber">📎 {t("attach_btn")}</span>
          <span className="text-dim truncate">{fileName ?? t("attach_hint")}</span>
        </span>
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
      <input name="t0" type="hidden" value={t0} />
      <input name="ca" type="hidden" value={cap.a} />
      <input name="cb" type="hidden" value={cap.b} />
      <label className="font-term block text-lg text-dim sm:col-span-2">
        {t("captcha")} *
        <span className="border-line bg-ink-2 mt-1 flex items-center gap-3 border-2 px-3 py-2">
          <span className="font-pixel whitespace-nowrap text-[0.55rem] text-phosphor">
            {cap.a} + {cap.b} = ?
          </span>
          <input
            name="captcha"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            required
            autoComplete="off"
            placeholder="?"
            className="font-term w-16 border-2 border-line bg-ink px-2 py-1 text-center text-lg text-fg outline-none focus:border-amber"
          />
        </span>
      </label>
      {TURNSTILE_SITE_KEY && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="lazyOnload"
          />
          <div
            className="cf-turnstile sm:col-span-2"
            data-sitekey={TURNSTILE_SITE_KEY}
            data-theme="dark"
          />
        </>
      )}
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
  );
}
