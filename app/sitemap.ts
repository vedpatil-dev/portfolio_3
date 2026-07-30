import { MetadataRoute } from "next";
import projectsData from "@/src/data/content/projects.json";

const SITE_URL = "https://vedpatil.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();

  const routes = ["", "/about", "/experience", "/projects", "/contact"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: buildDate,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const projectRoutes = projectsData.projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified:buildDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...projectRoutes];
}
