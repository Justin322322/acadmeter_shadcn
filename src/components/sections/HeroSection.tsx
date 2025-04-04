"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, AcademicCapIcon } from "@heroicons/react/24/outline"
import { DashboardMockup } from "@/components/ui/dashboard-mockup"

export function HeroSection() {
  return (
    <section className="min-h-[50vh] sm:min-h-[60vh] flex items-center pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-24 lg:min-h-[90vh] overflow-hidden relative px-4 sm:px-6">
      <div className="absolute inset-0">
        <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/20 h-full w-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-900/80" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <motion.div
              className="relative inline-block mb-6 sm:mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-2xl"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1.2 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
              <div className="relative flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white">
                  <AcademicCapIcon className="w-7 h-7" />
                </div>
                <span className="relative px-4 py-2 rounded-full bg-blue-100/90 dark:bg-blue-900/90 text-blue-600 dark:text-blue-300 text-base font-medium">
                  Next-Gen Education Platform
                </span>
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 sm:mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 inline">
                Transform Education
              </span>
              <br />
              <span className="mt-2 sm:mt-3 inline-block">Through Smart Analytics</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl mb-8 sm:mb-10 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Revolutionize your institution&apos;s academic performance with AI-powered insights and real-time analytics.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white px-8 py-6 sm:py-3 text-base rounded-lg min-w-0 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
              >
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto group px-8 py-6 sm:py-3 text-base rounded-lg min-w-0 transition-all duration-300 hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
              >
                Watch Demo
                <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Stats Grid */}
            <HeroStats />
          </div>

          {/* Hero Visual */}
          <motion.div
            className="lg:flex items-center justify-end mt-12 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="w-full max-w-[85vw] sm:max-w-md lg:max-w-none mx-auto">
              <div className="relative">
                <DashboardMockup />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function HeroStats() {
  return (
    <motion.div
      className="mt-12 sm:mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { value: "95%", label: "Satisfaction", color: "blue" },
          { value: "10k+", label: "Students", color: "violet" },
          { value: "40%", label: "Growth", color: "emerald" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-slate-800/50 rounded-xl p-3 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-700 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <div className={`absolute -right-6 -top-6 w-12 h-12 sm:w-24 sm:h-24 rounded-full blur-2xl transform transition-transform duration-300 group-hover:scale-110 ${stat.color === 'blue' ? 'bg-blue-100/50 dark:bg-blue-900/20' : stat.color === 'violet' ? 'bg-violet-100/50 dark:bg-violet-900/20' : 'bg-emerald-100/50 dark:bg-emerald-900/20'}`}></div>
            <div className="relative">
              <div className="flex items-center">
                <div className="relative mr-3 hidden sm:block">
                  <svg className="w-12 h-12" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" className={`stroke-current ${stat.color === 'blue' ? 'text-blue-100 dark:text-blue-900/30' : stat.color === 'violet' ? 'text-violet-100 dark:text-violet-900/30' : 'text-emerald-100 dark:text-emerald-900/30'}`} strokeWidth="2"></circle>
                    <motion.circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      className={`stroke-current ${stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' : stat.color === 'violet' ? 'text-violet-600 dark:text-violet-400' : 'text-emerald-600 dark:text-emerald-400'}`}
                      strokeWidth="2"
                      strokeDasharray="100"
                      strokeDashoffset="100"
                      initial={{ strokeDashoffset: 100 }}
                      animate={{ strokeDashoffset: stat.value === '95%' ? 5 : stat.value === '40%' ? 60 : 25 }}
                      transition={{ delay: 0.8 + index * 0.2, duration: 1.5, ease: "easeInOut" }}
                    ></motion.circle>
                  </svg>
                </div>
                <div>
                  <motion.h3
                    className={`text-lg sm:text-2xl font-bold mb-1 ${stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' : stat.color === 'violet' ? 'text-violet-600 dark:text-violet-400' : 'text-emerald-600 dark:text-emerald-400'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
                  >
                    {stat.value}
                  </motion.h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Badge */}
      <motion.div
        className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start mt-4 sm:mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center gap-4 sm:gap-6" aria-label="Trusted institutions">
          <div className="flex -space-x-1.5 sm:-space-x-2 relative">
            {[1,2,3,4].map((i) => {
              const colors = [
                "from-blue-500 to-blue-600",
                "from-violet-500 to-violet-600",
                "from-emerald-500 to-emerald-600",
                "from-pink-500 to-pink-600"
              ];
              return (
                <motion.div
                  key={`trust-badge-${i}`}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ring-2 ring-white dark:ring-slate-900 bg-gradient-to-br ${colors[i-1]} flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-md`}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.3 + i * 0.15,
                    type: "spring",
                    stiffness: 200,
                    damping: 10
                  }}
                  whileHover={{
                    y: -5,
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                >
                  {String.fromCharCode(64 + i)}
                </motion.div>
              );
            })}
          </div>
          <motion.p
            className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            Trusted by <span className="font-semibold text-slate-900 dark:text-white bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent">500+</span> institutions worldwide
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  )
}
