"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Code, Smartphone, Cloud, Users, Award, Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const highlights = [
  {
    icon: Code,
    title: "Full-Stack Expertise",
    description: "Proficient in modern web technologies including React, Next.js, Node.js, and Python",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Specialized in Flutter and React Native for cross-platform mobile applications",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Experienced with AWS, Google Cloud, and modern DevOps practices",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    icon: Users,
    title: "Client-Focused",
    description: "Delivered successful projects across Healthcare, Enterprise, and EdTech sectors",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "Published apps on Play Store and deployed enterprise solutions for major clients",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    icon: Zap,
    title: "Performance Driven",
    description: "Focused on building scalable, high-performance applications with optimal UX",
    gradient: "from-indigo-500 to-blue-500",
  },
]

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="about"
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
              About Me
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 dark:from-white dark:via-purple-300 dark:to-white bg-clip-text text-transparent">
              Crafting Digital Excellence
            </span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-8 rounded-full" />

          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
            I'm a passionate full-stack developer with{" "}
            <span className="font-semibold text-purple-600 dark:text-purple-400">3+ years of experience</span> building
            scalable web and mobile applications. My journey spans from enterprise solutions at SAIL to innovative
            healthcare platforms, always focusing on delivering exceptional user experiences and robust technical
            solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.8 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className="relative h-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-8 rounded-3xl border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Gradient Border Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${highlight.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div className={`inline-flex p-4 bg-gradient-to-r ${highlight.gradient} rounded-2xl mb-6 shadow-lg`}>
                    <highlight.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    {highlight.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{highlight.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Career Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 dark:from-white dark:via-purple-300 dark:to-white bg-clip-text text-transparent">
                My Journey
              </span>
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-lg">From student to professional developer</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 rounded-full" />

              {/* Timeline Items */}
              <div className="space-y-16">
                {[
                  {
                    year: "2024 - Present",
                    title: "Freelance Developer",
                    description: "Building custom solutions for clients across various industries",
                    side: "right",
                  },
                  {
                    year: "2025 - Present",
                    title: "Flutter Developer at Pep Softwares",
                    description: "Led mobile app development team and delivered multiple production apps",
                    side: "left",
                  },
                  {
                    year: "2022 - 2026",
                    title: "Artificial Intelligence & Data Science Student",
                    description: "B.Tech with 8.5 CGPA, specialized in software engineering",
                    side: "right",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: item.side === "left" ? -80 : 80, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: item.side === "left" ? -80 : 80, scale: 0.9 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.8 + index * 0.25,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ scale: 1.05 }}
                    className={`flex items-center ${item.side === "left" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`flex-1 ${item.side === "left" ? "text-right pr-8" : "pl-8"}`}>
                      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-6 rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-lg">
                        <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm">{item.year}</span>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mt-1 mb-2">{item.title}</h4>
                        <p className="text-slate-600 dark:text-slate-300">{item.description}</p>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg z-10" />

                    <div className="flex-1" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 max-w-2xl mx-auto">
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Ready to work together?</h4>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Let's discuss your next project and bring your ideas to life.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Get In Touch
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
