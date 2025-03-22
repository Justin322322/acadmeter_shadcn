'use client'

import { useState, ComponentType } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog"
import { Button } from "./button"
import { 
  AcademicCapIcon, 
  UserIcon, 
  EnvelopeIcon, 
  KeyIcon, 
  ArrowLeftIcon, 
  IdentificationIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  EyeIcon,
  EyeSlashIcon
} from "@heroicons/react/24/outline"
import { motion, AnimatePresence } from "framer-motion"

type UserType = 'teacher' | 'student' | undefined

interface FormInputProps {
  icon: ComponentType<{ className?: string }>
  label: string
  type?: string
  error?: string
  showPassword?: boolean
  onTogglePassword?: () => void
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  id: string
  password: string
  confirmPassword: string
}

interface BasicInfoStepProps {
  formData: FormData
  setFormData: (data: FormData) => void
  errors: Record<string, string>
  userType: UserType
}

interface PasswordStepProps {
  formData: FormData
  setFormData: (data: FormData) => void
  errors: Record<string, string>
  showPassword: boolean
  showConfirmPassword: boolean
  setShowPassword: (show: boolean) => void
  setShowConfirmPassword: (show: boolean) => void
}

interface SuccessStepProps {
  userType: UserType
  onClose: () => void
}

interface AccountTypeSelectionProps {
  onSelect: (type: UserType) => void
}

const AccountTypeSelection = ({ onSelect }: AccountTypeSelectionProps) => (
  <div className="mt-10 space-y-6">
    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect('teacher')}
      className="w-full relative group overflow-hidden p-6 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-violet-500/70 dark:hover:border-violet-500/70 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-pink-500/5 dark:from-violet-500/10 dark:to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex items-center gap-5">
        <div className="shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-violet-500/20">
          <AcademicCapIcon className="w-7 h-7" />
        </div>
        <div className="flex-1 text-left">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Teacher Account</h3>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Create classes, manage students, and track progress</p>
        </div>
      </div>
    </motion.button>

    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect('student')}
      className="w-full relative group overflow-hidden p-6 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-blue-500/70 dark:hover:border-blue-500/70 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-violet-500/5 dark:from-blue-500/10 dark:to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex items-center gap-5">
        <div className="shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
          <UserIcon className="w-7 h-7" />
        </div>
        <div className="flex-1 text-left">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Student Account</h3>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Access courses, submit assignments, and view grades</p>
        </div>
      </div>
    </motion.button>
  </div>
)

const FormInput = ({ 
  icon: Icon, 
  label, 
  type = 'text', 
  error, 
  showPassword, 
  onTogglePassword, 
  ...props 
}: FormInputProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-2.5 h-5 w-5 text-slate-400 dark:text-slate-500" />
      <input
        type={type}
        className="flex h-11 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 pl-10 pr-10 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-slate-950 dark:placeholder:text-slate-500 dark:focus-visible:ring-blue-500"
        {...props}
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          {showPassword ? (
            <EyeSlashIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      )}
      {error && (
        <p className="mt-1 text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  </div>
)

const BasicInfoStep = ({ formData, setFormData, errors, userType }: BasicInfoStepProps) => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 gap-4">
      <FormInput
        icon={UserIcon}
        label="First name"
        placeholder="Enter your first name"
        value={formData.firstName}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        error={errors.firstName}
      />
      <FormInput
        icon={UserIcon}
        label="Last name"
        placeholder="Enter your last name"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        error={errors.lastName}
      />
    </div>

    <FormInput
      icon={EnvelopeIcon}
      label="Email address"
      type="email"
      placeholder="Enter your email"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      error={errors.email}
    />

    <FormInput
      icon={IdentificationIcon}
      label={`${userType === 'teacher' ? 'Teacher' : 'Student'} ID`}
      placeholder={`Enter your ${userType === 'teacher' ? 'teacher' : 'student'} ID`}
      value={formData.id}
      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
      error={errors.id}
    />
  </div>
)

const PasswordStep = ({ 
  formData, 
  setFormData, 
  errors, 
  showPassword, 
  showConfirmPassword, 
  setShowPassword, 
  setShowConfirmPassword 
}: PasswordStepProps) => (
  <div className="space-y-6">
    <FormInput
      icon={KeyIcon}
      label="Password"
      type={showPassword ? "text" : "password"}
      placeholder="Create a password"
      value={formData.password}
      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      error={errors.password}
      showPassword={showPassword}
      onTogglePassword={() => setShowPassword(!showPassword)}
    />

    <FormInput
      icon={KeyIcon}
      label="Confirm password"
      type={showConfirmPassword ? "text" : "password"}
      placeholder="Confirm your password"
      value={formData.confirmPassword}
      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
      error={errors.confirmPassword}
      showPassword={showConfirmPassword}
      onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
    />

    <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-4 bg-slate-50/50 dark:bg-slate-900/50">
      <p className="font-medium text-sm text-slate-900 dark:text-white mb-3">
        Password requirements:
      </p>
      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
        <li className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-600" />
          At least 8 characters long
        </li>
        <li className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-600" />
          Contains at least one number
        </li>
        <li className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-600" />
          Contains at least one special character
        </li>
      </ul>
    </div>
  </div>
)

const SuccessStep = ({ userType, onClose }: SuccessStepProps) => (
  <motion.div 
    className="text-center py-8"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.2 }}
  >
    <div className="mx-auto w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 shadow-md shadow-green-500/10">
      <CheckCircleIcon className="w-10 h-10 text-green-600 dark:text-green-400" />
    </div>
    <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
      Account Created Successfully
    </h3>
    <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
      Your {userType} account has been created. You can now sign in to access your dashboard.
    </p>
    <Button
      onClick={onClose}
      className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white dark:from-blue-500 dark:to-violet-500 dark:hover:from-blue-600 dark:hover:to-violet-600"
    >
      Go to Login
    </Button>
  </motion.div>
)

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SignupModal({
  isOpen,
  onClose
}: SignupModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState<UserType>(undefined)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    id: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }
    if (!formData.id.trim()) {
      newErrors.id = `${userType === 'teacher' ? 'Teacher' : 'Student'} ID is required`
    }
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    // Add signup logic here
    setTimeout(() => {
      setIsLoading(false)
      setStep(3)
    }, 1000)
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      setUserType(undefined)
    }
  }

  if (!userType) {
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
                    <h2 className="text-3xl font-bold text-white leading-tight">Start your academic journey</h2>
                    <p className="text-base text-blue-100/90 leading-relaxed">Join our platform to enhance your learning experience and achieve academic excellence.</p>
                    
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
                          <span className="text-base text-blue-100 group-hover:text-white transition-colors duration-200">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Account Type Selection */}
            <div className="relative bg-white dark:bg-slate-950">
              <div className="relative p-8 sm:p-12">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                    Create Account
                  </DialogTitle>
                  <p className="text-center text-base text-slate-600 dark:text-slate-400 mt-2">
                    Choose your account type to get started
                  </p>
                </DialogHeader>
                <AccountTypeSelection onSelect={setUserType} />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
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
            <div className="relative h-full p-10 flex flex-col">
              <div className="flex items-center gap-3 mb-12">
                <AcademicCapIcon className="w-8 h-8 text-white" />
                <span className="text-xl font-semibold text-white">AcadMeter</span>
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h2 className="text-3xl font-bold text-white leading-tight">
                      {step === 1 ? 'Basic Information' : step === 2 ? 'Security Setup' : 'Welcome Aboard!'}
                    </h2>
                    <p className="text-base text-blue-100/90 leading-relaxed">
                      {step === 1 
                        ? 'Tell us a bit about yourself to personalize your experience.' 
                        : step === 2 
                        ? 'Create a secure password to protect your account.' 
                        : 'Your account has been created successfully.'}
                    </p>
                  </div>
                  
                  {step < 3 && (
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
                          <span className="text-base text-blue-100 group-hover:text-white transition-colors duration-200">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  {step < 3 && (
                    <div className="flex gap-3 mt-8">
                      {[1, 2].map((s) => (
                        <div
                          key={s}
                          className={`flex-1 h-1.5 rounded-full ${
                            s <= step ? 'bg-blue-200' : 'bg-blue-800/30'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Form Steps */}
          <div className="relative bg-white dark:bg-slate-950">
            <div className="relative p-8 sm:p-12">
              <DialogHeader>
                {step < 3 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBack}
                    className="absolute left-4 top-4 p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-full"
                  >
                    <ArrowLeftIcon className="h-5 w-5" />
                  </Button>
                )}
                <DialogTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                  {step === 1 ? 'Tell us about yourself' : step === 2 ? 'Create your password' : 'All set!'}
                </DialogTitle>
                {step < 3 && (
                  <p className="text-center text-base text-slate-600 dark:text-slate-400 mt-2">
                    Step {step} of 2
                  </p>
                )}
              </DialogHeader>

              <div className="mt-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); setStep(2); }}>
                      {step === 1 && (
                        <BasicInfoStep 
                          formData={formData}
                          setFormData={setFormData}
                          errors={errors}
                          userType={userType}
                        />
                      )}

                      {step === 2 && (
                        <PasswordStep 
                          formData={formData}
                          setFormData={setFormData}
                          errors={errors}
                          showPassword={showPassword}
                          showConfirmPassword={showConfirmPassword}
                          setShowPassword={setShowPassword}
                          setShowConfirmPassword={setShowConfirmPassword}
                        />
                      )}

                      {step === 3 && (
                        <SuccessStep userType={userType} onClose={onClose} />
                      )}

                      {step < 3 && (
                        <Button
                          type={step === 2 ? 'submit' : 'button'}
                          className="w-full mt-8 h-11 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white dark:from-blue-500 dark:to-violet-500 dark:hover:from-blue-600 dark:hover:to-violet-600"
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
                              {step === 1 ? 'Continue' : 'Create Account'}
                              <ArrowRightIcon className="h-4 w-4" />
                            </span>
                          )}
                        </Button>
                      )}
                    </form>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}