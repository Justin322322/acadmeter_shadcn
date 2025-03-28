"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MagnifyingGlassIcon,
  PlusIcon,
  AcademicCapIcon,
  ArrowPathIcon,
  XMarkIcon,
  TrashIcon,
  PencilIcon,
  UserGroupIcon,
  BookOpenIcon
} from "@heroicons/react/24/outline"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

// Mock data for class rosters
interface Subject {
  id: string
  name: string
  code: string
}

interface ClassRoster {
  id: string
  name: string
  section: string
  gradeLevel: string
  subjects: Subject[]
  capacity: number
  enrolled: number
  academicYear: string
  term: string
}

const mockSubjects: Subject[] = [
  { id: "subj-001", name: "Mathematics", code: "MATH101" },
  { id: "subj-002", name: "Science", code: "SCI101" },
  { id: "subj-003", name: "English", code: "ENG101" },
  { id: "subj-004", name: "History", code: "HIST101" },
  { id: "subj-005", name: "Physics", code: "PHYS201" },
  { id: "subj-006", name: "Chemistry", code: "CHEM201" },
  { id: "subj-007", name: "Biology", code: "BIO201" },
  { id: "subj-008", name: "Computer Science", code: "CS101" },
  { id: "subj-009", name: "Art", code: "ART101" },
  { id: "subj-010", name: "Music", code: "MUS101" },
  { id: "subj-011", name: "Physical Education", code: "PE101" },
  { id: "subj-012", name: "Foreign Language", code: "LANG101" },
]

const mockRosters: ClassRoster[] = [
  {
    id: "class-001",
    name: "Elementary 1-A",
    section: "A",
    gradeLevel: "Grade 1",
    subjects: [mockSubjects[0], mockSubjects[1], mockSubjects[2], mockSubjects[3]],
    capacity: 30,
    enrolled: 28,
    academicYear: "2024-2025",
    term: "First Semester"
  },
  {
    id: "class-002",
    name: "Elementary 1-B",
    section: "B",
    gradeLevel: "Grade 1",
    subjects: [mockSubjects[0], mockSubjects[1], mockSubjects[2], mockSubjects[3]],
    capacity: 30,
    enrolled: 25,
    academicYear: "2024-2025",
    term: "First Semester"
  },
  {
    id: "class-003",
    name: "Elementary 2-A",
    section: "A",
    gradeLevel: "Grade 2",
    subjects: [mockSubjects[0], mockSubjects[1], mockSubjects[2], mockSubjects[3]],
    capacity: 30,
    enrolled: 30,
    academicYear: "2024-2025",
    term: "First Semester"
  },
  {
    id: "class-004",
    name: "Elementary 3-A",
    section: "A",
    gradeLevel: "Grade 3",
    subjects: [mockSubjects[0], mockSubjects[1], mockSubjects[2], mockSubjects[3]],
    capacity: 30,
    enrolled: 27,
    academicYear: "2024-2025",
    term: "First Semester"
  },
  {
    id: "class-005",
    name: "High School 9-A",
    section: "A",
    gradeLevel: "Grade 9",
    subjects: [mockSubjects[4], mockSubjects[5], mockSubjects[6], mockSubjects[7]],
    capacity: 35,
    enrolled: 32,
    academicYear: "2024-2025",
    term: "First Semester"
  },
  {
    id: "class-006",
    name: "High School 10-A",
    section: "A",
    gradeLevel: "Grade 10",
    subjects: [mockSubjects[4], mockSubjects[5], mockSubjects[6], mockSubjects[7]],
    capacity: 35,
    enrolled: 30,
    academicYear: "2024-2025",
    term: "First Semester"
  }
]

export default function ClassRostersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<string | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false)
  const [selectedRoster, setSelectedRoster] = useState<ClassRoster | null>(null)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  
  // New roster form state
  const [newRoster, setNewRoster] = useState<Partial<ClassRoster>>({
    name: "",
    section: "",
    gradeLevel: "",
    capacity: 30,
    academicYear: "2024-2025",
    term: "First Semester",
    subjects: []
  })
  
  // Filter rosters based on search and grade level
  const filteredRosters = mockRosters.filter(roster => {
    // Filter by search query
    if (searchQuery && 
        !roster.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !roster.section.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !roster.gradeLevel.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    // Filter by grade level
    if (selectedGradeLevel && roster.gradeLevel !== selectedGradeLevel) {
      return false
    }
    
    return true
  })

  // Get unique grade levels for filter
  const gradeLevels = Array.from(new Set(mockRosters.map(roster => roster.gradeLevel)))
  
  // Handle roster selection for editing
  const handleEditRoster = (roster: ClassRoster) => {
    setSelectedRoster(roster)
    setIsEditModalOpen(true)
  }
  
  // Handle roster selection for managing subjects
  const handleManageSubjects = (roster: ClassRoster) => {
    setSelectedRoster(roster)
    setIsSubjectModalOpen(true)
  }
  
  // Handle roster selection for deletion
  const handleDeleteRoster = (roster: ClassRoster) => {
    setSelectedRoster(roster)
    setIsDeleteConfirmOpen(true)
  }
  
  // Calculate enrollment percentage
  const getEnrollmentPercentage = (enrolled: number, capacity: number) => {
    return Math.round((enrolled / capacity) * 100)
  }
  
  // Get color based on enrollment percentage
  const getEnrollmentColorClass = (percentage: number) => {
    if (percentage >= 90) return "text-red-600 dark:text-red-400"
    if (percentage >= 75) return "text-amber-600 dark:text-amber-400"
    return "text-green-600 dark:text-green-400"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Class Rosters</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">Manage class rosters and assigned subjects</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Create Roster
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="search"
                placeholder="Search class rosters..."
                className="w-full rounded-md border border-slate-200 bg-white pl-9 pr-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Grade Level Filter */}
            <div>
              <select
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                value={selectedGradeLevel || ""}
                onChange={(e) => setSelectedGradeLevel(e.target.value || null)}
              >
                <option value="">All Grade Levels</option>
                {gradeLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-start">
              <Button 
                variant="outline" 
                size="default" 
                className="w-full"
                onClick={() => {
                  setSelectedGradeLevel(null)
                  setSearchQuery("")
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rosters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRosters.map((roster) => {
          const enrollmentPercentage = getEnrollmentPercentage(roster.enrolled, roster.capacity)
          
          return (
            <Card key={roster.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="p-4 pb-2 flex flex-row justify-between items-start space-y-0">
                <div>
                  <CardTitle className="text-base">{roster.name}</CardTitle>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Section {roster.section} • {roster.gradeLevel}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => handleEditRoster(roster)}>
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteRoster(roster)}>
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Subjects */}
                  <div>
                    <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Subjects</h3>
                    <div className="flex flex-wrap gap-2">
                      {roster.subjects.length > 0 ? (
                        roster.subjects.map(subject => (
                          <Badge key={subject.id} variant="outline" className="font-normal">
                            {subject.name}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-slate-500 dark:text-slate-400">No subjects assigned</p>
                      )}
                    </div>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="mt-2 h-auto p-0 text-blue-600 dark:text-blue-400"
                      onClick={() => handleManageSubjects(roster)}
                    >
                      Manage subjects
                    </Button>
                  </div>
                  
                  {/* Enrollment */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Enrollment</h3>
                      <span className={`text-sm font-medium ${getEnrollmentColorClass(enrollmentPercentage)}`}>
                        {enrollmentPercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          enrollmentPercentage >= 90 ? 'bg-red-500' : 
                          enrollmentPercentage >= 75 ? 'bg-amber-500' : 
                          'bg-green-500'
                        }`}
                        style={{ width: `${enrollmentPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {roster.enrolled} / {roster.capacity} students
                    </p>
                  </div>
                  
                  {/* Academic Info */}
                  <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-3">
                    <span>{roster.academicYear}</span>
                    <span>{roster.term}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
        
        {/* Empty State */}
        {filteredRosters.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-8 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <BookOpenIcon className="h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">No class rosters found</h3>
            <p className="text-slate-500 dark:text-slate-400 text-center mt-1 max-w-sm">
              {searchQuery || selectedGradeLevel
                ? "Try adjusting your filters to find what you're looking for."
                : "Get started by creating your first class roster."}
            </p>
            {(searchQuery || selectedGradeLevel) && (
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSelectedGradeLevel(null)
                  setSearchQuery("")
                }}
              >
                Clear Filters
              </Button>
            )}
            {!searchQuery && !selectedGradeLevel && (
              <Button 
                className="mt-4 gap-2"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <PlusIcon className="h-4 w-4" />
                Create Roster
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Create Roster Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Class Roster</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Class Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                  value={newRoster.name}
                  onChange={(e) => setNewRoster({...newRoster, name: e.target.value})}
                  placeholder="e.g. Elementary 1-C"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Section
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                    value={newRoster.section}
                    onChange={(e) => setNewRoster({...newRoster, section: e.target.value})}
                    placeholder="e.g. C"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Grade Level
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                    value={newRoster.gradeLevel}
                    onChange={(e) => setNewRoster({...newRoster, gradeLevel: e.target.value})}
                    placeholder="e.g. Grade 1"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Capacity
                </label>
                <input
                  type="number"
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                  value={newRoster.capacity || ""}
                  onChange={(e) => setNewRoster({...newRoster, capacity: parseInt(e.target.value) || 0})}
                  min="1"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Academic Year
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                    value={newRoster.academicYear}
                    onChange={(e) => setNewRoster({...newRoster, academicYear: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Term
                  </label>
                  <select
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                    value={newRoster.term}
                    onChange={(e) => setNewRoster({...newRoster, term: e.target.value})}
                  >
                    <option value="First Semester">First Semester</option>
                    <option value="Second Semester">Second Semester</option>
                    <option value="Summer">Summer</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateModalOpen(false)
                setNewRoster({
                  name: "",
                  section: "",
                  gradeLevel: "",
                  capacity: 30,
                  academicYear: "2024-2025",
                  term: "First Semester",
                  subjects: []
                })
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              onClick={() => {
                // Here you would create the roster and add it to the list
                setIsCreateModalOpen(false)
                // Reset form
                setNewRoster({
                  name: "",
                  section: "",
                  gradeLevel: "",
                  capacity: 30,
                  academicYear: "2024-2025",
                  term: "First Semester",
                  subjects: []
                })
              }}
            >
              Create Roster
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Subjects Modal */}
      {selectedRoster && (
        <Dialog open={isSubjectModalOpen} onOpenChange={setIsSubjectModalOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Manage Subjects for {selectedRoster.name}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                Current Subjects
              </h3>
              <div className="space-y-2 mb-4">
                {selectedRoster.subjects.length > 0 ? (
                  selectedRoster.subjects.map(subject => (
                    <div 
                      key={subject.id} 
                      className="flex justify-between items-center p-2 rounded-md border border-slate-200 dark:border-slate-700"
                    >
                      <div className="flex items-center gap-2">
                        <AcademicCapIcon className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">{subject.name}</span>
                        <span className="text-xs text-slate-500">({subject.code})</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <XMarkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400 p-2">
                    No subjects assigned to this class
                  </p>
                )}
              </div>
              
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                Add Subjects
              </h3>
              <div className="h-48 overflow-y-auto border rounded-md border-slate-200 dark:border-slate-700 p-2">
                <div className="relative mb-3">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="search"
                    placeholder="Search subjects..."
                    className="w-full rounded-md border border-slate-200 bg-white pl-9 pr-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  {mockSubjects
                    .filter(subj => !selectedRoster.subjects.some(s => s.id === subj.id))
                    .map(subject => (
                      <div 
                        key={subject.id} 
                        className="flex justify-between items-center p-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <AcademicCapIcon className="h-4 w-4 text-slate-500" />
                          <span className="text-sm font-medium">{subject.name}</span>
                          <span className="text-xs text-slate-500">({subject.code})</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsSubjectModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsSubjectModalOpen(false)}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {selectedRoster && (
        <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Class Roster</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-slate-600 dark:text-slate-300">
                Are you sure you want to delete <span className="font-medium">{selectedRoster.name}</span>? 
                This action cannot be undone.
              </p>

              <div className="mt-4 p-3 rounded-md bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                <div className="flex gap-2 items-start">
                  <UserGroupIcon className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">
                      Warning: This roster has {selectedRoster.enrolled} enrolled students
                    </p>
                    <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                      Deleting this roster will remove these students' enrollment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={() => {
                  // Here you would delete the roster
                  setIsDeleteConfirmOpen(false)
                }}
              >
                Delete Roster
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}