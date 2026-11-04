import Link from "next/link"
import { lazy, Suspense } from "react"

import Card from "@/components/Card"
import ProofStrip from "@/components/ProofStrip"
import PublicationEntry from "@/components/PublicationEntry"
import Reveal from "@/components/Reveal"
import Section from "@/components/Section"
import { RichText } from "@/components/Tbd"
import WorkCard from "@/components/WorkCard"
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton"
import { experienceByKind, featuredWork, profile, publications } from "@/lib/content"

// Lazy load heavy components below the fold
const ContactSection = lazy(() => import("@/components/ContactSection"))

const research = experienceByKind("research")[0]
const industry = experienceByKind("industry")[0]

export default function HomePage() {
  const featured = featuredWork()
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: "https://raagavramki.github.io",
    affiliation: { "@type": "CollegeOrUniversity", name: "IIIT Hyderabad" },
    sameAs: [profile.github, profile.linkedin],
    knowsAbout: profile.researchAreas,
  }
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      {/* Hero */}
      <section className="section-hero pt-16 md:pt-24 relative">

        <div className="container relative z-10">
          <div className="max-w-3xl space-y-8">
            {/* <Reveal>
              <div className="min-h-[40px] flex items-center justify-center">
                <GooeyText
                  texts={profile.kicker}
                  morphTime={0.6}
                  cooldownTime={1}
                  textClassName="text-base md:text-lg font-extrabold tracking-wide uppercase text-ink whitespace-nowrap"
                />
              </div>
            </Reveal> */}
            <Reveal delay={0.05}>
              <p className="label">{profile.name}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="text-4xl md:text-5xl">{profile.headline}</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lead max-w-2xl">
                {profile.subtitle}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/research/" className="btn btn-primary">
                  Explore research
                </Link>
                <Link href="/projects/" className="btn btn-outline">
                  View projects
                </Link>
                <a href={profile.cvUrl} download className="link-underline text-sm text-muted hover:text-ink focus-ring">
                  Download CV
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <InteractiveHoverButton
                idleText="Say hello"
                hoverText={profile.email}
                href={`mailto:${profile.email}`}
                showArrow={false}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <ProofStrip />

      {/* Selected work */}
      <Section
        id="work"
        title="Selected work"
        description="Research and engineering, each with a full case study."
        variant="featured"
        ordinal={1}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((study) => (
            <WorkCard key={study.slug} study={study} />
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap gap-6">
            <InteractiveHoverButton href="/research/" text="All research" />
            <InteractiveHoverButton href="/projects/" text="All projects" />
          </div>
        </Reveal>
      </Section>

      {/* Publications */}
      <Section id="publications" title="Publications" description="Peer-reviewed and published work." ordinal={2}>
        <div className="space-y-10">
          {publications.map((p) => (
            <PublicationEntry key={p.id} pub={p} />
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section
        id="experience"
        title="Experience"
        description="Where the research and the engineering happen."
        variant="featured"
        ordinal={3}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card className="card-lift h-full space-y-3">
              <span className="label">Research</span>
              <h3 className="text-lg">{research.title}</h3>
              <p className="text-sm text-muted">
                {research.unit}, {research.org} · <RichText text={research.time} />
              </p>
              <p className="text-sm italic text-muted">Advisor: {research.advisor}</p>
              <p className="text-sm font-medium text-ink">{research.topic}</p>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="card-lift h-full space-y-3">
              <span className="label">Industry</span>
              <h3 className="text-lg">{industry.title}</h3>
              <p className="text-sm text-muted">
                {industry.org} · <RichText text={industry.time} />
              </p>
              <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted">
                {industry.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="mt-8">
            <InteractiveHoverButton href="/resume/" text="View full CV" />
          </div>
        </Reveal>
      </Section>

      {/* Contact - Lazy loaded */}
      <Suspense fallback={
        <section className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-5xl mx-auto h-[500px] flex items-center justify-center">
            <div className="text-muted">Loading...</div>
          </div>
        </section>
      }>
        <ContactSection />
      </Suspense>
    </main>
  )
}
