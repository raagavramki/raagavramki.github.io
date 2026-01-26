import type { Metadata } from "next"

import { aboutCopy } from "@/lib/content"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Raagav Ramakrishnan - building human-centered AI systems for healthcare at the intersection of computer vision, ML systems, and clinical workflows.",
}

export default function AboutPage() {
  return (
    <main id="main">
      <section className="section-hero">
        <div className="container max-w-3xl">
          {/* Kicker */}
          <span className="label">{aboutCopy.heading}</span>

          {/* Main heading - single line */}
          <h1 className="text-2xl md:text-3xl font-serif mt-6 mb-12 whitespace-nowrap">
            {aboutCopy.subheading}
          </h1>

          {/* All paragraphs with equal styling */}
          <div className="space-y-6 text-muted leading-relaxed">
            {aboutCopy.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Research Interests as visual cards */}
          <div className="mt-20 pt-12 border-t border-line">
            <h2 className="text-xl font-serif mb-8">Research Interests</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {aboutCopy.interests.map((interest, i) => (
                <div
                  key={i}
                  className="group p-5 rounded-xl border border-line bg-card/50
                             hover:bg-card transition-all duration-300
                             hover:-translate-y-0.5"
                  style={{ borderColor: "var(--line)" }}
                >
                  <span className="text-2xl font-serif text-ink/20 block mb-3 group-hover:text-ink/30 transition-colors">
                    0{i + 1}
                  </span>
                  <p className="text-sm text-ink leading-relaxed">{interest}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
