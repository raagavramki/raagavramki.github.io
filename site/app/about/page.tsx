import type { Metadata } from "next"

import { RichText } from "@/components/Tbd"
import { aboutCopy } from "@/lib/content"

export const metadata: Metadata = {
  title: "About",
  description:
    "Raagav Ramakrishnan: from ECE and ML engineering to human-centred research on how people use technology in everyday life.",
}

export default function AboutPage() {
  return (
    <main id="main">
      <section className="section-hero">
        <div className="container max-w-3xl">
          {/* Kicker */}
          <span className="label">{aboutCopy.heading}</span>

          {/* Main heading - single line */}
          <h1 className="text-2xl md:text-3xl font-serif mt-6 mb-12">
            {aboutCopy.subheading}
          </h1>

          {/* All paragraphs with equal styling */}
          <div className="space-y-6 text-muted leading-relaxed">
            {aboutCopy.paragraphs.map((paragraph, i) => (
              <p key={i}>
                <RichText text={paragraph} />
              </p>
            ))}
          </div>

        </div>
      </section>
    </main>
  )
}
