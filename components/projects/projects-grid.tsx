"use client"

import { useState } from "react"
import { motion } from "framer-motion"
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
  category: string
}

interface ProjectsGridProps {
  projects: Project[]
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [filteredProjects, setFilteredProjects] = useState(projects)

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProjects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="h-full hover:shadow-xl transition-shadow duration-300 group">
            <div className="relative overflow-hidden rounded-t-lg">
              <Image
                src={
                  project.image_url ||
                  `/placeholder.svg?height=200&width=400&query=${project.title || "/placeholder.svg"} project screenshot`
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
              <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
              {project.client_name && (
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                  <User className="w-4 h-4 mr-1" />
                  {project.client_name}
                </div>
              )}
              <CardDescription>{project.description}</CardDescription>
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

              <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                <Link href={`/projects/${project.slug}`}>View Details</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
