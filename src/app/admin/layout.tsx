"use client"

import { useState } from "react"
import { AdminNavigation } from "@/components/admin/admin-navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AuthProvider } from "@/contexts/auth-context"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <AdminNavigation onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
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
    </AuthProvider>
  )
}