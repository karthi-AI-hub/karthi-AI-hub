"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { supabase, isSupabaseConfigured } from "@/lib/supabase-client"
import type { User } from "@supabase/supabase-js"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"
import { Loader2 } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      // Skip auth check for login page to prevent infinite redirects
      if (pathname === '/admin/login') {
        setLoading(false)
        return
      }

      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        console.error("Supabase not configured")
        router.push("/admin/login")
        return
      }

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          router.push("/admin/login")
          return
        }

        // Check if user is admin
        const { data: adminUser } = await supabase
          .from("admin_users")
          .select("*")
          .eq("email", session.user.email || "")
          .single()

        if (!adminUser) {
          await supabase.auth.signOut()
          router.push("/admin/login")
          return
        }

        setUser(session.user)
      } catch (error) {
        console.error("Auth error:", error)
        router.push("/admin/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Only set up auth state listener if Supabase is configured
    if (isSupabaseConfigured()) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === "SIGNED_OUT" || !session) {
          router.push("/admin/login")
        }
      })

      return () => subscription.unsubscribe()
    }
  }, [router, pathname])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  // Render login page without admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader user={user} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
