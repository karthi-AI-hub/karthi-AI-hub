"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const categories = ["All", "Web", "Mobile", "Enterprise", "Healthcare", "Fintech"]
const technologies = ["React", "Flutter", "Node.js", "Python", "PostgreSQL", "AWS"]

export default function ProjectsSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTech, setSelectedTech] = useState<string[]>([])

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Technology Tags */}
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <Badge
            key={tech}
            variant={selectedTech.includes(tech) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => {
              setSelectedTech((prev) => (prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]))
            }}
          >
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  )
}
