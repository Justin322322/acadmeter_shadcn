"use client"

import { useState, useEffect } from "react"
import { TeacherNavigation } from "@/components/ui/teacher_dashboard/teacher-navigation"
import { TeacherSidebar } from "@/components/ui/teacher_dashboard/teacher-sidebar"
import { useRouter } from "next/navigation"

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
        router.push('/?authError=Please login as a teacher')
        return
      }

      try {
        // Verify token with the server
        const response = await fetch('/api/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!response.ok) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          router.push('/?authError=Session expired. Please login again')
          return
        }
      } catch (error) {
        console.error('Auth check error:', error)
        router.push('/?authError=Authentication failed')
        return
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <TeacherNavigation onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <TeacherSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="p-4 md:ml-64 pt-20 min-h-screen">
        <div className="p-4 bg-white dark:bg-slate-950 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 min-h-[calc(100vh-7rem)]">
          {children}
        </div>
      </div>
    </div>
  )
}