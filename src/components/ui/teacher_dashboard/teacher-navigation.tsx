/**
 * Teacher Navigation Component
 * Primary navigation bar for the teacher dashboard interface
 * 
 * Features:
 * - Responsive sidebar menu toggle for mobile devices
 * - Quick access to notifications and profile settings
 * - Theme switching capability
 * - Logout functionality with loading state
 * - Accessibility-focused icon usage
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onToggleSidebar - Function to toggle sidebar visibility
 */
"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { UserIcon, ArrowLeftOnRectangleIcon, BellIcon, Bars3Icon, AcademicCapIcon } from "@heroicons/react/24/outline"
import { useAuth } from "@/contexts/auth-context"

interface TeacherNavigationProps {
  onToggleSidebar: () => void
}

export function TeacherNavigation({ onToggleSidebar }: TeacherNavigationProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { user, logout } = useAuth()
  const profileRef = useRef<HTMLDivElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
    } catch (err) {
      console.error('Logout failed:', err)
    }
    setIsLoggingOut(false)
  }

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
    <nav className="fixed top-0 z-50 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="inline-flex items-center p-2 text-sm text-slate-500 rounded-lg md:hidden hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:focus:ring-blue-800"
            >
              <Bars3Icon className="w-6 h-6" />
            </Button>
            <Link href="/teacher-dashboard" className="flex ms-2 md:me-24 gap-2 items-center">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center">
                <AcademicCapIcon className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <span className="self-center text-xl font-semibold sm:text-xl whitespace-nowrap dark:text-white">
                AcadMeter
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative" ref={notificationsRef}>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                aria-label="Notifications"
              >
                <BellIcon className="w-5 h-5" aria-hidden="true" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 border border-white dark:border-slate-900 rounded-full"></span>
              </Button>
              {isNotificationsOpen && (
                <div className="fixed sm:absolute left-4 right-4 sm:left-auto sm:right-0 top-[calc(100%+0.5rem)] sm:w-80 max-h-[80vh] bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 overflow-y-auto">
                  <div className="sticky top-0 p-3 border-b border-slate-200 dark:border-slate-800 bg-inherit">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">Notifications</h3>
                  </div>
                  <div className="p-3 space-y-4">
                    <div className="flex items-start gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                      <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">New Submissions</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">5 students submitted assignments</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">2 min ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                      <div className="w-2 h-2 mt-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">Grade Reviews</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">2 grade review requests pending</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">1h ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <ThemeToggle />
            <div className="relative" ref={profileRef}>
              <Button 
                variant="ghost" 
                className="relative h-9 px-2 flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-full transition-colors"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-label="Open user menu"
              >
                <div className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white font-medium text-sm" aria-hidden="true">
                  {user?.firstName?.[0]}
                </div>
                <span className="hidden md:inline-flex text-sm font-medium text-slate-700 dark:text-slate-200">
                  {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
                </span>
              </Button>
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 max-w-[90vw] bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 z-[60]">
                  <div className="p-3 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user?.firstName} {user?.lastName}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">Teacher</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-9 px-2 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                      onClick={() => {
                        setIsProfileOpen(false)
                        router.push('/teacher-dashboard/settings')
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4" />
                        <span>Profile</span>
                      </div>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-9 px-2 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                      onClick={() => {
                        setIsProfileOpen(false)
                        handleLogout()
                      }}
                      disabled={isLoggingOut}
                    >
                      <div className="flex items-center gap-2">
                        {isLoggingOut ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-600 dark:border-slate-400 border-t-transparent" />
                            <span>Logging out...</span>
                          </>
                        ) : (
                          <>
                            <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                            <span>Logout</span>
                          </>
                        )}
                      </div>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}