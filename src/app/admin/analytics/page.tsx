"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalyticsChart } from "@/components/admin/analytics-chart"
import { AnalyticsMetrics } from "@/components/admin/analytics-metrics"
import { ReportGenerator } from "@/components/admin/report-generator"
import {
  ArrowDownTrayIcon,
  CalendarIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | '12m'>('30d')
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'revenue' | 'content'>('overview')
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)

  const handleGenerateReport = () => {
    setIsGeneratingReport(true)
    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingReport(false)
    }, 2000)
  }

  const dateRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '12m', label: 'Last 12 months' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Analytics & Reporting</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Analyze performance metrics and generate reports</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as '7d' | '30d' | '90d' | '12m')}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
          >
            {dateRangeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <Button className="gap-2" onClick={handleGenerateReport} disabled={isGeneratingReport}>
            {isGeneratingReport ? (
              <>
                <ArrowPathIcon className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <ArrowDownTrayIcon className="h-4 w-4" />
                Export Report
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full" onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="flex space-x-2 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg w-fit mb-6">
          <TabsTrigger 
            value="overview"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm px-4 py-2"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="users"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm px-4 py-2"
          >
            Users
          </TabsTrigger>
          <TabsTrigger 
            value="revenue"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm px-4 py-2"
          >
            Revenue
          </TabsTrigger>
          <TabsTrigger 
            value="content"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm px-4 py-2"
          >
            Content
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-3">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                    <ChartBarIcon className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                  </div>
                  <div>
                    <CardTitle>Performance Overview</CardTitle>
                    <CardDescription>Key metrics for the selected period</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AnalyticsMetrics dateRange={dateRange} />
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/50">
                    <CurrencyDollarIcon className="w-5 h-5 text-green-600 dark:text-green-500" />
                  </div>
                  <div>
                    <CardTitle>Revenue Trends</CardTitle>
                    <CardDescription>Revenue performance over time</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AnalyticsChart type="line" dataType="revenue" dateRange={dateRange} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-950/50">
                    <UserGroupIcon className="w-5 h-5 text-violet-600 dark:text-violet-500" />
                  </div>
                  <div>
                    <CardTitle>User Growth</CardTitle>
                    <CardDescription>New user registrations</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AnalyticsChart type="bar" dataType="users" dateRange={dateRange} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-3">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                    <UserGroupIcon className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                  </div>
                  <div>
                    <CardTitle>User Metrics</CardTitle>
                    <CardDescription>User activity and engagement</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AnalyticsMetrics dateRange={dateRange} metricType="users" />
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                    <UserGroupIcon className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                  </div>
                  <div>
                    <CardTitle>User Growth</CardTitle>
                    <CardDescription>New user registrations over time</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AnalyticsChart type="line" dataType="users" dateRange={dateRange} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                    <UserGroupIcon className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                  </div>
                  <div>
                    <CardTitle>User Distribution</CardTitle>
                    <CardDescription>Users by role</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AnalyticsChart type="pie" dataType="userRoles" dateRange={dateRange} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="revenue" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-3">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/50">
                    <CurrencyDollarIcon className="w-5 h-5 text-green-600 dark:text-green-500" />
                  </div>
                  <div>
                    <CardTitle>Revenue Metrics</CardTitle>
                    <CardDescription>Financial performance indicators</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AnalyticsMetrics dateRange={dateRange} metricType="revenue" />
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/50">
                    <CurrencyDollarIcon className="w-5 h-5 text-green-600 dark:text-green-500" />
                  </div>
                  <div>
                    <CardTitle>Revenue Trends</CardTitle>
                    <CardDescription>Revenue performance over time</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AnalyticsChart type="line" dataType="revenue" dateRange={dateRange} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/50">
                    <CurrencyDollarIcon className="w-5 h-5 text-green-600 dark:text-green-500" />
                  </div>
                  <div>
                    <CardTitle>Revenue Sources</CardTitle>
                    <CardDescription>Revenue by source</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AnalyticsChart type="pie" dataType="revenueSources" dateRange={dateRange} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="content" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-3">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50">
                    <DocumentTextIcon className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                  </div>
                  <div>
                    <CardTitle>Content Metrics</CardTitle>
                    <CardDescription>Content performance indicators</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AnalyticsMetrics dateRange={dateRange} metricType="content" />
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50">
                    <DocumentTextIcon className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                  </div>
                  <div>
                    <CardTitle>Content Views</CardTitle>
                    <CardDescription>Content view trends over time</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AnalyticsChart type="line" dataType="contentViews" dateRange={dateRange} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50">
                    <DocumentTextIcon className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                  </div>
                  <div>
                    <CardTitle>Content Types</CardTitle>
                    <CardDescription>Distribution by type</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AnalyticsChart type="pie" dataType="contentTypes" dateRange={dateRange} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50">
              <DocumentTextIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-500" />
            </div>
            <div>
              <CardTitle>Custom Reports</CardTitle>
              <CardDescription>Generate custom reports based on your requirements</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ReportGenerator />
        </CardContent>
      </Card>
    </div>
  )
}