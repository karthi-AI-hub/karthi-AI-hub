import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/seo"

export const metadata: Metadata = generatePageMetadata("resume")

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
