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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const attendanceStats = [
    {
      title: "Present",
      value: "95%",
      description: "Total attendance rate",
      icon: CheckCircleIcon,
      color: "text-green-600 dark:text-green-500",
      background: "bg-green-50 dark:bg-green-950/50"
    },
    {
      title: "Absences",
      value: "3",
      description: "Days missed this semester",
      icon: XCircleIcon,
      color: "text-red-600 dark:text-red-500",
      background: "bg-red-50 dark:bg-red-950/50"
    },
    {
      title: "Late Arrivals",
      value: "2",
      description: "Total late check-ins",
      icon: ClockIcon,
      color: "text-amber-600 dark:text-amber-500",
      background: "bg-amber-50 dark:bg-amber-950/50"
    }
  ]

  const recentAttendance = [
    { date: '2024-03-20', status: 'present', time: '8:55 AM' },
    { date: '2024-03-19', status: 'present', time: '8:45 AM' },
    { date: '2024-03-18', status: 'late', time: '9:10 AM' },
    { date: '2024-03-15', status: 'present', time: '8:50 AM' },
    { date: '2024-03-14', status: 'absent', time: '-' }
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Attendance Record</h1>
          <p className="text-slate-500 dark:text-slate-400">Track your attendance and punctuality status</p>
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

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-950/50">
              <ClockIcon className="w-5 h-5 text-violet-600 dark:text-violet-500" />
            </div>
            <div>
              <CardTitle>Quick Stats Overview</CardTitle>
              <p className="text-sm text-slate-500 dark:text-slate-400">Your attendance statistics</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {attendanceStats.map((stat) => (
              <div key={stat.title} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${stat.background}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</h3>
                  <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Recent Activity */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-950/50">
                <ClockIcon className="w-5 h-5 text-violet-600 dark:text-violet-500" />
              </div>
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <p className="text-sm text-slate-500 dark:text-slate-400">Your latest attendance records</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAttendance.map((day) => (
                <div
                  key={day.date}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      day.status === 'present'
                        ? 'bg-green-50 dark:bg-green-950/50'
                        : day.status === 'late'
                        ? 'bg-amber-50 dark:bg-amber-950/50'
                        : 'bg-red-50 dark:bg-red-950/50'
                    }`}>
                      {day.status === 'present' ? (
                        <CheckCircleIcon className="w-4 h-4 text-green-600 dark:text-green-500" />
                      ) : day.status === 'late' ? (
                        <ClockIcon className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                      ) : (
                        <XCircleIcon className="w-4 h-4 text-red-600 dark:text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Check-in time: {day.time}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusColor(day.status)}`}>
                    {day.status.charAt(0).toUpperCase() + day.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Calendar */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-500" />
              </div>
              <div>
                <CardTitle>Attendance Calendar</CardTitle>
                <p className="text-sm text-slate-500 dark:text-slate-400">View your monthly attendance pattern</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border border-slate-200 dark:border-slate-800 w-full max-w-[320px] 
                [&_.rdp-day_button:hover:not([disabled])]:bg-slate-100 
                [&_.rdp-day_button:hover:not([disabled])]:dark:bg-slate-800 
                [&_.rdp-day_button.rdp-day_selected]:bg-violet-600/90 
                [&_.rdp-day_button.rdp-day_selected]:text-white 
                [&_.rdp-day_button.rdp-day_selected]:font-bold 
                [&_.rdp-day_button.rdp-day_selected]:ring-2 
                [&_.rdp-day_button.rdp-day_selected]:ring-violet-600 
                [&_.rdp-day_button.rdp-day_selected]:ring-offset-2 
                dark:[&_.rdp-day_button.rdp-day_selected]:bg-violet-500 
                dark:[&_.rdp-day_button.rdp-day_selected]:ring-violet-400 
                dark:[&_.rdp-day_button.rdp-day_selected]:ring-offset-slate-950 
                [&_.rdp-day_button.rdp-day_selected]:hover:bg-violet-600 
                dark:[&_.rdp-day_button.rdp-day_selected]:hover:bg-violet-500"
                showOutsideDays={true}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}