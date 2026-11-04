"use client"

import { useMemo, useState } from "react"

import ProjectCard from "@/components/ProjectCard"
import type { ArchiveProject, ProjectCategory, ProjectFilter } from "@/lib/data/types"

type Props = {
  projects: ArchiveProject[]
  filters: { key: ProjectFilter; label: string }[]
  groups: { key: ProjectCategory; title: string; blurb: string }[]
  /** Slugs of case studies published in this build. */
  publishedSlugs: string[]
}

export default function ProjectsBrowser({ projects, filters, groups, publishedSlugs }: Props) {
  const [filter, setFilter] = useState<ProjectFilter>("all")
  const published = useMemo(() => new Set(publishedSlugs), [publishedSlugs])

  const sections = useMemo(
    () =>
      groups
        .filter((g) => filter === "all" || g.key === filter)
        .map((g) => {
          const items = projects.filter((p) => p.category === g.key)
          const isStudy = (p: ArchiveProject) => !!p.slug && published.has(p.slug)
          // Case studies lead each group; the rest keep their listed order.
          const sorted = [...items].sort((a, b) => Number(isStudy(b)) - Number(isStudy(a)))
          return { ...g, items: sorted, studies: items.filter(isStudy).length }
        })
        .filter((g) => g.items.length > 0),
    [filter, groups, projects, published]
  )

  const total = sections.reduce((n, g) => n + g.items.length, 0)

  return (
    <>
      <div className="mb-3 flex flex-wrap gap-3" role="group" aria-label="Filter projects by area">
        {filters.map((o) => {
          const active = filter === o.key
          return (
            <button
              key={o.key}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(o.key)}
              className={`focus-ring min-h-[44px] rounded-full border px-5 text-sm font-medium transition-colors ${
                active ? "border-ink bg-ink text-white" : "border-line text-ink hover:border-ink/40"
              }`}
            >
              {o.label}
            </button>
          )
        })}
      </div>
      <p className="mb-12 text-sm text-muted" aria-live="polite">
        {total} project{total === 1 ? "" : "s"}. Those marked &ldquo;Case study&rdquo; have a full write-up.
      </p>

      <div className="space-y-16">
        {sections.map((g) => (
          <section key={g.key} aria-labelledby={`group-${g.key}`}>
            <div className="mb-6 border-b border-line pb-3">
              <h2 id={`group-${g.key}`} className="text-2xl font-serif">
                {g.title}
              </h2>
              <p className="mt-1 text-sm text-muted">{g.blurb}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {g.items.map((p) => (
                <ProjectCard key={p.title} project={p} hasCaseStudy={!!p.slug && published.has(p.slug)} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
