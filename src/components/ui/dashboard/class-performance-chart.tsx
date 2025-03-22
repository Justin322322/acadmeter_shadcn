"use client"

import { useState } from 'react'
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
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
    Assignments: 88,
    Exams: 92,
    Participation: 85
  },
  {
    subject: "Science",
    Assignments: 85,
    Exams: 88,
    Participation: 90
  },
  {
    subject: "English",
    Assignments: 82,
    Exams: 85,
    Participation: 88
  },
  {
    subject: "History",
    Assignments: 86,
    Exams: 89,
    Participation: 84
  },
  {
    subject: "Physics",
    Assignments: 84,
    Exams: 87,
    Participation: 86
  }
]

const performanceTypes = {
  Assignments: '#2563eb', // blue
  Exams: '#dc2626', // red
  Participation: '#16a34a' // green
}

export function ClassPerformanceChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["Assignments", "Exams", "Participation"])

  const togglePerformanceType = (type: string) => {
    setSelectedTypes(current => 
      current.includes(type) 
        ? current.filter(t => t !== type)
        : [...current, type]
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Object.entries(performanceTypes).map(([type, color]) => (
          <Button
            key={type}
            size="sm"
            variant={selectedTypes.includes(type) ? 'default' : 'outline'}
            className="gap-2"
            onClick={() => togglePerformanceType(type)}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            {type}
          </Button>
        ))}
      </div>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={performanceData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
            <XAxis
              dataKey="subject"
              stroke={isDark ? '#94a3b8' : '#64748b'}
              fontSize={12}
              tickFormatter={(value) => value.split(' ')[0]}
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
            {selectedTypes.map((type) => (
              <Bar
                key={type}
                dataKey={type}
                name={type}
                fill={performanceTypes[type as keyof typeof performanceTypes]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}