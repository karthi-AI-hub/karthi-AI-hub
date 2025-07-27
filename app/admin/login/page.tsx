"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { supabase, isSupabaseConfigured } from "@/lib/supabase-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Lock, Mail, Eye, EyeOff, Loader2, Shield, Sparkles } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [supabaseConfigured, setSupabaseConfigured] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
    setSupabaseConfigured(isSupabaseConfigured())

    // Only check auth if Supabase is configured
    if (!isSupabaseConfigured()) {
      toast({
        title: "Configuration Required",
        description: "Supabase environment variables are not configured",
        variant: "destructive",
      })
      return
    }

    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session) {
          // Check if user is admin
          const { data: adminUser } = await supabase
            .from("admin_users")
            .select("*")
            .eq("email", session.user.email)
            .single()

          if (adminUser) {
            router.push("/admin")
          }
        }
      } catch (error) {
        console.error("Auth check error:", error)
        toast({
          title: "Authentication Error",
          description: "Failed to check authentication status",
          variant: "destructive",
        })
      }
    }

    checkAuth()
  }, [router, toast])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!supabaseConfigured) {
      toast({
        title: "Configuration Error",
        description: "Supabase is not configured. Please set up environment variables.",
        variant: "destructive",
      })
      return
    }
    
    setLoading(true)

    try {
      // First, sign in the user
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (authError) {
        throw new Error(authError.message)
      }

      if (!authData.user) {
        throw new Error("Authentication failed")
      }

      // Check if user is admin
      const { data: adminUser, error: adminError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", email.trim())
        .single()

      if (adminError || !adminUser) {
        // Sign out the user if they're not an admin
        await supabase.auth.signOut()
        throw new Error("Unauthorized access. Admin privileges required.")
      }

      toast({
        title: "Login successful! 🎉",
        description: "Welcome to the Karthi–NexGen admin panel",
      })

      // Redirect to admin dashboard
      router.push("/admin")
    } catch (error: any) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-slate-900 dark:via-purple-900/20 dark:to-pink-900/20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Loader2 className="w-8 h-8 text-purple-600" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-slate-900 dark:via-purple-900/20 dark:to-pink-900/20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"
        />

        <motion.div
          animate={{
            y: [20, -20, 20],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-4 relative"
            >
              <div className="p-4 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-2xl w-16 h-16 flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-white" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-sm"
                />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </motion.div>
            </motion.div>

            <CardTitle className="text-2xl font-bold mb-2">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Admin Access
              </span>
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Sign in to access the Karthi–NexGen admin panel
            </CardDescription>
            
            {!supabaseConfigured && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-700 dark:text-red-300">
                  ⚠️ Supabase is not configured. Please set up your environment variables in .env.local
                </p>
              </div>
            )}
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                  <Input
                    type="email"
                    placeholder="Admin Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 h-12 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-purple-500 dark:focus:border-purple-400 rounded-xl transition-all duration-300 focus:shadow-lg focus:shadow-purple-500/10"
                  />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10 h-12 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-purple-500 dark:focus:border-purple-400 rounded-xl transition-all duration-300 focus:shadow-lg focus:shadow-purple-500/10"
                  />
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </motion.button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="mr-2"
                        >
                          <Loader2 className="w-4 h-4" />
                        </motion.div>
                        Signing in...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 w-4 h-4" />
                        Sign In
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center"
            >
              <p className="text-xs text-slate-500 dark:text-slate-400">
                🔒 Secure Admin access for Karthi–NexGen Portfolio Management
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
