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
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activeUsers = filteredUsers.filter(user => user.status !== 'suspended')
  const suspendedUsers = filteredUsers.filter(user => user.status === 'suspended')

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

  const UserTable = ({ users, title }: { users: User[], title?: string }) => (
    <div className="space-y-4">
      {title && <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">{title}</h3>}
      
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
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
        {users.length === 0 && (
          <div className="text-center py-6 text-slate-500 dark:text-slate-400">
            No users found
          </div>
        )}
      </div>

      {/* Mobile View */}
      <div className="grid gap-3 md:hidden">
        {users.map((user) => (
          <Card key={user.id} className="overflow-hidden">
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-start gap-2">
                <div className="space-y-1">
                  <h3 className="font-medium text-slate-900 dark:text-slate-100">{user.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
                </div>
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(user.status)}`}>
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Role</p>
                  <p className="font-medium text-slate-900 dark:text-slate-100">{user.role}</p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Last Active</p>
                  <p className="font-medium text-slate-900 dark:text-slate-100">{user.lastActive}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {user.status === 'pending' && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 gap-1 text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/30"
                      onClick={() => handleStatusChange(user.id, 'active')}
                    >
                      <CheckCircleIcon className="h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
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
                    className="w-full gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
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
                    className="w-full gap-1 text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/30"
                    onClick={() => handleStatusChange(user.id, 'active')}
                  >
                    <ArrowPathIcon className="h-4 w-4" />
                    Reactivate
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {users.length === 0 && (
          <div className="text-center py-6 text-slate-500 dark:text-slate-400">
            No users found
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">User Management</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">Manage and monitor user accounts</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="search"
              placeholder="Search users..."
              className="w-full rounded-md border border-slate-200 bg-white pl-9 pr-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0">
            <FunnelIcon className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Active/Pending Users */}
        <Card>
          <CardHeader>
            <CardTitle>Active & Pending Users</CardTitle>
            <CardDescription>Manage active and pending user accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <UserTable users={activeUsers} />
          </CardContent>
        </Card>

        {/* Suspended Users */}
        <Card>
          <CardHeader>
            <CardTitle>Suspended Users</CardTitle>
            <CardDescription>View and manage suspended accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <UserTable users={suspendedUsers} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}