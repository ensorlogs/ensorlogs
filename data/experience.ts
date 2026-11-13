export type Job = {
  company: string;
  role: { es: string; en: string };
  period: string;
  place: { es: string; en: string };
  desc: { es: string; en: string };
  url?: string;
};

export type EventItem = {
  name: string;
  desc: { es: string; en: string };
};

export type Education = {
  school: string;
  title: { es: string; en: string };
  period: string;
  desc: { es: string; en: string };
  url?: string;
};

export const jobs: Job[] = [
  {
    company: "APYCA Developers",
    role: { es: "Operaciones IT y PropTech", en: "IT Operations & PropTech" },
    period: "2022 — Actualidad",
    place: { es: "Punta Cana", en: "Punta Cana" },
    desc: {
      es: "Liderazgo del ecosistema tecnológico: web, CRM, automatización, infraestructura y analítica. Mejora operativa documentada de hasta un 70% en procesos internos.",
      en: "Technology ecosystem lead: web, CRM, automation, infrastructure and analytics. Documented operational improvement of up to 70% in internal processes.",
    },
    url: "https://apyca.com",
  },
  {
    company: "Grupo Snap Publicidad",
    role: {
      es: "Tecnología y Operaciones Digitales",
      en: "Technology & Digital Operations",
    },
    period: "2021 — 2024",
    place: { es: "Punta Cana", en: "Punta Cana" },
    desc: {
      es: "Implementación de sistemas de automatización, CRM y gestión digital para campañas y operaciones comerciales. Diseño de flujos de captación de leads que aumentaron la eficiencia operativa.",
      en: "Implemented automation systems, CRM and digital management for campaigns and commercial operations. Designed lead-capture flows that increased operational efficiency.",
    },
    url: "https://gruposna.com",
  },
  {
    company: "Downtown Punta Cana",
    role: {
      es: "Administrador de Sistemas y Operaciones IT",
      en: "Systems Administrator & IT Operations",
    },
    period: "2017 — 2021",
    place: { es: "Punta Cana", en: "Punta Cana" },
    desc: {
      es: "Administración de infraestructura tecnológica, servidores, redes y soporte IT en entorno turístico e inmobiliario. Gestión de plataformas web y optimización de operaciones digitales.",
      en: "Managed technology infrastructure, servers, networking and IT support in a tourism & real estate environment. Ran web platforms and optimized digital operations.",
    },
    url: "https://downtownpuntacana.com",
  },
  {
    company: "I24 web",
    role: {
      es: "Soporte y desarrollador WordPress · Ads",
      en: "Support & WordPress developer · Ads",
    },
    period: "2012 — 2014",
    place: { es: "Venezuela", en: "Venezuela" },
    desc: {
      es: "Soporte técnico y desarrollo en WordPress, mantenimiento de sitios y entornos web, junto con gestión y optimización de campañas de publicidad digital.",
      en: "Technical support and WordPress development, site maintenance, plus management and optimization of digital ad campaigns.",
    },
    url: "https://instagram.com/i24web",
  },
  {
    company: "PDVSA",
    role: { es: "Soporte IT", en: "IT Support" },
    period: "2012 — 2014",
    place: { es: "Venezuela", en: "Venezuela" },
    desc: {
      es: "Soporte técnico y mantenimiento de sistemas en entorno corporativo: instalación, configuración y resolución eficiente de incidencias.",
      en: "Technical support and systems maintenance in a corporate environment: installation, configuration and efficient incident resolution.",
    },
  },
];

export const events: EventItem[] = [
  {
    name: "Ponencia Ubuntu Venezuela",
    desc: {
      es: "Charla ante estudiantes sobre Ubuntu y software libre representando a Ubuntu-ve: filosofía del proyecto, Linux cotidiano y por qué importa el software libre en educación y trabajo.",
      en: "Talk for students about Ubuntu and free software representing Ubuntu-ve: project philosophy, everyday Linux and why free software matters in education and work.",
    },
  },
  {
    name: "LibreOffice Comunidad Venezuela",
    desc: {
      es: "Ponencia en encuentro regional: suite ofimática libre, difusión del Día del Documento Libre y voluntariado alrededor del software libre.",
      en: "Talk at a regional meetup: the free office suite, Document Freedom Day outreach and volunteering around free software.",
    },
  },
  {
    name: "FLISOL",
    desc: {
      es: "Festival Latinoamericano de Instalación de Software Libre: difusión y talleres abiertos al público.",
      en: "Latin American Free Software Installation Festival: outreach and open workshops for the public.",
    },
  },
  {
    name: "Software Freedom Day",
    desc: {
      es: "Jornada global de difusión del software libre: mesa de instalación y acompañamiento a nuevos usuarios junto a Ubuntu Venezuela y LibreOffice.",
      en: "Global free-software outreach day: install booth and onboarding for new users alongside Ubuntu Venezuela and LibreOffice.",
    },
  },
  {
    name: "WordCamp Madrid",
    desc: {
      es: "Participación en la WordCamp: charlas, talleres y encuentro con la comunidad WordPress en un fin de semana de aprendizaje y networking.",
      en: "Attended WordCamp Madrid: talks, workshops and meeting the WordPress community over a weekend of learning and networking.",
    },
  },
  {
    name: "Taller de WordPress",
    desc: {
      es: "Sesión práctica en aula: WordPress como herramienta abierta para publicar en la web, acompañando a equipos y estudiantes.",
      en: "Hands-on classroom session: WordPress as an open tool for publishing on the web, guiding teams and students.",
    },
  },
  {
    name: "Docencia universitaria — Bases de datos",
    desc: {
      es: "Clases de bases de datos en aula universitaria: docencia presencial, práctica guiada y acompañamiento a estudiantes.",
      en: "University database classes: in-person teaching, guided practice and student mentoring.",
    },
  },
  {
    name: "Curso de WordPress",
    desc: {
      es: "Curso práctico en aula: publicar en la web con WordPress, buenas prácticas y acompañamiento a equipos y estudiantes.",
      en: "Practical classroom course: publishing on the web with WordPress, best practices and guidance for teams and students.",
    },
  },
  {
    name: "Curso de Linux",
    desc: {
      es: "Curso práctico en aula: administración, terminal y buenas prácticas en entornos Linux.",
      en: "Practical classroom course: administration, terminal and best practices in Linux environments.",
    },
  },
  {
    name: "Fedora & Mozilla",
    desc: {
      es: "Participación junto a la comunidad Linux y cultura de contribución upstream.",
      en: "Participation alongside the Linux community and upstream contribution culture.",
    },
  },
  {
    name: "Ubuntu Loco",
    desc: {
      es: "Encuentro local de usuarios: compartir experiencias y fortalecer la comunidad.",
      en: "Local user meetup: sharing experiences and strengthening the community.",
    },
  },
];

export const education: Education[] = [
  {
    school: "Ingeniería en Sistemas",
    title: {
      es: "Base técnica en sistemas, servidores y desarrollo web",
      en: "Technical foundation in systems, servers and web development",
    },
    period: "Graduado 2013 — Venezuela",
    desc: {
      es: "Especialización aplicada en infraestructura IT, automatización, analítica y transformación digital para operaciones de negocio.",
      en: "Applied specialization in IT infrastructure, automation, analytics and digital transformation for business operations.",
    },
  },
  {
    school: "CCubik Venezuela",
    title: {
      es: "Cofundador · Instructor y desarrollador",
      en: "Co-founder · Instructor and developer",
    },
    period: "2013 — 2016",
    desc: {
      es: "Academia y empresa de desarrollo cofundada en 2013. Formación y participación activa en comunidades tecnológicas (Ubuntu, Mozilla, Fedora) orientadas a sistemas y desarrollo web.",
      en: "Academy and development company co-founded in 2013. Training and active participation in tech communities (Ubuntu, Mozilla, Fedora) around systems and web development.",
    },
    url: "https://instagram.com/ccubik",
  },
  {
    school: "Coursera — Programas Google",
    title: {
      es: "Formación y especialización en línea",
      en: "Online training and specialization",
    },
    period: "Certificados",
    desc: {
      es: "Programas certificados por Google en análisis de datos y visualización, SQL, herramientas de productividad en la nube, fundamentos de cloud y competencias digitales aplicadas a IT.",
      en: "Google-certified programs in data analysis and visualization, SQL, cloud productivity tools, cloud fundamentals and digital skills applied to IT.",
    },
  },
  {
    school: "Soy IT Pro (Jgaitpro)",
    title: {
      es: "Infraestructura Microsoft y entornos empresariales",
      en: "Microsoft infrastructure & enterprise environments",
    },
    period: "Certificaciones",
    desc: {
      es: "Microsoft 365, Azure (incl. App Services), Docker y contenedores, Hyper-V, Windows Server, PowerShell, administración de endpoints y entornos empresariales.",
      en: "Microsoft 365, Azure (incl. App Services), Docker and containers, Hyper-V, Windows Server, PowerShell, endpoint administration and enterprise environments.",
    },
  },
  {
    school: "Alexertech",
    title: {
      es: "Desarrollo web y ciberseguridad",
      en: "Web development & cybersecurity",
    },
    period: "Módulos",
    desc: {
      es: "Fundamentos y nivel avanzado en HTML, CSS, JavaScript y PHP; seguridad informática (esencial, defensivo y ofensivo) y automatización orientada a desarrollo web.",
      en: "Fundamentals and advanced level in HTML, CSS, JavaScript and PHP; cybersecurity (essential, defensive and offensive) and web-oriented automation.",
    },
  },
  {
    school: "Platzi & EDteam",
    title: {
      es: "Desarrollo web, DevOps y negocios digitales",
      en: "Web development, DevOps & digital business",
    },
    period: "Rutas de aprendizaje",
    desc: {
      es: "Formación continua en desarrollo web, DevOps y herramientas digitales, con proyectos guiados y enfoque en lo que se usa en equipos de producto.",
      en: "Ongoing training in web development, DevOps and digital tools, with guided projects focused on what product teams actually use.",
    },
  },
];
