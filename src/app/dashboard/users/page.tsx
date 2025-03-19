"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  CheckCircleIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  ShieldExclamationIcon
} from "@heroicons/react/24/outline"

type UserStatus = 'active' | 'pending' | 'suspended'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: UserStatus
  lastActive: string
  suspendedAt?: string
  suspendedReason?: string
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@school.edu",
    role: "Teacher",
    status: "pending",
    lastActive: "2024-01-15",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@school.edu",
    role: "Teacher",
    status: "active",
    lastActive: "2024-01-20",
  },
  {
    id: "3",
    name: "Emily Brown",
    email: "e.brown@school.edu",
    role: "Teacher",
    status: "suspended",
    lastActive: "2024-01-18",
    suspendedAt: "2024-01-19",
    suspendedReason: "Multiple policy violations"
  },
  {
    id: "4",
    name: "John Smith",
    email: "j.smith@school.edu",
    role: "Teacher",
    status: "suspended",
    lastActive: "2024-01-17",
    suspendedAt: "2024-01-18",
    suspendedReason: "Inactive account"
  }
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState("")

  const activeUsers = users.filter(user => user.status !== 'suspended')
  const suspendedUsers = users.filter(user => user.status === 'suspended')

  const handleStatusChange = (userId: string, newStatus: UserStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { 
        ...user, 
        status: newStatus,
        ...(newStatus === 'suspended' ? {
          suspendedAt: new Date().toISOString().split('T')[0],
          suspendedReason: "Account suspended by administrator"
        } : {
          suspendedAt: undefined,
          suspendedReason: undefined
        })
      } : user
    ))
  }

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'suspended':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    }
  }

  const UserTable = ({ users, showActions = true }: { users: User[], showActions?: boolean }) => (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-slate-200 dark:border-slate-700">
          <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Name</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Email</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Role</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Status</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Last Active</th>
          <th className="px-4 py-3 text-right text-sm font-medium text-slate-500 dark:text-slate-400">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
          >
            <td className="px-4 py-3">
              <div className="font-medium text-slate-900 dark:text-slate-100">{user.name}</div>
            </td>
            <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{user.email}</td>
            <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{user.role}</td>
            <td className="px-4 py-3">
              <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(user.status)}`}>
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </span>
            </td>
            <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{user.lastActive}</td>
            <td className="px-4 py-3">
              <div className="flex justify-end gap-2">
                {user.status === 'pending' && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/30"
                      onClick={() => handleStatusChange(user.id, 'active')}
                    >
                      <CheckCircleIcon className="h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
                      onClick={() => handleStatusChange(user.id, 'suspended')}
                    >
                      <XMarkIcon className="h-4 w-4" />
                      Reject
                    </Button>
                  </>
                )}
                {user.status === 'active' && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
                    onClick={() => handleStatusChange(user.id, 'suspended')}
                  >
                    <ShieldExclamationIcon className="h-4 w-4" />
                    Suspend
                  </Button>
                )}
                {user.status === 'suspended' && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1 text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/30"
                    onClick={() => handleStatusChange(user.id, 'active')}
                  >
                    <ArrowPathIcon className="h-4 w-4" />
                    Reactivate
                  </Button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">User Management</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Manage and monitor user accounts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FunnelIcon className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Active/Pending Users */}
        <Card>
          <CardHeader className="border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active & Pending Users</CardTitle>
                <CardDescription>Manage active and pending user accounts</CardDescription>
              </div>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <div className="relative flex-1">
                  <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type="search"
                    placeholder="Search users..."
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
              <UserTable users={activeUsers} />
            </div>
          </CardContent>
        </Card>

        {/* Suspended Users */}
        <Card>
          <CardHeader className="border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Suspended Users</CardTitle>
                <CardDescription>View and manage suspended accounts</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-6">
              <UserTable users={suspendedUsers} />
              {suspendedUsers.length === 0 && (
                <div className="text-center py-6 text-slate-500 dark:text-slate-400">
                  No suspended users
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}