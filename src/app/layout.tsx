import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
/**
 * @const metadata
 * @description Application metadata for Next.js
 * @type {Metadata}
 */
export const metadata: Metadata = {
  title: "Tennis Score Counter",
  description: "A tennis match score tracking application",
};

/**
 * @component RootLayout
 * @description Root layout component that wraps all pages
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered
 * 
 * @returns {JSX.Element} The root layout structure
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
       <Analytics />
    </html>

  )
}
