"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  SparklesIcon,
  PlusIcon,
  XMarkIcon,
  CheckIcon
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
  studentName = "",
  initialFeedback = "",
  onSave,
  onClose,
  suggestions = true
}: FeedbackEditorProps) {
  const [feedback, setFeedback] = useState(initialFeedback)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("")

  const handleTemplateFill = (template: string) => {
    setSelectedTemplate(template)
    setShowSuggestions(false)
  }

  const handleSave = () => {
    if (onSave) {
      onSave(feedback)
    }
  }

  return (
    <div className="space-y-4">
      {studentName && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Feedback for {studentName}
          </h3>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full"
            >
              <XMarkIcon className="w-5 h-5" />
            </Button>
          )}
        </div>
      )}

      <div className="relative">
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full min-h-[200px] p-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          placeholder="Enter your feedback here..."
        />
        
        {suggestions && (
          <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="gap-1"
            >
              <SparklesIcon className="w-4 h-4" />
              <span className="text-sm">Suggestions</span>
            </Button>
          </div>
        )}
      </div>

      {showSuggestions && (
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 border-b border-slate-200 dark:border-slate-700">
            <h4 className="font-medium text-slate-900 dark:text-white">Feedback Templates</h4>
          </div>
          <div className="p-3 max-h-[300px] overflow-y-auto">
            <div className="space-y-4">
              {feedbackSuggestions.map((category) => (
                <div key={category.category}>
                  <h5 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                    {category.category}
                  </h5>
                  <div className="space-y-2">
                    {category.templates.map((template, index) => (
                      <div
                        key={index}
                        className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-sm text-slate-600 dark:text-slate-300"
                        onClick={() => handleTemplateFill(template)}
                      >
                        {template}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTemplate && (
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-sm text-blue-900 dark:text-blue-100">
          <div className="flex items-start gap-2">
            <div className="p-1 rounded-full bg-blue-100 dark:bg-blue-900/50">
              <SparklesIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="font-medium mb-1">Suggestion</p>
              <p>{selectedTemplate}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="shrink-0"
              onClick={() => {
                setFeedback(feedback ? `${feedback}\n${selectedTemplate}` : selectedTemplate)
                setSelectedTemplate("")
              }}
            >
              <PlusIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3">
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        )}
        <Button onClick={handleSave} className="gap-2">
          <CheckIcon className="w-4 h-4" />
          Save Feedback
        </Button>
      </div>
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