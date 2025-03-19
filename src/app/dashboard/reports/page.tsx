"use client"

import { ComponentType, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ChartBarIcon,
  UsersIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline"

interface ReportTemplate {
  id: string
  name: string
  description: string
  type: string
  icon: ComponentType<{ className?: string }>
  parameters: {
    name: string
    type: 'date' | 'select' | 'text'
    label: string
    options?: string[]
  }[]
}

const reportTemplates: ReportTemplate[] = [
  {
    id: "1",
    name: "User Activity Report",
    description: "Detailed analysis of user logins, actions, and session durations",
    type: "activity",
    icon: UsersIcon,
    parameters: [
      {
        name: "dateRange",
        type: "date",
        label: "Date Range"
      },
      {
        name: "userType",
        type: "select",
        label: "User Type",
        options: ["All Users", "Administrators", "Teachers", "Students"]
      }
    ]
  },
  {
    id: "2",
    name: "System Performance Report",
    description: "Overview of system metrics, response times, and error rates",
    type: "performance",
    icon: ChartBarIcon,
    parameters: [
      {
        name: "dateRange",
        type: "date",
        label: "Date Range"
      },
      {
        name: "metrics",
        type: "select",
        label: "Metrics",
        options: ["All Metrics", "Response Time", "Error Rate", "User Load"]
      }
    ]
  },
  {
    id: "3",
    name: "Audit Log Report",
    description: "Comprehensive audit trail of system changes and administrative actions",
    type: "audit",
    icon: DocumentTextIcon,
    parameters: [
      {
        name: "dateRange",
        type: "date",
        label: "Date Range"
      },
      {
        name: "actionType",
        type: "select",
        label: "Action Type",
        options: ["All Actions", "User Management", "System Config", "Data Changes"]
      }
    ]
  }
]

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<ReportTemplate | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportParameters, setReportParameters] = useState<Record<string, string>>({})

  const handleParameterChange = (name: string, value: string) => {
    setReportParameters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleGenerateReport = () => {
    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Reports</h1>
        <p className="text-slate-500 dark:text-slate-400">Generate and download system reports</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reportTemplates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedReport?.id === template.id
                ? 'ring-2 ring-blue-500 dark:ring-blue-400'
                : ''
            }`}
            onClick={() => setSelectedReport(template)}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <template.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{template.description}</p>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {selectedReport && (
        <Card>
          <CardHeader className="border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <CardTitle>Generate {selectedReport.name}</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedReport(null)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  className="gap-2"
                >
                  {isGenerating ? (
                    <>
                      <ArrowPathIcon className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <ArrowDownTrayIcon className="h-4 w-4" />
                      Generate Report
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-6 space-y-4">
              {selectedReport.parameters.map((param) => (
                <div key={param.name} className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {param.label}
                  </label>
                  {param.type === 'select' ? (
                    <select
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                      value={reportParameters[param.name] || ''}
                      onChange={(e) => handleParameterChange(param.name, e.target.value)}
                    >
                      <option value="">Select {param.label}</option>
                      {param.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : param.type === 'date' ? (
                    <input
                      type="date"
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                      value={reportParameters[param.name] || ''}
                      onChange={(e) => handleParameterChange(param.name, e.target.value)}
                    />
                  ) : (
                    <input
                      type="text"
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                      value={reportParameters[param.name] || ''}
                      onChange={(e) => handleParameterChange(param.name, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}