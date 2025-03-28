"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AssessmentTable, ClassRosterSelect, AddGradeForm } from "@/components/ui/teacher_dashboard"
import {
  PlusIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  TableCellsIcon
} from "@heroicons/react/24/outline"

export default function GradesPage() {
  const [showAddGradeForm, setShowAddGradeForm] = useState(false)
  const [selectedClass, setSelectedClass] = useState("class1")
  const [activeTab, setActiveTab] = useState("assessments") // Default to assessments

  const handleAddGrade = (gradeData: any) => {
    console.log("Grade added:", gradeData)
    setShowAddGradeForm(false)
    // In a real app, you would add the grade to your state or database
  }

  return (
    // Use a container with mx-auto to prevent overly narrow columns
    <div className="container mx-auto px-4 space-y-6">
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
          <Card>
            <CardContent>
              <div className="min-h-[400px] flex items-center justify-center">
                <div className="w-full max-w-[480px] mx-auto px-6">
                  <div className="flex flex-col items-center">
                    <div className="mb-6 w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                      <TableCellsIcon className="w-8 h-8 text-slate-500 dark:text-slate-400" />
                    </div>
                    <h3 className="block w-full text-xl font-semibold text-slate-900 dark:text-slate-100 text-center mb-3">
                      Grade Book Coming Soon
                    </h3>
                    <p className="block w-full text-sm text-slate-500 dark:text-slate-400 text-center mb-6">
                      A comprehensive grade book view is under development. Currently, you can manage individual assessment grades via the 'Assessments' tab.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('assessments')}
                    >
                      View Assessments
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
