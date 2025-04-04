"use client"

import { motion } from "framer-motion"

// Testimonials data
const testimonials = [
  {
    quote: "AcadMeter has completely transformed how we track student performance. The insights are invaluable and have helped us improve our institution's academic outcomes by 25%.",
    author: "Dr. Coco Martin",
    role: "Academic Director, International School of Excellence",
    initials: "CM",
    gradient: "from-blue-500 to-violet-500"
  },
  {
    quote: "The automated grading system has saved our teachers countless hours. It's a game-changer for us and lets our staff focus more on teaching than administrative tasks.",
    author: "Michael V.",
    role: "Principal, Valley High School",
    initials: "MV",
    gradient: "from-violet-500 to-pink-500"
  }
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-slate-900 dark:via-slate-900/80" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-medium">
            TESTIMONIALS
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
            What Our Users Say
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Hear from educators who have transformed their institutions with AcadMeter.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="group relative"
            >
              <div className={`absolute -inset-4 bg-gradient-to-r ${testimonial.gradient}/10 rounded-2xl blur-xl transition-opacity opacity-0 group-hover:opacity-100`}></div>
              <div className="relative h-full bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
                <svg className={`w-12 h-12 text-${testimonial.gradient.split(' ')[1].split('-')[0]}-500 mb-6`} fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <blockquote className="text-xl text-slate-700 dark:text-slate-300 italic mb-8 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <footer className="mt-auto">
                  <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white text-base sm:text-lg font-semibold`}>
                      {testimonial.initials}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{testimonial.author}</div>
                      <div className="text-slate-600 dark:text-slate-400">{testimonial.role}</div>
                    </div>
                  </div>
                </footer>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
