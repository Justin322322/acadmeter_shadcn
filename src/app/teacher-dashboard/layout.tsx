/**
 * Teacher Dashboard Layout Component
 * Handles authentication, layout structure, and navigation for the teacher portal
 * 
 * Features:
 * - Token-based authentication verification
 * - Protected route redirection
 * - Responsive sidebar navigation
 * - Loading state management
 */
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { TeacherNavigation, TeacherSidebar } from "@/components/ui/teacher_dashboard"

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      
      if (!token || !user || user.user_type !== 'teacher') {
        // Redirect non-teachers to login page
        router.push('/')
        return
      }

      try {
        // Simulate API auth check
        await new Promise(resolve => setTimeout(resolve, 500))
        setIsLoading(false)
      } catch (error) {
        console.error("Authentication error:", error)
        router.push('/')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center" role="status">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <TeacherNavigation onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <TeacherSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main 
        className="transition-all duration-200 ease-in-out p-3 sm:p-4 md:ml-64 pt-16 sm:pt-20 min-h-screen"
        id="main-content"
        role="main"
        aria-label="Teacher dashboard main content"
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}