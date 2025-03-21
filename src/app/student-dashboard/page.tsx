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
  ChevronDownIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  DocumentTextIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline"

const quickActions = [
  {
    title: "View Assignments",
    icon: DocumentTextIcon,
    description: "Check your pending assignments",
    href: "/assignments"
  },
  {
    title: "Submit Feedback",
    icon: ChatBubbleLeftRightIcon,
    description: "Complete course evaluations",
    href: "/feedback"
  },
  {
    title: "View Schedule",
    icon: CalendarIcon,
    description: "Check your class schedule",
    href: "/schedule"
  },
  {
    title: "View Reports",
    icon: ChartBarIcon,
    description: "View detailed performance reports",
    href: "/reports"
  }
]

const upcomingDeadlines = [
  {
    subject: "Physics",
    task: "Lab Report",
    dueDate: "2024-03-25",
    type: "assignment",
    status: "pending"
  },
  {
    subject: "Mathematics",
    task: "Chapter 7 Quiz",
    dueDate: "2024-03-27",
    type: "assessment",
    status: "pending"
  },
  {
    subject: "Chemistry",
    task: "Project Submission",
    dueDate: "2024-03-28",
    type: "project",
    status: "in-progress"
  }
]

export default function StudentDashboardPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("semester")
  
  const stats = [
    {
      title: "Overall GPA",
      value: "3.8",
      trend: "up",
      change: "+0.2",
      icon: AcademicCapIcon,
      color: "text-blue-600 dark:text-blue-500",
      background: "bg-blue-50 dark:bg-blue-950/50"
    },
    {
      title: "Attendance Rate",
      value: "95%",
      trend: "up",
      change: "+2%",
      icon: ClockIcon,
      color: "text-green-600 dark:text-green-500",
      background: "bg-green-50 dark:bg-green-950/50"
    },
    {
      title: "Assignments Completed",
      value: "45/48",
      trend: "stable",
      change: "93.75%",
      icon: BookOpenIcon,
      color: "text-violet-600 dark:text-violet-500",
      background: "bg-violet-50 dark:bg-violet-950/50"
    }
  ]

  const grades = [
    {
      subject: "Mathematics",
      grade: "A",
      percentage: 92,
      trend: "up",
      change: "+3.2%",
      predictedGrade: "A",
      nextAssessment: "Calculus Quiz - Mar 25",
      recentTopics: [
        "Differential Equations",
        "Integration Techniques",
        "Vector Calculus"
      ]
    },
    {
      subject: "Physics",
      grade: "A-",
      percentage: 89,
      trend: "up",
      change: "+2.1%",
      predictedGrade: "A",
      nextAssessment: "Lab Report - Mar 28",
      recentTopics: [
        "Wave Motion",
        "Thermodynamics",
        "Electromagnetism"
      ]
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Student Dashboard</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Welcome back! Here's an overview of your academic progress</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Viewing:</span>
          <Button variant="outline" className="gap-2">
            {selectedTimeframe.charAt(0).toUpperCase() + selectedTimeframe.slice(1)}
            <ChevronDownIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Card key={index} className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800`}>
                  <action.icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">{action.title}</h3>
                  <p className="text-xs text-slate-500">{action.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grade Overview */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                  <ChartBarIcon className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                </div>
                <div>
                  <CardTitle>Grade Overview</CardTitle>
                  <CardDescription>Your current academic performance</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {grades.map((subject, index) => (
                  <div
                    key={subject.subject}
                    className={`${
                      index < grades.length - 1 ? 'pb-6 border-b border-slate-200 dark:border-slate-700' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-slate-900 dark:text-slate-100">{subject.subject}</h3>
                        <p className="text-sm text-slate-500">Next: {subject.nextAssessment}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">{subject.grade}</div>
                        <p className="text-sm text-slate-500">{subject.percentage}%</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-blue-600 dark:bg-blue-500"
                          style={{ width: `${subject.percentage}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Recent Topics:</span>
                        <div className="flex gap-2">
                          {subject.recentTopics.map((topic, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50">
                  <CalendarIcon className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                </div>
                <div>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                  <CardDescription>Tasks and assessments due soon</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        deadline.type === 'assignment'
                          ? 'bg-violet-50 dark:bg-violet-950/50'
                          : deadline.type === 'assessment'
                          ? 'bg-blue-50 dark:bg-blue-950/50'
                          : 'bg-green-50 dark:bg-green-950/50'
                      }`}>
                        {deadline.type === 'assignment' ? (
                          <DocumentTextIcon className="w-5 h-5 text-violet-500" />
                        ) : deadline.type === 'assessment' ? (
                          <AcademicCapIcon className="w-5 h-5 text-blue-500" />
                        ) : (
                          <BookOpenIcon className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {deadline.subject} - {deadline.task}
                        </h4>
                        <p className="text-xs text-slate-500">Due: {deadline.dueDate}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                      deadline.status === 'completed'
                        ? 'bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400'
                        : deadline.status === 'in-progress'
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400'
                        : 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400'
                    }`}>
                      {deadline.status === 'completed' && <CheckCircleIcon className="w-3 h-3" />}
                      {deadline.status.charAt(0).toUpperCase() + deadline.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <div className="lg:col-span-1">
          <NotificationCenter />
        </div>
      </div>
    </div>
  )
}