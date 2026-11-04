import { profile } from "@/lib/content"

// Static year - updated at build time, avoids hydration mismatch
const CURRENT_YEAR = 2026

export default function Footer() {
  return (
    <footer className="mb-20 border-t border-line bg-white py-10 md:mb-0">
      <div className="container">
        <div className="flex flex-col items-center gap-4 text-center">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 text-sm">
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer" className="tap focus-ring text-muted hover:text-ink">
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="tap focus-ring text-muted hover:text-ink">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className="tap focus-ring text-muted hover:text-ink">
                {profile.email}
              </a>
            </li>
          </ul>
          <p className="text-xs text-muted">© {CURRENT_YEAR} Raagav Ramakrishnan</p>
        </div>
      </div>
    </footer>
  )
}
