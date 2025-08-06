import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET() {
  const baseUrl = "https://karthi-nexgen.tech"

  // Get all project images
  const { data: projects } = await supabase
    .from("projects")
    .select("slug, image_url, gallery, title, description, updated_at")
    .eq("visible", true)

  const images: Array<{url: string, caption?: string, title?: string}> = []

  // Profile images
  images.push(
    {
      url: `${baseUrl}/android-chrome-512x512.png`,
      caption: "Karthi - Expert Flutter Developer & Mobile App Specialist",
      title: "Karthi NexGen Profile Photo"
    },
    {
      url: `${baseUrl}/me1.jpg`,
      caption: "Karthi - Professional Mobile Developer & React Expert",
      title: "Karthi NexGen Professional Photo"
    },
    {
      url: `${baseUrl}/me2.jpg`,
      caption: "Karthi NexGen Logo - Flutter Developer Brand",
      title: "Karthi NexGen Logo"
    }
  )

  // Project images
  if (projects) {
    for (const project of projects) {
      // Main project image
      if (project.image_url) {
        images.push({
          url: project.image_url.startsWith('http') 
            ? project.image_url 
            : `${baseUrl}${project.image_url}`,
          caption: `${project.title} - ${project.description}`,
          title: `${project.title} Project Screenshot`
        })
      }

      // Gallery images
      if (project.gallery && Array.isArray(project.gallery)) {
        project.gallery.forEach((galleryImage, index) => {
          if (typeof galleryImage === 'string') {
            images.push({
              url: galleryImage.startsWith('http') 
                ? galleryImage 
                : `${baseUrl}${galleryImage}`,
              caption: `${project.title} - Gallery Image ${index + 1}`,
              title: `${project.title} Project Gallery`
            })
          }
        })
      }
    }
  }

  // Generate XML sitemap
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${images.map(image => `
  <url>
    <loc>${baseUrl}</loc>
    <image:image>
      <image:loc>${image.url}</image:loc>
      ${image.title ? `<image:title>${image.title}</image:title>` : ''}
      ${image.caption ? `<image:caption>${image.caption}</image:caption>` : ''}
    </image:image>
  </url>`).join('')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}
