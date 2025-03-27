"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  UserGroupIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Academic Dashboard
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Comprehensive overview of student performance and institutional metrics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="inline-flex p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <UserGroupIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                      Total Students
                    </h3>
                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                      -
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="inline-flex p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                      Passing Rate
                    </h3>
                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                      -
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="inline-flex p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                      <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h3 className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                      At Risk Students
                    </h3>
                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                      -
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="border-b border-slate-200 dark:border-slate-800 p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <ChartBarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle>Performance Trends</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 min-h-[300px]">
                {/* Chart will go here */}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="border-b border-slate-200 dark:border-slate-800 p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30">
                    <ChartBarIcon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <CardTitle>Score Distribution</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 min-h-[300px]">
                {/* Distribution chart will go here */}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Activity Section */}
        <div className="lg:col-span-4">
          <Card className="h-full">
            <CardHeader className="border-b border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                  <ChartBarIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <CardTitle>Recent Activity</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Activity content will go here */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}