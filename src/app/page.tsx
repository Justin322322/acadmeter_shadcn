"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/ui/navigation"
import { HeroSection } from "@/components/sections/HeroSection"
import { FeaturesSection } from "@/components/sections/FeaturesSection"
import { BenefitsSection } from "@/components/sections/BenefitsSection"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { CTASection } from "@/components/sections/CTASection"
import { FooterSection } from "@/components/sections/FooterSection"
import { motion, AnimatePresence } from "framer-motion"

// Auth Error Alert Component
const AuthErrorAlert = ({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-lg backdrop-blur-sm"
    role="alert"
  >
    <span className="block text-center font-medium">{message}</span>
  </motion.div>
)

export default function Home() {
  const searchParams = useSearchParams()
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    const error = searchParams.get('authError')
    if (error) {
      setAuthError(error)
      const timer = setTimeout(() => {
        setAuthError(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatePresence>
        {authError && <AuthErrorAlert message={authError} />}
      </AnimatePresence>

      <Navigation />

      <main className="flex-1 text-slate-800 dark:text-slate-100 overflow-x-hidden">
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <TestimonialsSection />
        <CTASection />
        <FooterSection />
      </main>
    </div>
  )
}