"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Plus, Edit, Trash2, Calendar, MapPin, Award } from "lucide-react"

export default function EducationPage() {
  // Demo education data
  const education = [
    {
      id: 1,
      institution: "Stanford University",
      degree: "Master of Science",
      field: "Computer Science",
      location: "Stanford, CA",
      startDate: "2019-09",
      endDate: "2021-06",
      gpa: "3.8/4.0",
      status: "completed",
      description: "Specialized in Machine Learning and Distributed Systems. Completed thesis on 'Scalable Microservices Architecture for Real-time Data Processing'.",
      courses: ["Advanced Algorithms", "Machine Learning", "Distributed Systems", "Database Systems"],
      achievements: [
        "Dean's List for 3 consecutive semesters",
        "Graduate Research Assistant",
        "Published 2 research papers"
      ]
    },
    {
      id: 2,
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Software Engineering",
      location: "Berkeley, CA",
      startDate: "2015-09",
      endDate: "2019-05",
      gpa: "3.6/4.0",
      status: "completed",
      description: "Comprehensive program covering software development, data structures, algorithms, and system design. Active member of Computer Science Student Association.",
      courses: ["Data Structures", "Algorithms", "Software Engineering", "Computer Networks"],
      achievements: [
        "Magna Cum Laude",
        "CS Student Association President",
        "Hackathon Winner (2018, 2019)"
      ]
    },
    {
      id: 3,
      institution: "Coursera / Google",
      degree: "Professional Certificate",
      field: "Cloud Architecture",
      location: "Online",
      startDate: "2022-01",
      endDate: "2022-06",
      gpa: null,
      status: "completed",
      description: "Comprehensive training in Google Cloud Platform services, cloud architecture design patterns, and DevOps practices.",
      courses: ["Cloud Infrastructure", "Kubernetes", "DevOps", "Security"],
      achievements: [
        "Google Cloud Certified Professional",
        "Top 5% completion rate",
        "Capstone project recognized"
      ]
    }
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "paused":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  const getDegreeColor = (degree: string) => {
    if (degree.toLowerCase().includes("master")) {
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
    } else if (degree.toLowerCase().includes("bachelor")) {
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
    } else if (degree.toLowerCase().includes("certificate")) {
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
    }
    return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Education</h1>
          <p className="text-slate-600 dark:text-slate-300">Manage your educational background and qualifications</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      </div>

      <div className="space-y-6">
        {education.map((edu) => (
          <Card key={edu.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{edu.degree} in {edu.field}</CardTitle>
                    <CardDescription className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                      {edu.institution}
                    </CardDescription>
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {edu.location}
                      </div>
                      {edu.gpa && (
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          GPA: {edu.gpa}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className={getDegreeColor(edu.degree)}>
                    {edu.degree.split(' ')[0]}
                  </Badge>
                  <Badge className={getStatusColor(edu.status)}>
                    {edu.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-300">
                  {edu.description}
                </p>
                
                <div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Key Courses:</span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {edu.courses.map((course) => (
                      <Badge key={course} variant="outline" className="text-xs">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Achievements & Recognition:</span>
                  <ul className="mt-2 space-y-1">
                    {edu.achievements.map((achievement, i) => (
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
