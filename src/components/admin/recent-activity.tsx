"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline"

type Activity = {
  id: string
  type: 'user' | 'content' | 'system' | 'security'
  title: string
  description: string
  timestamp: string
  status?: 'success' | 'warning' | 'pending'
  user?: string
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'user',
    title: 'New User Registration',
    description: 'Robert Williams signed up as Editor',
    timestamp: '2025-03-28T09:45:22',
    status: 'pending',
    user: 'r.williams@example.com'
  },
  {
    id: '2',
    type: 'content',
    title: 'Content Updated',
    description: 'Michael Chen updated article "Getting Started with Our Platform"',
    timestamp: '2025-03-28T09:15:45',
    status: 'success',
    user: 'm.chen@example.com'
  },
  {
    id: '3',
    type: 'system',
    title: 'System Backup',
    description: 'Weekly system backup completed successfully',
    timestamp: '2025-03-28T06:00:12',
    status: 'success'
  },
  {
    id: '4',
    type: 'security',
    title: 'Failed Login Attempts',
    description: 'Multiple failed login attempts detected for j.thompson@example.com',
    timestamp: '2025-03-28T05:42:18',
    status: 'warning'
  },
  {
    id: '5',
    type: 'content',
    title: 'New Content Created',
    description: 'Admin User created new page "Privacy Policy"',
    timestamp: '2025-03-27T15:32:54',
    status: 'success',
    user: 'admin@example.com'
  },
  {
    id: '6',
    type: 'user',
    title: 'User Profile Updated',
    description: 'Emily Chen updated their profile information',
    timestamp: '2025-03-27T14:22:36',
    status: 'success',
    user: 'e.chen@example.com'
  },
  {
    id: '7',
    type: 'security',
    title: 'API Key Generated',
    description: 'New API key generated for integration',
    timestamp: '2025-03-27T12:15:30',
    status: 'success',
    user: 'admin@example.com'
  },
  {
    id: '8',
    type: 'system',
    title: 'System Update',
    description: 'System updated to version 2.5.0',
    timestamp: '2025-03-27T10:45:12',
    status: 'success'
  }
]

export function RecentActivity() {
  const [filter, setFilter] = useState<Activity['type'] | 'all'>('all')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const filteredActivities = activities.filter(activity => 
    filter === 'all' || activity.type === filter
  )

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'user':
        return UserCircleIcon
      case 'content':
        return DocumentTextIcon
      case 'system':
        return ClockIcon
      case 'security':
        return ExclamationCircleIcon
      default:
        return DocumentTextIcon
    }
  }

  const getStatusIcon = (status?: Activity['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />
      case 'warning':
        return <ExclamationCircleIcon className="w-5 h-5 text-amber-500" />
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-blue-500" />
      default:
        return null
    }
  }

  // Format timestamp to relative time
  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const date = new Date(timestamp)
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

  return (
    <div className="space-y-4">
      {/* Desktop Filters */}
      <div className="hidden md:flex flex-wrap items-center gap-2 justify-between">
        <div className="flex flex-wrap gap-2">
          {['all', 'user', 'content', 'system', 'security'].map((type) => (
            <Button
              key={type}
              size="sm"
              variant={filter === type ? 'default' : 'outline'}
              onClick={() => setFilter(type as Activity['type'] | 'all')}
              className={filter === type ? '' : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}
            >
              {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="md:hidden space-y-2">
        <Button
          variant="outline"
          className="w-full justify-between border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
        >
          <span>Filter by: {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
          <ChevronDownIcon className={`h-4 w-4 transition-transform ${mobileFiltersOpen ? 'rotate-180' : ''}`} />
        </Button>
        
        {mobileFiltersOpen && (
          <div className="space-y-1 p-2 border rounded-lg bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
            {['all', 'user', 'content', 'system', 'security'].map((type) => (
              <Button
                key={type}
                size="sm"
                variant={filter === type ? 'default' : 'outline'}
                className={`w-full justify-start ${filter === type ? '' : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                onClick={() => {
                  setFilter(type as Activity['type'] | 'all')
                  setMobileFiltersOpen(false)
                }}
              >
                {type === 'all' ? 'All Activities' : type.charAt(0).toUpperCase() + type.slice(1) + ' Activities'}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Activity List */}
      <div className="space-y-3">
        {filteredActivities.map((activity) => {
          const Icon = getIcon(activity.type)
          
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700">
                <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {activity.title}
                  </p>
                  {activity.status && getStatusIcon(activity.status)}
                </div>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {activity.description}
                </p>
                <div className="mt-2 flex items-center gap-3 text-xs">
                  <span className="text-slate-400 dark:text-slate-500">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                  {activity.user && (
                    <>
                      <span className="text-slate-300 dark:text-slate-600">•</span>
                      <span className="text-slate-500 dark:text-slate-400">
                        {activity.user}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}
        {filteredActivities.length === 0 && (
          <div className="text-center py-6 text-slate-500 dark:text-slate-400">
            No matching activities found
          </div>
        )}
      </div>
    </div>
  )
}