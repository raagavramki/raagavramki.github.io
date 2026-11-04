import Link from "next/link"

import Card from "@/components/Card"
import ContactSection from "@/components/ContactSection"
import ProofStrip from "@/components/ProofStrip"
import PublicationEntry from "@/components/PublicationEntry"
import Reveal from "@/components/Reveal"
import Section from "@/components/Section"
import { RichText } from "@/components/Tbd"
import WorkCard from "@/components/WorkCard"
import { experienceByKind, featuredWork, profile, publications } from "@/lib/content"

const research = experienceByKind("research")[0]
const industry = experienceByKind("industry")[0]

const textLink = "tap link-underline focus-ring text-sm text-ink"

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
      <section className="section-hero relative pt-16 md:pt-24">
        <div className="container relative z-10">
          <div className="max-w-3xl space-y-8">
            <Reveal delay={0.05}>
              <p className="label">{profile.name}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="text-4xl md:text-5xl">{profile.headline}</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lead max-w-2xl">{profile.subtitle}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <Link href="/research/" className="btn btn-primary">
                  Explore research
                </Link>
                <Link href="/projects/" className="btn btn-outline">
                  View projects
                </Link>
                <a href={profile.cvUrl} download className={textLink}>
                  Download CV
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="text-sm text-muted">
                <a href={`mailto:${profile.email}`} className="tap link-underline focus-ring text-ink">
                  {profile.email}
                </a>
              </p>
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
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {featured.map((study) => (
            <WorkCard key={study.slug} study={study} />
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-x-8">
          <Link href="/research/" className={textLink}>
            All research →
          </Link>
          <Link href="/projects/" className={textLink}>
            All projects →
          </Link>
        </div>
      </Section>

      {/* Publications */}
      <Section id="publications" title="Publications">
        <div className="space-y-10">
          {publications.map((p) => (
            <PublicationEntry key={p.id} pub={p} />
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience" variant="featured">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="h-full space-y-3">
            <span className="label">Research</span>
            <h3 className="text-xl">{research.title}</h3>
            <p className="text-sm text-muted">
              {research.unit}, {research.org} · <RichText text={research.time} />
            </p>
            <p className="text-sm italic text-muted">Advisor: {research.advisor}</p>
            <p className="text-sm font-medium text-ink">{research.topic}</p>
          </Card>
          <Card className="h-full space-y-3">
            <span className="label">Industry</span>
            <h3 className="text-xl">{industry.title}</h3>
            <p className="text-sm text-muted">
              {industry.org} · <RichText text={industry.time} />
            </p>
            <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted">
              {industry.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        </div>
        <div className="mt-8">
          <Link href="/resume/" className={textLink}>
            Full CV →
          </Link>
        </div>
      </Section>

      <ContactSection />
    </main>
  )
}
