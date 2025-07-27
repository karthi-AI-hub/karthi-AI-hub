"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Users, Clock, Code } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Internship {
  id: string
  role: string
  company: string
  duration: string
  stack: string[]
  description: string
  achievements: string[]
}

interface InternshipsSectionProps {
  internships: Internship[]
}

export default function InternshipsSection({ internships }: InternshipsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="internships" className="py-20 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Internships</h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-8" />
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Early career experiences that shaped my development skills and industry knowledge.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {internships.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {internships.map((internship, index) => (
                <motion.div
                  key={internship.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                          <Users className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                          <Clock className="w-4 h-4" />
                          <span>{internship.duration}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        {internship.role}
                      </CardTitle>
                      <p className="text-purple-600 font-semibold">{internship.company}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        {internship.description}
                      </p>

                      {internship.achievements && internship.achievements.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">Achievements:</h4>
                          <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 text-sm">
                            {internship.achievements.map((achievement, idx) => (
                              <li key={idx}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {internship.stack && internship.stack.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Code className="w-4 h-4 text-slate-500" />
                            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Tech Stack:</h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {internship.stack.map((tech, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400">No internship information available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
