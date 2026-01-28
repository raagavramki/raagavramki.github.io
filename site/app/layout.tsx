import "./globals.css"
import type { Metadata } from "next"
import { Cormorant_Garamond, IBM_Plex_Mono, Inter } from "next/font/google"

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import HorizonHero from "@/components/HorizonHero"

// Optimized: Only load weights actually used
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600"], // Only medium weight for headings
  variable: "--font-serif",
  display: "swap",
})

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"], // Removed 300 (not used)
  variable: "--font-sans",
  display: "swap",
})

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"], // Removed 500 (not used)
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Raagav Ramakrishnan",
    template: "%s | Raagav Ramakrishnan",
  },
  description: "ML Systems Engineer. AI for Healthcare. Researcher (HCI x ML). B.Tech ECE @ IIIT Hyderabad.",
  keywords: ["ML Engineer", "AI", "Healthcare", "HCI", "Machine Learning", "IIIT Hyderabad", "Raagav Ramakrishnan"],
  authors: [{ name: "Raagav Ramakrishnan" }],
  openGraph: {
    title: "Raagav Ramakrishnan",
    description: "ML Systems Engineer. AI for Healthcare. Researcher (HCI x ML).",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable} ${mono.variable} antialiased`}>
        {/* Fixed shader background - visible across all pages */}
        <HorizonHero />
        {/* All content above shader */}
        <div className="relative z-10">
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
