"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function GlobalParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const mouseRef = useRef({ x: 0, y: 0, isMoving: false })

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

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isMoving: true
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.isMoving = false
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
      angle: number
      speed: number
      baseSpeed: number
      pulsePhase: number
    }> = []

    // Create particles with theme-aware colors - Enhanced for low brightness screens
    const particleColors =
      theme === "dark"
        ? ["rgba(147, 51, 234, 0.9)", "rgba(236, 72, 153, 0.8)", "rgba(59, 130, 246, 0.8)", "rgba(168, 85, 247, 0.9)", "rgba(14, 165, 233, 0.8)"]
        : ["rgba(147, 51, 234, 0.8)", "rgba(236, 72, 153, 0.7)", "rgba(59, 130, 246, 0.7)", "rgba(168, 85, 247, 0.8)", "rgba(14, 165, 233, 0.7)"]

    // Increase particle count for more connections
    for (let i = 0; i < 200; i++) { // Increased from 150 to 200
      const baseSpeed = Math.random() * 0.8 + 0.3 // Much slower speed for brain-like movement
      const angle = Math.random() * Math.PI * 2
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.cos(angle) * baseSpeed,
        vy: Math.sin(angle) * baseSpeed,
        size: Math.random() * 2.5 + 1.2, // Increased particle size (1.2-3.7 instead of 0.8-2.3)
        opacity: Math.random() * 0.6 + 0.5, // Increased opacity (0.5-1.1 instead of 0.4-1.0)
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        angle: angle,
        speed: baseSpeed,
        baseSpeed: baseSpeed,
        pulsePhase: Math.random() * Math.PI * 2,
      })
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const time = Date.now() * 0.0008 // Much slower time for brain-like pulsing
      const mouse = mouseRef.current

      // Debug: Log particle count and canvas size
      if (Math.random() < 0.001) { // Log occasionally
        console.log('Neural particles rendering:', {
          particleCount: particles.length,
          canvasSize: { width: canvas.width, height: canvas.height },
          particlesVisible: particles.filter(p => p.opacity > 0).length
        })
      }

      particles.forEach((particle, index) => {
        // Slower, more organic pulsing like neural activity
        particle.pulsePhase += 0.015 // Much slower pulsing for brain-like effect
        const speedMultiplier = 1 + Math.sin(particle.pulsePhase) * 0.1 // Minimal speed variation
        particle.speed = particle.baseSpeed * speedMultiplier

        // Very gentle mouse interaction - minimal neural responses
        if (mouse.isMoving) {
          const dx = mouse.x - particle.x
          const dy = mouse.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 80) { // Reduced from 100 to 80
            const force = (80 - distance) / 80 * 0.0002 // Reduced force even further
            particle.vx += (dx / distance) * force
            particle.vy += (dy / distance) * force
          }
        }

        // Minimal orbital motion for organic, brain-like movement
        particle.angle += Math.sin(time * 2 + particle.pulsePhase) * 0.002 // Very subtle angle changes
        
        // Update velocity with gentle directional movement
        const angleVariation = particle.angle
        particle.vx = Math.cos(angleVariation) * particle.speed
        particle.vy = Math.sin(angleVariation) * particle.speed

        // Very subtle drift for natural movement
        const driftX = Math.sin(time * 0.5 + particle.x * 0.002) * 0.05
        const driftY = Math.cos(time * 0.4 + particle.y * 0.002) * 0.05
        
        particle.x += particle.vx + driftX
        particle.y += particle.vy + driftY

        // Smooth edge wrapping
        if (particle.x < -10) particle.x = canvas.width + 10
        if (particle.x > canvas.width + 10) particle.x = -10
        if (particle.y < -10) particle.y = canvas.height + 10
        if (particle.y > canvas.height + 10) particle.y = -10

        // Dynamic size and opacity with minimal cursor interaction
        let sizeMultiplier = 1
        let opacityMultiplier = 1
        
        if (mouse.isMoving) {
          const mouseDistance = Math.sqrt((mouse.x - particle.x) ** 2 + (mouse.y - particle.y) ** 2)
          if (mouseDistance < 80) {
            sizeMultiplier = 1 + (80 - mouseDistance) / 80 * 0.15 // Much gentler size boost
            opacityMultiplier = 1 + (80 - mouseDistance) / 80 * 0.1 // Much gentler opacity boost
          }
        }

        const dynamicSize = particle.size * (1 + Math.sin(particle.pulsePhase) * 0.12) * sizeMultiplier // Increased size variation from 0.08 to 0.12
        const dynamicOpacity = particle.opacity * (0.95 + Math.sin(particle.pulsePhase * 0.8) * 0.05) * opacityMultiplier // Very gentle opacity variation

        // Create gradient for particle
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, dynamicSize * 2)
        const colorWithOpacity = particle.color.replace(/[\d.]+\)$/g, `${dynamicOpacity})`)
        gradient.addColorStop(0, colorWithOpacity)
        gradient.addColorStop(1, "transparent")

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, dynamicSize, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Enhanced connections with brain-like neural network patterns
        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          let connectionRange = 130 // Increased connection range for longer neural pathways
          
          // Very minimal increase connection range near cursor (neural activation)
          if (mouse.isMoving) {
            const mouseToP1 = Math.sqrt((mouse.x - particle.x) ** 2 + (mouse.y - particle.y) ** 2)
            const mouseToP2 = Math.sqrt((mouse.x - otherParticle.x) ** 2 + (mouse.y - otherParticle.y) ** 2)
            if (mouseToP1 < 120 || mouseToP2 < 120) {
              connectionRange = 180 // Much longer range near cursor
            }
          }

          if (distance < connectionRange) {
            // Brain-like neural pulse strength - Enhanced visibility
            const baseOpacity = (1 - distance / connectionRange) * 0.5 // Increased base opacity from 0.3 to 0.5
            const neuralSync = Math.abs(Math.sin(particle.pulsePhase * 0.5) + Math.sin(otherParticle.pulsePhase * 0.5)) * 0.3 // Increased from 0.2 to 0.3
            let finalOpacity = baseOpacity * (0.7 + neuralSync) // Increased from 0.6 to 0.7
            
            // Minimal neural activation near cursor
            if (mouse.isMoving) {
              const mouseToConnection = Math.min(
                Math.sqrt((mouse.x - particle.x) ** 2 + (mouse.y - particle.y) ** 2),
                Math.sqrt((mouse.x - otherParticle.x) ** 2 + (mouse.y - otherParticle.y) ** 2)
              )
              if (mouseToConnection < 80) {
                finalOpacity *= 1 + (80 - mouseToConnection) / 80 * 0.15 // Much gentler activation
              }
            }
            
            // Create organic neural connection gradient
            const connectionGradient = ctx.createLinearGradient(
              particle.x,
              particle.y,
              otherParticle.x,
              otherParticle.y,
            )
            
            const color1 = particle.color.replace(/[\d.]+\)$/g, `${finalOpacity})`)
            const color2 = otherParticle.color.replace(/[\d.]+\)$/g, `${finalOpacity})`)
            const midColor = `rgba(147, 72, 200, ${finalOpacity * 0.7})` // Softer mid-color
            
            connectionGradient.addColorStop(0, color1)
            connectionGradient.addColorStop(0.5, midColor)
            connectionGradient.addColorStop(1, color2)

            // Very thin neural pathways with gentle pulsing - Enhanced visibility and length
            const lineWidth = 0.7 + (1 - distance / connectionRange) * 1.2 + Math.sin(time * 3 + distance * 0.005) * 0.3 // Increased from 0.5, 0.8, 0.2

            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            
            // Organic curves like neural pathways
            const midX = (particle.x + otherParticle.x) / 2 + Math.sin(time * 0.8 + distance * 0.005) * 1.5 // Very subtle curves
            const midY = (particle.y + otherParticle.y) / 2 + Math.cos(time * 0.6 + distance * 0.005) * 1.5
            
            ctx.quadraticCurveTo(midX, midY, otherParticle.x, otherParticle.y)
            ctx.strokeStyle = connectionGradient
            ctx.lineWidth = Math.max(0.5, lineWidth) // Increased minimum width from 0.3 to 0.5
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationId)
    }
  }, [theme])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none" 
      style={{ 
        zIndex: 5, 
        opacity: 0.95,
        mixBlendMode: 'normal',
        background: 'transparent'
      }} 
    />
  )
}
