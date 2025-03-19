"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DashboardChart } from "@/components/ui/dashboard"
import { RecentActivity } from "@/components/ui/dashboard/recent-activity"
import { 
  UserGroupIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline"

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Students",
      value: "2,547",
      change: "+12%",
      trend: "up",
      icon: UserGroupIcon,
      color: "text-blue-600 dark:text-blue-500",
      background: "bg-blue-50 dark:bg-blue-950/50"
    },
    {
      title: "Passing Rate",
      value: "87.3%",
      change: "+5.2%",
      trend: "up",
      icon: CheckCircleIcon,
      color: "text-green-600 dark:text-green-500",
      background: "bg-green-50 dark:bg-green-950/50"
    },
    {
      title: "At Risk Students",
      value: "124",
      change: "-3.1%",
      trend: "down",
      icon: ExclamationTriangleIcon,
      color: "text-amber-600 dark:text-amber-500",
      background: "bg-amber-50 dark:bg-amber-950/50"
    }
  ]

  return (
    <div>
      {/* Dashboard Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Dashboard Overview</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Monitor overall performance and key metrics</p>
      </div>

      {/* Main Content with proper grid layout */}
      <div className="grid grid-cols-1 gap-6">
        {/* Stats Cards - improved responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="overflow-hidden hover:shadow-md transition-shadow duration-200 border-slate-200 dark:border-slate-800"
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${stat.background}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 ${
                    stat.trend === 'up' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
                  }`}>
                    <ArrowTrendingUpIcon className={`w-4 h-4 ${
                      stat.trend === 'down' ? 'rotate-180' : ''
                    }`} />
                    <span className="text-sm font-medium">{stat.change}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {stat.title}
                  </h3>
                  <p className="mt-1.5 text-2xl xl:text-3xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart and Activity Section - improved layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="lg:col-span-2 xl:col-span-3">
            <DashboardChart />
          </div>
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  )
}