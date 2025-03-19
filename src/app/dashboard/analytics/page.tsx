"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardChart } from "@/components/ui/dashboard"
import {
  UserGroupIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline"

export default function AnalyticsPage() {
  const metrics = [
    {
      title: "Average Score",
      value: "78.5%",
      change: "+2.3%",
      trend: "up",
      icon: ChartBarIcon,
      color: "text-blue-600 dark:text-blue-500",
      background: "bg-blue-50 dark:bg-blue-950/50"
    },
    {
      title: "Class Participation",
      value: "92.1%",
      change: "+5.4%",
      trend: "up",
      icon: UserGroupIcon,
      color: "text-green-600 dark:text-green-500",
      background: "bg-green-50 dark:bg-green-950/50"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Analytics</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Track and analyze academic performance trends</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
        {metrics.map((metric, index) => (
          <Card 
            key={index} 
            className="overflow-hidden hover:shadow-lg transition-shadow duration-200 border-slate-200 dark:border-slate-800"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${metric.background}`}>
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <div className={`flex items-center gap-1 ${
                  metric.trend === 'up' 
                    ? 'text-green-600 dark:text-green-500' 
                    : 'text-red-600 dark:text-red-500'
                }`}>
                  {metric.trend === 'up' ? (
                    <ArrowUpIcon className="w-4 h-4" />
                  ) : (
                    <ArrowDownIcon className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{metric.change}</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {metric.title}
                </h3>
                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  {metric.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader className="p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">
              <ChartBarIcon className="w-5 h-5 text-blue-600 dark:text-blue-500" />
            </div>
            <CardTitle className="text-base font-semibold">Performance Analysis</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <DashboardChart />
        </CardContent>
      </Card>
    </div>
  )
}