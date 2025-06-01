"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon
} from "@heroicons/react/24/outline"

interface ReportTemplate {
  id: string
  name: string
  description: string
  type: string
  icon: React.ElementType
  parameters: {
    name: string
    type: 'date' | 'select' | 'text'
    label: string
    options?: string[]
  }[]
}

export function ReportGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportParameters, setReportParameters] = useState<Record<string, string>>({})

  const reportTemplates: ReportTemplate[] = [
    {
      id: "1",
      name: "User Activity Report",
      description: "Detailed analysis of user logins, actions, and session durations",
      type: "user",
      icon: UserGroupIcon,
      parameters: [
        {
          name: "dateRange",
          type: "select",
          label: "Date Range",
          options: ["Last 7 days", "Last 30 days", "Last 90 days", "Last year", "Custom"]
        },
        {
          name: "userType",
          type: "select",
          label: "User Type",
          options: ["All Users", "Administrators", "Editors", "Moderators", "Viewers"]
        }
      ]
    },
    {
      id: "2",
      name: "Revenue Report",
      description: "Financial performance metrics and revenue breakdown",
      type: "revenue",
      icon: CurrencyDollarIcon,
      parameters: [
        {
          name: "dateRange",
          type: "select",
          label: "Date Range",
          options: ["Last 7 days", "Last 30 days", "Last 90 days", "Last year", "Custom"]
        },
        {
          name: "revenueSource",
          type: "select",
          label: "Revenue Source",
          options: ["All Sources", "Subscriptions", "One-time Purchases", "Advertising", "Affiliates"]
        }
      ]
    },
    {
      id: "3",
      name: "Content Performance Report",
      description: "Analysis of content views, engagement, and conversion metrics",
      type: "content",
      icon: DocumentTextIcon,
      parameters: [
        {
          name: "dateRange",
          type: "select",
          label: "Date Range",
          options: ["Last 7 days", "Last 30 days", "Last 90 days", "Last year", "Custom"]
        },
        {
          name: "contentType",
          type: "select",
          label: "Content Type",
          options: ["All Types", "Articles", "Pages", "Posts", "Products"]
        }
      ]
    },
    {
      id: "4",
      name: "System Performance Report",
      description: "Overview of system metrics, response times, and error rates",
      type: "system",
      icon: ChartBarIcon,
      parameters: [
        {
          name: "dateRange",
          type: "select",
          label: "Date Range",
          options: ["Last 7 days", "Last 30 days", "Last 90 days", "Last year", "Custom"]
        },
        {
          name: "metrics",
          type: "select",
          label: "Metrics",
          options: ["All Metrics", "Response Time", "Error Rate", "User Load", "API Usage"]
        }
      ]
    }
  ]

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTemplates.map((template) => (
          <div
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-md rounded-lg border p-4 ${
              selectedTemplate?.id === template.id
                ? 'ring-2 ring-indigo-500 dark:ring-indigo-400 border-indigo-200 dark:border-indigo-800'
                : 'border-slate-200 dark:border-slate-700'
            }`}
            onClick={() => setSelectedTemplate(template)}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50">
                <template.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">{template.name}</h3>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{template.description}</p>
          </div>
        ))}
      </div>

      {selectedTemplate && (
        <div className="mt-6 p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50">
              <selectedTemplate.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-base font-medium text-slate-900 dark:text-slate-100">{selectedTemplate.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{selectedTemplate.description}</p>
            </div>
          </div>

          <div className="space-y-4">
            {selectedTemplate.parameters.map((param) => (
              <div key={param.name} className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  {param.label}
                </label>
                {param.type === 'select' ? (
                  <select
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
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
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
                    value={reportParameters[param.name] || ''}
                    onChange={(e) => handleParameterChange(param.name, e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
                    value={reportParameters[param.name] || ''}
                    onChange={(e) => handleParameterChange(param.name, e.target.value)}
                    placeholder={`Enter ${param.label.toLowerCase()}`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
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
      )}

      {!selectedTemplate && (
        <div className="text-center p-8 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
          <DocumentTextIcon className="h-12 w-12 mx-auto text-slate-400" />
          <h3 className="mt-4 text-lg font-medium text-slate-900 dark:text-slate-100">
            Select a Report Template
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Choose a report template from the options above to generate a custom report
          </p>
        </div>
      )}
    </div>
  )
}