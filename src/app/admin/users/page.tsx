"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  CheckCircleIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  ShieldExclamationIcon,
  Squares2X2Icon,
  ListBulletIcon,
  UserCircleIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline"
import { UserForm } from "@/components/admin/user-form"

type UserStatus = 'active' | 'pending' | 'suspended' | 'inactive'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: UserStatus
  lastActive: string
  registeredDate: string
  suspendedAt?: string
  suspendedReason?: string
  department?: string
  location?: string
  permissions?: string[]
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    role: "Admin",
    status: "active",
    lastActive: "2025-03-20",
    registeredDate: "2024-01-15",
    department: "IT",
    location: "New York",
    permissions: ["users.manage", "content.manage", "settings.manage"]
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@example.com",
    role: "Editor",
    status: "active",
    lastActive: "2025-03-20",
    registeredDate: "2024-01-20",
    department: "Content",
    location: "San Francisco",
    permissions: ["content.manage", "content.publish"]
  },
  {
    id: "3",
    name: "Emily Brown",
    email: "e.brown@example.com",
    role: "Moderator",
    status: "suspended",
    lastActive: "2025-03-18",
    registeredDate: "2024-01-18",
    suspendedAt: "2025-03-19",
    suspendedReason: "Multiple policy violations",
    department: "Support",
    location: "Chicago",
    permissions: ["content.review"]
  },
  {
    id: "4",
    name: "John Smith",
    email: "j.smith@example.com",
    role: "Viewer",
    status: "inactive",
    lastActive: "2025-03-17",
    registeredDate: "2024-01-17",
    department: "Marketing",
    location: "Boston",
    permissions: ["content.view"]
  },
  {
    id: "5",
    name: "Alex Rodriguez",
    email: "a.rodriguez@example.com",
    role: "Editor",
    status: "pending",
    lastActive: "2025-03-20",
    registeredDate: "2025-03-20",
    department: "Content",
    location: "Miami",
    permissions: ["content.manage"]
  },
  {
    id: "6",
    name: "Jessica Lee",
    email: "j.lee@example.com",
    role: "Admin",
    status: "active",
    lastActive: "2025-03-19",
    registeredDate: "2024-02-10",
    department: "IT",
    location: "Seattle",
    permissions: ["users.manage", "content.manage", "settings.manage"]
  },
  {
    id: "7",
    name: "David Wilson",
    email: "d.wilson@example.com",
    role: "Moderator",
    status: "active",
    lastActive: "2025-03-18",
    registeredDate: "2024-02-15",
    department: "Support",
    location: "Denver",
    permissions: ["content.review"]
  },
  {
    id: "8",
    name: "Maria Garcia",
    email: "m.garcia@example.com",
    role: "Viewer",
    status: "pending",
    lastActive: "2025-03-20",
    registeredDate: "2025-03-20",
    department: "Sales",
    location: "Los Angeles",
    permissions: ["content.view"]
  }
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState<string>("all")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedTab, setSelectedTab] = useState<'active' | 'pending' | 'suspended' | 'inactive'>('active')
  const [showUserForm, setShowUserForm] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.role.toLowerCase() === selectedRole.toLowerCase()
    return matchesSearch && matchesRole
  })

  const activeUsers = filteredUsers.filter(user => user.status === 'active')
  const pendingUsers = filteredUsers.filter(user => user.status === 'pending')
  const suspendedUsers = filteredUsers.filter(user => user.status === 'suspended')
  const inactiveUsers = filteredUsers.filter(user => user.status === 'inactive')

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

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId))
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setShowUserForm(true)
  }

  const handleAddUser = () => {
    setSelectedUser(null)
    setShowUserForm(true)
  }

  const handleSaveUser = (userData: Partial<User>) => {
    if (selectedUser) {
      // Edit existing user
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, ...userData } : user
      ))
    } else {
      // Add new user
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || 'Viewer',
        status: 'active',
        lastActive: new Date().toISOString().split('T')[0],
        registeredDate: new Date().toISOString().split('T')[0],
        department: userData.department,
        location: userData.location,
        permissions: userData.permissions || ['content.view']
      }
      setUsers([...users, newUser])
    }
    setShowUserForm(false)
  }

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'suspended':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      case 'inactive':
        return 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400'
    }
  }

  const UserCardGrid = ({ user }: { user: User }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <UserCircleIcon className="h-7 w-7 text-slate-400" />
            </div>
            <div>
              <CardTitle className="text-base truncate">{user.name}</CardTitle>
              <CardDescription className="truncate">{user.email}</CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <EllipsisVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEditUser(user)}>Edit User</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteUser(user.id)}>Delete User</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-normal">
              {user.role}
            </Badge>
            <Badge className={getStatusColor(user.status)}>
              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-green-400"></div>
            <span className="text-slate-600 dark:text-slate-400">Last active: {user.lastActive}</span>
          </div>

          {user.suspendedAt && (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-red-400"></div>
                <span className="text-slate-600 dark:text-slate-400">Suspended: {user.suspendedAt}</span>
              </div>
              {user.suspendedReason && (
                <p className="text-red-600 dark:text-red-400 text-sm pl-4">
                  {user.suspendedReason}
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="p-4">
        <div className="flex gap-2 w-full">
          {user.status === 'pending' && (
            <>
              <Button 
                variant="default"
                size="sm"
                className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white"
                onClick={() => handleStatusChange(user.id, 'active')}
              >
                <CheckCircleIcon className="h-4 w-4 mr-2" />
                Approve
              </Button>
              <Button 
                variant="default"
                size="sm"
                className="flex-1 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white"
                onClick={() => handleStatusChange(user.id, 'suspended')}
              >
                <XMarkIcon className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </>
          )}
          {user.status === 'active' && (
            <Button 
              variant="default"
              size="sm"
              className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white"
              onClick={() => handleStatusChange(user.id, 'suspended')}
            >
              <ShieldExclamationIcon className="h-4 w-4 mr-2" />
              Suspend User
            </Button>
          )}
          {user.status === 'suspended' && (
            <Button 
              variant="default"
              size="sm"
              className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white"
              onClick={() => handleStatusChange(user.id, 'active')}
            >
              <ArrowPathIcon className="h-4 w-4 mr-2" />
              Reactivate User
            </Button>
          )}
          {user.status === 'inactive' && (
            <Button 
              variant="default"
              size="sm"
              className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white"
              onClick={() => handleStatusChange(user.id, 'active')}
            >
              <ArrowPathIcon className="h-4 w-4 mr-2" />
              Activate User
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )

  const UserCardList = ({ user }: { user: User }) => (
    <div className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
      {/* User Info Section */}
      <div className="flex items-center gap-3 min-w-[240px] max-w-full sm:max-w-[240px]">
        <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
          <UserCircleIcon className="h-6 w-6 text-slate-400" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-slate-900 dark:text-slate-100 truncate">{user.name}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-normal">
                {user.role}
              </Badge>
              <Badge className={getStatusColor(user.status)}>
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-green-400"></div>
              <span className="text-slate-600 dark:text-slate-400">Last active: {user.lastActive}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
        {user.status === 'pending' && (
          <>
            <Button 
              variant="default"
              size="sm"
              className="flex-1 sm:flex-initial justify-center sm:w-[100px] bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white gap-2"
              onClick={() => handleStatusChange(user.id, 'active')}
            >
              <CheckCircleIcon className="h-4 w-4" />
              <span>Approve</span>
            </Button>
            <Button 
              variant="default"
              size="sm"
              className="flex-1 sm:flex-initial justify-center sm:w-[100px] bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white gap-2"
              onClick={() => handleStatusChange(user.id, 'suspended')}
            >
              <XMarkIcon className="h-4 w-4" />
              <span>Reject</span>
            </Button>
          </>
        )}
        {user.status === 'active' && (
          <Button 
            variant="default"
            size="sm"
            className="flex-1 sm:flex-initial justify-center sm:w-[100px] bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white gap-2"
            onClick={() => handleStatusChange(user.id, 'suspended')}
          >
            <ShieldExclamationIcon className="h-4 w-4" />
            <span>Suspend</span>
          </Button>
        )}
        {user.status === 'suspended' && (
          <Button 
            variant="default"
            size="sm"
            className="flex-1 sm:flex-initial justify-center sm:w-[100px] bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white gap-2"
            onClick={() => handleStatusChange(user.id, 'active')}
          >
            <ArrowPathIcon className="h-4 w-4" />
            <span>Reactivate</span>
          </Button>
        )}
        {user.status === 'inactive' && (
          <Button 
            variant="default"
            size="sm"
            className="flex-1 sm:flex-initial justify-center sm:w-[100px] bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white gap-2"
            onClick={() => handleStatusChange(user.id, 'active')}
          >
            <ArrowPathIcon className="h-4 w-4" />
            <span>Activate</span>
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-9 w-9 rounded-full border-slate-200 dark:border-slate-700 flex-shrink-0"
            >
              <EllipsisVerticalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
            <DropdownMenuItem onClick={() => handleEditUser(user)}>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit User
            </DropdownMenuItem>
            <Separator className="my-2" />
            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteUser(user.id)}>
              <TrashIcon className="h-4 w-4 mr-2" />
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
        <Button onClick={handleAddUser} className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users..."
                className="w-full pl-9 pr-4 py-2 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 text-sm"
              />
            </div>
            <div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 text-sm"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="moderator">Moderator</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            <div className="flex justify-end">
              <div className="flex items-center gap-2">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0"
                      onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                    >
                      {viewMode === 'grid' ? (
                        <ListBulletIcon className="h-4 w-4" />
                      ) : (
                        <Squares2X2Icon className="h-4 w-4" />
                      )}
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-48 text-sm" side="bottom">
                    Switch to {viewMode === 'grid' ? 'list' : 'grid'} view
                  </HoverCardContent>
                </HoverCard>

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0">
                      <FunnelIcon className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-48 text-sm" side="bottom">
                    Additional filters
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex border dark:border-slate-800 rounded-lg p-1 bg-slate-50 dark:bg-slate-900">
        <button
          onClick={() => setSelectedTab('active')}
          className={`flex-1 flex flex-col items-center px-4 py-3 rounded-md transition-colors ${
            selectedTab === 'active'
              ? 'bg-white dark:bg-slate-800 shadow-sm'
              : 'hover:bg-white/50 dark:hover:bg-slate-800/50'
          }`}
        >
          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Active</span>
          <span className={`mt-1 text-2xl font-bold ${
            selectedTab === 'active'
              ? 'text-green-600 dark:text-green-500'
              : 'text-slate-900 dark:text-slate-100'
          }`}>
            {activeUsers.length}
          </span>
        </button>

        <button
          onClick={() => setSelectedTab('pending')}
          className={`flex-1 flex flex-col items-center px-4 py-3 rounded-md transition-colors ${
            selectedTab === 'pending'
              ? 'bg-white dark:bg-slate-800 shadow-sm'
              : 'hover:bg-white/50 dark:hover:bg-slate-800/50'
          }`}
        >
          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Pending</span>
          <span className={`mt-1 text-2xl font-bold ${
            selectedTab === 'pending'
              ? 'text-amber-600 dark:text-amber-500'
              : 'text-slate-900 dark:text-slate-100'
          }`}>
            {pendingUsers.length}
          </span>
        </button>

        <button
          onClick={() => setSelectedTab('suspended')}
          className={`flex-1 flex flex-col items-center px-4 py-3 rounded-md transition-colors ${
            selectedTab === 'suspended'
              ? 'bg-white dark:bg-slate-800 shadow-sm'
              : 'hover:bg-white/50 dark:hover:bg-slate-800/50'
          }`}
        >
          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Suspended</span>
          <span className={`mt-1 text-2xl font-bold ${
            selectedTab === 'suspended'
              ? 'text-red-600 dark:text-red-500'
              : 'text-slate-900 dark:text-slate-100'
          }`}>
            {suspendedUsers.length}
          </span>
        </button>

        <button
          onClick={() => setSelectedTab('inactive')}
          className={`flex-1 flex flex-col items-center px-4 py-3 rounded-md transition-colors ${
            selectedTab === 'inactive'
              ? 'bg-white dark:bg-slate-800 shadow-sm'
              : 'hover:bg-white/50 dark:hover:bg-slate-800/50'
          }`}
        >
          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Inactive</span>
          <span className={`mt-1 text-2xl font-bold ${
            selectedTab === 'inactive'
              ? 'text-slate-600 dark:text-slate-500'
              : 'text-slate-900 dark:text-slate-100'
          }`}>
            {inactiveUsers.length}
          </span>
        </button>
      </div>

      <div className="mt-6">
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' 
            : 'space-y-2'
          }>
            {(selectedTab === 'active' ? activeUsers : 
              selectedTab === 'pending' ? pendingUsers : 
              selectedTab === 'suspended' ? suspendedUsers :
              inactiveUsers).map(user => (
              viewMode === 'grid' ? (
                <UserCardGrid key={user.id} user={user} />
              ) : (
                <UserCardList key={user.id} user={user} />
              )
            ))}
            {((selectedTab === 'active' && activeUsers.length === 0) ||
              (selectedTab === 'pending' && pendingUsers.length === 0) ||
              (selectedTab === 'suspended' && suspendedUsers.length === 0) ||
              (selectedTab === 'inactive' && inactiveUsers.length === 0)) && (
              <div className={`text-center py-6 text-slate-500 ${
                viewMode === 'grid' ? 'col-span-full' : ''
              }`}>
                No {selectedTab} users found
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* User Form Modal */}
      {showUserForm && (
        <UserForm 
          user={selectedUser}
          onClose={() => setShowUserForm(false)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  )
}