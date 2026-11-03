"use client"

import { useMemo, useState } from "react"

import ProjectCard from "@/components/ProjectCard"
import { filterColors } from "@/lib/categoryColors"
import type { ArchiveProject, ProjectFilter } from "@/lib/data/types"

type Props = {
  projects: ArchiveProject[]
  filters: { key: ProjectFilter; label: string }[]
  /** Slugs of case studies published in this build. */
  publishedSlugs: string[]
}

export default function ProjectsBrowser({ projects, filters, publishedSlugs }: Props) {
  const [filter, setFilter] = useState<ProjectFilter>("all")
  const published = useMemo(() => new Set(publishedSlugs), [publishedSlugs])
  const isStudy = (p: ArchiveProject) => !!p.slug && published.has(p.slug)

  const visible = useMemo(
    () =>
      projects.filter((p) =>
        filter === "all" ? true : filter === "featured" ? isStudy(p) : p.category === filter
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter, projects, published]
  )
  const studies = visible.filter(isStudy)
  const archive = visible.filter((p) => !isStudy(p))

  return (
    <>
      <div className="mb-12 flex flex-wrap gap-3" role="group" aria-label="Filter projects">
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

      {studies.length > 0 && (
        <section aria-labelledby="case-studies-h" className="mb-16">
          <h2 id="case-studies-h" className="mb-6 text-2xl font-serif">
            Case studies
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {studies.map((p) => (
              <ProjectCard key={p.title} project={p} hasCaseStudy />
            ))}
          </div>
        </section>
      )}

      {archive.length > 0 && (
        <section aria-labelledby="archive-h">
          <h2 id="archive-h" className="mb-2 text-2xl font-serif">
            Archive
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-muted">Earlier and smaller projects. Each links to its GitHub repository.</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {archive.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </section>
      )}

      {visible.length === 0 && <p className="text-muted">No projects in this category.</p>}
    </>
  )
}
