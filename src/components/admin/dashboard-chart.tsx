"use client"

import { useState } from 'react'
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'
import { ChevronDownIcon } from "@heroicons/react/24/outline"

// Sample data for different chart types
const lineData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
  { name: 'Aug', value: 4000 },
  { name: 'Sep', value: 3000 },
  { name: 'Oct', value: 5000 },
  { name: 'Nov', value: 2780 },
  { name: 'Dec', value: 1890 }
]

const barData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 278 },
  { name: 'May', value: 189 },
  { name: 'Jun', value: 239 }
]

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 }
]

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

interface DashboardChartProps {
  type?: 'line' | 'bar' | 'pie'
  chartType?: 'line' | 'bar' | 'pie'
  dataType?: 'revenue' | 'users' | 'contentViews' | 'userRoles' | 'revenueSources' | 'contentTypes'
  dateRange?: '7d' | '30d' | '90d' | '12m'
}

export function DashboardChart({ 
  type = 'line',
  chartType = 'line',
  dataType = 'revenue',
  dateRange = '30d'
}: DashboardChartProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [selectedDataset, setSelectedDataset] = useState<string>("all")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Use the chartType prop if provided, otherwise use type
  const actualChartType = chartType || type

  // Get data based on dataType
  const getData = () => {
    switch (dataType) {
      case 'revenue':
        return lineData
      case 'users':
        return barData
      case 'contentViews':
        return lineData.map(item => ({ ...item, value: item.value / 10 }))
      case 'userRoles':
        return [
          { name: 'Admin', value: 15 },
          { name: 'Editor', value: 30 },
          { name: 'Moderator', value: 25 },
          { name: 'Viewer', value: 120 }
        ]
      case 'revenueSources':
        return [
          { name: 'Subscriptions', value: 65 },
          { name: 'One-time Purchases', value: 20 },
          { name: 'Advertising', value: 10 },
          { name: 'Affiliates', value: 5 }
        ]
      case 'contentTypes':
        return [
          { name: 'Articles', value: 45 },
          { name: 'Pages', value: 15 },
          { name: 'Posts', value: 30 },
          { name: 'Products', value: 10 }
        ]
      default:
        return lineData
    }
  }

  const data = getData()

  // Format value for tooltip
  const formatValue = (value: number) => {
    if (dataType === 'revenue' || dataType === 'revenueSources') {
      return `$${value.toLocaleString()}`
    }
    return value.toLocaleString()
  }

  // Render appropriate chart type
  const renderChart = () => {
    switch (actualChartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%\" height={300}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(226, 232, 240, 0.6)'}
                vertical={true}
              />
              <XAxis
                dataKey="name"
                stroke={isDark ? '#94a3b8' : '#64748b'}
                fontSize={12}
                tickMargin={10}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke={isDark ? '#94a3b8' : '#64748b'}
                fontSize={12}
                tickFormatter={(value) => dataType === 'revenue' ? `$${value}` : value.toString()}
                tickMargin={10}
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
                formatter={(value: number) => [formatValue(value), dataType === 'revenue' ? 'Revenue' : dataType === 'users' ? 'Users' : 'Views']}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={isDark ? '#818cf8' : '#6366f1'}
                strokeWidth={2}
                dot={{ 
                  fill: isDark ? '#818cf8' : '#6366f1', 
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
            </LineChart>
          </ResponsiveContainer>
        )
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(226, 232, 240, 0.6)'}
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke={isDark ? '#94a3b8' : '#64748b'}
                fontSize={12}
                tickMargin={10}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke={isDark ? '#94a3b8' : '#64748b'}
                fontSize={12}
                tickFormatter={(value) => dataType === 'revenue' ? `$${value}` : value.toString()}
                tickMargin={10}
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
                formatter={(value: number) => [formatValue(value), dataType === 'revenue' ? 'Revenue' : dataType === 'users' ? 'Users' : 'Views']}
              />
              <Bar
                dataKey="value"
                fill={isDark ? '#818cf8' : '#6366f1'}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1e293b' : '#ffffff',
                  border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  fontSize: '12px',
                  padding: '8px 12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number) => [formatValue(value), '']}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {/* Chart Container */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
        {renderChart()}
      </div>
    </div>
  )
}