"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase-client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FolderOpen, MessageSquare, Award, Briefcase, Eye, Mail } from "lucide-react"

interface DashboardStats {
  projects: number
  messages: number
  certificates: number
  services: number
  recentMessages: any[]
  featuredProjects: any[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    messages: 0,
    certificates: 0,
    services: 0,
    recentMessages: [],
    featuredProjects: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          { count: projectsCount },
          { count: messagesCount },
          { count: certificatesCount },
          { count: servicesCount },
          { data: recentMessages },
          { data: featuredProjects },
        ] = await Promise.all([
          supabase.from("projects").select("*", { count: "exact", head: true }),
          supabase.from("contact_messages").select("*", { count: "exact", head: true }),
          supabase.from("certificates").select("*", { count: "exact", head: true }),
          supabase.from("services").select("*", { count: "exact", head: true }),
          supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(5),
          supabase.from("projects").select("*").eq("featured", true).limit(3),
        ])

        setStats({
          projects: projectsCount || 0,
          messages: messagesCount || 0,
          certificates: certificatesCount || 0,
          services: servicesCount || 0,
          recentMessages: recentMessages || [],
          featuredProjects: featuredProjects || [],
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-300">Welcome to your admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.projects}</div>
            <p className="text-xs text-muted-foreground">Portfolio projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.messages}</div>
            <p className="text-xs text-muted-foreground">Contact inquiries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.certificates}</div>
            <p className="text-xs text-muted-foreground">Professional certifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Services</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.services}</div>
            <p className="text-xs text-muted-foreground">Service offerings</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Recent Messages
            </CardTitle>
            <CardDescription>Latest contact form submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentMessages.length > 0 ? (
                stats.recentMessages.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{message.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{message.email}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">{message.message}</p>
                    </div>
                    <Badge variant={message.status === "unread" ? "default" : "secondary"}>{message.status}</Badge>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 dark:text-slate-400 text-center py-4">No messages yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Featured Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Featured Projects
            </CardTitle>
            <CardDescription>Currently featured on homepage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.featuredProjects.length > 0 ? (
                stats.featuredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{project.title}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.tech_stack.slice(0, 3).map((tech: string) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 dark:text-slate-400 text-center py-4">No featured projects</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
