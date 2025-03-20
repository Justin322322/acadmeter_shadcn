"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  HomeIcon,
  UserGroupIcon,
  DocumentChartBarIcon,
  ClockIcon,
  ChartBarIcon,
  AcademicCapIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline"

const navigation = [
  { name: "Overview", href: "/teacher-dashboard", icon: HomeIcon },
  { name: "My Classes", href: "/teacher-dashboard/classes", icon: UserGroupIcon },
  { name: "Grades", href: "/teacher-dashboard/grades", icon: DocumentChartBarIcon },
  { name: "Assignments", href: "/teacher-dashboard/assignments", icon: DocumentTextIcon },
  { name: "Student Reports", href: "/teacher-dashboard/reports", icon: DocumentDuplicateIcon },
  { name: "Analytics", href: "/teacher-dashboard/analytics", icon: ChartBarIcon },
  { name: "Student Feedback", href: "/teacher-dashboard/feedback", icon: ChatBubbleLeftRightIcon },
  { name: "Settings", href: "/teacher-dashboard/settings", icon: Cog6ToothIcon },
]

interface TeacherSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function TeacherSidebar({ isOpen, onClose }: TeacherSidebarProps) {
  const pathname = usePathname()

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
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform md:translate-x-0 bg-white border-r border-slate-200 dark:bg-slate-950 dark:border-slate-800 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full px-3 pt-3 pb-4 overflow-y-auto">
          <div className="flex items-center px-3 py-3 mb-3 rounded-lg bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/50 dark:to-violet-950/50">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center">
                <AcademicCapIcon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Teacher Portal
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage your classes & students
              </p>
            </div>
          </div>

          <ul className="space-y-1 font-medium">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/teacher-dashboard' && pathname.startsWith(item.href))
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => onClose()}
                    className={`flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 group ${
                      isActive ? 'bg-slate-100 text-blue-600 dark:bg-slate-800 dark:text-blue-500' : 'text-slate-900 dark:text-slate-300'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 transition-colors ${
                      isActive 
                        ? 'text-blue-600 dark:text-blue-500' 
                        : 'text-slate-500 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-white'
                    }`} />
                    <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>
                      {item.name}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Profile Section */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4 group cursor-pointer p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white font-semibold text-sm">
                    T
                  </div>
                  <span className="bottom-0 left-7 absolute w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-950 rounded-full"></span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate dark:text-white">
                  Mr. Thompson
                </p>
                <p className="text-xs text-slate-500 truncate dark:text-slate-400">
                  Mathematics Teacher
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}