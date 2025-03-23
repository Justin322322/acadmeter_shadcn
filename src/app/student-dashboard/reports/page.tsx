"use client"

import { useState, ComponentType } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowDownTrayIcon,
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline"

interface Assessment {
  name: string
  completed: number
  total: number
  score: number
}

interface Topic {
  name: string
  score: number
}

interface TeacherComment {
  date: string
  comment: string
}

interface Subject {
  id: string
  name: string
  grade: string
  percentage: number
  attendance: number
  rank: string
  submissionRate: number
  assessments: Assessment[]
  topics: Topic[]
  recentGrades: number[]
  teacherComments: TeacherComment[]
}

const getGradeColor = (score: number) => {
  if (score >= 80) return 'text-green-600 dark:text-green-500'
  if (score >= 75) return 'text-yellow-600 dark:text-yellow-500'
  return 'text-red-600 dark:text-red-500'
}

const getGradeBackgroundColor = (score: number) => {
  if (score >= 80) return 'bg-green-50 dark:bg-green-900/20'
  if (score >= 75) return 'bg-yellow-50 dark:bg-yellow-900/20'
  return 'bg-red-50 dark:bg-red-900/20'
}

const getProgressBarColor = (score: number) => {
  if (score >= 80) return 'bg-green-500'
  if (score >= 75) return 'bg-yellow-500'
  return 'bg-red-500'
}

interface StatCardProps {
  icon: ComponentType<{ className?: string }>
  label: string
  value: number | string
  colorClass?: string
}

const StatCard = ({ icon: Icon, label, value, colorClass = '' }: StatCardProps) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${colorClass || 'bg-slate-100 dark:bg-slate-800'}`}>
          <Icon className={`w-6 h-6 ${colorClass ? getGradeColor(typeof value === 'number' ? value : 0) : 'text-slate-600 dark:text-slate-400'}`} />
        </div>
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className={`text-2xl font-bold ${colorClass ? getGradeColor(typeof value === 'number' ? value : 0) : 'text-slate-900 dark:text-slate-100'}`}>
            {value}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
)

interface AssessmentSectionProps {
  assessments?: Assessment[]
}

const AssessmentSection = ({ assessments }: AssessmentSectionProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Assessment Breakdown</CardTitle>
      <CardDescription>Performance in different types of assessments</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
        {assessments?.map((assessment) => (
          <div key={assessment.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {assessment.name}
              </span>
              <span className={`text-sm font-medium ${getGradeColor(assessment.score)}`}>
                {assessment.score}%
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getProgressBarColor(assessment.score)}`}
                style={{ width: `${assessment.score}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>{assessment.completed}/{assessment.total} Completed</span>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

interface TopicPerformanceProps {
  topics?: Topic[]
}

const TopicPerformance = ({ topics }: TopicPerformanceProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Topic Performance</CardTitle>
      <CardDescription>Understanding of key subject areas</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
        {topics?.map((topic) => (
          <div key={topic.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {topic.name}
              </span>
              <span className={`text-sm font-medium ${getGradeColor(topic.score)}`}>
                {topic.score}%
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getProgressBarColor(topic.score)}`}
                style={{ width: `${topic.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

export default function ReportsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'semester' | 'year'>('semester')
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  const subjects: Subject[] = [
    {
      id: "math",
      name: "Mathematics",
      grade: "A",
      percentage: 92,
      attendance: 96,
      rank: "3/32",
      submissionRate: 98,
      assessments: [
        { name: "Homework", completed: 15, total: 15, score: 94 },
        { name: "Quizzes", completed: 8, total: 8, score: 88 },
        { name: "Tests", completed: 2, total: 2, score: 91 }
      ],
      topics: [
        { name: "Calculus", score: 95 },
        { name: "Algebra", score: 88 },
        { name: "Trigonometry", score: 92 }
      ],
      recentGrades: [85, 92, 88, 94, 91],
      teacherComments: [
        {
          date: "2024-03-15",
          comment: "Excellent understanding of calculus concepts."
        }
      ]
    },
    {
      id: "physics",
      name: "Physics",
      grade: "B",
      percentage: 78,
      attendance: 94,
      rank: "8/32",
      submissionRate: 95,
      assessments: [
        { name: "Homework", completed: 12, total: 12, score: 77 },
        { name: "Quizzes", completed: 6, total: 6, score: 76 },
        { name: "Tests", completed: 2, total: 2, score: 79 }
      ],
      topics: [
        { name: "Mechanics", score: 82 },
        { name: "Waves", score: 76 },
        { name: "Thermodynamics", score: 77 }
      ],
      recentGrades: [75, 77, 78, 79, 78],
      teacherComments: [
        {
          date: "2024-03-18",
          comment: "Showing improvement in problem-solving skills."
        }
      ]
    }
  ]

  const currentSubject = selectedSubject 
    ? subjects.find(s => s.id === selectedSubject)
    : subjects[0]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Academic Report
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            View your academic performance and progress
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2" onClick={() => setSelectedTimeframe(
            selectedTimeframe === 'semester' ? 'year' : 'semester'
          )}>
            <CalendarIcon className="w-4 h-4" />
            {selectedTimeframe.charAt(0).toUpperCase() + selectedTimeframe.slice(1)}
          </Button>
          <Button className="gap-2">
            <ArrowDownTrayIcon className="w-4 h-4" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Subject Selection */}
      <div className="flex overflow-x-auto pb-2 -mx-1">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => setSelectedSubject(subject.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg mr-2 transition-colors ${
              currentSubject?.id === subject.id
                ? getGradeBackgroundColor(subject.percentage)
                : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <ChartBarIcon className="w-5 h-5" />
            <span className={`whitespace-nowrap font-medium ${
              currentSubject?.id === subject.id
                ? getGradeColor(subject.percentage)
                : 'text-slate-600 dark:text-slate-400'
            }`}>
              {subject.name}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={ChartBarIcon}
          label="Overall Grade"
          value={currentSubject?.percentage || 0}
          colorClass={getGradeBackgroundColor(currentSubject?.percentage || 0)}
        />
        <StatCard 
          icon={ClockIcon}
          label="Attendance"
          value={currentSubject?.attendance || 0}
        />
        <StatCard 
          icon={UserGroupIcon}
          label="Class Rank"
          value={currentSubject?.rank || '0/0'}
        />
        <StatCard 
          icon={CheckCircleIcon}
          label="Submission Rate"
          value={currentSubject?.submissionRate || 0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AssessmentSection assessments={currentSubject?.assessments} />
        <TopicPerformance topics={currentSubject?.topics} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Grades */}
        <Card>
          <CardHeader>
            <CardTitle>Grade Progression</CardTitle>
            <CardDescription>Your recent assessment scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-end justify-between gap-2">
              {currentSubject?.recentGrades.map((grade, index) => (
                <div key={index} className="flex-1">
                  <div
                    className={`rounded-t h-full ${getProgressBarColor(grade)}`}
                    style={{ height: `${grade}%` }}
                  />
                  <div className="mt-2 text-center">
                    <span className={`text-xs font-medium ${getGradeColor(grade)}`}>
                      {grade}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Teacher Comments */}
        <Card>
          <CardHeader>
            <CardTitle>Teacher Comments</CardTitle>
            <CardDescription>Recent feedback from your instructor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentSubject?.teacherComments.map((comment, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">{comment.date}</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {comment.comment}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}