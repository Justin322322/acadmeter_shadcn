"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { UserIcon, ArrowLeftOnRectangleIcon, BellIcon, Bars3Icon } from "@heroicons/react/24/outline"

interface AdminNavigationProps {
  onToggleSidebar: () => void
}

export function AdminNavigation({ onToggleSidebar }: AdminNavigationProps) {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-slate-200 dark:bg-slate-950 dark:border-slate-800">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="inline-flex items-center p-2 text-sm text-slate-500 rounded-lg md:hidden hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:text-slate-400 dark:hover:bg-slate-800 dark:focus:ring-slate-600"
            >
              <Bars3Icon className="w-6 h-6" />
            </Button>
            <Link href="/dashboard" className="flex ms-2 md:me-24 gap-2 items-center">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                AcadMeter
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative hidden sm:inline-flex"
            >
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <div className="flex items-center gap-4 ms-3">
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-medium text-slate-900 dark:text-white">Admin User</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Administrator</span>
                </div>
                <Button variant="ghost" size="icon">
                  <UserIcon className="w-5 h-5" />
                </Button>
              </div>
              <ThemeToggle />
              <div className="border-l border-slate-200 dark:border-slate-700 h-6 mx-2"></div>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50"
              >
                <ArrowLeftOnRectangleIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}