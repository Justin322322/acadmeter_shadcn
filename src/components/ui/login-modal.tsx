'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog"
import { Button } from "./button"
import { SignupModal } from "./signup-modal"
import { ForgotPasswordModal } from "./forgot-password-modal"
import { motion } from "framer-motion"
import { 
  ArrowRightIcon, 
  EnvelopeIcon, 
  KeyIcon, 
  AcademicCapIcon,
  EyeIcon,
  EyeSlashIcon
} from "@heroicons/react/24/outline"

export function LoginModal({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoadingMessage('Signing in...')
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setLoadingMessage('Login successful! Redirecting...')
      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect based on user type
      const userType = data.user.userType;
      window.location.href = `/${userType}-dashboard`;
      
      onClose();
    } catch (error) {
      console.error('Login error:', error);
      setLoadingMessage('')
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  }

  if (showSignup) {
    return <SignupModal isOpen={true} onClose={() => setShowSignup(false)} />
  }

  if (showForgotPassword) {
    return <ForgotPasswordModal 
      isOpen={true} 
      onClose={() => setShowForgotPassword(false)} 
      onBackToLogin={() => setShowForgotPassword(false)} 
    />
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
              {/* Logo */}
              <div className="flex items-center gap-3 mb-12">
                <AcademicCapIcon className="w-8 h-8 text-white" />
                <span className="text-xl font-semibold text-white">AcadMeter</span>
              </div>

              {/* Content Container */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="space-y-6">
                  {/* Welcome Text */}
                  <div className="space-y-3">
                    <h2 className="text-3xl font-bold text-white leading-tight">
                      Start Your Learning Journey
                    </h2>
                    <p className="text-base text-blue-100/90 leading-relaxed">
                      Access your dashboard to track progress, manage assignments, and connect with your academic community.
                    </p>
                  </div>
                  
                  {/* Feature List */}
                  <div className="space-y-4 pt-4">
                    {['Track your academic progress', 'Access learning resources', 'Connect with teachers'].map((feature, index) => (
                      <motion.div 
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-200 group-hover:bg-white transition-colors duration-200" />
                        <span className="text-base text-blue-100 group-hover:text-white transition-colors duration-200">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Login Form */}
          <div className="relative bg-white dark:bg-slate-950">
            <div className="relative p-8 sm:p-12">
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                  Welcome Back
                </DialogTitle>
                <p className="text-center text-base text-slate-600 dark:text-slate-400 mt-2">
                  Sign in to your account to continue
                </p>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="mt-10 space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Email address
                    </label>
                    <div className="relative">
                      <EnvelopeIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-400 dark:text-slate-500" />
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex h-11 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 pl-10 pr-3 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-slate-950 dark:placeholder:text-slate-500 dark:focus-visible:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Password
                    </label>
                    <div className="relative">
                      <KeyIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-400 dark:text-slate-500" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="flex h-11 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 pl-10 pr-10 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-slate-950 dark:placeholder:text-slate-500 dark:focus-visible:ring-blue-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600 dark:border-slate-600 dark:bg-slate-900 dark:ring-offset-slate-950 dark:checked:bg-blue-500 dark:focus:ring-blue-500 dark:text-blue-500"
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                      Remember me
                    </label>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white dark:from-blue-500 dark:to-violet-500 dark:hover:from-blue-600 dark:hover:to-violet-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      className="flex items-center justify-center gap-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>{loadingMessage}</span>
                    </motion.div>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Sign In
                      <ArrowRightIcon className="h-4 w-4" />
                    </span>
                  )}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-slate-950 text-slate-500 dark:text-slate-400">
                      Don't have an account?
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowSignup(true)}
                  className="w-full h-11 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900"
                >
                  <span className="text-slate-600 dark:text-slate-400">Create an account</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}