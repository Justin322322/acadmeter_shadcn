"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ShieldCheckIcon,
  Cog6ToothIcon,
  GlobeAltIcon,
  ServerIcon,
  KeyIcon,
  BellIcon,
  EnvelopeIcon,
  CloudArrowUpIcon,
  ArrowPathIcon,
  CheckIcon
} from "@heroicons/react/24/outline"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">System Configuration</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Manage system settings and configurations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Settings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <nav className="space-y-1">
              {[
                { id: 'general', name: 'General', icon: Cog6ToothIcon, description: 'Basic settings' },
                { id: 'security', name: 'Security', icon: ShieldCheckIcon, description: 'Security settings' },
                { id: 'api', name: 'API', icon: KeyIcon, description: 'API configuration' },
                { id: 'notifications', name: 'Notifications', icon: BellIcon, description: 'Notification settings' },
                { id: 'email', name: 'Email', icon: EnvelopeIcon, description: 'Email configuration' },
                { id: 'backups', name: 'Backups', icon: CloudArrowUpIcon, description: 'Backup settings' },
                { id: 'integrations', name: 'Integrations', icon: ServerIcon, description: 'Third-party services' },
                { id: 'localization', name: 'Localization', icon: GlobeAltIcon, description: 'Language & region' }
              ].map((item) => (
                <button
                  key={item.id}
                  className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <div className={`p-2 rounded-lg ${
                    activeTab === item.id
                      ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  }`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${
                      activeTab === item.id
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-slate-900 dark:text-slate-100"
                    }`}>
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/30">
                  {activeTab === 'general' && <Cog6ToothIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />}
                  {activeTab === 'security' && <ShieldCheckIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />}
                  {activeTab === 'api' && <KeyIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />}
                  {activeTab === 'notifications' && <BellIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />}
                  {activeTab === 'email' && <EnvelopeIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />}
                  {activeTab === 'backups' && <CloudArrowUpIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />}
                  {activeTab === 'integrations' && <ServerIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />}
                  {activeTab === 'localization' && <GlobeAltIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />}
                </div>
                <div>
                  <CardTitle>
                    {activeTab === 'general' && 'General Settings'}
                    {activeTab === 'security' && 'Security Settings'}
                    {activeTab === 'api' && 'API Configuration'}
                    {activeTab === 'notifications' && 'Notification Settings'}
                    {activeTab === 'email' && 'Email Configuration'}
                    {activeTab === 'backups' && 'Backup Settings'}
                    {activeTab === 'integrations' && 'Integrations'}
                    {activeTab === 'localization' && 'Localization'}
                  </CardTitle>
                  <CardDescription>
                    {activeTab === 'general' && 'Configure basic system settings'}
                    {activeTab === 'security' && 'Manage security and authentication options'}
                    {activeTab === 'api' && 'Configure API access and keys'}
                    {activeTab === 'notifications' && 'Configure system notifications'}
                    {activeTab === 'email' && 'Configure email settings and templates'}
                    {activeTab === 'backups' && 'Configure system backup options'}
                    {activeTab === 'integrations' && 'Manage third-party service integrations'}
                    {activeTab === 'localization' && 'Configure language and regional settings'}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Site Name
                    </label>
                    <input
                      type="text"
                      defaultValue="My Admin Dashboard"
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Site Description
                    </label>
                    <textarea
                      rows={3}
                      defaultValue="Comprehensive admin dashboard for managing your application"
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Default Timezone
                    </label>
                    <select
                      defaultValue="UTC"
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Items Per Page
                    </label>
                    <select
                      defaultValue="20"
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Two-Factor Authentication
                      </label>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-500 dark:peer-checked:bg-indigo-500"></div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Require two-factor authentication for all admin users
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Password Expiration
                      </label>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-500 dark:peer-checked:bg-indigo-500"></div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Require password changes every 90 days
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Minimum Password Length
                    </label>
                    <select
                      defaultValue="8"
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                    >
                      <option value="6">6 characters</option>
                      <option value="8">8 characters</option>
                      <option value="10">10 characters</option>
                      <option value="12">12 characters</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Login Attempt Limits
                      </label>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-500 dark:peer-checked:bg-indigo-500"></div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Lock accounts after 5 failed login attempts
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'api' && (
                <div className="space-y-6">
                  <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">API Key</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          Use this key to authenticate API requests
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Regenerate
                      </Button>
                    </div>
                    <div className="mt-3 flex">
                      <input
                        type="text"
                        value="sk_live_51NzQjTLxEPHJJnCKNsdfghjkl5678dfghjkl5678dfghjkl"
                        readOnly
                        className="flex-1 rounded-l-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                      />
                      <Button className="rounded-l-none">
                        Copy
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Enable API Access
                      </label>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-500 dark:peer-checked:bg-indigo-500"></div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Allow external applications to access your data via API
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Rate Limiting
                    </label>
                    <select
                      defaultValue="1000"
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                    >
                      <option value="100">100 requests per minute</option>
                      <option value="500">500 requests per minute</option>
                      <option value="1000">1,000 requests per minute</option>
                      <option value="5000">5,000 requests per minute</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Webhook Notifications
                      </label>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-500 dark:peer-checked:bg-indigo-500"></div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Send webhook notifications for API events
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Email Notifications
                      </label>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-500 dark:peer-checked:bg-indigo-500"></div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Send email notifications for important system events
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Push Notifications
                      </label>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-500 dark:peer-checked:bg-indigo-500"></div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Enable browser push notifications
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Notification Frequency
                    </label>
                    <select
                      defaultValue="realtime"
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                    >
                      <option value="realtime">Real-time</option>
                      <option value="hourly">Hourly digest</option>
                      <option value="daily">Daily digest</option>
                      <option value="weekly">Weekly digest</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === 'email' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      SMTP Server
                    </label>
                    <input
                      type="text"
                      defaultValue="smtp.example.com"
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        SMTP Port
                      </label>
                      <input
                        type="text"
                        defaultValue="587"
                        className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Encryption
                      </label>
                      <select
                        defaultValue="tls"
                        className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                      >
                        <option value="none">None</option>
                        <option value="ssl">SSL</option>
                        <option value="tls">TLS</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      SMTP Username
                    </label>
                    <input
                      type="text"
                      defaultValue="user@example.com"
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      SMTP Password
                    </label>
                    <input
                      type="password"
                      defaultValue="password"
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      From Email
                    </label>
                    <input
                      type="email"
                      defaultValue="noreply@example.com"
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Send Test Email
                      </label>
                      <Button variant="outline" size="sm">
                        Send Test
                      </Button>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Send a test email to verify your configuration
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'backups' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Automatic Backups
                      </label>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-500 dark:peer-checked:bg-indigo-500"></div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Enable automatic system backups
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Backup Frequency
                    </label>
                    <select
                      defaultValue="daily"
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Backup Storage
                    </label>
                    <select
                      defaultValue="cloud"
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                    >
                      <option value="local">Local Storage</option>
                      <option value="cloud">Cloud Storage</option>
                      <option value="both">Both Local and Cloud</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Retention Period
                    </label>
                    <select
                      defaultValue="30"
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                    >
                      <option value="7">7 days</option>
                      <option value="30">30 days</option>
                      <option value="90">90 days</option>
                      <option value="365">365 days</option>
                    </select>
                  </div>
                  <div className="pt-4 flex gap-3">
                    <Button variant="outline" className="gap-2">
                      <CloudArrowUpIcon className="h-4 w-4" />
                      Create Backup Now
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <ArrowPathIcon className="h-4 w-4" />
                      Restore from Backup
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'integrations' && (
                <div className="space-y-6">
                  <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#1DA1F2] flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">X (Twitter)</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Connect your X account for social sharing
                          </p>
                        </div>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-500 dark:peer-checked:bg-indigo-500"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#4267B2] flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">Facebook</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Connect your Facebook account for social sharing
                          </p>
                        </div>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-500 dark:peer-checked:bg-indigo-500"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#FF0000] flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">YouTube</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Connect your YouTube account for video sharing
                          </p>
                        </div>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-500 dark:peer-checked:bg-indigo-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'localization' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Default Language
                    </label>
                    <select
                      defaultValue="en"
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="zh">Chinese</option>
                      <option value="ja">Japanese</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Date Format
                    </label>
                    <select
                      defaultValue="MM/DD/YYYY"
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Time Format
                    </label>
                    <select
                      defaultValue="12"
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                    >
                      <option value="12">12-hour (AM/PM)</option>
                      <option value="24">24-hour</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      First Day of Week
                    </label>
                    <select
                      defaultValue="sunday"
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                    >
                      <option value="sunday">Sunday</option>
                      <option value="monday">Monday</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-700 pt-6">
                <Button variant="outline">
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving || saveSuccess}>
                  {isSaving ? (
                    <>
                      <ArrowPathIcon className="h-4 w-4 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : saveSuccess ? (
                    <>
                      <CheckIcon className="h-4 w-4 mr-2" />
                      Saved
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}