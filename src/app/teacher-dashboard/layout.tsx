"use client"

import { useState } from "react"
import { TeacherNavigation } from "@/components/ui/teacher_dashboard/teacher-navigation"
import { TeacherSidebar } from "@/components/ui/teacher_dashboard/teacher-sidebar"

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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