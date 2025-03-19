"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  UsersIcon,
  KeyIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"

interface ActivityLog {
  id: string
  type: string
  message: string
  timestamp: string
  user?: string
  ipAddress?: string
  severity: 'info' | 'warning' | 'error'
}

const mockLogs: ActivityLog[] = [
  {
    id: "1",
    type: "USER_LOGIN",
    message: "Successful login",
    timestamp: "2024-01-20 15:30:25",
    user: "sarah.j@school.edu",
    ipAddress: "192.168.1.100",
    severity: "info"
  },
  {
    id: "2",
    type: "USER_APPROVAL",
    message: "New user account approved",
    timestamp: "2024-01-20 15:15:10",
    user: "admin@acadmeter.com",
    severity: "info"
  },
  {
    id: "3",
    type: "FAILED_LOGIN",
    message: "Failed login attempt - invalid credentials",
    timestamp: "2024-01-20 14:55:30",
    ipAddress: "192.168.1.105",
    severity: "warning"
  },
  {
    id: "4",
    type: "SYSTEM_ERROR",
    message: "Database connection timeout",
    timestamp: "2024-01-20 14:30:15",
    severity: "error"
  },
]

export default function ActivityPage() {
  const [logs] = useState<ActivityLog[]>(mockLogs)
  const [filterSeverity, setFilterSeverity] = useState<string>('all')

  const getIconForType = (type: string) => {
    switch (type) {
      case 'USER_LOGIN':
      case 'USER_APPROVAL':
        return UsersIcon
      case 'FAILED_LOGIN':
        return KeyIcon
      case 'SYSTEM_ERROR':
        return ExclamationTriangleIcon
      default:
        return ShieldCheckIcon
    }
  }

  const getSeverityColor = (severity: ActivityLog['severity']) => {
    switch (severity) {
      case 'info':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'error':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    }
  }

  const filteredLogs = filterSeverity === 'all' 
    ? logs 
    : logs.filter(log => log.severity === filterSeverity)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Activity Logs</h1>
          <p className="text-slate-500 dark:text-slate-400">Monitor system activity and user actions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FunnelIcon className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2">
            <ArrowDownTrayIcon className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <CardTitle>System Events</CardTitle>
            <div className="flex items-center gap-4">
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="all">All Severities</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
              <div className="relative flex-1">
                <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="search"
                  placeholder="Search logs..."
                  className="w-full rounded-md border border-slate-200 bg-white pl-8 pr-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-6 space-y-4">
            {filteredLogs.map((log) => {
              const IconComponent = getIconForType(log.type)
              return (
                <div
                  key={log.id}
                  className="flex items-start gap-4 rounded-lg border border-slate-200 p-4 dark:border-slate-700"
                >
                  <div className={`p-2 rounded-full ${getSeverityColor(log.severity)}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {log.type}
                      </p>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {log.timestamp}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">{log.message}</p>
                    {(log.user || log.ipAddress) && (
                      <div className="flex gap-4 text-sm text-slate-500 dark:text-slate-400">
                        {log.user && <span>User: {log.user}</span>}
                        {log.ipAddress && <span>IP: {log.ipAddress}</span>}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}