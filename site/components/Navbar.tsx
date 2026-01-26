"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, User, FileText, FolderOpen, Mail } from "lucide-react"

import CTA from "@/components/CTA"
import { profile } from "@/lib/content"

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/resume", label: "Resume", icon: FileText },
  { href: "/projects", label: "Projects", icon: FolderOpen },
  { href: "/contact", label: "Contact", icon: Mail },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      {/* Floating pill navbar */}
      <div className="fixed bottom-6 md:top-6 md:bottom-auto left-1/2 -translate-x-1/2 z-50">
        <nav
          className="flex items-center gap-1 bg-white/80 border border-line backdrop-blur-xl py-1.5 px-1.5 rounded-full shadow-lg"
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const Icon = link.icon
            // Handle both exact match and trailing slash variations
            const isActive = link.href === "/"
              ? pathname === "/"
              : pathname === link.href || pathname.startsWith(link.href + "/")

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative cursor-pointer text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-ink bg-ink/5"
                    : "text-muted hover:text-ink hover:bg-ink/5"
                }`}
              >
                <span className="hidden md:inline">{link.label}</span>
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>
                {/* Lamp glow effect */}
                {isActive && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-ink rounded-t-full">
                    <div className="absolute w-12 h-6 bg-ink/30 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-ink/30 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-ink/30 rounded-full blur-sm top-0 left-2" />
                  </div>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Mobile hamburger menu for full navigation (hidden by default, shown via floating nav) */}
      <header className="fixed top-0 left-0 right-0 z-40 md:hidden">
        <div className="container flex items-center justify-between py-4">
          <Link
            className="text-lg font-semibold tracking-tight relative z-50"
            href="/"
          >
            Raagav<span className="text-muted">.</span>
          </Link>

          {/* Animated hamburger */}
          <button
            className="relative z-50 w-8 h-8 flex flex-col justify-center items-center"
            aria-expanded={open}
            aria-controls="nav-menu"
            onClick={() => setOpen((prev) => !prev)}
            type="button"
          >
            <span className="sr-only">Toggle menu</span>
            <motion.span
              className="block h-0.5 w-6 bg-ink absolute"
              animate={{
                rotate: open ? 45 : 0,
                y: open ? 0 : -4,
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-ink absolute"
              animate={{
                rotate: open ? -45 : 0,
                y: open ? 0 : 4,
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            />
          </button>
        </div>

        {/* Mobile nav overlay */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="nav-menu"
              className="fixed inset-0 bg-white/98 backdrop-blur-xl z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="container pt-24 pb-12 h-full flex flex-col">
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 + 0.1, duration: 0.3 }}
                    >
                      <Link
                        className={`block py-4 text-3xl font-serif transition-colors ${
                          pathname === link.href
                            ? "text-ink"
                            : "text-muted hover:text-ink"
                        }`}
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="mt-auto pt-8"
                >
                  <CTA href={profile.resumeUrl} variant="primary" external>
                    Download CV
                  </CTA>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
