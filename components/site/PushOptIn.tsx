"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const VAPID_PUBLIC = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

function urlBase64ToUint8Array(base64: string) {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(b64);
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}

export default function PushOptIn() {
  const t = useTranslations("a11y");
  const [state, setState] = useState<
    "unsupported" | "idle" | "subscribed" | "denied"
  >(() => {
    if (
      typeof window === "undefined" ||
      !("serviceWorker" in navigator) ||
      !("PushManager" in window) ||
      !VAPID_PUBLIC
    )
      return "unsupported";
    if (Notification.permission === "denied") return "denied";
    return "idle";
  });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (state === "unsupported" || state === "denied") return;
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => reg.pushManager.getSubscription())
      .then((sub) => setState(sub ? "subscribed" : "idle"))
      .catch(() => {});
  }, [state]);

  async function toggle() {
    setBusy(true);
    try {
      const reg = await navigator.serviceWorker.register("/sw.js");
      const existing = await reg.pushManager.getSubscription();

      if (existing) {
        await fetch("/api/push", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: existing.endpoint }),
        });
        await existing.unsubscribe();
        setState("idle");
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setState(permission === "denied" ? "denied" : "idle");
        return;
      }
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC!),
      });
      await fetch("/api/push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub.toJSON()),
      });
      setState("subscribed");
    } catch {
      setState("idle");
    } finally {
      setBusy(false);
    }
  }

  if (state === "unsupported" || state === "denied") return null;

  const active = state === "subscribed";
  return (
    <button
      onClick={toggle}
      disabled={busy}
      aria-label={active ? t("push_off") : t("push_on")}
      aria-pressed={active}
      title={active ? t("push_off") : t("push_on")}
      className={`pixel-border font-pixel px-3 py-2.5 text-[0.65rem] backdrop-blur-sm transition-colors ${
        active
          ? "bg-amber/80 text-ink"
          : "bg-ink/80 text-amber hover:text-amber-soft"
      }`}
    >
      {active ? "🔔" : "🔕"}
    </button>
  );
}
