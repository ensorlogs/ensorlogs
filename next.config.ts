import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig: NextConfig = {
  cacheComponents: false,
  partialPrefetching: false,
  poweredByHeader: false,
  allowedDevOrigins: ["127.0.0.1"],
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|gif|ico|mp4|mp3|woff2)",
        headers: [
          ...securityHeaders,
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=2592000",
          },
        ],
      },
      { source: "/:path*", headers: securityHeaders },
    ];
  },
  async redirects() {
    const oldSite: [string, string][] = [
      ["/blog", "/logs"],
      ["/blog-2", "/logs"],
      ["/blogs-details", "/logs"],
      ["/services", "/"],
      ["/about", "/experiencia"],
      ["/credentials", "/experiencia"],
      ["/projects", "/proyectos"],
      ["/projects-details", "/proyectos"],
      ["/contact", "/"],
      ["/en/blog", "/en/logs"],
      ["/en/blog-2", "/en/logs"],
      ["/en/blogs-details", "/en/logs"],
      ["/en/services", "/en"],
      ["/en/about", "/en/experiencia"],
      ["/en/credentials", "/en/experiencia"],
      ["/en/projects", "/en/proyectos"],
      ["/en/projects-details", "/en/proyectos"],
      ["/en/contact", "/en"],
    ];
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.ensorlogs.com" }],
        destination: "https://ensorlogs.com/:path*",
        permanent: true,
      },
      { source: "/stories", destination: "/logs", permanent: true },
      { source: "/en/stories", destination: "/en/logs", permanent: true },
      ...oldSite.flatMap(([src, dest]) => [
        { source: src, destination: dest, permanent: true },
        { source: `${src}.html`, destination: dest, permanent: true },
      ]),
      { source: "/legal/:slug+", destination: "/legal", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withNextIntl(nextConfig);
