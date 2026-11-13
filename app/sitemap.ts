import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/data";
import { projects } from "@/data/projects";

const BASE_URL = process.env.SITE_URL ?? "https://ensorlogs.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs();

  const staticRoutes = ["", "/logs", "/proyectos", "/legal"];
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

  const projectEntries: MetadataRoute.Sitemap = projects.flatMap((p) =>
    ["es", "en"].map((locale) => ({
      url: `${BASE_URL}${locale === "en" ? "/en" : ""}/proyectos/${p.slug}`,
      lastModified: new Date(),
    }))
  );

  return [...entries, ...postEntries, ...projectEntries];
}
