/**
 * Add Grade Form Component
 * Form interface for adding individual or multiple student grades
 * 
 * Features:
 * - Single and batch grade entry
 * - Grade validation and constraints
 * - Auto-grade calculation
 * - Comment/feedback system
 * - Grade history tracking
 * - Rubric integration
 * 
 * Form Sections:
 * 1. Assessment Details
 *    - Type (quiz/test/assignment)
 *    - Total points possible
 *    - Due date and time
 * 
 * 2. Student Selection
 *    - Individual or group selection
 *    - Quick search and filters
 * 
 * 3. Grade Entry
 *    - Numerical grade input
 *    - Percentage calculation
 *    - Pass/fail options
 * 
 * 4. Feedback
 *    - Comment field
 *    - Rubric scoring
 *    - Improvement suggestions
 * 
 * @param props
 * @param {Function} props.onSubmit - Grade submission handler
 * @param {Function} props.onCancel - Cancel form handler
 * @param {Object} [props.initialData] - Pre-filled grade data
 * @param {Object} [props.rubric] - Assessment rubric
 */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { XMarkIcon } from "@heroicons/react/24/outline"

interface AddGradeFormProps {
  onClose: () => void
  onSubmit: (data: {
    studentId: string
    type: 'written' | 'performance' | 'quarterly'
    name: string
    score: number
    totalPoints: number
    date: string
  }) => void
}

type GradeFormData = {
  studentId: string
  type: 'written' | 'performance' | 'quarterly'
  name: string
  score: number
  totalPoints: number
  date: string
}

export function AddGradeForm({ onClose, onSubmit }: AddGradeFormProps) {
  const [formData, setFormData] = useState<GradeFormData>({
    studentId: "",
    type: "written",
    name: "",
    score: 0,
    totalPoints: 100,
    date: new Date().toISOString().split('T')[0]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-lg">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Add New Grade</h2>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={onClose}
          >
            <XMarkIcon className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Student ID
            </label>
            <input
              type="text"
              required
              value={formData.studentId}
              onChange={(e) => setFormData(prev => ({ ...prev, studentId: e.target.value }))}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
              placeholder="Enter student ID"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Grade Type
            </label>
            <select
              required
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'written' | 'performance' | 'quarterly' }))}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="written">Written Works</option>
              <option value="performance">Performance Tasks</option>
              <option value="quarterly">Quarterly Assessment</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Assessment Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
              placeholder="e.g., Quiz 1 - Mathematics"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Score
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.score}
                onChange={(e) => setFormData(prev => ({ ...prev, score: Number(e.target.value) }))}
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Total Points
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.totalPoints}
                onChange={(e) => setFormData(prev => ({ ...prev, totalPoints: Number(e.target.value) }))}
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Date
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Grade
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}