"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PredictiveAnalytics } from "@/components/ui/teacher_dashboard/predictive-analytics"
import { 
  UserGroupIcon, 
  ClipboardDocumentCheckIcon, 
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  DocumentTextIcon,
  PlusIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline"

export default function TeacherDashboardPage() {
  const stats = [
    {
      title: "Total Students",
      value: "128",
      change: "+12",
      trend: "up",
      icon: UserGroupIcon,
      color: "text-blue-600 dark:text-blue-500",
      background: "bg-blue-50 dark:bg-blue-950/50"
    },
    {
      title: "Assignments Due",
      value: "8",
      change: "+3",
      trend: "up",
      icon: ClipboardDocumentCheckIcon,
      color: "text-violet-600 dark:text-violet-500",
      background: "bg-violet-50 dark:bg-violet-950/50"
    },
    {
      title: "Class Average",
      value: "76.5%",
      change: "+2.1%",
      trend: "up",
      icon: ChartBarIcon,
      color: "text-green-600 dark:text-green-500",
      background: "bg-green-50 dark:bg-green-950/50"
    },
    {
      title: "At Risk Students",
      value: "12",
      change: "-2",
      trend: "down",
      icon: ExclamationTriangleIcon,
      color: "text-red-600 dark:text-red-500",
      background: "bg-red-50 dark:bg-red-950/50"
    }
  ]

  const quickActions = [
    {
      title: "New Assignment",
      icon: PlusIcon,
      color: "text-blue-600 dark:text-blue-500",
      background: "bg-blue-50 dark:bg-blue-950/50",
      href: "/teacher-dashboard/assignments"
    },
    {
      title: "Grade Submissions",
      icon: DocumentTextIcon,
      color: "text-violet-600 dark:text-violet-500",
      background: "bg-violet-50 dark:bg-violet-950/50",
      href: "/teacher-dashboard/grades"
    },
    {
      title: "View Classes",
      icon: BookOpenIcon,
      color: "text-green-600 dark:text-green-500",
      background: "bg-green-50 dark:bg-green-950/50",
      href: "/teacher-dashboard/classes"
    },
    {
      title: "Student Reports",
      icon: AcademicCapIcon,
      color: "text-amber-600 dark:text-amber-500",
      background: "bg-amber-50 dark:bg-amber-950/50",
      href: "/teacher-dashboard/reports"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Teacher Dashboard</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Welcome back! Here's an overview of your classes and at-risk students.</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center gap-2">
                <div className={`p-3 rounded-lg ${action.background}`}>
                  <action.icon className={`w-6 h-6 ${action.color}`} />
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{action.title}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className="border-slate-200 dark:border-slate-800"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stat.background}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {stat.title}
                    </h3>
                    <p className="text-2xl font-semibold text-slate-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 ${stat.trend === 'up' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                  <ArrowTrendingUpIcon className={`w-5 h-5 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Predictive Analytics */}
      <PredictiveAnalytics />
    </div>
  )
}