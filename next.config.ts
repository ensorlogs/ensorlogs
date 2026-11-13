import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  cacheComponents: false,
  partialPrefetching: false,
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      { source: "/stories", destination: "/logs", permanent: true },
      { source: "/en/stories", destination: "/en/logs", permanent: true },
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
