"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Briefcase, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface WorkExperience {
  id: string
  role: string
  company: string
  description: string
  start_date: string
  end_date?: string
  tech_used: string[]
  achievements: string[]
}

interface ExperienceSectionProps {
  experience: WorkExperience[]
}

export default function ExperienceSection({ experience }: ExperienceSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })
  }

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Work Experience</h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-8" />
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Professional experience building scalable applications and leading development teams.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experience.length > 0 ? (
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-purple-200 dark:bg-purple-800" />

              <div className="space-y-12">
                {experience.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="relative"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-6 w-4 h-4 bg-purple-600 rounded-full border-4 border-white dark:border-slate-900 z-10" />

                    <div className="ml-16">
                      <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                          <div className="flex items-start gap-4">
                            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                              <Briefcase className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                {exp.role}
                              </CardTitle>
                              <p className="text-lg text-purple-600 font-semibold mb-2">{exp.company}</p>
                              <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : "Present"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{exp.description}</p>

                          {exp.achievements && exp.achievements.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Key Achievements:</h4>
                              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                                {exp.achievements.map((achievement, idx) => (
                                  <li key={idx}>{achievement}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {exp.tech_used && exp.tech_used.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Technologies Used:</h4>
                              <div className="flex flex-wrap gap-2">
                                {exp.tech_used.map((tech, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400">No work experience information available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
