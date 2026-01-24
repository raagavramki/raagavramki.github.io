import Card from "@/components/Card"
import Reveal from "@/components/Reveal"
import Section from "@/components/Section"
import { aboutCopy, skills } from "@/lib/content"

export default function AboutPage() {
  return (
    <main id="main">
      <Section id="about" title={aboutCopy.heading} description={aboutCopy.subheading}>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <Card className="card-lift space-y-4 text-muted">
              <p>{aboutCopy.paragraphOne}</p>
              <p>{aboutCopy.paragraphTwo}</p>
            </Card>
          </Reveal>
          <Reveal delay={0.05}>
            <Card className="card-lift space-y-4">
              <h3>Skills & tooling</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill} className="pill">
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>
    </main>
  )
}
