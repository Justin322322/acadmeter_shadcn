"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardChart } from "@/components/ui/dashboard/dashboard-chart"
import { ClassPerformanceChart } from "@/components/ui/dashboard/class-performance-chart"
import {
  UserGroupIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  ArrowTrendingUpIcon,
  BookOpenIcon,
  DocumentDuplicateIcon,
  BoltIcon,
  TableCellsIcon,
  ArrowDownTrayIcon,
  AdjustmentsHorizontalIcon,
  CalendarIcon
} from "@heroicons/react/24/outline"

export default function TeacherDashboardPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("semester")

  const quickStats = [
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
      title: "Active Classes",
      value: "5",
      change: "No change",
      trend: "stable",
      icon: BookOpenIcon,
      color: "text-violet-600 dark:text-violet-500",
      background: "bg-violet-50 dark:bg-violet-950/50"
    },
    {
      title: "Class Average",
      value: "87.5%",
      change: "+2.1%",
      trend: "up",
      icon: ChartBarIcon,
      color: "text-green-600 dark:text-green-500",
      background: "bg-green-50 dark:bg-green-950/50"
    },
    {
      title: "Pending Tasks",
      value: "8",
      change: "-3",
      trend: "down",
      icon: DocumentTextIcon,
      color: "text-amber-600 dark:text-amber-500",
      background: "bg-amber-50 dark:bg-amber-950/50"
    }
  ]

  const features = [
    {
      title: "Grade Management",
      description: "Enter and manage student grades",
      icon: TableCellsIcon,
      href: "/teacher-dashboard/grades",
      color: "text-violet-600 dark:text-violet-500",
      background: "bg-violet-50 dark:bg-violet-950/50",
      action: "Enter Grades"
    },
    {
      title: "Predictive Analytics",
      description: "ML-powered insights and risk assessment",
      icon: BoltIcon,
      href: "/teacher-dashboard/analytics",
      color: "text-green-600 dark:text-green-500",
      background: "bg-green-50 dark:bg-green-950/50",
      action: "View Analytics"
    },
    {
      title: "Student Feedback",
      description: "Provide personalized feedback and comments",
      icon: ChatBubbleLeftRightIcon,
      href: "/teacher-dashboard/feedback",
      color: "text-pink-600 dark:text-pink-500",
      background: "bg-pink-50 dark:bg-pink-950/50",
      action: "Give Feedback"
    },
    {
      title: "Reports & Analytics",
      description: "Generate comprehensive performance reports",
      icon: DocumentDuplicateIcon,
      href: "/teacher-dashboard/reports",
      color: "text-amber-600 dark:text-amber-500",
      background: "bg-amber-50 dark:bg-amber-950/50",
      action: "View Reports"
    },
    {
      title: "Data Import/Export",
      description: "Import/export grades and student data via CSV",
      icon: ArrowDownTrayIcon,
      href: "#",
      color: "text-slate-600 dark:text-slate-500",
      background: "bg-slate-50 dark:bg-slate-950/50",
      action: "Import/Export"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Teacher Dashboard</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Welcome back! Here&apos;s an overview of your teaching activities</p>
        </div>
        <div className="flex items-center gap-4">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="semester">This Semester</option>
            <option value="year">This Year</option>
          </select>
          <Button variant="outline" size="sm" className="gap-2">
            <CalendarIcon className="w-4 h-4" />
            Calendar
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <AdjustmentsHorizontalIcon className="w-4 h-4" />
            Customize
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
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
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
              <div className="mt-4">
                <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</h3>
                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                  <ChartBarIcon className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                </div>
                <div>
                  <CardTitle>Class Performance</CardTitle>
                  <CardDescription>Performance breakdown by section</CardDescription>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ClassPerformanceChart />
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-950/50">
                  <ArrowTrendingUpIcon className="w-5 h-5 text-violet-600 dark:text-violet-500" />
                </div>
                <div>
                  <CardTitle>Performance Trends</CardTitle>
                  <CardDescription>Weekly subject performance</CardDescription>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <DashboardChart />
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle>Teaching Features</CardTitle>
          <CardDescription>Access and manage your teaching tools and resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <a
                key={index}
                href={feature.href}
                className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${feature.background}`}>
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">{feature.title}</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{feature.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}