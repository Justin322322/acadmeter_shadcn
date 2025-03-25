/**
 * Grade Calculation Utilities
 * Centralized functions for grade calculations and assessments
 */

/**
 * Calculate percentage from score and total
 * @param score - The achieved score
 * @param total - The total possible score
 * @returns Formatted percentage string
 */
export const calculatePercentage = (score: number, total: number): string => {
  return `${((score / total) * 100).toFixed(1)}%`
}

/**
 * Calculate average grade from multiple assessments
 * @param assessments Array of assessments with score and total
 * @returns Rounded average percentage
 */
export const calculateAverage = (assessments: { score: number, total: number }[]): number => {
  if (assessments.length === 0) return 0
  const sum = assessments.reduce((acc, curr) => acc + (curr.score / curr.total) * 100, 0)
  return Math.round(sum / assessments.length)
}

/**
 * Get color class based on grade percentage
 * @param score Percentage score (0-100)
 * @returns Tailwind color class string
 */
export const getGradeColor = (score: number): string => {
  if (score >= 80) return 'text-green-600 dark:text-green-500'
  if (score >= 75) return 'text-yellow-600 dark:text-yellow-500'
  return 'text-red-600 dark:text-red-500'
}

/**
 * Get background color class based on grade percentage
 * @param score Percentage score (0-100)
 * @returns Tailwind background color class string
 */
export const getGradeBackgroundColor = (score: number): string => {
  if (score >= 80) return 'bg-green-50 dark:bg-green-900/20'
  if (score >= 75) return 'bg-yellow-50 dark:bg-yellow-900/20'
  return 'bg-red-50 dark:bg-red-900/20'
}

/**
 * Get progress bar color based on grade percentage
 * @param score Percentage score (0-100)
 * @returns Tailwind background color class string for progress bars
 */
export const getProgressBarColor = (score: number): string => {
  if (score >= 80) return 'bg-green-500'
  if (score >= 75) return 'bg-yellow-500'
  return 'bg-red-500'
}

/**
 * Calculate class statistics from an array of scores
 * @param scores Array of numerical scores
 * @returns Object containing average, highest, and lowest scores
 */
export const calculateClassStats = (scores: number[]): { average: number; highest: number; lowest: number } => {
  if (scores.length === 0) {
    return { average: 0, highest: 0, lowest: 0 }
  }
  const average = scores.reduce((a, b) => a + b, 0) / scores.length
  const highest = Math.max(...scores)
  const lowest = Math.min(...scores)
  return { average, highest, lowest }
}

/**
 * Get performance level based on score
 * @param score Percentage score (0-100)
 * @returns Performance level descriptor
 */
export const getPerformanceLevel = (score: number): string => {
  if (score >= 90) return 'Excellent'
  if (score >= 80) return 'Very Good'
  if (score >= 75) return 'Satisfactory'
  if (score >= 70) return 'Needs Improvement'
  return 'Below Expectations'
}

/**
 * Calculate letter grade from percentage
 * @param percentage Numerical percentage (0-100)
 * @returns Letter grade (A+, A, A-, etc.)
 */
export const calculateLetterGrade = (percentage: number): string => {
  if (percentage >= 97) return 'A+'
  if (percentage >= 93) return 'A'
  if (percentage >= 90) return 'A-'
  if (percentage >= 87) return 'B+'
  if (percentage >= 83) return 'B'
  if (percentage >= 80) return 'B-'
  if (percentage >= 77) return 'C+'
  if (percentage >= 73) return 'C'
  if (percentage >= 70) return 'C-'
  if (percentage >= 67) return 'D+'
  if (percentage >= 63) return 'D'
  if (percentage >= 60) return 'D-'
  return 'F'
}

/**
 * Check if a score indicates at-risk performance
 * @param score Percentage score (0-100)
 * @param threshold Risk threshold (default: 75)
 * @returns Boolean indicating if score is below threshold
 */
export const isAtRisk = (score: number, threshold: number = 75): boolean => {
  return score < threshold
}

export type AssessmentType = 'quiz' | 'exam' | 'homework' | 'project' | 'performance' | 'written' | 'quarterly'
export type GradeLevel = 'Excellent' | 'Very Good' | 'Satisfactory' | 'Needs Improvement' | 'Below Expectations'

export interface Assessment {
  id: string
  type: AssessmentType
  name: string
  score: number
  total: number
  date: string
}