import { contactCopy, profile } from "@/lib/content"

export default function ContactSection({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const Heading = headingLevel === 1 ? "h1" : "h2"
  return (
    <section id="contact" className={headingLevel === 1 ? "section-hero pt-28 md:pt-36" : "section"}>
      <div className="container max-w-3xl">
        <Heading className="text-3xl font-serif md:text-4xl">{contactCopy.heading}</Heading>
        <p className="mt-4 max-w-xl text-muted">{contactCopy.subheading}</p>
        <p className="mt-8">
          <a href={`mailto:${profile.email}`} className="tap link-underline focus-ring text-lg text-ink md:text-xl">
            {profile.email}
          </a>
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-6 text-sm">
          <li>
            <a href={profile.github} target="_blank" rel="noreferrer" className="tap focus-ring text-muted hover:text-ink">
              GitHub ↗
            </a>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="tap focus-ring text-muted hover:text-ink">
              LinkedIn ↗
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
