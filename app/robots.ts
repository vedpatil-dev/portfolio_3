import { MetadataRoute } from "next";

const SITE_URL = "https://vedpatil.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/", "/static/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
