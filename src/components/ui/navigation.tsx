"use client"

import { useState } from "react"
import { Button } from "./button"
import { ThemeToggle } from "./theme-toggle"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md fixed w-full z-50 top-0 left-0 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-slate-800 dark:text-white">AcadMeter</span>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#features" className="text-slate-600 hover:text-slate-800 dark:text-slate-200 dark:hover:text-white transition-colors px-3 py-2">Features</a>
            <a href="#benefits" className="text-slate-600 hover:text-slate-800 dark:text-slate-200 dark:hover:text-white transition-colors px-3 py-2">Benefits</a>
            <a href="#testimonials" className="text-slate-600 hover:text-slate-800 dark:text-slate-200 dark:hover:text-white transition-colors px-3 py-2">Testimonials</a>
            <ThemeToggle />
            <Button variant="outline" className="ml-2">Sign In</Button>
            <Button>Get Started</Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 transition-all ease-in-out duration-300 border-t border-slate-200 dark:border-slate-700">
            <a 
              href="#features" 
              onClick={toggleMenu} 
              className="block px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
            >
              Features
            </a>
            <a 
              href="#benefits" 
              onClick={toggleMenu} 
              className="block px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
            >
              Benefits
            </a>
            <a 
              href="#testimonials" 
              onClick={toggleMenu} 
              className="block px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
            >
              Testimonials
            </a>
            <div className="flex flex-col space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
              <Button variant="outline" onClick={toggleMenu} className="w-full">Sign In</Button>
              <Button onClick={toggleMenu} className="w-full">Get Started</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}