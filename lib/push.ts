import { setVapidDetails, sendNotification } from "web-push";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { createServiceClient } from "@/lib/supabase/admin";

function isPushConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY &&
      process.env.VAPID_PRIVATE_KEY &&
      isSupabaseConfigured()
  );
}

function init() {
  setVapidDetails(
    process.env.VAPID_SUBJECT ?? "mailto:hello@ensorlogs.com",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
  );
}

/** Send a notification to every stored subscription; dead subs get pruned. */
export async function notifySubscribers(payload: {
  title: string;
  body: string;
  url?: string;
}) {
  if (!isPushConfigured()) return;
  init();
  const supabase = createServiceClient();
  const { data: subs } = await supabase
    .from("push_subscriptions")
    .select("id, endpoint, p256dh, auth");
  if (!subs?.length) return;

  const body = JSON.stringify({ ...payload, icon: "/ensor-avatar.png" });
  await Promise.allSettled(
    subs.map(async (sub) => {
      try {
        await sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth },
          },
          body
        );
      } catch (err) {
        const status = (err as { statusCode?: number }).statusCode;
        if (status === 404 || status === 410) {
          await supabase.from("push_subscriptions").delete().eq("id", sub.id);
        }
      }
    })
  );
}
