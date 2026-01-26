"use client"

import { useRef, useState, useEffect, Suspense, lazy } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { contactCopy, profile } from "@/lib/content"

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
)

export default function ContactSection() {
  const [mounted, setMounted] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Defer heavy shader until after first paint
  useEffect(() => {
    setMounted(true)
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setToast(contactCopy.emailToast)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setToast(null)
        setCopied(false)
      }, 2500)
    } catch {
      setToast(contactCopy.emailToastError)
      timeoutRef.current = setTimeout(() => setToast(null), 2500)
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24 px-4 md:px-6">
      <div
        className="max-w-5xl mx-auto relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-[32px] md:rounded-[48px] border border-line bg-card shadow-soft min-h-[450px] md:min-h-[500px] flex flex-col items-center justify-center">
          {/* Shader background - only load after mount */}
          {mounted ? (
            <Suspense fallback={<div className="absolute inset-0 bg-ink/5" />}>
              <div className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-multiply">
                <Dithering
                  colorBack="#00000000"
                  colorFront="#2c3e50"
                  shape="warp"
                  type="4x4"
                  speed={isHovered ? 0.5 : 0.15}
                  className="size-full"
                  minPixelRatio={1}
                />
              </div>
            </Suspense>
          ) : (
            <div className="absolute inset-0 bg-ink/5" />
          )}

          {/* Content */}
          <div className="relative z-10 px-6 md:px-12 max-w-2xl mx-auto text-center flex flex-col items-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/5 px-4 py-1.5 text-xs font-medium text-ink backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Open to Opportunities
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-ink mb-4 leading-[1.1]"
            >
              {contactCopy.heading}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-muted text-base md:text-lg max-w-lg mb-10 leading-relaxed"
            >
              {contactCopy.subheading}
            </motion.p>

            {/* Email CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onClick={copyEmail}
              className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-ink px-10 text-base font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lift"
              type="button"
            >
              <span className="relative z-10">{copied ? "Copied!" : profile.email}</span>
              <motion.span
                animate={{ rotate: copied ? 360 : 0, x: copied ? 0 : 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                {copied ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </motion.span>
            </motion.button>

            {/* Secondary links - pill buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex justify-center gap-4 mt-10"
            >
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-ink text-white text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lift"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-ink text-white text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lift"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50
                       px-5 py-2.5 bg-ink text-white text-sm rounded-full shadow-lift"
            role="status"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
