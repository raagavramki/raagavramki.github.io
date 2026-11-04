import Link from "next/link"

import type { ArchiveProject } from "@/lib/data/types"

export default function ProjectCard({
  project,
  hasCaseStudy = false,
}: {
  project: ArchiveProject
  /** True only when the linked case study is actually published in this build. */
  hasCaseStudy?: boolean
}) {
  const internal = hasCaseStudy && project.slug ? `/projects/${project.slug}/` : null

  return (
    <article className="card card-lift group relative flex h-full flex-col p-5 focus-within:ring-2 focus-within:ring-accent">
      <p className="text-xs text-muted">
        {project.meta}
        {internal ? <span className="font-medium text-ink"> · Case study</span> : null}
      </p>
      <h3 className="mt-2 text-xl leading-snug text-ink">
        {internal ? (
          <Link href={internal} className="after:absolute after:inset-0 after:content-[''] focus:outline-none">
            {project.title}
          </Link>
        ) : (
          project.title
        )}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{project.desc}</p>
      <p className="mt-3 text-xs text-muted">{project.tags.join(" · ")}</p>
      <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-5 pt-4 text-sm">
        {internal ? (
          <span className="tap font-medium text-ink">
            Read case study <span aria-hidden="true">&nbsp;→</span>
          </span>
        ) : null}
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="tap focus-ring text-muted transition-colors hover:text-ink"
            aria-label={`${project.title} on GitHub (opens in a new tab)`}
          >
            GitHub ↗
          </a>
        ) : null}
      </div>
    </article>
  )
}
