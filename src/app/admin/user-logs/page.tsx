"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  UserCircleIcon,
  CalendarIcon,
  DocumentTextIcon,
  CogIcon,
  BookOpenIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline"

// Log entry types and colors
const logTypes = {
  "user-login": { icon: UserCircleIcon, bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400" },
  "user-signup": { icon: UserCircleIcon, bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-600 dark:text-green-400" },
  "content-update": { icon: DocumentTextIcon, bg: "bg-violet-100 dark:bg-violet-900/30", text: "text-violet-600 dark:text-violet-400" },
  "system-config": { icon: CogIcon, bg: "bg-slate-100 dark:bg-slate-900/30", text: "text-slate-600 dark:text-slate-400" },
  "data-export": { icon: ArrowDownTrayIcon, bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-400" },
  "content-create": { icon: BookOpenIcon, bg: "bg-teal-100 dark:bg-teal-900/30", text: "text-teal-600 dark:text-teal-400" },
  "security-alert": { icon: ExclamationTriangleIcon, bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-600 dark:text-red-400" },
}

// Mock activity logs
const mockLogs = [
  {
    id: "log-001",
    type: "user-login",
    user: "Maria Johnson",
    userId: "user-0042",
    userEmail: "maria.johnson@example.com",
    timestamp: "2025-03-28T09:23:14",
    description: "User login from Chrome/Windows",
    ipAddress: "192.168.1.42"
  },
  {
    id: "log-002",
    type: "content-update",
    user: "Michael Chen",
    userId: "user-0036",
    userEmail: "m.chen@example.com",
    timestamp: "2025-03-28T09:45:22",
    description: "Updated article 'Getting Started with Our Platform'",
    ipAddress: "192.168.1.36"
  },
  {
    id: "log-003",
    type: "user-signup",
    user: "Robert Williams",
    userId: "pending-0015",
    userEmail: "r.williams@example.com",
    timestamp: "2025-03-28T10:12:05",
    description: "New user sign-up",
    ipAddress: "192.168.1.87"
  },
  {
    id: "log-004",
    type: "system-config",
    user: "Admin User",
    userId: "admin-001",
    userEmail: "admin@example.com",
    timestamp: "2025-03-28T11:05:31",
    description: "Updated system settings",
    ipAddress: "192.168.1.2"
  },
  {
    id: "log-005",
    type: "data-export",
    user: "James Smith",
    userId: "user-0022",
    userEmail: "j.smith@example.com",
    timestamp: "2025-03-27T16:32:45",
    description: "Exported user data",
    ipAddress: "192.168.1.54"
  },
  {
    id: "log-006",
    type: "content-create",
    user: "Admin User",
    userId: "admin-001",
    userEmail: "admin@example.com",
    timestamp: "2025-03-27T13:17:22",
    description: "Created new page 'Privacy Policy'",
    ipAddress: "192.168.1.2"
  },
  {
    id: "log-007",
    type: "security-alert",
    user: "System",
    userId: "system",
    userEmail: "system@example.com",
    timestamp: "2025-03-27T08:45:12",
    description: "Failed login attempt for account: j.thompson@example.com",
    ipAddress: "198.51.100.42"
  },
  {
    id: "log-008",
    type: "user-login",
    user: "Emily Chen",
    userId: "user-0018",
    userEmail: "e.chen@example.com",
    timestamp: "2025-03-27T08:05:33",
    description: "User login from Safari/MacOS",
    ipAddress: "192.168.1.65"
  },
  {
    id: "log-009",
    type: "content-update",
    user: "Emily Chen",
    userId: "user-0018",
    userEmail: "e.chen@example.com",
    timestamp: "2025-03-27T08:22:54",
    description: "Updated article 'Advanced User Management Techniques'",
    ipAddress: "192.168.1.65"
  },
  {
    id: "log-010",
    type: "system-config",
    user: "Admin User",
    userId: "admin-001",
    userEmail: "admin@example.com",
    timestamp: "2025-03-26T15:41:09",
    description: "Configured automatic database backup schedule",
    ipAddress: "192.168.1.2"
  },
  {
    id: "log-011",
    type: "data-export",
    user: "Daniel Lee",
    userId: "user-0022",
    userEmail: "d.lee@example.com",
    timestamp: "2025-03-26T14:18:45",
    description: "Exported analytics reports",
    ipAddress: "192.168.1.78"
  },
  {
    id: "log-012",
    type: "user-signup",
    user: "Sophia Rodriguez",
    userId: "pending-0014",
    userEmail: "s.rodriguez@example.com",
    timestamp: "2025-03-26T11:32:17",
    description: "New user sign-up",
    ipAddress: "192.168.1.96"
  },
]

export default function UserLogsPage() {
  const [selectedLogTypes, setSelectedLogTypes] = useState<string[]>([])
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter logs based on selected criteria
  const filteredLogs = mockLogs.filter(log => {
    // Filter by log type
    if (selectedLogTypes.length > 0 && !selectedLogTypes.includes(log.type)) {
      return false
    }
    
    // Filter by search query
    if (searchQuery && 
        !log.user.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !log.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !log.userEmail.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    // Filter by date range
    if (startDate && new Date(log.timestamp) < startDate) {
      return false
    }
    
    if (endDate) {
      const endDateWithTime = new Date(endDate)
      endDateWithTime.setHours(23, 59, 59, 999) // End of the selected day
      if (new Date(log.timestamp) > endDateWithTime) {
        return false
      }
    }
    
    return true
  })

  // Toggle log type filter
  const toggleLogType = (type: string) => {
    setSelectedLogTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    )
  }

  // Format timestamp for display
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true
    })
  }

  // Get time elapsed since the log entry
  const getTimeElapsed = (timestamp: string) => {
    const now = new Date()
    const logTime = new Date(timestamp)
    const diffMs = now.getTime() - logTime.getTime()
    
    const diffMins = Math.floor(diffMs / (1000 * 60))
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`
    
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
    
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays < 30) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
    
    const diffMonths = Math.floor(diffDays / 30)
    return `${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedLogTypes([])
    setStartDate(undefined)
    setEndDate(undefined)
    setSearchQuery("")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">User Activity Logs</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">Track and monitor user activities within the system</p>
        </div>
        <Button variant="outline" className="gap-2">
          <ArrowDownTrayIcon className="h-4 w-4" />
          Export Logs
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search and Date Range Group */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative md:col-span-3 lg:col-span-1">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="search"
                  placeholder="Search by user or action..."
                  className="w-full h-10 rounded-md border border-slate-200 bg-white pl-9 pr-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Date Range - Start Date */}
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal h-10"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-slate-500 dark:text-slate-400" />
                      {startDate ? format(startDate, "MMM d, yyyy") : "Start Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Date Range - End Date */}
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal h-10"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-slate-500 dark:text-slate-400" />
                      {endDate ? format(endDate, "MMM d, yyyy") : "End Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      disabled={date => startDate ? date < startDate : false}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Clear Filters Button */}
            <div className="flex-shrink-0">
              <Button 
                variant="outline" 
                size="default" 
                className="w-full h-10"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Log Type Filters */}
          <div className="mt-4 flex flex-wrap items-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 mr-2">Filter by type:</span>
            {Object.entries(logTypes).map(([type, { bg, text }]) => (
              <Badge 
                key={type}
                variant={selectedLogTypes.includes(type) ? "default" : "outline"} 
                className={`cursor-pointer ${selectedLogTypes.includes(type) ? "" : text} h-7 px-3`}
                onClick={() => toggleLogType(type)}
              >
                {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader className="p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Activity Logs</CardTitle>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {filteredLogs.length} {filteredLogs.length === 1 ? 'entry' : 'entries'}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => {
                const logTypeInfo = logTypes[log.type as keyof typeof logTypes]
                const LogIcon = logTypeInfo.icon
                
                return (
                  <div key={log.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <div className="flex gap-4">
                      <div className={`p-2 rounded-lg h-fit ${logTypeInfo.bg}`}>
                        <LogIcon className={`w-5 h-5 ${logTypeInfo.text}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                          <div>
                            <h3 className="text-base font-medium text-slate-900 dark:text-slate-100">
                              {log.description}
                            </h3>
                            <div className="mt-1 flex items-center gap-2 text-sm">
                              <span className="text-slate-600 dark:text-slate-300 font-medium">
                                {log.user}
                              </span>
                              <span className="text-slate-400">•</span>
                              <span className="text-slate-500 dark:text-slate-400">
                                {log.userEmail}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 sm:mt-0 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                            <ClockIcon className="h-3.5 w-3.5" />
                            <span title={formatDate(log.timestamp)}>{getTimeElapsed(log.timestamp)}</span>
                          </div>
                        </div>
                        
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                            <CalendarIcon className="h-3.5 w-3.5" />
                            <span>{formatDate(log.timestamp)}</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                            <UserCircleIcon className="h-3.5 w-3.5" />
                            <span>ID: {log.userId}</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                            <span>IP: {log.ipAddress}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                No matching log entries found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}