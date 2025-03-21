"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  AcademicCapIcon,
  FunnelIcon,
  CalendarIcon
} from "@heroicons/react/24/outline"

export default function GradesPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'semester' | 'year'>('semester')
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'exams' | 'assignments' | 'quizzes'>('all')

  const subjects = [
    {
      name: "Mathematics",
      grade: "A",
      percentage: 92,
      trend: "up",
      change: "+3.2%",
      lastGrades: [88, 90, 92, 92],
      assessments: {
        exams: [
          { name: "Midterm", score: 92, total: 100, date: "2024-03-15" },
          { name: "Quiz 2", score: 88, total: 100, date: "2024-03-10" }
        ],
        assignments: [
          { name: "Problem Set 3", score: 95, total: 100, date: "2024-03-18" },
          { name: "Homework 4", score: 90, total: 100, date: "2024-03-12" }
        ],
        quizzes: [
          { name: "Pop Quiz", score: 85, total: 100, date: "2024-03-20" },
          { name: "Chapter Test", score: 89, total: 100, date: "2024-03-08" }
        ]
      },
      upcoming: [
        { type: "exam", name: "Final Exam", date: "2024-04-15" },
        { type: "assignment", name: "Project", date: "2024-03-30" }
      ]
    },
    {
      name: "Physics",
      grade: "A-",
      percentage: 89,
      trend: "up",
      change: "+2.1%",
      lastGrades: [85, 87, 88, 89],
      assessments: {
        exams: [
          { name: "Midterm", score: 92, total: 100, date: "2024-03-15" },
          { name: "Quiz 2", score: 88, total: 100, date: "2024-03-10" }
        ],
        assignments: [
          { name: "Problem Set 3", score: 95, total: 100, date: "2024-03-18" },
          { name: "Homework 4", score: 90, total: 100, date: "2024-03-12" }
        ],
        quizzes: [
          { name: "Pop Quiz", score: 85, total: 100, date: "2024-03-20" },
          { name: "Chapter Test", score: 89, total: 100, date: "2024-03-08" }
        ]
      },
      upcoming: [
        { type: "exam", name: "Final Exam", date: "2024-04-15" },
        { type: "assignment", name: "Project", date: "2024-03-30" }
      ]
    },
    {
      name: "English",
      grade: "B+",
      percentage: 87,
      trend: "up",
      change: "+4.5%",
      lastGrades: [82, 84, 85, 87],
      assessments: {
        exams: [
          { name: "Midterm", score: 92, total: 100, date: "2024-03-15" },
          { name: "Quiz 2", score: 88, total: 100, date: "2024-03-10" }
        ],
        assignments: [
          { name: "Problem Set 3", score: 95, total: 100, date: "2024-03-18" },
          { name: "Homework 4", score: 90, total: 100, date: "2024-03-12" }
        ],
        quizzes: [
          { name: "Pop Quiz", score: 85, total: 100, date: "2024-03-20" },
          { name: "Chapter Test", score: 89, total: 100, date: "2024-03-08" }
        ]
      },
      upcoming: [
        { type: "exam", name: "Final Exam", date: "2024-04-15" },
        { type: "assignment", name: "Project", date: "2024-03-30" }
      ]
    }
  ]

  const getFilteredAssessments = (subject: typeof subjects[0]) => {
    if (selectedFilter === 'all') {
      return [
        ...subject.assessments.exams,
        ...subject.assessments.assignments,
        ...subject.assessments.quizzes
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }
    return subject.assessments[selectedFilter].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }

  const calculateAverage = (assessments: { score: number, total: number }[]) => {
    if (assessments.length === 0) return 0
    const sum = assessments.reduce((acc, curr) => acc + (curr.score / curr.total) * 100, 0)
    return Math.round(sum / assessments.length)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Grade Overview
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            View and track your academic performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="gap-2"
            onClick={() => setSelectedTimeframe(selectedTimeframe === 'semester' ? 'year' : 'semester')}
          >
            <CalendarIcon className="w-4 h-4" />
            {selectedTimeframe.charAt(0).toUpperCase() + selectedTimeframe.slice(1)}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setSelectedFilter(current => {
              const filters: typeof selectedFilter[] = ['all', 'exams', 'assignments', 'quizzes']
              const currentIndex = filters.indexOf(current)
              return filters[(currentIndex + 1) % filters.length]
            })}
          >
            <FunnelIcon className="w-4 h-4" />
            {selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {subjects.map((subject) => (
          <Card key={subject.name} className="border-slate-200 dark:border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                  <AcademicCapIcon className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                </div>
                <div>
                  <CardTitle>{subject.name}</CardTitle>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Current Grade: {subject.grade}</p>
                </div>
              </div>
              <div className={`flex items-center gap-1 ${
                subject.trend === 'up' 
                  ? 'text-green-600 dark:text-green-500' 
                  : 'text-red-600 dark:text-red-500'
              }`}>
                <ArrowTrendingUpIcon className={`w-4 h-4 ${subject.trend === 'down' ? 'rotate-180' : ''}`} />
                <span>{subject.change}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Grade Progress Bar */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">Overall Progress</h3>
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                          Progress
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-400">
                          {subject.percentage}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100 dark:bg-blue-950/50">
                      <div
                        style={{ width: `${subject.percentage}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 dark:bg-blue-600"
                      />
                    </div>
                  </div>

                  {/* Recent Assessments */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">Recent Assessments</h3>
                      <span className="text-xs text-slate-500">Average: {
                        calculateAverage(getFilteredAssessments(subject))
                      }%</span>
                    </div>
                    <div className="space-y-2">
                      {getFilteredAssessments(subject).map((assessment, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                        >
                          <div>
                            <span className="text-sm text-slate-600 dark:text-slate-300">{assessment.name}</span>
                            <p className="text-xs text-slate-500">{new Date(assessment.date).toLocaleDateString()}</p>
                          </div>
                          <span className={`text-sm font-medium ${
                            (assessment.score / assessment.total) >= 0.8
                              ? 'text-green-600 dark:text-green-500'
                              : (assessment.score / assessment.total) >= 0.7
                              ? 'text-amber-600 dark:text-amber-500'
                              : 'text-red-600 dark:text-red-500'
                          }`}>
                            {assessment.score}/{assessment.total}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Grade Trend and Upcoming */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Grade Trend</h3>
                    <div className="h-[200px] flex items-end gap-2">
                      {subject.lastGrades.map((grade, index) => (
                        <div key={index} className="flex-1">
                          <div 
                            className="bg-blue-500 dark:bg-blue-600 rounded-t"
                            style={{ height: `${grade}%` }}
                          />
                          <div className="text-center mt-2">
                            <span className="text-xs text-slate-500">{grade}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Assessments */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">Upcoming</h3>
                    <div className="space-y-2">
                      {subject.upcoming.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded-lg border border-slate-200 dark:border-slate-700"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              item.type === 'exam' 
                                ? 'bg-red-50 dark:bg-red-950/50' 
                                : 'bg-amber-50 dark:bg-amber-950/50'
                            }`}>
                              {item.type === 'exam' ? (
                                <AcademicCapIcon className={`w-4 h-4 ${
                                  item.type === 'exam'
                                    ? 'text-red-500'
                                    : 'text-amber-500'
                                }`} />
                              ) : (
                                <ChartBarIcon className="w-4 h-4 text-amber-500" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{item.name}</p>
                              <p className="text-xs text-slate-500">{new Date(item.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            item.type === 'exam'
                              ? 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400'
                              : 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400'
                          }`}>
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}