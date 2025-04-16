'use client'

import { StudentInfo } from '../types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { AcademicCapIcon, UserIcon, CalendarIcon } from "@heroicons/react/24/outline"
import { useState } from 'react'

// Mock data for students and sections with Filipino names
const MOCK_STUDENTS = [
  { id: "1", name: "Juan Dela Cruz", section: "Grade 8 - Section A" },
  { id: "2", name: "Maria Santos", section: "Grade 8 - Section A" },
  { id: "3", name: "Pedro Reyes", section: "Grade 8 - Section B" },
  { id: "4", name: "Ana Gonzales", section: "Grade 8 - Section B" },
  { id: "5", name: "Jose Rizal", section: "Grade 9 - Section A" },
  { id: "6", name: "Gabriela Silang", section: "Grade 9 - Section A" },
  { id: "7", name: "Andres Bonifacio", section: "Grade 9 - Section B" },
  { id: "8", name: "Luisa Magbanua", section: "Grade 9 - Section B" },
]

const MOCK_SECTIONS = [
  {
    id: "1",
    name: "Grade 8 - Section A",
    subjects: [
      "Filipino",
      "English",
      "Mathematics",
      "Science",
      "Araling Panlipunan",
      "Edukasyon sa Pagpapakatao",
      "MAPEH",
      "Technology and Livelihood Education"
    ]
  },
  {
    id: "2",
    name: "Grade 8 - Section B",
    subjects: [
      "Filipino",
      "English",
      "Mathematics",
      "Science",
      "Araling Panlipunan",
      "Edukasyon sa Pagpapakatao",
      "MAPEH",
      "Technology and Livelihood Education"
    ]
  },
  {
    id: "3",
    name: "Grade 9 - Section A",
    subjects: [
      "Filipino",
      "English",
      "Mathematics",
      "Science",
      "Araling Panlipunan",
      "Edukasyon sa Pagpapakatao",
      "MAPEH",
      "Technology and Livelihood Education"
    ]
  },
  {
    id: "4",
    name: "Grade 9 - Section B",
    subjects: [
      "Filipino",
      "English",
      "Mathematics",
      "Science",
      "Araling Panlipunan",
      "Edukasyon sa Pagpapakatao",
      "MAPEH",
      "Technology and Livelihood Education"
    ]
  },
]

const SCHOOL_YEARS = [
  "2023-2024",
  "2024-2025",
  "2025-2026",
]

interface StudentInfoCardProps {
  studentInfo: StudentInfo
  onStudentInfoChange: (field: keyof StudentInfo, value: string) => void
  onStudentSelect?: (studentId: string) => void
  onSectionSelect?: (sectionId: string, subjects: string[]) => void
}

export function StudentInfoCard({
  studentInfo,
  onStudentInfoChange,
  onStudentSelect = () => {},
  onSectionSelect = () => {}
}: StudentInfoCardProps) {
  const [selectedStudentId, setSelectedStudentId] = useState<string>("")
  const [selectedSection, setSelectedSection] = useState<string>("")

  // Filter students by section if a section is selected
  const filteredStudents = selectedSection
    ? MOCK_STUDENTS.filter(student => student.section === selectedSection)
    : MOCK_STUDENTS

  // Handle student selection
  const handleStudentSelect = (studentId: string) => {
    setSelectedStudentId(studentId)
    const student = MOCK_STUDENTS.find(s => s.id === studentId)
    if (student) {
      onStudentInfoChange('name', student.name)
      onStudentInfoChange('section', student.section)
      onStudentSelect(studentId)
    }
  }

  // Handle section selection
  const handleSectionSelect = (sectionId: string) => {
    const section = MOCK_SECTIONS.find(s => s.id === sectionId)
    if (section) {
      setSelectedSection(section.name)
      onStudentInfoChange('section', section.name)
      // Clear selected student when section changes
      setSelectedStudentId("")
      // Pass the subjects to the parent component
      onSectionSelect(sectionId, section.subjects)
    }
  }

  return (
    <div>
      <div className="p-4 border-b border-slate-800">
        <h3 className="text-sm font-medium text-slate-300">Student Information</h3>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Section Selection */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white">
                <AcademicCapIcon className="w-4 h-4" />
              </div>
              <p className="text-sm font-medium text-slate-300">Class Section</p>
            </div>
            <Select
              value={MOCK_SECTIONS.find(s => s.name === selectedSection)?.id || ""}
              onValueChange={handleSectionSelect}
            >
              <SelectTrigger className="w-full bg-slate-800 border-slate-700 text-slate-300 rounded">
                <SelectValue placeholder="Select a section" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_SECTIONS.map(section => (
                  <SelectItem key={section.id} value={section.id}>
                    {section.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Student Selection */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white">
                <UserIcon className="w-4 h-4" />
              </div>
              <p className="text-sm font-medium text-slate-300">Student</p>
            </div>
            <Select
              value={selectedStudentId}
              onValueChange={handleStudentSelect}
              disabled={!selectedSection} // Disable if no section is selected
            >
              <SelectTrigger className="w-full bg-slate-800 border-slate-700 text-slate-300 rounded disabled:opacity-70 disabled:cursor-not-allowed">
                <SelectValue placeholder={selectedSection ? "Select a student" : "Select a section first"} />
              </SelectTrigger>
              <SelectContent>
                {filteredStudents.map(student => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!selectedSection && (
              <p className="text-xs text-slate-400 mt-2 text-center">Please select a section first</p>
            )}
          </div>

          {/* School Year Selection */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-600 text-white">
                <CalendarIcon className="w-4 h-4" />
              </div>
              <p className="text-sm font-medium text-slate-300">School Year</p>
            </div>
            <Select
              value={studentInfo.schoolYear}
              onValueChange={(value) => onStudentInfoChange('schoolYear', value)}
            >
              <SelectTrigger className="w-full bg-slate-800 border-slate-700 text-slate-300 rounded">
                <SelectValue placeholder="Select school year" />
              </SelectTrigger>
              <SelectContent>
                {SCHOOL_YEARS.map(year => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
