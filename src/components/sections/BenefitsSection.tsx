"use client"

import { motion } from "framer-motion"
import { CheckCircleIcon } from "@heroicons/react/24/outline"

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

// Benefits data
const benefits = [
  {
    title: "For Administrators",
    description: "Comprehensive tools for institutional management and oversight",
    points: [
      "Centralized data management",
      "Automated reporting systems",
      "Resource optimization",
      "Enhanced decision-making capabilities"
    ],
    gradient: "from-blue-500 to-violet-500",
    bgIcon: "M12 21V12m0 9l-4-4m4 4l4-4M12 12a3 3 0 100-6 3 3 0 000 6zm9 3c0 4.97-4.03 9-9 9s-9-4.03-9-9m18 0c0-4.97-4.03-9-9-9s-9 4.03-9 9m18 0H3"
  }, 
  {
    title: "For Teachers",
    description: "Streamlined tools for effective classroom management",
    points: [
      "Simplified grade entry and management",
      "Performance tracking tools",
      "Customizable assessment templates",
      "Student progress monitoring"
    ],
    gradient: "from-violet-500 to-pink-500",
    bgIcon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
  }
]

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-24 sm:py-32 bg-white dark:bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800/20 mask-gradient"></div>

      <motion.div
        className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div
          variants={fadeIn}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 text-sm font-medium">
            TAILORED SOLUTIONS
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-200">
            Benefits For Everyone
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Our platform is designed to meet the needs of different users across your institution.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 xl:gap-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="group relative"
            >
              <div className={`absolute -inset-4 bg-gradient-to-r ${benefit.gradient}/10 rounded-2xl blur-xl transition-opacity opacity-0 group-hover:opacity-100`}></div>
              <div className="relative h-full bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
                {/* Background Icon */}
                <div className="absolute bottom-0 right-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none transform translate-x-1/4 translate-y-1/4">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-64 h-64 text-slate-900 dark:text-white"
                    strokeWidth="1"
                  >
                    <path d={benefit.bgIcon} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{benefit.title}</h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">{benefit.description}</p>
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {benefit.points.map((point, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + index * 0.2 }}
                    >
                      <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                        <CheckCircleIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{point}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
