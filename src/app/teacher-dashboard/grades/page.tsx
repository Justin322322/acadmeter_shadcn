"use client"

import { AssessmentTable } from "@/components/ui/teacher_dashboard/assessment-table"
import { ClassRosterSelect } from "@/components/ui/teacher_dashboard/class-roster-select"
import { useState } from "react"
import { Card } from "@/components/ui/card"

export default function GradesPage() {
  const [selectedClass, setSelectedClass] = useState<string>("")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Grade Management</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Manage and track student assessments</p>
      </div>

      <Card className="p-4">
        <ClassRosterSelect
          onClassSelect={setSelectedClass}
          selectedClass={selectedClass}
        />
      </Card>

      {selectedClass && <AssessmentTable />}
    </div>
  )
}