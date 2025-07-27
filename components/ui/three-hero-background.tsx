"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

function AnimatedSphere({ count = 5000 }) {
  const ref = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // Create sphere distribution
      const radius = Math.random() * 20 + 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      // Purple to pink gradient colors
      const t = Math.random()
      colors[i * 3] = 0.5 + t * 0.5 // R
      colors[i * 3 + 1] = 0.2 + t * 0.3 // G
      colors[i * 3 + 2] = 0.8 + t * 0.2 // B
    }

    return [positions, colors]
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={[5, 0, -5]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color="#8b5cf6" transparent opacity={0.6} wireframe />
    </mesh>
  )
}

export default function ThreeHeroBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />

        <AnimatedSphere />
        <FloatingGeometry />
      </Canvas>
    </div>
  )
}
