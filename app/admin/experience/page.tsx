"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Plus, Edit, Trash2, Building, Calendar, MapPin } from "lucide-react"

export default function ExperiencePage() {
  // Demo experience data
  const experiences = [
    {
      id: 1,
      company: "TechCorp Solutions",
      position: "Senior Full Stack Developer",
      type: "Full-time",
      location: "San Francisco, CA",
      startDate: "2023-01",
      endDate: "Present",
      current: true,
      description: "Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and architecting microservices solutions.",
      technologies: ["React", "Node.js", "AWS", "MongoDB", "TypeScript"],
      achievements: [
        "Improved application performance by 40%",
        "Led team of 5 developers",
        "Implemented CI/CD pipelines"
      ]
    },
    {
      id: 2,
      company: "StartupHub Inc.",
      position: "Full Stack Developer",
      type: "Full-time",
      location: "Austin, TX",
      startDate: "2021-06",
      endDate: "2022-12",
      current: false,
      description: "Developed and maintained multiple client projects using modern web technologies. Collaborated with design team to implement pixel-perfect UIs.",
      technologies: ["Vue.js", "Express.js", "PostgreSQL", "Docker"],
      achievements: [
        "Delivered 15+ client projects",
        "Reduced bug reports by 60%",
        "Implemented automated testing"
      ]
    },
    {
      id: 3,
      company: "Freelance",
      position: "Mobile App Developer",
      type: "Freelance",
      location: "Remote",
      startDate: "2020-01",
      endDate: "2021-05",
      current: false,
      description: "Specialized in Flutter mobile app development for various clients across different industries including e-commerce, healthcare, and education.",
      technologies: ["Flutter", "Dart", "Firebase", "REST APIs"],
      achievements: [
        "Developed 10+ mobile applications",
        "Achieved 4.8+ app store ratings",
        "Built strong client relationships"
      ]
    }
  ]

  const formatDate = (dateString: string) => {
    if (dateString === "Present") return "Present"
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "full-time":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "part-time":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "freelance":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
      case "contract":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Experience</h1>
          <p className="text-slate-600 dark:text-slate-300">Manage your work experience and career history</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>
      </div>

      <div className="space-y-6">
        {experiences.map((experience, index) => (
          <Card key={experience.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Building className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{experience.position}</CardTitle>
                    <CardDescription className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                      {experience.company}
                    </CardDescription>
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {experience.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className={getTypeColor(experience.type)}>
                    {experience.type}
                  </Badge>
                  {experience.current && (
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      Current
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-300">
                  {experience.description}
                </p>
                
                <div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Technologies:</span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {experience.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Key Achievements:</span>
                  <ul className="mt-2 space-y-1">
                    {experience.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
