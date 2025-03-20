"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  PlusIcon,
  DocumentTextIcon,
  ClockIcon,
  UserGroupIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline"

interface Assignment {
  id: string
  title: string
  subject: string
  dueDate: string
  status: 'active' | 'draft' | 'closed'
  class: string
  submissionCount: number
  totalStudents: number
}

const mockAssignments: Assignment[] = [
  {
    id: "ASG001",
    title: "Mathematics Quiz - Algebra Basics",
    subject: "Mathematics",
    dueDate: "2024-02-15",
    status: "active",
    class: "Grade 10-A",
    submissionCount: 18,
    totalStudents: 25
  },
  {
    id: "ASG002",
    title: "Physics Lab Report - Wave Motion",
    subject: "Physics",
    dueDate: "2024-02-20",
    status: "active",
    class: "Grade 11-B",
    submissionCount: 15,
    totalStudents: 28
  },
  {
    id: "ASG003",
    title: "Chemistry Worksheet - Periodic Table",
    subject: "Chemistry",
    dueDate: "2024-02-10",
    status: "closed",
    class: "Grade 10-B",
    submissionCount: 22,
    totalStudents: 22
  },
  {
    id: "ASG004",
    title: "Mathematics Practice Problems",
    subject: "Mathematics",
    dueDate: "2024-02-25",
    status: "draft",
    class: "Grade 10-A",
    submissionCount: 0,
    totalStudents: 25
  }
]

export default function AssignmentsPage() {
  const [assignments] = useState<Assignment[]>(mockAssignments)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.class.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = selectedStatus === "all" || assignment.status === selectedStatus
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400'
      case 'draft':
        return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400'
      case 'closed':
        return 'bg-slate-50 text-slate-700 dark:bg-slate-950/50 dark:text-slate-400'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Assignments</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Create and manage your class assignments</p>
        </div>
        <Button className="gap-2">
          <PlusIcon className="w-4 h-4" />
          Create Assignment
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b border-slate-200 dark:border-slate-700">
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>All Assignments</CardTitle>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="closed">Closed</option>
              </select>
              <div className="relative flex-1">
                <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="search"
                  placeholder="Search assignments..."
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
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Assignment</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Class</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Due Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Submissions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssignments.map((assignment) => (
                    <tr
                      key={assignment.id}
                      className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium text-slate-900 dark:text-slate-100">{assignment.title}</div>
                          <div className="text-sm text-slate-500">{assignment.subject}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{assignment.class}</td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{assignment.dueDate}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(assignment.status)}`}>
                          {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-900 dark:text-slate-100">{assignment.submissionCount}</span>
                          <span className="text-slate-500 dark:text-slate-400">/ {assignment.totalStudents}</span>
                          {assignment.status === 'active' && assignment.submissionCount < assignment.totalStudents && (
                            <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-yellow-50 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400">
                              Pending
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}