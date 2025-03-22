'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog"
import { Button } from "./button"
import { motion } from "framer-motion"
import { 
  ArrowRightIcon, 
  EnvelopeIcon, 
  AcademicCapIcon,
  CheckCircleIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline"

export function ForgotPasswordModal({
  isOpen,
  onClose,
  onBackToLogin
}: {
  isOpen: boolean
  onClose: () => void
  onBackToLogin: () => void
}) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Add password reset logic here
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1100px] p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Panel - Decorative */}
          <div className="relative hidden md:block bg-gradient-to-br from-blue-600 to-violet-600 dark:from-blue-500 dark:to-violet-500">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>
            <div className="relative h-full flex flex-col p-10">
              <div className="flex items-center gap-3 mb-12">
                <AcademicCapIcon className="w-8 h-8 text-white" />
                <span className="text-xl font-semibold text-white">AcadMeter</span>
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h2 className="text-3xl font-bold text-white leading-tight">
                      Reset Your Password
                    </h2>
                    <p className="text-base text-blue-100/90 leading-relaxed">
                      Don&apos;t worry! It happens. We&apos;ll help you regain access to your account.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="relative bg-white dark:bg-slate-950">
            <div className="relative p-8 sm:p-12">
              <DialogHeader>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onBackToLogin}
                  className="absolute left-4 top-4 p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-full"
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                </Button>
                <DialogTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                  {isSuccess ? 'Check Your Email' : 'Forgot Password'}
                </DialogTitle>
                <p className="text-center text-base text-slate-600 dark:text-slate-400 mt-2">
                  {isSuccess 
                    ? "We&apos;ve sent you instructions to reset your password"
                    : "Enter your email address to receive reset instructions"}
                </p>
              </DialogHeader>

              <div className="mt-10">
                {isSuccess ? (
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="mx-auto w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 shadow-md shadow-green-500/10">
                      <CheckCircleIcon className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                      If an account exists for {email}, you will receive password reset instructions at this email address.
                    </p>
                    <Button
                      onClick={onBackToLogin}
                      className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white dark:from-blue-500 dark:to-violet-500 dark:hover:from-blue-600 dark:hover:to-violet-600"
                    >
                      Return to Login
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Email address
                        </label>
                        <div className="relative">
                          <EnvelopeIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-400 dark:text-slate-500" />
                          <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex h-11 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 pl-10 pr-3 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-slate-950 dark:placeholder:text-slate-500 dark:focus-visible:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-11 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white dark:from-blue-500 dark:to-violet-500 dark:hover:from-blue-600 dark:hover:to-violet-600"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <motion.div
                          className="flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        </motion.div>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Send Reset Instructions
                          <ArrowRightIcon className="h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}