"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  UserGroupIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  ChartBarIcon,
  ClockIcon,
  UserPlusIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  BellAlertIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"

// Mock data for administrative dashboard
const stats = [
  {
    title: "Total Students",
    value: "2,845",
    change: "+12.5%",
    icon: UserGroupIcon,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30"
  },
  {
    title: "Active Teachers",
    value: "138",
    change: "+4.3%",
    icon: UserGroupIcon,
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-100 dark:bg-violet-900/30"
  },
  {
    title: "Pending Approvals",
    value: "24",
    change: "-8.1%",
    icon: UserPlusIcon,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30"
  },
  {
    title: "System Uptime",
    value: "99.98%",
    change: "+0.02%",
    icon: ClockIcon,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30"
  },
]

// Mock activity logs
const recentActivity = [
  {
    id: 1,
    action: "User Sign-up Request",
    description: "New teacher account awaiting approval",
    time: "5 minutes ago",
    user: "maria.johnson@school.edu",
    priority: "high",
  },
  {
    id: 2,
    action: "System Configuration",
    description: "Grading scale updated for Science department",
    time: "2 hours ago",
    user: "admin@acadmeter.com",
    priority: "medium",
  },
  {
    id: 3,
    action: "Data Export",
    description: "Grade data exported for semester review",
    time: "Yesterday, 4:32 PM",
    user: "james.smith@school.edu",
    priority: "low",
  },
  {
    id: 4,
    action: "Class Roster Created",
    description: "New class roster for Math 101 created",
    time: "Yesterday, 1:17 PM",
    user: "admin@acadmeter.com",
    priority: "medium",
  },
  {
    id: 5,
    action: "User Suspended",
    description: "Student account temporarily restricted",
    time: "2 days ago",
    user: "admin@acadmeter.com",
    priority: "high",
  },
]

// Quick actions for admin
const quickActions = [
  {
    title: "Approve Users",
    description: "Review pending sign-up requests",
    icon: UserPlusIcon,
    href: "/dashboard/users",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30"
  },
  {
    title: "Generate Reports",
    description: "Create performance summaries",
    icon: DocumentTextIcon,
    href: "/dashboard/reports",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30"
  },
  {
    title: "Security Audit",
    description: "Review system security settings",
    icon: ShieldCheckIcon,
    href: "/dashboard/settings",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30"
  }
]

export default function DashboardPage() {
  const [timeframe, setTimeframe] = useState("week")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            System overview and performance monitoring
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={timeframe === "day" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeframe("day")}
          >
            Day
          </Button>
          <Button
            variant={timeframe === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeframe("week")}
          >
            Week
          </Button>
          <Button
            variant={timeframe === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeframe("month")}
          >
            Month
          </Button>
        </div>
      </div>

      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`inline-flex p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <h3 className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                    {stat.title}
                  </h3>
                  <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {stat.change} from last {timeframe}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Quick Actions
          </h2>
          
          <div className="space-y-4">
            {quickActions.map((action, i) => (
              <Link href={action.href} key={i}>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${action.bgColor}`}>
                        <action.icon className={`w-5 h-5 ${action.color}`} />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900 dark:text-slate-100">{action.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{action.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* System Alerts */}
          <Card>
            <CardHeader className="border-b border-slate-200 dark:border-slate-800 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                  <BellAlertIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle className="text-base">System Alerts</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
                  <div className="flex items-start gap-3">
                    <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800 dark:text-amber-300">Scheduled Maintenance</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-400">System maintenance scheduled for Sunday, 2:00 AM - 4:00 AM</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800 dark:text-blue-300">Database Backup Complete</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-400">Weekly backup successfully completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Recent Activity
            </h2>
            <Link href="/dashboard/user-logs">
              <Button variant="outline" size="sm">View All Logs</Button>
            </Link>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-200 dark:divide-slate-800">
                {recentActivity.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        item.priority === 'high' 
                          ? 'bg-red-100 dark:bg-red-900/30' 
                          : item.priority === 'medium'
                          ? 'bg-amber-100 dark:bg-amber-900/30'
                          : 'bg-green-100 dark:bg-green-900/30'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          item.priority === 'high' 
                            ? 'bg-red-600 dark:bg-red-400' 
                            : item.priority === 'medium'
                            ? 'bg-amber-600 dark:bg-amber-400'
                            : 'bg-green-600 dark:bg-green-400'
                        }`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p className="font-medium text-slate-900 dark:text-slate-100">
                            {item.action}
                          </p>
                          <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap ml-2">
                            {item.time}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                          {item.description}
                        </p>
                        <div className="mt-2">
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            By: {item.user}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}