"use client"

import { motion } from "framer-motion"
import type { ProjectCategory } from "@/lib/content"

type Project = {
  category: ProjectCategory
  meta: string
  title: string
  desc: string
  tags: string[]
  href: string
}

type ProjectCardProps = {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const isExternal = project.href.startsWith("http")

  return (
    <motion.div
      className="card flex h-full flex-col gap-4 transition-all duration-300 hover:border-ink/20 hover:shadow-lg"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.12em] text-muted">
          {project.meta}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="mb-3 text-lg font-semibold text-ink">
          {project.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed">{project.desc}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <span
            key={tag}
            className="pill"
          >
            {tag}
          </span>
        ))}
      </div>

      <a
        href={project.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className="group/link inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink transition-colors w-fit"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        <span>View on GitHub</span>
        <motion.span
          className="inline-block"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          →
        </motion.span>
      </a>
    </motion.div>
  )
}
