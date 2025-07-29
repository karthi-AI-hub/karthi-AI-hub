"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Smartphone, Globe, Server, Cloud, Palette, Users, ArrowRight, Check, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Service {
  id: string
  title: string
  description: string
  price_range?: string
  icon_url?: string
}

interface ServicesSectionProps {
  services: Service[]
}

const serviceIcons = {
  "Mobile App Development": {
    icon: Smartphone,
    gradient: "from-green-500 to-emerald-500",
    features: ["Cross-platform", "Native performance", "App Store ready"],
  },
  "Full-Stack Web Development": {
    icon: Globe,
    gradient: "from-blue-500 to-cyan-500",
    features: ["Responsive design", "SEO optimized", "Fast loading"],
  },
  "API Development & Integration": {
    icon: Server,
    gradient: "from-purple-500 to-violet-500",
    features: ["RESTful APIs", "GraphQL", "Documentation"],
  },
  "Cloud Solutions & DevOps": {
    icon: Cloud,
    gradient: "from-cyan-500 to-blue-500",
    features: ["AWS/GCP", "CI/CD pipelines", "Scalable infrastructure"],
  },
  "UI/UX Design & Prototyping": {
    icon: Palette,
    gradient: "from-pink-500 to-rose-500",
    features: ["User-centered design", "Wireframing", "Design systems"],
  },
  "Technical Consulting": {
    icon: Users,
    gradient: "from-orange-500 to-red-500",
    features: ["Architecture review", "Code audits", "Performance optimization"],
  },
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="services"
      className="py-20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [5, 0, 5],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 left-20 w-60 h-60 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium">
              <Sparkles className="inline w-4 h-4 mr-2" />
              Services I Offer
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 dark:from-white dark:via-purple-300 dark:to-white bg-clip-text text-transparent">
              Premium Development Services
            </span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-8 rounded-full" />

          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Comprehensive development services to bring your ideas to life with modern technologies and best practices.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const serviceConfig = serviceIcons[service.title as keyof typeof serviceIcons] || {
              icon: Server,
              gradient: "from-gray-500 to-slate-500",
              features: ["Custom solution", "Professional quality", "Full support"],
            }

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.8 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                className="group h-full"
              >
                <Card className="relative h-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Gradient Border Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${serviceConfig.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  {/* Floating Particles */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-60"
                        animate={{
                          y: [0, -100],
                          x: [0, Math.random() * 50 - 25],
                          opacity: [0, 0.6, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.5,
                        }}
                        style={{
                          left: `${20 + i * 30}%`,
                          bottom: 0,
                        }}
                      />
                    ))}
                  </div>

                  <CardHeader className="text-center relative z-10">
                    <motion.div
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.5 },
                      }}
                      className="mx-auto mb-4 w-16 h-16 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                    >
                      {service.icon_url ? (
                        <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl p-3 flex items-center justify-center shadow-lg border border-gray-200 dark:border-gray-700">
                          <Image
                            src={service.icon_url}
                            alt={`${service.title} icon`}
                            width={40}
                            height={40}
                            className="w-10 h-10 object-contain"
                            onError={(e) => {
                              // Fallback to service icon if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement?.parentElement;
                              if (parent) {
                                parent.className = `w-16 h-16 bg-gradient-to-r ${serviceConfig.gradient} rounded-2xl p-3 flex items-center justify-center shadow-lg border border-gray-200 dark:border-gray-700`;
                                const fallbackIcon = document.createElement('div');
                                fallbackIcon.innerHTML = `<svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 9.64 9 11 5.16-1.36 9-5.45 9-11V7l-10-5z"/></svg>`;
                                parent.appendChild(fallbackIcon);
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <div className={`w-16 h-16 bg-gradient-to-r ${serviceConfig.gradient} rounded-2xl p-3 flex items-center justify-center shadow-lg`}>
                          <serviceConfig.icon className="w-10 h-10 text-white" />
                        </div>
                      )}
                    </motion.div>

                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      {service.title}
                    </CardTitle>

                    {service.price_range && (
                      <motion.div whileHover={{ scale: 1.05 }} className="mx-auto">
                        <Badge
                          variant="outline"
                          className={`bg-gradient-to-r ${serviceConfig.gradient} text-white border-none shadow-md`}
                        >
                          {service.price_range}
                        </Badge>
                      </motion.div>
                    )}
                  </CardHeader>

                  <CardContent className="text-center relative z-10">
                    <CardDescription className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                      {service.description}
                    </CardDescription>

                    {/* Features List */}
                    <div className="space-y-2 mb-6">
                      {serviceConfig.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ delay: 0.5 + index * 0.1 + featureIndex * 0.1 }}
                          className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-300"
                        >
                          <Check className="w-4 h-4 text-green-500" />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        className={`w-full group-hover:bg-gradient-to-r group-hover:${serviceConfig.gradient} group-hover:text-white group-hover:border-transparent transition-all duration-300 bg-transparent border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg`}
                        onClick={scrollToContact}
                        data-cursor="pointer"
                      >
                        Get Started
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Service Process */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 dark:from-white dark:via-purple-300 dark:to-white bg-clip-text text-transparent">
                My Development Process
              </span>
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              A proven methodology for delivering exceptional results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Understanding your requirements, goals, and target audience",
                color: "from-blue-500 to-cyan-500",
                icon: "🔍",
              },
              {
                step: "02",
                title: "Planning",
                description: "Creating detailed project roadmap and technical architecture",
                color: "from-purple-500 to-violet-500",
                icon: "📋",
              },
              {
                step: "03",
                title: "Development",
                description: "Building your solution with regular updates and feedback",
                color: "from-green-500 to-emerald-500",
                icon: "⚡",
              },
              {
                step: "04",
                title: "Delivery",
                description: "Testing, deployment, and ongoing support for your project",
                color: "from-orange-500 to-red-500",
                icon: "🚀",
              },
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="text-center group cursor-pointer"
                data-cursor="pointer"
              >
                <div className="relative mb-6">
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.5 },
                    }}
                    className={`w-20 h-20 bg-gradient-to-r ${process.color} text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto shadow-lg group-hover:shadow-2xl transition-all duration-300`}
                  >
                    <span className="text-lg">{process.step}</span>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="absolute -top-2 -right-2 text-2xl"
                    >
                      {process.icon}
                    </motion.div>
                  </motion.div>

                  {/* Connection Line */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-purple-300 to-pink-300 dark:from-purple-600 dark:to-pink-600" />
                  )}
                </div>

                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {process.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
