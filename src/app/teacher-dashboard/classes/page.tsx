"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StudentRankings } from "@/components/ui/teacher_dashboard/student-rankings"
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  UserGroupIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline"

interface Class {
  id: string
  name: string
  section: string
  subject: string
  schedule: string
  students: number
  averageGrade: string
}

const mockClasses: Class[] = [
  {
    id: "1",
    name: "Mathematics 101",
    section: "A",
    subject: "Mathematics",
    schedule: "MWF 9:00 AM - 10:30 AM",
    students: 32,
    averageGrade: "85.7%"
  },
  {
    id: "2",
    name: "Physics",
    section: "B",
    subject: "Science",
    schedule: "TTH 1:00 PM - 2:30 PM",
    students: 28,
    averageGrade: "83.2%"
  },
  {
    id: "3",
    name: "Chemistry",
    section: "C",
    subject: "Science",
    schedule: "MWF 2:00 PM - 3:30 PM",
    students: 30,
    averageGrade: "88.5%"
  }
]

const mockStudents = [
  {
    id: "s1",
    name: "Emma Thompson",
    grade: 98.5,
    section: "A",
    rank: 1
  },
  {
    id: "s2",
    name: "James Wilson",
    grade: 97.2,
    section: "B",
    rank: 2
  },
  {
    id: "s3",
    name: "Sophia Chen",
    grade: 96.8,
    section: "A",
    rank: 3
  },
  {
    id: "s4",
    name: "Lucas Rodriguez",
    grade: 95.5,
    section: "C",
    rank: 4
  },
  {
    id: "s5",
    name: "Isabella Kim",
    grade: 95.0,
    section: "B",
    rank: 5
  },
  {
    id: "s6",
    name: "Oliver Martinez",
    grade: 94.2,
    section: "A",
    rank: 6
  }
]

export default function ClassesPage() {
  const [classes] = useState<Class[]>(mockClasses)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredStudents = selectedSection
    ? mockStudents.filter(student => student.section === selectedSection)
    : mockStudents

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">My Classes</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Manage your class sections and students</p>
        </div>
        <Button className="gap-2">
          <PlusIcon className="w-4 h-4" />
          Create New Class
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="border-b border-slate-200 dark:border-slate-700">
              <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Active Classes</CardTitle>
                  <CardDescription>View and manage your current classes</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => setSelectedSection(current => current ? null : 'A')}
                  >
                    <FunnelIcon className="w-4 h-4" />
                    {selectedSection ? `Section ${selectedSection}` : 'All Sections'}
                  </Button>
                  <div className="relative flex-1">
                    <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                    <input
                      type="search"
                      placeholder="Search classes..."
                      className="w-full rounded-md border border-slate-200 bg-white pl-8 pr-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Class Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Section</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Subject</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Schedule</th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-slate-500 dark:text-slate-400">Students</th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-slate-500 dark:text-slate-400">Average Grade</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-slate-500 dark:text-slate-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredClasses.map((cls) => (
                        <tr
                          key={cls.id}
                          className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                          <td className="px-4 py-3">
                            <div className="font-medium text-slate-900 dark:text-slate-100">{cls.name}</div>
                          </td>
                          <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{cls.section}</td>
                          <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{cls.subject}</td>
                          <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{cls.schedule}</td>
                          <td className="px-4 py-3 text-center">
                            <div className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
                              <UserGroupIcon className="w-4 h-4" />
                              <span>{cls.students}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex justify-center items-center gap-1 text-emerald-600 dark:text-emerald-500">
                              <ChartBarIcon className="w-4 h-4" />
                              <span>{cls.averageGrade}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                              >
                                <PencilIcon className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredClasses.length === 0 && (
                  <div className="text-center py-6 text-slate-500 dark:text-slate-400">
                    No classes found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <StudentRankings 
            students={filteredStudents}
            classSection={selectedSection || undefined}
          />
        </div>
      </div>
    </div>
  )
}