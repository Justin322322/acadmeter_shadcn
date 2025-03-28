"use client"

import { useState } from "react"
import { Sidebar } from "@/components/ui/dashboard/sidebar"
import { AdminNavigation } from "@/components/ui/dashboard/admin-navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <AdminNavigation onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="p-3 md:p-4 md:ml-64 pt-16 md:pt-20 min-h-screen">
        <div className="p-3 md:p-4 bg-white dark:bg-slate-950 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 min-h-[calc(100vh-6rem)]">
          {children}
        </div>
      </div>
    </div>
  )
}