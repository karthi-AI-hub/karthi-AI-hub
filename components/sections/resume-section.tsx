"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { Download, Eye, ZoomIn, ZoomOut, FileText, Star, Award, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ResumeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [zoom, setZoom] = useState(100)
  const [resumeExists, setResumeExists] = useState(false)

  // Check if resume exists on component mount
  useEffect(() => {
    fetch("/resume.pdf", { method: 'HEAD' })
      .then(response => {
        setResumeExists(response.ok)
      })
      .catch(() => {
        setResumeExists(false)
      })
  }, [])

  const handleDownload = () => {
    const resumeUrl = "/resume.pdf"
    
    // Check if resume exists before attempting download
    fetch(resumeUrl, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          const link = document.createElement("a")
          link.href = resumeUrl
          link.download = "Karthikeyan_S_Resume.pdf"
          link.click()
        } else {
          alert("Resume is currently being updated. Please check back later or contact me directly.")
        }
      })
      .catch(() => {
        alert("Resume is currently being updated. Please check back later or contact me directly.")
      })
  }

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50))

  return (
    <section
      id="resume"
      className="py-20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium">
              <FileText className="inline w-4 h-4 mr-2" />
              Professional Resume
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 dark:from-white dark:via-purple-300 dark:to-white bg-clip-text text-transparent">
              Download My Resume
            </span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-8 rounded-full" />

          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Get a comprehensive overview of my professional experience, skills, and achievements.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Resume Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                    Resume Preview
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleZoomOut}
                      disabled={zoom <= 50}
                      data-cursor="pointer"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <Badge variant="outline">{zoom}%</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleZoomIn}
                      disabled={zoom >= 200}
                      data-cursor="pointer"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button asChild variant="outline" size="sm" data-cursor="pointer">
                      <Link href="/resume">
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-inner">
                  <div
                    className="transition-transform duration-300"
                    style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top left" }}
                  >
                    {resumeExists ? (
                      <iframe
                        src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
                        className="w-full h-96 border-0"
                        title="Resume Preview"
                      />
                    ) : (
                      <div className="w-full h-96 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600">
                        <AlertCircle className="w-12 h-12 text-slate-400 mb-4" />
                        <p className="text-slate-600 dark:text-slate-400 text-center">
                          Resume is currently being updated
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                          Please check back later or contact me directly
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Resume Info & Actions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Download Card */}
            <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-green-600" />
                  Download Resume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Get the latest version of my professional resume in PDF format.
                </p>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleDownload}
                    disabled={!resumeExists}
                    data-cursor="pointer"
                    className={`w-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
                      resumeExists 
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white" 
                        : "bg-gray-400 cursor-not-allowed text-gray-600"
                    }`}
                  >
                    <Download className="mr-2 w-4 h-4" />
                    {resumeExists ? "Download PDF" : "Resume Unavailable"}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>

            {/* Resume Highlights */}
            {/* <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  Resume Highlights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { icon: "🎓", title: "Education", desc: "B.Tech Computer Science (8.5 CGPA)" },
                  { icon: "💼", title: "Experience", desc: "3+ Years Professional Development" },
                  { icon: "🏆", title: "Projects", desc: "20+ Successful Projects Delivered" },
                  { icon: "🛠️", title: "Skills", desc: "15+ Technologies Mastered" },
                  { icon: "📱", title: "Mobile Apps", desc: "5+ Apps Published" },
                  { icon: "☁️", title: "Cloud", desc: "AWS & GCP Certified" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    data-cursor="pointer"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card> */}

            {/* Contact CTA */}
            <Card className="bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 backdrop-blur-xl border border-purple-500/20 shadow-lg">
              <CardContent className="p-6 text-center">
                <Award className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Ready to Work Together?</h4>
                <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
                  Let's discuss your next project and bring your ideas to life.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    data-cursor="pointer"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Get In Touch
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
