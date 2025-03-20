"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  DocumentDuplicateIcon, 
  ArrowDownTrayIcon,
  DocumentArrowDownIcon,
  ChartBarIcon,
  AcademicCapIcon 
} from "@heroicons/react/24/outline"

export default function StudentReportsPage() {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
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
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Student Reports</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Generate and view comprehensive student performance reports</p>
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
                  onClick={() => setSelectedStudent(student.id)}
                  className={`w-full px-4 py-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                    selectedStudent === student.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white font-medium text-sm">
                      {student.name.charAt(0)}
                    </div>
                    <span className="font-medium text-slate-900 dark:text-slate-100">{student.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Content Area */}
        <div className="md:col-span-2 space-y-6">
          {!selectedStudent ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <DocumentDuplicateIcon className="w-16 h-16 text-slate-400 dark:text-slate-600 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-1">Select a Student</h3>
                <p className="text-slate-500 dark:text-slate-400">Choose a student from the list to view or generate reports</p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Report Header */}
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
                        <p className="text-sm text-slate-500 dark:text-slate-400">Student ID: #{selectedStudent}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1.5">
                        <DocumentArrowDownIcon className="w-4 h-4" />
                        <span>Save as PDF</span>
                      </Button>
                      <Button size="sm" className="gap-1.5">
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        <span>Download Report</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Report Tabs */}
              <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setActiveTab('progress')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 ${
                    activeTab === 'progress'
                      ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                  }`}
                >
                  Academic Progress
                </button>
                <button
                  onClick={() => setActiveTab('attendance')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 ${
                    activeTab === 'attendance'
                      ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                  }`}
                >
                  Attendance
                </button>
                <button
                  onClick={() => setActiveTab('behavior')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 ${
                    activeTab === 'behavior'
                      ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                  }`}
                >
                  Behavior
                </button>
              </div>

              {/* Report Content */}
              <Card>
                <CardContent className="p-6">
                  {activeTab === 'progress' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Academic Performance</h3>
                        <span className="text-sm py-1 px-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                          Current Grade: B+
                        </span>
                      </div>

                      {/* Subject Breakdown */}
                      <div className="space-y-4">
                        {['Mathematics', 'Science', 'English', 'History'].map((subject, index) => (
                          <div key={subject} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{subject}</span>
                              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                {[85, 92, 78, 88][index]}%
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  [
                                    'bg-blue-600 dark:bg-blue-500',
                                    'bg-green-600 dark:bg-green-500',
                                    'bg-amber-600 dark:bg-amber-500',
                                    'bg-violet-600 dark:bg-violet-500',
                                  ][index]
                                }`}
                                style={{ width: `${[85, 92, 78, 88][index]}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Improvement Areas */}
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Areas for Improvement</h4>
                        <ul className="space-y-2">
                          <li className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
                            <ChartBarIcon className="w-5 h-5 text-amber-500 shrink-0" />
                            <span>English essay structure needs more development</span>
                          </li>
                          <li className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
                            <ChartBarIcon className="w-5 h-5 text-amber-500 shrink-0" />
                            <span>Practice needed on algebra word problems</span>
                          </li>
                        </ul>
                      </div>

                      {/* Strengths */}
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Strengths</h4>
                        <ul className="space-y-2">
                          <li className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
                            <AcademicCapIcon className="w-5 h-5 text-green-500 shrink-0" />
                            <span>Excellent at science lab experiments and reports</span>
                          </li>
                          <li className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
                            <AcademicCapIcon className="w-5 h-5 text-green-500 shrink-0" />
                            <span>Strong analytical skills in mathematics</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'attendance' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Attendance Record</h3>
                        <span className="text-sm py-1 px-2 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          95% Present
                        </span>
                      </div>

                      {/* Attendance Summary */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">95%</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">Attendance Rate</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">3</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">Absences</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">2</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">Late Arrivals</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">1</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">Early Dismissals</div>
                        </div>
                      </div>

                      {/* Recent Attendance */}
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Recent Attendance</h4>
                        <div className="space-y-2">
                          {[
                            { date: '2023-05-15', status: 'present' },
                            { date: '2023-05-14', status: 'present' },
                            { date: '2023-05-13', status: 'late' },
                            { date: '2023-05-12', status: 'present' },
                            { date: '2023-05-11', status: 'absent' },
                          ].map((day) => (
                            <div key={day.date} className="flex items-center justify-between p-2 border-b border-slate-100 dark:border-slate-800">
                              <span className="text-sm text-slate-900 dark:text-slate-100">
                                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                              </span>
                              <span className={`text-xs py-1 px-2 rounded-full ${
                                day.status === 'present' 
                                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                  : day.status === 'late'
                                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                              }`}>
                                {day.status.charAt(0).toUpperCase() + day.status.slice(1)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'behavior' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Behavior Assessment</h3>
                        <span className="text-sm py-1 px-2 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          Good
                        </span>
                      </div>

                      {/* Behavior Categories */}
                      <div className="space-y-4">
                        {[
                          { category: 'Classroom Participation', rating: 4 },
                          { category: 'Teamwork', rating: 5 },
                          { category: 'Following Instructions', rating: 4 },
                          { category: 'Respect for Others', rating: 5 },
                          { category: 'Work Habits', rating: 3 },
                        ].map((item) => (
                          <div key={item.category} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{item.category}</span>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <div key={star} className={`w-4 h-4 rounded-full ${
                                    star <= item.rating 
                                      ? 'bg-blue-500' 
                                      : 'bg-slate-200 dark:bg-slate-700'
                                  }`}></div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Teacher Comments */}
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Teacher Comments</h4>
                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                          <p className="text-sm text-slate-700 dark:text-slate-300">
                            The student shows excellent teamwork skills and respectful behavior. 
                            Could improve on organization and completing assignments on time. 
                            Participates actively in class discussions.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}