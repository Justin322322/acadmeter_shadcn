"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClassRosterSelect } from "@/components/ui/teacher_dashboard"
import { DocumentDuplicateIcon, DocumentChartBarIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline"

export default function StudentReportsPage() {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [selectedClass, setSelectedClass] = useState("class1")
  const [activeTab, setActiveTab] = useState<'progress' | 'attendance' | 'behavior'>('progress')

  // Mock student data
  const students = [
    { id: '1', name: 'John Davis' },
    { id: '2', name: 'Sarah Miller' },
    { id: '3', name: 'Michael Brown' },
    { id: '4', name: 'Emily Wilson' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Student Reports</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Generate and view comprehensive student performance reports</p>
        </div>
        <Button variant="outline" size="sm" className="w-full sm:w-auto gap-2">
          <ArrowDownTrayIcon className="w-4 h-4" />
          <span>Export Report</span>
        </Button>
      </div>

      <Card className="border-slate-200 dark:border-slate-800">
        <CardContent className="pt-6">
          <ClassRosterSelect 
            onClassSelect={setSelectedClass}
            selectedClass={selectedClass}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Student Selection Sidebar */}
        <Card className="md:col-span-1 border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Student List</CardTitle>
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

        {/* Report Content Area */}
        <div className="md:col-span-2 space-y-6">
          {!selectedStudent ? (
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
              <CardContent className="flex flex-col items-center justify-center text-center p-8 sm:p-12 space-y-6">
                <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800">
                  <DocumentDuplicateIcon className="w-10 h-10 text-slate-500 dark:text-slate-400" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    Select a Student
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 max-w-[280px] mx-auto">
                    Choose a student from the list to view their detailed performance reports, attendance records, and behavior analysis
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50">
                      <DocumentChartBarIcon className="w-5 h-5 text-amber-600 dark:text-amber-500" aria-hidden="true" />
                    </div>
                    <div>
                      <CardTitle>{students.find(s => s.id === selectedStudent)?.name} - Performance Report</CardTitle>
                      <CardDescription>Comprehensive academic performance analysis</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="progress" className="w-full" onValueChange={(value) => setActiveTab(value as any)}>
                    <TabsList className="bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg w-full mb-6 grid grid-cols-3">
                      <TabsTrigger 
                        value="progress"
                        className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm"
                      >
                        Academic Progress
                      </TabsTrigger>
                      <TabsTrigger 
                        value="attendance"
                        className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm"
                      >
                        Attendance
                      </TabsTrigger>
                      <TabsTrigger 
                        value="behavior"
                        className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm"
                      >
                        Behavior
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="progress" className="mt-0">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Current Average</h4>
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">87.5%</div>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Improvement</h4>
                            <div className="text-2xl font-bold text-green-600 dark:text-green-500">+3.2%</div>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Class Rank</h4>
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">#5</div>
                          </div>
                        </div>
                        
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Subject Performance</h4>
                          <div className="space-y-4">
                            {['Mathematics', 'Science', 'History', 'English', 'Art'].map((subject, index) => (
                              <div key={subject} className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-slate-600 dark:text-slate-300">{subject}</span>
                                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                    {Math.floor(85 + Math.random() * 10)}%
                                  </span>
                                </div>
                                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-blue-500 rounded-full" 
                                    style={{ width: `${85 + Math.random() * 10}%` }} 
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="attendance" className="mt-0">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Present Days</h4>
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">42/45</div>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Attendance Rate</h4>
                            <div className="text-2xl font-bold text-green-600 dark:text-green-500">93.3%</div>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Tardiness</h4>
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">4 days</div>
                          </div>
                        </div>
                        
                        <div className="text-center p-8">
                          <p className="text-slate-500 dark:text-slate-400">
                            Detailed attendance records will be shown here. Feature coming soon.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="behavior" className="mt-0">
                      <div className="text-center p-8">
                        <p className="text-slate-500 dark:text-slate-400">
                          Behavior tracking and student conduct reports will be displayed here. Feature coming soon.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}