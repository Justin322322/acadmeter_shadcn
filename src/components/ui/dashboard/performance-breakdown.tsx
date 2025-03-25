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
import { ChevronDownIcon } from "@heroicons/react/24/outline"

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
  const [mobileSubjectOpen, setMobileSubjectOpen] = useState(false)

  const formatDataForChart = (subject: typeof performanceData[0]) => {
    return Object.entries(subject.breakdown).map(([category, score]) => ({
      category,
      score
    }))
  }

  return (
    <div className="w-full space-y-6 p-1">
      {/* Desktop Subject Selector */}
      <div className="hidden md:flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        <div className="flex flex-wrap gap-3">
          {performanceData.map((subject) => (
            <Button
              key={subject.subject}
              size="sm"
              variant={selectedSubject.subject === subject.subject ? 'default' : 'outline'}
              onClick={() => setSelectedSubject(subject)}
              className="min-w-[100px] justify-center"
            >
              {subject.subject}
            </Button>
          ))}
        </div>
        <div className="flex gap-3">
          <Button
            size="sm"
            variant={view === 'chart' ? 'default' : 'outline'}
            onClick={() => setView('chart')}
            className="min-w-[120px]"
          >
            Chart View
          </Button>
          <Button
            size="sm"
            variant={view === 'details' ? 'default' : 'outline'}
            onClick={() => setView('details')}
            className="min-w-[120px]"
          >
            Details View
          </Button>
        </div>
      </div>

      {/* Mobile Subject Selector */}
      <div className="md:hidden space-y-4">
        <div className="relative">
          <Button
            variant="outline"
            className="w-full justify-between px-4 py-2"
            onClick={() => setMobileSubjectOpen(!mobileSubjectOpen)}
          >
            <span className="font-medium">{selectedSubject.subject}</span>
            <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${mobileSubjectOpen ? 'rotate-180' : ''}`} />
          </Button>
          
          {mobileSubjectOpen && (
            <div className="absolute z-10 w-full mt-2 grid grid-cols-1 gap-2 p-3 border rounded-lg shadow-lg bg-white dark:bg-slate-800 dark:border-slate-700">
              {performanceData.map((subject) => (
                <Button
                  key={subject.subject}
                  size="sm"
                  variant={selectedSubject.subject === subject.subject ? 'default' : 'outline'}
                  onClick={() => {
                    setSelectedSubject(subject)
                    setMobileSubjectOpen(false)
                  }}
                  className="w-full justify-center py-2"
                >
                  {subject.subject}
                </Button>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex gap-3">
          <Button
            size="sm"
            variant={view === 'chart' ? 'default' : 'outline'}
            onClick={() => setView('chart')}
            className="flex-1 py-2"
          >
            Chart
          </Button>
          <Button
            size="sm"
            variant={view === 'details' ? 'default' : 'outline'}
            onClick={() => setView('details')}
            className="flex-1 py-2"
          >
            Details
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl shadow-sm">
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                {selectedSubject.subject}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Current Performance Overview
              </p>
            </div>
            <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-700/50 px-4 py-2 rounded-lg">
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {selectedSubject.currentScore}%
              </span>
              <div className="flex items-center gap-1 text-sm font-medium text-emerald-500">
                <span>+{selectedSubject.change}%</span>
              </div>
            </div>
          </div>

          {view === 'chart' ? (
            <div className="w-full aspect-[16/9] min-h-[300px] max-h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={formatDataForChart(selectedSubject)}
                  margin={{ top: 20, right: 20, left: 0, bottom: 60 }}
                >
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={isDark ? '#334155' : '#e2e8f0'}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="category"
                    stroke={isDark ? '#94a3b8' : '#64748b'}
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    tickMargin={5}
                  />
                  <YAxis
                    stroke={isDark ? '#94a3b8' : '#64748b'}
                    fontSize={12}
                    tickFormatter={(value) => `${value}%`}
                    width={45}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#1e293b' : '#ffffff',
                      border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                      borderRadius: '8px',
                      fontSize: '13px',
                      padding: '8px 12px'
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
            <div className="space-y-6">
              {Object.entries(selectedSubject.breakdown).map(([category, score]) => (
                <div key={category} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {category}
                    </span>
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {score}%
                    </span>
                  </div>
                  <div className="relative">
                    <div className="overflow-hidden h-2.5 text-xs flex rounded-full bg-slate-200 dark:bg-slate-700">
                      <div
                        style={{ width: `${score}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}