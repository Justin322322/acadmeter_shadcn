"use client"

import { Button } from "@/components/ui/button"

interface Props {
  onClassSelect: (classId: string) => void
  selectedClass: string
}

export function ClassRosterSelect({ onClassSelect, selectedClass }: Props) {
  // Mock class data - replace with real data from your backend
  const classes = [
    { id: "class1", name: "Mathematics 101" },
    { id: "class2", name: "Physics 101" },
    { id: "class3", name: "Chemistry 101" }
  ]

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
        Select Class
      </label>
      <div className="flex flex-wrap gap-2">
        {classes.map((cls) => (
          <Button
            key={cls.id}
            variant={selectedClass === cls.id ? "default" : "outline"}
            onClick={() => onClassSelect(cls.id)}
          >
            {cls.name}
          </Button>
        ))}
      </div>
    </div>
  )
}