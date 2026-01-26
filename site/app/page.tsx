import Image from "next/image"

import CTA from "@/components/CTA"
import Card from "@/components/Card"
import ContactSection from "@/components/ContactSection"
import ProjectCard from "@/components/ProjectCard"
import Reveal from "@/components/Reveal"
import Section from "@/components/Section"
import { contactCopy, profile, projects, resumeSections } from "@/lib/content"

const featuredProjects = projects.filter((p) => p.featured).slice(0, 3)

export default function HomePage() {
  return (
    <main id="main">
      {/* Hero */}
      <section className="section-hero pt-16 md:pt-24">
        <div className="container grid gap-12 lg:gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <Reveal>
              <p className="label">{profile.kicker}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1>{profile.name}</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="flex flex-wrap gap-3 text-sm font-medium text-muted">
                {profile.roles.map((role) => (
                  <li
                    key={role}
                    className="rounded-full border border-line px-4 py-1.5 transition-colors hover:border-ink/20"
                  >
                    {role}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="lead max-w-xl">{profile.summary}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-4 pt-2">
                <CTA href="/projects" variant="primary">
                  View Projects
                </CTA>
                <CTA href="/resume" variant="outline">
                  Resume
                </CTA>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <a
                className="link-underline text-sm font-medium text-muted hover:text-ink transition-colors"
                href={`mailto:${profile.email}`}
              >
                {contactCopy.emailCta}
              </a>
            </Reveal>
          </div>
          <Reveal delay={0.2} direction="left">
            <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
              <Image
                src={profile.avatar}
                alt={`${profile.name} portrait`}
                width={600}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Experience Preview */}
      <Section
        id="experience"
        title="Experience"
        description="Current work in ML research and industry."
        ordinal={1}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Industry */}
          <Reveal>
            <Card className="card-lift h-full space-y-3">
              <div>
                <span className="label">Industry</span>
                <h3 className="mt-2 text-lg">
                  {resumeSections.workExperience[0].title}
                </h3>
                <p className="text-sm text-muted">
                  {resumeSections.workExperience[0].company} · {resumeSections.workExperience[0].time}
                </p>
              </div>
              <ul className="list-disc space-y-1.5 pl-4 text-sm text-muted leading-relaxed">
                {resumeSections.workExperience[0].bullets
                  .slice(0, 2)
                  .map((item) => (
                    <li key={item}>{item}</li>
                  ))}
              </ul>
            </Card>
          </Reveal>

          {/* Research */}
          <Reveal delay={0.1}>
            <Card className="card-lift h-full space-y-3">
              <div>
                <span className="label">Research</span>
                <h3 className="mt-2 text-lg">
                  {resumeSections.researchExperience[0].title}
                </h3>
                <p className="text-sm text-muted">
                  {resumeSections.researchExperience[0].lab}, {resumeSections.researchExperience[0].institution} · {resumeSections.researchExperience[0].time}
                </p>
              </div>
              <p className="text-sm text-muted">
                <span className="italic">Advisor: {resumeSections.researchExperience[0].advisor}</span>
              </p>
              <p className="text-sm font-medium text-ink">
                {resumeSections.researchExperience[0].topic}
              </p>
            </Card>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="mt-8">
            <CTA href="/resume" variant="outline">
              View full resume
            </CTA>
          </div>
        </Reveal>
      </Section>

      {/* Projects */}
      <Section
        id="projects"
        title="Projects"
        description="Selected work in medical AI, computer vision, and systems."
        variant="featured"
        ordinal={2}
      >
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} compact />
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-8">
            <CTA href="/projects" variant="ghost">
              View all projects
            </CTA>
          </div>
        </Reveal>
      </Section>

      {/* Contact */}
      <ContactSection />
    </main>
  )
}
