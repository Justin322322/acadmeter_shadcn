"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XMarkIcon } from "@heroicons/react/24/outline"

interface Student {
  id: string
  name: string
}

interface GradeFormProps {
  onClose: () => void
  onSubmit: (data: any) => void
}

export function BatchGradeForm({ onClose, onSubmit }: GradeFormProps) {
  const [formData, setFormData] = useState({
    type: "quiz" as "quiz" | "project" | "exam" | "homework",
    name: "",
    totalPoints: 10,
    date: new Date().toISOString().split('T')[0]
  })

  const [grades, setGrades] = useState<{ studentId: string; score: number }[]>([
    { studentId: "S1", score: 0 },
    { studentId: "S2", score: 0 }
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      grades
    })
  }

  const calculatePercentage = (score: number) => {
    return ((score / formData.totalPoints) * 100).toFixed(1) + '%'
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-900 z-10">
          <div className="flex items-center justify-between">
            <CardTitle>Add New Assessment</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <XMarkIcon className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Assessment Type
                </label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
                >
                  <option value="quiz">Quiz</option>
                  <option value="project">Project</option>
                  <option value="exam">Exam</option>
                  <option value="homework">Homework</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Total Points
                </label>
                <input
                  type="number"
                  value={formData.totalPoints}
                  onChange={e => setFormData({ ...formData, totalPoints: parseInt(e.target.value) })}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Assessment Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Quiz 1 - Introduction"
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">Student Scores</h3>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Total Points: {formData.totalPoints}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Student</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-slate-500 dark:text-slate-400">Score</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-slate-500 dark:text-slate-400">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grades.map((grade, index) => (
                      <tr key={grade.studentId} className="border-b border-slate-200 dark:border-slate-700">
                        <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-100">
                          Student {index + 1}
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            value={grade.score}
                            onChange={e => {
                              const newGrades = [...grades]
                              newGrades[index].score = parseInt(e.target.value)
                              setGrades(newGrades)
                            }}
                            min="0"
                            max={formData.totalPoints}
                            className="w-20 text-right rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1 text-sm"
                          />
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-slate-900 dark:text-slate-100">
                          {calculatePercentage(grade.score)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Save Assessment
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}