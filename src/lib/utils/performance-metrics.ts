/**
 * Student Performance Metrics Utilities
 * Statistical analysis functions for student performance
 */

import { Assessment, isAtRisk } from './grade-utils'

/**
 * Calculate performance trend from historical grades
 * @param grades Array of historical grades
 * @returns Trend indicator ('up' | 'down' | 'stable')
 */
export const calculateTrend = (grades: number[]): 'up' | 'down' | 'stable' => {
  if (grades.length < 2) return 'stable'
  const recentAvg = grades.slice(-2).reduce((a, b) => a + b, 0) / 2
  const previousAvg = grades.slice(0, -2).reduce((a, b) => a + b, 0) / (grades.length - 2)
  const difference = recentAvg - previousAvg
  if (Math.abs(difference) < 2) return 'stable'
  return difference > 0 ? 'up' : 'down'
}

/**
 * Calculate student percentile rank in class
 * @param score Student's score
 * @param classScores Array of all class scores
 * @returns Percentile rank (0-100)
 */
export const calculatePercentileRank = (score: number, classScores: number[]): number => {
  const belowCount = classScores.filter(s => s < score).length
  return Math.round((belowCount / classScores.length) * 100)
}

/**
 * Calculate grade distribution for a set of scores
 * @param scores Array of scores
 * @returns Object with count of scores in each grade range
 */
export const calculateGradeDistribution = (scores: number[]): Record<string, number> => {
  return scores.reduce((dist, score) => {
    if (score >= 90) dist.A = (dist.A || 0) + 1
    else if (score >= 80) dist.B = (dist.B || 0) + 1
    else if (score >= 70) dist.C = (dist.C || 0) + 1
    else if (score >= 60) dist.D = (dist.D || 0) + 1
    else dist.F = (dist.F || 0) + 1
    return dist
  }, {} as Record<string, number>)
}

/**
 * Calculate improvement needed to reach target grade
 * @param currentGrade Current grade percentage
 * @param targetGrade Target grade percentage
 * @param remainingAssessments Number of remaining assessments
 * @returns Required score per assessment to reach target
 */
export const calculateRequiredImprovement = (
  currentGrade: number,
  targetGrade: number,
  remainingAssessments: number
): number => {
  if (remainingAssessments <= 0) return 0
  const totalNeeded = targetGrade - currentGrade
  return Math.ceil(totalNeeded / remainingAssessments)
}

/**
 * Calculate completion rate for assignments
 * @param assessments Array of student assessments
 * @returns Completion rate percentage
 */
export const calculateCompletionRate = (assessments: Assessment[]): number => {
  if (assessments.length === 0) return 0
  const completed = assessments.filter(a => a.score > 0).length
  return Math.round((completed / assessments.length) * 100)
}

/**
 * Generate risk assessment for student
 * @param currentGrade Current overall grade
 * @param attendanceRate Attendance percentage
 * @param completionRate Assignment completion rate
 * @param threshold Risk threshold percentage
 * @returns Risk assessment object
 */
export const generateRiskAssessment = (
  currentGrade: number,
  attendanceRate: number,
  completionRate: number,
  threshold: number = 75
): {
  riskLevel: 'high' | 'medium' | 'low'
  factors: string[]
  recommendations: string[]
} => {
  const factors: string[] = []
  const recommendations: string[] = []

  if (isAtRisk(currentGrade, threshold)) {
    factors.push('Below grade threshold')
    recommendations.push('Schedule tutoring sessions')
  }
  if (attendanceRate < 90) {
    factors.push('Poor attendance')
    recommendations.push('Improve class attendance')
  }
  if (completionRate < 85) {
    factors.push('Low assignment completion')
    recommendations.push('Focus on completing all assignments')
  }

  const riskLevel = factors.length >= 2 ? 'high' : 
                    factors.length === 1 ? 'medium' : 'low'

  return { riskLevel, factors, recommendations }
}

/**
 * Calculate progress towards academic goals
 * @param currentMetrics Current performance metrics
 * @param targetMetrics Target performance metrics
 * @returns Progress percentage and status
 */
export const calculateGoalProgress = (
  currentMetrics: { [key: string]: number },
  targetMetrics: { [key: string]: number }
): { [key: string]: { progress: number; status: 'ahead' | 'on-track' | 'behind' } } => {
  const progress: { [key: string]: { progress: number; status: 'ahead' | 'on-track' | 'behind' } } = {}
  
  for (const metric in targetMetrics) {
    const current = currentMetrics[metric] || 0
    const target = targetMetrics[metric]
    const progressPct = Math.round((current / target) * 100)
    
    progress[metric] = {
      progress: progressPct,
      status: progressPct >= 100 ? 'ahead' :
              progressPct >= 90 ? 'on-track' : 'behind'
    }
  }
  
  return progress
}