"use client"

import { motion } from "framer-motion"
import type { ProjectCategory } from "@/lib/content"

const categoryColors: Record<Exclude<ProjectCategory, "all">, string> = {
  ml: "rgb(79, 70, 229)",
  vision: "rgb(8, 145, 178)",
  nlp: "rgb(124, 58, 237)",
  agentic: "rgb(5, 150, 105)",
  electronics: "rgb(220, 38, 38)",
}

type Project = {
  category: ProjectCategory
  meta: string
  title: string
  desc: string
  tags: string[]
  href: string
  featured?: boolean
}

type ProjectCardProps = {
  project: Project
  compact?: boolean
}

export default function ProjectCard({
  project,
  compact = false,
}: ProjectCardProps) {
  const isExternal = project.href.startsWith("http")
  const categoryColor =
    project.category !== "all"
      ? categoryColors[project.category]
      : "transparent"

  return (
    <motion.article
      className="group relative flex flex-col rounded-2xl border border-line bg-card p-5 transition-all duration-300 h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        y: -4,
        borderColor: "rgba(26, 29, 33, 0.15)",
        boxShadow: "0 22px 48px -28px rgba(26, 29, 33, 0.35)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Category accent bar */}
      <div
        className="absolute left-0 top-5 bottom-5 w-0.5 rounded-full opacity-70"
        style={{ backgroundColor: categoryColor }}
      />

      {/* Content */}
      <div className="flex-1 pl-4">
        {/* Category label */}
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-2 block"
          style={{ color: categoryColor }}
        >
          {project.meta}
        </span>

        {/* Title */}
        <h3 className="text-base font-semibold text-ink mb-2 leading-tight">{project.title}</h3>

        {/* Description */}
        <p className={`text-sm text-muted leading-relaxed ${compact ? "line-clamp-2 mb-3" : "mb-3"}`}>
          {project.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.slice(0, compact ? 3 : undefined).map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-[10px] bg-ink/5 text-muted rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Link */}
      <a
        href={project.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className="group/link inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-ink transition-colors pl-4 mt-auto"
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        <span>GitHub</span>
        <span className="transition-transform group-hover/link:translate-x-0.5">→</span>
      </a>
    </motion.article>
  )
}
