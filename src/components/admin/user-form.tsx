"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { XMarkIcon } from "@heroicons/react/24/outline"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'pending' | 'suspended' | 'inactive'
  lastActive: string
  registeredDate: string
  suspendedAt?: string
  suspendedReason?: string
  department?: string
  location?: string
  permissions?: string[]
}

interface UserFormProps {
  user: User | null
  onClose: () => void
  onSave: (data: Partial<User>) => void
}

export function UserForm({ user, onClose, onSave }: UserFormProps) {
  const [formData, setFormData] = useState<Partial<User>>({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'Viewer',
    department: user?.department || '',
    location: user?.location || '',
    permissions: user?.permissions || []
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handlePermissionChange = (permission: string) => {
    const currentPermissions = formData.permissions || []
    if (currentPermissions.includes(permission)) {
      setFormData({
        ...formData,
        permissions: currentPermissions.filter(p => p !== permission)
      })
    } else {
      setFormData({
        ...formData,
        permissions: [...currentPermissions, permission]
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            {user ? 'Edit User' : 'Add New User'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={onClose}
          >
            <XMarkIcon className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
              placeholder="Enter user's full name"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
              placeholder="Enter email address"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Role
              </label>
              <select
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Moderator">Moderator</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Department
              </label>
              <input
                type="text"
                value={formData.department || ''}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                placeholder="Enter department"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Location
            </label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
              placeholder="Enter location"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Permissions
            </label>
            <div className="grid grid-cols-2 gap-2 p-3 border border-slate-200 dark:border-slate-700 rounded-md">
              {[
                { id: 'users.view', label: 'View Users' },
                { id: 'users.manage', label: 'Manage Users' },
                { id: 'content.view', label: 'View Content' },
                { id: 'content.manage', label: 'Manage Content' },
                { id: 'content.publish', label: 'Publish Content' },
                { id: 'content.review', label: 'Review Content' },
                { id: 'settings.view', label: 'View Settings' },
                { id: 'settings.manage', label: 'Manage Settings' }
              ].map((permission) => (
                <div key={permission.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={permission.id}
                    checked={(formData.permissions || []).includes(permission.id)}
                    onChange={() => handlePermissionChange(permission.id)}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700"
                  />
                  <label htmlFor={permission.id} className="ml-2 text-sm text-slate-700 dark:text-slate-300">
                    {permission.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {user ? 'Update User' : 'Add User'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}