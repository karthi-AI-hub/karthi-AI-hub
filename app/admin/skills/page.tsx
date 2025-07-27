"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Award, Plus, Edit, Trash2, Code, Palette, Database } from "lucide-react"

export default function SkillsPage() {
  // Demo skills data
  const skillCategories = [
    {
      id: 1,
      name: "Programming Languages",
      icon: Code,
      skills: [
        { name: "JavaScript", level: 95, experience: "5+ years" },
        { name: "TypeScript", level: 90, experience: "3+ years" },
        { name: "Python", level: 85, experience: "4+ years" },
        { name: "Java", level: 80, experience: "3+ years" },
        { name: "Dart", level: 88, experience: "2+ years" }
      ]
    },
    {
      id: 2,
      name: "Frontend Development",
      icon: Palette,
      skills: [
        { name: "React", level: 95, experience: "4+ years" },
        { name: "Next.js", level: 90, experience: "3+ years" },
        { name: "Flutter", level: 92, experience: "2+ years" },
        { name: "Vue.js", level: 75, experience: "2+ years" },
        { name: "Tailwind CSS", level: 95, experience: "3+ years" }
      ]
    },
    {
      id: 3,
      name: "Backend & Database",
      icon: Database,
      skills: [
        { name: "Node.js", level: 90, experience: "4+ years" },
        { name: "Express.js", level: 88, experience: "3+ years" },
        { name: "MongoDB", level: 85, experience: "3+ years" },
        { name: "PostgreSQL", level: 80, experience: "2+ years" },
        { name: "Firebase", level: 90, experience: "3+ years" }
      ]
    }
  ]

  const getLevelColor = (level: number) => {
    if (level >= 90) return "bg-green-500"
    if (level >= 75) return "bg-blue-500"
    if (level >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getLevelText = (level: number) => {
    if (level >= 90) return "Expert"
    if (level >= 75) return "Advanced"
    if (level >= 60) return "Intermediate"
    return "Beginner"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Skills</h1>
          <p className="text-slate-600 dark:text-slate-300">Manage your technical skills and expertise</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Skill
        </Button>
      </div>

      <div className="grid gap-6">
        {skillCategories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <category.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                    <CardDescription>{category.skills.length} skills</CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit Category
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-slate-900 dark:text-white">
                          {skill.name}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {skill.experience}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${
                          skill.level >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                          skill.level >= 75 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                          skill.level >= 60 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {getLevelText(skill.level)}
                        </Badge>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                          {skill.level}%
                        </span>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
