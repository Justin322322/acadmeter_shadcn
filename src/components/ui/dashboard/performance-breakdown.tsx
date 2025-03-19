"use client"

import { motion } from "framer-motion"
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline"

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
}

export function PerformanceBreakdown() {
  const performanceData = [
    {
      subject: "Mathematics",
      currentScore: 85,
      change: 7,
      breakdown: {
        homework: 90,
        quizzes: 85,
        participation: 82,
        exams: 83
      }
    },
    {
      subject: "Science",
      currentScore: 88,
      change: 6,
      breakdown: {
        homework: 87,
        quizzes: 89,
        participation: 85,
        exams: 91
      }
    },
    {
      subject: "English",
      currentScore: 82,
      change: 3,
      breakdown: {
        homework: 84,
        quizzes: 80,
        participation: 88,
        exams: 76
      }
    }
  ]

  return (
    <motion.div
      variants={item}
      initial="hidden"
      animate="show"
      className="space-y-4 h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 scrollbar-track-transparent hover:scrollbar-thumb-slate-300 dark:hover:scrollbar-thumb-slate-700"
    >
      {performanceData.map((subject) => (
        <div key={subject.subject} className="space-y-4">
          <div>
            <h3 className="text-base font-medium text-slate-900 dark:text-white">{subject.subject}</h3>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{subject.currentScore}%</span>
              <div className="flex items-center gap-1 text-sm text-green-500 dark:text-green-400">
                <ArrowTrendingUpIcon className="w-4 h-4" />
                <span>{subject.change}% increase</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(subject.breakdown).map(([category, score]) => (
              <div key={category} className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
                <div className="text-xs text-slate-500 dark:text-slate-400 capitalize">{category}</div>
                <div className="text-lg font-semibold text-slate-900 dark:text-white mt-1">{score}%</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  )
}