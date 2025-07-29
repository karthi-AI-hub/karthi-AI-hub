"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MessageSquare, Reply, Archive, Trash2, Mail, Loader2 } from "lucide-react"
import { messagesService, Message, isSupabaseConfigured } from "@/lib/supabase-service"
import { useToast } from "@/hooks/use-toast"

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    setLoading(true)
    try {
      if (!isSupabaseConfigured()) {
        // Demo data for when Supabase is not configured
        setMessages([
          {
            id: "1",
            name: "John Smith",
            email: "john.smith@example.com",
            subject: "Project Inquiry - Mobile App Development",
            message: "Hi, I'm interested in developing a mobile app for my business. Could we discuss the requirements and timeline?",
            status: "unread",
            priority: "high",
            created_at: "2025-01-20T10:00:00Z"
          },
          {
            id: "2",
            name: "Sarah Johnson",
            email: "sarah.j@company.com",
            subject: "Collaboration Opportunity",
            message: "We have an exciting project opportunity and would like to collaborate with you. Please let me know your availability.",
            status: "read",
            priority: "medium",
            created_at: "2025-01-18T14:30:00Z"
          }
        ])
      } else {
        const data = await messagesService.getAll()
        setMessages(data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id: string, status: Message['status']) => {
    try {
      if (!isSupabaseConfigured()) {
        toast({
          title: "Demo Mode",
          description: "Supabase not configured. This is a demo.",
          variant: "default"
        })
        return
      }

      const success = await messagesService.updateStatus(id, status)
      if (success) {
        await loadMessages()
        toast({
          title: "Success",
          description: `Message marked as ${status}`
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update message status",
        variant: "destructive"
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return

    try {
      if (!isSupabaseConfigured()) {
        toast({
          title: "Demo Mode",
          description: "Supabase not configured. This is a demo.",
          variant: "default"
        })
        return
      }

      const success = await messagesService.delete(id)
      if (success) {
        await loadMessages()
        toast({
          title: "Success",
          description: "Message deleted successfully"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive"
      })
    }
  }

  const handleReply = (message: Message) => {
    setSelectedMessage(message)
    setIsReplyDialogOpen(true)
    // Mark as read when opening reply
    if (message.status === 'unread') {
      handleStatusUpdate(message.id!, 'read')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Messages</h1>
          <p className="text-slate-600 dark:text-slate-300">Manage contact form submissions and inquiries</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => {
            const readMessages = messages.filter(m => m.status === 'read')
            readMessages.forEach(m => handleStatusUpdate(m.id!, 'replied'))
          }}>
            <Archive className="w-4 h-4 mr-2" />
            Mark Read as Replied
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
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {formatDate(message.created_at || '')}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-300 line-clamp-3">
                  {message.message}
                </p>
                
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex items-center gap-2" onClick={() => handleReply(message)}>
                    <Reply className="w-4 h-4" />
                    Reply
                  </Button>
                  {message.status === 'unread' && (
                    <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(message.id!, 'read')}>
                      Mark as Read
                    </Button>
                  )}
                  {message.status === 'read' && (
                    <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(message.id!, 'replied')}>
                      <Archive className="w-4 h-4 mr-1" />
                      Mark as Replied
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700" onClick={() => handleDelete(message.id!)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reply Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reply to {selectedMessage?.name}</DialogTitle>
            <DialogDescription>
              Compose your reply to this message
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <h4 className="font-semibold mb-2">Original Message:</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">{selectedMessage?.message}</p>
            </div>
            <div>
              <label htmlFor="reply" className="block text-sm font-medium mb-2">
                Your Reply:
              </label>
              <textarea
                id="reply"
                rows={6}
                className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
                placeholder="Type your reply here..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReplyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              // Here you would typically send the email
              toast({
                title: "Email Sent",
                description: "Your reply has been sent successfully"
              })
              setIsReplyDialogOpen(false)
              if (selectedMessage) {
                handleStatusUpdate(selectedMessage.id!, 'replied')
              }
            }}>
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
