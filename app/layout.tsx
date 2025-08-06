import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { defaultMetadata, generateOrganizationJsonLd, generateJsonLd } from "@/lib/seo"
import GlobalParticlesBackground from "@/components/ui/global-particles-background"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { FirebaseAnalytics } from "@/components/firebase-analytics"
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
  const personJsonLd = generateJsonLd("person")
  const portfolioJsonLd = generateJsonLd("portfolio")

  // Additional structured data for better keyword indexing
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://karthi-nexgen.tech/#website",
    url: "https://karthi-nexgen.tech",
    name: "Karthi NexGen - Expert Developer & Freelancer | Flutter Developer | Mobile Developer",
    description: "NexGen's expert developer and freelancer. Professional Flutter developer, mobile developer, React specialist. Top-rated freelancer delivering premium mobile app development, Android development, web development, and full-stack solutions.",
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://karthi-nexgen.tech/?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    author: {
      "@type": "Person",
      name: "Karthikeyan S",
      "@id": "https://karthi-nexgen.tech/#person"
    },
    keywords: "Karthi, NexGen, Karthi NexGen, Karthi-NexGen, Developer, Freelancer, Tamil Nadu Developer, Tamil Nadu Freelancer, Best Developer, Best Developer Tamil Nadu, Mobile Developer, Flutter Developer, Flutter Developer Tamil Nadu, Mobile Developer Tamil Nadu, Android Developer, React Developer, Full-Stack Developer, Web Developer, App Developer, Best Flutter Developer, Expert Flutter Developer, Professional Flutter Developer, Tamil Nadu Software Developer, Best Developer in Tamil Nadu, Top Developer Tamil Nadu, Expert Developer Tamil Nadu, Professional Developer Tamil Nadu, Tamil Nadu Mobile App Developer, Tamil Nadu Web Developer"
  }

  // Professional Service structured data
  const professionalServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://karthi-nexgen.tech/#service",
    name: "Karthi NexGen Development Services - Expert Developer & Freelancer",
    description: "Professional freelance development services by NexGen's expert developer. Professional Flutter mobile app development, React web development, Android app development, and full-stack solutions. Top-rated freelancer for hire.",
    url: "https://karthi-nexgen.tech",
    telephone: "+91-XXX-XXX-XXXX",
    email: "me@karthi-nexgen.tech",
    provider: {
      "@type": "Person",
      name: "Karthikeyan S (Karthi)",
      "@id": "https://karthi-nexgen.tech/#person"
    },
    areaServed: [
      {
        "@type": "Place",
        name: "Tamil Nadu, India"
      },
      {
        "@type": "Place", 
        name: "India"
      },
      {
        "@type": "Place",
        name: "Worldwide"
      }
    ],
    serviceType: [
      "Expert Developer Services",
      "Flutter Mobile App Development", 
      "React Web Development",
      "Android App Development",
      "Mobile Developer Services",
      "Node.js Backend Development",
      "Express.js API Development",
      "Next.js Web Applications",
      "Full-Stack Development",
      "Mobile App Development",
      "Web Application Development",
      "Cloud Solutions Development",
      "Professional Freelance Services",
      "Professional Development Services"
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Expert Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Expert Flutter Developer",
            description: "Professional Flutter mobile app development by expert developer"
          }
        },
        {
          "@type": "Offer", 
          itemOffered: {
            "@type": "Service",
            name: "Mobile Developer Services Tamil Nadu",
            description: "Professional mobile app development services by top Tamil Nadu developer"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Tamil Nadu Freelancer Services",
            description: "Premium freelance development services by best Tamil Nadu developer"
          }
        }
      ]
    },
    priceRange: "$$",
    availableLanguage: ["English", "Tamil"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "30"
    }
  }

  // Breadcrumb structured data for better navigation
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://karthi-nexgen.tech"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Flutter Developer",
        item: "https://karthi-nexgen.tech/#skills"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "React Developer",
        item: "https://karthi-nexgen.tech/#skills"
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Mobile App Development",
        item: "https://karthi-nexgen.tech/#services"
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Portfolio Projects",
        item: "https://karthi-nexgen.tech/projects"
      }
    ]
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Multiple structured data for comprehensive SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        
        {/* Enhanced meta tags for better keyword targeting */}
        <meta name="keywords" content="Karthi, NexGen, Karthi NexGen, Karthi-NexGen, Developer, Freelancer, Tamil Nadu Developer, Tamil Nadu Freelancer, TamilNadu Developer, TamilNadu Freelancer, Best Developer, Best Developer Tamil Nadu, Best Freelancer Tamil Nadu, Mobile Developer, Flutter Developer, Flutter Developer Tamil Nadu, Mobile Developer Tamil Nadu, Karthi Developer, Karthi Freelancer, Karthi Flutter Developer, Karthi Mobile Developer, NexGen Developer, NexGen Freelancer, Best Flutter Developer, Expert Flutter Developer, Professional Flutter Developer, Android Developer, React Developer, Node.js Developer, Express.js Developer, Next.js Developer, Full-Stack Developer, Web Developer, App Developer, Mobile App Developer, Cross-Platform Developer, Hybrid App Developer, PWA Developer, API Developer, Database Developer, Cloud Developer, UI/UX Developer, Tamil Nadu Software Developer, Tamil Nadu Mobile App Developer, Tamil Nadu Web Developer, Best Developer in Tamil Nadu, Top Developer Tamil Nadu, Expert Developer Tamil Nadu, Professional Developer Tamil Nadu, Skilled Developer Tamil Nadu, Experienced Developer Tamil Nadu, Top Freelancer Tamil Nadu, Expert Freelancer Tamil Nadu, Professional Freelancer Tamil Nadu, Hire Flutter Developer Tamil Nadu, Hire Mobile Developer Tamil Nadu, Hire Best Developer Tamil Nadu, Hire Freelancer Tamil Nadu, Tamil Nadu Developer for Hire, Best Developer for Mobile Apps, Professional Flutter Developer for Hire, Expert Mobile App Developer Tamil Nadu, Top Rated Developer Tamil Nadu, Reliable Developer Tamil Nadu, Trusted Freelancer Tamil Nadu" />
        <meta name="description" content="Karthi (Karthikeyan S) - NexGen's best developer and freelancer from Tamil Nadu, India. Expert Flutter developer, mobile developer, React specialist, and professional freelancer. Top-rated Tamil Nadu developer specializing in mobile app development, Android development, web development, and full-stack solutions. Hire the best developer in Tamil Nadu for premium mobile and web development services." />
        <meta name="author" content="Karthikeyan S (Karthi NexGen)" />
        <meta name="designer" content="Karthi NexGen" />
        <meta name="copyright" content="Karthi NexGen" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="3 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* Geographic targeting - Enhanced for Tamil Nadu */}
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Tamil Nadu, India" />
        <meta name="geo.position" content="11.127123;78.656891" />
        <meta name="ICBM" content="11.127123, 78.656891" />
        <meta name="geo.country" content="India" />
        <meta name="geo.a1" content="Tamil Nadu" />
        
        {/* Professional skills for better categorization */}
        <meta name="skills" content="Flutter, React, Node.js, Express.js, Next.js, JavaScript, TypeScript, Dart, Android, iOS, Mobile Development, Web Development, Full-Stack Development, API Development, Database Development, Cloud Development, Firebase, Supabase, Git, DevOps, Tamil Nadu Development, Best Development Practices" />
        <meta name="expertise" content="Mobile App Development, Web Application Development, Cross-Platform Development, Frontend Development, Backend Development, Full-Stack Development, API Integration, Database Design, Cloud Solutions, Tamil Nadu Development Services, Best Development Practices" />
        <meta name="industry" content="Software Development, Mobile App Development, Web Development, Information Technology, Freelance Services, Tamil Nadu IT Services" />
        <meta name="category" content="Technology, Software Development, Mobile Development, Web Development, Tamil Nadu Developer, Best Developer" />
        <meta name="specialization" content="Flutter Development, Mobile App Development, React Development, Tamil Nadu Freelance Services" />
        
        {/* Professional titles and roles */}
        <meta name="title" content="Best Developer Tamil Nadu, Flutter Developer, Mobile Developer, Freelancer" />
        <meta name="profession" content="Software Developer, Mobile Developer, Flutter Developer, Freelancer" />
        <meta name="role" content="Lead Developer, Senior Flutter Developer, Mobile App Architect, Full-Stack Developer" />
        
        {/* Alternative names for better discovery */}
        <meta name="alternate-names" content="Karthi, Karthikeyan S, Karthi NexGen, Karthi-NexGen, NexGen, K4rthi, Karthi TN, Karthi Tamil Nadu, NexGen Developer, Best Developer Tamil Nadu" />
        
        {/* Business and service information */}
        <meta name="business-name" content="Karthi NexGen Development Services" />
        <meta name="service-area" content="Tamil Nadu, India, Worldwide" />
        <meta name="service-type" content="Mobile App Development, Web Development, Flutter Development, React Development, Freelance Development Services" />
        
        {/* Cache control for better performance */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
        <meta httpEquiv="Expires" content="31536000" />
        
        {/* Explicit Open Graph meta tags for better social media previews */}
        <meta property="og:image" content="https://karthi-nexgen.tech/android-chrome-512x512.png" />
        <meta property="og:image:secure_url" content="https://karthi-nexgen.tech/android-chrome-512x512.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:alt" content="Karthi - NexGen Expert Flutter Developer, Mobile Developer, Freelancer" />
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:image" content="https://karthi-nexgen.tech/android-chrome-512x512.png" />
        <meta name="twitter:image:alt" content="Karthi - NexGen Expert Flutter Developer, Mobile Developer, Freelancer" />
        
        {/* Additional social media meta tags */}
        <meta property="og:url" content="https://karthi-nexgen.tech" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Karthi | NexGen Developer - Expert Flutter Developer & Mobile App Specialist" />
        <meta property="og:description" content="Karthi (Karthikeyan S) - NexGen's expert developer and freelancer. Professional Flutter developer, mobile developer, React specialist. Top-rated freelancer delivering premium mobile and web solutions." />
        <meta property="og:site_name" content="Karthi NexGen - Expert Developer & Freelancer" />
        <meta property="og:locale" content="en_US" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://karthi-nexgen.tech" />
        <link rel="dns-prefetch" href="https://vercel-analytics.vercel.app" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        
        {/* Enhanced favicon and theme */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />
        <meta name="msapplication-TileImage" content="/android-chrome-192x192.png" />
        <meta name="msapplication-navbutton-color" content="#8b5cf6" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Verification tags */}
        <meta name="google-site-verification" content="NKidgHJX1jRjRjVroENdA0UMeRGLh2ZUa6hoZy17z90" />
        
        {/* Canonical and hreflang for international SEO */}
        <link rel="canonical" href="https://karthi-nexgen.tech" />
        <link rel="alternate" href="https://karthi-nexgen.tech" hrefLang="en" />
        <link rel="alternate" href="https://karthi-nexgen.tech" hrefLang="en-IN" />
        <link rel="alternate" href="https://karthi-nexgen.tech" hrefLang="x-default" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-inter antialiased relative`}>
        <FirebaseAnalytics />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
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

          {children}
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
