"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BellIcon,
  ShieldCheckIcon,
  PaintBrushIcon,
  EnvelopeIcon,
  UserCircleIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ClockIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"

const settingsSections = [
  {
    id: 'profile',
    title: 'Profile Settings',
    description: 'Manage your profile information and preferences',
    icon: UserCircleIcon,
    color: 'text-blue-500 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  },
  {
    id: 'notifications',
    title: 'Notification Settings',
    description: 'Configure your notification preferences',
    icon: BellIcon,
    color: 'text-yellow-500 dark:text-yellow-400',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
  },
  {
    id: 'grading',
    title: 'Grading Preferences',
    description: 'Set up your grading scales and rubrics',
    icon: AcademicCapIcon,
    color: 'text-green-500 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/20'
  },
  {
    id: 'class',
    title: 'Class Settings',
    description: 'Manage class preferences and defaults',
    icon: BookOpenIcon,
    color: 'text-violet-500 dark:text-violet-400',
    bgColor: 'bg-violet-50 dark:bg-violet-900/20'
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Update your security settings and password',
    icon: ShieldCheckIcon,
    color: 'text-red-500 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-900/20'
  },
  {
    id: 'email',
    title: 'Email Preferences',
    description: 'Configure your email notifications and templates',
    icon: EnvelopeIcon,
    color: 'text-orange-500 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20'
  }
]

export default function TeacherSettingsPage() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [notifyNewSubmissions, setNotifyNewSubmissions] = useState(true)
  const [notifyDueReminders, setNotifyDueReminders] = useState(true)
  const [notifyStudentRequests, setNotifyStudentRequests] = useState(true)
  const [emailDigest, setEmailDigest] = useState('daily')
  const [gradingScale, setGradingScale] = useState('percentage')

  const closeModal = () => setSelectedSection(null)

  return (
    <div className="space-y-6 container mx-auto px-4 py-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Settings</h1>
          <p className="text-slate-500 dark:text-slate-400">Configure your teaching preferences and account settings</p>
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

      {/* Settings Modal */}
      {selectedSection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
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
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="p-6">
              {selectedSection === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Assignment Submissions</label>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Get notified when students submit assignments</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifyNewSubmissions}
                            onChange={(e) => setNotifyNewSubmissions(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-500"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Due Date Reminders</label>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Receive reminders for upcoming due dates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifyDueReminders}
                            onChange={(e) => setNotifyDueReminders(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-500"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Student Requests</label>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Get notified about student support requests</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifyStudentRequests}
                            onChange={(e) => setNotifyStudentRequests(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedSection === 'grading' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4">Grading Preferences</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Default Grading Scale</label>
                        <select
                          value={gradingScale}
                          onChange={(e) => setGradingScale(e.target.value)}
                          className="mt-1 block w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                        >
                          <option value="percentage">Percentage (0-100%)</option>
                          <option value="letter">Letter Grade (A-F)</option>
                          <option value="points">Points Based</option>
                          <option value="custom">Custom Scale</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedSection === 'email' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4">Email Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Digest Frequency</label>
                        <select
                          value={emailDigest}
                          onChange={(e) => setEmailDigest(e.target.value)}
                          className="mt-1 block w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                        >
                          <option value="realtime">Real-time</option>
                          <option value="daily">Daily Digest</option>
                          <option value="weekly">Weekly Summary</option>
                          <option value="never">Never</option>
                        </select>
                      </div>
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