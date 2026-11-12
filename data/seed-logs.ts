import type { LogRow } from "@/lib/types";

/**
 * Local seed content — powers the site until Supabase is connected.
 * type "log" = text bitácora entry · type "story" = video log (reel/short).
 * Once NEXT_PUBLIC_SUPABASE_URL is set, lib/data.ts reads from the DB instead.
 */
export const seedLogs: LogRow[] = [
  {
    id: "seed-007",
    slug: "unboxing-air-quality-sensor",
    type: "story",
    title_es: "Unboxing: sensor Zigbee de calidad de aire",
    title_en: "Unboxing: Zigbee air quality sensor",
    excerpt_es: "Primeras impresiones y pairing con Zigbee2MQTT en 2 minutos.",
    excerpt_en: "First impressions and Zigbee2MQTT pairing in 2 minutes.",
    content_es: `## Qué estaba haciendo

El salón tenía un sensor de temperatura pero nada que midiera **CO₂ ni VOC**. Encontré este sensor Zigbee y lo metí directo al rack.

## El proceso

1. Unboxing y revisión de build — sorprendentemente sólido por el precio.
2. Modo pairing: botón trasero 5 segundos hasta que parpadea el LED.
3. Zigbee2MQTT lo detectó como \`TS0601_air_quality\` sin tocar nada.
4. Lo añadí al dashboard de Home Assistant con tarjeta de gauge.

## Resultado

Ahora la ventilación del despacho se enciende sola cuando el CO₂ pasa de 1000ppm. El video del unboxing completo está arriba.`,
    content_en: `## What I was doing

The living room had a temperature sensor but nothing measuring **CO₂ or VOCs**. Found this Zigbee sensor and wired it straight into the rack.

## The process

1. Unboxing and build check — surprisingly solid for the price.
2. Pairing mode: rear button for 5 seconds until the LED blinks.
3. Zigbee2MQTT picked it up as \`TS0601_air_quality\` with zero config.
4. Added it to the Home Assistant dashboard with a gauge card.

## Result

Office ventilation now kicks in by itself when CO₂ goes over 1000ppm. The full unboxing video is up top.`,
    category: "domotica",
    video_url:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail_url: null,
    platform: "web",
    external_link: null,
    published: true,
    published_at: "2026-11-01T12:00:00Z",
    position: 1,
    created_at: "2026-11-01T12:00:00Z",
  },
  {
    id: "seed-006",
    slug: "smart-lock-60s-setup",
    type: "story",
    title_es: "Setup express: cerradura inteligente en 60s",
    title_en: "Quick setup: smart lock in 60s",
    excerpt_es:
      "Instalación de la cerradura de la puerta del estudio y su primera automatización.",
    excerpt_en:
      "Installing the studio door smart lock and its first automation.",
    content_es: `## El encargo

La puerta del estudio necesitaba cerradura inteligente: entro y salgo con el portátil y las manos llenas.

## Lo que hice

- Cambio de cilindro (10 minutos, un destornillador)
- Emparejado con Zigbee2MQTT y expuesto a Home Assistant
- Primera automatización: si es de noche y no hay movimiento en 15 min → bloqueo automático + notificación

## Detalle técnico

La cerradura reporta estado real (no solo el comando enviado), así que las automatizaciones no mienten. En el video se ve el flujo completo.`,
    content_en: `## The brief

The studio door needed a smart lock: I go in and out with the laptop and full hands.

## What I did

- Cylinder swap (10 minutes, one screwdriver)
- Paired with Zigbee2MQTT and exposed to Home Assistant
- First automation: if it's night and no motion for 15 min → auto-lock + notification

## Technical detail

The lock reports its real state (not just the command sent), so automations don't lie. The video shows the full flow.`,
    category: "domotica",
    video_url:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnail_url: null,
    platform: "web",
    external_link: null,
    published: true,
    published_at: "2026-10-20T12:00:00Z",
    position: 2,
    created_at: "2026-10-20T12:00:00Z",
  },
  {
    id: "seed-005",
    slug: "rack-tour-home-brain",
    type: "story",
    title_es: "Tour por el rack: el cerebro de la casa",
    title_en: "Rack tour: the brain of the house",
    excerpt_es:
      "Un paseo rápido por el rack que corre Home Assistant, los backups y la red de la casa.",
    excerpt_en:
      "A quick walk through the rack running Home Assistant, backups and the house network.",
    content_es: `## El rack

Todo lo digital de la casa vive en este rack: el servidor Ubuntu, el switch PoE que alimenta los sensores cableados y el NAS de backups.

## Por niveles

1. **Router + switch PoE** — la VLAN de IoT separada de la red principal.
2. **Servidor Ubuntu + Docker** — Home Assistant, Zigbee2MQTT, Portainer.
3. **NAS** — backups automáticos cada noche (y restauración probada, que es lo importante).

## En el video

El tour completo con el cableado y los LEDs en acción.`,
    content_en: `## The rack

Everything digital in the house lives in this rack: the Ubuntu server, the PoE switch feeding the wired sensors, and the backup NAS.

## Level by level

1. **Router + PoE switch** — the IoT VLAN separated from the main network.
2. **Ubuntu server + Docker** — Home Assistant, Zigbee2MQTT, Portainer.
3. **NAS** — automatic nightly backups (with tested restores, which is the important part).

## In the video

The full tour with cabling and LEDs in action.`,
    category: "domotica",
    video_url:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnail_url: null,
    platform: "web",
    external_link: null,
    published: true,
    published_at: "2026-10-05T12:00:00Z",
    position: 3,
    created_at: "2026-10-05T12:00:00Z",
  },
  {
    id: "seed-004",
    slug: "home-server-ubuntu-home-assistant",
    type: "log",
    title_es: "Mi servidor de casa: Ubuntu + Home Assistant",
    title_en: "My home server: Ubuntu + Home Assistant",
    excerpt_es:
      "Cómo convertí una máquina humilde en el cerebro de mi casa: contenedores, automatizaciones y cero nube obligatoria.",
    excerpt_en:
      "How I turned a humble machine into the brain of my house: containers, automations and zero mandatory cloud.",
    content_es: `## Contexto

Quería una casa inteligente que no dependiera de la nube de nadie. La respuesta: un servidor local con **Ubuntu Server** corriendo **Home Assistant** en Docker.

## El stack

- Ubuntu Server LTS como base
- Docker + Portainer para los servicios
- Home Assistant como hub de domótica
- Zigbee2MQTT para sensores sin depender de hubs propietarios

## Lo que aprendí

1. La red local es el producto. Si tu VLAN de IoT está mal diseñada, todo lo demás se cae.
2. Las automatizaciones buenas son las que no notas. Si tienes que abrir una app, fallaste.
3. Los backups automatizados no son opcionales: un SD corrupto me lo enseñó una vez, y solo una vez.

## Cierre

Tener el stack en casa significa que si se cae internet, la casa sigue funcionando. Eso es domótica de verdad.`,
    content_en: `## Context

I wanted a smart home that didn't depend on anyone's cloud. The answer: a local server running **Ubuntu Server** with **Home Assistant** in Docker.

## The stack

- Ubuntu Server LTS as the base
- Docker + Portainer for services
- Home Assistant as the domotics hub
- Zigbee2MQTT for sensors without proprietary hubs

## What I learned

1. The local network IS the product. If your IoT VLAN is badly designed, everything else falls apart.
2. Good automations are the ones you don't notice. If you have to open an app, you failed.
3. Automated backups are not optional: a corrupted SD card taught me that once — and only once.

## Wrap-up

Running the stack at home means the house keeps working when the internet goes down. That's real domotics.`,
    category: "domotica",
    video_url: null,
    thumbnail_url: null,
    platform: "web",
    external_link: null,
    published: true,
    published_at: "2026-10-28T12:00:00Z",
    position: 4,
    created_at: "2026-10-28T12:00:00Z",
  },
  {
    id: "seed-003",
    slug: "smart-water-pumps-construtech",
    type: "log",
    title_es: "Bombas de agua inteligentes: IoT aplicado a obra",
    title_en: "Smart water pumps: IoT applied to construction",
    excerpt_es:
      "Sensores de nivel, relés inteligentes y alertas: cómo la telemetría evita inundaciones y ahorra visitas a obra.",
    excerpt_en:
      "Level sensors, smart relays and alerts: how telemetry prevents floods and saves site visits.",
    content_es: `## El problema

En construcción, una bomba de agua que falla a las 3 AM es una inundación a las 8 AM. El mantenimiento reactivo cuesta dinero y reputación.

## La solución

- Sensores de nivel y caudal reportando por MQTT
- Relés inteligentes para encendido/apagado remoto y por reglas
- Alertas a Telegram cuando algo sale del rango normal
- Dashboard de estado en Home Assistant

## Resultado

Cero inundaciones desde la instalación, y las visitas de revisión pasaron de semanales a mensuales. **Construtech** no es poner tablets en obra: es que los datos trabajen por ti.`,
    content_en: `## The problem

In construction, a water pump failing at 3 AM means a flood at 8 AM. Reactive maintenance costs money and reputation.

## The solution

- Level and flow sensors reporting over MQTT
- Smart relays for remote and rule-based switching
- Telegram alerts when values leave normal range
- Status dashboard in Home Assistant

## Result

Zero floods since installation, and inspection visits went from weekly to monthly. **Construtech** isn't putting tablets on site — it's making data work for you.`,
    category: "construtech",
    video_url: null,
    thumbnail_url: null,
    platform: "web",
    external_link: null,
    published: true,
    published_at: "2026-10-15T12:00:00Z",
    position: 5,
    created_at: "2026-10-15T12:00:00Z",
  },
  {
    id: "seed-002",
    slug: "ai-agents-dev-workflow",
    type: "log",
    title_es: "Agentes de IA en mi flujo de desarrollo",
    title_en: "AI agents in my development workflow",
    excerpt_es:
      "De autocompletado a agentes que ejecutan tareas completas: qué funciona, qué no, y cómo lo integro sin perder el control.",
    excerpt_en:
      "From autocomplete to agents running full tasks: what works, what doesn't, and how I integrate them without losing control.",
    content_es: `## Contexto

La IA pasó de ser un juguete a ser parte del equipo. Pero integrarla bien requiere criterio, no hype.

## Lo que sí funciona

- Agentes para tareas acotadas con verificación clara (tests que pasan, builds que compilan)
- Generación de scaffolding y código repetitivo
- Primera pasada de code review y detección de edge cases

## Lo que no delego

- Decisiones de arquitectura
- Código que toca dinero o seguridad sin revisión línea por línea
- Comunicación con el cliente

## Regla de oro

La IA escribe, el humano firma. Si no puedes explicar el código, no va a producción.`,
    content_en: `## Context

AI went from being a toy to being part of the team. But integrating it well takes judgment, not hype.

## What actually works

- Agents for scoped tasks with clear verification (passing tests, clean builds)
- Scaffolding and repetitive code generation
- First-pass code review and edge-case detection

## What I don't delegate

- Architecture decisions
- Code touching money or security without line-by-line review
- Client communication

## Golden rule

The AI writes, the human signs off. If you can't explain the code, it doesn't ship.`,
    category: "ia",
    video_url: null,
    thumbnail_url: null,
    platform: "web",
    external_link: null,
    published: true,
    published_at: "2026-09-30T12:00:00Z",
    position: 6,
    created_at: "2026-09-30T12:00:00Z",
  },
  {
    id: "seed-001",
    slug: "tourism-tech-booking-automation",
    type: "log",
    title_es: "Tourism Tech: automatizando reservas sin fricción",
    title_en: "Tourism Tech: automating bookings without friction",
    excerpt_es:
      "Flujos de reserva, confirmaciones por email y sincronización de calendarios para un cliente del sector turismo.",
    excerpt_en:
      "Booking flows, email confirmations and calendar sync for a tourism-sector client.",
    content_es: `## El encargo

Un cliente de turismo gestionaba reservas por WhatsApp y Excel. Cada reserva era copiar y pegar datos cinco veces.

## Lo que construimos

1. Formulario de reserva con validación y disponibilidad en tiempo real
2. Confirmaciones automáticas por email (transaccional)
3. Sincronización bidireccional con el calendario del negocio
4. Panel simple para ver ocupación del mes

## Aprendizaje

En **Tourism Tech** la tecnología no es el producto: la experiencia sí. Cada fricción que eliminas en el flujo es una reserva que no se pierde.`,
    content_en: `## The brief

A tourism client managed bookings through WhatsApp and Excel. Every booking meant copy-pasting data five times.

## What we built

1. Booking form with validation and real-time availability
2. Automatic email confirmations (transactional)
3. Two-way sync with the business calendar
4. Simple panel showing monthly occupancy

## Takeaway

In **Tourism Tech** technology isn't the product — the experience is. Every bit of friction you remove from the flow is a booking that doesn't get lost.`,
    category: "tourism",
    video_url: null,
    thumbnail_url: null,
    platform: "web",
    external_link: null,
    published: true,
    published_at: "2026-09-12T12:00:00Z",
    position: 7,
    created_at: "2026-09-12T12:00:00Z",
  },
];
