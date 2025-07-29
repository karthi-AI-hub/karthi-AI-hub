"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function AdvancedCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([])

  useEffect(() => {
    let trailId = 0

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      setPosition(newPosition)
      
      // Add to trail
      setTrail(prev => {
        const newTrail = [...prev, { ...newPosition, id: trailId++ }]
        return newTrail.slice(-8) // Keep last 8 trail points
      })
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    const handleMouseOver = (e: Event) => {
      const target = e.target as HTMLElement
      if (target?.matches?.('button, a, [data-cursor="pointer"], .cursor-pointer, input, textarea, select')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: Event) => {
      const target = e.target as HTMLElement
      if (target?.matches?.('button, a, [data-cursor="pointer"], .cursor-pointer, input, textarea, select')) {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseover", handleMouseOver, true)
    document.addEventListener("mouseout", handleMouseOut, true)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseover", handleMouseOver, true)
      document.removeEventListener("mouseout", handleMouseOut, true)
    }
  }, [])

  return (
    <>
      {/* Cursor Trail */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed top-0 left-0 w-1 h-1 rounded-full pointer-events-none z-40"
          style={{
            x: point.x - 2,
            y: point.y - 2,
            background: `radial-gradient(circle, rgba(147, 51, 234, ${0.8 - index * 0.1}) 0%, transparent 70%)`,
          }}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}

      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        style={{
          x: position.x - 16,
          y: position.y - 16,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {/* Outer Ring */}
        <motion.div
          className="w-8 h-8 rounded-full border-2 border-purple-500/60 dark:border-purple-400/60"
          animate={{
            scale: isHovering ? 1.8 : isClicking ? 0.8 : 1.2,
            borderColor: isHovering 
              ? "rgba(236, 72, 153, 0.8)" 
              : isClicking 
              ? "rgba(59, 130, 246, 0.9)"
              : "rgba(147, 51, 234, 0.6)"
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
        
        {/* Inner Dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(circle, rgba(147, 51, 234, 0.9) 0%, rgba(236, 72, 153, 0.7) 100%)"
          }}
          animate={{
            scale: isHovering ? 1.5 : isClicking ? 2 : 1,
            background: isHovering 
              ? "radial-gradient(circle, rgba(236, 72, 153, 0.9) 0%, rgba(147, 51, 234, 0.7) 100%)"
              : isClicking
              ? "radial-gradient(circle, rgba(59, 130, 246, 0.9) 0%, rgba(147, 51, 234, 0.8) 100%)"
              : "radial-gradient(circle, rgba(147, 51, 234, 0.9) 0%, rgba(236, 72, 153, 0.7) 100%)"
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />

        {/* Particle Effect on Click */}
        {isClicking && (
          <motion.div
            className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 70%)"
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </motion.div>

      {/* Hover Effect Ring */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-45"
          style={{
            x: position.x - 24,
            y: position.y - 24,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <motion.div
            className="w-12 h-12 rounded-full border border-pink-500/40"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{
              background: "radial-gradient(circle, transparent 60%, rgba(236, 72, 153, 0.1) 80%, transparent 100%)"
            }}
          />
        </motion.div>
      )}
    </>
  )
}