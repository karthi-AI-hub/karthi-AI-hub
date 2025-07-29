"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, Calendar, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Education {
  id: string
  degree: string
  institution: string
  start_year: number
  end_year?: number
  cgpa?: number
  highlights: string[]
}

interface EducationSectionProps {
  education: Education[]
}

export default function EducationSection({ education }: EducationSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Education</h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-8" />
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            My academic foundation in computer science and continuous learning journey.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {education.length > 0 ? (
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-purple-200 dark:bg-purple-800" />

              <div className="space-y-12">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, x: -50, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -50, scale: 0.9 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 100 
                    }}
                    className="relative"
                  >
                    {/* Timeline Dot */}
                    <motion.div 
                      className="absolute left-6 w-4 h-4 bg-purple-600 rounded-full border-4 border-white dark:border-slate-900 z-10"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: index * 0.2 + 0.4, type: "spring", stiffness: 200 }}
                    />

                    <div className="ml-16">
                      <Card className="hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                          <GraduationCap className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                            {edu.degree}
                          </CardTitle>
                          <p className="text-lg text-purple-600 font-semibold mb-2">{edu.institution}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {edu.start_year} - {edu.end_year || "Present"}
                              </span>
                            </div>
                            {edu.cgpa && (
                              <div className="flex items-center gap-1">
                                <Award className="w-4 h-4" />
                                <span>CGPA: {edu.cgpa}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {edu.highlights && edu.highlights.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Key Coursework:</h4>
                          <div className="flex flex-wrap gap-2">
                            {edu.highlights.map((highlight, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {highlight}
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
              <GraduationCap className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400">No education information available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
