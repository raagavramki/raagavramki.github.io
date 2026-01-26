"use client"

import { ComesInGoesOutUnderline } from "@/components/AnimatedUnderline"
import { profile } from "@/lib/content"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-white py-12 mb-20 md:mb-0">
      <div className="container">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="text-muted hover:text-ink transition-colors"
            >
              <ComesInGoesOutUnderline label="GitHub" direction="left" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-muted hover:text-ink transition-colors"
            >
              <ComesInGoesOutUnderline label="LinkedIn" direction="right" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-muted hover:text-ink transition-colors underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
            >
              {profile.email}
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted">
            © {currentYear} Raagav Ramakrishnan
          </p>
        </div>
      </div>
    </footer>
  )
}
