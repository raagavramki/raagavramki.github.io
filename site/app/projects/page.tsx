import type { Metadata } from "next"

import ProjectsBrowser from "@/components/ProjectsBrowser"
import Reveal from "@/components/Reveal"
import { archiveProjects, projectFilters, publicEngineering } from "@/lib/content"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Engineering and machine learning work: retrieval-augmented agents, multilingual language models, computer vision and hardware systems, with detailed case studies.",
}

export default function ProjectsPage() {
  const publishedSlugs = publicEngineering().map((c) => c.slug)

  return (
    <main id="main">
      <section className="section-hero">
        <div className="container">
          <Reveal>
            <span className="label">Projects</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mb-6 mt-6 text-3xl font-serif md:text-4xl">Engineering &amp; ML work</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-12 max-w-2xl text-muted">
              Systems I have built, from language models and retrieval agents to vision and hardware. Case studies explain
              the problem, my role, the design and the evidence.
            </p>
          </Reveal>
          <ProjectsBrowser projects={archiveProjects} filters={projectFilters} publishedSlugs={publishedSlugs} />
        </div>
      </section>
    </main>
  )
}
