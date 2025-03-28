"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardChart } from "@/components/ui/dashboard/dashboard-chart"
import { ClassPerformanceChart } from "@/components/ui/dashboard/class-performance-chart"
import { RiskAnalysis, PredictiveAnalytics, StudentRankings } from "@/components/ui/teacher_dashboard"
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
  CalendarIcon
} from "@heroicons/react/24/outline"

export default function TeacherDashboardPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("semester")

  // Mock data for StudentRankings component
  const mockStudents = [
    { id: "st1", name: "Emily Johnson", grade: 97.5, section: "A", rank: 1 },
    { id: "st2", name: "Michael Lee", grade: 94.8, section: "B", rank: 2 },
    { id: "st3", name: "Sophia Garcia", grade: 92.3, section: "A", rank: 3 },
    { id: "st4", name: "Daniel Rodriguez", grade: 90.1, section: "C", rank: 4 },
    { id: "st5", name: "Olivia Martinez", grade: 89.7, section: "B", rank: 5 }
  ]

  // Mock data for RiskAnalysis component
  const studentRisk = {
    studentId: "st25",
    studentName: "Alex Thompson",
    riskLevel: "medium" as "high" | "medium" | "low",
    overallScore: 68,
    lastUpdated: "2 days ago",
    factors: [
      {
        factor: "Assignment Completion",
        impact: "high" as "high" | "medium" | "low",
        trend: "worsening" as "improving" | "stable" | "worsening",
        details: "Missing 3 recent assignments in Mathematics and Science",
        recommendations: [
          "Set up a weekly progress check",
          "Create a structured assignment calendar",
          "Schedule a one-on-one session to address challenges"
        ]
      },
      {
        factor: "Attendance",
        impact: "medium" as "high" | "medium" | "low",
        trend: "stable" as "improving" | "stable" | "worsening",
        details: "Attendance is generally regular but occasionally late",
        recommendations: [
          "Monitor morning arrival patterns",
          "Check for transportation challenges"
        ]
      }
    ]
  }

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
      title: "Analytics",
      description: "Insights and risk assessment",
      icon: BoltIcon,
      href: "/teacher-dashboard/analytics",
      color: "text-green-600 dark:text-green-500",
      background: "bg-green-50 dark:bg-green-950/50",
      action: "View Analytics"
    },
    {
      title: "Student Feedback",
      description: "Provide personalized feedback",
      icon: ChatBubbleLeftRightIcon,
      href: "/teacher-dashboard/feedback",
      color: "text-pink-600 dark:text-pink-500",
      background: "bg-pink-50 dark:bg-pink-950/50",
      action: "Give Feedback"
    },
    {
      title: "Reports",
      description: "Performance reports",
      icon: DocumentDuplicateIcon,
      href: "/teacher-dashboard/reports",
      color: "text-amber-600 dark:text-amber-500",
      background: "bg-amber-50 dark:bg-amber-950/50",
      action: "View Reports"
    },
    {
      title: "Data Import/Export",
      description: "Import/export data via CSV",
      icon: ArrowDownTrayIcon,
      href: "#",
      color: "text-slate-600 dark:text-slate-500",
      background: "bg-slate-50 dark:bg-slate-950/50",
      action: "Import/Export"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Teacher Dashboard</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Welcome back! Here's an overview of your teaching activities</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="w-full sm:w-auto bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
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
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between">
                <div className={`p-2.5 rounded-lg ${stat.background}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} aria-hidden="true" />
                </div>
                <div className={`flex items-center gap-1 ${
                  stat.trend === 'up'
                    ? 'text-green-600 dark:text-green-500'
                    : stat.trend === 'down'
                    ? 'text-red-600 dark:text-red-500'
                    : 'text-slate-600 dark:text-slate-400'
                }`}>
                  {stat.trend === 'up' && <ArrowTrendingUpIcon className="w-4 h-4" aria-hidden="true" />}
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
              </div>
              <div className="mt-3">
                <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</h3>
                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                  <ChartBarIcon className="w-5 h-5 text-blue-600 dark:text-blue-500" aria-hidden="true" />
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-950/50">
                  <ArrowTrendingUpIcon className="w-5 h-5 text-violet-600 dark:text-violet-500" aria-hidden="true" />
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

      {/* Student Rankings and Risk Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StudentRankings students={mockStudents} classSection="A" />
        
        <RiskAnalysis 
          student={studentRisk}
          onGeneratePlan={() => console.log("Generate improvement plan")}
        />
      </div>

      {/* Features Grid */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle>Teaching Features</CardTitle>
          <CardDescription>Access and manage your teaching tools and resources</CardDescription>
        </CardHeader>
        <CardContent>
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
                  <p className="mt-2 text-xs font-medium text-blue-600 dark:text-blue-400">{feature.action} →</p>
                </div>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}