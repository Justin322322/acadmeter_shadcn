"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  StarIcon,
  PaperAirplaneIcon,
  DocumentTextIcon,
  XMarkIcon,
  UserIcon
} from "@heroicons/react/24/outline"

export default function FeedbackPage() {
  const [activeTab, setActiveTab] = useState<'received' | 'evaluations'>('received')
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  const [submittingEvaluation, setSubmittingEvaluation] = useState<string | null>(null)
  const [evaluationResponses, setEvaluationResponses] = useState<Record<string, Record<string, string>>>({})
  
  const feedback = [
    {
      id: "1",
      subject: "Mathematics",
      teacher: "Mr. Thompson",
      date: "2024-03-20",
      status: "unread",
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
      content: `Your lab report on wave motion was well-structured and thorough.

Strengths:
- Detailed experimental procedure
- Accurate data collection
- Clear graphical representations

Areas for improvement:
- Include more error analysis
- Expand on theoretical background
- Add more relevant citations

Overall, excellent work. Let's discuss these points in our next class.`,
      replies: [
        {
          id: "r1",
          text: "Thank you for the feedback! I'll work on improving the error analysis section.",
          date: "2024-03-19",
          from: "student"
        }
      ]
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

  const handleReplySubmit = () => {
    if (!replyText.trim() || !selectedFeedback) return
    setReplyText("")
    // In a real app, this would make an API call to save the reply
  }

  const handleEvaluationSubmit = (evalId: string) => {
    if (!evaluationResponses[evalId]) return
    setSubmittingEvaluation(null)
    // In a real app, this would make an API call to submit the evaluation
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Feedback & Evaluations
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          View teacher feedback and complete course evaluations
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('received')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'received'
              ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
          }`}
        >
          Received Feedback
        </button>
        <button
          onClick={() => setActiveTab('evaluations')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'evaluations'
              ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
          }`}
        >
          Course Evaluations
        </button>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {activeTab === 'received' ? (
          <>
            {/* Feedback List */}
            <div className="lg:col-span-1">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Feedback</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {feedback.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedFeedback(item.id)}
                        className={`w-full px-4 py-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                          selectedFeedback === item.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white font-medium text-sm">
                            {item.teacher.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-900 dark:text-slate-100">
                                {item.subject}
                              </span>
                              {item.status === 'unread' && (
                                <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                  New
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-slate-500 truncate">From {item.teacher}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feedback Content */}
            <div className="lg:col-span-2">
              {selectedFeedback ? (
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardContent className="p-6">
                    {feedback.find(f => f.id === selectedFeedback)?.content.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-4 text-slate-600 dark:text-slate-300">
                        {paragraph.split('\n').map((line, j) => (
                          <span key={j}>
                            {line}
                            {j < paragraph.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    ))}

                    {/* Feedback Replies */}
                    {(feedback.find(f => f.id === selectedFeedback)?.replies ?? []).length > 0 && (
                      <div className="mt-6 space-y-4 border-t border-slate-200 dark:border-slate-700 pt-6">
                        <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">Replies</h3>
                        {feedback.find(f => f.id === selectedFeedback)?.replies.map((reply) => (
                          <div key={reply.id} className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                              <UserIcon className="w-4 h-4 text-slate-500" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-slate-900 dark:text-slate-100">{reply.text}</p>
                              <p className="text-xs text-slate-500 mt-1">{reply.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Input */}
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write a reply..."
                            className="w-full min-h-[100px] p-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white resize-none"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button variant="outline" className="gap-2">
                          <CheckCircleIcon className="w-4 h-4" />
                          Mark as Read
                        </Button>
                        <Button className="gap-2" onClick={handleReplySubmit} disabled={!replyText.trim()}>
                          <PaperAirplaneIcon className="w-4 h-4" />
                          Send Reply
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-slate-200 dark:border-slate-800">
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
                <Card key={evaluation.id} className="border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{evaluation.subject}</CardTitle>
                        <p className="text-sm text-slate-500 mt-1">Instructor: {evaluation.teacher}</p>
                      </div>
                      <div>
                        {evaluation.status === 'pending' ? (
                          <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                            Due {evaluation.dueDate}
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">
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
                                <div className="flex gap-2">
                                  {[1, 2, 3, 4, 5].map((rating) => (
                                    <button
                                      key={rating}
                                      onClick={() => setEvaluationResponses(prev => ({
                                        ...prev,
                                        [evaluation.id]: {
                                          ...prev[evaluation.id],
                                          [index]: rating.toString()
                                        }
                                      }))}
                                      className={`p-2 rounded-lg transition-colors ${
                                        evaluationResponses[evaluation.id]?.[index] === rating.toString()
                                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                                          : 'hover:bg-slate-50 text-slate-600 dark:hover:bg-slate-800 dark:text-slate-400'
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
                                onClick={() => handleEvaluationSubmit(evaluation.id)}
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