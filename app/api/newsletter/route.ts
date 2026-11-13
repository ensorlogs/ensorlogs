import { NextResponse } from "next/server";
import { z } from "zod";
import { isBrevoConfigured, subscribeNewsletter } from "@/lib/brevo";
import { saveLead } from "@/lib/leads";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  email: z.string().trim().email().max(200),
  website: z.string().optional(), // honeypot
});

export async function POST(request: Request) {
  if (!rateLimit(`newsletter:${clientIp(request)}`, 5, 60_000)) {
    return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });
  }
  let payload: z.infer<typeof schema>;
  try {
    payload = schema.parse(await request.json());
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  if (payload.website) {
    return NextResponse.json({ ok: true }); // honeypot → fake success
  }

  if (!isBrevoConfigured()) {
    console.info("[newsletter] Brevo not configured — simulated:", payload.email);
    return NextResponse.json({ ok: true, simulated: true });
  }

  try {
    await subscribeNewsletter(payload.email);
    saveLead({ email: payload.email, source: "newsletter" }).catch(() => {});
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] subscribe failed:", err);
    return NextResponse.json(
      { ok: false, error: "subscribe_failed" },
      { status: 502 }
    );
  }
}
