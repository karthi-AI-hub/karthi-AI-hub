"use client"

import { motion } from "framer-motion"
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin, Calendar, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import TypewriterEffect from "@/components/ui/typewriter-effect"
import ParticlesBackground from "@/components/ui/particles-background"
import Image from "next/image"

interface HeroData {
  name: string
  tagline: string
  subtitle: string
  cta_text: string
  cta_link: string
}

interface HeroSectionProps {
  data: HeroData | null
}

export default function HeroSection({ data }: HeroSectionProps) {
  const heroData = data || {
    name: "Karthikeyan S",
    tagline: "Full-Stack • Mobile • Cloud Developer",
    subtitle: "Freelance Developer specializing in Flutter, React, Node.js & Cloud Solutions",
    cta_text: "Let's Build Something Together",
    cta_link: "#contact",
  }

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-slate-900 dark:via-purple-900/20 dark:to-pink-900/20" />

      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-purple-500/5 dark:from-slate-900/10 dark:to-purple-900/10" />

      <ParticlesBackground />

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"
      />

      <motion.div
        animate={{
          y: [20, -20, 20],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
      />

      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-600 dark:text-green-400 border-green-500/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="w-2 h-2 bg-green-500 rounded-full mr-2"
                />
                Available for Freelance Projects
              </Badge>
            </motion.div>

            {/* Name with Gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 dark:from-white dark:via-purple-300 dark:to-white bg-clip-text text-transparent">
                {heroData.name}
              </span>
            </motion.h1>

            {/* Tagline with Typewriter Effect */}
            <div className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 h-16">
              <TypewriterEffect
                words={[heroData.tagline, "Flutter Expert", "React Specialist", "Cloud Architect", "API Developer"]}
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent"
              />
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl leading-relaxed"
            >
              {heroData.subtitle}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mb-8"
            >
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <MapPin className="w-4 h-4" />
                <span>Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Calendar className="w-4 h-4" />
                <span>3+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Sparkles className="w-4 h-4" />
                <span>20+ Projects Delivered</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  onClick={scrollToContact}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group"
                >
                  {heroData.cta_text}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-purple-300 dark:border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm transition-all duration-300"
                >
                  <Download className="mr-2 w-5 h-5" />
                  Download Resume
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              {[
                { icon: Github, href: "#", color: "hover:text-gray-900 dark:hover:text-white" },
                { icon: Linkedin, href: "#", color: "hover:text-blue-600" },
                { icon: Mail, href: "#", color: "hover:text-red-500" },
              ].map((social, index) => (
                <motion.div key={index} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`w-12 h-12 rounded-2xl bg-white/10 dark:bg-slate-800/30 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 text-slate-600 dark:text-slate-400 ${social.color} transition-all duration-300 hover:shadow-lg`}
                  >
                    <social.icon className="w-5 h-5" />
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Animated Rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-0 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-sm"
              />

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-2 w-76 h-76 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-sm"
              />

              {/* Profile Container */}
              <div className="relative w-72 h-72 mx-auto">
                {/* Glassmorphism Border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 p-1">
                  <div className="w-full h-full rounded-full bg-white/20 dark:bg-slate-900/20 backdrop-blur-xl border border-white/30 dark:border-slate-700/30" />
                </div>

                {/* Profile Image */}
                <div className="absolute inset-4 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50">
                  <Image
                    src="/me1.jpg"
                    alt="Karthikeyan S - Full-Stack Developer"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>

                {/* Floating Tech Icons */}
                {[
                  { icon: "⚛️", position: "top-0 right-8", delay: 0 },
                  { icon: "📱", position: "right-0 top-16", delay: 1 },
                  { icon: "☁️", position: "bottom-0 right-8", delay: 2 },
                  { icon: "🚀", position: "left-0 bottom-16", delay: 3 },
                  { icon: "💻", position: "top-0 left-8", delay: 4 },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      y: [-10, 10, -10],
                      rotate: [-5, 5, -5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: item.delay,
                      ease: "easeInOut",
                    }}
                    className={`absolute ${item.position} w-12 h-12 bg-white/20 dark:bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-slate-700/30 flex items-center justify-center text-2xl shadow-lg`}
                  >
                    {item.icon}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-purple-400/50 rounded-full flex justify-center backdrop-blur-sm bg-white/10 dark:bg-slate-900/10"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-3 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
