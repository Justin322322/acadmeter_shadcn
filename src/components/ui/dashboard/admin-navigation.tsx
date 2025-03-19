"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { UserIcon, ArrowLeftOnRectangleIcon, BellIcon, Bars3Icon } from "@heroicons/react/24/outline"

interface AdminNavigationProps {
  onToggleSidebar: () => void
}

export function AdminNavigation({ onToggleSidebar }: AdminNavigationProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
          <div className="flex items-center gap-4">
            <div className="relative" ref={notificationsRef}>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <BellIcon className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-slate-950 rounded-full"></span>
              </Button>
              {isNotificationsOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 max-w-[90vw] bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 transition-all duration-200 ease-out z-[60] max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div className="sticky top-0 p-3 border-b border-slate-200 dark:border-slate-800 bg-inherit">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">Notifications</h3>
                  </div>
                  <div className="p-3 space-y-4">
                    <div className="flex items-start gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">
                      <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">New user registration</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">A new user has registered to the platform</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">
                      <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">System Update</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">System maintenance scheduled for next week</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="relative" ref={profileRef}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative flex items-center gap-3 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500"
                aria-label="Open user menu"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 dark:bg-slate-800 flex items-center justify-center text-white font-semibold text-sm relative">
                  A
                </div>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-sm font-medium text-slate-900 dark:text-white truncate">Admin User</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 truncate">Administrator</span>
                </div>
              </Button>
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 max-w-[90vw] bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 transition-all duration-200 ease-out z-[60] max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div className="sticky top-0 p-3 border-b border-slate-200 dark:border-slate-800 bg-inherit">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-slate-800 flex items-center justify-center text-white font-semibold text-base shadow-sm">
                        A
                      </div>
                      <div className="flex flex-col">
                        <span className="text-base font-medium text-slate-900 dark:text-white">Admin User</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">Administrator</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                      onClick={() => {
                        setIsProfileOpen(false)
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4" />
                        <span>Profile</span>
                      </div>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                      onClick={() => {
                        setIsProfileOpen(false)
                        // Add logout logic here
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                        <span>Logout</span>
                      </div>
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}