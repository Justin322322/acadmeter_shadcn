"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface PerformanceArea {
  title: string;
  items: string[];
}

const performanceAreas: PerformanceArea[] = [
  {
    title: "Areas for Improvement",
    items: [
      "English essay structure needs more development",
      "Practice needed on algebra word problems"
    ]
  },
  {
    title: "Strengths",
    items: [
      "Excellent at science lab experiments and reports",
      "Strong analytical skills in mathematics"
    ]
  }
]

export function PerformanceAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {performanceAreas.map((area) => (
            <div key={area.title} className="space-y-3">
              <h3 className="text-lg font-semibold">{area.title}</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <tbody>
                    {area.items.map((item, index) => (
                      <tr key={index} className="border-b border-slate-200 dark:border-slate-700">
                        <td className="py-3 text-sm">
                          {item}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}