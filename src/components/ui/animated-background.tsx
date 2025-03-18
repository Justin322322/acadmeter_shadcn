"use client"

import { useRef, useEffect, useMemo, useCallback } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as random from "maath/random"
import { Points as ThreePoints, Mesh } from "three"
import { useTheme } from "@/components/theme-provider"

function Stars({ count = 5000, depth = 2, size = 0.003, speed = 1, mouseInfluence = 0.02, ...props }) {
  const ref = useRef<ThreePoints>(null)
  const { mouse, viewport } = useThree()
  const { theme } = useTheme()
  
  // Use useMemo to prevent recreating the positions on every render
  const positions = useMemo(() => {
    const posArray = new Float32Array(count * 3)
    random.inSphere(posArray, { radius: depth })
    return posArray
  }, [count, depth])
  
  // Different sizes for more visual interest
  const sizes = useMemo(() => {
    const sizeArray = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      sizeArray[i] = Math.random() * size * 3 + size / 2
    }
    return sizeArray
  }, [count, size])

  useFrame((state, delta) => {
    if (ref.current) {
      // Base rotation
      ref.current.rotation.x += delta * 0.1 * speed
      ref.current.rotation.y += delta * 0.15 * speed
      
      // Responsive mouse interaction
      const x = (mouse.x * viewport.width) / 30
      const y = (mouse.y * viewport.height) / 30
      ref.current.rotation.x += (y - ref.current.rotation.x) * mouseInfluence
      ref.current.rotation.y += (x - ref.current.rotation.y) * mouseInfluence
      
      // Subtle pulsing effect with theme-based intensity
      const pulse = Math.sin(state.clock.elapsedTime * 0.3) * (theme === 'dark' ? 0.04 : 0.02)
      ref.current.scale.setScalar(1 + pulse)
    }
  })

  const themeColors = {
    dark: {
      primary: '#ffffff',
      secondary: '#6366f1',
      opacity: 0.85
    },
    light: {
      primary: '#1e293b',
      secondary: '#3b82f6',
      opacity: 0.65
    }
  }

  const currentTheme = theme === 'dark' ? themeColors.dark : themeColors.light

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={positions}
        sizes={sizes}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color={currentTheme.primary}
          size={size}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={currentTheme.opacity}
          blending={2}
        />
      </Points>
    </group>
  )
}

interface ShootingStarMesh extends Mesh {
  userData: {
    direction?: { x: number; y: number; z: number };
    lifetime?: number;
    maxLifetime?: number;
    active?: boolean;
  };
}

function ShootingStar({ speed = 0.05 }) {
  const { theme } = useTheme()
  const ref = useRef<ShootingStarMesh>(null)
  
  const themeColors = {
    dark: {
      color: '#ffffff',
      opacity: 0.9
    },
    light: {
      color: '#1e293b',
      opacity: 0.7
    }
  }

  const currentTheme = theme === 'dark' ? themeColors.dark : themeColors.light
  
  const startPosition = useMemo(() => ({
    x: (Math.random() - 0.5) * 3,
    y: (Math.random() - 0.5) * 3,
    z: (Math.random() - 0.5) * 3
  }), [])
  
  const resetStar = useCallback(() => {
    if (ref.current) {
      ref.current.position.set(startPosition.x, startPosition.y, startPosition.z)
      ref.current.userData.direction = {
        x: (Math.random() - 0.5) * 0.05,
        y: (Math.random() - 0.5) * 0.05,
        z: (Math.random() - 0.5) * 0.05
      }
      ref.current.userData.lifetime = 0
      ref.current.userData.maxLifetime = Math.random() * 3 + 1
      ref.current.userData.active = Math.random() > 0.7
    }
  }, [startPosition])
  
  useEffect(() => {
    resetStar()
  }, [resetStar])
  
  useFrame((state, delta) => {
    if (ref.current) {
      if (ref.current.userData.active) {
        const dir = ref.current.userData.direction!
        ref.current.position.x += dir.x * speed * 10
        ref.current.position.y += dir.y * speed * 10
        ref.current.position.z += dir.z * speed * 10
        
        ref.current.userData.lifetime! += delta
        
        if (ref.current.userData.lifetime! > ref.current.userData.maxLifetime!) {
          resetStar()
        }
      } else if (Math.random() < 0.005) {
        ref.current.userData.active = true
      }
    }
  })
  
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.005, 4, 4]} />
      <meshBasicMaterial 
        color={currentTheme.color}
        transparent 
        opacity={currentTheme.opacity}
      />
    </mesh>
  )
}

export function AnimatedBackground() {
  const { theme } = useTheme()
  
  return (
    <div className="fixed inset-0 -z-10 transition-colors duration-700">
      <Canvas
        camera={{ position: [0, 0, 1.5], fov: 75 }}
        style={{ 
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: theme === 'dark' ? 'transparent' : '#f8fafc',
          transition: 'background-color 700ms ease-in-out'
        }}
        dpr={[1, 2]}
      >
        <Stars count={3000} depth={2} speed={0.8} mouseInfluence={0.03} />
        <Stars count={2000} depth={3} size={0.002} speed={0.5} mouseInfluence={0.01} />
        <Stars count={1000} depth={1} size={0.004} speed={1.2} mouseInfluence={0.05} />
        
        {Array.from({ length: 3 }).map((_, i) => (
          <ShootingStar key={i} speed={0.03 + Math.random() * 0.08} />
        ))}
      </Canvas>
    </div>
  )
}