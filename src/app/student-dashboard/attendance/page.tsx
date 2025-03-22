"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  ClockIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline"

export default function AttendancePage() {
  const [selectedMonth, setSelectedMonth] = useState<string>("march")

  const attendanceStats = [
    {
      title: "Present",
      value: "95%",
      icon: CheckCircleIcon,
      color: "text-green-600 dark:text-green-500",
      background: "bg-green-50 dark:bg-green-950/50"
    },
    {
      title: "Absences",
      value: "3",
      icon: XCircleIcon,
      color: "text-red-600 dark:text-red-500",
      background: "bg-red-50 dark:bg-red-950/50"
    },
    {
      title: "Late Arrivals",
      value: "2",
      icon: ClockIcon,
      color: "text-amber-600 dark:text-amber-500",
      background: "bg-amber-50 dark:bg-amber-950/50"
    }
  ]

  const recentAttendance = [
    { date: '2024-03-20', status: 'present' },
    { date: '2024-03-19', status: 'present' },
    { date: '2024-03-18', status: 'late' },
    { date: '2024-03-15', status: 'present' },
    { date: '2024-03-14', status: 'absent' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'late':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
      case 'absent':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Attendance Record</h1>
          <p className="text-slate-500 dark:text-slate-400">Track your attendance and punctuality</p>
        </div>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="january">January</SelectItem>
            <SelectItem value="february">February</SelectItem>
            <SelectItem value="march">March</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {attendanceStats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${stat.background}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-500" />
              </div>
              <CardTitle>Attendance Calendar</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={new Date()}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-950/50">
                <ClockIcon className="w-5 h-5 text-violet-600 dark:text-violet-500" />
              </div>
              <CardTitle>Recent Activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAttendance.map((day) => (
                <div
                  key={day.date}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      day.status === 'present'
                        ? 'bg-green-50 dark:bg-green-950/50'
                        : day.status === 'late'
                        ? 'bg-amber-50 dark:bg-amber-950/50'
                        : 'bg-red-50 dark:bg-red-950/50'
                    }`}>
                      {day.status === 'present' ? (
                        <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-500" />
                      ) : day.status === 'late' ? (
                        <ClockIcon className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                      ) : (
                        <XCircleIcon className="w-5 h-5 text-red-600 dark:text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(day.status)}`}>
                    {day.status.charAt(0).toUpperCase() + day.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}