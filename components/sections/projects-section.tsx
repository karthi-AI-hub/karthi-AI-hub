"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ExternalLink, Github, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface Project {
  id: string
  slug: string
  title: string
  description: string
  image_url?: string
  tech_stack: string[]
  github_url?: string
  live_url?: string
  client_name?: string
  project_date?: string
}

interface ProjectsSectionProps {
  projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Featured Projects</h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-8" />
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            A showcase of my recent work across healthcare, fintech, enterprise, and logistics sectors.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={
                      project.image_url ||
                      `/placeholder.svg?height=200&width=400&query=${project.title} project screenshot`
                    }
                    alt={project.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-2">
                      {project.github_url && (
                        <Button size="sm" variant="secondary" asChild>
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      {project.live_url && (
                        <Button size="sm" variant="secondary" asChild>
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">{project.title}</CardTitle>
                  </div>

                  {project.client_name && (
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-2">
                      <User className="w-4 h-4 mr-1" />
                      {project.client_name}
                    </div>
                  )}

                  <CardDescription className="text-slate-600 dark:text-slate-300">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech_stack.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.tech_stack.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.tech_stack.length - 4} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/projects/${project.slug}`}>View Details</Link>
                    </Button>

                    <div className="flex gap-2">
                      {project.github_url && (
                        <Button size="sm" variant="ghost" asChild>
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      {project.live_url && (
                        <Button size="sm" variant="ghost" asChild>
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <Button size="lg" asChild>
            <Link href="/projects">View All Projects</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
