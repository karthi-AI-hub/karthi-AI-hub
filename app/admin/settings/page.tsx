"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Settings, User, Bell, Shield, Palette, Globe, Database } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-600 dark:text-slate-300">Manage your admin panel settings and preferences</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your personal information and account details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <input
                  id="name"
                  type="text"
                  placeholder="Karthi Kumar"
                  className="w-full mt-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <input
                  id="email"
                  type="email"
                  placeholder="karthi@nexgen.com"
                  className="w-full mt-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                rows={3}
                placeholder="Full-stack developer passionate about creating amazing digital experiences..."
                className="w-full mt-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
              />
            </div>
            <Button>Save Profile</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how you want to be notified</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-slate-600 dark:text-slate-400">Receive email notifications for new messages</p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="contact-form">Contact Form Alerts</Label>
                <p className="text-sm text-slate-600 dark:text-slate-400">Get notified when someone submits the contact form</p>
              </div>
              <Switch id="contact-form" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="project-updates">Project Updates</Label>
                <p className="text-sm text-slate-600 dark:text-slate-400">Notifications for project status changes</p>
              </div>
              <Switch id="project-updates" />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security and authentication</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <p className="text-sm text-slate-600 dark:text-slate-400">Add an extra layer of security to your account</p>
              </div>
              <Badge variant="outline" className="text-orange-600">Not Enabled</Badge>
            </div>
            <Button variant="outline">Setup 2FA</Button>
            <Separator />
            <div>
              <Label>Change Password</Label>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Update your account password</p>
              <Button variant="outline">Change Password</Button>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Palette className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of your admin panel</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-slate-600 dark:text-slate-400">Toggle between light and dark themes</p>
              </div>
              <Switch id="dark-mode" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="compact-view">Compact View</Label>
                <p className="text-sm text-slate-600 dark:text-slate-400">Use a more compact layout for better space utilization</p>
              </div>
              <Switch id="compact-view" />
            </div>
          </CardContent>
        </Card>

        {/* Site Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle>Site Settings</CardTitle>
                <CardDescription>Configure your portfolio website settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="site-title">Site Title</Label>
              <input
                id="site-title"
                type="text"
                placeholder="Karthi Kumar - Full Stack Developer"
                className="w-full mt-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <Label htmlFor="site-description">Site Description</Label>
              <textarea
                id="site-description"
                rows={2}
                placeholder="Full-stack developer specializing in React, Node.js, and mobile app development..."
                className="w-full mt-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                <p className="text-sm text-slate-600 dark:text-slate-400">Enable maintenance mode for your site</p>
              </div>
              <Switch id="maintenance-mode" />
            </div>
            <Button>Save Site Settings</Button>
          </CardContent>
        </Card>

        {/* Database */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Database className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <CardTitle>Database & Backup</CardTitle>
                <CardDescription>Manage your data and backup settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Database Status</Label>
                <p className="text-sm text-slate-600 dark:text-slate-400">Current database connection status</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                Demo Mode
              </Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-backup">Automatic Backups</Label>
                <p className="text-sm text-slate-600 dark:text-slate-400">Enable automatic daily backups</p>
              </div>
              <Switch id="auto-backup" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Create Backup</Button>
              <Button variant="outline">Restore Backup</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
