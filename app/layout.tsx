import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { defaultMetadata, generateOrganizationJsonLd } from "@/lib/seo"
import MinimalCursor from "@/components/ui/advanced-cursor"
import GlobalParticlesBackground from "@/components/ui/global-particles-background"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationJsonLd = generateOrganizationJsonLd()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-inter antialiased cursor-none relative`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          {/* Global Background */}
          <div className="fixed inset-0 -z-10">
            {/* Main Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-slate-900 dark:via-purple-900/20 dark:to-pink-900/20" />
            
            {/* Glassmorphism Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-purple-500/5 dark:from-slate-900/10 dark:to-purple-900/10" />
            
            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse" style={{ animation: 'float1 6s ease-in-out infinite' }} />
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse" style={{ animation: 'float2 8s ease-in-out infinite' }} />
            <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-pink-400/15 to-purple-400/15 rounded-full blur-lg animate-pulse" style={{ animation: 'float3 7s ease-in-out infinite' }} />
            <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-gradient-to-br from-indigo-400/15 to-blue-400/15 rounded-full blur-lg animate-pulse" style={{ animation: 'float4 9s ease-in-out infinite' }} />
          </div>

          {/* Global Particles - Separate layer for better control */}
          <div className="fixed inset-0 z-0">
            <GlobalParticlesBackground />
          </div>

          <MinimalCursor />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
