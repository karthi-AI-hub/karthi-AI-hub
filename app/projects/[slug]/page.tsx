import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { generateProjectMetadata, generateJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo"
import ProjectDetail from "@/components/projects/project-detail"
import Navbar from "@/components/navigation/navbar"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

async function getProject(slug: string) {
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("visible", true)
    .single()

  if (error || !project) {
    return null
  }

  return project
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProject(params.slug)

  if (!project) {
    return {
      title: "Project Not Found | Karthi–NexGen",
      description: "The requested project could not be found.",
    }
  }

  return generateProjectMetadata(project)
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProject(params.slug)

  if (!project) {
    notFound()
  }

  const projectJsonLd = generateJsonLd("project", project)

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "https://karthi-nexgen.vercel.app" },
    { name: "Projects", url: "https://karthi-nexgen.vercel.app/projects" },
    { name: project.title, url: `https://karthi-nexgen.vercel.app/projects/${project.slug}` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/20">
        <Navbar />
        <ProjectDetail project={project} />
      </div>
    </>
  )
}
