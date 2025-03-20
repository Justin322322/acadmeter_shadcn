"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "@heroicons/react/24/outline"
import { BatchGradeForm } from "./batch-grade-form"

interface Assessment {
  id: string
  type: "quiz" | "project" | "exam" | "homework"
  name: string
  totalItems: number
  date: string
  scores: {
    studentId: string
    studentName: string
    score: number
  }[]
}

interface AssessmentGroup {
  type: string
  assessments: Assessment[]
}

export function AssessmentTable() {
  const [showBatchForm, setShowBatchForm] = useState(false)
  const [assessments, setAssessments] = useState<Assessment[]>([
    {
      id: "1",
      type: "quiz",
      name: "Quiz 1 - Introduction",
      totalItems: 10,
      date: "2024-01-20",
      scores: [
        { studentId: "S1", studentName: "John Doe", score: 8 },
        { studentId: "S2", studentName: "Jane Smith", score: 9 }
      ]
    },
    {
      id: "2",
      type: "project",
      name: "Research Paper",
      totalItems: 50,
      date: "2024-01-25",
      scores: [
        { studentId: "S1", studentName: "John Doe", score: 45 },
        { studentId: "S2", studentName: "Jane Smith", score: 48 }
      ]
    }
  ])

  const groupedAssessments = assessments.reduce<AssessmentGroup[]>((groups, assessment) => {
    const group = groups.find(g => g.type === assessment.type)
    if (group) {
      group.assessments.push(assessment)
    } else {
      groups.push({ type: assessment.type, assessments: [assessment] })
    }
    return groups
  }, [])

  const handleSubmitGrades = (data: any) => {
    const newAssessment: Assessment = {
      id: Date.now().toString(),
      type: data.type,
      name: data.name,
      totalItems: data.totalPoints,
      date: data.date,
      scores: data.grades.map((g: any) => ({
        studentId: g.studentId,
        studentName: "Student Name", // This would come from your student data
        score: g.score
      }))
    }
    setAssessments([...assessments, newAssessment])
    setShowBatchForm(false)
  }

  const calculatePercentage = (score: number, total: number) => {
    return ((score / total) * 100).toFixed(1) + '%'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Class Assessments
        </h2>
        <Button onClick={() => setShowBatchForm(true)} className="gap-2">
          <PlusIcon className="w-4 h-4" />
          Add Assessment
        </Button>
      </div>

      {groupedAssessments.map((group) => (
        <Card key={group.type}>
          <CardHeader>
            <CardTitle className="capitalize">{group.type}s</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Date</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-slate-500 dark:text-slate-400">Total Items</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-slate-500 dark:text-slate-400">Class Average</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-slate-500 dark:text-slate-400">Highest Score</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-slate-500 dark:text-slate-400">Lowest Score</th>
                  </tr>
                </thead>
                <tbody>
                  {group.assessments.map((assessment) => {
                    const scores = assessment.scores.map(s => s.score)
                    const average = scores.reduce((a, b) => a + b, 0) / scores.length
                    const highest = Math.max(...scores)
                    const lowest = Math.min(...scores)

                    return (
                      <tr 
                        key={assessment.id} 
                        className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
                      >
                        <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-100">
                          {assessment.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
                          {new Date(assessment.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-slate-900 dark:text-slate-100">
                          {assessment.totalItems}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-slate-900 dark:text-slate-100">
                          {calculatePercentage(average, assessment.totalItems)}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-green-600 dark:text-green-400">
                          {calculatePercentage(highest, assessment.totalItems)}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-red-600 dark:text-red-400">
                          {calculatePercentage(lowest, assessment.totalItems)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ))}

      {showBatchForm && (
        <BatchGradeForm
          onClose={() => setShowBatchForm(false)}
          onSubmit={handleSubmitGrades}
        />
      )}
    </div>
  )
}