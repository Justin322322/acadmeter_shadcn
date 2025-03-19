"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { 
  ClockIcon, 
  DocumentCheckIcon, 
  UserIcon, 
  DocumentPlusIcon, 
  UserGroupIcon 
} from "@heroicons/react/24/outline"

export function RecentActivity() {
  const activities = [
    {
      title: "Grade Report Submitted",
      description: "Emma Thompson submitted Mathematics grade report",
      timeAgo: "5 minutes ago",
      icon: DocumentCheckIcon,
      iconBackground: "bg-green-50 dark:bg-green-950/50",
      iconColor: "text-green-600 dark:text-green-500"
    },
    {
      title: "Student Profile Updated",
      description: "John Davis updated Emily Parker's profile information",
      timeAgo: "10 minutes ago",
      icon: UserIcon,
      iconBackground: "bg-blue-50 dark:bg-blue-950/50",
      iconColor: "text-blue-600 dark:text-blue-500"
    },
    {
      title: "New Assessment Created",
      description: "Sarah Wilson created Science Quiz for Grade 10",
      timeAgo: "25 minutes ago",
      icon: DocumentPlusIcon,
      iconBackground: "bg-violet-50 dark:bg-violet-950/50",
      iconColor: "text-violet-600 dark:text-violet-500"
    },
    {
      title: "Class Attendance Updated",
      description: "Michael Brown marked attendance for English Class",
      timeAgo: "1 hour ago",
      icon: UserGroupIcon,
      iconBackground: "bg-amber-50 dark:bg-amber-950/50",
      iconColor: "text-amber-600 dark:text-amber-500"
    },
    {
      title: "Performance Report Generated",
      description: "System generated monthly performance report for Grade 9",
      timeAgo: "2 hours ago",
      icon: DocumentCheckIcon,
      iconBackground: "bg-green-50 dark:bg-green-950/50",
      iconColor: "text-green-600 dark:text-green-500"
    },
    {
      title: "New Student Enrolled",
      description: "Alex Johnson enrolled in Grade 10 Science Class",
      timeAgo: "3 hours ago",
      icon: UserIcon,
      iconBackground: "bg-blue-50 dark:bg-blue-950/50",
      iconColor: "text-blue-600 dark:text-blue-500"
    },
    {
      title: "Assignment Deadline Updated",
      description: "Physics Assignment deadline extended to next week",
      timeAgo: "4 hours ago",
      icon: DocumentPlusIcon,
      iconBackground: "bg-violet-50 dark:bg-violet-950/50",
      iconColor: "text-violet-600 dark:text-violet-500"
    },
    {
      title: "Parent Meeting Scheduled",
      description: "Parent-teacher meeting scheduled for Grade 8",
      timeAgo: "5 hours ago",
      icon: UserGroupIcon,
      iconBackground: "bg-amber-50 dark:bg-amber-950/50",
      iconColor: "text-amber-600 dark:text-amber-500"
    }
  ]

  return (
    <Card className="border-slate-200 dark:border-slate-800">
      <CardHeader className="p-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">
            <ClockIcon className="w-5 h-5 text-blue-600 dark:text-blue-500" />
          </div>
          <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 scrollbar-track-transparent hover:scrollbar-thumb-slate-300 dark:hover:scrollbar-thumb-slate-700">
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {activities.map((activity, index) => (
            <div 
              key={index} 
              className="flex items-start gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className={`p-2 rounded-lg shrink-0 ${activity.iconBackground}`}>
                <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-white">{activity.title}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{activity.description}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{activity.timeAgo}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}