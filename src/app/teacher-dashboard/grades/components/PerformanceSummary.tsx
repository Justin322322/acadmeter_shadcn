'use client'

import { PlusIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
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
  onAddSubject: () => void
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
  onAddSubject
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
    <div className="mt-6 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
      <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-3">Performance Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Current Progress</p>
            {overallStatus === 'passing' ? (
              <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/40">
                Passing
              </Badge>
            ) : overallStatus === 'warning' ? (
              <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/40">
                At Risk
              </Badge>
            ) : (
              <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/40">
                Failing
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <p className={`text-2xl font-bold ${generalAverage < PASSING_GRADE ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-500'}`}>{generalAverage}</p>
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 dark:text-slate-400">Grade to Date</span>
              <span className="text-xs font-medium">{getGradeDescriptor(generalAverage).label}</span>
              {generalAverage < PASSING_GRADE && (
                <span className="text-xs text-red-600 dark:text-red-400">{PASSING_GRADE - generalAverage} points needed to pass</span>
              )}
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>0</span>
              <span>{PASSING_GRADE}</span>
              <span>100</span>
            </div>
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${generalAverage < PASSING_GRADE - 5 ? 'bg-red-500' : generalAverage < PASSING_GRADE ? 'bg-amber-500' : 'bg-emerald-500'}`}
                style={{ width: `${generalAverage}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Subject Status</p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="flex flex-col items-center p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{passingCount}</span>
              <span className="text-xs text-slate-600 dark:text-slate-400">Passing</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <span className="text-xl font-bold text-amber-600 dark:text-amber-400">{warningCount}</span>
              <span className="text-xs text-slate-600 dark:text-slate-400">At Risk</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <span className="text-xl font-bold text-red-600 dark:text-red-400">{failingCount}</span>
              <span className="text-xs text-slate-600 dark:text-slate-400">Failing</span>
            </div>
          </div>
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            {passingCount > 0 && <div className="h-full bg-emerald-500 float-left" style={{ width: `${(passingCount / processedGrades.length) * 100}%` }}></div>}
            {warningCount > 0 && <div className="h-full bg-amber-500 float-left" style={{ width: `${(warningCount / processedGrades.length) * 100}%` }}></div>}
            {failingCount > 0 && <div className="h-full bg-red-500 float-left" style={{ width: `${(failingCount / processedGrades.length) * 100}%` }}></div>}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Quarter Information</p>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold">{currentQuarter}</div>
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100">Q{currentQuarter}</span>
            </div>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/40">
              {isCurrentQuarter(1) ? '1st' :
               isCurrentQuarter(2) ? '2nd' :
               isCurrentQuarter(3) ? '3rd' : '4th'} Quarter
            </Badge>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {[1, 2, 3, 4].map(quarter => (
              <div key={quarter} className={`p-2 rounded text-center ${isCurrentQuarter(quarter) ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                <div className="text-xs">Q{quarter}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          size="default"
          onClick={onAddSubject}
        >
          <PlusIcon className="w-4 h-4" />
          Add Subject
        </Button>
      </div>
    </div>
  )
}
