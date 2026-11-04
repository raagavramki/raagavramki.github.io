"use client"

import { motion } from "framer-motion"
import Link from "next/link"

import { categoryColors } from "@/lib/categoryColors"
import type { ArchiveProject } from "@/lib/data/types"

export default function ProjectCard({
  project,
  hasCaseStudy = false,
}: {
  project: ArchiveProject
  /** True only when the linked case study is actually published in this build. */
  hasCaseStudy?: boolean
}) {
  const color = categoryColors[project.category]
  const internal = hasCaseStudy && project.slug ? `/projects/${project.slug}/` : null

  return (
    <motion.article
      className="group relative flex h-full flex-col rounded-2xl border border-line bg-card p-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-accent"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -4, borderColor: "rgba(26, 29, 33, 0.15)", boxShadow: "0 22px 48px -28px rgba(26, 29, 33, 0.35)" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="absolute bottom-5 left-0 top-5 w-0.5 rounded-full opacity-70" style={{ backgroundColor: color }} />
      <div className="flex-1 pl-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color }}>
            {project.meta}
          </span>
          {internal ? (
            <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] font-medium text-white">Case study</span>
          ) : null}
        </div>
        <h3 className="mb-2 text-base font-semibold leading-tight text-ink">
          {internal ? (
            <Link href={internal} className="after:absolute after:inset-0 after:content-[''] focus:outline-none">
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </h3>
        <p className="mb-3 text-sm leading-relaxed text-muted">{project.desc}</p>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-ink/5 px-2 py-0.5 text-[10px] text-muted">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-4 pl-4 text-xs font-medium">
        {internal ? <span className="text-ink">Read case study →</span> : null}
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="focus-ring text-muted transition-colors hover:text-ink"
            aria-label={`${project.title} on GitHub (opens in a new tab)`}
          >
            GitHub ↗
          </a>
        ) : null}
      </div>
    </motion.article>
  )
}
