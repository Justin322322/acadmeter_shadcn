"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  EyeIcon
} from "@heroicons/react/24/outline"

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
  icon: React.ElementType
  color: string
  bgColor: string
}

interface AnalyticsMetricsProps {
  dateRange: string
  metricType?: 'overview' | 'users' | 'revenue' | 'content'
}

export function AnalyticsMetrics({ 
  dateRange = '30d',
  metricType = 'overview'
}: AnalyticsMetricsProps) {
  // Generate metrics based on type
  const getMetrics = (): MetricCardProps[] => {
    switch (metricType) {
      case 'users':
        return [
          {
            title: "Total Users",
            value: "12,845",
            change: "+12.5%",
            trend: "up",
            icon: UserGroupIcon,
            color: "text-blue-600 dark:text-blue-500",
            bgColor: "bg-blue-50 dark:bg-blue-950/50"
          },
          {
            title: "New Users",
            value: "1,245",
            change: "+8.2%",
            trend: "up",
            icon: UserGroupIcon,
            color: "text-green-600 dark:text-green-500",
            bgColor: "bg-green-50 dark:bg-green-950/50"
          },
          {
            title: "Active Users",
            value: "8,632",
            change: "+5.1%",
            trend: "up",
            icon: UserGroupIcon,
            color: "text-violet-600 dark:text-violet-500",
            bgColor: "bg-violet-50 dark:bg-violet-950/50"
          },
          {
            title: "Conversion Rate",
            value: "3.2%",
            change: "+0.4%",
            trend: "up",
            icon: UserGroupIcon,
            color: "text-amber-600 dark:text-amber-500",
            bgColor: "bg-amber-50 dark:bg-amber-950/50"
          }
        ]
      case 'revenue':
        return [
          {
            title: "Total Revenue",
            value: "$48,574",
            change: "+7.2%",
            trend: "up",
            icon: CurrencyDollarIcon,
            color: "text-green-600 dark:text-green-500",
            bgColor: "bg-green-50 dark:bg-green-950/50"
          },
          {
            title: "Average Order",
            value: "$86.42",
            change: "+2.5%",
            trend: "up",
            icon: CurrencyDollarIcon,
            color: "text-blue-600 dark:text-blue-500",
            bgColor: "bg-blue-50 dark:bg-blue-950/50"
          },
          {
            title: "Refund Rate",
            value: "1.2%",
            change: "-0.3%",
            trend: "down",
            icon: CurrencyDollarIcon,
            color: "text-green-600 dark:text-green-500",
            bgColor: "bg-green-50 dark:bg-green-950/50"
          },
          {
            title: "MRR",
            value: "$12,845",
            change: "+5.8%",
            trend: "up",
            icon: CurrencyDollarIcon,
            color: "text-violet-600 dark:text-violet-500",
            bgColor: "bg-violet-50 dark:bg-violet-950/50"
          }
        ]
      case 'content':
        return [
          {
            title: "Total Content",
            value: "1,245",
            change: "+8.2%",
            trend: "up",
            icon: DocumentTextIcon,
            color: "text-amber-600 dark:text-amber-500",
            bgColor: "bg-amber-50 dark:bg-amber-950/50"
          },
          {
            title: "Published",
            value: "876",
            change: "+5.4%",
            trend: "up",
            icon: DocumentTextIcon,
            color: "text-green-600 dark:text-green-500",
            bgColor: "bg-green-50 dark:bg-green-950/50"
          },
          {
            title: "Total Views",
            value: "245,632",
            change: "+12.7%",
            trend: "up",
            icon: EyeIcon,
            color: "text-blue-600 dark:text-blue-500",
            bgColor: "bg-blue-50 dark:bg-blue-950/50"
          },
          {
            title: "Avg. Time on Page",
            value: "2m 45s",
            change: "+0.8%",
            trend: "up",
            icon: DocumentTextIcon,
            color: "text-violet-600 dark:text-violet-500",
            bgColor: "bg-violet-50 dark:bg-violet-950/50"
          }
        ]
      default:
        return [
          {
            title: "Total Users",
            value: "12,845",
            change: "+12.5%",
            trend: "up",
            icon: UserGroupIcon,
            color: "text-blue-600 dark:text-blue-500",
            bgColor: "bg-blue-50 dark:bg-blue-950/50"
          },
          {
            title: "Revenue",
            value: "$48,574",
            change: "+7.2%",
            trend: "up",
            icon: CurrencyDollarIcon,
            color: "text-green-600 dark:text-green-500",
            bgColor: "bg-green-50 dark:bg-green-950/50"
          },
          {
            title: "Content Views",
            value: "245,632",
            change: "+12.7%",
            trend: "up",
            icon: EyeIcon,
            color: "text-violet-600 dark:text-violet-500",
            bgColor: "bg-violet-50 dark:bg-violet-950/50"
          },
          {
            title: "Conversion Rate",
            value: "3.2%",
            change: "+0.4%",
            trend: "up",
            icon: DocumentTextIcon,
            color: "text-amber-600 dark:text-amber-500",
            bgColor: "bg-amber-50 dark:bg-amber-950/50"
          }
        ]
    }
  }

  const metrics = getMetrics()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="border-slate-200 dark:border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`w-5 h-5 ${metric.color}`} aria-hidden="true" />
              </div>
              <div className={`flex items-center gap-1 ${
                metric.trend === 'up'
                  ? 'text-green-600 dark:text-green-500'
                  : metric.trend === 'down'
                  ? 'text-red-600 dark:text-red-500'
                  : 'text-slate-600 dark:text-slate-400'
              }`}>
                {metric.trend === 'up' && <ArrowTrendingUpIcon className="w-4 h-4" />}
                {metric.trend === 'down' && <ArrowTrendingDownIcon className="w-4 h-4" />}
                <span className="text-sm font-medium">{metric.change}</span>
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">{metric.title}</h3>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">{metric.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}