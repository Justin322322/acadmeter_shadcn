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
    { name: "Fri", math: 82, science: 85, english: 83 }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800">
            <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`} />
            <span className="text-slate-700 dark:text-slate-200">Math</span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800">
            <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-green-400' : 'bg-green-600'}`} />
            <span className="text-slate-700 dark:text-slate-200">Science</span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800">
            <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-violet-400' : 'bg-violet-600'}`} />
            <span className="text-slate-700 dark:text-slate-200">English</span>
          </div>
        </div>
      </div>
        <div className="min-h-[200px] sm:min-h-[250px] h-[28vh] sm:h-[32vh] max-h-[300px] sm:max-h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDark ? '#334155' : '#e2e8f0'} 
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke={isDark ? '#94a3b8' : '#64748b'}
                fontSize={12}
                tickMargin={8}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke={isDark ? '#94a3b8' : '#64748b'}
                fontSize={12}
                tickMargin={8}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1e293b' : '#ffffff',
                  border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                  borderRadius: '6px',
                  padding: '8px 12px',
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
                dot={{ fill: isDark ? '#60a5fa' : '#2563eb', r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="science"
                stroke={isDark ? '#4ade80' : '#16a34a'}
                strokeWidth={2}
                dot={{ fill: isDark ? '#4ade80' : '#16a34a', r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="english"
                stroke={isDark ? '#c084fc' : '#7c3aed'}
                strokeWidth={2}
                dot={{ fill: isDark ? '#c084fc' : '#7c3aed', r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
    </div>
  )
}