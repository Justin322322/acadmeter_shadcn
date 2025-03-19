"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BellIcon,
  ShieldCheckIcon,
  PaintBrushIcon,
  BuildingLibraryIcon,
  UserCircleIcon,
  EnvelopeIcon,
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
    id: 'institution',
    title: 'Institution Settings',
    description: 'Configure your institution details and branding',
    icon: BuildingLibraryIcon,
    color: 'text-violet-500 dark:text-violet-400',
    bgColor: 'bg-violet-50 dark:bg-violet-900/20'
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
  },
  {
    id: 'email',
    title: 'Email Settings',
    description: 'Configure email notifications and templates',
    icon: EnvelopeIcon,
    color: 'text-orange-500 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20'
  }
]

export default function SettingsPage() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  const closeModal = () => setSelectedSection(null)

  return (
    <div className="space-y-6 container mx-auto px-4 py-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Settings</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your account and application preferences</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {settingsSections.map((section) => {
          const IconComponent = section.icon

          return (
            <Card
              key={section.id}
              className="cursor-pointer transition-all hover:shadow-md"
              onClick={() => setSelectedSection(section.id)}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${section.bgColor}`}>
                    <IconComponent className={`h-5 w-5 ${section.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-base">{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          )
        })}
      </div>

      {/* Modal */}
      {selectedSection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">
                  {settingsSections.find(s => s.id === selectedSection)?.title}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {settingsSections.find(s => s.id === selectedSection)?.description}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={closeModal}
              >
                <XMarkIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6">
              {selectedSection === 'profile' && (
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
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Role
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                        placeholder="Administrator"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedSection === 'security' && (
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
                      <Button className="mt-2">Update Password</Button>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                    <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Add an extra layer of security to your account
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                          Status: <span className="text-yellow-500">Not Configured</span>
                        </p>
                      </div>
                      <Button variant="outline">Configure 2FA</Button>
                    </div>
                  </div>
                </div>
              )}

              {selectedSection === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">System Updates</p>
                          <p className="text-sm text-slate-500">Get notified about important system updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-green-500 dark:peer-checked:bg-green-500"></div>
                          <span className="sr-only">Enable system updates notifications</span>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Security Alerts</p>
                          <p className="text-sm text-slate-500">Receive alerts about security issues</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-green-500 dark:peer-checked:bg-green-500"></div>
                          <span className="sr-only">Enable security alerts</span>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Marketing Updates</p>
                          <p className="text-sm text-slate-500">Receive marketing and promotional emails</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-green-500 dark:peer-checked:bg-green-500"></div>
                          <span className="sr-only">Enable marketing updates</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedSection === 'appearance' && (
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
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4">Layout Density</h3>
                    <div className="flex gap-4">
                      <Button variant="outline">Comfortable</Button>
                      <Button variant="outline">Compact</Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-700 pt-6">
                <Button variant="outline" onClick={closeModal}>Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}