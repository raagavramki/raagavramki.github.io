import Link from "next/link"

import { RichText } from "@/components/Tbd"
import type { CaseStudy } from "@/lib/data/types"

export default function WorkCard({ study }: { study: CaseStudy }) {
  const isResearch = study.kind === "research"
  const href = `/${isResearch ? "research" : "projects"}/${study.slug}/`
  const secondary = study.artifacts.slice(0, 1)

  return (
    <article className="card card-lift group relative flex h-full flex-col p-5 focus-within:ring-2 focus-within:ring-accent">
      <p className="text-xs text-muted">
        {isResearch ? "Research" : "Engineering"} · <RichText text={study.statusLabel} />
      </p>
      <h3 className="mt-2 text-xl leading-snug text-ink">
        <Link href={href} className="after:absolute after:inset-0 after:content-[''] focus:outline-none">
          {study.title}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink/80">
        <RichText text={study.problem} />
      </p>
      <p className="mt-3 text-xs leading-relaxed text-muted">
        <RichText text={study.methodLine} />
      </p>
      <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-5 pt-4 text-sm">
        <span className="tap font-medium text-ink">
          Read case study <span aria-hidden="true">&nbsp;→</span>
        </span>
        {secondary.map((a) => (
          <a
            key={a.href}
            href={a.href}
            target="_blank"
            rel="noreferrer"
            className="tap focus-ring text-muted hover:text-ink"
            aria-label={`${a.label} for ${study.title} (opens in a new tab)`}
          >
            {a.label} ↗
          </a>
        ))}
      </div>
    </article>
  )
}
