"use client"

import { motion } from "framer-motion"
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline"
import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

const performanceData = [
  {
    subject: "Mathematics",
    score: 85,
    previousScore: 80,
  },
  {
    subject: "Science",
    score: 92,
    previousScore: 88,
  },
  {
    subject: "English",
    score: 78,
    previousScore: 75,
  },
  {
    subject: "History",
    score: 88,
    previousScore: 85,
  }
]

const timeframes = ["Weekly", "Monthly", "Quarterly", "Yearly"]

export function PerformanceBreakdown() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [selectedTimeframe, setSelectedTimeframe] = useState("Weekly")

  return (
    <Card className="w-full">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Performance Trends</h3>
          <div className="flex gap-2">
            {timeframes.map((timeframe) => (
              <Button
                key={timeframe}
                variant={selectedTimeframe === timeframe ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeframe(timeframe)}
              >
                {timeframe}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? '#334155' : '#e2e8f0'}
              />
              <XAxis
                dataKey="subject"
                stroke={isDark ? '#94a3b8' : '#64748b'}
                fontSize={12}
              />
              <YAxis
                stroke={isDark ? '#94a3b8' : '#64748b'}
                fontSize={12}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1e293b' : '#ffffff',
                  border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                }}
              />
              <Legend />
              <Bar
                dataKey="score"
                name="Current Score"
                fill={isDark ? '#3b82f6' : '#2563eb'}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="previousScore"
                name="Previous Score"
                fill={isDark ? '#64748b' : '#94a3b8'}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}