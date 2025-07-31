import type { Metadata } from "next"

export const defaultMetadata: Metadata = {
  title: "Karthi-NexGen | Expert Full-Stack, Mobile & Cloud Developer",
  description:
    "Partner with Karthi, an expert freelance developer delivering high-performance web and mobile apps with Flutter, React, and Node.js. Based in India. Let's build your next big idea.",
  keywords: [
    "Karthi-NexGen",
    "Freelance Developer India",
    "Full-Stack Developer",
    "Mobile App Developer",
    "Cloud Solutions Expert",
    "Flutter Developer",
    "React Developer",
    "Node.js Developer",
    "Next.js Developer",
    "Supabase Expert",
    "Enterprise App Development",
    "SaaS Product Development",
    "Hire Freelance Developer",
    "Karthikeyan S Portfolio",
    "Top-rated Developer India",
  ],

  authors: [{ name: "Karthikeyan S", url: "https://karthi-nexgen.tech" }],
  creator: "Karthikeyan S",
  publisher: "Karthi–NexGen",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://karthi-nexgen.tech",
    siteName: "Karthi-NexGen",
    title: "Karthi-NexGen | Expert Full-Stack, Mobile & Cloud Developer",
    description:
      "Partner with Karthi, an expert freelance developer delivering high-performance web and mobile apps with Flutter, React, and Node.js. Let's build your next big idea.",
    images: [
      {
        url: "https://karthi-nexgen.tech/og-image.png",
        width: 1200,
        height: 630,
        alt: "Karthi-NexGen - Expert Full-Stack, Mobile & Cloud Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karthi-NexGen | Expert Full-Stack, Mobile & Cloud Developer",
    description:
      "Partner with Karthi, an expert freelance developer delivering high-performance web and mobile apps with Flutter, React, and Node.js.",
    images: ["https://karthi-nexgen.tech/og-image.png"],
    creator: "@karthi_nexgen",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "NKidgHJX1jRjRjVroENdA0UMeRGLh2ZUa6hoZy17z90",
  },
  alternates: {
    canonical: "https://karthi-nexgen.tech",
  },
}

export const generateProjectMetadata = (project: {
  title: string
  description: string
  slug: string
  image_url?: string
  tech_stack: string[]
  client_name?: string
  project_date?: string
}): Metadata => {
  return {
    title: `${project.title} | Karthi–NexGen Portfolio - Premium Development Project`,
    description: `${project.description} - A premium development project by Karthikeyan S using ${project.tech_stack.slice(0, 3).join(", ")}. Professional full-stack development services.`,
    keywords: [
      ...project.tech_stack,
      "Karthi-NexGen",
      "Portfolio Project",
      "Full-Stack Development",
      "Mobile Development",
      "Premium Development Services",
      project.client_name || "Client Project",
      "Professional Developer",
      "Custom Software Development",
    ],
    openGraph: {
      title: `${project.title} | Karthi–NexGen Portfolio`,
      description: project.description,
      url: `https://karthi-nexgen.tech/projects/${project.slug}`,
      type: "article",
      publishedTime: project.project_date,
      authors: ["Karthikeyan S"],
      images: project.image_url
        ? [
            {
              url: project.image_url,
              width: 1200,
              height: 630,
              alt: `${project.title} - Premium Development Project`,
              type: "image/png",
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Karthi–NexGen Portfolio`,
      description: project.description,
      images: project.image_url ? [project.image_url] : [],
    },
    alternates: {
      canonical: `https://karthi-nexgen.tech/projects/${project.slug}`,
    },
  }
}

export const generatePageMetadata = (page: "about" | "skills" | "services" | "contact" | "projects" | "resume"): Metadata => {
  const pageData = {
    about: {
      title: "About Karthikeyan S | Karthi–NexGen - Premium Developer Story",
      description:
        "Learn about Karthikeyan S, a premium full-stack developer with 3+ years of experience in Flutter, React, and Node.js. Professional journey, skills, and achievements.",
    },
    skills: {
      title: "Technical Skills | Karthi–NexGen - Expert Development Capabilities",
      description:
        "Comprehensive technical skills in Frontend, Mobile, Backend, Database, Cloud, and DevOps technologies. Expert-level proficiency in modern development stack.",
    },
    services: {
      title: "Premium Development Services | Karthi–NexGen - Professional Solutions",
      description:
        "Premium development services including Mobile App Development, Full-Stack Web Development, API Development, Cloud Solutions, UI/UX Design, and Technical Consulting.",
    },
    contact: {
      title: "Contact Karthikeyan S | Karthi–NexGen - Let's Build Together",
      description:
        "Get in touch with Karthikeyan S for premium development services. Available for freelance projects in Healthcare, Enterprise, EdTech, and SaaS sectors.",
    },
    projects: {
      title: "Portfolio Projects | Karthi–NexGen - Premium Development Showcase",
      description:
        "Explore premium development projects by Karthikeyan S across Healthcare, Enterprise, and SaaS sectors. Full-stack, mobile, and cloud solutions showcase.",
    },
    resume: {
      title: "Resume | Karthi-NexGen - Full-Stack Developer",
      description: "View and download the official resume of Karthi, an expert Full-Stack, Mobile, and Cloud Developer.",
    },
  }

  const data = pageData[page]

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      url: `https://karthi-nexgen.tech/${page === "about" ? "#about" : page}`,
    },
    twitter: {
      title: data.title,
      description: data.description,
    },
    alternates: {
      canonical: `https://karthi-nexgen.tech/${page === "about" ? "#about" : page}`,
    },
  }
}

export const generateJsonLd = (type: "person" | "portfolio" | "project" | "resume", data?: any) => {
  const baseUrl = "https://karthi-nexgen.tech"

  switch (type) {
    case "person":
      return {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: "Karthikeyan S",
        alternateName: ["Karthi–NexGen", "Karthi NexGen", "Karthikeyan"],
        description: "Premium Freelance Full-Stack, Mobile & Cloud Developer",
        url: baseUrl,
        image: {
          "@type": "ImageObject",
          url: `${baseUrl}/profile-image.jpg`,
          width: 400,
          height: 400,
        },
        sameAs: [
          "https://github.com/karthi-nexgen",
          "https://linkedin.com/in/karthikeyan-s-nexgen",
          "mailto:karthikeyan@karthi-nexgen.com",
        ],
        jobTitle: "Full-Stack Developer",
        worksFor: {
          "@type": "Organization",
          name: "Freelance",
          url: baseUrl,
        },
        knowsAbout: [
          "Flutter Development",
          "React Development",
          "Node.js Development",
          "Mobile App Development",
          "Cloud Computing",
          "Full-Stack Development",
          "API Development",
          "Database Design",
          "DevOps",
          "UI/UX Design",
        ],
        hasOccupation: {
          "@type": "Occupation",
          name: "Software Developer",
          occupationLocation: {
            "@type": "Place",
            name: "Tamil Nadu, India",
          },
          skills: ["Flutter", "React", "Node.js", "Python", "Cloud Computing"],
          experienceRequirements: "3+ years",
        },
        address: {
          "@type": "PostalAddress",
          addressRegion: "Tamil Nadu",
          addressCountry: "India",
        },
        contactPoint: {
          "@type": "ContactPoint",
          email: "karthikeyan@karthi-nexgen.com",
          contactType: "Professional",
          availableLanguage: ["English", "Tamil"],
        },
      }

    case "portfolio":
      return {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${baseUrl}/#portfolio`,
        name: "Karthi–NexGen Portfolio",
        description: "Premium Full-Stack Developer Portfolio showcasing professional projects and services",
        url: baseUrl,
        dateCreated: "2024-01-01",
        dateModified: new Date().toISOString(),
        inLanguage: "en-US",
        isPartOf: {
          "@type": "WebSite",
          name: "Karthi–NexGen",
          url: baseUrl,
        },
        mainEntity: {
          "@type": "Person",
          name: "Karthikeyan S",
          "@id": `${baseUrl}/#person`,
        },
        about: [
          "Full-Stack Development",
          "Mobile App Development",
          "Cloud Solutions",
          "API Development",
          "UI/UX Design",
        ],
      }

    case "project":
      return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": `${baseUrl}/projects/${data?.slug}#software`,
        name: data?.title,
        description: data?.description,
        url: data?.live_url,
        applicationCategory: "WebApplication",
        operatingSystem: "Cross-platform",
        author: {
          "@type": "Person",
          name: "Karthikeyan S",
          "@id": `${baseUrl}/#person`,
        },
        creator: {
          "@type": "Person",
          name: "Karthikeyan S",
        },
        programmingLanguage: data?.tech_stack,
        dateCreated: data?.created_at,
        dateModified: data?.updated_at,
        isPartOf: {
          "@type": "CreativeWork",
          name: "Karthi–NexGen Portfolio",
        },
        offers: {
          "@type": "Offer",
          description: "Custom development services available",
          seller: {
            "@type": "Person",
            name: "Karthikeyan S",
          },
        },
      }

    case "resume":
      return {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": `${baseUrl}/resume#document`,
        name: "Karthikeyan S - Resume",
        description: "Professional resume of Karthikeyan S, Full-Stack Developer",
        author: {
          "@type": "Person",
          name: "Karthikeyan S",
          "@id": `${baseUrl}/#person`,
        },
        dateCreated: "2024-01-01",
        dateModified: new Date().toISOString(),
        inLanguage: "en-US",
        about: {
          "@type": "Person",
          name: "Karthikeyan S",
        },
        genre: "Resume",
        workExample: [
          {
            "@type": "SoftwareApplication",
            name: "CuroSync Healthcare Platform",
          },
          {
            "@type": "SoftwareApplication",
            name: "CashSify Financial Analytics",
          },
        ],
      }

    default:
      return {}
  }
}

export const generateBreadcrumbJsonLd = (items: Array<{ name: string; url: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export const generateOrganizationJsonLd = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://karthi-nexgen.tech/#organization",
    name: "Karthi–NexGen",
    alternateName: "Karthi NexGen",
    url: "https://karthi-nexgen.tech",
    logo: {
      "@type": "ImageObject",
      url: "https://karthi-nexgen.tech/logo.png",
      width: 200,
      height: 200,
    },
    description: "Premium Full-Stack Development Services",
    founder: {
      "@type": "Person",
      name: "Karthikeyan S",
    },
    foundingDate: "2022",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Tamil Nadu",
      addressCountry: "India",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "karthikeyan@karthi-nexgen.com",
      contactType: "Customer Service",
    },
    sameAs: ["https://github.com/karthi-nexgen", "https://linkedin.com/in/karthikeyan-s-nexgen"],
    knowsAbout: ["Full-Stack Development", "Mobile App Development", "Cloud Solutions", "API Development"],
  }
}
