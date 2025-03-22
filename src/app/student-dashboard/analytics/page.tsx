"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline"

export default function AnalyticsPage() {
  const [timeFilter, setTimeFilter] = useState("weekly")
  
  const performanceData = [
    { subject: "Mathematics", score: 85 },
    { subject: "Science", score: 92 },
    { subject: "English", score: 78 },
    { subject: "History", score: 88 }
  ]

  const improvementData = [
    { area: "English", description: "Essay structure needs more development" },
    { area: "Mathematics", description: "Practice needed on algebra word problems" }
  ]

  const strengthsData = [
    { area: "Science", description: "Excellent at science lab experiments and reports" },
    { area: "Mathematics", description: "Strong analytical skills in mathematics" }
  ]

  const behaviorData = [
    { category: "Classroom Participation", status: "Good" },
    { category: "Teamwork", status: "Good" },
    { category: "Following Instructions", status: "Good" },
    { category: "Respect for Others", status: "Good" },
    { category: "Work Habits", status: "Good" }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400">Track your academic performance and progress</p>
        </div>
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">
              <ChartBarIcon className="w-5 h-5 text-blue-600 dark:text-blue-500" />
            </div>
            <CardTitle>Performance Trends</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50">
                <RocketLaunchIcon className="w-5 h-5 text-amber-600 dark:text-amber-500" />
              </div>
              <CardTitle>Areas for Improvement</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Area</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {improvementData.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{item.area}</TableCell>
                    <TableCell>{item.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/50">
                <LightBulbIcon className="w-5 h-5 text-green-600 dark:text-green-500" />
              </div>
              <CardTitle>Strengths</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Area</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {strengthsData.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{item.area}</TableCell>
                    <TableCell>{item.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">
              <BookOpenIcon className="w-5 h-5 text-blue-600 dark:text-blue-500" />
            </div>
            <CardTitle>Behavior Assessment</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {behaviorData.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{item.category}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">Teacher Comments</h4>
            <p className="text-slate-600 dark:text-slate-400">The student shows excellent teamwork skills and respectful behavior. Could improve on organization and completing assignments on time. Participates actively in class discussions.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}