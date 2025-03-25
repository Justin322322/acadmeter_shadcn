"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline"

type Activity = {
  id: string
  type: 'grade' | 'feedback' | 'assignment' | 'attendance' | 'announcement'
  title: string
  description: string
  timestamp: string
  status?: 'success' | 'warning' | 'pending'
  subject?: string
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'grade',
    title: 'Math Quiz Grades Updated',
    description: 'Posted grades for 28 students in Mathematics',
    timestamp: '2 hours ago',
    status: 'success',
    subject: 'Mathematics'
  },
  {
    id: '2',
    type: 'feedback',
    title: 'Student Feedback',
    description: 'Provided detailed feedback on Physics project submissions',
    timestamp: '3 hours ago',
    status: 'success',
    subject: 'Physics'
  },
  {
    id: '3',
    type: 'assignment',
    title: 'New Assignment Created',
    description: 'Posted new assignment for Literature Analysis',
    timestamp: '5 hours ago',
    status: 'pending',
    subject: 'English'
  },
  {
    id: '4',
    type: 'attendance',
    title: 'Attendance Marked',
    description: 'Updated attendance for morning classes',
    timestamp: '6 hours ago',
    status: 'warning',
    subject: 'All'
  },
]

export function RecentActivity() {
  const [filter, setFilter] = useState<Activity['type'] | 'all'>('all')
  const [subjectFilter, setSubjectFilter] = useState<string>('all')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const subjects = Array.from(new Set(activities.map(a => a.subject || 'All')))
  const filteredActivities = activities.filter(activity => 
    (filter === 'all' || activity.type === filter) &&
    (subjectFilter === 'all' || activity.subject === subjectFilter)
  )

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'grade':
        return AcademicCapIcon
      case 'feedback':
        return ChatBubbleLeftRightIcon
      case 'assignment':
        return DocumentTextIcon
      case 'attendance':
        return ClockIcon
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

  return (
    <div className="space-y-4">
      {/* Desktop Filters */}
      <div className="hidden md:flex flex-wrap items-center gap-2 justify-between">
        <div className="flex flex-wrap gap-2">
          {['all', 'grade', 'feedback', 'assignment', 'attendance', 'announcement'].map((type) => (
            <Button
              key={type}
              size="sm"
              variant={filter === type ? 'default' : 'outline'}
              onClick={() => setFilter(type as Activity['type'] | 'all')}
            >
              {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          {subjects.map((subject) => (
            <Button
              key={subject}
              size="sm"
              variant={subjectFilter === subject ? 'default' : 'outline'}
              onClick={() => setSubjectFilter(subject)}
            >
              {subject}
            </Button>
          ))}
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="md:hidden space-y-2">
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
        >
          <span>Filters</span>
          <ChevronDownIcon className={`h-4 w-4 transition-transform ${mobileFiltersOpen ? 'rotate-180' : ''}`} />
        </Button>
        
        {mobileFiltersOpen && (
          <div className="space-y-3 p-3 border rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <div>
              <h4 className="text-sm font-medium mb-2">Activity Type</h4>
              <div className="grid grid-cols-2 gap-2">
                {['all', 'grade', 'feedback', 'assignment', 'attendance', 'announcement'].map((type) => (
                  <Button
                    key={type}
                    size="sm"
                    variant={filter === type ? 'default' : 'outline'}
                    onClick={() => {
                      setFilter(type as Activity['type'] | 'all')
                      setMobileFiltersOpen(false)
                    }}
                    className="w-full"
                  >
                    {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Subject</h4>
              <div className="grid grid-cols-2 gap-2">
                {subjects.map((subject) => (
                  <Button
                    key={subject}
                    size="sm"
                    variant={subjectFilter === subject ? 'default' : 'outline'}
                    onClick={() => {
                      setSubjectFilter(subject)
                      setMobileFiltersOpen(false)
                    }}
                    className="w-full"
                  >
                    {subject}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Activity Cards */}
      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Recent Activities
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {filter === 'all' ? 'All activity types' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} activities`}
              {subjectFilter !== 'all' ? ` in ${subjectFilter}` : ''}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {filteredActivities.length} {filteredActivities.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {filteredActivities.map((activity) => {
            const Icon = getIcon(activity.type)
            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
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
                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                    {activity.timestamp}
                  </p>
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
    </div>
  )
}