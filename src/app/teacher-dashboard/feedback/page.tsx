"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FeedbackEditor, ClassRosterSelect } from "@/components/ui/teacher_dashboard"
import { ChatBubbleLeftRightIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"

export default function FeedbackPage() {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [selectedClass, setSelectedClass] = useState("class1")
  const [feedbackText, setFeedbackText] = useState("")
  const [activeTab, setActiveTab] = useState("individual")

  const handleSaveFeedback = (feedback: string) => {
    console.log("Feedback saved:", feedback)
    // In a real app, you would save the feedback to a database
    alert("Feedback saved successfully!")
  }

  // Mock student list
  const students = [
    { id: "1", name: "Emily Johnson" },
    { id: "2", name: "Michael Lee" },
    { id: "3", name: "Sophia Garcia" },
    { id: "4", name: "Daniel Rodriguez" }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Student Feedback</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Provide personalized feedback to improve student performance</p>
      </div>

      <Card className="border-slate-200 dark:border-slate-800">
        <CardContent className="pt-6">
          <ClassRosterSelect 
            onClassSelect={setSelectedClass}
            selectedClass={selectedClass}
          />
        </CardContent>
      </Card>

      <Tabs defaultValue="individual" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg w-full max-w-md mb-6 grid grid-cols-2">
          <TabsTrigger 
            value="individual"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm"
          >
            Individual Feedback
          </TabsTrigger>
          <TabsTrigger 
            value="batch"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm"
          >
            Batch Feedback
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="individual" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Student Selection */}
            <Card className="border-slate-200 dark:border-slate-800 md:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Select Student</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                  {students.map((student) => (
                    <button
                      key={student.id}
                      className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${
                        selectedStudent === student.id
                          ? "bg-indigo-50 dark:bg-indigo-950/30"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      }`}
                      onClick={() => setSelectedStudent(student.id)}
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-medium">
                          {student.name.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${
                          selectedStudent === student.id
                            ? "text-indigo-600 dark:text-indigo-400"
                            : "text-slate-900 dark:text-slate-100"
                        }`}>
                          {student.name}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Feedback Form */}
            <Card className="border-slate-200 dark:border-slate-800 md:col-span-2">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50">
                      <ChatBubbleLeftRightIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                    </div>
                    <div>
                      <CardTitle>Provide Feedback</CardTitle>
                      <CardDescription>
                        {selectedStudent 
                          ? `Providing feedback to ${students.find(s => s.id === selectedStudent)?.name}`
                          : "Select a student to provide feedback"}
                      </CardDescription>
                    </div>
                  </div>
                  {selectedStudent && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleSaveFeedback(feedbackText)}
                    >
                      <PaperAirplaneIcon className="w-4 h-4" />
                      Send Feedback
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!selectedStudent ? (
                  <div className="text-center py-8">
                    <p className="text-slate-500 dark:text-slate-400">
                      Select a student from the list to provide feedback
                    </p>
                  </div>
                ) : (
                  <FeedbackEditor
                    studentName={students.find(s => s.id === selectedStudent)?.name}
                    initialValue={feedbackText}
                    onChange={setFeedbackText}
                    onSave={handleSaveFeedback}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="batch" className="mt-0">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Batch Feedback</CardTitle>
              <CardDescription>Send the same feedback to multiple students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-slate-500 dark:text-slate-400">
                  Batch feedback functionality coming soon. Use the Individual tab for now.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}