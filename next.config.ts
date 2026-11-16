import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

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
];

const nextConfig: NextConfig = {
  cacheComponents: false,
  partialPrefetching: false,
  poweredByHeader: false,
  allowedDevOrigins: ["127.0.0.1"],
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
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
