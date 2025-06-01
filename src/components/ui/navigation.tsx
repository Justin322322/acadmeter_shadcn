"use client"

import { useState } from "react"
import { Button } from "./button"
import { ThemeToggle } from "./theme-toggle"
import { LoginModal } from "./login-modal"
import { SignupModal } from "./signup-modal"
import { Bars3Icon, XMarkIcon, AcademicCapIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const handleOpenLogin = () => setShowLoginModal(true)
  const handleCloseLogin = () => setShowLoginModal(false)
  const handleOpenSignup = () => {
    setShowSignupModal(true)
    setIsMenuOpen(false)
  }
  const handleCloseSignup = () => setShowSignupModal(false)
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white">
                <AcademicCapIcon className="w-5 h-5" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 text-transparent bg-clip-text">
                AcadMeter
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3 lg:gap-5">
            <div className="flex items-center gap-1 lg:gap-2">
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors px-2.5 lg:px-3 py-1.5 rounded-full text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('benefits')} 
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors px-2.5 lg:px-3 py-1.5 rounded-full text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                Benefits
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors px-2.5 lg:px-3 py-1.5 rounded-full text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                Testimonials
              </button>
            </div>
            <div className="flex items-center gap-3 pl-3 lg:pl-5 border-l border-slate-200 dark:border-slate-700">
              <ThemeToggle />
              <Button 
                variant="outline" 
                size="sm" 
                className="px-3 lg:px-4 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800" 
                onClick={handleOpenLogin}
              >
                Sign In
              </Button>
              <Button 
                size="sm" 
                className="px-3 lg:px-4 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 dark:from-blue-500 dark:to-violet-500 text-white"
                onClick={handleOpenSignup}
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="p-1.5"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-[400px] opacity-100 pb-4' 
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-3 space-y-1 border-t border-slate-200 dark:border-slate-700">
            <button 
              onClick={() => scrollToSection('features')}
              className="w-full text-left px-4 py-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg text-sm font-medium"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('benefits')}
              className="w-full text-left px-4 py-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg text-sm font-medium"
            >
              Benefits
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="w-full text-left px-4 py-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg text-sm font-medium"
            >
              Testimonials
            </button>
            <div className="flex flex-col gap-2 pt-2 mt-2 border-t border-slate-200 dark:border-slate-700">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleOpenLogin} 
                className="w-full justify-center py-2.5 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Sign In
              </Button>
              <Button 
                size="sm"
                onClick={handleOpenSignup}
                className="w-full justify-center py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 dark:from-blue-500 dark:to-violet-500 text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
      <LoginModal isOpen={showLoginModal} onClose={handleCloseLogin} />
      <SignupModal isOpen={showSignupModal} onClose={handleCloseSignup} />
    </nav>
  )
}