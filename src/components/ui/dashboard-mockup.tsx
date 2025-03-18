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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function DashboardMockup() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const themeColors = {
    background: isDark 
      ? 'from-slate-900 to-slate-800' 
      : 'from-slate-100 to-white',
    card: isDark 
      ? 'bg-slate-800/80 backdrop-blur-sm' 
      : 'bg-white/90 backdrop-blur-sm',
    border: isDark 
      ? 'border-slate-700' 
      : 'border-slate-200',
    shadow: isDark
      ? 'shadow-[0_4px_12px_rgba(0,0,0,0.3)]'
      : 'shadow-[0_4px_12px_rgba(0,0,0,0.1)]',
    text: isDark 
      ? 'text-white' 
      : 'text-slate-900',
    subtext: isDark 
      ? 'text-slate-300' 
      : 'text-slate-600',
    topBar: isDark 
      ? 'bg-slate-800/90 backdrop-blur-md' 
      : 'bg-white/90 backdrop-blur-md border-b border-slate-200',
  }

  // Sample data for each subject (7 days)
  const data = [
    { name: "Mon", math: 65, science: 70, english: 60 },
    { name: "Tue", math: 78, science: 75, english: 82 },
    { name: "Wed", math: 72, science: 68, english: 77 },
    { name: "Thu", math: 85, science: 80, english: 79 },
    { name: "Fri", math: 82, science: 85, english: 83 },
    { name: "Sat", math: 90, science: 87, english: 88 },
    { name: "Sun", math: 88, science: 91, english: 86 },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
      <div className={`relative w-full bg-gradient-to-tr ${themeColors.background} rounded-xl overflow-hidden ${themeColors.shadow}`}>
        {/* Top Bar */}
        <div className={`absolute top-0 left-0 right-0 h-8 sm:h-10 ${themeColors.topBar} flex items-center px-4 gap-2 border-b ${themeColors.border}`}>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
        </div>
        
        {/* Content */}
        <motion.div 
          className="p-6 sm:p-8 md:p-10 pt-12 sm:pt-14 md:pt-16"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <motion.div variants={item}>
              <Card className="h-40 sm:h-44">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <UserGroupIcon className="w-5 h-5 text-blue-400 sm:w-6 sm:h-6" />
                    <span className={`text-sm ${themeColors.subtext}`}>Total Students</span>
                  </div>
                  <p className={`text-2xl sm:text-3xl font-bold ${themeColors.text}`}>2,547</p>
                  <div className="flex items-center gap-1 mt-2 text-green-400 text-sm">
                    <ArrowTrendingUpIcon className="w-4 h-4" />
                    <span>12% increase</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card className="h-40 sm:h-44">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircleIcon className="w-5 h-5 text-green-400 sm:w-6 sm:h-6" />
                    <span className={`text-sm ${themeColors.subtext}`}>Passing Rate</span>
                  </div>
                  <p className={`text-2xl sm:text-3xl font-bold ${themeColors.text}`}>87.3%</p>
                  <div className="flex items-center gap-1 mt-2 text-green-400 text-sm">
                    <ArrowTrendingUpIcon className="w-4 h-4" />
                    <span>5.2% increase</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card className="h-40 sm:h-44">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400 sm:w-6 sm:h-6" />
                    <span className={`text-sm ${themeColors.subtext}`}>At Risk Students</span>
                  </div>
                  <p className={`text-2xl sm:text-3xl font-bold ${themeColors.text}`}>124</p>
                  <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                    <ArrowTrendingUpIcon className="w-4 h-4 rotate-180" />
                    <span>3.1% decrease</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Charts and Tables */}
          <motion.div variants={item}>
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="flex items-center gap-3 mb-4 sm:mb-0">
                    <ChartBarIcon className="w-5 h-5 text-violet-400 sm:w-6 sm:h-6" />
                    <CardTitle className={`text-sm sm:text-base ${themeColors.text}`}>Performance Trends</CardTitle>
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
                      <span className={`text-xs sm:text-sm ${themeColors.subtext}`}>Math</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-green-400' : 'bg-green-600'}`}></div>
                      <span className={`text-xs sm:text-sm ${themeColors.subtext}`}>Science</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-violet-400' : 'bg-violet-600'}`}></div>
                      <span className={`text-xs sm:text-sm ${themeColors.subtext}`}>English</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
                      <XAxis 
                        dataKey="name" 
                        stroke={isDark ? '#94a3b8' : '#64748b'}
                        fontSize={12}
                      />
                      <YAxis 
                        stroke={isDark ? '#94a3b8' : '#64748b'}
                        fontSize={12}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: isDark ? '#1e293b' : '#ffffff',
                          border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                          borderRadius: '6px',
                        }}
                        labelStyle={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="math" 
                        stroke={isDark ? '#60a5fa' : '#2563eb'}
                        strokeWidth={2}
                        dot={{ fill: isDark ? '#60a5fa' : '#2563eb' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="science" 
                        stroke={isDark ? '#4ade80' : '#16a34a'}
                        strokeWidth={2}
                        dot={{ fill: isDark ? '#4ade80' : '#16a34a' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="english" 
                        stroke={isDark ? '#c084fc' : '#7c3aed'}
                        strokeWidth={2}
                        dot={{ fill: isDark ? '#c084fc' : '#7c3aed' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
