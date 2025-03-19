"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardChart } from "@/components/ui/dashboard/dashboard-chart"
import { PerformanceBreakdown } from "@/components/ui/dashboard/performance-breakdown"
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
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="border-slate-200 dark:border-slate-800"
            >
              <CardContent className="p-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <stat.icon className={`w-[90px] h-[75px] ${stat.color} shrink-0`} />
                    <div className="min-w-0">
                      <h3 className="text-[13px] font-medium text-slate-600 dark:text-slate-400">
                        {stat.title}
                      </h3>
                      <p className="text-[28px] font-semibold text-slate-900 dark:text-white leading-tight truncate">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1.5 shrink-0 ${stat.trend === 'up' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                    <ArrowTrendingUpIcon className={`w-[22px] h-[22px] ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                    <span className="text-lg font-medium">{stat.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-8">
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader className="p-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="flex items-center gap-2 mb-3 sm:mb-0">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                      <ChartBarIcon className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                    </div>
                    <CardTitle className="text-base font-semibold">Performance Overview</CardTitle>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-400" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">Math</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-600 dark:bg-green-400" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">Science</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-violet-600 dark:bg-violet-400" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">English</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <DashboardChart />
              </CardContent>
            </Card>
          </div>

          {/* Performance Analysis Section */}
          <div className="lg:col-span-4">
            <Card className="border-slate-200 dark:border-slate-800 h-full">
              <CardHeader className="p-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-950/50">
                    <ChartBarIcon className="w-5 h-5 text-violet-600 dark:text-violet-500" />
                  </div>
                  <CardTitle className="text-base font-semibold">Performance Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-5">
                <PerformanceBreakdown />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="w-full">
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}