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

  // Debug: Log certificates data
  console.log('Certificates data:', certificates);
  console.log('Filtered certificates:', filteredCertificates);

  // Convert GitHub blob URLs to raw URLs for images
  const convertToRawUrl = (url: string) => {
    if (!url) return url;
    
    // Convert GitHub blob URLs to raw URLs
    if (url.includes('github.com') && url.includes('/blob/')) {
      return url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
    }
    
    return url;
  };

  // Check if the certificate has an image (not PDF)
  const isImageFile = (url: string) => {
    if (!url) return false;
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    return imageExtensions.some(ext => url.toLowerCase().includes(ext));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })
  }

  return (
    <section id="certificates" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
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
                  initial={{ opacity: 0, scale: 0.8, y: 40 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 40 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="h-full hover:shadow-2xl hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-500 group transform hover:-translate-y-2">
                    {certificate.image_url && (
                      <div className="relative overflow-hidden rounded-t-lg">
                        {isImageFile(certificate.image_url) ? (
                          <Image
                            src={convertToRawUrl(certificate.image_url)}
                            alt={certificate.title}
                            width={400}
                            height={200}
                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              console.error('Certificate image failed to load:', certificate.image_url);
                              console.error('Converted URL:', convertToRawUrl(certificate.image_url));
                              console.error('Certificate details:', certificate);
                              // Fallback to certificate icon if image fails
                              const target = e.target as HTMLImageElement;
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="w-full h-32 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                                    <div class="text-center">
                                      <svg class="w-12 h-12 text-purple-600 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L2 7v10c0 5.55 3.84 9.64 9 11 5.16-1.36 9-5.45 9-11V7l-10-5z"/>
                                      </svg>
                                      <p class="text-xs text-slate-600 dark:text-slate-400 font-medium">Certificate</p>
                                      <p class="text-xs text-red-500 mt-1">Image failed to load</p>
                                    </div>
                                  </div>
                                `;
                              }
                            }}
                            onLoad={() => {
                              console.log('Certificate image loaded successfully:', convertToRawUrl(certificate.image_url));
                            }}
                          />
                        ) : (
                          // Show PDF preview for PDF files
                          <div className="w-full h-32 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                            <div className="text-center">
                              <svg className="w-12 h-12 text-purple-600 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                              </svg>
                              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">PDF Certificate</p>
                            </div>
                            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                              PDF
                            </div>
                          </div>
                        )}
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

                        {(certificate.credential_url || certificate.image_url) && (
                          <Button size="sm" variant="outline" asChild>
                            <a 
                              href={certificate.credential_url || certificate.image_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:bg-purple-50 dark:hover:bg-purple-900/20"
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              View Certificate
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
