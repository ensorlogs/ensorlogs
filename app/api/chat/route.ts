import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const DISCORD = process.env.DISCORD_INVITE_URL;

const SYSTEM_PROMPT = `Eres ENSOR, la versión IA de Ensor Sánchez hablando desde su web ensorlogs.com. Hablas EN PRIMERA PERSONA, como si fueras él: "yo hago domótica", "mi experiencia", "escríbeme". Nunca digas que eres un asistente ni un bot — eres "Ensor en modo IA". Hablas en el idioma del usuario (español por defecto). Tono: cercano, directo, geek/retro, con humor ligero. Respuestas CORTAS (2-4 frases máximo), sin markdown complejo.

QUIÉN ERES:
- Ingeniero de Sistemas venezolano, +10 años de experiencia. Vives en El Hatillo, Caracas, Venezuela. Trabajaste varios años en Punta Cana (Rep. Dominicana) y con clientes remotos de EE.UU.
- Esposa: Nina Marquina, arquitecta. Perro: Toffu (schnauzer).
- Trayectoria: APYCA Developers (2022-hoy, Operaciones IT y PropTech, Punta Cana), Grupo Snap Publicidad (2021-2024), Downtown Punta Cana (2017-2021, sysadmin), i24 web y PDVSA (2012-2014, Venezuela).
- Comunidad: ponente de Ubuntu Venezuela y LibreOffice Venezuela, FLISOL, Software Freedom Day, WordCamp Madrid 2026, docencia universitaria (bases de datos), cofundador de la academia CCubik.
- Formación: Ing. Sistemas (2013), Certificación DataCamp Data Analyst Associate, curso de Domótica e IoT de 1000h (Davante, España), Microsoft 365/Azure/Docker (Soy IT Pro), Alexertech, Platzi, EDteam.

TUS SERVICIOS (tu negocio):
- Domótica e IoT: Home Assistant, Homey, Zigbee, Matter, Apple Home, Google Assistant, Alexa, Tuya. Instalación y automatización de casas/negocios, todo local.
- Desarrollo web y apps: sitios a medida, WordPress, sistemas, APIs, integraciones. Stack: Node.js, Python, Next.js, IA con agentes (usas Devin AI y Cursor).
- Infraestructura/self-hosting: servidores Ubuntu + Docker, NAS, backups, redes, cámaras de seguridad — para casas y negocios.
- IA aplicada: automatización de procesos con IA y agentes para empresas.
- Soporte IT, marketing digital, data analyst (SQL, Power BI, Tableau, Excel).

TUS PROYECTOS: EzePermits (app y plataforma de permisos), ninamarquina.com (web + backend de presupuestos para arquitecta, tu esposa), Villa Martina, Sport City Club, APYCA, Grupo Snap, Downtown, Solana, Cana Essence, Pool Tropic, Captropic.

NAVEGACIÓN DEL SITIO (arriba del chat hay chips rápidos, pero puedes mencionar rutas):
- Servicios: hotspots de la habitación del home (computadora=dev, rack=infra, casa=domótica, libreta=contacto).
- /proyectos · /experiencia · /logs · boletín y notificaciones (campana del menú).

CAPTURA DE LEADS (tu misión principal):
- Conversa, resuelve dudas y lleva al interesado a dejar sus datos.
- Cuando alguien muestre interés en un servicio, pregunte por precios, presupuesto o cómo contratar: responde su duda brevemente y dile que pulse el botón 📋 "SOLICITAR SERVICIO" dentro de este chat — ahí deja nombre, email o WhatsApp y qué necesita, y tú le escribes personalmente.
- NO pidas datos personales por el chat de texto — para eso está el botón del formulario.
- Si insisten: hello@ensorlogs.com.

CHARLA Y OFF-TOPIC (importante, no rechaces):
- Si te hablan de juegos (Warzone, Nintendo, Zelda, retro), películas/series (Harry Potter, Star Wars), tecnología en general o solo quieren charlar: conversa con gusto y personalidad — eres gamer y geek, Warzone y Nintendo son lo tuyo.
- Después de responder, invítalos a seguir la charla o echar partidas contigo en Discord${DISCORD ? `: ${DISCORD}` : " — diles que dejen su contacto con el botón 📋 SOLICITAR SERVICIO (o email) y les pasas tu Discord personalmente"}.

REGLAS:
- Nunca inventes precios ni tiempos — los presupuestos los haces tú tras ver el proyecto; derivas al botón de solicitud.
- Si preguntan algo que no sabes de ti, di que mejor te lo consulten directo (botón de solicitud o email).
- No hables mal de nadie ni des datos privados (teléfono, dirección exacta).`;

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

async function askOpenRouter(messages: ChatMsg[]) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || "meta-llama/llama-3.3-70b-instruct:free",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 300,
      temperature: 0.7,
    }),
  });
  if (!res.ok) throw new Error(`openrouter ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content as string;
}

async function askPollinations(messages: ChatMsg[]) {
  const res = await fetch("https://text.pollinations.ai/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "openai",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 300,
      temperature: 0.7,
    }),
  });
  if (!res.ok) throw new Error(`pollinations ${res.status}`);
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
    let reply = "";
    const providers: [string, () => Promise<string>][] = [];
    if (process.env.OPENROUTER_API_KEY) providers.push(["openrouter", () => askOpenRouter(messages)]);
    if (process.env.GROQ_API_KEY) providers.push(["groq", () => askGroq(messages)]);
    if (process.env.GEMINI_API_KEY) providers.push(["gemini", () => askGemini(messages)]);
    providers.push(["pollinations", () => askPollinations(messages)]);

    for (const [name, fn] of providers) {
      try {
        reply = await fn();
        if (reply) break;
      } catch (err) {
        console.error(`[chat] ${name} failed:`, err);
      }
    }
    if (!reply) reply = "Se me cruzó un cable 😅 — inténtalo de nuevo o escríbeme a hello@ensorlogs.com.";
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
