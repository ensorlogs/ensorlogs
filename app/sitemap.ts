import type { MetadataRoute } from "next";
import { getAllSlugs, getProjectSlugs } from "@/lib/data";

const BASE_URL = process.env.SITE_URL ?? "https://ensorlogs.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, projectSlugs] = await Promise.all([
    getAllSlugs(),
    getProjectSlugs(),
  ]);

  const staticRoutes = ["", "/logs", "/proyectos", "/experiencia", "/legal"];
  const entries: MetadataRoute.Sitemap = staticRoutes.flatMap((path) =>
    ["es", "en"].map((locale) => ({
      url: `${BASE_URL}${locale === "en" ? "/en" : ""}${path}`,
      lastModified: new Date(),
    }))
  );

  const postEntries: MetadataRoute.Sitemap = slugs.flatMap((slug) =>
    ["es", "en"].map((locale) => ({
      url: `${BASE_URL}${locale === "en" ? "/en" : ""}/logs/${slug}`,
      lastModified: new Date(),
    }))
  );

  const projectEntries: MetadataRoute.Sitemap = projectSlugs.flatMap((slug) =>
    ["es", "en"].map((locale) => ({
      url: `${BASE_URL}${locale === "en" ? "/en" : ""}/proyectos/${slug}`,
      lastModified: new Date(),
    }))
  );

  return [...entries, ...postEntries, ...projectEntries];
}
