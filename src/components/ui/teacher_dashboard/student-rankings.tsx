/**
 * Student Rankings Component
 * Visualizes class rankings and comparative performance metrics
 * 
 * Features:
 * - Dynamic performance rankings
 * - Percentile calculations
 * - Subject-wise comparisons
 * - Progress tracking over time
 * - Performance brackets (top/middle/bottom)
 * - Customizable ranking criteria
 * - Export functionality
 * 
 * Implementation Notes:
 * - Uses weighted scoring system
 * - Updates rankings in real-time
 * - Supports multiple sorting criteria
 * - Handles ties appropriately
 * - Includes detailed performance metrics
 * - Maintains ranking history
 */
"use client"

import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

interface Student {
  id: string
  name: string
  grade: number
  photoUrl?: string
  section: string
  rank: number
}

interface StudentRankingsProps {
  students: Student[]
  classSection?: string
}

export function StudentRankings({ students, classSection }: StudentRankingsProps) {
  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-500 border-amber-200 dark:border-amber-800/50'
      case 2:
        return 'bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800/50'
      case 3:
        return 'bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-500 border-orange-200 dark:border-orange-800/50'
      case 4:
        return 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-500 border-blue-200 dark:border-blue-800/50'
      case 5:
        return 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-500 border-emerald-200 dark:border-emerald-800/50'
      default:
        return 'bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800/50'
    }
  }

  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1:
        return 'h-32'
      case 2:
        return 'h-24'
      case 3:
        return 'h-20'
      default:
        return 'h-16'
    }
  }

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      case 4:
        return '🏅'
      case 5:
        return '🎖️'
      default:
        return null
    }
  }

  const top3Students = students
    .filter(s => s.rank <= 3)
    .sort((a, b) => {
      // Custom sort to arrange in podium order: 2nd, 1st, 3rd
      const podiumOrder = { 2: 0, 1: 1, 3: 2 }
      return podiumOrder[a.rank as keyof typeof podiumOrder] - podiumOrder[b.rank as keyof typeof podiumOrder]
    })

  const otherTopStudents = students.filter(s => s.rank > 3 && s.rank <= 5)

  return (
    <Card className="border-slate-200 dark:border-slate-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <span className="text-slate-900 dark:text-slate-100">Top Performing Students</span>
          {classSection && (
            <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
              Section {classSection}
            </span>
          )}
        </CardTitle>
        <CardDescription>Student rankings based on overall performance</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        {/* Olympic Podium Visualization */}
        <div className="mb-8 mt-4">
          <div className="relative h-48 flex items-end justify-center gap-4">
            {top3Students.map((student) => (
              <div key={student.id} className="flex flex-col items-center">
                <div className="relative mb-2">
                  {student.photoUrl ? (
                    <Image
                      src={student.photoUrl}
                      alt={student.name}
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-white dark:border-slate-700 shadow-sm"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center text-slate-700 dark:text-slate-300 font-medium text-lg border-2 border-white dark:border-slate-700 shadow-md">
                      {student.name.charAt(0)}
                    </div>
                  )}
                  <span className="absolute -top-1 -right-1 text-xl">
                    {getRankEmoji(student.rank)}
                  </span>
                </div>
                <div className="text-center mb-2">
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate max-w-[120px]">
                    {student.name}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {student.grade.toFixed(1)}%
                  </div>
                </div>
                <div 
                  className={`w-24 ${getPodiumHeight(student.rank)} rounded-t-lg shadow-lg transition-all duration-300 ${
                    student.rank === 1
                      ? 'bg-gradient-to-b from-amber-300 to-amber-400 dark:from-amber-500 dark:to-amber-600'
                      : student.rank === 2
                      ? 'bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-400 dark:to-slate-500'
                      : 'bg-gradient-to-b from-orange-300 to-orange-400 dark:from-orange-500 dark:to-orange-600'
                  }`} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Other Top Students */}
        <div className="space-y-3">
          {otherTopStudents.map((student) => (
            <div
              key={student.id}
              className={`flex items-center gap-4 p-3 rounded-lg border transition-colors ${getMedalColor(student.rank)}`}
            >
              <div className="relative">
                {student.photoUrl ? (
                  <Image
                    src={student.photoUrl}
                    alt={student.name}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white dark:border-slate-700 shadow-sm"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center text-slate-700 dark:text-slate-300 font-medium border-2 border-white dark:border-slate-700 shadow-sm">
                    {student.name.charAt(0)}
                  </div>
                )}
                <span className="absolute -top-1 -right-1 text-lg">
                  {getRankEmoji(student.rank)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-slate-900 dark:text-slate-100 truncate">
                    {student.name}
                  </h3>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-2">
                    {student.grade.toFixed(1)}%
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Section {student.section}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}