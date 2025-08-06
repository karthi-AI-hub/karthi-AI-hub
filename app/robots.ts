import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/", "/private/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: [
          "/favicon.ico",
          "/android-chrome-192x192.png", 
          "/android-chrome-512x512.png",
          "/apple-touch-icon.png"
        ],
      },
    ],
    sitemap: "https://karthi-nexgen.tech/sitemap.xml",
    host: "https://karthi-nexgen.tech",
  }
}
