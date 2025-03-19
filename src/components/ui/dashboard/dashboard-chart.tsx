"use client"

import { useTheme } from "@/components/theme-provider"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function DashboardChart() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const data = [
    { name: "Mon", math: 65, science: 70, english: 60 },
    { name: "Tue", math: 78, science: 75, english: 82 },
    { name: "Wed", math: 72, science: 68, english: 77 },
    { name: "Thu", math: 85, science: 80, english: 79 },
    { name: "Fri", math: 82, science: 85, english: 83 },
    { name: "Sat", math: 90, science: 87, english: 88 },
    { name: "Sun", math: 88, science: 91, english: 86 }
  ]

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={data}
          margin={{ top: 10, right: 20, bottom: 10, left: 10 }}
        >
          <CartesianGrid 
            strokeDasharray="3" 
            stroke={isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(148, 163, 184, 0.3)'} 
            horizontal={true}
            vertical={true}
            strokeWidth={1.2}
          />
          <XAxis 
            dataKey="name" 
            stroke={isDark ? '#94a3b8' : '#64748b'}
            fontSize={12}
            tickMargin={8}
            axisLine={{ stroke: isDark ? '#475569' : '#cbd5e1', strokeWidth: 2 }}
            tickLine={{ stroke: isDark ? '#475569' : '#cbd5e1', strokeWidth: 2 }}
          />
          <YAxis 
            stroke={isDark ? '#94a3b8' : '#64748b'}
            fontSize={12}
            tickMargin={12}
            axisLine={{ stroke: isDark ? '#475569' : '#cbd5e1', strokeWidth: 2 }}
            tickLine={{ stroke: isDark ? '#475569' : '#cbd5e1', strokeWidth: 2 }}
            width={40}
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: isDark ? '#1e293b' : '#ffffff',
              border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
              borderRadius: '6px',
              padding: '8px 12px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
            }}
            labelStyle={{ 
              color: isDark ? '#e2e8f0' : '#1e293b',
              fontWeight: 500,
              marginBottom: '4px'
            }}
            itemStyle={{
              color: isDark ? '#e2e8f0' : '#1e293b',
              fontSize: '12px',
              padding: '2px 0'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="math" 
            stroke={isDark ? '#60a5fa' : '#2563eb'}
            strokeWidth={2}
            dot={{ fill: isDark ? '#60a5fa' : '#2563eb', r: 3 }}
            activeDot={{ r: 5, strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="science" 
            stroke={isDark ? '#4ade80' : '#16a34a'}
            strokeWidth={2}
            dot={{ fill: isDark ? '#4ade80' : '#16a34a', r: 3 }}
            activeDot={{ r: 5, strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="english" 
            stroke={isDark ? '#c084fc' : '#7c3aed'}
            strokeWidth={2}
            dot={{ fill: isDark ? '#c084fc' : '#7c3aed', r: 3 }}
            activeDot={{ r: 5, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}