"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart
} from 'recharts'
import { useTheme } from "@/components/theme-provider"

interface AtRiskStudent {
  id: string
  name: string
  avgGrade: number
  riskProbability: number
  intervention: string
  failingSubjects: string[]
}

interface SubjectImpact {
  subject: string
  impactScore: number
}

const mockAtRiskStudents: AtRiskStudent[] = [
  {
    id: "ST001",
    name: "Alex Thompson",
    avgGrade: 65.5,
    riskProbability: 0.85,
    intervention: "Schedule immediate parent-teacher conference",
    failingSubjects: ["Mathematics", "Physics"]
  },
  {
    id: "ST002",
    name: "Maria Garcia",
    avgGrade: 68.2,
    riskProbability: 0.75,
    intervention: "Assign peer tutor for additional support",
    failingSubjects: ["Chemistry"]
  },
  {
    id: "ST003",
    name: "James Wilson",
    avgGrade: 62.8,
    riskProbability: 0.92,
    intervention: "Implement daily progress monitoring",
    failingSubjects: ["Mathematics", "Chemistry", "Physics"]
  },
]

const subjectImpactData: SubjectImpact[] = [
  { subject: "Mathematics", impactScore: 85 },
  { subject: "Physics", impactScore: 72 },
  { subject: "Chemistry", impactScore: 68 },
  { subject: "Biology", impactScore: 45 },
  { subject: "English", impactScore: 35 },
]

const riskTrendData = [
  { month: "Sep", probability: 0.45 },
  { month: "Oct", probability: 0.52 },
  { month: "Nov", probability: 0.68 },
  { month: "Dec", probability: 0.75 },
  { month: "Jan", probability: 0.82 },
]

export function PredictiveAnalytics() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  
  const getRiskLevelColor = (probability: number) => {
    if (probability >= 0.8) return "text-red-600 dark:text-red-400"
    if (probability >= 0.6) return "text-amber-600 dark:text-amber-400"
    return "text-yellow-600 dark:text-yellow-400"
  }

  const getRiskLevelBg = (probability: number) => {
    if (probability >= 0.8) return "bg-red-50 dark:bg-red-950/50"
    if (probability >= 0.6) return "bg-amber-50 dark:bg-amber-950/50"
    return "bg-yellow-50 dark:bg-yellow-950/50"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="border-b border-slate-200 dark:border-slate-700">
          <CardTitle>Students at Risk</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Student</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Average Grade</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Risk Level</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Failing Subjects</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Suggested Intervention</th>
                </tr>
              </thead>
              <tbody>
                {mockAtRiskStudents.map((student) => (
                  <tr key={student.id} className="border-b border-slate-200 dark:border-slate-700">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">{student.name}</div>
                        <div className="text-sm text-slate-500">{student.id}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-900 dark:text-slate-100">
                      {student.avgGrade}%
                    </td>
                    <td className="py-3 px-4">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskLevelBg(student.riskProbability)} ${getRiskLevelColor(student.riskProbability)}`}>
                        {(student.riskProbability * 100).toFixed(0)}% Risk
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {student.failingSubjects.map((subject) => (
                          <span 
                            key={subject}
                            className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-300">
                      {student.intervention}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="border-b border-slate-200 dark:border-slate-700">
            <CardTitle>Risk Probability Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={riskTrendData}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(148, 163, 184, 0.3)'}
                  />
                  <XAxis 
                    dataKey="month"
                    stroke={isDark ? '#94a3b8' : '#64748b'}
                    fontSize={12}
                  />
                  <YAxis
                    stroke={isDark ? '#94a3b8' : '#64748b'}
                    fontSize={12}
                    tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#1e293b' : '#ffffff',
                      border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                    formatter={(value: number) => [`${(value * 100).toFixed(0)}%`, 'Risk Probability']}
                  />
                  <Line
                    type="monotone"
                    dataKey="probability"
                    stroke={isDark ? '#f87171' : '#dc2626'}
                    strokeWidth={2}
                    dot={{ fill: isDark ? '#f87171' : '#dc2626', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-slate-200 dark:border-slate-700">
            <CardTitle>Subject Risk Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjectImpactData}>
                  <PolarGrid stroke={isDark ? '#334155' : '#e2e8f0'} />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }}
                  />
                  <Radar
                    name="Impact Score"
                    dataKey="impactScore"
                    stroke={isDark ? '#f87171' : '#dc2626'}
                    fill={isDark ? '#f8717133' : '#dc262633'}
                    fillOpacity={0.6}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#1e293b' : '#ffffff',
                      border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}