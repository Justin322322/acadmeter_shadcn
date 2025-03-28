"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AssessmentTable, ClassRosterSelect, AddGradeForm } from "@/components/ui/teacher_dashboard"
import { PlusIcon, ArrowDownTrayIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline"

export default function GradesPage() {
  const [showAddGradeForm, setShowAddGradeForm] = useState(false)
  const [selectedClass, setSelectedClass] = useState("class1")
  const [activeTab, setActiveTab] = useState("assessments")

  const handleAddGrade = (gradeData: any) => {
    console.log("Grade added:", gradeData)
    setShowAddGradeForm(false)
    // In a real app, you would add the grade to your state or database
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Grade Management</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Manage and review student grades and assessments</p>
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

      <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
        <CardContent className="pt-6">
          <ClassRosterSelect 
            onClassSelect={setSelectedClass}
            selectedClass={selectedClass}
          />
        </CardContent>
      </Card>

      <Tabs defaultValue="assessments" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg w-full max-w-md mb-6 grid grid-cols-2">
          <TabsTrigger 
            value="assessments"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm"
          >
            Assessments
          </TabsTrigger>
          <TabsTrigger 
            value="grade-book"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm"
          >
            Grade Book
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="assessments" className="mt-0">
          <AssessmentTable />
        </TabsContent>
        
        <TabsContent value="grade-book" className="mt-0">
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <CardHeader>
              <CardTitle>Grade Book</CardTitle>
              <CardDescription>Comprehensive view of all student grades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-slate-500 dark:text-slate-400">
                  Grade book view is coming soon. Use the Assessments tab to manage grades for now.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {showAddGradeForm && (
        <AddGradeForm 
          onClose={() => setShowAddGradeForm(false)}
          onSubmit={handleAddGrade}
        />
      )}
    </div>
  )
}