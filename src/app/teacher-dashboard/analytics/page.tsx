"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PredictiveAnalytics, RiskAnalysis } from "@/components/ui/teacher_dashboard"
import { ChartBarIcon, UsersIcon, FireIcon } from "@heroicons/react/24/outline"

export default function TeacherAnalyticsPage() {
  const [activeTab, setActiveTab] = useState("predictive")
  
  // Mock risk student data
  const studentRisk = {
    studentId: "st25",
    studentName: "Alex Thompson",
    riskLevel: "high" as "high" | "medium" | "low",
    overallScore: 58,
    lastUpdated: "Yesterday",
    factors: [
      {
        factor: "Assignment Completion",
        impact: "high" as "high" | "medium" | "low",
        trend: "worsening" as "improving" | "stable" | "worsening",
        details: "Missing 5 recent assignments across multiple subjects",
        recommendations: [
          "Set up a weekly progress check",
          "Create a structured assignment calendar",
          "Schedule a one-on-one session to address challenges"
        ]
      },
      {
        factor: "Class Participation",
        impact: "medium" as "high" | "medium" | "low",
        trend: "stable" as "improving" | "stable" | "worsening",
        details: "Low engagement in classroom discussions",
        recommendations: [
          "Create opportunities for small group discussions",
          "Assign specific participation roles"
        ]
      },
      {
        factor: "Test Performance",
        impact: "high" as "high" | "medium" | "low",
        trend: "worsening" as "improving" | "stable" | "worsening",
        details: "Scores have dropped significantly in the last three assessments",
        recommendations: [
          "Review study techniques",
          "Offer additional practice tests",
          "Consider assessment accommodations if needed"
        ]
      }
    ]
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Analytics Dashboard</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Monitor student performance trends and identify areas that need attention</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-slate-200 dark:border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                <ChartBarIcon className="w-5 h-5 text-blue-600 dark:text-blue-500" />
              </div>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Overall</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">87.4%</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Class average</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50">
                <UsersIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
              </div>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Students</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">112</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Above target performance</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50">
                <FireIcon className="w-5 h-5 text-amber-600 dark:text-amber-500" />
              </div>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">At-risk</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">16</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Students needing intervention</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="predictive" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="flex space-x-2 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg w-fit mb-6">
          <TabsTrigger 
            value="predictive"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm px-4 py-2"
          >
            Predictive Analytics
          </TabsTrigger>
          <TabsTrigger 
            value="risk"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm px-4 py-2"
          >
            Risk Analysis
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="predictive" className="mt-0">
          <PredictiveAnalytics />
        </TabsContent>
        
        <TabsContent value="risk" className="mt-0">
          <RiskAnalysis 
            student={studentRisk} 
            onGeneratePlan={() => console.log("Generate improvement plan")}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}