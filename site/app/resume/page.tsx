import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { lazy, Suspense } from "react"

import CTA from "@/components/CTA"
import Reveal from "@/components/Reveal"
import PublicationEntry from "@/components/PublicationEntry"
import { RichText } from "@/components/Tbd"
import { additional, education, experienceByKind, profile, publications, resumeSections } from "@/lib/content"
import { interestCardsData } from "@/components/InterestCards"

// Lazy load heavy interactive component
const InterestCards = lazy(() => import("@/components/InterestCards"))

export const metadata: Metadata = {
  title: "CV",
  description:
    "Raagav Ramakrishnan's CV: education, research experience, publications, industry experience and skills in HCI research and ML systems.",
}

const sections = [
  { id: "education", label: "Education" },
  { id: "research", label: "Research" },
  { id: "publications", label: "Publications" },
  { id: "experience", label: "Industry" },
  { id: "leadership", label: "Leadership" },
  { id: "skills", label: "Skills" },
  { id: "interests", label: "Interests" },
]

const research = experienceByKind("research")
const industry = experienceByKind("industry")
const leadership = experienceByKind("leadership")

export default function ResumePage() {
  return (
    <main id="main">
      {/* Hero section */}
      <section className="section-hero">
        <div className="container">
          <Reveal>
            <span className="label">CV</span>
          </Reveal>

          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start mt-8">
            {/* Left: Name, roles, contact */}
            <div className="space-y-6">
              <Reveal delay={0.05}>
                <h1 className="text-4xl md:text-5xl font-serif tracking-tight">
                  {profile.name}
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="space-y-1 text-muted">
                  {profile.roles.map((role) => (
                    <p key={role}>{role}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="space-y-2 text-sm text-muted pt-4">
                  <p>{profile.location}</p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="link-underline hover:text-ink transition-colors"
                  >
                    {profile.email}
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="flex gap-4 pt-2">
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted hover:text-ink transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted hover:text-ink transition-colors"
                    aria-label="GitHub"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right: Photo */}
            <Reveal delay={0.1} direction="left">
              <div className="flex justify-center lg:justify-end">
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border border-line shadow-soft">
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Section links */}
          <Reveal delay={0.25}>
            <nav className="mt-16 pt-8 border-t border-line">
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {sections.map((section) => (
                  <li key={section.id}>
                    <Link
                      href={`#${section.id}`}
                      className="text-sm text-muted hover:text-ink transition-colors link-underline"
                    >
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
        <div className="container">
          <Reveal>
            <h2 className="text-2xl font-serif mb-10">Education</h2>
          </Reveal>
          <div className="space-y-10">
            {education.map((edu, i) => (
              <Reveal key={edu.institution} delay={0.05 * i}>
                <div className="group p-6 -mx-6 rounded-xl transition-colors hover:bg-card/50">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-ink">{edu.degree}</h3>
                      <p className="text-muted">
                        {edu.institution}, {edu.location}
                      </p>
                    </div>
                    <span className="text-sm text-muted font-mono">
                      <RichText text={edu.time} />
                    </span>
                  </div>
                  <ul className="list-disc list-outside ml-5 text-sm text-muted space-y-1 leading-relaxed">
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

      {/* Research Experience */}
      <section id="research" className="section-featured">
        <div className="container">
          <Reveal>
            <h2 className="text-2xl font-serif mb-10">Research Experience</h2>
          </Reveal>
          <div className="space-y-10">
            {research.map((r, i) => (
              <Reveal key={r.id} delay={0.05 * i}>
                <div className="p-6 rounded-2xl border border-line bg-card shadow-soft">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-ink">{r.title}</h3>
                      <p className="text-muted">
                        {r.unit}, {r.org}
                      </p>
                      {r.advisor && <p className="text-sm text-muted italic mt-1">Advisor: {r.advisor}</p>}
                    </div>
                    <span className="text-sm text-muted font-mono">
                      <RichText text={r.time} />
                    </span>
                  </div>
                  {r.topic && <p className="text-sm font-medium text-ink mb-4">{r.topic}</p>}
                  <ul className="list-disc list-outside ml-5 text-sm text-muted space-y-2 leading-relaxed">
                    {r.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section id="publications" className="section">
        <div className="container">
          <Reveal>
            <h2 className="text-2xl font-serif mb-10">Publications</h2>
          </Reveal>
          <div className="space-y-10">
            {publications.map((p) => (
              <PublicationEntry key={p.id} pub={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Industry Experience */}
      <section id="experience" className="section-featured">
        <div className="container">
          <Reveal>
            <h2 className="text-2xl font-serif mb-10">Industry Experience</h2>
          </Reveal>
          <div className="space-y-10">
            {industry.map((job, i) => (
              <Reveal key={job.id} delay={0.05 * i}>
                <div className="p-6 rounded-2xl border border-line bg-card shadow-soft">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-ink">{job.title}</h3>
                      <p className="text-muted">
                        {job.org}
                        {job.orgNote && <span className="text-sm opacity-70"> ({job.orgNote})</span>}
                      </p>
                    </div>
                    <div className="text-sm text-muted font-mono sm:text-right">
                      <p>
                        <RichText text={job.time} />
                      </p>
                      <p className="opacity-70">{job.location}</p>
                    </div>
                  </div>
                  <ul className="list-disc list-outside ml-5 text-sm text-muted space-y-2 leading-relaxed">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership and additional */}
      <section id="leadership" className="section">
        <div className="container">
          <Reveal>
            <h2 className="text-2xl font-serif mb-10">Leadership &amp; Additional</h2>
          </Reveal>
          <div className="space-y-8">
            {leadership.map((l) => (
              <div key={l.id} className="p-6 rounded-2xl border border-line bg-card shadow-soft">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{l.title}</h3>
                    <p className="text-muted">{l.org}</p>
                  </div>
                  <span className="text-sm text-muted font-mono">{l.time}</span>
                </div>
                <ul className="list-disc list-outside ml-5 text-sm text-muted space-y-2 leading-relaxed">
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

      {/* Skills - Hoverable cards */}
      <section id="skills" className="section-featured">
        <div className="container">
          <Reveal>
            <h2 className="text-2xl font-serif mb-10">Skills</h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal delay={0.05}>
              <div className="group p-6 rounded-2xl border border-line bg-card hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300">
                <h3 className="label mb-4">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {resumeSections.skills.languages.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm bg-ink/5 rounded-full text-muted hover:bg-ink/10 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="group p-6 rounded-2xl border border-line bg-card hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300">
                <h3 className="label mb-4">ML & AI</h3>
                <div className="flex flex-wrap gap-2">
                  {resumeSections.skills.mlAndAI.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm bg-ink/5 rounded-full text-muted hover:bg-ink/10 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="group p-6 rounded-2xl border border-line bg-card hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300">
                <h3 className="label mb-4">Cloud & MLOps</h3>
                <div className="flex flex-wrap gap-2">
                  {resumeSections.skills.cloudAndMLOps.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm bg-ink/5 rounded-full text-muted hover:bg-ink/10 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="group p-6 rounded-2xl border border-line bg-card hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300">
                <h3 className="label mb-4">Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {resumeSections.skills.tools.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm bg-ink/5 rounded-full text-muted hover:bg-ink/10 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="group p-6 rounded-2xl border border-line bg-card hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300">
                <h3 className="label mb-4">Hardware</h3>
                <div className="flex flex-wrap gap-2">
                  {resumeSections.skills.hardware.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm bg-ink/5 rounded-full text-muted hover:bg-ink/10 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Interests */}
      <section id="interests" className="section">
        <div className="container">
          <Reveal>
            <h2 className="text-2xl font-serif mb-10">Interests</h2>
          </Reveal>
          <Suspense fallback={
            <div className="h-[420px] flex items-center justify-center text-muted">
              Loading interests...
            </div>
          }>
            <InterestCards cards={interestCardsData} defaultLayout="grid" />
          </Suspense>
        </div>
      </section>

      <section className="section-quiet pb-20">
        <div className="container">
          <Reveal>
            <CTA href={profile.cvUrl} variant="primary" external>
              Download CV (PDF)
            </CTA>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
