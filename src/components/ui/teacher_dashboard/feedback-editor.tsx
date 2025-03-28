/**
 * Feedback Editor Component
 * Rich text editor for teachers to provide detailed feedback to students
 * 
 * Features:
 * - Rich text formatting options
 * - Template-based feedback snippets
 * - File attachment support
 * - Auto-save functionality
 * - Preview mode
 * - Student performance context display
 * - Rubric integration
 * 
 * Props:
 * @param {Object} props - Component properties
 * @param {string} props.studentId - ID of the student receiving feedback
 * @param {string} props.assignmentId - ID of the assignment being reviewed
 * @param {Function} props.onSave - Callback when feedback is saved
 * @param {Object} [props.initialFeedback] - Pre-existing feedback to edit
 */
"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  SparklesIcon,
  XMarkIcon,
  CheckIcon,
  PaperAirplaneIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline"

interface FeedbackEditorProps {
  studentName?: string;
  initialFeedback?: string;
  initialValue?: string;
  onSave?: (feedback: string) => void;
  onClose?: () => void;
  suggestions?: boolean;
  onChange?: (value: string) => void;
}

export function FeedbackEditor({
  studentName,
  initialFeedback = "",
  initialValue = "",
  onSave,
  onClose,
  suggestions = true,
  onChange,
}: FeedbackEditorProps) {
  const [feedback, setFeedback] = useState(initialFeedback || initialValue)
  const [hasSaved, setHasSaved] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const maxChars = 2000

  useEffect(() => {
    setCharCount(feedback.length)
  }, [feedback])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setFeedback(value)
    onChange?.(value)
    setCharCount(value.length)
  }

  const handleSave = () => {
    if (feedback.trim()) {
      onSave?.(feedback)
      setHasSaved(true)
      setTimeout(() => setHasSaved(false), 2000)
    }
  }

  const feedbackTemplates = [
    {
      title: "Progress Recognition",
      text: `${studentName ? studentName + " has" : "You have"} shown significant improvement in understanding key concepts. Keep up the great work!`
    },
    {
      title: "Areas for Improvement",
      text: "While progress has been made, there are some areas that need attention. Let's focus on:"
    },
    {
      title: "Study Recommendations",
      text: "To further improve your understanding, I recommend:\n\n1. Regular practice of problem-solving\n2. Active participation in class discussions\n3. Reviewing feedback on previous assignments"
    }
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {suggestions && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setShowSuggestions(!showSuggestions)}
              aria-label="Toggle feedback suggestions"
            >
              <SparklesIcon className="w-4 h-4 text-indigo-500" />
              <span>Suggestions</span>
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs ${
            charCount > maxChars ? 'text-red-500' : 'text-slate-500'
          }`}>
            {charCount}/{maxChars} characters
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="gap-2"
            aria-label="Cancel editing"
          >
            <XMarkIcon className="w-4 h-4" />
            <span>Cancel</span>
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            className="gap-2"
            disabled={!feedback.trim() || charCount > maxChars}
            aria-label="Save feedback"
          >
            {hasSaved ? (
              <>
                <CheckIcon className="w-4 h-4" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <PaperAirplaneIcon className="w-4 h-4" />
                <span>Save</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="relative">
        <textarea
          value={feedback}
          onChange={handleChange}
          placeholder="Enter your feedback here..."
          className={`w-full h-64 rounded-lg border bg-white dark:bg-slate-900 px-4 py-3 text-sm outline-none transition-colors ${
            charCount > maxChars
              ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500'
              : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
          }`}
          aria-label="Feedback text editor"
        />
        {charCount > maxChars && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 text-xs text-red-500">
            <ExclamationTriangleIcon className="w-4 h-4" />
            <span>Character limit exceeded</span>
          </div>
        )}
      </div>

      {showSuggestions && (
        <div className="mt-4 space-y-3 rounded-lg border border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/50">
          <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">
            Feedback Templates
          </h3>
          <div className="grid gap-3">
            {feedbackTemplates.map((template, index) => (
              <button
                key={index}
                onClick={() => {
                  setFeedback(current => current + (current ? '\n\n' : '') + template.text)
                  onChange?.(feedback + (feedback ? '\n\n' : '') + template.text)
                }}
                className="text-left p-3 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors"
              >
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
                  {template.title}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {template.text.length > 100 
                    ? template.text.slice(0, 100) + '...' 
                    : template.text}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export type { FeedbackEditorProps }

const feedbackSuggestions = [
  {
    category: "Improvement Areas",
    templates: [
      "Consider focusing more on {topic} to improve your understanding.",
      "Try dedicating additional practice time to {skill}.",
      "Review the concepts covered in {topic} for better comprehension."
    ]
  },
  {
    category: "Positive Reinforcement",
    templates: [
      "Excellent work on {topic}! Your understanding shows great progress.",
      "Your dedication to {skill} is reflected in your improved performance.",
      "Keep up the great work, especially in {topic}."
    ]
  },
  {
    category: "Action Items",
    templates: [
      "Please complete the following practice exercises: {exercises}",
      "Schedule a consultation to discuss {topic} in more detail.",
      "Review the study materials for {topic} before next class."
    ]
  }
]