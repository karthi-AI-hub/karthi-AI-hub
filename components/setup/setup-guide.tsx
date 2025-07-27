"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Circle, AlertCircle } from "lucide-react"

const setupSteps = [
  {
    id: 1,
    title: "Create Supabase Project",
    description: "Sign up at supabase.com and create a new project",
    status: "pending",
  },
  {
    id: 2,
    title: "Get Environment Variables",
    description: "Copy SUPABASE_URL and SUPABASE_ANON_KEY from project settings",
    status: "pending",
  },
  {
    id: 3,
    title: "Run Database Scripts",
    description: "Execute the SQL scripts in order: 01, 02, 03, 04",
    status: "pending",
  },
  {
    id: 4,
    title: "Configure Admin Email",
    description: "Update the admin email in script 04-setup-admin.sql",
    status: "pending",
  },
  {
    id: 5,
    title: "Enable Authentication",
    description: "Enable email authentication in Supabase Auth settings",
    status: "pending",
  },
]

export default function SetupGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Karthi–NexGen Portfolio Setup Guide</h1>
        <p className="text-slate-600 dark:text-slate-300">Follow these steps to configure your portfolio application</p>
      </div>

      <div className="space-y-4">
        {setupSteps.map((step) => (
          <Card key={step.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <span className="text-sm font-semibold text-purple-600">{step.id}</span>
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </div>
                <Badge variant="outline" className="ml-auto">
                  {step.status}
                </Badge>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            Important Notes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-2">
            <Circle className="w-4 h-4 mt-0.5 text-slate-400" />
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Make sure to update the admin email in the seed data before running the scripts
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Circle className="w-4 h-4 mt-0.5 text-slate-400" />
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Enable Row Level Security (RLS) is automatically handled by the scripts
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Circle className="w-4 h-4 mt-0.5 text-slate-400" />
            <p className="text-sm text-slate-600 dark:text-slate-300">
              The application will work immediately after database setup - no additional configuration needed
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
