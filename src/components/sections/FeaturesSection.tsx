"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { ArrowRightIcon, CheckCircleIcon, AdjustmentsHorizontalIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline"
import { TypeAnimation } from "react-type-animation"

// Feature card data type
type Feature = {
  icon: React.ElementType
  title: string
  subtitle: string
  description: string
  gradient: string
  hoverColor: string
  stats: { label: string; value: string }[]
  bulletPoints: string[]
  animationKey: string
}

// Animation components for each feature
const FeatureAnimations = {
  // Automatic grade calculation animation
  gradeCalculation: function GradeCalculationAnimation() {
    const [step, setStep] = useState(0);
    const [grades, setGrades] = useState<{name: string, score: number, grade: string}[]>([
      { name: 'Juan D.', score: 0, grade: '' },
      { name: 'Maria S.', score: 0, grade: '' },
      { name: 'Angelo R.', score: 0, grade: '' }
    ]);

    useEffect(() => {
      const steps = [
        // Step 1: Show raw scores
        () => setGrades([
          { name: 'Juan D.', score: 78, grade: '' },
          { name: 'Maria S.', score: 92, grade: '' },
          { name: 'Angelo R.', score: 85, grade: '' }
        ]),
        // Step 2: Calculate grades
        () => setGrades([
          { name: 'Juan D.', score: 78, grade: 'C+' },
          { name: 'Maria S.', score: 92, grade: 'A+' },
          { name: 'Angelo R.', score: 85, grade: 'B+' }
        ]),
        // Step 3: Apply curve
        () => setGrades([
          { name: 'Juan D.', score: 81, grade: 'B-' },
          { name: 'Maria S.', score: 95, grade: 'A' },
          { name: 'Angelo R.', score: 88, grade: 'B+' }
        ])
      ];

      const interval = setInterval(() => {
        setStep(prev => (prev + 1) % steps.length);
      }, 2000);

      // Run the current step
      steps[step]();

      return () => clearInterval(interval);
    }, [step]);

    return (
      <div className="w-full bg-slate-100 dark:bg-slate-800/50 rounded-lg overflow-hidden mt-2 mb-4 p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
            <TypeAnimation
              sequence={[
                'Importing raw scores...',
                1500,
                'Calculating letter grades...',
                1500,
                'Applying grade curve...',
                1500,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
            Automatic
          </span>
        </div>

        {/* Grade table */}
        <div className="w-full border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
          <div className="grid grid-cols-3 text-xs font-medium bg-slate-200 dark:bg-slate-700 border-b border-slate-300 dark:border-slate-600">
            <div className="p-1.5 pl-2">Student</div>
            <div className="p-1.5 text-center">Score</div>
            <div className="p-1.5 text-center">Grade</div>
          </div>

          {grades.map((student, i) => (
            <motion.div
              key={i}
              className="grid grid-cols-3 text-xs border-b border-slate-200 dark:border-slate-700 last:border-0 bg-white dark:bg-white/95"
              initial={{ backgroundColor: "rgb(255, 255, 255)" }}
              animate={{
                backgroundColor: step === 2 && student.name === 'Juan D.' ? "rgb(219, 234, 254)" : "rgb(255, 255, 255)"
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-1.5 pl-2 font-medium text-slate-900 dark:text-slate-900">{student.name}</div>
              <motion.div
                className="p-1.5 text-center text-slate-900 dark:text-slate-900"
                key={`score-${student.score}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {student.score > 0 ? student.score : '—'}
              </motion.div>
              <motion.div
                className={`p-1.5 text-center ${student.grade.startsWith('A') ? 'text-green-600 dark:text-green-400' :
                  student.grade.startsWith('B') ? 'text-blue-600 dark:text-blue-400' :
                  'text-yellow-600 dark:text-yellow-400'}`}
                key={`grade-${student.grade}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {student.grade || '—'}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  },

  // Customizable grading scales animation
  gradingScales: function GradingScalesAnimation() {
    const [activeScale, setActiveScale] = useState(0);
    const scales = [
      { name: 'Standard', ranges: [{min: 0, max: 59, grade: 'F'}, {min: 60, max: 69, grade: 'D'}, {min: 70, max: 79, grade: 'C'}, {min: 80, max: 89, grade: 'B'}, {min: 90, max: 100, grade: 'A'}] },
      { name: 'Custom', ranges: [{min: 0, max: 64, grade: 'F'}, {min: 65, max: 74, grade: 'D'}, {min: 75, max: 84, grade: 'C'}, {min: 85, max: 92, grade: 'B'}, {min: 93, max: 100, grade: 'A'}] },
      { name: 'Curved', ranges: [{min: 0, max: 54, grade: 'F'}, {min: 55, max: 64, grade: 'D'}, {min: 65, max: 74, grade: 'C'}, {min: 75, max: 84, grade: 'B'}, {min: 85, max: 100, grade: 'A'}] }
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setActiveScale(prev => (prev + 1) % scales.length);
      }, 2500);

      return () => clearInterval(interval);
    }, []);

    const currentScale = scales[activeScale];

    return (
      <div className="w-full bg-slate-50 dark:bg-slate-800/30 rounded-lg p-3 mt-2 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <AdjustmentsHorizontalIcon className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 mr-1.5" />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Grading Scale: </span>
            <motion.span
              key={currentScale.name}
              className="text-xs font-medium text-blue-600 dark:text-blue-400 ml-1"
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentScale.name}
            </motion.span>
          </div>
          <span className="text-xs bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 px-2 py-0.5 rounded-full">
            Customizable
          </span>
        </div>

        {/* Grade scale visualization */}
        <div className="flex h-6 w-full rounded-md overflow-hidden mb-2">
          {currentScale.ranges.map((range, i) => {
            const width = ((range.max - range.min + 1) / 100) * 100;
            const colors = [
              'bg-red-400 dark:bg-red-600',
              'bg-orange-400 dark:bg-orange-600',
              'bg-yellow-400 dark:bg-yellow-600',
              'bg-blue-400 dark:bg-blue-600',
              'bg-green-400 dark:bg-green-600'
            ];

            return (
              <motion.div
                key={`${activeScale}-${i}`}
                className={`h-full flex items-center justify-center ${colors[i]}`}
                style={{ width: `${width}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${width}%` }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-xs font-medium text-white">{range.grade}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Grade boundaries */}
        <div className="grid grid-cols-5 gap-1 text-center">
          {currentScale.ranges.map((range, i) => (
            <div key={i} className="text-[10px] text-slate-600 dark:text-slate-400">
              {range.min}-{range.max}%
            </div>
          ))}
        </div>
      </div>
    );
  },

  // Batch processing animation
  batchProcessing: function BatchProcessingAnimation() {
    const [step, setStep] = useState(0);
    const [files, setFiles] = useState([
      { name: 'Class 101', status: 'pending', items: 24, atRisk: 0 },
      { name: 'Class 202', status: 'pending', items: 18, atRisk: 0 },
      { name: 'Class 303', status: 'pending', items: 21, atRisk: 0 }
    ]);

    useEffect(() => {
      const steps = [
        // Step 1: First file processing
        () => setFiles([
          { name: 'Class 101', status: 'processing', items: 24, atRisk: 0 },
          { name: 'Class 202', status: 'pending', items: 18, atRisk: 0 },
          { name: 'Class 303', status: 'pending', items: 21, atRisk: 0 }
        ]),
        // Step 2: First file complete with risk analysis
        () => setFiles([
          { name: 'Class 101', status: 'complete', items: 24, atRisk: 5 },
          { name: 'Class 202', status: 'processing', items: 18, atRisk: 0 },
          { name: 'Class 303', status: 'pending', items: 21, atRisk: 0 }
        ]),
        // Step 3: Second file complete with risk analysis
        () => setFiles([
          { name: 'Class 101', status: 'complete', items: 24, atRisk: 5 },
          { name: 'Class 202', status: 'complete', items: 18, atRisk: 3 },
          { name: 'Class 303', status: 'processing', items: 21, atRisk: 0 }
        ]),
        // Step 4: All complete with risk analysis
        () => setFiles([
          { name: 'Class 101', status: 'complete', items: 24, atRisk: 5 },
          { name: 'Class 202', status: 'complete', items: 18, atRisk: 3 },
          { name: 'Class 303', status: 'complete', items: 21, atRisk: 4 }
        ])
      ];

      const interval = setInterval(() => {
        setStep(prev => (prev + 1) % steps.length);
      }, 2000);

      // Run the current step
      steps[step]();

      return () => clearInterval(interval);
    }, [step]);

    const totalItems = files.reduce((sum, file) => sum + file.items, 0);
    const completedItems = files
      .filter(file => file.status === 'complete')
      .reduce((sum, file) => sum + file.items, 0);
    const processingItems = files
      .filter(file => file.status === 'processing')
      .reduce((sum, file) => sum + file.items, 0) / 2;

    const progress = ((completedItems + processingItems) / totalItems) * 100;
    const totalAtRisk = files.reduce((sum, file) => sum + file.atRisk, 0);

    return (
      <div className="w-full bg-slate-50 dark:bg-slate-800/30 rounded-lg p-3 mt-2 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <DocumentDuplicateIcon className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 mr-1.5" />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Batch Processing</span>
          </div>
          <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full">
            {Math.round(progress)}% Complete
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
          <motion.div
            className="h-full bg-emerald-500 dark:bg-emerald-600"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Files list */}
        <div className="space-y-1.5">
          {files.map((file, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <motion.div
                  className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                    file.status === 'complete' ? 'bg-emerald-500 dark:bg-emerald-400' :
                    file.status === 'processing' ? 'bg-blue-500 dark:bg-blue-400' : 
                    'bg-slate-300 dark:bg-slate-600'
                  }`}
                  animate={{
                    scale: file.status === 'processing' ? [1, 1.5, 1] : 1,
                  }}
                  transition={{
                    repeat: file.status === 'processing' ? Infinity : 0,
                    duration: 1
                  }}
                />
                <span className="font-medium text-slate-700 dark:text-slate-300">{file.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-500 dark:text-slate-400">
                  {file.status === 'complete' ? 'Processed' :
                   file.status === 'processing' ? 'Processing...' : 'Queued'}
                  ({file.items} items)
                </span>
                {file.status === 'complete' && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-500 dark:text-red-400 font-medium"
                  >
                    {file.atRisk} at risk
                  </motion.span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Total at risk summary */}
        {totalAtRisk > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700 dark:text-slate-300">Total Students at Risk:</span>
              <span className="font-bold text-red-500 dark:text-red-400">{totalAtRisk} students</span>
            </div>
          </motion.div>
        )}
      </div>
    );
  }
}

export function FeaturesSection() {
  const [flippedCards, setFlippedCards] = useState<number[]>([])

  // Handle card flip
  const toggleCardFlip = (index: number) => {
    setFlippedCards(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index)
      } else {
        return [...prev, index]
      }
    })
  }

  // Features data
  const features: Feature[] = [
    {
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
        </svg>
      ),
      title: "Automated Grade Management",
      subtitle: "Streamline your grading process with intelligent automation",
      description: "Eliminate manual errors and save time with our automated grade processing system that handles large volumes of student data efficiently.",
      gradient: "from-blue-500 to-violet-500",
      hoverColor: "blue",
      stats: [
        { label: "Time Saved", value: "85%" },
        { label: "Error Reduction", value: "95%" }
      ],
      bulletPoints: [
        "Automatic grade calculation",
        "Customizable grading scales",
        "Batch processing capabilities"
      ],
      animationKey: "gradeCalculation"
    },
    {
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
        </svg>
      ),
      title: "Real-time Analytics",
      subtitle: "Make data-driven decisions with instant insights",
      description: "Access comprehensive analytics dashboards that provide real-time performance metrics and identify areas for improvement.",
      gradient: "from-violet-500 to-pink-500",
      hoverColor: "violet",
      stats: [
        { label: "Data Points", value: "50+" },
        { label: "Update Frequency", value: "Real-time" }
      ],
      bulletPoints: [
        "Interactive data visualizations",
        "Customizable reporting",
        "Trend analysis tools"
      ],
      animationKey: "gradingScales"
    },
    {
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      ),
      title: "Early Intervention System",
      subtitle: "Proactive support for student success",
      description: "Identify at-risk students early with our predictive analytics and intervention recommendation system.",
      gradient: "from-emerald-500 to-teal-500",
      hoverColor: "emerald",
      stats: [
        { label: "Success Rate", value: "78%" },
        { label: "Early Detection", value: "3 weeks" }
      ],
      bulletPoints: [
        "Predictive risk assessment",
        "Automated intervention triggers",
        "Progress tracking tools"
      ],
      animationKey: "batchProcessing"
    }
  ]

  return (
    <section id="features" className="relative py-24 sm:py-32 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-950 dark:to-slate-900 overflow-hidden scroll-mt-20">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white dark:via-slate-900/80 dark:to-slate-900" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-medium tracking-wide">
            POWERFUL FEATURES
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-blue-300 dark:to-white">Everything You Need to Excel</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Transform your academic institution with our comprehensive suite of tools and analytics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              isFlipped={flippedCards.includes(index)}
              onFlip={() => toggleCardFlip(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

type FeatureCardProps = {
  feature: Feature
  index: number
  isFlipped: boolean
  onFlip: () => void
}

function FeatureCard({ feature, index, isFlipped, onFlip }: FeatureCardProps) {
  const AnimationComponent = FeatureAnimations[feature.animationKey as keyof typeof FeatureAnimations];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="h-full min-h-[450px] md:min-h-[450px]" // Reduced height from 600px/650px to 480px/520px
    >
      <div className="relative h-full w-full perspective-1000">
        <motion.div
          className="h-full w-full transition-all duration-500 preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front of card */}
          <div 
            className="absolute inset-0 h-full w-full backface-hidden bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-y-auto group"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex flex-col h-full p-4 sm:p-6">
              {/* Title */}
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>

              {/* Subtitle */}
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1.5 mb-2">
                {feature.subtitle}
              </p>

              {/* Feature Animation */}
              <AnimatePresence mode="wait">
                {!isFlipped && <AnimationComponent />}
              </AnimatePresence>

              {/* Bullet Points */}
              <div className="space-y-2 mb-4">
                {feature.bulletPoints.map((point, i) => (
                  <div key={i} className="flex items-start">
                    <CheckCircleIcon className="w-4 h-4 text-blue-500 dark:text-blue-400 mr-1.5 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">{point}</span>
                  </div>
                ))}
              </div>

              {/* Learn More */}
              <div className="mt-auto pt-2">
                <button
                  onClick={onFlip}
                  className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group-hover:underline transition-all"
                >
                  Learn more <ArrowRightIcon className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Back of card */}
          <div 
            className="absolute inset-0 h-full w-full backface-hidden bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-y-auto"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="flex flex-col h-full p-4 sm:p-6">
              {/* Back Title */}
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
                {feature.title}
              </h3>

              {/* How It Works */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center">
                  <span className="inline-block w-6 h-0.5 bg-blue-500 dark:bg-blue-400 mr-2"></span>
                  How It Works
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {feature.stats.map((stat, i) => (
                  <div key={i} className="bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg">
                    <div className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Benefits */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center">
                  <span className="inline-block w-6 h-0.5 bg-blue-500 dark:bg-blue-400 mr-2"></span>
                  Key Benefits
                </h4>
                <div className="space-y-2">
                  {feature.bulletPoints.map((point, i) => (
                    <div key={i} className="flex items-start">
                      <CheckCircleIcon className="w-4 h-4 text-blue-500 dark:text-blue-400 mr-1.5 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back button */}
              <div className="mt-auto pt-2">
                <button
                  onClick={onFlip}
                  className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-all"
                >
                  Back to overview
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
