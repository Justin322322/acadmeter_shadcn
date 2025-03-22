"use client"

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon
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
  {
    id: '5',
    type: 'announcement',
    title: 'Class Announcement',
    description: 'Posted upcoming test schedule for next week',
    timestamp: '1 day ago',
    status: 'success',
    subject: 'All'
  }
]

export function RecentActivity() {
  const [filter, setFilter] = useState<Activity['type'] | 'all'>('all')
  const [subjectFilter, setSubjectFilter] = useState<string>('all')

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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {['all', 'grade', 'feedback', 'assignment', 'attendance', 'announcement'].map((type) => (
              <Button
                key={type}
                size="sm"
                variant={filter === type ? 'default' : 'outline'}
                onClick={() => setFilter(type as Activity['type'] | 'all')}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
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

          <div className="space-y-4">
            {filteredActivities.map((activity) => {
              const Icon = getIcon(activity.type)
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50"
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
          </div>
        </div>
      </CardContent>
    </Card>
  )
}