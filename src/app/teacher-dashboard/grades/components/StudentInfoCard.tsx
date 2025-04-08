'use client'

import { StudentInfo } from '../types'

interface StudentInfoCardProps {
  studentInfo: StudentInfo
  onStudentInfoChange: (field: keyof StudentInfo, value: string) => void
}

export function StudentInfoCard({ studentInfo, onStudentInfoChange }: StudentInfoCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Student Name:</p>
        <input
          type="text"
          value={studentInfo.name}
          onChange={(e) => onStudentInfoChange('name', e.target.value)}
          className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      </div>
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Class Section:</p>
        <input
          type="text"
          value={studentInfo.section}
          onChange={(e) => onStudentInfoChange('section', e.target.value)}
          className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      </div>
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">School Year:</p>
        <input
          type="text"
          value={studentInfo.schoolYear}
          onChange={(e) => onStudentInfoChange('schoolYear', e.target.value)}
          className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      </div>
    </div>
  )
}
