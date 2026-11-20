export type ProjectDetail = {
  context: string;
  solution: string;
  results?: string;
};

export type Project = {
  slug: string;
  name: string;
  image: string;
  tag: { es: string; en: string };
  summary: { es: string; en: string };
  stack: string[];
  images?: string[];
  metric?: { value: string; es: string; en: string };
  url?: string;
  detail: { es: ProjectDetail; en: ProjectDetail };
};

export const projects: Project[] = [
  {
    slug: "villa-martina",
    name: "Villa Martina Residences",
    image: "/projects/villa-martina.webp",
    tag: {
      es: "PropTech · operaciones digitales",
      en: "PropTech · digital operations",
    },
    summary: {
      es: "Ecosistema digital end-to-end para un residencial de 110 unidades en Punta Cana: web comercial, CRM AlterEstate, automatización de obra con Monday, dashboards, soporte IT y campañas con recorridos 360°.",
      en: "End-to-end digital ecosystem for a 110-unit residence in Punta Cana: commercial site, AlterEstate CRM, construction automation with Monday, dashboards, IT support and 360° tour campaigns.",
    },
    stack: ["WordPress", "CRM", "Database", "IT", "Google", "Marketing", "Servidores"],
    metric: {
      value: "65%",
      es: "mejora en eficiencia operativa y de ventas",
      en: "improvement in sales & ops efficiency",
    },
    detail: {
      es: {
        context:
          "La constructora APYCA me contrató en Punta Cana para analizar el estado del proyecto a nivel de tecnología y ventas. Todo corría en Excel: archivos manuales, carpetas, sin digitalización comercial y sin seguimiento de obra en tiempo real para gerencia ni compradores. El objetivo era integrar ventas, marketing y operaciones en un flujo digital unificado.",
        solution:
          "Nuevo sitio web para generar confianza y captación. Implementación del CRM AlterEstate enfocado en ventas y cobros, migrando toda la data desde Excel y conectándola con Google Workspace. Automatización de procesos de obra en Monday con dashboards de seguimiento. Rebranding con las APYCÁPSULAS — videos entrevistando al equipo — campañas de email marketing conectadas a redes y recorridos 360° para acercar el proyecto a clientes que viven fuera del país. Tres meses de implementación con soporte continuo a todos los equipos.",
        results:
          "65% de mejora en eficiencia operativa y de ventas. Web, CRM, automatización, analítica y soporte IT operando como un solo ecosistema sobre un proyecto residencial de más de 18 millones de dólares.",
      },
      en: {
        context:
          "APYCA brought me to Punta Cana to assess the project's technology and sales state. Everything ran on Excel — manual files, folders, no sales digitalization and no real-time construction tracking for management or buyers. The goal was to unify sales, marketing and operations into one digital flow.",
        solution:
          "New website to build trust and capture leads. AlterEstate CRM implementation focused on sales and collections, migrating all data from Excel and connecting it with Google Workspace. Construction process automation in Monday with tracking dashboards. Rebranding through the APYCÁPSULAS — team interview videos — email campaigns tied to social and 360° tours bringing the project closer to out-of-country buyers. Three months of implementation with continuous team support.",
        results:
          "65% improvement in operational and sales efficiency. Web, CRM, automation, analytics and IT support running as one ecosystem over an $18M+ residential project.",
      },
    },
  },
  {
    slug: "sport-city-club",
    name: "Sport City Club",
    image: "/projects/sport-city-club.webp",
    tag: {
      es: "Ecosistema digital · club deportivo",
      en: "Digital ecosystem · sports club",
    },
    summary: {
      es: "Tecnología operativa diseñada desde el anteproyecto: redes, servidores, CCTV, sistemas de acceso y plataformas digitales para áreas deportivas, bowling, administración y el futuro hotel urbano.",
      en: "Operational technology designed from pre-construction: networks, servers, CCTV, access systems and digital platforms for sports areas, bowling, admin and the future urban hotel.",
    },
    stack: ["WordPress", "IT", "Servidores", "Linux", "Google"],
    metric: {
      value: "100%",
      es: "implementación en fase de anteproyecto",
      en: "implemented at pre-construction phase",
    },
    detail: {
      es: {
        context:
          "Proyecto deportivo comercial en fase de inversión y desarrollo que necesitaba el diseño completo de su futura presencia digital, el manejo correcto de proveedores nacionales e internacionales y el análisis de todos los procesos internos antes de escalar servicios.",
        solution:
          "Diseño y coordinación integral de la infraestructura tecnológica y operativa desde anteproyecto: planificación de redes, conectividad, servidores, CCTV, sistemas de acceso y plataformas digitales para áreas deportivas, bowling, zonas administrativas y comerciales — incluyendo la futura integración del hotel urbano. Acompañamiento técnico con proveedores para garantizar compatibilidad, escalabilidad y una base preparada para expansión.",
        results:
          "Infraestructura capaz de soportar simultáneamente operaciones deportivas, sistemas administrativos, seguridad, conectividad para clientes y plataformas comerciales — con visión centralizada entre mercadeo, operaciones y tecnología.",
      },
      en: {
        context:
          "A commercial sports project in investment and development phase needing the full design of its future digital presence, proper management of national and international vendors, and analysis of all internal processes before scaling services.",
        solution:
          "Integral design and coordination of the technological and operational infrastructure from pre-construction: networks, connectivity, servers, CCTV, access systems and digital platforms for sports areas, bowling, administrative and commercial zones — including the future urban hotel integration. Technical vendor management to guarantee compatibility, scalability and a base ready for expansion.",
        results:
          "Infrastructure able to simultaneously support sports operations, admin systems, security, customer connectivity and commercial platforms — with a centralized vision across marketing, operations and technology.",
      },
    },
  },
  {
    slug: "apyca",
    name: "APYCA Developers",
    image: "/projects/apyca.webp",
    tag: {
      es: "Operaciones IT · PropTech",
      en: "IT operations · PropTech",
    },
    summary: {
      es: "Transformación digital de la desarrolladora: web corporativa, CRM adaptado, Monday + Google Workspace, automatización de procesos y reporting para decisiones.",
      en: "Digital transformation for the developer: corporate site, tailored CRM, Monday + Google Workspace, process automation and decision-driven reporting.",
    },
    stack: ["CRM", "IT", "Marketing", "Python", "Database"],
    metric: {
      value: "60%",
      es: "mejora en eficiencia operativa",
      en: "improvement in operational efficiency",
    },
    detail: {
      es: {
        context:
          "La desarrolladora buscaba mejorar sus operaciones comerciales, administrativas y tecnológicas sin aumentar complejidad. Los procesos dependían de Excel y seguimientos manuales, la marca no tenía identidad digital sólida y faltaban procesos de respaldo, organización documental y automatización.",
        solution:
          "Nueva plataforma web corporativa para centralizar la presentación de proyectos y fortalecer la imagen. CRM adaptado a las necesidades operativas y comerciales. Monday.com como eje de organización conectado con Google Workspace para centralizar comunicación, documentación, tareas y coordinación entre departamentos. Automatizaciones internas, herramientas de reporting, visualización de datos y marketing digital sobre una misma base de información organizada.",
        results:
          "60% de mejora en eficiencia operativa — mejor coordinación entre departamentos, menor carga manual y seguimiento comercial consistente con Monday y AlterEstate.",
      },
      en: {
        context:
          "The developer wanted to improve commercial, administrative and technological operations without adding complexity. Processes depended on Excel and manual tracking, the brand lacked a solid digital identity and there were no backup, document organization or automation processes.",
        solution:
          "New corporate web platform to centralize project presentation and strengthen the image. CRM tailored to operational and commercial needs. Monday.com as the organization hub connected with Google Workspace to centralize communication, documentation, tasks and inter-department coordination. Internal automations, reporting, data visualization and digital marketing over a single organized information base.",
        results:
          "60% improvement in operational efficiency — better inter-department coordination, less manual load and consistent commercial tracking with Monday and AlterEstate.",
      },
    },
  },
  {
    slug: "solana",
    name: "Solana Residences",
    image: "/projects/solana.jpg",
    tag: {
      es: "Transformación digital · residencial",
      en: "Digital transformation · residential",
    },
    summary: {
      es: "Infraestructura, web y soporte operativo: sitio comercial, CRM, recorridos 360°, email marketing y seguimiento de avance de obra para clientes fuera del país.",
      en: "Infrastructure, web and ops support: commercial site, CRM, 360° tours, email marketing and construction-progress tracking for out-of-country buyers.",
    },
    stack: ["WordPress", "Servidores", "Database", "IT", "Mac"],
    metric: {
      value: "60%",
      es: "mejora en eficiencia operativa",
      en: "improvement in operational efficiency",
    },
    detail: {
      es: {
        context:
          "Solana Lifestyle Villages nació como propuesta residencial moderna que necesitaba, desde el anteproyecto, una identidad tecnológica y comercial capaz de potenciar ventas, mercadeo y seguimiento operativo con clientes que en su mayoría viven fuera del país.",
        solution:
          "Diseño y acompañamiento de toda la estructura tecnológica y comercial: sitio web, redes sociales, renders, videos promocionales y material interactivo. CRM con AlterEstate y Monday.com para centralizar prospectos y coordinar tareas. Desde sistemas: manejo de datos, visualización de avances de obra, recorridos 360°, fotografía profesional, email marketing y automatización comercial.",
        results:
          "60% de mejora en eficiencia operativa — conexión real entre la experiencia digital del cliente y las operaciones internas del proyecto, con escalabilidad preparada.",
      },
      en: {
        context:
          "Solana Lifestyle Villages was born as a modern residential proposal that needed — from pre-construction — a technological and commercial identity able to power sales, marketing and operational tracking with mostly out-of-country buyers.",
        solution:
          "Design and support of the entire technological and commercial structure: website, social media, renders, promotional videos and interactive material. CRM with AlterEstate and Monday.com to centralize prospects and coordinate tasks. From the systems side: data management, construction-progress visualization, 360° tours, professional photography, email marketing and commercial automation.",
        results:
          "60% improvement in operational efficiency — a real connection between the customer's digital experience and the project's internal operations, ready to scale.",
      },
    },
  },
  {
    slug: "gruposnap-v2",
    name: "Grupo Snap — Nueva Web + Cotizador B2B",
    image: "/projects/gruposnap-v2.jpg",
    images: [
      "/projects/gruposnap-v2-11.jpg",
      "/projects/gruposnap-v2-12.jpg",
      "/projects/gruposnap-v2-13.jpg",
    ],
    tag: {
      es: "E-commerce · cotizador B2B multi-mercado",
      en: "E-commerce · multi-market B2B quoting",
    },
    summary: {
      es: "Rediseño completo de gruposnap.com para los mercados de RD, Venezuela e internacional: catálogo interactivo con hotspots, cotizador en línea y un admin propio para gestionar cotizaciones, clientes, productos, kits y precios.",
      en: "Full redesign of gruposnap.com for the DR, Venezuela and international markets: interactive catalog with hotspots, online quoting system and a custom admin to manage quotes, clients, products, kits and pricing.",
    },
    stack: ["E-commerce", "Cotizador", "CRM", "Admin Panel", "Database", "Multi-market"],
    url: "https://gruposnap.com/",
    detail: {
      es: {
        context:
          "Grupo Snap necesitaba dejar atrás una web de catálogo estático: los clientes pedían precios por WhatsApp y cada cotización se armaba a mano. El reto era vender en tres mercados (RD, Venezuela e internacional) con precios y flujo diferenciados, sin perder la velocidad de respuesta que los caracteriza.",
        solution:
          "Nueva plataforma completa: web comercial rediseñada con hero de temporada, catálogo interactivo 2026 con puntos clicables sobre cada producto para ver ficha y añadir a la cotización, un sistema de cotización donde el cliente arma su kit de artículos con cantidades y envía la solicitud, y un backend administrativo con dashboard de embudo (recibida → presupuestada → aprobada → en producción → entregada), gestión de clientes/CRM, productos, usuarios, kits, precios, catálogo y notificaciones — segmentado por mercado (RD / VE / Intl).",
        results:
          "Cotizaciones estructuradas que llegan al panel listas para presupuestar — cada solicitud trae artículos y cantidades, con el embudo comercial completo gestionado desde un solo sistema para los tres mercados.",
      },
      en: {
        context:
          "Grupo Snap needed to move past a static catalog site: clients asked for prices over WhatsApp and every quote was built by hand. The challenge was selling across three markets (DR, Venezuela and international) with differentiated pricing and flow, without losing the response speed they're known for.",
        solution:
          "Complete new platform: redesigned commercial site with seasonal hero, 2026 interactive catalog with clickable hotspots on each product to view details and add to the quote, a quoting system where clients build their item kit with quantities and submit the request, and an admin backend with funnel dashboard (received → quoted → approved → in production → delivered), clients/CRM, products, users, kits, pricing, catalog and notifications — segmented by market (DR / VE / Intl).",
        results:
          "Structured quotes arriving at the panel ready to be priced — every request includes items and quantities, with the full sales funnel managed from one system across all three markets.",
      },
    },
  },
  {
    slug: "gruposnap",

    name: "Grupo Snap Publicidad",
    image: "/projects/gruposnap.webp",
    tag: {
      es: "Eficiencia operativa y comercial",
      en: "Operational & commercial efficiency",
    },
    summary: {
      es: "Reestructuración post-pandemia: rebranding, nueva web, Asana + Google Workspace, email marketing segmentado y CRM para el equipo comercial.",
      en: "Post-pandemic restructuring: rebrand, new website, Asana + Google Workspace, segmented email marketing and CRM for the sales team.",
    },
    stack: ["CRM", "Google", "Marketing", "IT"],
    metric: {
      value: "60%",
      es: "mejora en eficiencia operativa y comercial",
      en: "improvement in ops & commercial efficiency",
    },
    detail: {
      es: {
        context:
          "Empresa de material POP y marketing experiencial que tras la pandemia necesitaba reestructuración estratégica: modernizar procesos, actualizar identidad visual y reorganizar sus operaciones comerciales para una nueva etapa de crecimiento.",
        solution:
          "Nuevas herramientas CRM y Asana para gestión de tareas, seguimiento de clientes y control de procesos comerciales. Rebranding completo: rediseño visual, redes sociales, nueva web corporativa y catálogo digital reorganizado. Google Workspace, automatización de procesos, email marketing segmentado y bases de datos comerciales estructuradas.",
        results:
          "60% de mejora en eficiencia operativa y comercial — una operación más organizada, escalable y preparada para el crecimiento posterior a la pandemia.",
      },
      en: {
        context:
          "A POP-materials and experiential marketing company that after the pandemic needed strategic restructuring: modernized processes, updated visual identity and reorganized commercial operations for a new growth stage.",
        solution:
          "New CRM tools and Asana for task management, customer tracking and commercial process control. Full rebrand: visual redesign, social media, new corporate website and reorganized digital catalog. Google Workspace, process automation, segmented email marketing and structured commercial databases.",
        results:
          "60% improvement in operational and commercial efficiency — a more organized, scalable operation ready for post-pandemic growth.",
      },
    },
  },
  {
    slug: "ninamarquina-v2",
    name: "Nina Marquina — Nueva Web + Cotizador",
    image: "/projects/ninamarquina-v2.jpg",
    tag: {
      es: "Desarrollo Web · sistema de cotizaciones",
      en: "Web Development · quoting system",
    },
    summary: {
      es: "Nueva plataforma de ninamarquina.com: los clientes solicitan cotizaciones en un asistente paso a paso y el estudio gestiona todo desde un backend propio — solicitudes, clientes, presupuestos, portfolio y journal.",
      en: "New ninamarquina.com platform: clients request quotes through a step-by-step wizard and the studio manages everything from its own backend — requests, clients, budgets, portfolio and journal.",
    },
    stack: ["Web App", "Cotizador", "CRM", "CMS", "Database"],
    url: "https://ninamarquina.com/",
    detail: {
      es: {
        context:
          "El estudio necesitaba más que una web bonita: un sistema donde los clientes pudieran cotizar sus reformas y proyectos de forma guiada, y donde el equipo gestionara solicitudes, clientes y presupuestos sin depender de correos sueltos.",
        solution:
          "Nueva plataforma completa para ninamarquina.com. Del lado público: sitio bilingüe ES/EN con hero editorial, proyectos destacados, servicios, journal y un asistente de cotización de 6 pasos — tipo de inmueble, superficie, ubicación, estado — que prepara una primera propuesta en menos de 48h. Del lado interno: backend propio con panel de resumen, solicitudes, clientes, proyectos activos, presupuestos, gestión de portfolio y del journal (sus blogs sobre reformas y diseño).",
        results:
          "Cotizaciones estructuradas que llegan al panel listas para responder — cada solicitud ya trae tipo de inmueble, ubicación y alcance, con clientes y presupuestos conectados en el mismo sistema.",
      },
      en: {
        context:
          "The studio needed more than a pretty website: a system where clients could request quotes for their remodels and projects in a guided way, and where the team could manage requests, clients and budgets without loose emails.",
        solution:
          "Complete new platform for ninamarquina.com. Public side: bilingual ES/EN site with editorial hero, featured projects, services, journal and a 6-step quoting wizard — property type, surface, location, status — preparing a first proposal within 48h. Internal side: custom backend with summary dashboard, requests, clients, active projects, budgets, portfolio management and the journal (their blogs about remodels and design).",
        results:
          "Structured quotes arriving at the panel ready to answer — every request already includes property type, location and scope, with clients and budgets connected in the same system.",
      },
    },
  },
  {
    slug: "ninamarquina",
    name: "Nina Marquina — Estudio de Arquitectura",
    image: "/projects/ninamarquina.webp",
    tag: { es: "Desarrollo Web", en: "Web Development" },
    summary: {
      es: "Plataforma WordPress con storytelling visual para la arquitecta: proyectos, renders 3D cinematográficos y la sección editorial Bungalow Trends.",
      en: "WordPress platform with visual storytelling for the architect: projects, cinematic 3D renders and the Bungalow Trends editorial section.",
    },
    stack: ["WordPress", "Google", "IT", "Marketing"],
    url: "https://ninamarquina.com/",
    detail: {
      es: {
        context:
          "La web de Nina Marquina Studio nació para construir una presencia digital alineada con la identidad creativa y visual de la arquitecta — no una página informativa, sino una experiencia digital para proyectos arquitectónicos, renders, servicios y contenido editorial.",
        solution:
          "Plataforma WordPress personalizada enfocada en arquitectura visual, rendimiento y experiencia de usuario. Estructura que integra proyectos, renders cinematográficos, visualización 3D, servicios y la sección editorial Bungalow Trends. Formularios de contacto, SEO inicial, optimización multimedia y diseño responsive conectado a plataformas sociales.",
        results:
          "Un ecosistema digital escalable que funciona como extensión de la identidad profesional y artística del estudio — storytelling visual en lugar de estructura corporativa genérica.",
      },
      en: {
        context:
          "Nina Marquina Studio's website was born to build a digital presence aligned with the architect's creative and visual identity — not an informative page, but a digital experience for architectural projects, renders, services and editorial content.",
        solution:
          "Custom WordPress platform focused on visual architecture, performance and UX. Structure integrating projects, cinematic renders, 3D visualization, services and the Bungalow Trends editorial section. Contact forms, initial SEO, media optimization and responsive design connected to social platforms.",
        results:
          "A scalable digital ecosystem that works as an extension of the studio's professional and artistic identity — visual storytelling instead of a generic corporate structure.",
      },
    },
  },
  {
    slug: "downtown",
    name: "Downtown Punta Cana",
    image: "/projects/downtown.webp",
    tag: { es: "Infraestructura IT", en: "IT Infrastructure" },
    summary: {
      es: "Infraestructura híbrida, monitoreo y soporte cercano para el complejo comercial y de entretenimiento: web corporativa, servidores y estabilidad operativa.",
      en: "Hybrid infrastructure, monitoring and hands-on support for the commercial & entertainment complex: corporate site, servers and operational stability.",
    },
    stack: ["Linux", "Servidores", "IT", "Windows", "Mac"],
    metric: {
      value: "40%",
      es: "mejora en eficiencia operativa",
      en: "improvement in operational efficiency",
    },
    url: "https://downtownpuntacana.com/",
    detail: {
      es: {
        context:
          "Downtown Punta Cana, uno de los principales espacios comerciales y de entretenimiento de la zona turística, requería presencia digital sólida y una estructura tecnológica capaz de acompañar su crecimiento comercial y operativo.",
        solution:
          "Desarrollo y soporte de la plataforma web corporativa mejorando presentación digital, navegación y organización de contenido. Soporte IT y acompañamiento en servidores, estabilidad operativa, administración tecnológica y soporte a usuarios internos. Gestión y soporte de redes sociales y plataformas vinculadas a la comunicación comercial.",
        results:
          "40% de mejora en eficiencia operativa — infraestructura estable en un entorno comercial dinámico donde la imagen digital impacta directamente la experiencia del visitante.",
      },
      en: {
        context:
          "Downtown Punta Cana, one of the main commercial and entertainment spaces in the tourist zone, required a solid digital presence and a technological structure able to support its commercial and operational growth.",
        solution:
          "Development and support of the corporate web platform improving digital presentation, navigation and content organization. IT support covering servers, operational stability, technology administration and internal user support. Management and support of social media and platforms tied to commercial communication.",
        results:
          "40% improvement in operational efficiency — stable infrastructure in a dynamic commercial environment where the digital image directly impacts the visitor experience.",
      },
    },
  },
  {
    slug: "cana-essence",
    name: "Cana Essence",
    image: "/projects/cana-essence.webp",
    tag: { es: "Desarrollo Web", en: "Web Development" },
    summary: {
      es: "Sitio web comercial para la marca — presencia digital y captación.",
      en: "Commercial website for the brand — digital presence and lead capture.",
    },
    stack: ["WordPress"],
    url: "https://canaessence.com/",
    detail: {
      es: {
        context:
          "Marca que necesitaba una presencia digital profesional para presentar sus productos y captar clientes.",
        solution:
          "Desarrollo de sitio web comercial en WordPress con estructura responsive, contenido de marca y formularios de contacto.",
      },
      en: {
        context:
          "Brand needing a professional digital presence to showcase its products and capture customers.",
        solution:
          "Commercial WordPress website with responsive structure, brand content and contact forms.",
      },
    },
  },
  {
    slug: "pool-tropic",
    name: "Pool Tropic — Las Iguanas",
    image: "/projects/pool-tropic.webp",
    tag: { es: "Desarrollo Web", en: "Web Development" },
    summary: {
      es: "Sitio web para el negocio de piscinas y exteriores.",
      en: "Website for the pools & exteriors business.",
    },
    stack: ["WordPress"],
    url: "https://pooltropiclasiguanas.com/",
    detail: {
      es: {
        context:
          "Negocio de piscinas y exteriores que necesitaba presencia web para mostrar trabajos y captar solicitudes.",
        solution:
          "Sitio web en WordPress con portafolio de proyectos, información de servicios y contacto directo.",
      },
      en: {
        context:
          "Pools and exteriors business needing a web presence to showcase work and capture requests.",
        solution:
          "WordPress website with a project portfolio, service information and direct contact.",
      },
    },
  },
  {
    slug: "captropic",
    name: "CapTropic",
    image: "/projects/captropic.webp",
    tag: { es: "Desarrollo Web", en: "Web Development" },
    summary: {
      es: "Sitio web comercial para el proyecto en Cap Cana.",
      en: "Commercial website for the Cap Cana project.",
    },
    stack: ["WordPress"],
    url: "https://captopic.com/",
    detail: {
      es: {
        context:
          "Proyecto en Cap Cana que requería una plataforma web para presentar la oferta y captar interesados.",
        solution:
          "Desarrollo web comercial con estructura de contenido orientada a la conversión y contacto.",
      },
      en: {
        context:
          "A Cap Cana project that required a web platform to present the offer and capture interested buyers.",
        solution:
          "Commercial web development with content structure oriented to conversion and contact.",
      },
    },
  },
  {
    slug: "ezepermits-app",
    name: "EZEPermits App",
    image: "/projects/ezepermits-app.png",
    tag: {
      es: "App web · gestión de permisos",
      en: "Web app · permit management",
    },
    summary: {
      es: "App web exclusiva para EZEPermits: gestión completa de permisos de construcción con CRM propio, pagos, seguridad y rendimiento.",
      en: "Exclusive web app for EZEPermits: full construction-permit management with its own CRM, payments, security and performance.",
    },
    stack: ["Web App", "CRM", "Pagos", "Database", "Seguridad"],
    url: "https://app.ezepermits.com/",
    detail: {
      es: {
        context:
          "EZEPermits gestiona permisos de construcción en el sur de Florida para homeowners y contractors. El negocio necesitaba algo más que una web informativa: una herramienta operativa real donde el equipo y sus clientes pudieran manejar todo el ciclo de vida de cada permiso.",
        solution:
          "Desarrollé una aplicación web exclusiva para el cliente: dashboard con todos los permisos de la compañía de un vistazo, filtros por estado, municipalidad, condado, expeditor, cliente y disciplina, y métricas en tiempo real — activos, sometidos, en revisión, correcciones, emitidos y fees pendientes. Incluye su propio CRM (clientes, expeditores, service providers), módulo de pagos con compensación de expeditors, manejo de inspecciones, solicitudes, fees, documentos y activity log. Bilingüe EN/ES con control de seguridad y usuarios por rol.",
        results:
          "Toda la operación de permisos corre sobre la app: estados, pagos, documentos y notificaciones centralizados con rendimiento y seguridad diseñados para uso diario en producción.",
      },
      en: {
        context:
          "EZEPermits manages construction permits in South Florida for homeowners and contractors. The business needed more than an informative website: a real operational tool where the team and its clients could handle the full lifecycle of every permit.",
        solution:
          "I built an exclusive web app for the client: a dashboard with every permit across the company at a glance, filters by status, municipality, county, expediter, client and discipline, plus real-time metrics — active, submitted, under review, corrections, issued and outstanding fees. It includes its own CRM (clients, expediters, service providers), a payments module with expediter compensation, inspections, requests, fees, documents and an activity log. Bilingual EN/ES with security and role-based user control.",
        results:
          "The entire permit operation runs on the app: statuses, payments, documents and notifications centralized with performance and security designed for daily production use.",
      },
    },
  },
  {
    slug: "ezepermits",
    name: "EZEPermits — Florida",
    image: "/projects/ezepermits.webp",
    tag: { es: "Desarrollo Web", en: "Web Development" },
    summary: {
      es: "Web para el servicio de gestión de permisos en Florida.",
      en: "Website for the Florida permits-management service.",
    },
    stack: ["WordPress"],
    url: "https://ezepermits.com/",
    detail: {
      es: {
        context:
          "Servicio de gestión de permisos en Florida que necesitaba una web clara para explicar el servicio y captar clientes.",
        solution:
          "Sitio web informativo en WordPress con estructura de servicios, proceso y formulario de contacto.",
      },
      en: {
        context:
          "Florida permits-management service needing a clear website to explain the service and capture clients.",
        solution:
          "Informative WordPress website with service structure, process and contact form.",
      },
    },
  },
];
