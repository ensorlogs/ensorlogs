import { NextResponse } from "next/server";
import { z } from "zod";
import {
  isBrevoConfigured,
  sendContactEmail,
  upsertContact,
} from "@/lib/brevo";
import { saveLead } from "@/lib/leads";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { createServiceClient } from "@/lib/supabase/admin";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional(),
  type: z
    .enum(["web", "apps", "ia", "domotica", "camaras", "marketing"])
    .default("web"),
  message: z.string().trim().min(1).max(5000),
  website: z.string().optional(), // honeypot
  t0: z.string().optional(), // time-trap
  ca: z.coerce.number().int().min(0).max(50).optional(),
  cb: z.coerce.number().int().min(0).max(50).optional(),
  captcha: z.coerce.number().int().optional(),
  "cf-turnstile-response": z.string().optional(),
});

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured → rely on honeypot + time-trap
  if (!token) return false;
  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token, remoteip: ip }),
    }
  );
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

async function uploadAttachment(file: File): Promise<string | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = createServiceClient();
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "png";
    const path = `leads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage
      .from("stories-media")
      .upload(path, file, { contentType: file.type });
    if (error) return null;
    return supabase.storage.from("stories-media").getPublicUrl(path).data
      .publicUrl;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (!rateLimit(`contact:${ip}`, 5, 60_000)) {
    return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const parsed = schema.safeParse(
    Object.fromEntries(
      [...form.entries()].filter(([, v]) => typeof v === "string")
    )
  );
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const payload = parsed.data;

  // Honeypot filled → pretend success, discard silently
  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  // Time-trap: humans need a few seconds to fill the form
  const t0 = Number(payload.t0);
  if (!Number.isFinite(t0) || Date.now() - t0 < 3000) {
    return NextResponse.json({ ok: true });
  }

  // math captcha — operands ship with the form, server re-checks the sum
  if (
    payload.ca === undefined ||
    payload.cb === undefined ||
    payload.captcha !== payload.ca + payload.cb
  ) {
    return NextResponse.json({ ok: false, error: "captcha" }, { status: 400 });
  }

  if (!(await verifyTurnstile(payload["cf-turnstile-response"] ?? "", ip))) {
    return NextResponse.json(
      { ok: false, error: "captcha" },
      { status: 400 }
    );
  }

  // Optional image attachment → Supabase Storage (public leads/ folder)
  let attachmentUrl: string | null = null;
  let attachment: { name: string; content: string } | undefined;
  const image = form.get("image");
  if (
    image instanceof File &&
    image.size > 0 &&
    image.size <= MAX_IMAGE_BYTES &&
    image.type.startsWith("image/")
  ) {
    attachmentUrl = await uploadAttachment(image);
    attachment = {
      name: image.name,
      content: Buffer.from(await image.arrayBuffer()).toString("base64"),
    };
  }

  const message = attachmentUrl
    ? `${payload.message}\n\n[adjunto] ${attachmentUrl}`
    : payload.message;

  if (!isBrevoConfigured()) {
    console.info("[contact] Brevo not configured — simulated send:", {
      name: payload.name,
      email: payload.email,
      type: payload.type,
      message: message.slice(0, 140),
    });
    return NextResponse.json({ ok: true, simulated: true });
  }

  try {
    await sendContactEmail({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      type: payload.type,
      message,
      attachment,
    });
    // Lead capture is best-effort — never fails the submission
    upsertContact(payload).catch((err) =>
      console.warn("[contact] upsertContact failed:", err)
    );
    saveLead({
      email: payload.email,
      name: payload.name,
      service: payload.type,
      message,
      source: "contact",
    }).catch(() => {});
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 502 }
    );
  }
}
