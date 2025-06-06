"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import {
  HomeIcon,
  UsersIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ServerIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline"

const navigation = [
  { 
    name: "Dashboard", 
    href: "/admin", 
    icon: HomeIcon,
    description: "Overview"
  },
  { 
    name: "Users", 
    href: "/admin/users", 
    icon: UsersIcon,
    description: "User management"
  },
  { 
    name: "Content", 
    href: "/admin/content", 
    icon: DocumentTextIcon,
    description: "Content management"
  },
  { 
    name: "Analytics", 
    href: "/admin/analytics", 
    icon: ChartBarIcon,
    description: "Reports & analytics"
  },
  { 
    name: "User Logs", 
    href: "/admin/user-logs", 
    icon: ClipboardDocumentListIcon,
    description: "Activity tracking"
  },
  { 
    name: "Settings", 
    href: "/admin/settings", 
    icon: Cog6ToothIcon,
    description: "System settings"
  },
]

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform md:translate-x-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Admin sidebar navigation"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          {/* Profile Summary */}
          <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium text-sm">
                    {user?.firstName?.[0] || 'A'}
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {user ? `${user.firstName} ${user.lastName}` : 'Admin User'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  Administrator
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1" aria-label="Main navigation">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/admin' && pathname.startsWith(item.href))
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => onClose()}
                  className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400' 
                      : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <item.icon 
                    className={`flex-shrink-0 w-5 h-5 transition-colors ${
                      isActive 
                        ? 'text-indigo-600 dark:text-indigo-400' 
                        : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'
                    }`} 
                    aria-hidden="true" 
                  />
                  <div className="flex-1 min-w-0">
                    <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>
                      {item.name}
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {item.description}
                    </p>
                  </div>
                  {isActive && (
                    <span 
                      className="absolute left-0 inset-y-0 w-1 bg-indigo-600 dark:bg-indigo-400 rounded-r-full" 
                      aria-hidden="true"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Quick Stats */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <h4 className="px-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              System Status
            </h4>
            <div className="mt-3 space-y-2">
              <div className="px-3 py-2">
                <div className="flex justify-between items-baseline">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Server Load</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">24%</p>
                </div>
                <div className="mt-2 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '24%' }} />
                </div>
              </div>
              <div className="px-3 py-2">
                <div className="flex justify-between items-baseline">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Memory Usage</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">68%</p>
                </div>
                <div className="mt-2 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: '68%' }} />
                </div>
              </div>
              <div className="px-3 py-2">
                <div className="flex justify-between items-baseline">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Disk Space</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">42%</p>
                </div>
                <div className="mt-2 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '42%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}