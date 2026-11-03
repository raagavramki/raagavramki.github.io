import Link from "next/link"

import { profile } from "@/lib/content"

const items = [
  { label: "Peer-reviewed", text: "CHI EA 2026 publication", href: "/research/adaptive-fitness-tracking/" },
  { label: "HCI research", text: "Under Prof. Nimmi Rangaswamy, IIIT Hyderabad", href: "/research/" },
  { label: "ML engineering", text: "Medical imaging and cloud ML systems", href: "/resume/#experience" },
  { label: "Open source", text: "Selected implementations on GitHub", href: profile.github, external: true },
]

export default function ProofStrip() {
  return (
    <section aria-label="Highlights" className="border-y border-line bg-white/50">
      <div className="container">
        <ul className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => {
            const inner = (
              <>
                <span className="label block">{i.label}</span>
                <span className="mt-1 block text-sm text-ink">{i.text} →</span>
              </>
            )
            return (
              <li key={i.label}>
                {i.external ? (
                  <a href={i.href} target="_blank" rel="noreferrer" className="focus-ring block py-4 pr-4 hover:opacity-70">
                    {inner}
                  </a>
                ) : (
                  <Link href={i.href} className="focus-ring block py-4 pr-4 hover:opacity-70">
                    {inner}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
