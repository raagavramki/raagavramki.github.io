import Link from "next/link"

import { RichText } from "@/components/Tbd"
import { categoryColors, researchColor } from "@/lib/categoryColors"
import type { CaseStudy } from "@/lib/data/types"

export default function WorkCard({ study }: { study: CaseStudy }) {
  const isResearch = study.kind === "research"
  const color = isResearch || !study.category ? researchColor : categoryColors[study.category]
  const href = `/${isResearch ? "research" : "projects"}/${study.slug}/`
  const secondary = study.artifacts.slice(0, 2)

  return (
    <article className="card-lift group relative flex h-full flex-col rounded-2xl border border-line bg-card p-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-accent">
      <div className="absolute bottom-5 left-0 top-5 w-0.5 rounded-full opacity-70" style={{ backgroundColor: color }} />
      <div className="flex-1 pl-4">
        <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color }}>
          {isResearch ? "Research" : "Engineering"}
        </span>
        <h3 className="mb-2 text-base font-semibold leading-tight text-ink">
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] focus:outline-none">
            {study.title}
          </Link>
        </h3>
        <p className="mb-3 text-sm leading-relaxed text-ink/80">
          <RichText text={study.problem} />
        </p>
        <p className="mb-3 font-mono text-xs leading-relaxed text-muted">
          <RichText text={study.methodLine} />
        </p>
        <p className="mb-4 text-xs text-muted">
          <span className="badge">
            <RichText text={study.statusLabel} />
          </span>
        </p>
      </div>
      <div className="relative z-10 flex flex-wrap items-center gap-x-4 gap-y-1 pl-4 text-xs font-medium">
        <span className="text-ink">
          Read case study <span aria-hidden="true">→</span>
        </span>
        {secondary.map((a) => (
          <a
            key={a.href}
            href={a.href}
            target="_blank"
            rel="noreferrer"
            className="focus-ring text-muted hover:text-ink"
            aria-label={`${a.label} for ${study.title} (opens in a new tab)`}
          >
            {a.label} ↗
          </a>
        ))}
      </div>
    </article>
  )
}
