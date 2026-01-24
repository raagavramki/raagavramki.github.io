import CTA from "@/components/CTA"
import Card from "@/components/Card"
import ContactSection from "@/components/ContactSection"
import ProjectCard from "@/components/ProjectCard"
import Reveal from "@/components/Reveal"
import Section from "@/components/Section"
import { contactCopy, industry, profile, projects, research, resumeCopy, skills } from "@/lib/content"

const featuredProjects = projects.slice(0, 3)

export default function HomePage() {
  return (
    <main id="main">
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
                <img src={profile.avatar} alt="Raagav portrait" />
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

      <Section id="resume" title={resumeCopy.heading} description={resumeCopy.education}>
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card className="card-lift h-full space-y-4">
              <div>
                <h3>{resumeCopy.researchHeading}</h3>
                <p className="muted">{resumeCopy.researchSubheading}</p>
              </div>
              <div className="space-y-3 text-sm text-muted">
                <p>{research.time}</p>
                <p className="text-base font-semibold text-ink">{research.title}</p>
                <p>
                  <em>{research.advisor}</em>
                </p>
                <p>{research.topic}</p>
                <ul className="list-disc space-y-2 pl-4">
                  {research.bullets.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={0.05}>
            <Card className="card-lift h-full space-y-4">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-muted">{resumeCopy.experienceLabel}</span>
                <h3 className="mt-2">{resumeCopy.industryHeading}</h3>
                <p className="muted">{resumeCopy.industrySubheading}</p>
              </div>
              <div className="space-y-3 text-sm text-muted">
                <p>{industry.time}</p>
                <p className="text-base font-semibold text-ink">{industry.title}</p>
                <p>
                  <em>{industry.location}</em>
                </p>
                <ul className="list-disc space-y-2 pl-4">
                  {industry.bullets.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Card>
          </Reveal>
        </div>
        <div className="mt-8">
          <CTA href={profile.resumeUrl} variant="outline" external>
            Open resume
          </CTA>
        </div>
      </Section>

      <Section id="projects" title="Projects" description="Selected work across deep learning, systems, and hardware.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <CTA href="/projects" variant="ghost">
            Explore work
          </CTA>
        </div>
      </Section>

      <Section id="skills" title="Skills & tooling">
        <Reveal>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill} className="pill">
                {skill}
              </span>
            ))}
          </div>
        </Reveal>
      </Section>

      <ContactSection />
    </main>
  )
}
