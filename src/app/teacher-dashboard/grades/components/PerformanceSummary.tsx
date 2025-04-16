'use client'

import { Badge } from '@/components/ui/badge'
import { GradeEntry, GradeStatus } from '../types'
import { GRADE_DESCRIPTORS, PASSING_GRADE } from '../constants'

interface PerformanceSummaryProps {
  generalAverage: number
  overallStatus: GradeStatus
  passingCount: number
  warningCount: number
  failingCount: number
  currentQuarter: 1 | 2 | 3 | 4
  processedGrades: GradeEntry[]
  isCurrentQuarter: (quarter: number) => boolean
  onQuarterChange?: (quarter: 1 | 2 | 3 | 4) => void
}

export function PerformanceSummary({
  generalAverage,
  overallStatus,
  passingCount,
  warningCount,
  failingCount,
  currentQuarter,
  processedGrades,
  isCurrentQuarter,
  onQuarterChange = () => {}
}: PerformanceSummaryProps) {
  // Get grade descriptor based on score
  const getGradeDescriptor = (grade: number) => {
    if (grade >= GRADE_DESCRIPTORS.OUTSTANDING.min) return GRADE_DESCRIPTORS.OUTSTANDING;
    if (grade >= GRADE_DESCRIPTORS.VERY_SATISFACTORY.min) return GRADE_DESCRIPTORS.VERY_SATISFACTORY;
    if (grade >= GRADE_DESCRIPTORS.SATISFACTORY.min) return GRADE_DESCRIPTORS.SATISFACTORY;
    if (grade >= GRADE_DESCRIPTORS.FAIRLY_SATISFACTORY.min) return GRADE_DESCRIPTORS.FAIRLY_SATISFACTORY;
    return GRADE_DESCRIPTORS.DID_NOT_MEET;
  }

  return (
    <div className="mb-6">
      {/* Single Stats Card */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <h3 className="text-sm font-medium text-slate-300">Performance Summary</h3>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* General Average - Left column */}
            <div className="lg:border-r border-slate-800 lg:pr-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-slate-300">General Average</h4>
                <Badge className="bg-red-500/20 text-red-300 px-2 py-0.5 rounded-md">
                  Failing
                </Badge>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <div className="text-6xl font-bold text-orange-300">
                  0
                </div>
                <div className="flex flex-col mt-1">
                  <span className="text-xs text-slate-400">Grade to Date</span>
                  <span className="text-sm font-medium text-slate-300">Did Not Meet Expectations</span>
                  <span className="text-xs text-red-300 mt-1">75 points needed to pass</span>
                </div>
              </div>

              <div className="mt-2">
                <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                  <span>0</span>
                  <span className="font-medium">75</span>
                  <span>100</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-red-400"
                    style={{ width: `0%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Subject Status - Right column */}
            <div>
              <h4 className="text-sm font-medium text-slate-300 mb-3">Subject Status</h4>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="flex flex-col items-center p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-3xl font-bold text-teal-300">0</span>
                  <span className="text-xs text-slate-400 mt-1">Passing</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-3xl font-bold text-amber-300">0</span>
                  <span className="text-xs text-slate-400 mt-1">At Risk</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-3xl font-bold text-red-300">8</span>
                  <span className="text-xs text-slate-400 mt-1">Failing</span>
                </div>
              </div>

              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-400 float-right" style={{ width: `100%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
