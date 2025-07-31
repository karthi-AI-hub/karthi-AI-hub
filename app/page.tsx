import type { Metadata } from "next"
import { supabase } from "@/lib/supabase"
import { defaultMetadata, generateJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo"
import Navbar from "@/components/navigation/navbar"
import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import SkillsSection from "@/components/sections/skills-section"
import EducationSection from "@/components/sections/education-section"
import ExperienceSection from "@/components/sections/experience-section"
import InternshipsSection from "@/components/sections/internships-section"
import ProjectsSection from "@/components/sections/projects-section"
import ServicesSection from "@/components/sections/services-section"
import CertificatesSection from "@/components/sections/certificates-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import ResumeSection from "@/components/sections/resume-section"
import ContactSection from "@/components/sections/contact-section"

export const metadata: Metadata = defaultMetadata

async function getHomePageData() {
  const [
    { data: hero },
    { data: projects },
    { data: skills },
    { data: services },
    { data: education },
    { data: workExperience },
    { data: internships },
    { data: certificates },
    { data: testimonials },
  ] = await Promise.all([
    supabase.from("hero").select("*").single(),
    supabase
      .from("projects")
      .select("*")
      .eq("featured", true)
      .eq("visible", true)
      .order("created_at", { ascending: false }),
    supabase.from("skills").select("*").eq("visible", true).order("sort_order"),
    supabase.from("services").select("*").eq("visible", true).order("sort_order"),
    supabase.from("education").select("*").eq("visible", true).order("sort_order"),
    supabase.from("work_experience").select("*").eq("visible", true).order("sort_order"),
    supabase.from("internships").select("*").eq("visible", true).order("sort_order"),
    supabase.from("certificates").select("*").eq("visible", true).order("issue_date", { ascending: false }),
    supabase.from("testimonials").select("*").eq("visible", true).order("sort_order"),
  ])

  return {
    hero,
    projects: projects || [],
    skills: skills || [],
    services: services || [],
    education: education || [],
    workExperience: workExperience || [],
    internships: internships || [],
    certificates: certificates || [],
    testimonials: testimonials || [],
  }
}

export default async function HomePage() {
  const data = await getHomePageData()

  const personJsonLd = generateJsonLd("person")
  const portfolioJsonLd = generateJsonLd("portfolio")
  const resumeJsonLd = generateJsonLd("resume")

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "https://karthi-nexgen.tech" },
    { name: "Portfolio", url: "https://karthi-nexgen.tech#portfolio" },
  ])

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(resumeJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="relative">
        <Navbar />

        <main className="space-y-0 relative z-10">
          <HeroSection data={data.hero} />
          <AboutSection />
          <SkillsSection skills={data.skills} />
          <EducationSection education={data.education} />
          <ExperienceSection experience={data.workExperience} />
          <InternshipsSection internships={data.internships} />
          <ProjectsSection projects={data.projects} />
          <ServicesSection services={data.services} />
          <CertificatesSection certificates={data.certificates} />
          <TestimonialsSection testimonials={data.testimonials} />
          <ResumeSection />
          <ContactSection />
        </main>
      </div>
    </>
  )
}
