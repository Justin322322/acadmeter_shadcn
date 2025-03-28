"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  HomeIcon,
  UsersIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
  BookOpenIcon,
  BellIcon,
} from "@heroicons/react/24/outline"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Users", href: "/dashboard/users", icon: UsersIcon },
  { name: "User Logs", href: "/dashboard/user-logs", icon: ClipboardDocumentListIcon },
  { name: "Class Rosters", href: "/dashboard/class-rosters", icon: BookOpenIcon },
  { name: "Reports", href: "/dashboard/reports", icon: DocumentChartBarIcon },
  { name: "Settings", href: "/dashboard/settings", icon: Cog6ToothIcon },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
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
                <Cog6ToothIcon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Admin Portal
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage system & users
              </p>
            </div>
          </div>

          <ul className="space-y-1 font-medium">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/dashboard' && pathname.startsWith(item.href))
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => onClose()}
                    className={`flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 group ${isActive ? 'bg-slate-100 text-blue-600 dark:bg-slate-800 dark:text-blue-500' : 'text-slate-900 dark:text-slate-300'}`}
                  >
                    <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-blue-600 dark:text-blue-500' : 'text-slate-500 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-white'}`} />
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
                    A
                  </div>
                  <span className="bottom-0 left-7 absolute w-3 h-3 bg-emerald-500 border-2 border-background rounded-full"></span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate dark:text-white">
                  Admin User
                </p>
                <p className="text-xs text-slate-500 truncate dark:text-slate-400">
                  admin@acadmeter.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}