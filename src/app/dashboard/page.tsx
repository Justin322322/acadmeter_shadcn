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
  ArrowTrendingDownIcon,
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
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      darkColor: "dark:text-blue-400",
      darkBgColor: "dark:bg-blue-900/30"
    },
    {
      title: "Passing Rate",
      value: "87.3%",
      change: "+5.2%",
      trend: "up",
      icon: CheckCircleIcon,
      color: "text-green-600",
      bgColor: "bg-green-100",
      darkColor: "dark:text-green-400",
      darkBgColor: "dark:bg-green-900/30"
    },
    {
      title: "At Risk Students",
      value: "124",
      change: "-3.1%",
      trend: "down",
      icon: ExclamationTriangleIcon,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      darkColor: "dark:text-amber-400",
      darkBgColor: "dark:bg-amber-900/30"
    }
  ]

  return (
    <div className="space-y-4 p-3 sm:space-y-6 sm:p-4 md:p-6">
      {/* Header */}
      <div className="space-y-1 px-1">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Academic Dashboard
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400">
          Comprehensive overview of student performance and institutional metrics
        </p>
      </div>

      {/* Stats Grid with Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-6">
        {/* Stats Cards */}
        <div className="lg:col-span-8">
          {/* Stats cards grid - optimized for mobile landscape */}
          <div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="shadow-sm hover:shadow-md transition-shadow h-full">
                <CardContent className="p-3 @sm:p-4 md:p-5 h-full">
                  <div className="flex items-start justify-between h-full">
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <div className={`inline-flex p-2 rounded-lg ${stat.bgColor} ${stat.darkBgColor}`}>
                          <stat.icon className={`w-5 h-5 ${stat.color} ${stat.darkColor}`} />
                        </div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">
                          {stat.title}
                        </h3>
                        <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                    <div className={`self-end inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      stat.trend === 'up' ? 
                        'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400' : 
                        'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400'
                    }`}>
                      {stat.trend === 'up' ? (
                        <ArrowTrendingUpIcon className="w-3.5 h-3.5" />
                      ) : (
                        <ArrowTrendingDownIcon className="w-3.5 h-3.5" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Performance Trends and Score Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6">
            {/* Performance Trends */}
            <Card className="h-full">
              <CardHeader className="border-b border-gray-200 dark:border-gray-800 p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <ChartBarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-base sm:text-lg font-semibold">
                    Performance Trends
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6 min-h-[300px] @sm:min-h-[350px]">
                <DashboardChart />
              </CardContent>
            </Card>

            {/* Score Distribution */}
            <Card className="h-full">
              <CardHeader className="border-b border-gray-200 dark:border-gray-800 p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30">
                    <ChartBarIcon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <CardTitle className="text-base sm:text-lg font-semibold">
                    Score Distribution
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6 min-h-[300px] @sm:min-h-[350px]">
                <PerformanceBreakdown />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-4">
          <Card className="h-full">
            <CardHeader className="border-b border-gray-200 dark:border-gray-800 p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                  <ChartBarIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <CardTitle className="text-base sm:text-lg font-semibold">
                  Recent Activity
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6 min-h-[300px] @sm:min-h-[350px]">
              <RecentActivity />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}