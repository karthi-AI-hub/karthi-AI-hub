"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Quote, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface Testimonial {
  id: string
  name: string
  message: string
  company?: string
  position?: string
  photo_url?: string
  rating: number
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-slate-300 dark:text-slate-600"}`}
      />
    ))
  }

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Client Testimonials</h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-8" />
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            What clients say about working with me and the solutions I've delivered.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {testimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 relative">
                    <CardContent className="p-6">
                      {/* Quote Icon */}
                      <div className="absolute top-4 right-4">
                        <Quote className="w-8 h-8 text-purple-200 dark:text-purple-800" />
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-4">{renderStars(testimonial.rating)}</div>

                      {/* Message */}
                      <blockquote className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed italic">
                        "{testimonial.message}"
                      </blockquote>

                      {/* Client Info */}
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                          {testimonial.photo_url ? (
                            <Image
                              src={testimonial.photo_url || "/placeholder.svg"}
                              alt={testimonial.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-slate-500 dark:text-slate-400 font-semibold text-lg">
                              {testimonial.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</p>
                          {testimonial.position && testimonial.company && (
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {testimonial.position} at {testimonial.company}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Quote className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400">No testimonials available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
