"use client"

import { Button } from "@/components/ui/button"
import { ChartBarIcon, AcademicCapIcon, ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/24/outline"
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
        <section className="pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-32 md:pb-24 lg:min-h-screen overflow-hidden relative px-4 sm:px-6">
          <div className="absolute inset-0">
            <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/20 h-full w-full" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-900/80" />
          </div>

          <div className="container mx-auto relative z-10">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 items-center">
              {/* Hero Content */}
              <div className="text-center lg:text-left mb-12 lg:mb-0">
                <div className="relative inline-block mb-6">
                  <motion.div
                    className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-2xl"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1.2 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  />
                  <span className="relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-100/90 dark:bg-blue-900/90 text-blue-600 dark:text-blue-300 text-xs sm:text-sm font-medium">
                    Next-Gen Education Platform
                  </span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                    Transform Education
                  </span>
                  <br />
                  Through Smart Analytics
                </h1>

                <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0">
                  Revolutionize your institution&apos;s academic performance with AI-powered insights and real-time analytics.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-600/90 text-white px-8 py-3 text-base min-w-[200px] sm:min-w-0"
                  >
                    Start Free Trial
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto group px-8 py-3 text-base min-w-[200px] sm:min-w-0"
                  >
                    Watch Demo
                    <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Stats Grid - Modified for mobile */}
                <div className="mt-8 sm:mt-12 lg:mt-16">
                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
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

        {/* Features Section - Fixed container width */}
        <section id="features" className="relative py-20 sm:py-32 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-950 dark:to-slate-900 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-white dark:via-slate-900 dark:to-slate-900" />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
              <span className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4 block tracking-wide">
                POWERFUL FEATURES
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8 leading-tight">
                Everything You Need to Excel
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 px-4 sm:px-0">
                Transform your academic institution with our comprehensive suite of tools and analytics.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {/* Feature cards with improved mobile layout */}
              {/* Feature Card 1 */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-violet-500 rounded-xl blur opacity-5 group-hover:opacity-10 transition duration-500"></div>
                <div className="relative h-full bg-white dark:bg-slate-800/50 rounded-lg p-6 sm:p-8 ring-1 ring-slate-900/5 dark:ring-white/10 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-500/10">
                      <ChartBarIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                      Automated Grade Management
                    </h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg">
                    Streamline your grading process with intelligent automation
                  </p>
                  <div className="text-base text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6">
                    Eliminate manual errors and save time with our automated grade processing system that handles large volumes of student data efficiently.
                  </div>
                </div>
              </div>

              {/* Feature Card 2 */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl blur opacity-5 group-hover:opacity-10 transition duration-500"></div>
                <div className="relative h-full bg-white dark:bg-slate-800/50 rounded-lg p-6 sm:p-8 ring-1 ring-slate-900/5 dark:ring-white/10 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-violet-50 dark:bg-violet-500/10">
                      <CheckCircleIcon className="w-8 h-8 text-violet-600 dark:text-violet-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                      Real-time Analytics
                    </h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg">
                    Make data-driven decisions with instant insights
                  </p>
                  <div className="text-base text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6">
                    Access comprehensive analytics dashboards that provide real-time performance metrics and identify areas for improvement.
                  </div>
                </div>
              </div>

              {/* Feature Card 3 */}
              <div className="group relative lg:col-span-1 md:col-span-2">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-5 group-hover:opacity-10 transition duration-500"></div>
                <div className="relative h-full bg-white dark:bg-slate-800/50 rounded-lg p-6 sm:p-8 ring-1 ring-slate-900/5 dark:ring-white/10 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/10">
                      <AcademicCapIcon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                      Early Intervention System
                    </h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg">
                    Proactive support for student success
                  </p>
                  <div className="text-base text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6">
                    Identify at-risk students early with our predictive analytics and intervention recommendation system.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section - Fixed container width */}
        <section id="benefits" className="py-20 sm:py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-light dark:bg-grid-slate-dark opacity-[0.15] pointer-events-none"></div>
          <div className="absolute inset-0 hero-gradient-light dark:hero-gradient-dark pointer-events-none"></div>
          
          <motion.div 
            className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeIn} 
              className="text-center mb-12 sm:mb-16"
            >
              <span className="inline-block mb-4 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 text-sm font-medium">
                TAILORED SOLUTIONS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800 dark:text-white">Benefits For Everyone</h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Our platform is designed to meet the needs of different users across your institution.
              </p>
            </motion.div>
            
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-7xl mx-auto">
              <motion.div 
                className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 relative overflow-hidden group"
                variants={fadeIn}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl transform group-hover:scale-110 transition-transform"></div>
                <div className="h-14 w-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 relative">
                  <ChartBarIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">For Administrators</h3>
                <ul className="space-y-3">
                  {[
                    "Centralized data management",
                    "Automated reporting systems",
                    "Resource optimization",
                    "Enhanced decision-making capabilities"
                  ].map((item, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                    >
                      <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-600 dark:text-slate-300">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div 
                className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 relative overflow-hidden group"
                variants={fadeIn}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute -left-20 -top-20 w-40 h-40 bg-violet-100/50 dark:bg-violet-900/20 rounded-full blur-3xl transform group-hover:scale-110 transition-transform"></div>
                <div className="h-14 w-14 bg-violet-100 dark:bg-violet-900/30 rounded-2xl flex items-center justify-center mb-6 relative">
                  <AcademicCapIcon className="h-8 w-8 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">For Teachers</h3>
                <ul className="space-y-3">
                  {[
                    "Simplified grade entry and management",
                    "Performance tracking tools",
                    "Customizable assessment templates",
                    "Student progress monitoring"
                  ].map((item, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                    >
                      <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-600 dark:text-slate-300">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Testimonials Section - Fixed container width */}
        <section id="testimonials" className="py-20 sm:py-24 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block mb-4 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm font-medium">
                TESTIMONIALS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800 dark:text-white">What Our Users Say</h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Hear from educators who have transformed their institutions with AcadMeter.
              </p>
            </motion.div>
            
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700 relative h-full group">
                  <div className="absolute -z-10 top-0 right-0 w-32 h-32 bg-blue-50 dark:bg-blue-900/20 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform"></div>
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <svg className="w-10 h-10 text-blue-500 mb-2" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <p className="text-lg text-slate-700 dark:text-slate-300 italic">
                        AcadMeter has completely transformed how we track student performance. The insights are invaluable and have helped us improve our institution&apos;s academic outcomes by 25%.
                      </p>
                    </div>
                    <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700">
                      <p className="font-bold text-slate-900 dark:text-white">Dr. Coco Martin</p>
                      <p className="text-slate-500 dark:text-slate-400">Academic Director, International School of Excellence</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700 relative h-full group">
                  <div className="absolute -z-10 top-0 left-0 w-32 h-32 bg-violet-50 dark:bg-violet-900/20 rounded-full blur-2xl transform -translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform"></div>
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <svg className="w-10 h-10 text-violet-500 mb-2" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <p className="text-lg text-slate-700 dark:text-slate-300 italic">
                        The automated grading system has saved our teachers countless hours. It&apos;s a game-changer for us and lets our staff focus more on teaching than administrative tasks.
                      </p>
                    </div>
                    <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700">
                      <p className="font-bold text-slate-900 dark:text-white">Michael V.</p>
                      <p className="text-slate-500 dark:text-slate-400">Principal, Valley High School</p>
                    </div>
                  </div>
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
