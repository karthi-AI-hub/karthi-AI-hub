"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "internships", label: "Internships" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "certificates", label: "Certificates" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
]

export default function TableOfContents() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 lg:hidden bg-purple-600 hover:bg-purple-700"
        size="icon"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Desktop TOC */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
      >
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
          <ul className="space-y-2">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => scrollToSection(id)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    activeSection === id
                      ? "bg-purple-600 text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* Mobile TOC */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="absolute right-0 top-0 h-full w-64 bg-slate-900 p-6"
            >
              <div className="mt-16">
                <ul className="space-y-2">
                  {sections.map(({ id, label }) => (
                    <li key={id}>
                      <button
                        onClick={() => scrollToSection(id)}
                        className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          activeSection === id
                            ? "bg-purple-600 text-white"
                            : "text-slate-400 hover:text-white hover:bg-slate-800"
                        }`}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
