"use client"

import { useState } from "react"
import * as ReactDOM from "react-dom/client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AssessmentTable } from "@/components/ui/teacher_dashboard"
import {
  PlusIcon,
  ArrowUpTrayIcon,
  PrinterIcon
} from "@heroicons/react/24/outline"

// Import types and constants
import { StudentInfo, GradeEntryBase, GradeEntry, GradeStatus } from './types'
import { DEFAULT_STUDENT_INFO, DEFAULT_GRADES } from './constants'
import { calculateGradeStatus, calculateGradeToDate } from './utils'

// Import components
import { GradeTable } from './components/GradeTable'
import { StudentInfoCard } from './components/StudentInfoCard'
import { PerformanceSummary } from './components/PerformanceSummary'
import { PrintTemplate } from './components/PrintTemplate'
import { AddGradeForm } from './components/AddGradeForm'

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
  const currentQuarter = 4 as 1 | 2 | 3 | 4;

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

  // Calculate general average
  const generalAverage = Math.round(
    processedGrades.reduce((sum, grade) => sum + grade.gradeToDate, 0) /
    (processedGrades.length || 1)
  );

  // Calculate overall status
  const overallStatus: GradeStatus = calculateGradeStatus(generalAverage);

  // Count passing, warning, and failing subjects
  const passingCount = processedGrades.filter(grade => grade.status === 'passing').length;
  const warningCount = processedGrades.filter(grade => grade.status === 'warning').length;
  const failingCount = processedGrades.filter(grade => grade.status === 'failing').length;

  // Handle student info change
  const handleInfoChange = (field: keyof StudentInfo, value: string) => {
    setStudentInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Add new subject
  const addNewSubject = () => {
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

  // Handle add grade from modal
  const handleAddGrade = (data: { subject: string; grade: number }) => {
    // Create a new subject with the grade in the current quarter
    const newSubject: GradeEntryBase = {
      subject: data.subject,
      q1: currentQuarter == 1 ? data.grade : 0,
      q2: currentQuarter == 2 ? data.grade : 0,
      q3: currentQuarter == 3 ? data.grade : 0,
      q4: currentQuarter == 4 ? data.grade : 0,
      final: data.grade // Initial final grade is the same as the current quarter grade
    };

    setGrades([...grades, newSubject]);
  };

  // Handle subject name change
  const handleSubjectChange = (index: number, value: string) => {
    const newGrades = [...grades]
    newGrades[index] = {
      ...newGrades[index],
      subject: value
    }
    setGrades(newGrades)
  }

  // Handle grade change
  const handleGradeChange = (index: number, quarter: 'q1' | 'q2' | 'q3' | 'q4', value: string) => {
    const newGrades = [...grades]
    const numValue = parseInt(value) || 0

    // Update the specific quarter grade
    newGrades[index] = {
      ...newGrades[index],
      [quarter]: numValue
    }

    // Recalculate final grade as average of all quarters
    const quarters = [newGrades[index].q1, newGrades[index].q2, newGrades[index].q3, newGrades[index].q4]
    const validQuarters = quarters.filter(q => q > 0)

    if (validQuarters.length > 0) {
      const sum = validQuarters.reduce((a, b) => a + b, 0)
      newGrades[index].final = Math.round(sum / validQuarters.length)
    } else {
      newGrades[index].final = 0
    }

    setGrades(newGrades)
  }

  return (
    <div className="space-y-6">
      {/* Top Header and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Grade Management</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage and review student grades and assessments
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="default"
            onClick={() => {
              const printTemplate = document.createElement('div');
              document.body.appendChild(printTemplate);

              // Render the PrintTemplate component
              const root = ReactDOM.createRoot(printTemplate);
              root.render(
                <PrintTemplate
                  studentInfo={studentInfo}
                  grades={grades}
                  generalAverage={generalAverage}
                  hideButton={true}
                />
              );

              // Import the print service
              import('@/services/print-service').then(({ printContent }) => {
                // Get the report card content and styles
                const reportCard = printTemplate.querySelector('.report-card');
                const styles = printTemplate.querySelector('style');

                if (reportCard && styles) {
                  // Add a wrapper with fixed A4 dimensions
                  const wrapper = `
                    <div style="width: 210mm; height: 297mm; margin: 0 auto; overflow: hidden;">
                      ${reportCard.outerHTML}
                    </div>
                  `;

                  // Print the report card with its styles
                  printContent(
                    wrapper,
                    styles.innerHTML,
                    'Student Report Card'
                  );

                  // Clean up after printing
                  setTimeout(() => {
                    document.body.removeChild(printTemplate);
                  }, 1000);
                }
              });
            }}
          >
            <PrinterIcon className="w-4 h-4" />
            Print Report Card
          </Button>
          <Button variant="outline" size="default">
            <ArrowUpTrayIcon className="w-4 h-4" />
            Import
          </Button>
          <Button
            onClick={() => setShowAddGradeForm(true)}
            variant="default"
            size="default"
          >
            <PlusIcon className="w-4 h-4" />
            Add Grade
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Select Class</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Select a class:</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class1">Mathematics 101</SelectItem>
                  <SelectItem value="class2">Physics 101</SelectItem>
                  <SelectItem value="class3">Chemistry 101</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="assessments">Assessments</TabsTrigger>
              <TabsTrigger value="grade-book">Grade Book</TabsTrigger>
            </TabsList>
            <TabsContent value="assessments">
              <Card>
                <CardHeader>
                  <CardTitle>Assessments</CardTitle>
                  <CardDescription>
                    Manage individual assessments and their weights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AssessmentTable />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="grade-book">
              <Card>
                <CardHeader>
                  <CardTitle>Final Grades and General Average</CardTitle>
                  <CardDescription>
                    Student performance across all learning areas
                    <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/40">
                      Current Quarter: {currentQuarter}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/40">
                        Passing: {passingCount}
                      </Badge>
                      <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/40">
                        Warning: {warningCount}
                      </Badge>
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/40">
                        Failing: {failingCount}
                      </Badge>
                    </div>

                    <StudentInfoCard
                      studentInfo={studentInfo}
                      onStudentInfoChange={handleInfoChange}
                    />

                    <GradeTable
                      grades={grades}
                      processedGrades={processedGrades}
                      generalAverage={generalAverage}
                      overallStatus={overallStatus}
                      currentQuarter={currentQuarter}
                      onGradeChange={handleGradeChange}
                      onSubjectChange={handleSubjectChange}
                      onDeleteSubject={deleteSubject}
                      isCurrentQuarter={isCurrentQuarter}
                    />

                    <PerformanceSummary
                      generalAverage={generalAverage}
                      overallStatus={overallStatus}
                      passingCount={passingCount}
                      warningCount={warningCount}
                      failingCount={failingCount}
                      currentQuarter={currentQuarter}
                      processedGrades={processedGrades}
                      isCurrentQuarter={isCurrentQuarter}
                      onAddSubject={addNewSubject}
                    />

                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="default"
                        onClick={addNewSubject}
                      >
                        Add Subject
                      </Button>
                      <Button
                        variant="default"
                        size="default"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

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
