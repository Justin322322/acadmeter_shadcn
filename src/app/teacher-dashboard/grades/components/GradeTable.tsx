'use client'

import { useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { GradeEntry, GradeEntryBase, GradeStatus } from '../types'
import { PASSING_GRADE } from '../constants'

interface GradeTableProps {
  grades: GradeEntryBase[]
  processedGrades: GradeEntry[]
  generalAverage: number
  overallStatus: GradeStatus
  currentQuarter: 1 | 2 | 3 | 4
  onGradeChange: (index: number, quarter: 'q1' | 'q2' | 'q3' | 'q4', value: string) => void
  onSubjectChange: (index: number, value: string) => void
  onDeleteSubject: (index: number) => void
  isCurrentQuarter: (quarter: number) => boolean
}

export function GradeTable({
  grades,
  processedGrades,
  generalAverage,
  overallStatus,
  currentQuarter,
  onGradeChange,
  onSubjectChange,
  onDeleteSubject,
  isCurrentQuarter
}: GradeTableProps) {
  // Show a message if there are no grades (no section selected)
  if (grades.length === 0) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">No Section Selected</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-4 max-w-md mx-auto">
          Please select a class section from the dropdown above to view and manage student grades.
        </p>
      </div>
    );
  }
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 p-4 text-left sticky left-0 z-10 font-medium text-slate-700 dark:text-slate-300">Learning Area</th>
              <th colSpan={4} className="border-b border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 p-4 text-center font-medium text-slate-700 dark:text-slate-300">Quarter</th>
              <th className="border-b border-r border-slate-200 dark:border-slate-700 bg-blue-50/50 dark:bg-blue-900/20 p-4 text-center font-medium text-blue-700 dark:text-blue-300">Grade to Date</th>
              <th className="border-b border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 p-4 text-center font-medium text-slate-700 dark:text-slate-300">Final Grade</th>
              <th className="border-b border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 p-4 text-center font-medium text-slate-700 dark:text-slate-300">Status</th>
              <th className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 p-4 text-center font-medium text-slate-700 dark:text-slate-300 w-12">Action</th>
            </tr>
            <tr>
              <th className="border-b border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 p-3 sticky left-0 z-10"></th>
            <th className={`border-b border-r border-slate-200 dark:border-slate-700 ${isCurrentQuarter(1) ? 'bg-blue-50/50 dark:bg-blue-900/20' : 'bg-slate-50 dark:bg-slate-800/80'} p-3 text-center font-medium text-slate-700 dark:text-slate-300`}>
              Q1 {isCurrentQuarter(1) && <span className="text-xs text-blue-600 dark:text-blue-400 block mt-1">(Current)</span>}
            </th>
            <th className={`border-b border-r border-slate-200 dark:border-slate-700 ${isCurrentQuarter(2) ? 'bg-blue-50/50 dark:bg-blue-900/20' : 'bg-slate-50 dark:bg-slate-800/80'} p-3 text-center font-medium text-slate-700 dark:text-slate-300`}>
              Q2 {isCurrentQuarter(2) && <span className="text-xs text-blue-600 dark:text-blue-400 block mt-1">(Current)</span>}
            </th>
            <th className={`border-b border-r border-slate-200 dark:border-slate-700 ${isCurrentQuarter(3) ? 'bg-blue-50/50 dark:bg-blue-900/20' : 'bg-slate-50 dark:bg-slate-800/80'} p-3 text-center font-medium text-slate-700 dark:text-slate-300`}>
              Q3 {isCurrentQuarter(3) && <span className="text-xs text-blue-600 dark:text-blue-400 block mt-1">(Current)</span>}
            </th>
            <th className={`border-b border-r border-slate-200 dark:border-slate-700 ${isCurrentQuarter(4) ? 'bg-blue-50/50 dark:bg-blue-900/20' : 'bg-slate-50 dark:bg-slate-800/80'} p-3 text-center font-medium text-slate-700 dark:text-slate-300`}>
              Q4 {isCurrentQuarter(4) && <span className="text-xs text-blue-600 dark:text-blue-400 block mt-1">(Current)</span>}
            </th>
            <th className="border-b border-r border-slate-200 dark:border-slate-700 bg-blue-50/50 dark:bg-blue-900/20 p-3 text-center font-medium text-blue-700 dark:text-blue-300">Current Progress</th>
            <th className="border-b border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 p-3 text-center font-medium text-slate-700 dark:text-slate-300">End of Year</th>
            <th className="border-b border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 p-3 text-center"></th>
            <th className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 p-3 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {processedGrades.map((grade, index) => (
            <tr key={index}>
              <td className="border-b border-r border-slate-200 dark:border-slate-700 p-3 sticky left-0 z-10 bg-white dark:bg-slate-800">
                <input
                  type="text"
                  value={grade.subject}
                  onChange={(e) => onSubjectChange(index, e.target.value)}
                  className="w-full bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-2 py-1 font-medium text-slate-700 dark:text-slate-300"
                />
              </td>
              <td className={`border-b border-r border-slate-200 dark:border-slate-700 p-3 text-center ${isCurrentQuarter(1) ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                {isCurrentQuarter(1) ? (
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={grade.q1}
                    onChange={(e) => onGradeChange(index, 'q1', e.target.value)}
                    className="w-16 text-center p-1.5 bg-white dark:bg-slate-700 border border-blue-200 dark:border-blue-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md font-medium"
                  />
                ) : (
                  <span className="font-medium text-slate-700 dark:text-slate-300">{grade.q1 || '-'}</span>
                )}
              </td>
              <td className={`border-b border-r border-slate-200 dark:border-slate-700 p-3 text-center ${isCurrentQuarter(2) ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                {isCurrentQuarter(2) ? (
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={grade.q2}
                    onChange={(e) => onGradeChange(index, 'q2', e.target.value)}
                    className="w-16 text-center p-1.5 bg-white dark:bg-slate-700 border border-blue-200 dark:border-blue-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md font-medium"
                  />
                ) : (
                  <span className="font-medium text-slate-700 dark:text-slate-300">{grade.q2 || '-'}</span>
                )}
              </td>
              <td className={`border-b border-r border-slate-200 dark:border-slate-700 p-3 text-center ${isCurrentQuarter(3) ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                {isCurrentQuarter(3) ? (
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={grade.q3}
                    onChange={(e) => onGradeChange(index, 'q3', e.target.value)}
                    className="w-16 text-center p-1.5 bg-white dark:bg-slate-700 border border-blue-200 dark:border-blue-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md font-medium"
                  />
                ) : (
                  <span className="font-medium text-slate-700 dark:text-slate-300">{grade.q3 || '-'}</span>
                )}
              </td>
              <td className={`border-b border-r border-slate-200 dark:border-slate-700 p-3 text-center ${isCurrentQuarter(4) ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                {isCurrentQuarter(4) ? (
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={grade.q4}
                    onChange={(e) => onGradeChange(index, 'q4', e.target.value)}
                    className="w-16 text-center p-1.5 bg-white dark:bg-slate-700 border border-blue-200 dark:border-blue-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md font-medium"
                  />
                ) : (
                  <span className="font-medium text-slate-700 dark:text-slate-300">{grade.q4 || '-'}</span>
                )}
              </td>
              <td className={`border-b border-r border-slate-200 dark:border-slate-700 p-3 text-center font-medium bg-blue-50/50 dark:bg-blue-900/10 ${
                grade.gradeToDate < PASSING_GRADE ? 'text-red-600 dark:text-red-400' :
                grade.gradeToDate >= PASSING_GRADE && grade.gradeToDate < PASSING_GRADE + 5 ? 'text-amber-600 dark:text-amber-400' :
                'text-emerald-600 dark:text-emerald-400'
              }`}>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-base">{grade.gradeToDate}</span>
                  {grade.gradeToDate < PASSING_GRADE && (
                    <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 px-1 py-0.5 rounded">
                      {PASSING_GRADE - grade.gradeToDate} pts needed
                    </span>
                  )}
                </div>
              </td>
              <td className={`border-b border-r border-slate-200 dark:border-slate-700 p-3 text-center font-medium ${
                grade.final < PASSING_GRADE ? 'text-red-600 dark:text-red-400' : ''
              }`}>{grade.final}</td>
              <td className="border-b border-r border-slate-200 dark:border-slate-700 p-3 text-center">
                {grade.status === 'passing' ? (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                    Passing
                  </span>
                ) : grade.status === 'warning' ? (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                    At Risk
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                    Failing
                  </span>
                )}
              </td>
              <td className="border-b border-slate-200 dark:border-slate-700 p-3 text-center">
                <button
                  onClick={() => onDeleteSubject(index)}
                  className="p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20 text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 focus:outline-none transition-colors"
                  title="Delete subject"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
          {/* General Average row with Tailwind classes */}
          <tr className="bg-blue-50/50 dark:bg-blue-900/10">
            <td
              colSpan={5}
              className="border-b border-r border-slate-200 dark:border-slate-700 p-4 text-center font-bold sticky left-0 z-10 bg-blue-50/50 dark:bg-blue-900/10 text-lg uppercase tracking-wide text-blue-700 dark:text-blue-300"
            >
              General Average
            </td>
            <td className={`border-b border-r border-slate-200 dark:border-slate-700 p-4 text-center font-bold bg-blue-100/80 dark:bg-blue-900/20 text-lg ${generalAverage < PASSING_GRADE ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
              <div className="flex items-center justify-center gap-2">
                <span>{generalAverage}</span>
                {generalAverage < PASSING_GRADE && (
                  <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 px-1.5 py-0.5 rounded">
                    {PASSING_GRADE - generalAverage} pts needed
                  </span>
                )}
              </div>
            </td>
            <td className={`border-b border-r border-slate-200 dark:border-slate-700 p-4 text-center font-bold bg-blue-100/80 dark:bg-blue-900/20 text-lg ${generalAverage < PASSING_GRADE ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
              {generalAverage}
            </td>
            <td className="border-b border-r border-slate-200 dark:border-slate-700 p-3 text-center bg-blue-50/50 dark:bg-blue-900/10">
              {overallStatus === 'passing' ? (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                  Passing
                </span>
              ) : overallStatus === 'warning' ? (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                  At Risk
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                  Failing
                </span>
              )}
            </td>
            <td className="border-b border-slate-200 dark:border-slate-700 p-3 text-center bg-blue-50/50 dark:bg-blue-900/10"></td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  )
}
