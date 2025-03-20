"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardChart } from "@/components/ui/dashboard/dashboard-chart"
import {
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  BoltIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline"

interface PredictiveMetric {
  id: string
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  prediction: string
  confidence: number
}

interface RiskFactor {
  id: string
  student: string
  riskLevel: 'high' | 'medium' | 'low'
  indicators: string[]
  trend: string
  lastUpdated: string
}

const predictiveMetrics: PredictiveMetric[] = [
  {
    id: "1",
    title: "Predicted Class Average",
    value: "84.5%",
    change: "+2.1%",
    trend: "up",
    prediction: "Upward trend expected to continue based on recent performance patterns",
    confidence: 85
  },
  {
    id: "2",
    title: "Expected Completion Rate",
    value: "96.2%",
    change: "-0.8%",
    trend: "down",
    prediction: "Slight decrease predicted due to upcoming challenging modules",
    confidence: 78
  }
]

const riskFactors: RiskFactor[] = [
  {
    id: "1",
    student: "James Wilson",
    riskLevel: "high",
    indicators: ["Declining test scores", "Decreased participation", "Missing assignments"],
    trend: "Worsening",
    lastUpdated: "2024-01-20"
  },
  {
    id: "2",
    student: "Emma Brown",
    riskLevel: "medium",
    indicators: ["Inconsistent attendance", "Average test performance"],
    trend: "Stable",
    lastUpdated: "2024-01-20"
  },
  {
    id: "3",
    student: "Lucas Garcia",
    riskLevel: "low",
    indicators: ["Improving participation", "Minor grade fluctuations"],
    trend: "Improving",
    lastUpdated: "2024-01-19"
  }
]

export default function AnalyticsPage() {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'text-red-600 dark:text-red-500 bg-red-50 dark:bg-red-950/50'
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-500 bg-yellow-50 dark:bg-yellow-950/50'
      case 'low':
        return 'text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-950/50'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Analytics & Predictions</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Machine learning-powered insights and risk assessment</p>
        </div>
        <Button className="gap-2">
          <ArrowPathIcon className="w-4 h-4" />
          Update Predictions
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Predictive Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {predictiveMetrics.map((metric) => (
            <Card key={metric.id} className="border-slate-200 dark:border-slate-800">
              <CardHeader className="border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold">{metric.title}</CardTitle>
                  <div className="flex items-center gap-1">
                    <BoltIcon className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-slate-500">{metric.confidence}% confidence</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">
                    {metric.value}
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
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {metric.prediction}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Trends */}
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader className="border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                <ChartBarIcon className="w-5 h-5 text-blue-600 dark:text-blue-500" />
              </div>
              <div>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Historical and predicted performance patterns</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <DashboardChart />
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader className="border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50">
                <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 dark:text-amber-500" />
              </div>
              <div>
                <CardTitle>Student Risk Assessment</CardTitle>
                <CardDescription>AI-powered early warning system</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-6 space-y-6">
              {riskFactors.map((risk) => (
                <div
                  key={risk.id}
                  className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700"
                >
                  <div className="sm:w-64 flex-shrink-0">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-900 dark:text-white">
                        {risk.student}
                      </span>
                      <span className={`inline-flex items-center mt-1 px-2 py-0.5 rounded text-xs font-medium ${getRiskColor(risk.riskLevel)}`}>
                        {risk.riskLevel.charAt(0).toUpperCase() + risk.riskLevel.slice(1)} Risk
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {risk.indicators.map((indicator, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                        >
                          {indicator}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <BeakerIcon className="w-4 h-4" />
                      <span>Trend: {risk.trend}</span>
                      <span className="mx-2">•</span>
                      <span>Updated {risk.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}