"use client"

import { useState } from "react"
import "./print-styles.css"
import "./styles.css"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AssessmentTable, ClassRosterSelect, AddGradeForm } from "@/components/ui/teacher_dashboard"
import {
  PlusIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  TrashIcon
} from "@heroicons/react/24/outline"

// Define types directly in this file to avoid import issues
type StudentInfo = {
  name: string;
  section: string;
  schoolYear: string;
};

type GradeEntryBase = {
  subject: string;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  final: number;
};

type GradeStatus = 'passing' | 'failing' | 'warning';

type GradeEntry = GradeEntryBase & {
  gradeToDate: number;
  status: GradeStatus;
};

// Constants
const PASSING_GRADE = 75; // Minimum passing grade (Philippine standard)

// Grade descriptors based on Philippine grading system
const GRADE_DESCRIPTORS = {
  OUTSTANDING: { min: 90, max: 100, label: 'Outstanding' },
  VERY_SATISFACTORY: { min: 85, max: 89, label: 'Very Satisfactory' },
  SATISFACTORY: { min: 80, max: 84, label: 'Satisfactory' },
  FAIRLY_SATISFACTORY: { min: 75, max: 79, label: 'Fairly Satisfactory' },
  DID_NOT_MEET: { min: 0, max: 74, label: 'Did Not Meet Expectations' }
};

// Default student information
const DEFAULT_STUDENT_INFO = {
  name: "Maria Santos",
  section: "Grade 8 - Section A",
  schoolYear: "2024-2025"
};

// Default grades data
const DEFAULT_GRADES = [
  { subject: "Filipino", q1: 80, q2: 89, q3: 86, q4: 84, final: 85 },
  { subject: "English", q1: 89, q2: 90, q3: 92, q4: 87, final: 90 },
  { subject: "Mathematics", q1: 82, q2: 85, q3: 83, q4: 83, final: 83 },
  { subject: "Science", q1: 86, q2: 87, q3: 85, q4: 84, final: 86 },
  { subject: "Araling Panlipunan", q1: 90, q2: 92, q3: 91, q4: 89, final: 91 },
  { subject: "Edukasyon sa Pagpapakatao", q1: 89, q2: 93, q3: 90, q4: 88, final: 90 },
  { subject: "Edukasyong Pantahanan at Pangkabuhayan", q1: 80, q2: 81, q3: 84, q4: 79, final: 81 },
  { subject: "MAPEH", q1: 85, q2: 86, q3: 85, q4: 84, final: 85 }
];

// Utility functions
const getGradeDescriptor = (grade: number) => {
  if (grade >= GRADE_DESCRIPTORS.OUTSTANDING.min) return GRADE_DESCRIPTORS.OUTSTANDING;
  if (grade >= GRADE_DESCRIPTORS.VERY_SATISFACTORY.min) return GRADE_DESCRIPTORS.VERY_SATISFACTORY;
  if (grade >= GRADE_DESCRIPTORS.SATISFACTORY.min) return GRADE_DESCRIPTORS.SATISFACTORY;
  if (grade >= GRADE_DESCRIPTORS.FAIRLY_SATISFACTORY.min) return GRADE_DESCRIPTORS.FAIRLY_SATISFACTORY;
  return GRADE_DESCRIPTORS.DID_NOT_MEET;
};

const calculateGradeStatus = (grade: number): GradeStatus => {
  // Ensure we have a valid grade
  const validGrade = grade || 0;

  if (validGrade >= PASSING_GRADE) return 'passing';
  if (validGrade >= PASSING_GRADE - 5) return 'warning'; // Within 5 points of passing
  return 'failing';
};

const getStatusColorClass = (status: GradeStatus | undefined): string => {
  switch (status) {
    case 'passing': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    case 'warning': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
    case 'failing': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    default: return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
  }
};

const calculateGradeToDate = (grade: GradeEntryBase, currentQuarter: number): number => {
  let sum = 0;
  let count = 0;
  const quarters = [grade.q1, grade.q2, grade.q3, grade.q4];

  // Include all quarters up to and including the current one
  for (let i = 0; i < currentQuarter; i++) {
    // Only count if there's a valid grade (greater than 0)
    if (quarters[i] > 0) {
      sum += quarters[i];
      count++;
    }
  }

  // If no grades yet for current quarters, use the final grade as fallback
  if (count === 0) {
    return grade.final;
  }

  return Math.round(sum / count);
};

export default function GradesPage() {
  // UI state
  const [showAddGradeForm, setShowAddGradeForm] = useState(false)
  const [selectedClass, setSelectedClass] = useState("class1")
  const [activeTab, setActiveTab] = useState("grade-book") // Default to grade book

  // Student information state
  const [studentInfo, setStudentInfo] = useState<StudentInfo>(DEFAULT_STUDENT_INFO)

  // Grades state
  const [grades, setGrades] = useState<GradeEntryBase[]>(DEFAULT_GRADES)

  // Current quarter (1-4) - for testing, we'll use Q4 to show all quarters
  // In production, you would use: const currentQuarter = getCurrentQuarter();
  const currentQuarter = 4 as const;

  // Helper function to check if a quarter is the current one
  const isCurrentQuarter = (quarter: number): boolean => {
    return quarter === currentQuarter;
  };

  // Process grades with status and grade-to-date
  const processedGrades: GradeEntry[] = grades.map(grade => {
    // Calculate grade to date
    const gradeToDate = calculateGradeToDate(grade, currentQuarter);

    // Use grade-to-date for status calculation for early detection of failing students
    return {
      ...grade,
      gradeToDate,
      status: calculateGradeStatus(gradeToDate)
    };
  });

  // Debug output to console
  console.log('Processed Grades:', processedGrades);

  // Calculate general average based on grade-to-date for early detection
  const generalAverage = Math.round(processedGrades.reduce((sum, grade) => sum + grade.gradeToDate, 0) / processedGrades.length)

  // Calculate overall status
  const overallStatus = calculateGradeStatus(generalAverage)

  // Count passing and failing subjects
  const passingCount = processedGrades.filter(grade => grade.status === 'passing').length
  const warningCount = processedGrades.filter(grade => grade.status === 'warning').length
  const failingCount = processedGrades.filter(grade => grade.status === 'failing').length

  // Add new subject
  const addNewSubject = () => {
    if (grades.length >= 15) {
      alert('Maximum number of subjects reached (15)');
      return;
    }
    const newSubject: GradeEntryBase = {
      subject: "New Subject",
      q1: 0,
      q2: 0,
      q3: 0,
      q4: 0,
      final: 0
    }
    setGrades([...grades, newSubject])
  }

  // Delete subject
  const deleteSubject = (index: number) => {
    if (grades.length <= 1) {
      alert('Cannot delete the last subject');
      return;
    }
    const newGrades = [...grades];
    newGrades.splice(index, 1);
    setGrades(newGrades);
  }

  // Handle subject name change
  const handleSubjectChange = (index: number, value: string) => {
    const newGrades = [...grades]
    newGrades[index].subject = value
    setGrades(newGrades)
  }

  // Handle grade change
  const handleGradeChange = (index: number, quarter: 'q1' | 'q2' | 'q3' | 'q4', value: string) => {
    const newGrades = [...grades]
    // Convert to number and limit to 0-100
    const numValue = Math.min(Math.max(parseInt(value) || 0, 0), 100)
    newGrades[index][quarter] = numValue

    // Calculate final grade (average of 4 quarters)
    const final = Math.round((newGrades[index].q1 + newGrades[index].q2 + newGrades[index].q3 + newGrades[index].q4) / 4)
    newGrades[index].final = final

    setGrades(newGrades)
  }

  // Handle student info change
  const handleInfoChange = (field: keyof StudentInfo, value: string) => {
    setStudentInfo({
      ...studentInfo,
      [field]: value
    })
  }

  const handleAddGrade = (gradeData: any) => {
    console.log("Grade added:", gradeData)
    setShowAddGradeForm(false)
    // In a real app, you would add the grade to your state or database
  }

  return (
    <div className="space-y-8">
      {/* Top Header and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Grade Management
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage and review student grades and assessments
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="w-full sm:w-auto gap-2">
            <ArrowDownTrayIcon className="w-4 h-4" />
            <span>Export</span>
          </Button>
          <Button variant="outline" size="sm" className="w-full sm:w-auto gap-2">
            <ArrowUpTrayIcon className="w-4 h-4" />
            <span>Import</span>
          </Button>
          <Button className="w-full sm:w-auto gap-2" onClick={() => setShowAddGradeForm(true)}>
            <PlusIcon className="w-4 h-4" />
            <span>Add Grade</span>
          </Button>
        </div>
      </div>

      {/* Class Selector */}
      <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
        <CardContent className="pt-6">
          <ClassRosterSelect
            onClassSelect={setSelectedClass}
            selectedClass={selectedClass}
          />
        </CardContent>
      </Card>

      {/* Tabs for Assessments and Grade Book */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        // Remove forced w-full; let container sizing handle width
        className="space-y-2"
      >
        <TabsList className="flex space-x-2 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg w-fit mb-6">
          <TabsTrigger
            value="assessments"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm px-4 py-2"
          >
            Assessments
          </TabsTrigger>
          <TabsTrigger
            value="grade-book"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm px-4 py-2"
          >
            Grade Book
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value="assessments">
          <AssessmentTable />
        </TabsContent>

        <TabsContent value="grade-book">
          {/* Regular grade card for display */}
          <Card className="grade-report-card" id="grade-report-card">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <CardTitle>Final Grades and General Average</CardTitle>
                  <CardDescription>
                    Student performance across all learning areas
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      Current Quarter: {currentQuarter}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-slate-600 dark:text-slate-400">Passing: {passingCount}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-xs text-slate-600 dark:text-slate-400">Warning: {warningCount}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-xs text-slate-600 dark:text-slate-400">Failing: {failingCount}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <div className="px-6 pt-2 pb-0 student-info">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-4">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Student Name:</p>
                  <input
                    type="text"
                    value={studentInfo.name}
                    onChange={(e) => handleInfoChange('name', e.target.value)}
                    className="text-base font-semibold text-slate-900 dark:text-slate-100 bg-transparent border-b border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500 w-full"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Class Section:</p>
                  <input
                    type="text"
                    value={studentInfo.section}
                    onChange={(e) => handleInfoChange('section', e.target.value)}
                    className="text-base font-semibold text-slate-900 dark:text-slate-100 bg-transparent border-b border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500 w-full"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">School Year:</p>
                  <input
                    type="text"
                    value={studentInfo.schoolYear}
                    onChange={(e) => handleInfoChange('schoolYear', e.target.value)}
                    className="text-base font-semibold text-slate-900 dark:text-slate-100 bg-transparent border-b border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500 w-full"
                  />
                </div>
              </div>
            </div>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-3 text-left sticky left-0 z-10">Learning Area</th>
                      <th colSpan={4} className="border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-3 text-center">Quarter</th>
                      <th className="border border-slate-300 dark:border-slate-700 bg-blue-50 dark:bg-blue-900/20 p-3 text-center font-bold">Grade to Date</th>
                      <th className="border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-3 text-center">Final Grade</th>
                      <th className="border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-3 text-center">Status</th>
                      <th className="border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-3 text-center w-12">Action</th>
                    </tr>
                    <tr>
                      <th className="border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-3 sticky left-0 z-10"></th>
                      <th className={`border border-slate-300 dark:border-slate-700 ${isCurrentQuarter(1) ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-slate-100 dark:bg-slate-800'} p-3 text-center`}>
                        1 {isCurrentQuarter(1) && <span className="text-xs text-blue-600 dark:text-blue-400">(Current)</span>}
                      </th>
                      <th className={`border border-slate-300 dark:border-slate-700 ${isCurrentQuarter(2) ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-slate-100 dark:bg-slate-800'} p-3 text-center`}>
                        2 {isCurrentQuarter(2) && <span className="text-xs text-blue-600 dark:text-blue-400">(Current)</span>}
                      </th>
                      <th className={`border border-slate-300 dark:border-slate-700 ${isCurrentQuarter(3) ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-slate-100 dark:bg-slate-800'} p-3 text-center`}>
                        3 {isCurrentQuarter(3) && <span className="text-xs text-blue-600 dark:text-blue-400">(Current)</span>}
                      </th>
                      <th className={`border border-slate-300 dark:border-slate-700 ${isCurrentQuarter(4) ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-slate-100 dark:bg-slate-800'} p-3 text-center`}>
                        4 {isCurrentQuarter(4) && <span className="text-xs text-blue-600 dark:text-blue-400">(Current)</span>}
                      </th>
                      <th className="border border-slate-300 dark:border-slate-700 bg-blue-50 dark:bg-blue-900/20 p-3 text-center font-medium">Current Progress</th>
                      <th className="border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-3 text-center">End of Year</th>
                      <th className="border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-3 text-center"></th>
                      <th className="border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-3 text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {processedGrades.map((grade, index) => (
                      <tr key={index}>
                        <td className="border border-slate-300 dark:border-slate-700 p-2 sticky left-0 z-10 bg-white dark:bg-slate-900">
                          <input
                            type="text"
                            value={grade.subject}
                            onChange={(e) => handleSubjectChange(index, e.target.value)}
                            className="w-full bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1"
                          />
                        </td>
                        <td className="border border-slate-300 dark:border-slate-700 p-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={grade.q1}
                            onChange={(e) => handleGradeChange(index, 'q1', e.target.value)}
                            className="w-12 text-center bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
                          />
                        </td>
                        <td className="border border-slate-300 dark:border-slate-700 p-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={grade.q2}
                            onChange={(e) => handleGradeChange(index, 'q2', e.target.value)}
                            className="w-12 text-center bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
                          />
                        </td>
                        <td className="border border-slate-300 dark:border-slate-700 p-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={grade.q3}
                            onChange={(e) => handleGradeChange(index, 'q3', e.target.value)}
                            className="w-12 text-center bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
                          />
                        </td>
                        <td className="border border-slate-300 dark:border-slate-700 p-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={grade.q4}
                            onChange={(e) => handleGradeChange(index, 'q4', e.target.value)}
                            className="w-12 text-center bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
                          />
                        </td>
                        <td className={`border border-slate-300 dark:border-slate-700 p-3 text-center font-medium bg-blue-50/50 dark:bg-blue-900/10 ${
                          grade.gradeToDate < PASSING_GRADE ? 'text-red-600 dark:text-red-400' :
                          grade.gradeToDate >= PASSING_GRADE && grade.gradeToDate < PASSING_GRADE + 5 ? 'text-amber-600 dark:text-amber-400' :
                          'text-green-600 dark:text-green-400'
                        }`}>
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-base">{grade.gradeToDate}</span>
                            {grade.gradeToDate < PASSING_GRADE && (
                              <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 px-1 py-0.5 rounded">
                                {PASSING_GRADE - grade.gradeToDate} pts needed
                              </span>
                            )}
                          </div>
                        </td>
                        <td className={`border border-slate-300 dark:border-slate-700 p-3 text-center font-medium ${
                          grade.final < PASSING_GRADE ? 'text-red-600 dark:text-red-400' : ''
                        }`}>{grade.final}</td>
                        <td className="border border-slate-300 dark:border-slate-700 p-2 text-center">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColorClass(grade.status)}`}>
                            {grade.status === 'passing' ? 'Passing' :
                             grade.status === 'warning' ? 'At Risk' : 'Failing'}
                          </span>
                        </td>
                        <td className="border border-slate-300 dark:border-slate-700 p-2 text-center">
                          <button
                            onClick={() => deleteSubject(index)}
                            className="text-red-500 hover:text-red-700 focus:outline-none"
                            title="Delete subject"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {/* General Average row with inline styles */}
                    <tr style={{
                      backgroundColor: '#f0f9ff',
                      borderTop: '2px solid #bfdbfe'
                    }}>
                      <td
                        colSpan={5}
                        style={{
                          border: '1px solid #cbd5e1',
                          padding: '0.75rem',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          position: 'sticky',
                          left: 0,
                          zIndex: 10,
                          backgroundColor: '#f0f9ff',
                          fontSize: '1.05rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        General Average
                      </td>
                      <td style={{
                        border: '1px solid #cbd5e1',
                        padding: '0.75rem',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        backgroundColor: '#dbeafe',
                        fontSize: '1.1rem',
                        color: generalAverage < PASSING_GRADE ? '#b91c1c' : '#15803d'
                      }}>
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-lg">{generalAverage}</span>
                          {generalAverage < PASSING_GRADE && (
                            <span style={{
                              fontSize: '0.75rem',
                              backgroundColor: '#fee2e2',
                              color: '#b91c1c',
                              padding: '0.125rem 0.25rem',
                              borderRadius: '0.25rem'
                            }}>
                              {PASSING_GRADE - generalAverage} pts needed
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{
                        border: '1px solid #cbd5e1',
                        padding: '0.75rem',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        backgroundColor: '#dbeafe',
                        fontSize: '1.1rem',
                        color: generalAverage < PASSING_GRADE ? '#b91c1c' : '#15803d'
                      }}>
                        {generalAverage}
                      </td>
                      <td style={{
                        border: '1px solid #cbd5e1',
                        padding: '0.5rem',
                        textAlign: 'center',
                        backgroundColor: '#f0f9ff'
                      }}>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColorClass(overallStatus)}`}>
                          {overallStatus === 'passing' ? 'Passing' :
                           overallStatus === 'warning' ? 'At Risk' : 'Failing'}
                        </span>
                      </td>
                      <td style={{
                        border: '1px solid #cbd5e1',
                        padding: '0.5rem',
                        textAlign: 'center',
                        backgroundColor: '#f0f9ff'
                      }}></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-3">Performance Summary</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Current Progress</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColorClass(overallStatus)}`}>
                        {overallStatus === 'passing' ? 'Passing' :
                         overallStatus === 'warning' ? 'At Risk' : 'Failing'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className={`text-2xl font-bold ${generalAverage < PASSING_GRADE ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-500'}`}>{generalAverage}</p>
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 dark:text-slate-400">Grade to Date</span>
                        <span className="text-xs font-medium">{getGradeDescriptor(generalAverage).label}</span>
                        {generalAverage < PASSING_GRADE && (
                          <span className="text-xs text-red-600 dark:text-red-400">{PASSING_GRADE - generalAverage} points needed to pass</span>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 mb-1">
                        <span>0</span>
                        <span>{PASSING_GRADE}</span>
                        <span>100</span>
                      </div>
                      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${generalAverage < PASSING_GRADE - 5 ? 'bg-red-500' : generalAverage < PASSING_GRADE ? 'bg-amber-500' : 'bg-green-500'}`}
                          style={{ width: `${generalAverage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Subject Status</p>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="flex flex-col items-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <span className="text-xl font-bold text-green-600 dark:text-green-400">{passingCount}</span>
                        <span className="text-xs text-slate-600 dark:text-slate-400">Passing</span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                        <span className="text-xl font-bold text-amber-600 dark:text-amber-400">{warningCount}</span>
                        <span className="text-xs text-slate-600 dark:text-slate-400">At Risk</span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <span className="text-xl font-bold text-red-600 dark:text-red-400">{failingCount}</span>
                        <span className="text-xs text-slate-600 dark:text-slate-400">Failing</span>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      {passingCount > 0 && <div className="h-full bg-green-500 float-left" style={{ width: `${(passingCount / processedGrades.length) * 100}%` }}></div>}
                      {warningCount > 0 && <div className="h-full bg-amber-500 float-left" style={{ width: `${(warningCount / processedGrades.length) * 100}%` }}></div>}
                      {failingCount > 0 && <div className="h-full bg-red-500 float-left" style={{ width: `${(failingCount / processedGrades.length) * 100}%` }}></div>}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Quarter Information</p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold">{currentQuarter}</div>
                        <span className="text-lg font-bold text-slate-900 dark:text-slate-100">Q{currentQuarter}</span>
                      </div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        {isCurrentQuarter(1) ? '1st' :
                         isCurrentQuarter(2) ? '2nd' :
                         isCurrentQuarter(3) ? '3rd' : '4th'} Quarter
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      {[1, 2, 3, 4].map(quarter => (
                        <div key={quarter} className={`p-2 rounded text-center ${isCurrentQuarter(quarter) ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                          <div className="text-xs">Q{quarter}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={addNewSubject}
                  >
                    <PlusIcon className="w-4 h-4" />
                    Add Subject
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <Button
                  variant="default"
                  className="gap-2"
                  onClick={() => {
                    // In a real app, this would save to a database
                    alert('Grades saved successfully!');
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    <polyline points="7 3 7 8 15 8"></polyline>
                  </svg>
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 export-button print-hide"
                  onClick={() => {
                    // Make print template visible before printing
                    const printTemplate = document.getElementById('print-template');
                    if (printTemplate) {
                      printTemplate.style.display = 'block';
                      printTemplate.style.position = 'fixed';
                      printTemplate.style.top = '0';
                      printTemplate.style.left = '0';
                      printTemplate.style.width = '100%';
                      printTemplate.style.height = '100%';
                      printTemplate.style.zIndex = '9999';
                      printTemplate.style.backgroundColor = 'white';
                    }

                    // Print the document after a short delay to ensure template is visible
                    setTimeout(() => {
                      window.print();

                      // Hide print template after printing
                      setTimeout(() => {
                        if (printTemplate) {
                          printTemplate.style.display = 'none';
                          printTemplate.style.position = '';
                          printTemplate.style.zIndex = '';
                        }
                      }, 500);
                    }, 100);
                  }}
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  Export Grades
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Print-only template that matches the desired format exactly */}
          <div id="print-template" className="print-only" style={{ display: 'none' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
              <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px', marginBottom: '20px', letterSpacing: '1px' }}>
                REPORT ON LEARNING PROGRESS AND ACHIEVEMENT
              </h1>

              {/* Student Info Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', border: '1px solid black' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '33%', padding: '8px', borderRight: '1px solid black', fontWeight: 'bold' }}>Name:</td>
                    <td style={{ width: '33%', padding: '8px', borderRight: '1px solid black', fontWeight: 'bold' }}>Grade & Section:</td>
                    <td style={{ width: '33%', padding: '8px', fontWeight: 'bold' }}>School Year:</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', borderRight: '1px solid black' }}>{studentInfo.name}</td>
                    <td style={{ padding: '8px', borderRight: '1px solid black' }}>{studentInfo.section}</td>
                    <td style={{ padding: '8px' }}>{studentInfo.schoolYear}</td>
                  </tr>
                </tbody>
              </table>

              {/* Grades Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', border: '1px solid black' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '8px', border: '1px solid black', width: '30%', textAlign: 'center' }}>Learning Areas</th>
                    <th style={{ padding: '8px', border: '1px solid black', width: '40%', textAlign: 'center' }} colSpan={4}>Quarter</th>
                    <th style={{ padding: '8px', border: '1px solid black', width: '15%', textAlign: 'center' }}>Final Grade</th>
                    <th style={{ padding: '8px', border: '1px solid black', width: '15%', textAlign: 'center' }}>REMARKS</th>
                  </tr>
                  <tr>
                    <th style={{ padding: '8px', border: '1px solid black' }}></th>
                    <th style={{ padding: '8px', border: '1px solid black', textAlign: 'center', width: '10%' }}>1</th>
                    <th style={{ padding: '8px', border: '1px solid black', textAlign: 'center', width: '10%' }}>2</th>
                    <th style={{ padding: '8px', border: '1px solid black', textAlign: 'center', width: '10%' }}>3</th>
                    <th style={{ padding: '8px', border: '1px solid black', textAlign: 'center', width: '10%' }}>4</th>
                    <th style={{ padding: '8px', border: '1px solid black' }}></th>
                    <th style={{ padding: '8px', border: '1px solid black' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map((grade, index) => {
                    // Handle long subject names
                    const displaySubject = grade.subject.length > 25
                      ? grade.subject.substring(0, 25)
                      : grade.subject;

                    return (
                      <tr key={index}>
                        <td style={{ padding: '8px', border: '1px solid black', textAlign: 'center' }}>{displaySubject}</td>
                        <td style={{ padding: '8px', border: '1px solid black', textAlign: 'center' }}>{grade.q1 || ''}</td>
                        <td style={{ padding: '8px', border: '1px solid black', textAlign: 'center' }}>{grade.q2 || ''}</td>
                        <td style={{ padding: '8px', border: '1px solid black', textAlign: 'center' }}>{grade.q3 || ''}</td>
                        <td style={{ padding: '8px', border: '1px solid black', textAlign: 'center' }}>{grade.q4 || ''}</td>
                        <td style={{ padding: '8px', border: '1px solid black', textAlign: 'center', fontWeight: 'medium' }}>{grade.final || ''}</td>
                        <td style={{ padding: '8px', border: '1px solid black', textAlign: 'center' }}>
                          {grade.final >= PASSING_GRADE ? 'Passed' : grade.final ? 'Failed' : ''}
                        </td>
                      </tr>
                    );
                  })}
                  {/* General Average row with inline styles */}
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        padding: '12px',
                        border: '1px solid black',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        backgroundColor: '#f0f9ff',
                        fontSize: '15px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      GENERAL AVERAGE
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        border: '1px solid black',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '17px',
                        backgroundColor: '#dbeafe',
                        color: generalAverage >= PASSING_GRADE ? '#15803d' : '#b91c1c'
                      }}
                    >
                      {generalAverage}
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        border: '1px solid black',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        backgroundColor: '#dbeafe',
                        fontSize: '15px',
                        color: generalAverage >= PASSING_GRADE ? '#15803d' : '#b91c1c'
                      }}
                    >
                      {generalAverage >= PASSING_GRADE ? 'PASSED' : 'FAILED'}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Grading Scale Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '6px', border: '1px solid black', textAlign: 'center', width: '33%' }}>Description</th>
                    <th style={{ padding: '6px', border: '1px solid black', textAlign: 'center', width: '33%' }}>Grading Scale</th>
                    <th style={{ padding: '6px', border: '1px solid black', textAlign: 'center', width: '33%' }}>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '6px', border: '1px solid black', textAlign: 'center' }}>Outstanding</td>
                    <td style={{ padding: '6px', border: '1px solid black', textAlign: 'center' }}>90-100</td>
                    <td style={{ padding: '6px', border: '1px solid black', textAlign: 'center' }}>Passed</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px', border: '1px solid black', textAlign: 'center' }}>Very Satisfactory</td>
                    <td style={{ padding: '6px', border: '1px solid black', textAlign: 'center' }}>85-89</td>
                    <td style={{ padding: '6px', border: '1px solid black', textAlign: 'center' }}>Passed</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px', border: '1px solid black', textAlign: 'center' }}>Satisfactory</td>
                    <td style={{ padding: '6px', border: '1px solid black', textAlign: 'center' }}>80-84</td>
                    <td style={{ padding: '6px', border: '1px solid black', textAlign: 'center' }}>Passed</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px', border: '1px solid black', textAlign: 'center' }}>Fairly Satisfactory</td>
                    <td style={{ padding: '6px', border: '1px solid black', textAlign: 'center' }}>75-79</td>
                    <td style={{ padding: '6px', border: '1px solid black', textAlign: 'center' }}>Passed</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px', border: '1px solid black', textAlign: 'center' }}>Did Not Meet Expectations</td>
                    <td style={{ padding: '6px', border: '1px solid black', textAlign: 'center' }}>Below 75</td>
                    <td style={{ padding: '6px', border: '1px solid black', textAlign: 'center' }}>Failed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Grade Form Modal */}
      {showAddGradeForm && (
        <AddGradeForm
          onClose={() => setShowAddGradeForm(false)}
          onSubmit={handleAddGrade}
        />
      )}
    </div>
  )
}
