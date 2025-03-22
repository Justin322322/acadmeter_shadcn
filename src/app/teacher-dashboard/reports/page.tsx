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
import { Calendar } from "@/components/ui/calendar"

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
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Performance Trends</h3>
                          <p className="text-sm text-slate-500">Weekly subject performance</p>
                        </div>
                        <div className="flex gap-2">
                          <select
                            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-lg p-2"
                          >
                            <option value="all">All Subjects</option>
                            <option value="mathematics">Mathematics</option>
                            <option value="science">Science</option>
                            <option value="english">English</option>
                            <option value="history">History</option>
                          </select>
                          <select
                            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-lg p-2"
                          >
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="semester">This Semester</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { subject: 'Mathematics', score: 85 },
                          { subject: 'Science', score: 92 },
                          { subject: 'English', score: 78 },
                          { subject: 'History', score: 88 }
                        ].map((subject) => (
                          <div key={subject.subject} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{subject.subject}</span>
                              <span className="text-sm font-semibold">{subject.score}%</span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                              <div
                                className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full"
                                style={{ width: `${subject.score}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Areas for Improvement and Strengths Tables */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Areas for Improvement</h4>
                          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg overflow-hidden">
                            <table className="w-full">
                              <tbody>
                                <tr className="border-b border-slate-200 dark:border-slate-700">
                                  <td className="py-3 px-4 text-sm">English essay structure needs more development</td>
                                </tr>
                                <tr>
                                  <td className="py-3 px-4 text-sm">Practice needed on algebra word problems</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Strengths</h4>
                          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg overflow-hidden">
                            <table className="w-full">
                              <tbody>
                                <tr className="border-b border-slate-200 dark:border-slate-700">
                                  <td className="py-3 px-4 text-sm">Excellent at science lab experiments and reports</td>
                                </tr>
                                <tr>
                                  <td className="py-3 px-4 text-sm">Strong analytical skills in mathematics</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      {/* Behavior Assessment Table */}
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Behavior Assessment</h4>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg overflow-hidden">
                          <table className="w-full">
                            <thead className="bg-slate-100 dark:bg-slate-700">
                              <tr>
                                <th className="py-3 px-4 text-left text-sm font-medium">Category</th>
                                <th className="py-3 px-4 text-left text-sm font-medium">Rating</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { category: 'Classroom Participation', rating: 'Good' },
                                { category: 'Teamwork', rating: 'Excellent' },
                                { category: 'Following Instructions', rating: 'Good' },
                                { category: 'Respect for Others', rating: 'Excellent' },
                                { category: 'Work Habits', rating: 'Good' }
                              ].map((item, index) => (
                                <tr key={item.category} className={index !== 4 ? 'border-b border-slate-200 dark:border-slate-700' : ''}>
                                  <td className="py-3 px-4 text-sm">{item.category}</td>
                                  <td className="py-3 px-4 text-sm">{item.rating}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      {/* Teacher Comments */}
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Teacher Comments</h4>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                          <p className="text-sm text-slate-700 dark:text-slate-300">
                            The student shows excellent teamwork skills and respectful behavior. Could improve on organization and completing assignments on time. Participates actively in class discussions.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'attendance' && (
                    <div className="space-y-8">
                      {/* Header with attendance rate */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Attendance Overview</h3>
                          <p className="text-sm text-slate-500">Student attendance record for current semester</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">95% Present</span>
                        </div>
                      </div>

                      {/* Attendance Stats Cards */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { label: 'Present Days', value: '57', color: 'text-green-600 dark:text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
                          { label: 'Absences', value: '3', color: 'text-red-600 dark:text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
                          { label: 'Late Arrivals', value: '2', color: 'text-amber-600 dark:text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
                          { label: 'Early Dismissals', value: '1', color: 'text-blue-600 dark:text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' }
                        ].map((stat, index) => (
                          <div key={index} className={`${stat.bg} p-4 rounded-lg`}>
                            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Calendar View */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Attendance Calendar</h4>
                            <select className="text-sm border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1 bg-transparent">
                              <option>March 2025</option>
                              <option>February 2025</option>
                              <option>January 2025</option>
                            </select>
                          </div>
                          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex-1">
                            <Calendar
                              mode="single"
                              selected={new Date()}
                              className="rounded-lg w-full h-full"
                            />
                          </div>
                        </div>

                        {/* Recent Attendance List */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Recent Activity</h4>
                            <Button variant="outline" size="sm" className="gap-2">
                              <ArrowDownTrayIcon className="w-4 h-4" />
                              Export Log
                            </Button>
                          </div>
                          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 divide-y divide-slate-200 dark:divide-slate-700">
                            {[
                              { date: '2025-03-22', status: 'present' },
                              { date: '2025-03-21', status: 'present' },
                              { date: '2025-03-20', status: 'late', note: 'Arrived 10 minutes late' },
                              { date: '2025-03-19', status: 'present' },
                              { date: '2025-03-18', status: 'absent', note: 'Medical appointment' }
                            ].map((day, index) => (
                              <div key={index} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <div className="flex items-center gap-3">
                                  <div className={`w-2 h-2 rounded-full ${
                                    day.status === 'present' 
                                      ? 'bg-green-500' 
                                      : day.status === 'late'
                                      ? 'bg-amber-500'
                                      : 'bg-red-500'
                                  }`} />
                                  <div>
                                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                      {new Date(day.date).toLocaleDateString('en-US', { 
                                        weekday: 'long',
                                        month: 'short',
                                        day: 'numeric'
                                      })}
                                    </p>
                                    {day.note && (
                                      <p className="text-xs text-slate-500">{day.note}</p>
                                    )}
                                  </div>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${
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

                      {/* Additional Analysis */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm">Monthly Trend</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-[200px] flex items-end gap-2">
                              {[95, 92, 97, 94, 96].map((percentage, index) => (
                                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                  <div 
                                    className="w-full bg-blue-500 dark:bg-blue-600 rounded-t"
                                    style={{ height: `${percentage}%` }}
                                  />
                                  <span className="text-xs text-slate-500">Week {index + 1}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm">Attendance Pattern</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {[
                                { day: 'Monday', rate: '98%', color: 'bg-green-500' },
                                { day: 'Tuesday', rate: '95%', color: 'bg-green-500' },
                                { day: 'Wednesday', rate: '92%', color: 'bg-amber-500' },
                                { day: 'Thursday', rate: '97%', color: 'bg-green-500' },
                                { day: 'Friday', rate: '94%', color: 'bg-green-500' }
                              ].map((day, index) => (
                                <div key={index} className="space-y-2">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-600 dark:text-slate-400">{day.day}</span>
                                    <span className="font-medium text-slate-900 dark:text-slate-100">{day.rate}</span>
                                  </div>
                                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700">
                                    <div 
                                      className={`h-2 rounded-full ${day.color}`}
                                      style={{ width: day.rate }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
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