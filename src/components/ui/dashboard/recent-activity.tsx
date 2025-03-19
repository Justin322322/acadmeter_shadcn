"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { UserCircleIcon, ClockIcon } from "@heroicons/react/24/outline"

export function RecentActivity() {
  const activities = [
    {
      user: "Emma Thompson",
      action: "Submitted grade report",
      subject: "Mathematics",
      time: "5 minutes ago",
      type: "success"
    },
    {
      user: "John Davis",
      action: "Updated student profile",
      subject: "Emily Parker",
      time: "10 minutes ago",
      type: "update"
    },
    {
      user: "Sarah Wilson",
      action: "Created new assessment",
      subject: "Science Quiz",
      time: "25 minutes ago",
      type: "create"
    },
    {
      user: "Michael Brown",
      action: "Added attendance record",
      subject: "English Class",
      time: "1 hour ago",
      type: "info"
    },
  ]

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-400'
      case 'update':
        return 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400'
      case 'create':
        return 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400'
      default:
        return 'bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-400'
    }
  }

  return (
    <Card className="h-full border-slate-200 dark:border-slate-800">
      <CardHeader className="p-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
              <ClockIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </div>
            <CardTitle className="text-base font-semibold">
              Recent Activity
            </CardTitle>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 font-medium">
            View All
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {activities.map((activity, index) => (
            <div 
              key={index}
              className="flex items-start gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className={`mt-1 p-2 rounded-full ${getTypeStyles(activity.type)}`}>
                <UserCircleIcon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {activity.user}
                  </p>
                  <span className="flex-shrink-0 text-xs text-slate-500 dark:text-slate-400">
                    {activity.time}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {activity.action} - <span className="font-medium">{activity.subject}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}