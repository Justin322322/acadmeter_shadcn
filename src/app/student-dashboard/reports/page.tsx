"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AcademicCapIcon,
  DocumentChartBarIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline"

interface StatCardProps {
  icon: React.ElementType
  label: string
  value: number | string
  colorClass?: string
}

export default function StudentReportsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'semester' | 'year'>('semester')
  const [activeTab, setActiveTab] = useState<'academic' | 'attendance' | 'behavior'>('academic')

  // Function to get grade color based on score
  const getStatusColor = (score: number) => {
    if (score >= 90) return "text-green-600 dark:text-green-500"
    if (score >= 80) return "text-blue-600 dark:text-blue-500"
    if (score >= 70) return "text-yellow-600 dark:text-yellow-500"
    return "text-red-600 dark:text-red-500"
  }

  const StatCard = ({ icon: Icon, label, value, colorClass = '' }: StatCardProps) => (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg ${colorClass || 'bg-slate-100 dark:bg-slate-800'}`}>
            <Icon className={`w-6 h-6 ${colorClass ? getStatusColor(typeof value === 'number' ? value : 0) : 'text-slate-600 dark:text-slate-400'}`} />
          </div>
          <div>
            <p className="text-sm text-slate-500">{label}</p>
            <p className={`text-2xl font-bold ${colorClass ? getStatusColor(typeof value === 'number' ? value : 0) : 'text-slate-900 dark:text-slate-100'}`}>
              {value}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  // Quick stats for the report overview
  const quickStats = [
    {
      title: "Current Grade Average",
      value: "87.5%",
      icon: AcademicCapIcon,
      color: "text-blue-600 dark:text-blue-500",
      background: "bg-blue-50 dark:bg-blue-950/50"
    },
    {
      title: "Attendance Rate",
      value: "95%",
      icon: ClockIcon,
      color: "text-green-600 dark:text-green-500",
      background: "bg-green-50 dark:bg-green-950/50"
    },
    {
      title: "Assignment Completion",
      value: "92%",
      icon: CheckCircleIcon,
      color: "text-violet-600 dark:text-violet-500",
      background: "bg-violet-50 dark:bg-violet-950/50"
    }
  ]

  const subjects = [
    {
      name: "Mathematics",
      grade: "A",
      percentage: 92,
      improvement: "+3.2%",
      assignments: { completed: 15, total: 15 },
      attendance: { present: 42, total: 45 }
    },
    {
      name: "Physics",
      grade: "B+",
      percentage: 88,
      improvement: "+2.1%",
      assignments: { completed: 12, total: 12 },
      attendance: { present: 43, total: 45 }
    },
    {
      name: "English",
      grade: "A-",
      percentage: 91,
      improvement: "+1.5%",
      assignments: { completed: 10, total: 10 },
      attendance: { present: 44, total: 45 }
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Academic Reports</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">View your comprehensive academic performance report</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2" onClick={() => setSelectedTimeframe(
            selectedTimeframe === 'semester' ? 'year' : 'semester'
          )}>
            <CalendarIcon className="w-4 h-4" />
            {selectedTimeframe.charAt(0).toUpperCase() + selectedTimeframe.slice(1)}
          </Button>
          <Button className="gap-2">
            <ArrowDownTrayIcon className="w-4 h-4" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${stat.background}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</h3>
                <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="academic" className="w-full" onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg w-full mb-6 grid grid-cols-3">
          <TabsTrigger 
            value="academic"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm"
          >
            Academic Progress
          </TabsTrigger>
          <TabsTrigger 
            value="attendance"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm"
          >
            Attendance
          </TabsTrigger>
          <TabsTrigger 
            value="behavior"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm"
          >
            Behavior
          </TabsTrigger>
        </TabsList>

        <TabsContent value="academic" className="mt-0">
          <div className="space-y-6">
            {subjects.map((subject) => (
              <Card key={subject.name} className="border-slate-200 dark:border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                      <AcademicCapIcon className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                    </div>
                    <div>
                      <CardTitle>{subject.name}</CardTitle>
                      <p className="text-sm text-slate-500">Grade: {subject.grade} ({subject.percentage}%)</p>
                    </div>
                  </div>
                  <div className="text-green-600 dark:text-green-500 text-sm font-medium">
                    {subject.improvement}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Assignment Completion</h4>
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-green-500 h-2 transition-all duration-500 ease-in-out"
                          style={{
                            width: `${(subject.assignments.completed / subject.assignments.total) * 100}%`
                          }}
                        />
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {subject.assignments.completed}/{subject.assignments.total} assignments completed
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Attendance Rate</h4>
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-blue-500 h-2 transition-all duration-500 ease-in-out"
                          style={{
                            width: `${(subject.attendance.present / subject.attendance.total) * 100}%`
                          }}
                        />
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {subject.attendance.present}/{subject.attendance.total} classes attended
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="mt-0">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>Your attendance record for this {selectedTimeframe}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Present Days</h4>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">42/45</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Attendance Rate</h4>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-500">93.3%</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Tardiness</h4>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">2 days</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">Monthly Breakdown</h4>
                  <div className="h-[200px] flex items-end gap-2">
                    {/* Placeholder for attendance chart */}
                    <div className="text-center p-8 text-sm text-slate-500">
                      Detailed attendance records will be shown here
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior" className="mt-0">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Behavior Assessment</CardTitle>
              <CardDescription>Your behavioral performance and conduct report</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">Classroom Conduct</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Participation</span>
                        <span className="text-green-600 dark:text-green-500">Excellent</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Teamwork</span>
                        <span className="text-green-600 dark:text-green-500">Good</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Following Instructions</span>
                        <span className="text-green-600 dark:text-green-500">Good</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">Teacher Comments</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Shows excellent participation in class activities and demonstrates good teamwork skills. 
                      Consistently follows instructions and maintains a positive attitude.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}