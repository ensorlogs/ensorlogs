"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Msg = { role: "user" | "assistant"; content: string };

const SERVICES = [
  "web",
  "apps",
  "soporte",
  "domotica",
  "camaras",
  "marketing",
] as const;

const QUICK_LINKS = [
  { key: "services", href: "/" },
  { key: "experience", href: "/experiencia" },
  { key: "projects", href: "/proyectos" },
  { key: "logs", href: "/logs" },
] as const;

export default function ChatWidget() {
  const t = useTranslations("chat");
  const tc = useTranslations("contact");
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [showLead, setShowLead] = useState(false);
  const [leadBusy, setLeadBusy] = useState(false);
  const [leadDone, setLeadDone] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const greeted = useRef(false);

  useEffect(() => {
    if (open && !greeted.current) {
      greeted.current = true;
      setMsgs([{ role: "assistant", content: t("welcome") }]);
    }
  }, [open, t]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [msgs, busy, showLead]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    const next = [...msgs, { role: "user" as const, content: text }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-12) }),
      });
      const data = (await res.json()) as { reply?: string };
      setMsgs([
        ...next,
        { role: "assistant", content: data.reply ?? t("error") },
      ]);
    } catch {
      setMsgs([...next, { role: "assistant", content: t("error") }]);
    } finally {
      setBusy(false);
    }
  }

  async function sendLead(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setLeadBusy(true);
    try {
      const res = await fetch("/api/chat/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setLeadDone(true);
        setShowLead(false);
        setMsgs((m) => [
          ...m,
          { role: "assistant", content: t("lead_ok") },
        ]);
      } else {
        setMsgs((m) => [...m, { role: "assistant", content: t("error") }]);
      }
    } catch {
      setMsgs((m) => [...m, { role: "assistant", content: t("error") }]);
    } finally {
      setLeadBusy(false);
    }
  }

  const inputCls =
    "font-term w-full border-2 border-line bg-ink-2 px-2.5 py-1.5 text-base text-fg outline-none focus:border-amber placeholder:text-dim/60";

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t("close") : t("open")}
        className="pixel-border font-pixel fixed bottom-16 right-4 z-50 flex items-center gap-2 bg-ink/90 py-1.5 pl-1.5 pr-3 text-[0.6rem] leading-tight text-amber backdrop-blur-sm transition-colors hover:bg-panel"
      >
        {open ? (
          <span className="px-2 py-1.5">×</span>
        ) : (
          <>
            <span className="relative block h-8 w-8 overflow-hidden">
              <Image
                src="/ensor-avatar.png"
                alt=""
                fill
                sizes="32px"
                className="object-cover"
                unoptimized
              />
            </span>
            <span className="flex flex-col items-start gap-1">
              <span>
                {t("open_a")}
                <br />
                {t("open_b")}
              </span>
              <span className="flex items-center gap-1 text-[0.45rem] text-phosphor">
                <span className="animate-blink inline-block h-1.5 w-1.5 bg-phosphor" />
                {t("online")}
              </span>
            </span>
          </>
        )}
      </button>

      {open && (
        <div className="pixel-border fixed bottom-32 right-4 z-50 flex h-[28rem] w-[min(23rem,calc(100vw-2rem))] flex-col bg-ink/95 backdrop-blur-md">
          <div className="font-pixel border-line flex items-center justify-between border-b-2 bg-amber px-3 py-2 text-[0.55rem] text-ink">
            <span>ENSOR.AI</span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-phosphor" />
              {t("online")}
            </span>
          </div>

          {!showLead && (
            <div className="border-line flex flex-wrap gap-1.5 border-b-2 px-2 py-2">
              {QUICK_LINKS.map((l) => (
                <Link
                  key={l.key}
                  href={l.href}
                  className="font-term border-line bg-ink-2 text-dim hover:border-amber hover:text-amber border px-2 py-0.5 text-sm transition-colors"
                >
                  {t(`quick.${l.key}`)}
                </Link>
              ))}
            </div>
          )}

          {showLead ? (
            <form
              onSubmit={sendLead}
              className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-3"
            >
              <p className="font-pixel text-[0.5rem] text-phosphor">
                {t("lead_title")}
              </p>
              <input name="name" required placeholder={`${tc("name")} *`} className={inputCls} />
              <input name="email" type="email" placeholder={tc("email")} className={inputCls} />
              <input
                name="phone"
                type="tel"
                placeholder={tc("phone")}
                className={inputCls}
              />
              <select name="service" className={inputCls} defaultValue="web">
                {SERVICES.map((k) => (
                  <option key={k} value={k}>
                    {tc(`types.${k}`)}
                  </option>
                ))}
              </select>
              <textarea
                name="message"
                required
                rows={3}
                placeholder={tc("message_hint")}
                className={`${inputCls} resize-none`}
              />
              <input
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              <p className="font-term text-sm text-dim">{t("lead_note")}</p>
              <div className="mt-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowLead(false)}
                  className="font-term border-line text-dim hover:text-fg border-2 px-3 py-2 text-base"
                >
                  ←
                </button>
                <button
                  type="submit"
                  disabled={leadBusy}
                  className="font-pixel pixel-border-amber flex-1 bg-amber px-3 py-2.5 text-[0.55rem] text-ink disabled:opacity-50"
                >
                  {leadBusy ? tc("sending") : t("lead_send")}
                </button>
              </div>
            </form>
          ) : (
            <>
              <div ref={bodyRef} className="flex-1 space-y-3 overflow-y-auto p-3">
                {msgs.map((m, i) => (
                  <div
                    key={i}
                    className={`font-term max-w-[85%] px-3 py-2 text-base leading-snug ${
                      m.role === "user"
                        ? "border-line ml-auto border-2 bg-panel-2 text-fg"
                        : "border-phosphor/40 bg-panel mr-auto border-2 text-fg"
                    }`}
                  >
                    {m.role === "assistant" && (
                      <span className="font-pixel mb-1 block text-[0.45rem] text-phosphor">
                        ENSOR.AI
                      </span>
                    )}
                    {m.content}
                  </div>
                ))}
                {busy && (
                  <div className="font-term border-phosphor/40 bg-panel mr-auto max-w-[85%] border-2 px-3 py-2 text-base text-dim">
                    <span className="font-pixel mb-1 block text-[0.45rem] text-phosphor">
                      ENSOR.AI
                    </span>
                    {t("typing")}
                  </div>
                )}
                {!leadDone && (
                  <button
                    onClick={() => setShowLead(true)}
                    className="font-pixel pixel-border mx-auto block border-amber bg-ink-2 px-4 py-2 text-[0.5rem] text-amber transition-colors hover:bg-amber hover:text-ink"
                  >
                    📋 {t("lead_cta")}
                  </button>
                )}
              </div>

              <form
                onSubmit={send}
                className="border-line flex gap-2 border-t-2 p-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t("placeholder")}
                  maxLength={500}
                  className="font-term border-line bg-ink-2 min-w-0 flex-1 border-2 px-3 py-2 text-lg text-fg outline-none placeholder:text-dim/60 focus:border-amber"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  className="font-pixel pixel-border-amber bg-amber px-3 text-[0.55rem] text-ink disabled:opacity-50"
                >
                  →
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
