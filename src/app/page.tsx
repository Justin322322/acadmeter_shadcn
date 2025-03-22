"use client"

import { Button } from "@/components/ui/button"
import { 
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  ChartPieIcon,
  UserGroupIcon,
  DocumentChartBarIcon,
  PresentationChartLineIcon,
  ArrowRightIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline"
import { motion } from "framer-motion"
import { Navigation } from "@/components/ui/navigation"
import { DashboardMockup } from "@/components/ui/dashboard-mockup"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

export default function Home() {
  return (
    <div>
      <Navigation />
      <main className="relative text-slate-800 dark:text-slate-100 overflow-x-hidden">
        <section className="min-h-[50vh] sm:min-h-[60vh] flex items-center pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-24 lg:min-h-screen overflow-hidden relative px-4 sm:px-6">
          <div className="absolute inset-0">
            <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/20 h-full w-full" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-900/80" />
          </div>

          <div className="container mx-auto relative z-10">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 items-center">
              {/* Hero Content */}
              <div className="text-center lg:text-left">
                <div className="relative inline-block mb-6 sm:mb-8">
                  <motion.div
                    className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-2xl"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1.2 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  />
                  <div className="relative flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white">
                      <AcademicCapIcon className="w-7 h-7" />
                    </div>
                    <span className="relative px-4 py-2 rounded-full bg-blue-100/90 dark:bg-blue-900/90 text-blue-600 dark:text-blue-300 text-base font-medium">
                      Next-Gen Education Platform
                    </span>
                  </div>
                </div>
                
                <h1 className="text-[2.75rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-6xl font-bold mb-5 sm:mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 inline">
                    Transform Education
                  </span>
                  <br />
                  <span className="mt-2 sm:mt-3 inline-block">Through Smart Analytics</span>
                </h1>

                <p className="text-xl sm:text-2xl lg:text-2xl mb-8 sm:mb-10 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Revolutionize your institution&apos;s academic performance with AI-powered insights and real-time analytics.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white px-8 py-7 text-lg sm:py-3 sm:text-base rounded-2xl sm:rounded-lg min-w-[240px] sm:min-w-0"
                  >
                    Start Free Trial
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto group px-8 py-7 text-lg sm:py-3 sm:text-base rounded-2xl sm:rounded-lg min-w-[240px] sm:min-w-0"
                  >
                    Watch Demo
                    <ArrowRightIcon className="h-5 w-5 sm:h-4 sm:w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Stats Grid - Mobile Optimized */}
                <div className="mt-12 sm:mt-16 lg:mt-16 overflow-hidden">
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 -mx-4 sm:mx-0 px-4 sm:px-0">
                    <motion.div 
                      className="bg-white dark:bg-slate-800/50 rounded-xl p-3 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-700 relative overflow-hidden group"
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="absolute -right-6 -top-6 w-12 h-12 sm:w-24 sm:h-24 bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-2xl transform group-hover:scale-110 transition-transform"></div>
                      <div className="relative">
                        <h3 className="text-lg sm:text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">95<span className="text-sm sm:text-xl md:text-2xl">%</span></h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">Satisfaction</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="bg-white dark:bg-slate-800/50 rounded-xl p-3 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-700 relative overflow-hidden group"
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="absolute -right-6 -top-6 w-12 h-12 sm:w-24 sm:h-24 bg-violet-100/50 dark:bg-violet-900/20 rounded-full blur-2xl transform group-hover:scale-110 transition-transform"></div>
                      <div className="relative">
                        <h3 className="text-lg sm:text-3xl md:text-4xl font-bold text-violet-600 dark:text-violet-400 mb-1">10k<span className="text-sm sm:text-xl md:text-2xl">+</span></h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">Students</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="bg-white dark:bg-slate-800/50 rounded-xl p-3 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-700 relative overflow-hidden group"
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="absolute -right-6 -top-6 w-12 h-12 sm:w-24 sm:h-24 bg-emerald-100/50 dark:bg-emerald-900/20 rounded-full blur-2xl transform group-hover:scale-110 transition-transform"></div>
                      <div className="relative">
                        <h3 className="text-lg sm:text-3xl md:text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">40<span className="text-sm sm:text-xl md:text-2xl">%</span></h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">Growth</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Trust Badge */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start mt-4 sm:mt-8">
                    <div className="flex -space-x-1.5 sm:-space-x-2">
                      {[1,2,3,4].map((i) => (
                        <motion.div
                          key={i}
                          className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full ring-2 ring-white dark:ring-slate-900 bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs sm:text-sm font-bold"
                          initial={{ scale: 0, x: -10 }}
                          animate={{ scale: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          {String.fromCharCode(64 + i)}
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      Trusted by <span className="font-semibold text-slate-900 dark:text-white">500+</span> institutions worldwide
                    </p>
                  </div>
                </div>
              </div>

              {/* Hero Visual */}
              <div className="lg:flex items-center justify-end">
                <div className="w-full max-w-[85vw] sm:max-w-md lg:max-w-none mx-auto">
                  <div className="relative">
                    <DashboardMockup />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - New Layout */}
        <section id="features" className="relative py-24 sm:py-32 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-950 dark:to-slate-900 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-white dark:via-slate-900 dark:to-slate-900" />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4 block tracking-wide">
                POWERFUL FEATURES
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                Everything You Need to Excel
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Transform your academic institution with our comprehensive suite of tools and analytics.
              </p>
            </motion.div>
            
            <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">
              {/* Feature Cards with Hover Effects */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group relative"
              >
                <div className="relative bg-white dark:bg-slate-800/50 rounded-2xl p-8 pt-16 shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-blue-500/10 mt-8">
                  <div className="absolute -top-8 left-8 w-16 h-16">
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                      <ClipboardDocumentCheckIcon className="w-8 h-8" />
                    </div>
                    <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-500/40 rounded-2xl blur-xl transform group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Automated Grade Management</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    Streamline your grading process with intelligent automation
                  </p>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-slate-600 dark:text-slate-400 text-sm">
                    Eliminate manual errors and save time with our automated grade processing system that handles large volumes of student data efficiently.
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="group relative"
              >
                <div className="relative bg-white dark:bg-slate-800/50 rounded-2xl p-8 pt-16 shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:border-violet-500/50 dark:hover:border-violet-500/50 transition-all duration-300 hover:shadow-violet-500/10 mt-8">
                  <div className="absolute -top-8 left-8 w-16 h-16">
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                      <ChartPieIcon className="w-8 h-8" />
                    </div>
                    <div className="absolute inset-0 bg-violet-500/20 dark:bg-violet-500/40 rounded-2xl blur-xl transform group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Real-time Analytics</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    Make data-driven decisions with instant insights
                  </p>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-slate-600 dark:text-slate-400 text-sm">
                    Access comprehensive analytics dashboards that provide real-time performance metrics and identify areas for improvement.
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="group relative"
              >
                <div className="relative bg-white dark:bg-slate-800/50 rounded-2xl p-8 pt-16 shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300 hover:shadow-emerald-500/10 mt-8">
                  <div className="absolute -top-8 left-8 w-16 h-16">
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                      <UserGroupIcon className="w-8 h-8" />
                    </div>
                    <div className="absolute inset-0 bg-emerald-500/20 dark:bg-emerald-500/40 rounded-2xl blur-xl transform group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Early Intervention System</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    Proactive support for student success
                  </p>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-slate-600 dark:text-slate-400 text-sm">
                    Identify at-risk students early with our predictive analytics and intervention recommendation system.
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section - New Layout */}
        <section id="benefits" className="py-24 sm:py-32 bg-white dark:bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800/20 mask-gradient"></div>
          
          <motion.div 
            className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeIn} 
              className="text-center mb-20"
            >
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 text-sm font-medium">
                TAILORED SOLUTIONS
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-200">Benefits For Everyone</h2>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Our platform is designed to meet the needs of different users across your institution.
              </p>
            </motion.div>
            
            <div className="grid lg:grid-cols-2 gap-8 xl:gap-16">
              <motion.div 
                className="relative group"
                variants={fadeIn}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-violet-500/10 rounded-3xl blur-xl transition-opacity group-hover:opacity-75"></div>
                <div className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white">
                      <DocumentChartBarIcon className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">For Administrators</h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Centralized data management",
                      "Automated reporting systems",
                      "Resource optimization",
                      "Enhanced decision-making capabilities"
                    ].map((item, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-center gap-3 text-slate-700 dark:text-slate-300"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                          <CheckCircleIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
              
              <motion.div 
                className="relative group"
                variants={fadeIn}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-pink-500/10 rounded-3xl blur-xl transition-opacity group-hover:opacity-75"></div>
                <div className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white">
                      <PresentationChartLineIcon className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">For Teachers</h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Simplified grade entry and management",
                      "Performance tracking tools",
                      "Customizable assessment templates",
                      "Student progress monitoring"
                    ].map((item, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-center gap-3 text-slate-700 dark:text-slate-300"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                          <CheckCircleIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Testimonials Section - New Layout */}
        <section id="testimonials" className="py-24 sm:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-slate-900 dark:via-slate-900/80" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-medium">
                TESTIMONIALS
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                What Our Users Say
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Hear from educators who have transformed their institutions with AcadMeter.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-violet-500/10 rounded-2xl blur-xl transition-opacity opacity-0 group-hover:opacity-100"></div>
                <div className="relative h-full bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 lg:p-10 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
                  <svg className="w-12 h-12 text-blue-500 mb-6" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <blockquote className="text-xl text-slate-700 dark:text-slate-300 italic mb-8 leading-relaxed">
                    &ldquo;AcadMeter has completely transformed how we track student performance. The insights are invaluable and have helped us improve our institution&apos;s academic outcomes by 25%.&rdquo;
                  </blockquote>
                  <footer className="mt-auto">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-lg font-bold">
                        CM
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">Dr. Coco Martin</div>
                        <div className="text-slate-600 dark:text-slate-400">Academic Director, International School of Excellence</div>
                      </div>
                    </div>
                  </footer>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="group relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/10 to-pink-500/10 rounded-2xl blur-xl transition-opacity opacity-0 group-hover:opacity-100"></div>
                <div className="relative h-full bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 lg:p-10 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
                  <svg className="w-12 h-12 text-violet-500 mb-6" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <blockquote className="text-xl text-slate-700 dark:text-slate-300 italic mb-8 leading-relaxed">
                    &ldquo;The automated grading system has saved our teachers countless hours. It&apos;s a game-changer for us and lets our staff focus more on teaching than administrative tasks.&rdquo;
                  </blockquote>
                  <footer className="mt-auto">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-lg font-bold">
                        MV
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">Michael V.</div>
                        <div className="text-slate-600 dark:text-slate-400">Principal, Valley High School</div>
                      </div>
                    </div>
                  </footer>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer - Fixed container width */}
        <footer className="bg-slate-900 text-slate-400">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Main Footer Content */}
            <div className="py-12 sm:py-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 border-b border-slate-800">
              {/* Logo and Description */}
              <div className="col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-1 lg:pr-8">
                <div className="text-2xl font-bold text-white mb-4">AcadMeter</div>
                <p className="text-slate-400 mb-6 text-sm sm:text-base">
                  Empowering educational institutions with smart analytics and management tools.
                </p>
              </div>

              {/* Navigation Links - Mobile Optimized */}
              <div className="space-y-6 sm:space-y-0">
                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Product</h3>
                  <ul className="space-y-2">
                    <li><a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a></li>
                    <li><a href="#pricing" className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</a></li>
                    <li><a href="#case-studies" className="text-sm text-slate-400 hover:text-white transition-colors">Case Studies</a></li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-0">
                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Company</h3>
                  <ul className="space-y-2">
                    <li><a href="/about" className="text-sm text-slate-400 hover:text-white transition-colors">About</a></li>
                    <li><a href="/blog" className="text-sm text-slate-400 hover:text-white transition-colors">Blog</a></li>
                    <li><a href="/careers" className="text-sm text-slate-400 hover:text-white transition-colors">Careers</a></li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-0">
                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Resources</h3>
                  <ul className="space-y-2">
                    <li><a href="/docs" className="text-sm text-slate-400 hover:text-white transition-colors">Documentation</a></li>
                    <li><a href="/help" className="text-sm text-slate-400 hover:text-white transition-colors">Help Center</a></li>
                    <li><a href="/support" className="text-sm text-slate-400 hover:text-white transition-colors">Support</a></li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-0">
                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Legal</h3>
                  <ul className="space-y-2">
                    <li><a href="/privacy" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy</a></li>
                    <li><a href="/terms" className="text-sm text-slate-400 hover:text-white transition-colors">Terms</a></li>
                    <li><a href="/security" className="text-sm text-slate-400 hover:text-white transition-colors">Security</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer Bottom - With Dynamic Year */}
            <div className="py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-500 text-center sm:text-left">
                © {new Date().getFullYear()} AcadMeter. All rights reserved.
              </p>
              
              <div className="flex items-center gap-6">
                <a 
                  href="https://twitter.com/acadmeter" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>

                <a 
                  href="https://linkedin.com/company/acadmeter" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                <a 
                  href="https://github.com/acadmeter" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">GitHub</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
