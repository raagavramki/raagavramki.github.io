import Image from "next/image"

import CTA from "@/components/CTA"
import Card from "@/components/Card"
import ContactSection from "@/components/ContactSection"
import ProjectCard from "@/components/ProjectCard"
import Reveal from "@/components/Reveal"
import Section from "@/components/Section"
import { contactCopy, profile, projects, resumeSections } from "@/lib/content"

const featuredProjects = projects.filter(p => p.featured).slice(0, 3)

export default function HomePage() {
  return (
    <main id="main">
      {/* Hero */}
      <section className="section pt-20">
        <div className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">{profile.kicker}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1>{profile.name}</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="flex flex-wrap gap-3 text-sm font-medium text-muted">
                {profile.roles.map(role => (
                  <li key={role} className="rounded-full border border-line px-3 py-1">
                    {role}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="max-w-xl text-lg text-muted">{profile.summary}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-3">
                <CTA href="/projects" variant="primary">
                  Projects
                </CTA>
                <CTA href="/resume" variant="outline">
                  Resume
                </CTA>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <a className="btn-text" href={`mailto:${profile.email}`}>
                {contactCopy.emailCta}
              </a>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="space-y-6">
              <div className="overflow-hidden rounded-3xl border border-line bg-white">
                <Image
                  src={profile.avatar}
                  alt={`${profile.name} portrait`}
                  width={600}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.badges.map(badge => (
                  <span key={badge} className="badge">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Experience Preview */}
      <Section id="experience" title="Experience" description="Current work in ML research and industry.">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Industry */}
          <Reveal>
            <Card className="card-lift h-full space-y-4">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-muted">Industry</span>
                <h3 className="mt-2">{resumeSections.workExperience[0].title}</h3>
                <p className="muted">{resumeSections.workExperience[0].company}</p>
              </div>
              <div className="space-y-3 text-sm text-muted">
                <p>{resumeSections.workExperience[0].time}</p>
                <ul className="list-disc space-y-2 pl-4">
                  {resumeSections.workExperience[0].bullets.slice(0, 3).map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Card>
          </Reveal>

          {/* Research */}
          <Reveal delay={0.05}>
            <Card className="card-lift h-full space-y-4">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-muted">Research</span>
                <h3 className="mt-2">{resumeSections.researchExperience[0].title}</h3>
                <p className="muted">{resumeSections.researchExperience[0].lab}, {resumeSections.researchExperience[0].institution}</p>
              </div>
              <div className="space-y-3 text-sm text-muted">
                <p>{resumeSections.researchExperience[0].time}</p>
                <p className="italic">Advisor: {resumeSections.researchExperience[0].advisor}</p>
                <p className="font-medium text-ink">{resumeSections.researchExperience[0].topic}</p>
              </div>
            </Card>
          </Reveal>
        </div>
        <div className="mt-8">
          <CTA href="/resume" variant="outline">
            View full resume
          </CTA>
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects" description="Selected work in medical AI, computer vision, and systems.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <CTA href="/projects" variant="ghost">
            View all projects
          </CTA>
        </div>
      </Section>

      {/* Contact */}
      <ContactSection />
    </main>
  )
}
