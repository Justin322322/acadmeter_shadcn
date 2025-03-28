"use client"

import { useState } from "react"
import { AdminNavigation } from "@/components/ui/dashboard/admin-navigation"
import { Sidebar } from "@/components/ui/dashboard/sidebar"

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
      
      <main 
        className="transition-all duration-200 ease-in-out p-3 sm:p-4 md:ml-64 pt-16 sm:pt-20 min-h-screen"
        id="main-content"
        role="main"
        aria-label="Admin dashboard main content"
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}