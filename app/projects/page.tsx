import type { Metadata } from "next"
import { supabase } from "@/lib/supabase"
import { generatePageMetadata, generateJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo"
import ProjectsGrid from "@/components/projects/projects-grid"
import ProjectsSearch from "@/components/projects/projects-search"
import Navbar from "@/components/navigation/navbar"

export const metadata: Metadata = generatePageMetadata("projects")

async function getProjects() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .eq("visible", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching projects:", error)
    return []
  }

  return projects || []
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "https://karthi-nexgen.vercel.app" },
    { name: "Projects", url: "https://karthi-nexgen.vercel.app/projects" },
  ])

  const portfolioJsonLd = generateJsonLd("portfolio")

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd) }} />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/20">
        <Navbar />

        <div className="container mx-auto px-4 py-32">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 dark:from-white dark:via-purple-300 dark:to-white bg-clip-text text-transparent">
                Premium Projects Portfolio
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-8 rounded-full" />
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              A comprehensive showcase of my development work across various industries and cutting-edge technologies.
            </p>
          </div>

          <ProjectsSearch />
          <ProjectsGrid projects={projects} />
        </div>
      </div>
    </>
  )
}
