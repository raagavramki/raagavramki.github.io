import type { Metadata } from "next"

import Reveal from "@/components/Reveal"
import { aboutCopy } from "@/lib/content"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Raagav Ramakrishnan - building human-centered AI systems for healthcare at the intersection of computer vision, ML systems, and clinical workflows.",
}

export default function AboutPage() {
  return (
    <main id="main">
      <section className="section pt-16">
        <div className="container max-w-3xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-muted mb-4">{aboutCopy.heading}</p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="text-3xl font-semibold mb-8">{aboutCopy.subheading}</h1>
          </Reveal>

          <div className="space-y-6 text-muted leading-relaxed">
            {aboutCopy.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={0.1 + i * 0.05}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          {/* Research Interests */}
          <Reveal delay={0.3}>
            <div className="mt-12 pt-8 border-t border-line">
              <h2 className="text-lg font-semibold mb-4">Research Interests</h2>
              <ul className="space-y-2 text-muted">
                {aboutCopy.interests.map((interest, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-ink mt-1">-</span>
                    <span>{interest}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
