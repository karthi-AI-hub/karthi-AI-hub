"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Plus, Edit, Trash2, Globe, Smartphone, Code2 } from "lucide-react"

export default function ServicesPage() {
  // Demo services data
  const services = [
    {
      id: 1,
      title: "Web Development",
      description: "Full-stack web applications using modern technologies like React, Next.js, and Node.js",
      icon: Globe,
      price: "$2,000 - $10,000",
      duration: "2-8 weeks",
      technologies: ["React", "Next.js", "Node.js", "MongoDB"],
      featured: true,
      active: true
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Cross-platform mobile applications using Flutter with native performance",
      icon: Smartphone,
      price: "$3,000 - $15,000",
      duration: "4-12 weeks",
      technologies: ["Flutter", "Dart", "Firebase", "REST APIs"],
      featured: true,
      active: true
    },
    {
      id: 3,
      title: "UI/UX Design",
      description: "Modern and user-friendly interface design with responsive layouts",
      icon: Code2,
      price: "$500 - $2,000",
      duration: "1-3 weeks",
      technologies: ["Figma", "Adobe XD", "Tailwind CSS", "Framer Motion"],
      featured: false,
      active: true
    },
    {
      id: 4,
      title: "API Development",
      description: "RESTful and GraphQL APIs with proper documentation and testing",
      icon: Code2,
      price: "$1,000 - $5,000",
      duration: "1-4 weeks",
      technologies: ["Node.js", "Express", "GraphQL", "PostgreSQL"],
      featured: false,
      active: false
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Services</h1>
          <p className="text-slate-600 dark:text-slate-300">Manage your service offerings and pricing</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Service
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.id} className={`hover:shadow-lg transition-shadow ${!service.active ? 'opacity-60' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <service.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {service.description}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {service.featured && (
                    <Badge variant="secondary" className="text-xs">
                      Featured
                    </Badge>
                  )}
                  <Badge className={service.active ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'}>
                    {service.active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Price Range</span>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">{service.price}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Duration</span>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">{service.duration}</p>
                  </div>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Technologies:</span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {service.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className={`flex-1 ${service.active ? 'text-orange-600 hover:text-orange-700' : 'text-green-600 hover:text-green-700'}`}
                  >
                    {service.active ? 'Deactivate' : 'Activate'}
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
