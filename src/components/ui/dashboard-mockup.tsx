"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export function DashboardMockup() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const themeColors = {
    background: isDark 
      ? 'from-slate-900 to-slate-800' 
      : 'from-slate-100 to-white',
    card: isDark 
      ? 'bg-slate-800/50' 
      : 'bg-white',
    border: isDark 
      ? 'border-slate-700' 
      : 'border-slate-200',
    shadow: isDark
      ? ''
      : 'shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]',
    text: isDark 
      ? 'text-white' 
      : 'text-slate-900',
    subtext: isDark 
      ? 'text-slate-300' 
      : 'text-slate-600',
    topBar: isDark 
      ? 'bg-slate-800' 
      : 'bg-white border-b border-slate-200',
    chartBar: isDark 
      ? 'from-violet-500/50 to-blue-500/50' 
      : 'from-violet-500/70 to-blue-500/70',
    riskBackground: isDark 
      ? 'bg-red-500/10' 
      : 'bg-red-50'
  }

  return (
    <div className={`w-full aspect-video bg-gradient-to-tr ${themeColors.background} rounded-lg shadow-2xl overflow-hidden relative transition-colors duration-300`}>
      {/* Top Bar */}
      <div className={`absolute top-0 left-0 right-0 h-8 ${themeColors.topBar} flex items-center px-4 gap-2 transition-all duration-300`}>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-10 pt-12">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Stats Cards */}
          <motion.div 
            className={`${themeColors.card} ${themeColors.shadow} p-4 rounded-lg border ${themeColors.border} transition-all duration-300`}
            {...fadeInUp}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <UserGroupIcon className="w-5 h-5 text-blue-500" />
              <span className={themeColors.subtext}>Total Students</span>
            </div>
            <p className={`text-2xl font-bold ${themeColors.text}`}>2,547</p>
            <div className="flex items-center gap-1 mt-2 text-green-500 text-sm">
              <ArrowTrendingUpIcon className="w-4 h-4" />
              <span>12% increase</span>
            </div>
          </motion.div>
          
          <motion.div 
            className={`${themeColors.card} ${themeColors.shadow} p-4 rounded-lg border ${themeColors.border} transition-all duration-300`}
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
              <span className={themeColors.subtext}>Passing Rate</span>
            </div>
            <p className={`text-2xl font-bold ${themeColors.text}`}>87.3%</p>
            <div className="flex items-center gap-1 mt-2 text-green-500 text-sm">
              <ArrowTrendingUpIcon className="w-4 h-4" />
              <span>5.2% increase</span>
            </div>
          </motion.div>
          
          <motion.div 
            className={`${themeColors.card} ${themeColors.shadow} p-4 rounded-lg border ${themeColors.border} transition-all duration-300`}
            {...fadeInUp}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
              <span className={themeColors.subtext}>At Risk Students</span>
            </div>
            <p className={`text-2xl font-bold ${themeColors.text}`}>124</p>
            <div className="flex items-center gap-1 mt-2 text-red-500 text-sm">
              <ArrowTrendingUpIcon className="w-4 h-4 rotate-180" />
              <span>3.1% decrease</span>
            </div>
          </motion.div>
        </div>

        {/* Performance Chart */}
        <motion.div 
          className={`${themeColors.card} ${themeColors.shadow} p-4 rounded-lg border ${themeColors.border} mb-6 transition-all duration-300`}
          {...fadeInUp}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <ChartBarIcon className="w-5 h-5 text-violet-500" />
              <span className={themeColors.subtext}>Performance Trends</span>
            </div>
            <div className="flex gap-2">
              <div className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-600 font-medium">Math</div>
              <div className="text-xs px-2 py-1 rounded bg-green-100 text-green-600 font-medium">Science</div>
              <div className="text-xs px-2 py-1 rounded bg-violet-100 text-violet-600 font-medium">English</div>
            </div>
          </div>
          <div className="h-32 flex items-end gap-2">
            {[65, 78, 72, 85, 82, 90, 88].map((height, i) => (
              <motion.div
                key={i}
                className={`flex-1 bg-gradient-to-t ${themeColors.chartBar} rounded-t transition-all duration-300`}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-500 font-medium">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </motion.div>

        {/* At Risk Students */}
        <motion.div 
          className={`${themeColors.card} ${themeColors.shadow} p-4 rounded-lg border ${themeColors.border} transition-all duration-300`}
          {...fadeInUp}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
            <span className={themeColors.subtext}>Students Requiring Attention</span>
          </div>
          <div className="space-y-2">
            {[
              { name: "John D.", subject: "Mathematics", score: 45, risk: "High" },
              { name: "Sarah M.", subject: "Physics", score: 52, risk: "Medium" },
              { name: "Alex W.", subject: "Chemistry", score: 48, risk: "High" },
            ].map((student, i) => (
              <motion.div
                key={i}
                className={`flex items-center justify-between p-2 ${themeColors.riskBackground} rounded transition-all duration-300`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className={`${themeColors.text} font-medium`}>{student.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-500 font-medium">{student.subject}</span>
                  <span className="text-sm text-red-500 font-medium">{student.score}%</span>
                  <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-600 font-medium">{student.risk}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Overlay gradient */}
      <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-slate-900/50' : 'from-slate-100/50'} to-transparent pointer-events-none transition-colors duration-300`} />
    </div>
  )
}