"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentRankings } from "@/components/ui/teacher_dashboard"
import { 
  MagnifyingGlassIcon,
  UserPlusIcon,
  ArrowsUpDownIcon
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
  const [classes, setClasses] = useState<Class[]>(mockClasses)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)
  const [activeTab, setActiveTab] = useState("students")

  // Filter classes based on search and section filter
  const filteredClasses = classes.filter(cls => {
    // Check if matches search query
    const matchesSearch = searchQuery === "" ||
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.subject.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Check if matches section filter
    const matchesSection = selectedSection === null || cls.section === selectedSection
    
    return matchesSearch && matchesSection
  })

  // Get unique sections for filter
  const uniqueSections = Array.from(new Set(classes.map(cls => cls.section)))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">My Classes</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Manage your class rosters and student information</p>
        </div>
        <Button className="gap-2">
          <UserPlusIcon className="w-4 h-4" />
          <span>Create Class</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search classes..."
                className="w-full pl-9 pr-4 py-2 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 text-sm"
              />
            </div>
            <div>
              <select
                value={selectedSection || ""}
                onChange={(e) => setSelectedSection(e.target.value === "" ? null : e.target.value)}
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 text-sm"
              >
                <option value="">All Sections</option>
                {uniqueSections.map((section) => (
                  <option key={section} value={section}>Section {section}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowsUpDownIcon className="w-4 h-4" />
                <span>Sort by</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedClass ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedClass(null)}
              >
                ← Back to Classes
              </Button>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                {selectedClass.name} - Section {selectedClass.section}
              </h2>
            </div>
          </div>

          <Tabs defaultValue="students" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="students" className="mt-0">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle>Student Roster</CardTitle>
                  <CardDescription>Students enrolled in {selectedClass.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">ID</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Grade</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockStudents.slice(0, 5).map((student) => (
                        <tr key={student.id} className="border-b border-slate-200 dark:border-slate-700">
                          <td className="py-3 px-4 text-sm text-slate-900 dark:text-slate-100">{student.name}</td>
                          <td className="py-3 px-4 text-sm text-slate-500 dark:text-slate-400">{student.id}</td>
                          <td className="py-3 px-4 text-sm text-right font-medium text-slate-900 dark:text-slate-100">{student.grade}%</td>
                          <td className="py-3 px-4 text-sm text-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              Active
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="assignments" className="mt-0">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle>Assignments</CardTitle>
                  <CardDescription>Class assignments and grades</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-slate-500 dark:text-slate-400">
                      No assignments created yet. Create an assignment from the assignments page.
                    </p>
                    <Button variant="outline" className="mt-4">
                      Go to Assignments
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-0">
              <StudentRankings 
                students={mockStudents} 
                classSection={selectedClass.section} 
              />
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((cls) => (
            <Card 
              key={cls.id}
              className="border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors cursor-pointer"
              onClick={() => setSelectedClass(cls)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    Section {cls.section}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-1">{cls.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{cls.subject}</p>
                <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Schedule</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{cls.schedule}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Students</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{cls.students}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Average Grade</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{cls.averageGrade}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}