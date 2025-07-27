"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Reply, Archive, Trash2, Mail } from "lucide-react"

export default function MessagesPage() {
  // Demo messages data
  const messages = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      subject: "Project Inquiry - Mobile App Development",
      message: "Hi, I'm interested in developing a mobile app for my business. Could we discuss the requirements and timeline?",
      date: "2025-01-20",
      status: "unread",
      priority: "high"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      subject: "Collaboration Opportunity",
      message: "We have an exciting project opportunity and would like to collaborate with you. Please let me know your availability.",
      date: "2025-01-18",
      status: "read",
      priority: "medium"
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.wilson@startup.io",
      subject: "Thank You",
      message: "Thank you for the excellent work on our website. The client is very happy with the results!",
      date: "2025-01-15",
      status: "replied",
      priority: "low"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "read":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "replied":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Messages</h1>
          <p className="text-slate-600 dark:text-slate-300">Manage contact form submissions and inquiries</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Archive className="w-4 h-4 mr-2" />
            Archive All Read
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message.id} className={`hover:shadow-lg transition-shadow ${message.status === 'unread' ? 'border-l-4 border-l-purple-500' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{message.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {message.email}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge className={getPriorityColor(message.priority)}>
                    {message.priority}
                  </Badge>
                  <Badge className={getStatusColor(message.status)}>
                    {message.status}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 dark:text-white">{message.subject}</h3>
                <span className="text-sm text-slate-500 dark:text-slate-400">{message.date}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-300 line-clamp-3">
                  {message.message}
                </p>
                
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex items-center gap-2">
                    <Reply className="w-4 h-4" />
                    Reply
                  </Button>
                  <Button size="sm" variant="outline">
                    <Archive className="w-4 h-4 mr-1" />
                    Archive
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
