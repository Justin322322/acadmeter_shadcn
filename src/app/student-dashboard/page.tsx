"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { NotificationCenter } from "@/components/ui/student_dashboard/notification-center"
import {
  AcademicCapIcon,
  ChartBarIcon,
  BookOpenIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  DocumentChartBarIcon
} from "@heroicons/react/24/outline"

export default function StudentDashboardPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("semester")

  // Quick stats for the dashboard
  const quickStats = [
    {
      title: "Overall GPA",
      value: "3.8",
      change: "+0.2",
      trend: "up",
      icon: AcademicCapIcon,
      color: "text-blue-600 dark:text-blue-500",
      background: "bg-blue-50 dark:bg-blue-950/50"
    },
    {
      title: "Attendance Rate",
      value: "95%",
      change: "+2%",
      trend: "up",
      icon: ClockIcon,
      color: "text-green-600 dark:text-green-500",
      background: "bg-green-50 dark:bg-green-950/50"
    },
    {
      title: "Completion Rate",
      value: "45/48",
      change: "93.75%",
      trend: "stable",
      icon: DocumentChartBarIcon,
      color: "text-violet-600 dark:text-violet-500",
      background: "bg-violet-50 dark:bg-violet-950/50"
    },
    {
      title: "Class Rank",
      value: "#5",
      change: "+2",
      trend: "up",
      icon: ChartBarIcon,
      color: "text-amber-600 dark:text-amber-500",
      background: "bg-amber-50 dark:bg-amber-950/50"
    }
  ]

  const features = [
    {
      title: "Current Grades",
      description: "View your current grades and assessments",
      icon: DocumentChartBarIcon,
      href: "/student-dashboard/grades",
      color: "text-blue-600 dark:text-blue-500",
      background: "bg-blue-50 dark:bg-blue-950/50",
      action: "View Grades"
    },
    {
      title: "Analytics",
      description: "Track your academic progress",
      icon: ChartBarIcon,
      href: "/student-dashboard/analytics",
      color: "text-violet-600 dark:text-violet-500",
      background: "bg-violet-50 dark:bg-violet-950/50",
      action: "View Analytics"
    },
    {
      title: "Attendance",
      description: "Check your attendance records",
      icon: ClockIcon,
      href: "/student-dashboard/attendance",
      color: "text-green-600 dark:text-green-500",
      background: "bg-green-50 dark:bg-green-950/50",
      action: "View Records"
    },
    {
      title: "Academic Reports",
      description: "View detailed performance reports",
      icon: DocumentTextIcon,
      href: "/student-dashboard/reports",
      color: "text-amber-600 dark:text-amber-500",
      background: "bg-amber-50 dark:bg-amber-950/50",
      action: "View Reports"
    },
    {
      title: "Submit Feedback",
      description: "Provide course feedback",
      icon: ChatBubbleLeftRightIcon,
      href: "/student-dashboard/feedback",
      color: "text-pink-600 dark:text-pink-500",
      background: "bg-pink-50 dark:bg-pink-950/50",
      action: "Give Feedback"
    },
    {
      title: "Schedule",
      description: "View your class schedule",
      icon: CalendarIcon,
      href: "/student-dashboard/schedule",
      color: "text-indigo-600 dark:text-indigo-500",
      background: "bg-indigo-50 dark:bg-indigo-950/50",
      action: "View Schedule"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Student Dashboard</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Track your academic progress and performance</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="w-full sm:w-auto bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            aria-label="Select timeframe"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="semester">This Semester</option>
            <option value="year">This Year</option>
          </select>
          <Button variant="outline" size="sm" className="w-full sm:w-auto gap-2">
            <CalendarIcon className="w-4 h-4" aria-hidden="true" />
            <span>Calendar</span>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${stat.background}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} aria-hidden="true" />
                </div>
                <div className={`flex items-center gap-1 ${
                  stat.trend === 'up'
                    ? 'text-green-600 dark:text-green-500'
                    : stat.trend === 'down'
                    ? 'text-red-600 dark:text-red-500'
                    : 'text-slate-600 dark:text-slate-400'
                }`}>
                  {stat.trend === 'up' && <ArrowTrendingUpIcon className="w-4 h-4" />}
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
              </div>
              <div className="mt-3">
                <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</h3>
                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {features.map((feature, index) => (
          <a
            key={index}
            href={feature.href}
            className="flex items-start p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            aria-label={`Access ${feature.title}`}
          >
            <div className={`p-2 mr-3 rounded-lg ${feature.background}`}>
              <feature.icon className={`w-5 h-5 ${feature.color}`} aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">{feature.title}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{feature.description}</p>
              <p className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-500">{feature.action} →</p>
            </div>
          </a>
        ))}
      </div>

      {/* Recent Activity and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-slate-200 dark:border-slate-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                <ChartBarIcon className="w-5 h-5 text-blue-600 dark:text-blue-500" />
              </div>
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest academic activities and updates</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Recent activity content will go here */}
              <div className="text-center py-8 text-sm text-slate-500 dark:text-slate-400">
                No recent activities to display
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-1">
          <NotificationCenter />
        </div>
      </div>
    </div>
  )
}