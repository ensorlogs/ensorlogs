const BREVO_API = "https://api.brevo.com/v3";

export function isBrevoConfigured() {
  return Boolean(process.env.BREVO_API_KEY);
}

type ContactPayload = {
  name: string;
  email: string;
  type: string;
  message: string;
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
      textContent: `Tipo: ${payload.type}\nNombre: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
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
      attributes: { FIRSTNAME: payload.name, INQUIRY_TYPE: payload.type },
      updateEnabled: true,
      ...(listId ? { listIds: [listId] } : {}),
    }),
  });
}
