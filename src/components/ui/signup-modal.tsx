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

const FormInput = ({
  icon: Icon,
  label,
  type = "text",
  error,
  showPassword,
  onTogglePassword,
  value,
  onChange,
  placeholder
}: FormInputProps) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-2.5 h-5 w-5 text-slate-400 dark:text-slate-500" />
      <input
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex h-11 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 pl-10 pr-3 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-slate-950 dark:placeholder:text-slate-500 dark:focus-visible:ring-blue-500"
      />
      {type === "password" && onTogglePassword && (
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
    </div>
    {error && (
      <p className="text-sm text-red-500">{error}</p>
    )}
  </div>
)

const AccountTypeSelection = ({ onSelect }: AccountTypeSelectionProps) => (
  <div className="mt-10 space-y-6">
    <motion.button
      whileHover={{ y: -4 }}
      onClick={() => onSelect('teacher')}
      className="w-full p-6 text-left rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/50">
          <AcademicCapIcon className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">Teacher Account</h3>
          <p className="text-sm text-slate-500">Create a teacher account to manage classes and track student progress</p>
        </div>
      </div>
    </motion.button>

    <motion.button
      whileHover={{ y: -4 }}
      onClick={() => onSelect('student')}
      className="w-full p-6 text-left rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-violet-500 dark:hover:border-violet-500 transition-all duration-200"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-violet-50 dark:bg-violet-950/50">
          <UserIcon className="w-6 h-6 text-violet-500" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">Student Account</h3>
          <p className="text-sm text-slate-500">Create a student account to access your courses and track your progress</p>
        </div>
      </div>
    </motion.button>
  </div>
)

const BasicInfoStep = ({ formData, setFormData, errors, userType }: BasicInfoStepProps) => (
  <div className="space-y-6">
    <div className="grid gap-4 sm:grid-cols-2">
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
      type="password"
      placeholder="Create a password"
      value={formData.password}
      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      error={errors.password}
      showPassword={showPassword}
      onTogglePassword={() => setShowPassword(!showPassword)}
    />

    <FormInput
      icon={KeyIcon}
      label="Confirm Password"
      type="password"
      placeholder="Confirm your password"
      value={formData.confirmPassword}
      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
      error={errors.confirmPassword}
      showPassword={showConfirmPassword}
      onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
    />

    <div className="mt-2 space-y-2">
      <p className="text-sm text-slate-500">Password must:</p>
      <ul className="space-y-1">
        <li className="text-sm text-slate-500 flex items-center gap-2">
          <CheckCircleIcon className={`h-4 w-4 ${formData.password.length >= 8 ? 'text-green-500' : 'text-slate-400'}`} />
          Be at least 8 characters long
        </li>
        <li className="text-sm text-slate-500 flex items-center gap-2">
          <CheckCircleIcon className={`h-4 w-4 ${/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-slate-400'}`} />
          Include at least one uppercase letter
        </li>
        <li className="text-sm text-slate-500 flex items-center gap-2">
          <CheckCircleIcon className={`h-4 w-4 ${/[0-9]/.test(formData.password) ? 'text-green-500' : 'text-slate-400'}`} />
          Include at least one number
        </li>
      </ul>
    </div>
  </div>
)

const SuccessStep = ({ userType, onClose }: SuccessStepProps) => (
  <motion.div 
    className="text-center space-y-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
      <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
    </div>
    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
      Account Created Successfully
    </h3>
    <p className="text-slate-500 dark:text-slate-400">
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

  const validateBasicInfo = () => {
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

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePassword = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.password) newErrors.password = 'Password is required'
    else {
      if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
      if (!/[A-Z]/.test(formData.password)) newErrors.password = 'Password must include an uppercase letter'
      if (!/[0-9]/.test(formData.password)) newErrors.password = 'Password must include a number'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step === 1) {
      if (validateBasicInfo()) {
        setStep(2)
      }
    } else if (step === 2) {
      if (validatePassword()) {
        handleFinalSubmit()
      }
    }
  }

  const handleFinalSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          userType,
          id: formData.id
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setStep(3);
    } catch (error) {
      console.error('Signup error:', error);
      setErrors(prev => ({
        ...prev,
        submit: error instanceof Error ? error.message : 'Registration failed'
      }));
    } finally {
      setIsLoading(false);
    }
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
              <div className="relative h-full p-10">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-12">
                  <AcademicCapIcon className="w-8 h-8 text-white" />
                  <span className="text-xl font-semibold text-white">AcadMeter</span>
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-white leading-tight">Join AcadMeter Today</h2>
                    <p className="text-base text-blue-100/90 leading-relaxed">Choose your account type to get started with your educational journey.</p>
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
                    <form onSubmit={handleStepSubmit}>
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
                          type="submit"
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

                      {errors.submit && (
                        <p className="mt-4 text-sm text-red-500 text-center">{errors.submit}</p>
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