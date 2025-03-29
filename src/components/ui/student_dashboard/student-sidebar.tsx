"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import {
  HomeIcon,
  AcademicCapIcon,
  DocumentChartBarIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"

const navigation = [
  { name: "Overview", href: "/student-dashboard", icon: HomeIcon },
  { name: "Grades", href: "/student-dashboard/grades", icon: DocumentChartBarIcon },
  { name: "Analytics", href: "/student-dashboard/analytics", icon: ChartBarIcon },
  { name: "Attendance", href: "/student-dashboard/attendance", icon: ClockIcon },
  { name: "Feedback", href: "/student-dashboard/feedback", icon: ChatBubbleLeftRightIcon },
  { name: "Settings", href: "/student-dashboard/settings", icon: Cog6ToothIcon },
]

interface StudentSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function StudentSidebar({ isOpen, onClose }: StudentSidebarProps) {
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
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform md:translate-x-0 bg-white dark:bg-slate-900/95 border-r border-slate-200 dark:border-slate-800 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Student sidebar navigation"
      >
        <div className="h-full px-3 pt-3 pb-4 overflow-y-auto">
          {/* Profile Header */}
          <div className="flex items-center px-3 py-3 mb-3 rounded-lg bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/50 dark:to-violet-950/50">
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white font-medium text-sm">
                  {user?.firstName?.[0]}
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Student
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1" aria-label="Main navigation">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/student-dashboard' && pathname.startsWith(item.href))
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => onClose()}
                  className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400' 
                      : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <item.icon 
                    className={`flex-shrink-0 w-5 h-5 transition-colors ${
                      isActive 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'
                    }`} 
                    aria-hidden="true" 
                  />
                  <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>
                    {item.name}
                  </span>
                  {isActive && (
                    <span 
                      className="absolute left-0 inset-y-0 w-1 bg-blue-600 dark:bg-blue-400 rounded-r-full" 
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
              Quick Stats
            </h4>
            <div className="mt-3 space-y-2">
              <div className="px-3 py-2">
                <div className="flex justify-between items-baseline">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Current GPA</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">3.8/4.0</p>
                </div>
                <div className="mt-2 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '95%' }} />
                </div>
              </div>
              <div className="px-3 py-2">
                <div className="flex justify-between items-baseline">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Attendance Rate</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">95%</p>
                </div>
                <div className="mt-2 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '95%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}