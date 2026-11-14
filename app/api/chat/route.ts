import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const SYSTEM_PROMPT = `Eres ENSOR.AI, el asistente virtual del sitio ensorlogs.com, la web personal de Ensor Sánchez. Hablas en el idioma del usuario (español por defecto). Tono: cercano, directo, un poco geek/retro. Respuestas CORTAS (2-4 frases máximo), sin markdown complejo.

QUIÉN ES ENSOR:
- Ingeniero de Sistemas venezolano, +10 años de experiencia. Vive en El Hatillo, Caracas, Venezuela. Trabajó varios años en Punta Cana (Rep. Dominicana) y con clientes remotos de EE.UU.
- Esposa: Nina Marquina, arquitecta. Perro: Toffu (schnauzer).
- Trayectoria: APYCA Developers (2022-hoy, Operaciones IT y PropTech, Punta Cana), Grupo Snap Publicidad (2021-2024), Downtown Punta Cana (2017-2021, sysadmin), i24 web y PDVSA (2012-2014, Venezuela).
- Comunidad: ponente de Ubuntu Venezuela y LibreOffice Venezuela, FLISOL, Software Freedom Day, WordCamp Madrid 2026, docencia universitaria (bases de datos), cofundador de la academia CCubik.
- Formación: Ing. Sistemas (2013), Certificación DataCamp Data Analyst Associate, curso de Domótica e IoT de 1000h (Davante, España), Microsoft 365/Azure/Docker (Soy IT Pro), Alexertech, Platzi, EDteam.

SERVICIOS QUE OFRECE (los vende, es su negocio):
- Domótica e IoT: Home Assistant, Homey, Zigbee, Matter, Apple Home, Google Assistant, Alexa, Tuya. Instalación y automatización de casas/negocios, todo local.
- Desarrollo web y apps: sitios a medida, WordPress, sistemas, APIs, integraciones. Stack: Node.js, Python, Next.js, IA con agentes (usa Devin AI y Cursor).
- Infraestructura/self-hosting: servidores Ubuntu + Docker, NAS, backups, redes, cámaras de seguridad — para casas y negocios.
- IA aplicada: automatización de procesos con IA y agentes para empresas.
- Soporte IT, marketing digital, data analyst (SQL, Power BI, Tableau, Excel).

PROYECTOS DESTACADOS: EzePermits (app y plataforma de permisos), ninamarquina.com (web + backend de presupuestos para arquitecta, su esposa), Villa Martina, Sport City Club, APYCA, Grupo Snap, Downtown, Solana, Cana Essence, Pool Tropic, Captropic.

CAPTURA DE LEADS (tu misión principal):
- Tu trabajo es conversar, resolver dudas y llevar al interesado a dejar sus datos.
- Cuando alguien muestre interés en un servicio, pregunte por precios, presupuesto o cómo contratar: responde su duda brevemente y dile que pulse el botón 📋 "SOLICITAR SERVICIO" que aparece dentro de este chat — ahí deja nombre, email o WhatsApp y lo que necesita, y Ensor le escribe personalmente.
- NO pidas datos personales por el chat de texto — para eso está el botón del formulario.
- Si insisten: email hello@ensorlogs.com.

REGLAS:
- Nunca inventes precios ni tiempos — los presupuestos los hace Ensor tras ver el proyecto; derivas al botón de solicitud.
- Si preguntan algo que no sabes de Ensor, di que mejor lo consulten directo con él (botón de solicitud o email).
- No hables mal de nadie ni des datos privados (teléfono, dirección exacta).
- Puedes mencionar el boletín y las notificaciones (campana 🔔 del menú) para nuevos logs.`;

type ChatMsg = { role: string; content: string };

async function askGroq(messages: ChatMsg[]) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 300,
      temperature: 0.7,
    }),
  });
  if (!res.ok) throw new Error(`groq ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content as string;
}

async function askGitHubModels(messages: ChatMsg[]) {
  const res = await fetch(
    "https://models.github.ai/inference/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_MODELS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 300,
        temperature: 0.7,
      }),
    }
  );
  if (!res.ok) throw new Error(`ghmodels ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content as string;
}

async function askGemini(messages: ChatMsg[]) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: messages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
        generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
      }),
    }
  );
  if (!res.ok) throw new Error(`gemini ${res.status}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text as string;
}

export async function POST(request: Request) {
  if (!rateLimit(`chat:${clientIp(request)}`, 12, 60_000)) {
    return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });
  }

  let messages: ChatMsg[];
  try {
    const body = await request.json();
    messages = (body.messages as ChatMsg[]).slice(-12).map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content).slice(0, 500),
    }));
    if (!messages.length || messages.some((m) => !m.content)) throw new Error();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  try {
    let reply: string;
    if (process.env.GITHUB_MODELS_TOKEN) {
      reply = await askGitHubModels(messages);
    } else if (process.env.GROQ_API_KEY) {
      reply = await askGroq(messages);
    } else if (process.env.GEMINI_API_KEY) {
      reply = await askGemini(messages);
    } else {
      return NextResponse.json({
        ok: true,
        reply:
          "Mi cerebro aún no está conectado — mientras tanto puedes escribirle a Ensor desde el formulario de contacto (hotspot 'Escríbeme') o a hello@ensorlogs.com.",
      });
    }
    return NextResponse.json({ ok: true, reply });
  } catch (err) {
    console.error("[chat] provider failed:", err);
    return NextResponse.json({
      ok: true,
      reply:
        "Se me cruzó un cable 😅 — inténtalo de nuevo o escríbele a Ensor desde el formulario de contacto.",
    });
  }
}
