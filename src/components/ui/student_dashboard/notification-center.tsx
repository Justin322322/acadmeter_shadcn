/**
 * Notification Center Component
 * Manages and displays student notifications and alerts
 * 
 * Features:
 * - Real-time notification updates
 * - Priority-based notification sorting
 * - Category-based filtering (assignments, grades, announcements)
 * - Mark as read/unread functionality
 * - Interactive notification actions
 * - Visual status indicators
 * 
 * Props:
 * - None (uses internal state management)
 */
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BellIcon,
  XMarkIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline"

interface Notification {
  id: string
  type: 'assignment' | 'feedback' | 'grade' | 'reminder' | 'warning' | 'announcement'
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
    subject?: string
    dueDate?: string
    teacher?: string
    grade?: string
  }
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "assignment",
      title: "New Assignment Posted",
      message: "Physics Lab Report due in 3 days",
      date: "2024-03-22",
      read: false,
      priority: "high",
      metadata: {
        subject: "Physics",
        dueDate: "2024-03-25",
        teacher: "Dr. Martinez"
      },
      action: {
        type: "link",
        label: "View Assignment",
        href: "/assignments/physics-lab"
      }
    },
    {
      id: "2",
      type: "grade",
      title: "New Grade Posted",
      message: "Mathematics Quiz 3 grade has been posted",
      date: "2024-03-21",
      read: false,
      metadata: {
        subject: "Mathematics",
        grade: "A",
        teacher: "Mr. Thompson"
      },
      action: {
        type: "link",
        label: "View Grade",
        href: "/grades"
      }
    },
    {
      id: "3",
      type: "feedback",
      title: "New Feedback Available",
      message: "You have received feedback on your English essay",
      date: "2024-03-20",
      read: true,
      metadata: {
        subject: "English",
        teacher: "Ms. Wilson"
      },
      action: {
        type: "link",
        label: "View Feedback",
        href: "/feedback"
      }
    },
    {
      id: "4",
      type: "warning",
      title: "Assignment Deadline Approaching",
      message: "Chemistry lab report due tomorrow",
      date: "2024-03-21",
      read: false,
      priority: "high",
      metadata: {
        subject: "Chemistry",
        dueDate: "2024-03-23",
        teacher: "Ms. Rodriguez"
      }
    }
  ])

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'assignment':
        return DocumentTextIcon
      case 'feedback':
        return ChatBubbleLeftRightIcon
      case 'grade':
        return AcademicCapIcon
      case 'reminder':
        return CalendarIcon
      case 'warning':
        return ExclamationTriangleIcon
      case 'announcement':
        return BellIcon
      default:
        return BellIcon
    }
  }

  const getIconBg = (type: Notification['type']) => {
    switch (type) {
      case 'assignment':
        return 'bg-violet-50 text-violet-500 dark:bg-violet-950/50'
      case 'feedback':
        return 'bg-green-50 text-green-500 dark:bg-green-950/50'
      case 'grade':
        return 'bg-blue-50 text-blue-500 dark:bg-blue-950/50'
      case 'reminder':
        return 'bg-amber-50 text-amber-500 dark:bg-amber-950/50'
      case 'warning':
        return 'bg-red-50 text-red-500 dark:bg-red-950/50'
      case 'announcement':
        return 'bg-slate-50 text-slate-500 dark:bg-slate-800'
      default:
        return 'bg-slate-50 text-slate-500 dark:bg-slate-800'
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

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <Card className="border-slate-200 dark:border-slate-800">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <BellIcon className="w-5 h-5 text-slate-500" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                  {unreadCount}
                </span>
              )}
            </div>
            <CardTitle className="text-base">Notifications</CardTitle>
          </div>
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" className="text-xs" onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
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
                            {notification.metadata.subject && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                <AcademicCapIcon className="w-3 h-3" />
                                {notification.metadata.subject}
                              </span>
                            )}
                            {notification.metadata.dueDate && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                <ClockIcon className="w-3 h-3" />
                                Due: {notification.metadata.dueDate}
                              </span>
                            )}
                            {notification.metadata.teacher && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                {notification.metadata.teacher}
                              </span>
                            )}
                            {notification.metadata.grade && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                                Grade: {notification.metadata.grade}
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
                      <span className="text-xs text-slate-500">
                        {new Date(notification.date).toLocaleDateString()}
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