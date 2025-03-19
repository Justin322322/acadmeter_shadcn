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
    <div className="px-4 pt-2 pb-4">
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm mb-4">
        <div className="flex items-center gap-2 min-w-[80px]">
          <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`} />
          <span className="text-slate-600 dark:text-slate-300">Math</span>
        </div>
        <div className="flex items-center gap-2 min-w-[80px]">
          <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-green-400' : 'bg-green-600'}`} />
          <span className="text-slate-600 dark:text-slate-300">Science</span>
        </div>
        <div className="flex items-center gap-2 min-w-[80px]">
          <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-violet-400' : 'bg-violet-600'}`} />
          <span className="text-slate-600 dark:text-slate-300">English</span>
        </div>
      </div>
      <div className="min-h-[250px] h-[32vh] max-h-[350px] w-full">
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