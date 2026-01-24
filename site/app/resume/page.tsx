import CTA from "@/components/CTA"
import Card from "@/components/Card"
import Reveal from "@/components/Reveal"
import Section from "@/components/Section"
import { industry, profile, research, resumeCopy } from "@/lib/content"

export default function ResumePage() {
  return (
    <main id="main">
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
    </main>
  )
}
