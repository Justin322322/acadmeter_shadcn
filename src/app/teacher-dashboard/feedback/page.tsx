"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  ChatBubbleLeftRightIcon, 
  PaperAirplaneIcon, 
  PencilIcon,
  DocumentTextIcon
} from "@heroicons/react/24/outline"
import { FeedbackEditor } from "@/components/ui/teacher_dashboard/feedback-editor"

export default function StudentFeedbackPage() {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [feedback, setFeedback] = useState<string>("")

  // Mock student data
  const students = [
    { id: '1', name: 'John Davis', lastFeedback: '2023-05-10', status: 'Requires Improvement' },
    { id: '2', name: 'Sarah Miller', lastFeedback: '2023-05-12', status: 'Good Progress' },
    { id: '3', name: 'Michael Brown', lastFeedback: '2023-05-05', status: 'Excellent' },
    { id: '4', name: 'Emily Wilson', lastFeedback: '2023-05-15', status: 'Satisfactory' },
  ]

  const defaultFeedback = `The student has shown good progress in several areas but needs improvement in others. 

Areas of strength:
- Participation in group discussions
- Timely submission of assignments
- Creative problem-solving approach

Areas for improvement:
- More attention to detail on written assignments
- Preparation for tests and quizzes
- Active participation in class discussions

Recommendations:
1. Set aside dedicated study time each day
2. Review notes regularly
3. Don't hesitate to ask questions when concepts are unclear
4. Practice more math problems to reinforce understanding

Overall, I believe the student has potential for significant improvement with the right focus and effort.`

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudent(studentId)
    setFeedback(defaultFeedback)
    setEditMode(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Student Feedback</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Provide personalized feedback to students and track progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Student Selection Sidebar */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Student List</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {students.map((student) => (
                <button
                  key={student.id}
                  onClick={() => handleStudentSelect(student.id)}
                  className={`w-full px-4 py-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                    selectedStudent === student.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white font-medium text-sm">
                      {student.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block font-medium text-slate-900 dark:text-slate-100 truncate">{student.name}</span>
                      <div className="flex items-center mt-0.5 gap-1.5">
                        <span className="text-xs text-slate-500 dark:text-slate-400">Last feedback: {student.lastFeedback}</span>
                        <div className={`w-2 h-2 rounded-full ${
                          student.status === 'Excellent' 
                            ? 'bg-green-500' 
                            : student.status === 'Good Progress' 
                            ? 'bg-blue-500'
                            : student.status === 'Satisfactory'
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                        }`}></div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feedback Content Area */}
        <div className="md:col-span-2 space-y-6">
          {!selectedStudent ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <ChatBubbleLeftRightIcon className="w-16 h-16 text-slate-400 dark:text-slate-600 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-1">Select a Student</h3>
                <p className="text-slate-500 dark:text-slate-400">Choose a student from the list to view or provide feedback</p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Feedback Header */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white font-medium text-sm">
                        {students.find(s => s.id === selectedStudent)?.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                          {students.find(s => s.id === selectedStudent)?.name}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Status: {students.find(s => s.id === selectedStudent)?.status}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {editMode ? (
                        <>
                          <Button variant="outline" size="sm" onClick={() => setEditMode(false)}>
                            Cancel
                          </Button>
                          <Button size="sm" className="gap-1.5">
                            <PaperAirplaneIcon className="w-4 h-4" />
                            <span>Send Feedback</span>
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" className="gap-1.5" onClick={() => setEditMode(true)}>
                          <PencilIcon className="w-4 h-4" />
                          <span>Edit Feedback</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Feedback Content */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Progress Feedback</CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                        Mathematics
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Last updated: {students.find(s => s.id === selectedStudent)?.lastFeedback}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {editMode ? (
                    <FeedbackEditor 
                      initialValue={feedback}
                      onChange={setFeedback}
                    />
                  ) : (
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                      {feedback.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="my-2 text-slate-700 dark:text-slate-300">
                          {paragraph.split('\n').map((line, j) => (
                            <span key={j}>
                              {line}
                              {j < paragraph.split('\n').length - 1 && <br />}
                            </span>
                          ))}
                        </p>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Previous Feedback History */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Feedback History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {[
                      { date: '2023-04-15', subject: 'Mathematics', status: 'Good Progress' },
                      { date: '2023-03-20', subject: 'Mathematics', status: 'Needs Improvement' },
                      { date: '2023-02-10', subject: 'Mathematics', status: 'Satisfactory' },
                    ].map((entry, index) => (
                      <div key={index} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <DocumentTextIcon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                            <span className="font-medium text-slate-900 dark:text-slate-100">
                              {entry.subject} Feedback
                            </span>
                          </div>
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {entry.date}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            entry.status === 'Good Progress' 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : entry.status === 'Satisfactory'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {entry.status}
                          </span>
                          <Button variant="ghost" size="sm" className="text-xs h-7">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}