/**
 * Student Analytics Utilities
 * Advanced analytics and predictive functions for student performance
 */

import { Assessment } from './grade-utils'
import { calculateTrend } from './performance-metrics'

/**
 * Generate prediction for future performance based on historical data
 * @param historicalGrades Array of past grades
 * @param weightedFactors Additional factors affecting performance
 * @returns Predicted grade range and confidence level
 */
export const predictFuturePerformance = (
  historicalGrades: number[],
  weightedFactors: { [key: string]: number } = {}
): { 
  predictedGrade: number
  confidenceLevel: number
  trend: 'improving' | 'declining' | 'stable'
} => {
  if (historicalGrades.length === 0) {
    return { predictedGrade: 0, confidenceLevel: 0, trend: 'stable' }
  }

  // Calculate basic trend
  const recentTrend = calculateTrend(historicalGrades)
  
  // Calculate weighted average with more emphasis on recent grades
  const weightedGrades = historicalGrades.map((grade, index) => {
    const recencyWeight = (index + 1) / historicalGrades.length
    return grade * recencyWeight
  })
  
  const baselinePrediction = weightedGrades.reduce((a, b) => a + b, 0) / weightedGrades.length
  
  // Apply impact factors
  let adjustedPrediction = baselinePrediction
  let totalFactorWeight = 0
  
  for (const factor in weightedFactors) {
    adjustedPrediction += weightedFactors[factor]
    totalFactorWeight += Math.abs(weightedFactors[factor])
  }
  
  // Calculate confidence level based on data consistency and factors
  const gradeVariance = calculateVariance(historicalGrades)
  const confidenceLevel = calculateConfidenceLevel(gradeVariance, totalFactorWeight)
  
  return {
    predictedGrade: Math.round(adjustedPrediction),
    confidenceLevel: Math.round(confidenceLevel),
    trend: recentTrend === 'up' ? 'improving' : 
           recentTrend === 'down' ? 'declining' : 'stable'
  }
}

/**
 * Identify knowledge gaps based on assessment performance patterns
 * @param assessments Array of student assessments
 * @returns Array of identified knowledge gap areas
 */
export const identifyKnowledgeGaps = (
  assessments: Assessment[]
): Array<{ topic: string; proficiency: number; status: 'critical' | 'concerning' | 'adequate' }> => {
  // Group assessments by topic/subject area
  const topicPerformance = assessments.reduce((acc, assessment) => {
    const topic = extractTopicFromAssessment(assessment.name)
    if (!acc[topic]) {
      acc[topic] = { scores: [], total: [] }
    }
    acc[topic].scores.push(assessment.score)
    acc[topic].total.push(assessment.total)
    return acc
  }, {} as Record<string, { scores: number[], total: number[] }>)

  // Analyze each topic
  return Object.entries(topicPerformance).map(([topic, data]) => {
    const proficiency = calculateProficiencyScore(data.scores, data.total)
    return {
      topic,
      proficiency,
      status: proficiency < 60 ? 'critical' :
              proficiency < 75 ? 'concerning' : 'adequate'
    }
  })
}

/**
 * Generate personalized study recommendations
 * @param knowledgeGaps Array of identified knowledge gaps
 * @param learningStyle Student's learning style preference
 * @returns Array of study recommendations
 */
export const generateStudyRecommendations = (
  knowledgeGaps: Array<{ topic: string; proficiency: number }>,
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' = 'visual'
): Array<{
  topic: string
  resources: string[]
  priority: 'high' | 'medium' | 'low'
  estimatedStudyTime: number
}> => {
  return knowledgeGaps.map(gap => ({
    topic: gap.topic,
    resources: getResourcesByLearningStyle(gap.topic, learningStyle),
    priority: gap.proficiency < 60 ? 'high' :
             gap.proficiency < 75 ? 'medium' : 'low',
    estimatedStudyTime: calculateEstimatedStudyTime(gap.proficiency)
  }))
}

// Helper functions
const calculateVariance = (grades: number[]): number => {
  const mean = grades.reduce((a, b) => a + b, 0) / grades.length
  const squareDiffs = grades.map(grade => Math.pow(grade - mean, 2))
  return Math.sqrt(squareDiffs.reduce((a, b) => a + b, 0) / grades.length)
}

const calculateConfidenceLevel = (variance: number, factorWeight: number): number => {
  const baseConfidence = 100 - (variance * 2)
  const factorImpact = factorWeight * 5
  return Math.max(0, Math.min(100, baseConfidence - factorImpact))
}

const extractTopicFromAssessment = (name: string): string => {
  // Basic topic extraction - could be enhanced with NLP
  const topics = ['algebra', 'geometry', 'calculus', 'statistics']
  return topics.find(topic => name.toLowerCase().includes(topic)) || 'general'
}

const calculateProficiencyScore = (scores: number[], totals: number[]): number => {
  const totalEarned = scores.reduce((a, b) => a + b, 0)
  const totalPossible = totals.reduce((a, b) => a + b, 0)
  return Math.round((totalEarned / totalPossible) * 100)
}

const getResourcesByLearningStyle = (topic: string, style: string): string[] => {
  // Placeholder - would be replaced with actual resource recommendations
  const resources: Record<string, string[]> = {
    visual: ['Video tutorials', 'Interactive diagrams', 'Mind maps'],
    auditory: ['Audio lectures', 'Group discussions', 'Verbal explanations'],
    kinesthetic: ['Hands-on exercises', 'Interactive simulations', 'Practice problems']
  }
  return resources[style] || resources.visual
}

const calculateEstimatedStudyTime = (proficiency: number): number => {
  // Basic calculation - could be enhanced with machine learning
  if (proficiency < 60) return 120 // 120 minutes
  if (proficiency < 75) return 90 // 90 minutes
  return 60 // 60 minutes
}