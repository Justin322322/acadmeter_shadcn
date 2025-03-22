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

const trendData = [
  { month: 'Jan', Mathematics: 65, Science: 70, English: 60, History: 68, Physics: 72 },
  { month: 'Feb', Mathematics: 68, Science: 75, English: 65, History: 70, Physics: 75 },
  { month: 'Mar', Mathematics: 72, Science: 78, English: 70, History: 73, Physics: 77 },
  { month: 'Apr', Mathematics: 75, Science: 80, English: 73, History: 75, Physics: 80 },
  { month: 'May', Mathematics: 78, Science: 82, English: 75, History: 78, Physics: 82 },
  { month: 'Jun', Mathematics: 82, Science: 85, English: 78, History: 80, Physics: 85 }
]

const subjects = {
  Mathematics: '#2563eb', // blue
  Science: '#16a34a', // green
  English: '#9333ea', // purple
  History: '#eab308', // yellow
  Physics: '#dc2626' // red
}

export function DashboardChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(["Mathematics", "Science", "English"])

  const toggleSubject = (subject: string) => {
    setSelectedSubjects(current => 
      current.includes(subject) 
        ? current.filter(s => s !== subject)
        : [...current, subject]
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
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

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trendData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
            <XAxis
              dataKey="month"
              stroke={isDark ? '#94a3b8' : '#64748b'}
              fontSize={12}
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
            {selectedSubjects.map((subject) => (
              <Line
                key={subject}
                type="monotone"
                dataKey={subject}
                name={subject}
                stroke={subjects[subject as keyof typeof subjects]}
                strokeWidth={2}
                dot={{ fill: subjects[subject as keyof typeof subjects], r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}