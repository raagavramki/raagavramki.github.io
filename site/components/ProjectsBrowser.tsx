"use client"

import { useMemo, useState } from "react"

import ProjectCard from "@/components/ProjectCard"
import { categoryColors, filterColors } from "@/lib/categoryColors"
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
          const color = filterColors[o.key]
          return (
            <button
              key={o.key}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(o.key)}
              className="focus-ring rounded-full border border-line px-5 py-2 text-sm font-medium transition-all duration-300 hover:border-ink/30"
              style={active ? { backgroundColor: color, borderColor: color, color: "white" } : undefined}
            >
              {o.label}
            </button>
          )
        })}
      </div>
      <p className="mb-12 text-sm text-muted" aria-live="polite">
        {total} project{total === 1 ? "" : "s"}. Cards marked <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] font-medium text-white">Case study</span> open a full write-up.
      </p>

      <div className="space-y-16">
        {sections.map((g) => (
          <section key={g.key} aria-labelledby={`group-${g.key}`}>
            <div className="mb-6 flex items-start gap-3">
              <span className="mt-2 h-6 w-0.5 rounded-full" style={{ backgroundColor: categoryColors[g.key] }} />
              <div>
                <h2 id={`group-${g.key}`} className="text-2xl font-serif">
                  {g.title}
                </h2>
                <p className="mt-1 text-sm text-muted">{g.blurb}</p>
              </div>
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
