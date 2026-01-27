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

        </div>
      </section>
    </main>
  )
}
