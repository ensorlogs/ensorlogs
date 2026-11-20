import { NextResponse } from "next/server";
import { z } from "zod";
import {
  isBrevoConfigured,
  sendContactEmail,
  upsertContact,
} from "@/lib/brevo";
import { saveLead } from "@/lib/leads";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional(),
  service: z
    .enum(["web", "apps", "ia", "domotica", "camaras", "marketing"])
    .default("web"),
  message: z.string().trim().min(1).max(2000),
  website: z.string().optional(), // honeypot
});

export async function POST(request: Request) {
  if (!rateLimit(`chatlead:${clientIp(request)}`, 5, 60_000)) {
    return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });
  }

  let payload: z.infer<typeof schema>;
  try {
    payload = schema.parse(await request.json());
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  if (payload.website) return NextResponse.json({ ok: true });

  // need at least one channel to reach the lead
  if (!payload.email && !payload.phone) {
    return NextResponse.json({ ok: false, error: "contact" }, { status: 400 });
  }

  const message = `💬 [vía chat ENSOR.AI]\n${payload.message}`;

  // lead capture first — the lead is saved even if email sending fails
  saveLead({
    email: payload.email || `chat-${Date.now()}@no-email.local`,
    name: payload.name,
    service: payload.service,
    message: payload.phone
      ? `${message}\n📱 WhatsApp/tel: ${payload.phone}`
      : message,
    source: "contact",
  }).catch(() => {});

  if (!isBrevoConfigured()) {
    return NextResponse.json({ ok: true, simulated: true });
  }

  try {
    await sendContactEmail({
      name: payload.name,
      email: payload.email || "chat@ensorlogs.com",
      phone: payload.phone,
      type: payload.service,
      message,
    });
    if (payload.email) {
      upsertContact({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        type: payload.service,
        message,
      }).catch(() => {});
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[chat/lead] notify failed:", err);
    return NextResponse.json({ ok: true }); // lead already stored
  }
}
