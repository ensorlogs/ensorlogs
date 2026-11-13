const BREVO_API = "https://api.brevo.com/v3";

export function isBrevoConfigured() {
  return Boolean(process.env.BREVO_API_KEY);
}

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  type: string;
  message: string;
  attachment?: { name: string; content: string };
};

async function brevoFetch(path: string, init: RequestInit) {
  return fetch(`${BREVO_API}${path}`, {
    ...init,
    headers: {
      "api-key": process.env.BREVO_API_KEY!,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
}

/** Sends the notification email to the site owner via Brevo transactional. */
export async function sendContactEmail(payload: ContactPayload) {
  const to = process.env.CONTACT_TO_EMAIL;
  const sender = process.env.BREVO_SENDER_EMAIL;
  if (!to || !sender) throw new Error("CONTACT_TO_EMAIL/BREVO_SENDER_EMAIL unset");

  const res = await brevoFetch("/smtp/email", {
    method: "POST",
    body: JSON.stringify({
      sender: { email: sender, name: "Ensor.Logs Contact" },
      replyTo: { email: payload.email, name: payload.name },
      to: [{ email: to }],
      subject: `[ensorlogs] ${payload.type} — ${payload.name}`,
      textContent: `Tipo: ${payload.type}\nNombre: ${payload.name}\nEmail: ${payload.email}\nTeléfono/WhatsApp: ${payload.phone ?? "—"}\n\n${payload.message}`,
      ...(payload.attachment ? { attachment: [payload.attachment] } : {}),
    }),
  });

  if (!res.ok) {
    throw new Error(`Brevo SMTP error: ${res.status} ${await res.text()}`);
  }
}

/** Adds the lead to a Brevo contacts list (best-effort, non-blocking). */
export async function upsertContact(payload: ContactPayload) {
  const listId = Number(process.env.BREVO_LIST_ID ?? 0);
  await brevoFetch("/contacts", {
    method: "POST",
    body: JSON.stringify({
      email: payload.email,
      attributes: {
        FIRSTNAME: payload.name,
        INQUIRY_TYPE: payload.type,
        ...(payload.phone ? { SMS: payload.phone } : {}),
      },
      updateEnabled: true,
      ...(listId ? { listIds: [listId] } : {}),
    }),
  });
}

/** Newsletter opt-in — BREVO_NEWSLETTER_LIST_ID, fallback BREVO_LIST_ID. */
export async function subscribeNewsletter(email: string) {
  const listId = Number(
    process.env.BREVO_NEWSLETTER_LIST_ID ?? process.env.BREVO_LIST_ID ?? 0
  );
  const res = await brevoFetch("/contacts", {
    method: "POST",
    body: JSON.stringify({
      email,
      attributes: { NEWSLETTER: true },
      updateEnabled: true,
      ...(listId ? { listIds: [listId] } : {}),
    }),
  });
  if (!res.ok) {
    throw new Error(`Brevo contacts error: ${res.status} ${await res.text()}`);
  }
}

/** Branded magic-link email for the admin panel — pixel style, via Brevo. */
export async function sendAccessEmail(
  email: string,
  link: string,
  code?: string | null
) {
  const sender = process.env.BREVO_SENDER_EMAIL;
  if (!sender) throw new Error("BREVO_SENDER_EMAIL unset");

  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#0d0a08">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0d0a08;padding:32px 16px"><tr><td align="center">
<table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;border:3px solid #f5a623;background:#171310">
  <tr><td style="background:#f5a623;padding:10px 20px;font-family:'Courier New',monospace;font-size:12px;font-weight:bold;letter-spacing:2px;color:#0d0a08">ENSOR.LOGS — PANEL</td></tr>
  <tr><td style="padding:28px 24px 8px;font-family:'Courier New',monospace">
    <p style="margin:0;font-size:13px;color:#8f8577;letter-spacing:3px">&gt; ACCESO SOLICITADO</p>
    <h1 style="margin:14px 0 0;font-size:22px;color:#f5a623;font-weight:bold">Tu enlace de acceso.</h1>
    <p style="margin:16px 0 0;font-size:15px;line-height:1.6;color:#e8e0d4">Pulsa el botón para entrar a tu panel. El enlace es personal, sirve una sola vez y caduca en 1 hora.</p>
  </td></tr>
  <tr><td align="center" style="padding:20px 24px">
    <a href="${link}" style="display:inline-block;background:#f5a623;color:#0d0a08;font-family:'Courier New',monospace;font-size:14px;font-weight:bold;letter-spacing:2px;text-decoration:none;padding:14px 28px;border:3px solid #f5a623">ENTRAR AL PANEL →</a>
  </td></tr>
  ${code ? `<tr><td style="padding:0 24px 20px;font-family:'Courier New',monospace;text-align:center">
    <p style="margin:0;font-size:12px;color:#8f8577;letter-spacing:2px">…o usa tu código:</p>
    <p style="margin:8px 0 0;font-size:26px;letter-spacing:10px;color:#8fd14f;font-weight:bold">${code}</p>
  </td></tr>` : ""}
  <tr><td style="border-top:2px solid #2a231c;padding:16px 24px;font-family:'Courier New',monospace">
    <p style="margin:0;font-size:11px;line-height:1.6;color:#8f8577">Si no pediste este acceso, ignora este correo.<br>ensorlogs.com — domótica, web e IA</p>
  </td></tr>
</table></td></tr></table></body></html>`;

  const res = await brevoFetch("/smtp/email", {
    method: "POST",
    body: JSON.stringify({
      sender: { email: sender, name: "Ensor.Logs" },
      to: [{ email }],
      subject: "Tu enlace de acceso — Ensor.Logs",
      htmlContent: html,
      textContent: `Tu enlace de acceso (caduca en 1 hora): ${link}${code ? `\n\nCódigo: ${code}` : ""}`,
    }),
  });
  if (!res.ok) {
    throw new Error(`Brevo SMTP error: ${res.status} ${await res.text()}`);
  }
}
