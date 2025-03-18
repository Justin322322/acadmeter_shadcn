"use client"

import { motion } from "framer-motion"
import { UserIcon } from "@heroicons/react/24/solid"
import Image from 'next/image'

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  imgUrl?: string;
}

export function Testimonial({ quote, author, role, company, imgUrl }: TestimonialProps) {
  return (
    <motion.div 
      className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-slate-200 dark:border-slate-700"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative">
        <svg
          className="absolute left-0 -top-2 h-8 w-8 text-slate-300 dark:text-slate-600"
          fill="currentColor"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        <p className="relative pl-10 text-slate-600 dark:text-slate-300">{quote}</p>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <div className="flex-shrink-0">
          {imgUrl ? (
            <Image 
              src={imgUrl} 
              alt={author} 
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <UserIcon className="h-6 w-6 text-white" />
            </div>
          )}
        </div>
        <div>
          <p className="font-semibold text-slate-800 dark:text-white">{author}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">{role}, {company}</p>
        </div>
      </div>
    </motion.div>
  );
}