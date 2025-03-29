"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  StarIcon,
  PaperAirplaneIcon,
  DocumentTextIcon,
  XMarkIcon
} from "@heroicons/react/24/outline"

export default function FeedbackPage() {
  const [activeTab, setActiveTab] = useState<'feedback' | 'evaluations'>('feedback')
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  const [submittingEvaluation, setSubmittingEvaluation] = useState<string | null>(null)
  const [evaluationResponses, setEvaluationResponses] = useState<Record<string, Record<string, string>>>({})

  const getGradeColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-500'
    if (score >= 75) return 'text-yellow-600 dark:text-yellow-500'
    return 'text-red-600 dark:text-red-500'
  }

  const getGradeBackgroundColor = (score: number) => {
    if (score >= 80) return 'bg-green-50 dark:bg-green-900/20'
    if (score >= 75) return 'bg-yellow-50 dark:bg-yellow-900/20'
    return 'bg-red-50 dark:bg-red-900/20'
  }

  const feedback = [
    {
      id: "1",
      subject: "Mathematics",
      teacher: user?.name || "Teacher",
      date: "2024-03-20",
      status: "unread",
      grade: 92,
      content: `Great progress on recent calculus assignments! Your problem-solving approach shows strong analytical skills.

Areas of strength:
- Excellent grasp of derivatives
- Clear step-by-step problem solving
- Consistent work quality

Suggestions for improvement:
- Practice more complex integration problems
- Consider participating more in class discussions
- Review fundamental theorem of calculus

Keep up the great work! I'm here if you need any clarification.`,
      replies: []
    },
    {
      id: "2",
      subject: "Physics",
      teacher: "Dr. Martinez",
      date: "2024-03-18",
      status: "read",
      grade: 78,
      content: `Your lab report on wave motion demonstrated good analytical skills.

Strengths:
- Detailed experimental procedure
- Accurate data collection
- Clear graphical representations

Areas for improvement:
- Include more error analysis
- Expand on theoretical background
- Add more relevant citations

Overall, good work. Let's discuss these points in our next class.`,
      replies: []
    }
  ]

  const evaluations = [
    {
      id: "e1",
      subject: "Chemistry",
      teacher: "Ms. Rodriguez",
      dueDate: "2024-03-25",
      status: "pending",
      questions: [
        "How effective were the laboratory demonstrations?",
        "Rate the clarity of lecture explanations",
        "How well did the homework assignments align with class material?",
        "What aspects of the course could be improved?"
      ]
    },
    {
      id: "e2",
      subject: "Literature",
      teacher: "Ms. Wilson",
      dueDate: "2024-03-23",
      status: "completed",
      questions: []
    }
  ]

  const quickReplies = [
    "Thank you for the feedback. I'll work on improving these areas.",
    "Could you provide more specific examples for improvement?",
    "I appreciate your suggestions and will implement them.",
    "When would be a good time to discuss this in person?"
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Feedback & Evaluations</h1>
        <p className="text-slate-500 dark:text-slate-400">View personalized feedback and complete course evaluations</p>
      </div>

      <div className="flex border-b border-slate-200 dark:border-slate-700">
        {['feedback', 'evaluations'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as 'feedback' | 'evaluations')}
            className={`px-4 py-2 text-sm font-medium border-b-2 ${
              activeTab === tab
                ? 'border-slate-900 text-slate-900 dark:border-slate-100 dark:text-slate-100'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {activeTab === 'feedback' ? (
          <>
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Feedback</CardTitle>
                  <CardDescription>Select feedback to view details</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {feedback.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedFeedback(item.id)}
                        className={`w-full px-4 py-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                          selectedFeedback === item.id ? 'bg-slate-50 dark:bg-slate-800/50' : ''
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-slate-900 dark:text-slate-100">
                              {item.subject}
                            </span>
                            <span className={`text-sm font-medium ${getGradeColor(item.grade)}`}>
                              {item.grade}%
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">From {item.teacher}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400 dark:text-slate-500">{item.date}</span>
                            {item.status === 'unread' && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                New
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              {selectedFeedback ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>
                          {feedback.find(f => f.id === selectedFeedback)?.subject} Feedback
                        </CardTitle>
                        <p className="text-sm text-slate-500 mt-1">
                          From {feedback.find(f => f.id === selectedFeedback)?.teacher}
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-full ${
                        getGradeBackgroundColor(feedback.find(f => f.id === selectedFeedback)?.grade || 0)
                      }`}>
                        <span className={`text-sm font-medium ${
                          getGradeColor(feedback.find(f => f.id === selectedFeedback)?.grade || 0)
                        }`}>
                          {feedback.find(f => f.id === selectedFeedback)?.grade}%
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                      {feedback.find(f => f.id === selectedFeedback)?.content.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="my-4">
                          {paragraph.split('\n').map((line, j) => (
                            <span key={j}>
                              {line}
                              {j < paragraph.split('\n').length - 1 && <br />}
                            </span>
                          ))}
                        </p>
                      ))}
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Quick Reply</h4>
                      <div className="flex flex-wrap gap-2">
                        {quickReplies.map((reply, index) => (
                          <button
                            key={index}
                            onClick={() => setReplyText(reply)}
                            className="px-3 py-1 text-sm rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Reply</h4>
                        <span className="text-xs text-slate-500">{replyText.length} characters</span>
                      </div>
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply..."
                        className="w-full h-32 p-3 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                      />
                      <div className="flex justify-end mt-2">
                        <Button className="gap-2">
                          <PaperAirplaneIcon className="w-4 h-4" />
                          Send Reply
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                    <ChatBubbleLeftRightIcon className="w-12 h-12 text-slate-400" />
                    <h3 className="mt-4 text-lg font-medium text-slate-900 dark:text-slate-100">
                      Select Feedback
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">
                      Choose a feedback message from the list to view its contents
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        ) : (
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {evaluations.map((evaluation) => (
                <Card key={evaluation.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{evaluation.subject}</CardTitle>
                        <p className="text-sm text-slate-500 mt-1">Instructor: {evaluation.teacher}</p>
                      </div>
                      <div>
                        {evaluation.status === 'pending' ? (
                          <span className="text-xs px-2 py-1 rounded-full bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-500">
                            Due {evaluation.dueDate}
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-500">
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {evaluation.status === 'pending' ? (
                      <div className="space-y-6">
                        {submittingEvaluation === evaluation.id ? (
                          <>
                            {evaluation.questions.map((question, index) => (
                              <div key={index} className="space-y-2">
                                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{question}</p>
                                <div className="flex items-center gap-2">
                                  {[1, 2, 3, 4, 5].map((rating) => (
                                    <button
                                      key={rating}
                                      onClick={() => {
                                        setEvaluationResponses(prev => ({
                                          ...prev,
                                          [evaluation.id]: {
                                            ...prev[evaluation.id],
                                            [`q${index + 1}`]: rating.toString()
                                          }
                                        }))
                                      }}
                                      className={`p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 ${
                                        evaluationResponses[evaluation.id]?.[`q${index + 1}`] === rating.toString()
                                          ? 'text-blue-600 dark:text-blue-500'
                                          : 'text-slate-400 dark:text-slate-500'
                                      }`}
                                    >
                                      <StarIcon className="w-5 h-5" />
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                            <div className="flex justify-end gap-3">
                              <Button
                                variant="outline"
                                onClick={() => setSubmittingEvaluation(null)}
                                className="gap-2"
                              >
                                <XMarkIcon className="w-4 h-4" />
                                Cancel
                              </Button>
                              <Button
                                onClick={() => {
                                  setSubmittingEvaluation(null)
                                  setEvaluationResponses(prev => ({ ...prev, [evaluation.id]: {} }))
                                }}
                                className="gap-2"
                              >
                                <PaperAirplaneIcon className="w-4 h-4" />
                                Submit Evaluation
                              </Button>
                            </div>
                          </>
                        ) : (
                          <Button
                            className="w-full gap-2"
                            onClick={() => setSubmittingEvaluation(evaluation.id)}
                          >
                            <DocumentTextIcon className="w-4 h-4" />
                            Start Evaluation
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center p-6">
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-500">
                          <CheckCircleIcon className="w-5 h-5" />
                          <span className="text-sm font-medium">Evaluation Submitted</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}