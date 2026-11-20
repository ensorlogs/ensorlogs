import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Press_Start_2P, VT323 } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteLoader from "@/components/site/SiteLoader";
import ChatWidget from "@/components/site/ChatWidget";
import "../../globals.css";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const description = t("description");
  const title = t("title");
  return {
    metadataBase: new URL(process.env.SITE_URL ?? "https://ensorlogs.com"),
    title: {
      default: title,
      template: "%s — Ensor.Logs",
    },
    description,
    keywords: [
      "domótica Venezuela",
      "desarrollo web Venezuela",
      "apps Venezuela",
      "IA aplicada",
      "sistemas El Hatillo",
      "soporte IT Caracas",
      "cámaras seguridad",
      "redes hogar",
      "PropTech Punta Cana",
      "trabajo remoto EE.UU.",
      "automatización hogar",
      "Ensor",
      "ensorlogs",
    ],
    alternates: {
      languages: { es: "/", en: "/en" },
    },
    openGraph: {
      siteName: "Ensor.Logs",
      title,
      description,
      type: "website",
      images: [{ url: "/og-cover.jpg", width: 1200, height: 630, alt: title }],
      locale: locale === "en" ? "en_US" : "es_ES",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-cover.jpg"],
    },
    other: {
      "geo.region": "VE",
      "geo.placename": "El Hatillo, Caracas, Venezuela",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${pressStart.variable} ${vt323.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://ensorlogs.com/#ensor",
                  name: "Ensor",
                  url: "https://ensorlogs.com/",
                  image: "https://ensorlogs.com/ensor-avatar.png",
                  jobTitle:
                    locale === "en"
                      ? "Systems Engineer — AI & Web Development"
                      : "Ingeniero de Sistemas — IA y Desarrollo Web",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "El Hatillo",
                    addressRegion: "Caracas",
                    addressCountry: "VE",
                  },
                  sameAs: [
                    "https://github.com/ensorlogs",
                    "https://www.instagram.com/ensorlogs/",
                    "https://www.youtube.com/@ensorlogs",
                    "https://www.tiktok.com/@ensorlogs",
                    "https://linkedin.com/in/ensorlogs",
                  ],
                },
                {
                  "@type": "ProfessionalService",
                  "@id": "https://ensorlogs.com/#services",
                  name: "Ensor.Logs",
                  url: "https://ensorlogs.com/",
                  founder: { "@id": "https://ensorlogs.com/#ensor" },
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "El Hatillo",
                    addressRegion: "Caracas",
                    addressCountry: "VE",
                  },
                  areaServed: [
                    { "@type": "Country", name: "Venezuela" },
                    { "@type": "City", name: "Punta Cana" },
                    {
                      "@type": "Country",
                      name: "United States",
                      description: "remote work",
                    },
                  ],
                  serviceType: [
                    "Inteligencia Artificial aplicada a negocios",
                    "Desarrollo Web",
                    "Apps y sistemas a medida",
                    "Automatización de procesos con IA",
                    "Marketing digital",
                    "Domótica e IoT",
                    "Cámaras y Redes",
                    "Marketing Digital",
                  ],
                },
              ],
            }),
          }}
        />
        <NextIntlClientProvider>
          <SiteLoader />
          <Header />
          <main id="content" className="w-full flex-1">
            {children}
          </main>
          <Footer />
          <ChatWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
