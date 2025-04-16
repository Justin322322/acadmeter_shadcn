"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"


import { AssessmentTable } from "@/components/ui/teacher_dashboard"
import {
  PlusIcon,
  ArrowUpTrayIcon,
  PrinterIcon,
  DocumentCheckIcon,
  AcademicCapIcon
} from "@heroicons/react/24/outline"

// Import types and constants
import { StudentInfo, GradeEntryBase, GradeEntry, GradeStatus } from './types'
import { DEFAULT_STUDENT_INFO, DEFAULT_GRADES } from './constants'
import { calculateGradeStatus, calculateGradeToDate } from './utils'

// Import components
import { GradeTable } from './components/GradeTable'
import { StudentInfoCard } from './components/StudentInfoCard'
import { PerformanceSummary } from './components/PerformanceSummary'
// PrintTemplate is now directly embedded in the iframe
import { AddGradeForm } from './components/AddGradeForm'

export default function GradesPage() {
  // UI state
  const [showAddGradeForm, setShowAddGradeForm] = useState(false)
  const [activeTab, setActiveTab] = useState("grade-book") // Default to grade book

  // Student information state
  const [studentInfo, setStudentInfo] = useState<StudentInfo>(DEFAULT_STUDENT_INFO)

  // Grades state
  const [grades, setGrades] = useState<GradeEntryBase[]>(DEFAULT_GRADES)

  // Current quarter state
  const [currentQuarter, setCurrentQuarter] = useState<1 | 2 | 3 | 4>(1);

  // Selected student ID
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");

  // Selected section ID and subjects
  const [selectedSectionId, setSelectedSectionId] = useState<string>("");
  const [sectionSubjects, setSectionSubjects] = useState<string[]>([]);

  // Load student data when ID changes (would fetch from API in a real app)
  useEffect(() => {
    if (selectedStudentId) {
      console.log(`Loading data for student ID: ${selectedStudentId}`);
      // In a real app, this would fetch the student's grades from an API
    }
  }, [selectedStudentId]);

  // Handle section selection and auto-fill subjects
  const handleSectionSelect = (sectionId: string, subjects: string[]) => {
    setSelectedSectionId(sectionId);
    setSectionSubjects(subjects);

    // Auto-fill subjects when a section is selected
    if (subjects.length > 0) {
      const newGrades = subjects.map(subject => ({
        subject,
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        final: 0
      }));
      setGrades(newGrades);
    }
  };

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
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="default"
            onClick={() => {
              // Create an iframe to handle the printing process
              // This completely isolates the printing from the main UI
              const iframe = document.createElement('iframe');
              iframe.style.position = 'fixed';
              iframe.style.right = '-9999px';
              iframe.style.bottom = '-9999px';
              iframe.style.width = '0';
              iframe.style.height = '0';
              iframe.style.border = 'none';
              document.body.appendChild(iframe);

              // Get the iframe document
              const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
              if (!iframeDoc) {
                document.body.removeChild(iframe);
                return;
              }

              // Write a basic HTML structure with the original design
              iframeDoc.write(`
                <!DOCTYPE html>
                <html>
                <head>
                  <title>Student Report Card</title>
                  <style>
                    body {
                      font-family: Arial, sans-serif;
                      font-size: 12px;
                      line-height: 1.3;
                      margin: 0;
                      padding: 0;
                      background: white;
                      color: #000;
                    }

                    .report-card {
                      width: 210mm;
                      height: 297mm;
                      margin: 0 auto;
                      padding: 10mm;
                      background: white;
                      box-sizing: border-box;
                      position: relative;
                    }

                    .report-header {
                      margin-bottom: 10mm;
                      border-bottom: 1px solid #000;
                      padding-bottom: 3mm;
                      text-align: center;
                    }

                    .report-title {
                      font-size: 18pt;
                      font-weight: bold;
                      margin-bottom: 5mm;
                      text-align: center;
                      color: #000;
                      text-transform: uppercase;
                    }

                    .student-info {
                      display: flex;
                      justify-content: space-between;
                      width: 100%;
                      margin-top: 5mm;
                    }

                    .student-info-item {
                      margin-right: 5mm;
                      text-align: left;
                      font-size: 12px;
                    }

                    .info-label {
                      font-weight: bold;
                      margin-right: 2mm;
                    }

                    .info-value {
                      font-weight: normal;
                    }

                    .report-content {
                      display: flex;
                      flex-direction: column;
                      justify-content: flex-start;
                      height: calc(100% - 40mm);
                    }

                    .report-card-table {
                      width: 100%;
                      border-collapse: collapse;
                      margin-bottom: 0;
                      border: 1px solid #000;
                    }

                    .report-card-table th {
                      background-color: #f5f5f5;
                      font-weight: bold;
                      text-align: center;
                      padding: 2mm;
                      border: 1px solid #000;
                      color: #000;
                    }

                    .report-card-table td {
                      padding: 2.5mm;
                      text-align: center;
                      border: 1px solid #000;
                      color: #000;
                      font-size: 12px;
                      height: 6mm;
                    }

                    .text-left {
                      text-align: left;
                    }

                    .general-average {
                      font-weight: bold;
                      background-color: #f5f5f5;
                    }

                    .passing {
                      color: #008000;
                      font-weight: bold;
                    }

                    .failing {
                      color: #ff0000;
                      font-weight: bold;
                    }

                    .grading-scale-section {
                      margin-top: 15mm;
                      border-top: 1px solid #000;
                      padding-top: 5mm;
                    }

                    .descriptors-table {
                      width: 100%;
                      border-collapse: collapse;
                      font-size: 11px;
                      margin-top: 3mm;
                      border: 1px solid #000;
                    }

                    .descriptors-table th {
                      background-color: #f5f5f5;
                      font-weight: bold;
                      text-align: center;
                      padding: 1.5mm;
                      border: 1px solid #000;
                    }

                    .descriptors-table td {
                      padding: 1.5mm;
                      border: 1px solid #000;
                      text-align: center;
                    }

                    .descriptors-title {
                      font-weight: bold;
                      margin-bottom: 2mm;
                      font-size: 12px;
                    }

                    @media print {
                      @page {
                        size: A4 portrait;
                        margin: 0;
                      }
                      html, body {
                        width: 210mm;
                        height: 297mm;
                        margin: 0;
                        padding: 0;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        color-adjust: exact !important;
                        font-size: 12px !important;
                        line-height: 1.3 !important;
                        transition: none !important;
                      }
                      * {
                        transition: none !important;
                        animation: none !important;
                      }
                      .report-card {
                        width: 210mm;
                        height: 297mm;
                        margin: 0;
                        padding: 10mm;
                        box-shadow: none;
                        page-break-after: always;
                        transform: scale(1);
                      }
                    }
                  </style>
                </head>
                <body>
                  <div class="report-card">
                    <div class="report-header">
                      <div class="report-title">STUDENT REPORT CARD</div>

                      <div class="student-info">
                        <div class="student-info-item">
                          <span class="info-label">Student Name:</span> <span class="info-value">${studentInfo.name}</span>
                        </div>
                        <div class="student-info-item">
                          <span class="info-label">Class Section:</span> <span class="info-value">${studentInfo.section}</span>
                        </div>
                        <div class="student-info-item">
                          <span class="info-label">School Year:</span> <span class="info-value">${studentInfo.schoolYear}</span>
                        </div>
                      </div>
                    </div>

                    <div class="report-content">
                      <div style="border: 1px solid #000; margin-bottom: 5mm;">
                        <table class="report-card-table">
                          <thead>
                            <tr>
                              <th class="text-left" style="width: 35%">LEARNING AREAS</th>
                              <th style="width: 10%">Q1</th>
                              <th style="width: 10%">Q2</th>
                              <th style="width: 10%">Q3</th>
                              <th style="width: 10%">Q4</th>
                              <th style="width: 12%">FINAL GRADE</th>
                              <th style="width: 13%">REMARKS</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${(() => {
                              // Add empty rows if there are fewer than 8 subjects to ensure consistent height
                              const rows = [];
                              const maxRows = Math.max(8, grades.length);

                              for (let i = 0; i < maxRows; i++) {
                                const grade = i < grades.length ? grades[i] : null;

                                if (grade) {
                                  rows.push(`
                                    <tr>
                                      <td class="text-left">${grade.subject}</td>
                                      <td>${grade.q1 || '-'}</td>
                                      <td>${grade.q2 || '-'}</td>
                                      <td>${grade.q3 || '-'}</td>
                                      <td>${grade.q4 || '-'}</td>
                                      <td>${grade.final || '-'}</td>
                                      <td class="${grade.final >= 75 ? 'passing' : 'failing'}">
                                        ${grade.final >= 75 ? 'PASSED' : grade.final ? 'FAILED' : '-'}
                                      </td>
                                    </tr>
                                  `);
                                } else {
                                  rows.push(`
                                    <tr>
                                      <td class="text-left">&nbsp;</td>
                                      <td>&nbsp;</td>
                                      <td>&nbsp;</td>
                                      <td>&nbsp;</td>
                                      <td>&nbsp;</td>
                                      <td>&nbsp;</td>
                                      <td>&nbsp;</td>
                                    </tr>
                                  `);
                                }
                              }

                              return rows.join('');
                            })()}
                            <tr class="general-average">
                              <td class="text-left">GENERAL AVERAGE</td>
                              <td colspan="4"></td>
                              <td>${generalAverage}</td>
                              <td class="${generalAverage >= 75 ? 'passing' : 'failing'}">
                                ${generalAverage >= 75 ? 'PASSED' : 'FAILED'}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div class="grading-scale-section">
                        <div class="descriptors-title">GRADING SCALE:</div>
                        <table class="descriptors-table">
                          <thead>
                            <tr>
                              <th style="width: 40%">DESCRIPTORS</th>
                              <th style="width: 30%">GRADING SCALE</th>
                              <th style="width: 30%">REMARKS</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Outstanding</td>
                              <td>90 – 100</td>
                              <td>PASSED</td>
                            </tr>
                            <tr>
                              <td>Very Satisfactory</td>
                              <td>85 – 89</td>
                              <td>PASSED</td>
                            </tr>
                            <tr>
                              <td>Satisfactory</td>
                              <td>80 – 84</td>
                              <td>PASSED</td>
                            </tr>
                            <tr>
                              <td>Fairly Satisfactory</td>
                              <td>75 – 79</td>
                              <td>PASSED</td>
                            </tr>
                            <tr>
                              <td>Did Not Meet Expectations</td>
                              <td>Below 75</td>
                              <td>FAILED</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <script>
                    // Print automatically when loaded
                    window.onload = function() {
                      window.print();
                      // Close the iframe after printing
                      setTimeout(function() {
                        window.parent.document.body.removeChild(window.frameElement);
                      }, 1000);
                    };
                  </script>
                </body>
                </html>
              `);
              iframeDoc.close();
            }}
          >
            <PrinterIcon className="w-4 h-4" />
            Print Report Card
          </Button>
          <Button
            onClick={() => setShowAddGradeForm(true)}
            variant="default"
            size="default"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Add Grade
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 bg-slate-100 dark:bg-slate-800 p-1">
            <TabsTrigger value="assessments" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">Assessments</TabsTrigger>
            <TabsTrigger value="grade-book" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">Grade Book</TabsTrigger>
          </TabsList>
          <TabsContent value="assessments">
            <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-900">
              <CardHeader className="pb-3">
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
            <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-900">
              <CardHeader className="pb-3">
                <CardTitle>Final Grades and General Average</CardTitle>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>Student performance across all learning areas</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="mb-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                      {/* Quarter Information - Left Side */}
                      <div className="lg:col-span-3">
                        <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-sm overflow-hidden h-full">
                          <div className="p-4 border-b border-slate-800">
                            <h3 className="text-sm font-medium text-slate-300">Quarter Information</h3>
                          </div>

                          <div className="p-5">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-2xl">
                                {currentQuarter}
                              </div>
                              <div>
                                <div className="text-lg font-bold text-slate-300">Quarter {currentQuarter}</div>
                                <div className="text-sm text-slate-400">
                                  {currentQuarter === 1 ? '1st' :
                                   currentQuarter === 2 ? '2nd' :
                                   currentQuarter === 3 ? '3rd' : '4th'} Quarter
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-1 mb-4">
                              {[1, 2, 3, 4].map(quarter => (
                                <button
                                  key={quarter}
                                  onClick={() => setCurrentQuarter(quarter as 1 | 2 | 3 | 4)}
                                  className={`flex-1 py-2 rounded text-center cursor-pointer transition-colors ${currentQuarter === quarter
                                    ? 'bg-blue-600 text-white font-medium'
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                                >
                                  <div className="text-xs font-medium">Q{quarter}</div>
                                </button>
                              ))}
                            </div>

                            <div className="p-3 bg-slate-800/50 rounded-lg text-sm text-slate-300 flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                              </svg>
                              <span>You can only edit grades for the current quarter.</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Student Information - Right Side */}
                      <div className="lg:col-span-9">
                        <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-sm overflow-hidden h-full">
                          <StudentInfoCard
                            studentInfo={studentInfo}
                            onStudentInfoChange={handleInfoChange}
                            onStudentSelect={setSelectedStudentId}
                            onSectionSelect={handleSectionSelect}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <PerformanceSummary
                    generalAverage={generalAverage}
                    overallStatus={overallStatus}
                    passingCount={passingCount}
                    warningCount={warningCount}
                    failingCount={failingCount}
                    currentQuarter={currentQuarter}
                    processedGrades={processedGrades}
                    isCurrentQuarter={isCurrentQuarter}
                    onQuarterChange={setCurrentQuarter}
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

                  <div className="flex justify-between items-center gap-2 mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <Button
                      variant="outline"
                      size="default"
                      onClick={addNewSubject}
                      className="flex items-center gap-1"
                    >
                      <AcademicCapIcon className="w-4 h-4" />
                      Add Subject
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="default"
                        className="flex items-center gap-1"
                      >
                        <ArrowUpTrayIcon className="w-4 h-4" />
                        Import
                      </Button>
                      <Button
                        variant="default"
                        size="default"
                        className="flex items-center gap-1"
                      >
                        <DocumentCheckIcon className="w-4 h-4" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
