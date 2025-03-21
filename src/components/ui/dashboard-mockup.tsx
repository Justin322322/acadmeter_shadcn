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
import { useState } from "react"

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
  const [isInFrontView, setIsInFrontView] = useState(false)

  const themeColors = {
    background: isDark 
      ? 'from-slate-900 to-slate-800' 
      : 'from-slate-100 to-white',
    card: isDark 
      ? 'bg-slate-800/80 backdrop-blur-sm' 
      : 'bg-white/90 backdrop-blur-sm',
    shadow: isDark
      ? 'shadow-[0_8px_32px_rgba(0,0,0,0.2)]'
      : 'shadow-[0_8px_32px_rgba(0,0,0,0.05)]',
    text: isDark 
      ? 'text-white' 
      : 'text-slate-900',
    subtext: isDark 
      ? 'text-slate-300' 
      : 'text-slate-600',
    topBar: isDark 
      ? 'bg-slate-800/90 backdrop-blur-md' 
      : 'bg-white/90 backdrop-blur-md',
  }

  const data = [
    { name: "Mon", math: 65, science: 70, english: 60 },
    { name: "Tue", math: 78, science: 75, english: 82 },
    { name: "Wed", math: 72, science: 68, english: 77 },
    { name: "Thu", math: 85, science: 80, english: 79 },
    { name: "Fri", math: 82, science: 85, english: 83 },
    { name: "Sat", math: 90, science: 87, english: 88 },
    { name: "Sun", math: 88, science: 91, english: 86 },
  ]

  const handleRotationChange = (latest: { rotateX: number; rotateZ: number }) => {
    const isFrontView = latest.rotateX === 0 && latest.rotateZ === 0
    setIsInFrontView(isFrontView)
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-1 sm:p-4 md:p-6">
      <div className="relative [perspective:1000px] sm:[perspective:2000px]">
        <div className="relative">
          <div className={`absolute -inset-40 opacity-0 transition-opacity duration-500 ${isInFrontView ? 'opacity-100' : ''}`}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.3),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.5),transparent_70%)] blur-2xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.15),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.3),transparent_70%)] blur-3xl" />
          </div>
          <motion.div 
            className={`relative w-full bg-gradient-to-tr ${themeColors.background} rounded-lg sm:rounded-xl overflow-hidden ${themeColors.shadow} 
              [transform-style:preserve-3d] 
              [transform:rotateX(0deg)_rotateY(0deg)_rotateZ(0deg)] 
              sm:[transform:rotateX(20deg)_rotateY(0deg)_rotateZ(20deg)] 
              sm:hover:[transform:rotateX(0deg)_rotateY(0deg)_rotateZ(0deg)] 
              md:[transform:rotateX(35deg)_rotateY(0deg)_rotateZ(35deg)] 
              md:hover:[transform:rotateX(0deg)_rotateY(0deg)_rotateZ(0deg)] 
              transition-all duration-700`}
            onUpdate={handleRotationChange}
            onHoverStart={() => setIsInFrontView(true)}
            onHoverEnd={() => setIsInFrontView(false)}
          >
            <div className={`absolute top-0 left-0 right-0 h-6 sm:h-8 md:h-10 ${themeColors.topBar} flex items-center px-2 sm:px-4 gap-1 sm:gap-2`}>
              <div className="flex gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
              </div>
            </div>
            
            <motion.div 
              className="p-3 sm:p-6 md:p-8 lg:p-10 pt-8 sm:pt-12 md:pt-14 lg:pt-16"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 mb-3 sm:mb-6">
                <motion.div variants={item}>
                  <Card className="h-28 sm:h-40 md:h-44">
                    <CardContent className="p-2 sm:p-4">
                      <div className="flex items-center gap-1.5 sm:gap-3 mb-1.5 sm:mb-2">
                        <UserGroupIcon className="w-3.5 h-3.5 text-blue-400 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        <span className={`text-[11px] sm:text-sm ${themeColors.subtext}`}>Total Students</span>
                      </div>
                      <p className={`text-lg sm:text-2xl md:text-3xl font-bold ${themeColors.text}`}>2,547</p>
                      <div className="flex items-center gap-1 mt-1 sm:mt-2 text-green-400 text-[10px] sm:text-sm">
                        <ArrowTrendingUpIcon className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                        <span>12% increase</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div variants={item}>
                  <Card className="h-28 sm:h-40 md:h-44">
                    <CardContent className="p-2 sm:p-4">
                      <div className="flex items-center gap-1.5 sm:gap-3 mb-1.5 sm:mb-2">
                        <CheckCircleIcon className="w-3.5 h-3.5 text-green-400 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        <span className={`text-[11px] sm:text-sm ${themeColors.subtext}`}>Passing Rate</span>
                      </div>
                      <p className={`text-lg sm:text-2xl md:text-3xl font-bold ${themeColors.text}`}>87.3%</p>
                      <div className="flex items-center gap-1 mt-1 sm:mt-2 text-green-400 text-[10px] sm:text-sm">
                        <ArrowTrendingUpIcon className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                        <span>5.2% increase</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div variants={item}>
                  <Card className="h-28 sm:h-40 md:h-44">
                    <CardContent className="p-2 sm:p-4">
                      <div className="flex items-center gap-1.5 sm:gap-3 mb-1.5 sm:mb-2">
                        <ExclamationTriangleIcon className="w-3.5 h-3.5 text-yellow-400 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        <span className={`text-[11px] sm:text-sm ${themeColors.subtext}`}>At Risk Students</span>
                      </div>
                      <p className={`text-lg sm:text-2xl md:text-3xl font-bold ${themeColors.text}`}>124</p>
                      <div className="flex items-center gap-1 mt-1 sm:mt-2 text-red-400 text-[10px] sm:text-sm">
                        <ArrowTrendingUpIcon className="w-2.5 h-2.5 sm:w-4 sm:h-4 rotate-180" />
                        <span>3.1% decrease</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <motion.div variants={item}>
                <Card className="group">
                  <CardHeader className="p-2 sm:p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                      <div className="flex items-center gap-1.5 sm:gap-3">
                        <ChartBarIcon className="w-3.5 h-3.5 text-violet-400 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        <CardTitle className={`text-xs sm:text-sm md:text-base ${themeColors.text}`}>Performance Trends</CardTitle>
                      </div>
                      <div className="flex flex-wrap gap-2 sm:gap-3 text-[10px] sm:text-sm">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
                          <span className={`${themeColors.subtext}`}>Math</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${isDark ? 'bg-green-400' : 'bg-green-600'}`}></div>
                          <span className={`${themeColors.subtext}`}>Science</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${isDark ? 'bg-violet-400' : 'bg-violet-600'}`}></div>
                          <span className={`${themeColors.subtext}`}>English</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-2 sm:p-4">
                    <div className="h-32 sm:h-44 md:h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                          <CartesianGrid 
                            strokeDasharray="3 3" 
                            stroke={isDark ? '#334155' : '#e2e8f0'}
                          />
                          <XAxis 
                            dataKey="name" 
                            stroke={isDark ? '#94a3b8' : '#64748b'}
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            dy={8}
                          />
                          <YAxis 
                            stroke={isDark ? '#94a3b8' : '#64748b'}
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            dx={-8}
                          />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: isDark ? '#1e293b' : '#ffffff',
                              border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                              borderRadius: '6px',
                              backdropFilter: 'blur(8px)',
                              padding: '8px',
                              fontSize: '12px'
                            }}
                            labelStyle={{ color: isDark ? '#e2e8f0' : '#1e293b', fontSize: '11px' }}
                            cursor={{ strokeDasharray: '3 3' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="math" 
                            stroke={isDark ? '#60a5fa' : '#2563eb'}
                            strokeWidth={1.5}
                            dot={{ r: 2, fill: isDark ? '#60a5fa' : '#2563eb' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="science" 
                            stroke={isDark ? '#4ade80' : '#16a34a'}
                            strokeWidth={1.5}
                            dot={{ r: 2, fill: isDark ? '#4ade80' : '#16a34a' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="english" 
                            stroke={isDark ? '#c084fc' : '#7c3aed'}
                            strokeWidth={1.5}
                            dot={{ r: 2, fill: isDark ? '#c084fc' : '#7c3aed' }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}