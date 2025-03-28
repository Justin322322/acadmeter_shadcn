"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BellIcon,
  XMarkIcon,
  UserPlusIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  UserIcon,
  ChartBarIcon,
  BookOpenIcon
} from "@heroicons/react/24/outline"

interface AdminNotification {
  id: string
  type: 'user-signup' | 'system' | 'security' | 'data-export' | 'roster-update' | 'grade-posting'
  title: string
  message: string
  date: string
  read: boolean
  priority?: 'high' | 'medium' | 'low'
  action?: {
    type: 'link' | 'button'
    label: string
    href?: string
    onClick?: () => void
  }
  metadata?: {
    user?: string
    userRole?: string
    timestamp?: string
    ip?: string
  }
}

export function AdminNotificationCenter() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([
    {
      id: "1",
      type: "user-signup",
      title: "New User Sign-up Request",
      message: "Maria Johnson requested teacher account approval",
      date: "2025-03-28T09:45:22",
      read: false,
      priority: "high",
      metadata: {
        user: "maria.johnson@school.edu",
        userRole: "Teacher",
        timestamp: "2025-03-28T09:45:22",
        ip: "192.168.1.42"
      },
      action: {
        type: "link",
        label: "Review Request",
        href: "/dashboard/users"
      }
    },
    {
      id: "2",
      type: "grade-posting",
      title: "Bulk Grade Posting",
      message: "Mr. Thompson posted grades for Mathematics Quiz 3",
      date: "2025-03-28T09:15:45",
      read: false,
      metadata: {
        user: "thompson@school.edu",
        userRole: "Teacher",
        timestamp: "2025-03-28T09:15:45",
        ip: "192.168.1.67"
      },
      action: {
        type: "link",
        label: "View Details",
        href: "/dashboard/reports"
      }
    },
    {
      id: "3",
      type: "system",
      title: "System Backup Completed",
      message: "Weekly system backup completed successfully",
      date: "2025-03-28T06:00:12",
      read: true,
      priority: "low",
      metadata: {
        timestamp: "2025-03-28T06:00:12"
      }
    },
    {
      id: "4",
      type: "security",
      title: "Failed Login Attempts",
      message: "Multiple failed login attempts detected",
      date: "2025-03-28T05:42:18",
      read: false,
      priority: "high",
      metadata: {
        user: "admin@acadmeter.com",
        timestamp: "2025-03-28T05:42:18",
        ip: "203.0.113.42"
      },
      action: {
        type: "link",
        label: "Security Logs",
        href: "/dashboard/settings"
      }
    },
    {
      id: "5",
      type: "roster-update",
      title: "Class Roster Updated",
      message: "New subjects added to High School 9-A roster",
      date: "2025-03-27T15:32:54",
      read: false,
      metadata: {
        user: "admin@acadmeter.com",
        userRole: "Admin",
        timestamp: "2025-03-27T15:32:54"
      },
      action: {
        type: "link",
        label: "View Roster",
        href: "/dashboard/class-rosters"
      }
    },
    {
      id: "6",
      type: "data-export",
      title: "Data Export Completed",
      message: "Grade reports exported for academic review",
      date: "2025-03-27T14:22:36",
      read: true,
      metadata: {
        user: "james.smith@school.edu",
        userRole: "Teacher",
        timestamp: "2025-03-27T14:22:36",
        ip: "192.168.1.54"
      }
    }
  ])

  const getIcon = (type: AdminNotification['type']) => {
    switch (type) {
      case 'user-signup':
        return UserPlusIcon
      case 'system':
        return Cog6ToothIcon
      case 'security':
        return ShieldCheckIcon
      case 'data-export':
        return ChartBarIcon
      case 'roster-update':
        return BookOpenIcon
      case 'grade-posting':
        return UserIcon
      default:
        return BellIcon
    }
  }

  const getIconBg = (type: AdminNotification['type']) => {
    switch (type) {
      case 'user-signup':
        return 'bg-blue-50 text-blue-500 dark:bg-blue-950/50 dark:text-blue-400'
      case 'system':
        return 'bg-slate-50 text-slate-500 dark:bg-slate-950/50 dark:text-slate-400'
      case 'security':
        return 'bg-red-50 text-red-500 dark:bg-red-950/50 dark:text-red-400'
      case 'data-export':
        return 'bg-amber-50 text-amber-500 dark:bg-amber-950/50 dark:text-amber-400'
      case 'roster-update':
        return 'bg-violet-50 text-violet-500 dark:bg-violet-950/50 dark:text-violet-400'
      case 'grade-posting':
        return 'bg-green-50 text-green-500 dark:bg-green-950/50 dark:text-green-400'
      default:
        return 'bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
    }
  }

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const handleDismiss = (notificationId: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== notificationId)
    )
  }

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffMs = now.getTime() - date.getTime()
    
    const diffMins = Math.floor(diffMs / (1000 * 60))
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`
    
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
    
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays < 30) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
    
    const diffMonths = Math.floor(diffDays / 30)
    return `${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-sm w-[350px] md:w-[450px]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <BellIcon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                  {unreadCount}
                </span>
              )}
            </div>
            <CardTitle className="text-base">Admin Notifications</CardTitle>
          </div>
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" className="text-xs" onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0 max-h-[500px] overflow-auto">
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {notifications.length > 0 ? (
            notifications.map((notification) => {
              const Icon = getIcon(notification.type)
              return (
                <div
                  key={notification.id}
                  className={`p-4 flex items-start gap-3 ${
                    !notification.read ? 'bg-slate-50 dark:bg-slate-800/50' : ''
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${getIconBg(notification.type)}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {notification.title}
                        </h4>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          {notification.message}
                        </p>
                        {notification.metadata && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {notification.metadata.user && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                <UserIcon className="w-3 h-3" />
                                {notification.metadata.user}
                              </span>
                            )}
                            {notification.metadata.ip && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                IP: {notification.metadata.ip}
                              </span>
                            )}
                            {notification.priority === 'high' && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                                High Priority
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                        onClick={() => handleDismiss(notification.id)}
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {notification.action && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => {
                              if (notification.action?.onClick) {
                                notification.action.onClick()
                              }
                              handleMarkAsRead(notification.id)
                            }}
                          >
                            {notification.action.label}
                          </Button>
                        )}
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <CheckCircleIcon className="w-3 h-3 mr-1" />
                            Mark as read
                          </Button>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400" title={formatDateTime(notification.date)}>
                        {formatTimeAgo(notification.date)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="p-4 text-center text-slate-500 dark:text-slate-400">
              No new notifications
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}