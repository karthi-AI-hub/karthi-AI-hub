"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Award, Calendar, ExternalLink, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Certificate {
  id: string
  title: string
  organization: string
  issue_date: string
  credential_url?: string
  image_url?: string
  type: string
}

interface CertificatesSectionProps {
  certificates: Certificate[]
}

const certificateTypes = ["All", "certification", "course", "workshop"]

export default function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedType, setSelectedType] = useState("All")

  const filteredCertificates = certificates.filter((cert) => selectedType === "All" || cert.type === selectedType)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })
  }

  return (
    <section id="certificates" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Certificates & Achievements
          </h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-8" />
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Professional certifications and continuous learning achievements that validate my expertise.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm">
            <Filter className="w-4 h-4 text-slate-500" />
            {certificateTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedType(type)}
                className="capitalize"
              >
                {type}
              </Button>
            ))}
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {filteredCertificates.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCertificates.map((certificate, index) => (
                <motion.div
                  key={certificate.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                    {certificate.image_url && (
                      <div className="relative overflow-hidden rounded-t-lg">
                        <Image
                          src={
                            certificate.image_url ||
                            `/placeholder.svg?height=200&width=400&query=${certificate.title || "/placeholder.svg"} certificate`
                          }
                          alt={certificate.title}
                          width={400}
                          height={200}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                          <Award className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <Badge variant="outline" className="mb-2 text-xs capitalize">
                            {certificate.type}
                          </Badge>
                          <CardTitle className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                            {certificate.title}
                          </CardTitle>
                          <p className="text-purple-600 font-semibold text-sm mt-1">{certificate.organization}</p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(certificate.issue_date)}</span>
                        </div>

                        {certificate.credential_url && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={certificate.credential_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-1" />
                              View
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Award className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400">
                {selectedType === "All" ? "No certificates available" : `No ${selectedType}s available`}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
