"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  BookOpenIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline"
import { DashboardChart } from "@/components/ui/dashboard/dashboard-chart"

export default function StudentAnalyticsPage() {
  const predictions = [
    {
      subject: "Mathematics",
      currentGrade: "A",
      predictedGrade: "A",
      confidence: 92,
      recommendations: [
        "Continue with current study habits",
        "Consider joining advanced math club",
        "Ready for more challenging problems"
      ]
    },
    {
      subject: "Physics",
      currentGrade: "A-",
      predictedGrade: "A",
      confidence: 85,
      recommendations: [
        "Focus on laboratory experiments",
        "Review theoretical concepts",
        "Practice more numerical problems"
      ]
    }
  ]

  const performanceMetrics = [
    {
      title: "Study Efficiency",
      value: "85%",
      change: "+5%",
      description: "Time spent vs. grade improvement"
    },
    {
      title: "Participation Rate",
      value: "92%",
      change: "+3%",
      description: "Class engagement level"
    },
    {
      title: "Assignment Completion",
      value: "95%",
      change: "+2%",
      description: "On-time submission rate"
    }
  ]

  const subjectBreakdown = [
    {
      subject: "Mathematics",
      strengths: ["Calculus", "Trigonometry"],
      weaknesses: ["Statistics", "Probability"],
      participationRate: 95,
      assignmentScore: 88,
      examScore: 92
    },
    {
      subject: "Physics",
      strengths: ["Mechanics", "Thermodynamics"],
      weaknesses: ["Wave Theory", "Optics"],
      participationRate: 90,
      assignmentScore: 85,
      examScore: 87
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Performance Analytics
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Track your progress and view personalized predictions
        </p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="border-slate-200 dark:border-slate-800">
            <CardContent className="pt-6">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 dark:text-slate-400">{metric.title}</span>
                  <span className={`text-sm ${
                    metric.change.startsWith('+') 
                      ? 'text-green-600 dark:text-green-500'
                      : 'text-red-600 dark:text-red-500'
                  }`}>{metric.change}</span>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{metric.value}</div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Trend Chart */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5 text-slate-500" />
            <div>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Your academic progress over time</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <DashboardChart />
          </div>
        </CardContent>
      </Card>

      {/* Subject Performance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {subjectBreakdown.map((subject, index) => (
          <Card key={index} className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpenIcon className="w-5 h-5 text-slate-500" />
                <CardTitle>{subject.subject} Analysis</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Participation</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{subject.participationRate}%</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Assignments</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{subject.assignmentScore}%</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Exams</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{subject.examScore}%</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">Strengths</h4>
                  <div className="flex flex-wrap gap-2">
                    {subject.strengths.map((strength, i) => (
                      <span key={i} className="px-2 py-1 bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400 rounded-full text-xs">
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">Areas for Improvement</h4>
                  <div className="flex flex-wrap gap-2">
                    {subject.weaknesses.map((weakness, i) => (
                      <span key={i} className="px-2 py-1 bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 rounded-full text-xs">
                        {weakness}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {predictions.map((prediction, index) => (
          <Card key={index} className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <RocketLaunchIcon className="w-5 h-5 text-slate-500" />
                <CardTitle>{prediction.subject} Prediction</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Current Grade</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {prediction.currentGrade}
                    </p>
                  </div>
                  <ArrowTrendingUpIcon className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Predicted Grade</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-500">
                      {prediction.predictedGrade}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                  <ArrowUpIcon className="w-4 h-4 text-blue-500" />
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    {prediction.confidence}% confidence in prediction
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <LightBulbIcon className="w-5 h-5 text-amber-500" />
                    <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      Recommendations
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {prediction.recommendations.map((rec, i) => (
                      <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}