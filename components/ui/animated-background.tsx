"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create floating geometric shapes
    const shapes: Array<{
      x: number
      y: number
      size: number
      rotation: number
      rotationSpeed: number
      vx: number
      vy: number
      opacity: number
      color: string
      type: "triangle" | "square" | "circle"
    }> = []

    const colors = [
      "rgba(147, 51, 234, 0.1)", // purple
      "rgba(236, 72, 153, 0.1)", // pink
      "rgba(59, 130, 246, 0.1)", // blue
      "rgba(16, 185, 129, 0.1)", // emerald
    ]

    // Initialize shapes
    for (let i = 0; i < 20; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 60 + 20,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: ["triangle", "square", "circle"][Math.floor(Math.random() * 3)] as "triangle" | "square" | "circle",
      })
    }

    const drawShape = (shape: (typeof shapes)[0]) => {
      ctx.save()
      ctx.translate(shape.x, shape.y)
      ctx.rotate((shape.rotation * Math.PI) / 180)
      ctx.globalAlpha = shape.opacity

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, shape.size)
      gradient.addColorStop(0, shape.color)
      gradient.addColorStop(1, "transparent")
      ctx.fillStyle = gradient

      switch (shape.type) {
        case "circle":
          ctx.beginPath()
          ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2)
          ctx.fill()
          break
        case "square":
          ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size)
          break
        case "triangle":
          ctx.beginPath()
          ctx.moveTo(0, -shape.size / 2)
          ctx.lineTo(-shape.size / 2, shape.size / 2)
          ctx.lineTo(shape.size / 2, shape.size / 2)
          ctx.closePath()
          ctx.fill()
          break
      }

      ctx.restore()
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      shapes.forEach((shape) => {
        // Update position
        shape.x += shape.vx
        shape.y += shape.vy
        shape.rotation += shape.rotationSpeed

        // Bounce off edges
        if (shape.x < -shape.size || shape.x > canvas.width + shape.size) {
          shape.vx *= -1
        }
        if (shape.y < -shape.size || shape.y > canvas.height + shape.size) {
          shape.vy *= -1
        }

        // Keep shapes in bounds
        shape.x = Math.max(-shape.size, Math.min(canvas.width + shape.size, shape.x))
        shape.y = Math.max(-shape.size, Math.min(canvas.height + shape.size, shape.y))

        drawShape(shape)
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.6 }} />

      {/* Additional floating elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>
    </>
  )
}
