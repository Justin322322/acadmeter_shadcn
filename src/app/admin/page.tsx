"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardChart } from "@/components/admin/dashboard-chart"
import { RecentActivity } from "@/components/admin/recent-activity"
import { NotificationCenter } from "@/components/admin/notification-center"
import {
  UserGroupIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  DocumentTextIcon,
  BellAlertIcon,
  ServerIcon,
  ArrowDownTrayIcon,
  CalendarIcon
} from "@heroicons/react/24/outline"

export default function AdminDashboardPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("week")

  // Quick stats for the dashboard
  const quickStats = [
    {
      title: "Total Users",
      value: "12,845",
      change: "+12.5%",
      trend: "up",
      icon: UserGroupIcon,
      color: "text-blue-600 dark:text-blue-500",
      background: "bg-blue-50 dark:bg-blue-950/50"
    },
    {
      title: "Revenue",
      value: "$48,574",
      change: "+7.2%",
      trend: "up",
      icon: CurrencyDollarIcon,
      color: "text-green-600 dark:text-green-500",
      background: "bg-green-50 dark:bg-green-950/50"
    },
    {
      title: "Active Users",
      value: "8,632",
      change: "+5.1%",
      trend: "up",
      icon: ClockIcon,
      color: "text-violet-600 dark:text-violet-500",
      background: "bg-violet-50 dark:bg-violet-950/50"
    },
    {
      title: "System Health",
      value: "99.8%",
      change: "+0.2%",
      trend: "up",
      icon: ServerIcon,
      color: "text-amber-600 dark:text-amber-500",
      background: "bg-amber-50 dark:bg-amber-950/50"
    }
  ]

  const features = [
    {
      title: "User Management",
      description: "Manage users, roles and permissions",
      icon: UserGroupIcon,
      href: "/admin/users",
      color: "text-blue-600 dark:text-blue-500",
      background: "bg-blue-50 dark:bg-blue-950/50",
      action: "Manage Users"
    },
    {
      title: "Content Management",
      description: "Manage content and publications",
      icon: DocumentTextIcon,
      href: "/admin/content",
      color: "text-violet-600 dark:text-violet-500",
      background: "bg-violet-50 dark:bg-violet-950/50",
      action: "Manage Content"
    },
    {
      title: "Analytics & Reports",
      description: "View detailed analytics and reports",
      icon: ChartBarIcon,
      href: "/admin/analytics",
      color: "text-green-600 dark:text-green-500",
      background: "bg-green-50 dark:bg-green-950/50",
      action: "View Analytics"
    },
    {
      title: "System Configuration",
      description: "Configure system settings",
      icon: ShieldCheckIcon,
      href: "/admin/settings",
      color: "text-amber-600 dark:text-amber-500",
      background: "bg-amber-50 dark:bg-amber-950/50",
      action: "Configure System"
    },
    {
      title: "Export Data",
      description: "Export system data and reports",
      icon: ArrowDownTrayIcon,
      href: "/admin/export",
      color: "text-pink-600 dark:text-pink-500",
      background: "bg-pink-50 dark:bg-pink-950/50",
      action: "Export Data"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Admin Dashboard</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Welcome back! Here's an overview of your system</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="w-full sm:w-auto bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            aria-label="Select timeframe"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
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
                  {stat.trend === 'down' && <ArrowTrendingUpIcon className="w-4 h-4 rotate-180" />}
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
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue breakdown</CardDescription>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <DashboardChart />
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-950/50">
                  <UserGroupIcon className="w-5 h-5 text-violet-600 dark:text-violet-500" aria-hidden="true" />
                </div>
                <div>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>New user registrations</CardDescription>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <DashboardChart chartType="bar" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-slate-200 dark:border-slate-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                <ClockIcon className="w-5 h-5 text-blue-600 dark:text-blue-500" />
              </div>
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system activities and updates</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>

        <div className="lg:col-span-1">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50">
                  <BellAlertIcon className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                </div>
                <CardTitle>System Alerts</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <NotificationCenter />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Access Features */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle>Quick Access</CardTitle>
          <CardDescription>Access and manage key system features</CardDescription>
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