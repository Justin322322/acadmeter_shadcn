"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import {
  BellIcon,
  ShieldCheckIcon,
  PaintBrushIcon,
  UserCircleIcon,
  ChevronRightIcon,
  XMarkIcon
} from "@heroicons/react/24/outline"

const settingsSections = [
  {
    id: 'profile',
    title: 'Profile Settings',
    description: 'Manage your account details and preferences',
    icon: UserCircleIcon,
    color: 'text-blue-500 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  },
  {
    id: 'notifications',
    title: 'Notification Preferences',
    description: 'Customize your notification settings',
    icon: BellIcon,
    color: 'text-yellow-500 dark:text-yellow-400',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
  },
  {
    id: 'security',
    title: 'Security Settings',
    description: 'Manage security and authentication options',
    icon: ShieldCheckIcon,
    color: 'text-green-500 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/20'
  },
  {
    id: 'appearance',
    title: 'Appearance',
    description: 'Customize the look and feel of your dashboard',
    icon: PaintBrushIcon,
    color: 'text-pink-500 dark:text-pink-400',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20'
  }
]

export default function StudentSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false)

  // Function to render settings content
  const SettingsContent = ({ isMobile = false }: { isMobile?: boolean }) => {
    const containerClass = isMobile ? "" : "space-y-6"
    
    return (
      <div className={containerClass}>
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Profile Picture
              </label>
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                  <UserCircleIcon className="h-12 w-12 text-slate-400" />
                </div>
                <Button variant="outline">Change Photo</Button>
              </div>
            </div>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Student ID
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                  placeholder="Your student ID"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4">Email Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Assignment Reminders</p>
                    <p className="text-sm text-slate-500">Get notified about upcoming assignments</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-green-500 dark:peer-checked:bg-green-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Grade Notifications</p>
                    <p className="text-sm text-slate-500">Get notified when grades are posted</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-green-500 dark:peer-checked:bg-green-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Course Updates</p>
                    <p className="text-sm text-slate-500">Get notified about course announcements</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-green-500 dark:peer-checked:bg-green-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4">Password Change</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <Button>Update Password</Button>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">2FA Status</p>
                  <p className="text-sm text-slate-500">
                    Status: <span className="text-yellow-500">Not Configured</span>
                  </p>
                </div>
                <Button variant="outline">Configure 2FA</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4">Theme Preferences</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                  <div className="h-20 bg-white dark:bg-slate-900 rounded-md mb-2 flex items-center justify-center">
                    <PaintBrushIcon className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-sm font-medium text-center">Light</p>
                </div>
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                  <div className="h-20 bg-slate-900 rounded-md mb-2 flex items-center justify-center">
                    <PaintBrushIcon className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-sm font-medium text-center">Dark</p>
                </div>
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                  <div className="h-20 bg-gradient-to-b from-white to-slate-900 rounded-md mb-2 flex items-center justify-center">
                    <PaintBrushIcon className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-sm font-medium text-center">System</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Settings</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your account and learning preferences</p>
        </div>
      </div>

      {/* Mobile Settings List */}
      <div className="md:hidden divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg shadow-sm">
        {settingsSections.map((section) => {
          const IconComponent = section.icon
          return (
            <button
              key={section.id}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50"
              onClick={() => {
                setActiveTab(section.id)
                setIsMobileModalOpen(true)
              }}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${section.bgColor}`}>
                  <IconComponent className={`h-5 w-5 ${section.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{section.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{section.description}</p>
                </div>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-slate-400" />
            </button>
          )
        })}
      </div>

      {/* Mobile Settings Modal */}
      <Dialog open={isMobileModalOpen} onOpenChange={setIsMobileModalOpen}>
        <DialogContent className="sm:max-w-lg bg-white dark:bg-slate-800/50">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg ${settingsSections.find(s => s.id === activeTab)?.bgColor}`}>
                {activeTab && React.createElement(settingsSections.find(s => s.id === activeTab)?.icon as any, {
                  className: `h-5 w-5 ${settingsSections.find(s => s.id === activeTab)?.color}`
                })}
              </div>
              <DialogTitle>{settingsSections.find(s => s.id === activeTab)?.title}</DialogTitle>
            </div>
            <p className="text-sm text-slate-500">
              {settingsSections.find(s => s.id === activeTab)?.description}
            </p>
          </DialogHeader>
          
          <div className="mt-4">
            <SettingsContent isMobile={true} />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsMobileModalOpen(false)}>
              Cancel
            </Button>
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Settings Menu</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-200 dark:divide-slate-700/50">
              {settingsSections.map((section) => {
                const IconComponent = section.icon
                return (
                  <button
                    key={section.id}
                    className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${
                      activeTab === section.id
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300"
                        : "hover:bg-slate-50 dark:hover:bg-slate-700/50"
                    }`}
                    onClick={() => setActiveTab(section.id)}
                  >
                    <div className={`p-2 rounded-lg ${section.bgColor}`}>
                      <IconComponent className={`h-5 w-5 ${section.color}`} />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${
                        activeTab === section.id
                          ? "text-blue-600 dark:text-blue-300"
                          : "text-slate-900 dark:text-slate-100"
                      }`}>
                        {section.title}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${settingsSections.find(s => s.id === activeTab)?.bgColor}`}>
                  {activeTab && React.createElement(settingsSections.find(s => s.id === activeTab)?.icon as any, {
                    className: `h-5 w-5 ${settingsSections.find(s => s.id === activeTab)?.color}`
                  })}
                </div>
                <div>
                  <CardTitle>{settingsSections.find(s => s.id === activeTab)?.title}</CardTitle>
                  <CardDescription>
                    {settingsSections.find(s => s.id === activeTab)?.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <SettingsContent />
              <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-700/50 pt-6">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}