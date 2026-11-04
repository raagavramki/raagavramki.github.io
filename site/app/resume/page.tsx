import type { Metadata } from "next"
import Link from "next/link"

import CTA from "@/components/CTA"
import Interests from "@/components/Interests"
import PublicationEntry from "@/components/PublicationEntry"
import Reveal from "@/components/Reveal"
import { RichText } from "@/components/Tbd"
import {
  additional,
  archiveProjects,
  education,
  experienceByKind,
  profile,
  projectGroups,
  publications,
  publicEngineering,
  resumeSections,
} from "@/lib/content"

export const metadata: Metadata = {
  title: "CV",
  description:
    "Raagav Ramakrishnan's CV: education, HCI research, publications, medical imaging and ML systems experience, projects and skills.",
}

const sections = [
  { id: "education", label: "Education" },
  { id: "research", label: "Research" },
  { id: "publications", label: "Publications" },
  { id: "experience", label: "Industry" },
  { id: "projects", label: "Projects" },
  { id: "leadership", label: "Leadership" },
  { id: "skills", label: "Skills" },
  { id: "interests", label: "Interests" },
]

const research = experienceByKind("research")
const industry = experienceByKind("industry")
const leadership = experienceByKind("leadership")

const linkClass = "tap link-underline focus-ring text-sm text-ink"

export default function ResumePage() {
  const studySlugs = new Set(publicEngineering().map((c) => c.slug))

  return (
    <main id="main">
      {/* Intro */}
      <section className="section-hero">
        <div className="container max-w-4xl">
          <Reveal>
            <span className="label">CV</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 text-4xl font-serif tracking-tight md:text-5xl">{profile.name}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead mt-6 max-w-2xl">
              I study how people live with technology and build the machine learning systems to match. I have published
              qualitative HCI research at CHI EA 2026 and I work on medical-imaging ML on Google Cloud.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-muted">{profile.roles.join(" · ")}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
              <CTA href={profile.cvUrl} variant="primary" external>
                Download CV (PDF)
              </CTA>
              <a href={`mailto:${profile.email}`} className={linkClass}>
                {profile.email}
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className={linkClass}>
                LinkedIn ↗
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className={linkClass}>
                GitHub ↗
              </a>
            </div>
            <p className="mt-3 text-sm text-muted">{profile.location}</p>
          </Reveal>

          <Reveal delay={0.25}>
            <nav aria-label="CV sections" className="mt-12 border-t border-line pt-6">
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {sections.map((section) => (
                  <li key={section.id}>
                    <Link href={`#${section.id}`} className="tap link-underline focus-ring text-sm text-muted hover:text-ink">
                      {section.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="section">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="mb-10 text-2xl font-serif">Education</h2>
          </Reveal>
          <div className="space-y-8">
            {education.map((edu, i) => (
              <Reveal key={edu.institution} delay={0.05 * i}>
                <div>
                  <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-ink">{edu.degree}</h3>
                      <p className="text-muted">
                        {edu.institution}, {edu.location}
                      </p>
                    </div>
                    <span className="font-mono text-sm text-muted">
                      <RichText text={edu.time} />
                    </span>
                  </div>
                  <ul className="ml-5 list-outside list-disc space-y-1 text-sm leading-relaxed text-muted">
                    {edu.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Research */}
      <section id="research" className="section-featured">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-2xl font-serif">Research</h2>
            <p className="mb-10 mt-3 max-w-2xl text-muted">
              Qualitative HCI research on everyday technology use, and what it means for adaptive systems.
            </p>
          </Reveal>
          <div className="space-y-8">
            {research.map((r, i) => (
              <Reveal key={r.id} delay={0.05 * i}>
                <div className="rounded-lg border border-line bg-card p-6">
                  <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-ink">{r.title}</h3>
                      <p className="text-muted">
                        {r.unit}, {r.org}
                      </p>
                      {r.advisor && <p className="mt-1 text-sm italic text-muted">Advisor: {r.advisor}</p>}
                    </div>
                    <span className="font-mono text-sm text-muted">
                      <RichText text={r.time} />
                    </span>
                  </div>
                  {r.topic && <p className="mb-4 text-sm font-medium text-ink">{r.topic}</p>}
                  <ul className="ml-5 list-outside list-disc space-y-2 text-sm leading-relaxed text-muted">
                    {r.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-x-5">
                    <Link href="/research/adaptive-fitness-tracking/" className={linkClass}>
                      Read the case study →
                    </Link>
                    <a href="https://doi.org/10.1145/3772363.3798708" target="_blank" rel="noreferrer" className={linkClass}>
                      CHI EA 2026 paper ↗
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section id="publications" className="section">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="mb-10 text-2xl font-serif">Publications</h2>
          </Reveal>
          <div className="space-y-10">
            {publications.map((p) => (
              <PublicationEntry key={p.id} pub={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Industry */}
      <section id="experience" className="section-featured">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-2xl font-serif">Industry</h2>
            <p className="mb-10 mt-3 max-w-2xl text-muted">Applied machine learning, from medical imaging to production pipelines.</p>
          </Reveal>
          <div className="space-y-8">
            {industry.map((job, i) => (
              <Reveal key={job.id} delay={0.05 * i}>
                <div className="rounded-lg border border-line bg-card p-6">
                  <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-ink">{job.title}</h3>
                      <p className="text-muted">
                        {job.org}
                        {job.orgNote && <span className="text-sm opacity-70"> ({job.orgNote})</span>}
                      </p>
                    </div>
                    <div className="font-mono text-sm text-muted sm:text-right">
                      <p>
                        <RichText text={job.time} />
                      </p>
                      <p className="opacity-70">{job.location}</p>
                    </div>
                  </div>
                  <ul className="ml-5 list-outside list-disc space-y-2 text-sm leading-relaxed text-muted">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  {job.id === "cloud-ambassadors" && studySlugs.has("glioma-mri-pipeline") && (
                    <div className="mt-5">
                      <Link href="/projects/glioma-mri-pipeline/" className={linkClass}>
                        See the glioma MRI pipeline case study →
                      </Link>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="text-2xl font-serif">Projects</h2>
            <p className="mb-10 mt-3 max-w-2xl text-muted">
              Medical imaging, language models and ML fundamentals. Projects with a case study link to the full write-up.
            </p>
          </Reveal>
          <div className="space-y-10">
            {projectGroups.map((g) => {
              const items = archiveProjects.filter((p) => p.category === g.key)
              return (
                <Reveal key={g.key}>
                  <div>
                    <h3 className="label mb-3">{g.title}</h3>
                    <ul className="divide-y divide-line border-y border-line">
                      {items.map((p) => {
                        const study = p.slug && studySlugs.has(p.slug) ? `/projects/${p.slug}/` : null
                        return (
                          <li key={p.title} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                            <div className="min-w-0">
                              {study ? (
                                <Link href={study} className="tap font-semibold text-ink link-underline focus-ring">
                                  {p.title}
                                </Link>
                              ) : p.href ? (
                                <a href={p.href} target="_blank" rel="noreferrer" className="tap font-semibold text-ink link-underline focus-ring">
                                  {p.title} ↗
                                </a>
                              ) : (
                                <span className="font-semibold text-ink">{p.title}</span>
                              )}
                              <p className="mt-1 text-sm text-muted">{p.desc}</p>
                            </div>
                            <span className="shrink-0 font-mono text-xs text-muted">{p.tags.slice(0, 3).join(" · ")}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </Reveal>
              )
            })}
          </div>
          <Reveal>
            <p className="mt-8">
              <Link href="/projects/" className={linkClass}>
                Browse all projects →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="section-featured">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="mb-10 text-2xl font-serif">Leadership &amp; additional</h2>
          </Reveal>
          <div className="space-y-8">
            {leadership.map((l) => (
              <div key={l.id} className="rounded-lg border border-line bg-card p-6">
                <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{l.title}</h3>
                    <p className="text-muted">{l.org}</p>
                  </div>
                  <span className="font-mono text-sm text-muted">{l.time}</span>
                </div>
                <ul className="ml-5 list-outside list-disc space-y-2 text-sm leading-relaxed text-muted">
                  {l.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
            <ul className="space-y-2 text-sm text-muted">
              {additional.map((a) => (
                <li key={a.title} className="flex justify-between gap-4">
                  <span>{a.title}</span>
                  <span className="font-mono">{a.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="mb-10 text-2xl font-serif">Skills</h2>
          </Reveal>
          <dl className="divide-y divide-line border-y border-line">
            {resumeSections.skills.map((group) => (
              <div key={group.label} className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <dt className="label pt-0.5">{group.label}</dt>
                <dd className="text-sm leading-relaxed text-ink">{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Interests */}
      <section id="interests" className="section-featured">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="mb-10 text-2xl font-serif">Interests</h2>
          </Reveal>
          <Interests />
        </div>
      </section>

      <section className="section-quiet pb-20">
        <div className="container max-w-4xl">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4">
              <CTA href={profile.cvUrl} variant="primary" external>
                Download CV (PDF)
              </CTA>
              <Link href="/contact/" className={linkClass}>
                Get in touch →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
