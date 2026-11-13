import { NextResponse } from "next/server";
import { z } from "zod";
import { isBrevoConfigured, sendContactEmail, upsertContact } from "@/lib/brevo";
import { saveLead } from "@/lib/leads";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional(),
  type: z
    .enum(["web", "apps", "soporte", "domotica", "camaras", "marketing"])
    .default("web"),
  message: z.string().trim().min(1).max(5000),
  website: z.string().optional(), // honeypot
});

export async function POST(request: Request) {
  let payload: z.infer<typeof schema>;
  try {
    payload = schema.parse(await request.json());
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot filled → pretend success, discard silently
  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  if (!isBrevoConfigured()) {
    console.info("[contact] Brevo not configured — simulated send:", {
      name: payload.name,
      email: payload.email,
      type: payload.type,
      message: payload.message.slice(0, 140),
    });
    return NextResponse.json({ ok: true, simulated: true });
  }

  try {
    await sendContactEmail(payload);
    // Lead capture is best-effort — never fails the submission
    upsertContact(payload).catch((err) =>
      console.warn("[contact] upsertContact failed:", err)
    );
    saveLead({
      email: payload.email,
      name: payload.name,
      service: payload.type,
      message: payload.message,
      source: "contact",
    }).catch(() => {});
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
