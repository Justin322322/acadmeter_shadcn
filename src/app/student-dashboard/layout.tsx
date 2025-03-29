/**
 * Student Dashboard Layout Component
 * Provides the main layout structure for the student portal
 */
"use client"

import { useState } from "react"
import { StudentNavigation } from "@/components/ui/student_dashboard/student-navigation"
import { StudentSidebar } from "@/components/ui/student_dashboard/student-sidebar"
import { AuthProvider } from "@/contexts/auth-context"

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <StudentNavigation onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main 
          className="transition-all duration-200 ease-in-out p-3 sm:p-4 md:ml-64 pt-16 sm:pt-20 min-h-screen"
          id="main-content"
          role="main"
          aria-label="Student dashboard main content"
        >
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </AuthProvider>
  )
}