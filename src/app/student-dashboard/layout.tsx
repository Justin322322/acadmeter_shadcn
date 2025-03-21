"use client"

import { useState } from "react"
import { StudentNavigation } from "@/components/ui/student_dashboard/student-navigation"
import { StudentSidebar } from "@/components/ui/student_dashboard/student-sidebar"

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <StudentNavigation onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="p-4 md:ml-64 pt-20 min-h-screen">
        <div className="p-4 bg-white dark:bg-slate-950 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 min-h-[calc(100vh-7rem)]">
          {children}
        </div>
      </div>
    </div>
  )
}