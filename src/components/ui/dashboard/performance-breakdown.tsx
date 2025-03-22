"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const performanceData = [
  {
    subject: "Mathematics",
    currentScore: 92,
    change: 5,
    breakdown: {
      "Problem Solving": 94,
      "Concept Understanding": 90,
      "Homework Completion": 95,
      "Class Participation": 88
    }
  },
  {
    subject: "Physics",
    currentScore: 88,
    change: 3,
    breakdown: {
      "Lab Work": 92,
      "Theory Understanding": 85,
      "Problem Solving": 88,
      "Project Work": 90
    }
  },
  {
    subject: "English",
    currentScore: 85,
    change: 2,
    breakdown: {
      "Writing": 87,
      "Reading Comprehension": 84,
      "Speaking": 86,
      "Literature Analysis": 83
    }
  }
]

export function PerformanceBreakdown() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [selectedSubject, setSelectedSubject] = useState(performanceData[0])
  const [view, setView] = useState<'chart' | 'details'>('chart')

  const formatDataForChart = (subject: typeof performanceData[0]) => {
    return Object.entries(subject.breakdown).map(([category, score]) => ({
      category,
      score
    }))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex flex-wrap gap-2">
          {performanceData.map((subject) => (
            <Button
              key={subject.subject}
              size="sm"
              variant={selectedSubject.subject === subject.subject ? 'default' : 'outline'}
              onClick={() => setSelectedSubject(subject)}
            >
              {subject.subject}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={view === 'chart' ? 'default' : 'outline'}
            onClick={() => setView('chart')}
          >
            Chart View
          </Button>
          <Button
            size="sm"
            variant={view === 'details' ? 'default' : 'outline'}
            onClick={() => setView('details')}
          >
            Details View
          </Button>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {selectedSubject.subject}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Current Performance Overview
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {selectedSubject.currentScore}%
            </span>
            <div className="flex items-center gap-1 text-sm text-emerald-500">
              <span>+{selectedSubject.change}%</span>
            </div>
          </div>
        </div>

        {view === 'chart' ? (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={formatDataForChart(selectedSubject)}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
                <XAxis
                  dataKey="category"
                  stroke={isDark ? '#94a3b8' : '#64748b'}
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  stroke={isDark ? '#94a3b8' : '#64748b'}
                  fontSize={12}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1e293b' : '#ffffff',
                    border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                />
                <Bar
                  dataKey="score"
                  fill={isDark ? '#3b82f6' : '#2563eb'}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(selectedSubject.breakdown).map(([category, score]) => (
              <div key={category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {category}
                  </span>
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {score}%
                  </span>
                </div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                      style={{ width: `${score}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}