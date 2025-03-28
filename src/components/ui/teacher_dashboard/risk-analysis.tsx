/**
 * Risk Analysis Component
 * Analyzes and visualizes academic risk factors for students
 * 
 * Features:
 * - Risk factor identification
 * - Multi-dimensional risk scoring
 * - Intervention tracking
 * - Risk threshold management
 * - Historical risk patterns
 * - Automated alerts
 * 
 * Risk Categories:
 * - Academic Performance
 * - Attendance Patterns
 * - Assignment Completion
 * - Engagement Metrics
 * - Behavioral Indicators
 * 
 * Integration Points:
 * - Works with PredictiveAnalytics
 * - Feeds into early warning system
 * - Updates student profiles
 * - Triggers automated notifications
 * 
 * @param {Object} props - Component properties
 * @param {string} props.studentId - Target student ID
 * @param {Object} props.thresholds - Custom risk thresholds
 * @param {Function} props.onRiskUpdate - Risk update callback
 */
"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ExclamationTriangleIcon,
  BeakerIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ClockIcon,
  ChartBarIcon,
  BoltIcon,
} from "@heroicons/react/24/outline"

interface RiskFactor {
  factor: string
  impact: 'high' | 'medium' | 'low'
  trend: 'improving' | 'stable' | 'worsening'
  details: string
  recommendations: string[]
}

interface StudentRisk {
  studentId: string
  studentName: string
  riskLevel: 'high' | 'medium' | 'low'
  overallScore: number
  factors: RiskFactor[]
  lastUpdated: string
}

interface RiskAnalysisProps {
  student: StudentRisk
  onGeneratePlan?: () => void
}

export function RiskAnalysis({ student, onGeneratePlan }: RiskAnalysisProps) {
  const [expandedFactor, setExpandedFactor] = useState<string | null>(null)

  const getRiskColor = (level: string): string => {
    switch (level) {
      case 'high':
        return 'text-red-600 dark:text-red-500 bg-red-50 dark:bg-red-950'
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-500 bg-yellow-50 dark:bg-yellow-950'
      case 'low':
        return 'text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-950'
      default:
        return 'text-slate-600 dark:text-slate-500 bg-slate-50 dark:bg-slate-950'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <ArrowUpIcon className="w-4 h-4 text-green-500" />
      case 'worsening':
        return <ArrowDownIcon className="w-4 h-4 text-red-500" />
      default:
        return <ArrowUpIcon className="w-4 h-4 text-slate-400 rotate-90" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${getRiskColor(student.riskLevel)}`}>
              <ExclamationTriangleIcon className="w-5 h-5" />
            </div>
            <div>
              <CardTitle>{student.studentName}</CardTitle>
              <CardDescription>Risk Assessment Analysis</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`px-2 py-1 rounded text-sm font-medium ${getRiskColor(student.riskLevel)}`}>
              {student.riskLevel.toUpperCase()} RISK
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Score: {student.overallScore}%
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4">
            {student.factors.map((factor) => (
              <div
                key={factor.factor}
                className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden"
              >
                <div
                  className="p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
                  onClick={() => setExpandedFactor(expandedFactor === factor.factor ? null : factor.factor)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${getRiskColor(factor.impact)}`}>
                        <BeakerIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          {factor.factor}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <div className="flex items-center gap-1">
                            {getTrendIcon(factor.trend)}
                            <span className="capitalize">{factor.trend}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <ChartBarIcon className="w-4 h-4" />
                            <span className="capitalize">{factor.impact} Impact</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <BoltIcon className={`w-5 h-5 transform transition-transform ${
                      expandedFactor === factor.factor ? 'rotate-90' : ''
                    }`} />
                  </div>
                </div>

                {expandedFactor === factor.factor && (
                  <div className="px-4 pb-4">
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                        {factor.details}
                      </p>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                          Recommendations:
                        </h4>
                        <ul className="space-y-2">
                          {factor.recommendations.map((rec, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                            >
                              <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-blue-500" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <ClockIcon className="w-4 h-4" />
              <span>Last updated: {student.lastUpdated}</span>
            </div>
            <Button
              onClick={onGeneratePlan}
              className="gap-2"
            >
              <BoltIcon className="w-4 h-4" />
              Generate Improvement Plan
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}