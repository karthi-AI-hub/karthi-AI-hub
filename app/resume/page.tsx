"use client"

import { Button } from "@/components/ui/button"
import { Download, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function ResumePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // The iframe doesn't have a reliable onload event for PDFs in all browsers.
    // We'll use a timer as a fallback to hide the loader.
    const timer = setTimeout(() => setIsLoading(false), 3000) // Adjust time as needed
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-slate-900 dark:via-purple-900/20 dark:to-pink-900/20">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 shadow-sm"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-slate-200 hover:text-purple-600 transition-colors group">
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                Back to Portfolio
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a href="/resume.pdf" download="Karthi-Resume.pdf">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/30">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-500/10 overflow-hidden border border-white/50 dark:border-slate-700/50"
        >
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm z-10">
              <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
              <p className="mt-4 text-lg font-semibold text-slate-700 dark:text-slate-300">Loading Resume...</p>
            </div>
          )}
          <iframe
            src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
            title="Karthi's Resume"
            className="w-full h-screen border-none transition-opacity duration-500"
            style={{ opacity: isLoading ? 0 : 1 }}
            onLoad={() => setIsLoading(false)}
          />
        </motion.div>
      </main>
    </div>
  )
}
