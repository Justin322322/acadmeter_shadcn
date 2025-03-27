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
  const [selectedRole, setSelectedRole] = useState<string>("all")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedTab, setSelectedTab] = useState<'active' | 'pending' | 'suspended'>('active')

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.role.toLowerCase() === selectedRole.toLowerCase()
    return matchesSearch && matchesRole
  })

  const activeUsers = filteredUsers.filter(user => user.status === 'active')
  const pendingUsers = filteredUsers.filter(user => user.status === 'pending')
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
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Edit User</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
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
            <DropdownMenuItem>
              <UserCircleIcon className="h-4 w-4 mr-2" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit User
            </DropdownMenuItem>
            <Separator className="my-2" />
            <DropdownMenuItem className="text-red-600">
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
        <div className="flex items-center gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="search"
              placeholder="Search users..."
              className="w-full rounded-md border border-slate-200 bg-white pl-9 pr-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <HoverCard>
            <HoverCardTrigger asChild>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0">
                      <FunnelIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSelectedRole("all")}>
                      All Roles
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedRole("teacher")}>
                      Teachers Only
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedRole("student")}>
                      Students Only
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedRole("admin")}>
                      Admins Only
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-48 text-sm" side="bottom">
              Filter users by role
            </HoverCardContent>
          </HoverCard>

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
        </div>
      </div>

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
      </div>

      <div className="mt-6">
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' 
            : 'space-y-2'
          }>
            {(selectedTab === 'active' ? activeUsers : 
              selectedTab === 'pending' ? pendingUsers : 
              suspendedUsers).map(user => (
              viewMode === 'grid' ? (
                <UserCardGrid key={user.id} user={user} />
              ) : (
                <UserCardList key={user.id} user={user} />
              )
            ))}
            {((selectedTab === 'active' && activeUsers.length === 0) ||
              (selectedTab === 'pending' && pendingUsers.length === 0) ||
              (selectedTab === 'suspended' && suspendedUsers.length === 0)) && (
              <div className={`text-center py-6 text-slate-500 ${
                viewMode === 'grid' ? 'col-span-full' : ''
              }`}>
                No {selectedTab} users found
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}