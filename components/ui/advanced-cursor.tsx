"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function MinimalCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      if (target?.matches?.('button, a, [data-cursor="pointer"]')) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseenter", handleMouseEnter, true)
    document.addEventListener("mouseleave", handleMouseLeave, true)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter, true)
      document.removeEventListener("mouseleave", handleMouseLeave, true)
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-50 bg-purple-500 mix-blend-difference"
      style={{
        x: position.x - 4,
        y: position.y - 4,
        scale: isHovering ? 1.5 : 1,
        opacity: isHovering ? 1 : 0.7
      }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  )
}