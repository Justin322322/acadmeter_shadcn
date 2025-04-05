"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ClassRosterSelect } from "@/components/ui/teacher_dashboard"
import {
  PlusIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  CalendarIcon,
  EyeIcon
} from "@heroicons/react/24/outline"

export default function AssignmentsPage() {
  const [selectedClass, setSelectedClass] = useState("class1")
  const [activeTab, setActiveTab] = useState("active")

  // Mock assignment data
  const assignments = [
    {
      id: "a1",
      title: "Chapter 5 Problems",
      subject: "Mathematics",
      dueDate: "2025-04-05",
      status: "active",
      submissionsCount: 18,
      totalStudents: 32,
      type: "homework"
    },
    {
      id: "a2",
      title: "Research Project Outline",
      subject: "Science",
      dueDate: "2025-04-10",
      status: "active",
      submissionsCount: 5,
      totalStudents: 28,
      type: "project"
    },
    {
      id: "a3",
      title: "Quiz 3 - Algebra",
      subject: "Mathematics",
      dueDate: "2025-03-25",
      status: "completed",
      submissionsCount: 32,
      totalStudents: 32,
      type: "quiz"
    },
    {
      id: "a4",
      title: "Historical Events Analysis",
      subject: "History",
      dueDate: "2025-03-20",
      status: "completed",
      submissionsCount: 27,
      totalStudents: 30,
      type: "essay"
    },
    {
      id: "a5",
      title: "Mid-Term Preparation Worksheet",
      subject: "Mathematics",
      dueDate: "2025-04-15",
      status: "draft",
      submissionsCount: 0,
      totalStudents: 32,
      type: "homework"
    }
  ]

  const filteredAssignments = assignments.filter(assignment => {
    if (activeTab === "active") return assignment.status === "active"
    if (activeTab === "completed") return assignment.status === "completed"
    if (activeTab === "draft") return assignment.status === "draft"
    return true
  })

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Calculate days remaining
  const getDaysRemaining = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Get badge color based on assignment type
  const getAssignmentTypeColor = (type: string) => {
    switch (type) {
      case "homework":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "quiz":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
      case "project":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
      case "essay":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400"
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Assignments</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Create and manage assignments for your classes</p>
        </div>
        <Button className="w-full sm:w-auto gap-2">
          <PlusIcon className="w-4 h-4" />
          <span>Create Assignment</span>
        </Button>
      </div>

      <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
        <CardContent className="pt-6">
          <ClassRosterSelect
            onClassSelect={setSelectedClass}
            selectedClass={selectedClass}
          />
        </CardContent>
      </Card>

      <Tabs defaultValue="active" className="w-full" onValueChange={(value) => setActiveTab(value)}>
        <TabsList className="flex space-x-2 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg w-fit">
          <TabsTrigger
            value="active"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm px-4 py-2"
          >
            Active
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm px-4 py-2"
          >
            Completed
          </TabsTrigger>
          <TabsTrigger
            value="draft"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm px-4 py-2"
          >
            Drafts
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          {filteredAssignments.length === 0 ? (
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                  <DocumentTextIcon className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                  No {activeTab} assignments
                </h3>
                <p className="text-center text-sm text-slate-500 dark:text-slate-400 max-w-md">
                  {activeTab === "active"
                    ? "You don't have any active assignments. Create a new assignment to get started."
                    : activeTab === "completed"
                    ? "You don't have any completed assignments yet."
                    : "You don't have any draft assignments. You can create one and save it for later."}
                </p>
                {activeTab !== "completed" && (
                  <Button className="mt-6 gap-2">
                    <PlusIcon className="w-4 h-4" />
                    <span>Create Assignment</span>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {filteredAssignments.map((assignment) => (
                <Card key={assignment.id} className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                  <div className="flex flex-col h-full">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={`${getAssignmentTypeColor(assignment.type)}`}>
                              {assignment.type.charAt(0).toUpperCase() + assignment.type.slice(1)}
                            </Badge>
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                              {assignment.subject}
                            </span>
                          </div>
                          <CardTitle className="text-lg">{assignment.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 pb-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
                          <div className="flex items-center gap-2">
                            <ClockIcon className="w-4 h-4 text-slate-500" />
                            <span className="text-sm text-slate-700 dark:text-slate-300">Due Date:</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-slate-500" />
                            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                              {formatDate(assignment.dueDate)}
                            </span>
                          </div>
                        </div>

                        {assignment.status === "active" && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-slate-500 dark:text-slate-400">
                                {getDaysRemaining(assignment.dueDate) > 0
                                  ? `${getDaysRemaining(assignment.dueDate)} day${getDaysRemaining(assignment.dueDate) !== 1 ? 's' : ''} remaining`
                                  : "Due today"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircleIcon className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-slate-700 dark:text-slate-300">
                                {assignment.submissionsCount}/{assignment.totalStudents} submitted
                              </span>
                            </div>
                          </div>
                        )}

                        {assignment.status === "completed" && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-green-600 dark:text-green-500">
                                Completed
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircleIcon className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-slate-700 dark:text-slate-300">
                                {assignment.submissionsCount}/{assignment.totalStudents} submitted
                              </span>
                            </div>
                          </div>
                        )}

                        {assignment.status === "draft" && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-slate-500 dark:text-slate-400">
                                Draft
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-slate-700 dark:text-slate-300">
                                Not published
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex justify-between items-center">
                        <Button variant="outline" size="sm" className="gap-2">
                          <EyeIcon className="w-4 h-4" />
                          <span>View Details</span>
                        </Button>
                        <Button variant="outline" size="sm">
                          {assignment.status === "draft" ? "Publish" : "Edit"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}