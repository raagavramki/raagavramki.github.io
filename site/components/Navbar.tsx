"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import CTA from "@/components/CTA"
import { profile } from "@/lib/content"

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50">
      <nav
        className={`border-b border-transparent transition-all ${
          scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
        }`}
        aria-label="Primary"
      >
        <div className="container flex items-center justify-between py-4">
          <Link className="text-lg font-semibold tracking-tight" href="/">
            Raagav<span className="text-muted">.</span>
          </Link>

          <button
            className="md:hidden"
            aria-expanded={open}
            aria-controls="nav-menu"
            onClick={() => setOpen(prev => !prev)}
            type="button"
          >
            <span className="sr-only">Toggle menu</span>
            <div className="h-0.5 w-6 bg-ink" />
            <div className="mt-1 h-0.5 w-6 bg-ink" />
          </button>

          <div
            id="nav-menu"
            className={`absolute left-0 top-full w-full border-b border-line bg-white/95 px-6 py-6 shadow-sm md:static md:block md:w-auto md:border-0 md:bg-transparent md:px-0 md:py-0 md:shadow-none ${
              open ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
              <CTA href={profile.resumeUrl} variant="outline" external>
                Open resume
              </CTA>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
