import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";
import { hasGallery } from "@/content/media";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<[string, number]> = [
    ["/", 1],
    ["/about", 0.8],
    ["/vision-mission", 0.7],
    ["/campus", 0.8],
    ["/student-life", 0.7],
    ["/admissions", 0.9],
    ["/contact", 0.8],
    ...(hasGallery ? ([["/gallery", 0.6]] as Array<[string, number]>) : []),
    ["/privacy", 0.2],
  ];
  const lastModified = new Date();
  return routes.map(([path, priority]) => ({ url: `${siteUrl}${path}`, lastModified, priority }));
}
