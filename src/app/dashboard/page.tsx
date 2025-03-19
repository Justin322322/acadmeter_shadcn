"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardChart } from "@/components/ui/dashboard"
import { RecentActivity } from "@/components/ui/dashboard/recent-activity"
import { 
  UserGroupIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Dashboard Overview</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Monitor overall performance and key metrics</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="overflow-hidden hover:shadow-lg transition-shadow duration-200 border-slate-200 dark:border-slate-800"
            >
              <CardContent className="p-6">
                <div className={`p-3 rounded-lg ${stat.background} w-fit mb-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-4xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                  <div className={`flex items-center gap-1 ${stat.trend === 'up' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                    <ArrowTrendingUpIcon className={`w-4 h-4 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                    <span className="text-sm font-medium">{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {stat.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="lg:col-span-2 xl:col-span-3">
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
          <div className="lg:col-span-1 w-full">
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  )
}