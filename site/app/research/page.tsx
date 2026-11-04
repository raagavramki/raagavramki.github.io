import type { Metadata } from "next"

import PublicationEntry from "@/components/PublicationEntry"
import Reveal from "@/components/Reveal"
import WorkCard from "@/components/WorkCard"
import { publications, publicResearch, researchQuestions } from "@/lib/content"

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research in Human-Computer Interaction and human-AI interaction: everyday technology use, self-tracking, social computing and adaptive systems. Publications and case studies.",
  alternates: { canonical: "/research/" },
}

export default function ResearchPage() {
  const studies = publicResearch()

  return (
    <main id="main">
      <section className="section-hero">
        <div className="container max-w-4xl">
          <Reveal delay={0.05}>
            <h1 className="mb-6 text-3xl font-serif md:text-4xl">Research</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead mb-10 max-w-2xl">
              My research looks at everyday use of technology, human&ndash;AI interaction, social computing, digital health
              and adaptive systems, combining qualitative fieldwork with technical implementation.
            </p>
          </Reveal>
          <h2 className="mb-4 text-xl font-serif">Questions I am working on</h2>
          <ul className="list-disc space-y-3 pl-5 text-muted">
            {researchQuestions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="publications" className="section-featured">
        <div className="container max-w-4xl">
          <h2 className="mb-10 text-2xl font-serif">Publications</h2>
          <div className="space-y-10">
            {publications.map((p) => (
              <PublicationEntry key={p.id} pub={p} />
            ))}
          </div>
        </div>
      </section>

      <section id="case-studies" className="section">
        <div className="container">
          <h2 className="mb-10 text-2xl font-serif">Research case studies</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {studies.map((s) => (
              <WorkCard key={s.slug} study={s} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
