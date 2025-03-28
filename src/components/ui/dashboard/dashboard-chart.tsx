"use client"

import { useState } from 'react'
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { ChevronDownIcon } from "@heroicons/react/24/outline"

const trendData = [
  { month: 'Jan', Mathematics: 65, Science: 70, English: 60, History: 68, Physics: 72 },
  { month: 'Feb', Mathematics: 68, Science: 75, English: 65, History: 70, Physics: 75 },
  { month: 'Mar', Mathematics: 72, Science: 78, English: 70, History: 73, Physics: 77 },
  { month: 'Apr', Mathematics: 75, Science: 80, English: 73, History: 75, Physics: 80 },
  { month: 'May', Mathematics: 78, Science: 82, English: 75, History: 78, Physics: 82 },
  { month: 'Jun', Mathematics: 82, Science: 85, English: 78, History: 80, Physics: 85 }
]

const subjects = {
  Mathematics: '#6366f1', // indigo-500
  Science: '#10b981', // emerald-500
  English: '#8b5cf6', // violet-500
  History: '#f59e0b', // amber-500
  Physics: '#ec4899'  // pink-500
}

export function DashboardChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(["Mathematics", "Science", "English"])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const toggleSubject = (subject: string) => {
    setSelectedSubjects(current => 
      current.includes(subject) 
        ? current.filter(s => s !== subject)
        : [...current, subject]
    )
  }

  return (
    <div className="space-y-4">
      {/* Desktop Subject Selector */}
      <div className="hidden md:flex flex-wrap gap-2">
        {Object.entries(subjects).map(([subject, color]) => (
          <Button
            key={subject}
            size="sm"
            variant={selectedSubjects.includes(subject) ? 'default' : 'outline'}
            className="gap-2"
            onClick={() => toggleSubject(subject)}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            {subject}
          </Button>
        ))}
      </div>

      {/* Mobile Subject Selector */}
      <div className="md:hidden space-y-2">
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
        >
          <span>Select Subjects ({selectedSubjects.length})</span>
          <ChevronDownIcon className={`h-4 w-4 transition-transform ${mobileFiltersOpen ? 'rotate-180' : ''}`} />
        </Button>
        
        {mobileFiltersOpen && (
          <div className="grid grid-cols-2 gap-2 p-3 border rounded-lg bg-slate-50 dark:bg-slate-800/50">
            {Object.entries(subjects).map(([subject, color]) => (
              <Button
                key={subject}
                size="sm"
                variant={selectedSubjects.includes(subject) ? 'default' : 'outline'}
                className="gap-2 justify-start"
                onClick={() => toggleSubject(subject)}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                {subject}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Chart Container */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
        <div className="h-[300px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={trendData}
              margin={{ top: 20, right: 30, left: 30, bottom: 10 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(226, 232, 240, 0.6)'}
                horizontal={true}
                vertical={true}
              />
              <XAxis
                dataKey="month"
                stroke={isDark ? '#94a3b8' : '#64748b'}
                fontSize={12}
                tickMargin={10}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke={isDark ? '#94a3b8' : '#64748b'}
                fontSize={12}
                tickFormatter={(value) => `${value}%`}
                tickMargin={10}
                width={40}
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1e293b' : '#ffffff',
                  border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  fontSize: '12px',
                  padding: '8px 12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              {selectedSubjects.map((subject) => (
                <Line
                  key={subject}
                  type="monotone"
                  dataKey={subject}
                  name={subject}
                  stroke={subjects[subject as keyof typeof subjects]}
                  strokeWidth={2}
                  dot={{ 
                    fill: subjects[subject as keyof typeof subjects], 
                    r: 4,
                    strokeWidth: 2,
                    stroke: isDark ? '#1e293b' : '#ffffff'
                  }}
                  activeDot={{ 
                    r: 6,
                    strokeWidth: 2,
                    stroke: isDark ? '#1e293b' : '#ffffff'
                  }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}