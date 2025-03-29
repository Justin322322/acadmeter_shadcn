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

import { useState } from "react"
import { TeacherNavigation } from "@/components/ui/teacher_dashboard/teacher-navigation"
import { TeacherSidebar } from "@/components/ui/teacher_dashboard/teacher-sidebar"
import { AuthProvider } from "@/contexts/auth-context"

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AuthProvider>
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
    </AuthProvider>
  )
}