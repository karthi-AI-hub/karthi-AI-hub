"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github, Calendar, User, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface Project {
  id: string
  slug: string
  title: string
  description: string
  long_description?: string
  image_url?: string
  tech_stack: string[]
  github_url?: string
  live_url?: string
  client_name?: string
  project_date?: string
  category: string
}

interface ProjectDetailProps {
  project: Project
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/projects">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Project Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">{project.title}</h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-6">{project.description}</p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              {project.client_name && (
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <User className="w-4 h-4" />
                  <span>{project.client_name}</span>
                </div>
              )}
              {project.project_date && (
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(project.project_date)}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Tag className="w-4 h-4" />
                <Badge variant="outline" className="capitalize">
                  {project.category}
                </Badge>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {project.github_url && (
                <Button asChild>
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </a>
                </Button>
              )}
              {project.live_url && (
                <Button variant="outline" asChild>
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </motion.div>

          {/* Project Image */}
          {project.image_url && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={project.image_url || "/placeholder.svg"}
                  alt={project.title}
                  width={800}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Project Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                      {project.long_description ? (
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{project.long_description}</p>
                      ) : (
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{project.description}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tech Stack */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Technologies Used</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tech_stack.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Project Links */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Project Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {project.github_url && (
                      <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Source Code
                        </a>
                      </Button>
                    )}
                    {project.live_url && (
                      <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
