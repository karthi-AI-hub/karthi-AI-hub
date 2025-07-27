"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, User, Lock, Database } from "lucide-react"

export default function AdminSetupGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Admin Panel Setup Guide</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Follow these steps to set up admin access for Karthi–NexGen portfolio
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Database className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle>1. Database Setup</CardTitle>
                <CardDescription>Run the database migration scripts</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Run scripts/01-create-tables.sql</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Run scripts/02-create-policies.sql</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Run scripts/03-seed-data.sql</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <CardTitle>2. Create Admin User in Supabase Auth</CardTitle>
                <CardDescription>Set up authentication in Supabase dashboard</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                    Important: Create user in Supabase Auth first
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-amber-700 dark:text-amber-300">
                    <li>Go to your Supabase project dashboard</li>
                    <li>Navigate to Authentication → Users</li>
                    <li>Click "Add user" and create admin account</li>
                    <li>Use email: karthikeyan@karthi-nexgen.com</li>
                    <li>Set a secure password</li>
                  </ol>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Lock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <CardTitle>3. Add Admin to Database</CardTitle>
                <CardDescription>Link the auth user to admin permissions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Run scripts/05-create-admin-user.sql</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
              <code className="text-sm text-slate-600 dark:text-slate-300">
                INSERT INTO admin_users (email) VALUES ('karthikeyan@karthi-nexgen.com');
              </code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <CardTitle>4. Test Admin Access</CardTitle>
                <CardDescription>Verify everything is working</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Step 1</Badge>
              <span className="text-sm">Navigate to /admin/login</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Step 2</Badge>
              <span className="text-sm">Login with admin credentials</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Step 3</Badge>
              <span className="text-sm">Access admin dashboard at /admin</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Setup Complete!</h3>
          </div>
          <p className="text-green-700 dark:text-green-300">
            Once all steps are completed, you'll have full admin access to manage your portfolio content, projects,
            skills, and more through the secure admin panel.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
