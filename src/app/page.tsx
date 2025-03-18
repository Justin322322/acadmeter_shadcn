"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/ui/navigation"
import { Testimonial } from "@/components/ui/testimonial"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { DashboardMockup } from "@/components/ui/dashboard-mockup"
import { CheckCircleIcon, ChartBarIcon, AcademicCapIcon, ArrowRightIcon, BoltIcon, ClockIcon, ShieldCheckIcon } from "@heroicons/react/24/outline"
import { motion } from "framer-motion"

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
    <>
      <Navigation />
      <main className="min-h-screen relative pt-16 text-slate-800 dark:text-slate-100">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center">
          <AnimatedBackground />
          <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
            <div className="flex flex-col-reverse md:flex-row items-center gap-12">
              <motion.div 
                className="flex-1 text-center md:text-left"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block mb-4 px-3 py-1 rounded-full bg-blue-100/90 dark:bg-blue-900/90 backdrop-blur-sm text-blue-600 dark:text-blue-300 text-sm font-medium">
                  Academic Excellence Platform
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 [text-shadow:_0_1px_12px_rgb(0_0_0_/_10%)]">
                  Transform Education Through Smart Analytics
                </h1>
                <p className="text-xl mb-8 max-w-2xl backdrop-blur-[2px] text-slate-700 dark:text-slate-200">
                  Revolutionize your institution&apos;s academic performance monitoring with AI-powered insights and real-time analytics for better learning outcomes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white">
                    Start Free Trial
                  </Button>
                  <Button size="lg" variant="outline" className="group">
                    Watch Demo
                    <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="mt-8 flex items-center justify-center md:justify-start gap-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Trusted by 500+ institutions</p>
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-white text-xs font-bold">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative">
                  <DashboardMockup />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </div>
          </div>
          {/* Light gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/30 to-white/50 dark:from-slate-950/50 dark:via-slate-950/30 dark:to-slate-950/50 pointer-events-none" />
        </section>

        {/* Stats Section */}
        <motion.section 
          className="bg-white dark:bg-slate-800 py-12 shadow-sm relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10">
              {[
                { stat: "98%", label: "User Satisfaction", icon: <ShieldCheckIcon className="h-8 w-8 mb-3 mx-auto text-blue-500" /> },
                { stat: "50k+", label: "Students Tracked", icon: <BoltIcon className="h-8 w-8 mb-3 mx-auto text-violet-500" /> },
                { stat: "30%", label: "Performance Improvement", icon: <ClockIcon className="h-8 w-8 mb-3 mx-auto text-emerald-500" /> },
              ].map((item, i) => (
                <motion.div key={i} className="p-6" variants={fadeIn}>
                  {item.icon}
                  <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">{item.stat}</p>
                  <p className="text-slate-600 dark:text-slate-300">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Background decoration */}
          <div className="hidden lg:block absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50 dark:from-blue-900/20 to-transparent"></div>
          <div className="hidden lg:block absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-violet-50 dark:from-violet-900/20 to-transparent"></div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          id="features"
          className="container mx-auto px-4 py-16 md:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="text-center mb-16">
            <span className="inline-block mb-4 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-300 text-sm font-medium">
              POWERFUL FEATURES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800 dark:text-white">Everything You Need in One Place</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              AcadMeter combines powerful analytics with easy-to-use tools, giving you everything you need to transform academic performance monitoring.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <ChartBarIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />,
                title: "Automated Grade Management",
                description: "Streamline your grading process with intelligent automation",
                content: "Eliminate manual errors and save time with our automated grade processing system that handles large volumes of student data efficiently."
              },
              {
                icon: <CheckCircleIcon className="w-8 h-8 text-violet-600 dark:text-violet-400 mb-2" />,
                title: "Real-time Analytics",
                description: "Make data-driven decisions with instant insights",
                content: "Access comprehensive analytics dashboards that provide real-time performance metrics and identify areas for improvement."
              },
              {
                icon: <AcademicCapIcon className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mb-2" />,
                title: "Early Intervention System",
                description: "Proactive support for student success",
                content: "Identify at-risk students early with our predictive analytics and intervention recommendation system."
              }
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeIn}>
                <Card className="h-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    {feature.icon}
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-300">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-slate-600 dark:text-slate-300">
                    {feature.content}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Benefits Section */}
        <section id="benefits" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50">
          <motion.div 
            className="container mx-auto px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="text-center mb-16">
              <span className="inline-block mb-4 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 text-sm font-medium">
                TAILORED FOR EDUCATION
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800 dark:text-white">Why Choose AcadMeter?</h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Our platform is designed to meet the specific needs of educational institutions of all sizes.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <motion.div 
                className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md border border-slate-100 dark:border-slate-700"
                variants={fadeIn}
              >
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
                  <ChartBarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">For Administrators</h3>
                <ul className="space-y-3">
                  {[
                    "Centralized data management",
                    "Automated reporting systems",
                    "Resource optimization",
                    "Enhanced decision-making capabilities"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      <span className="text-slate-600 dark:text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md border border-slate-100 dark:border-slate-700"
                variants={fadeIn}
              >
                <div className="h-12 w-12 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center mb-6">
                  <AcademicCapIcon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">For Teachers</h3>
                <ul className="space-y-3">
                  {[
                    "Simplified grade entry and management",
                    "Performance tracking tools",
                    "Customizable assessment templates",
                    "Student progress monitoring"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      <span className="text-slate-600 dark:text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="container mx-auto px-4 py-16 md:py-24">
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
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Testimonial
              quote="AcadMeter has completely transformed how we track student performance. The insights are invaluable and have helped us improve our institution's academic outcomes by 25%."
              author="Dr. Sarah Johnson"
              role="Academic Director"
              company="International School of Excellence"
            />
            <Testimonial
              quote="The automated grading system has saved our teachers countless hours. It's a game-changer for us and lets our staff focus more on teaching than administrative tasks."
              author="Michael Chen"
              role="Principal"
              company="Valley High School"
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-violet-600 text-white py-16 md:py-24">
          <motion.div 
            className="container mx-auto px-4 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Institution?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join the growing number of institutions using AcadMeter to enhance their academic management.
            </p>
            <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-xl">
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Institution Name"
                  className="w-full p-3 bg-white/80 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-slate-800 placeholder-slate-500"
                />
                <input
                  type="email"
                  placeholder="Work Email"
                  className="w-full p-3 bg-white/80 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-slate-800 placeholder-slate-500"
                />
                <Button size="lg" className="w-full bg-white text-blue-600 hover:bg-white/90">
                  Request Demo
                </Button>
              </form>
              <p className="mt-4 text-sm text-white/60">
                No credit card required. Free 14-day trial.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold text-white mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
              <p>&copy; 2024 AcadMeter. All rights reserved.</p>
              <div className="mt-4 md:mt-0 flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-white">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
