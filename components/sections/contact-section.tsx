"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase-client"

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase.from("contact_messages").insert([formData])

      if (error) throw error

      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      })

      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Let's Work Together</h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-8" />
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Ready to collaborate on your next project? Whether it's a mobile app, web application, or AI/ML solution, let's discuss how I can help bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">Get In Touch</CardTitle>
                <CardDescription className="text-base">
                  I'm always open to discussing new opportunities and interesting projects.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pb-6">
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg flex-shrink-0">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Email</h3>
                    <p className="text-slate-600 dark:text-slate-300 break-all">me@karthi-nexgen.tech</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg flex-shrink-0">
                    <Phone className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Phone</h3>
                    <p className="text-slate-600 dark:text-slate-300">+91 9688976383</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg flex-shrink-0">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Location</h3>
                    <p className="text-slate-600 dark:text-slate-300">Tamil Nadu, India</p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Follow Me</h3>
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="hover:bg-purple-50 hover:border-purple-300 dark:hover:bg-purple-900/20"
                      asChild
                    >
                      <a 
                        href="https://github.com/karthi-AI-hub" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="Visit GitHub Profile"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="hover:bg-purple-50 hover:border-purple-300 dark:hover:bg-purple-900/20"
                      asChild
                    >
                      <a 
                        href="https://linkedin.com/in/k4rthi" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="Visit LinkedIn Profile"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Availability Status */}
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
                    <span className="font-semibold text-green-800 dark:text-green-300">Available for new projects</span>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Currently accepting freelance work and consulting opportunities
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">Send Message</CardTitle>
                <CardDescription className="text-base">Fill out the form below and I'll get back to you within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Textarea
                      name="message"
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
