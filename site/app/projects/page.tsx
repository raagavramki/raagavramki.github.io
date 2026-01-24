"use client"

import { useMemo, useState } from "react"

import ProjectCard from "@/components/ProjectCard"
import Reveal from "@/components/Reveal"
import Section from "@/components/Section"
import { projectFilters, projects, type ProjectCategory } from "@/lib/content"

export default function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectCategory>("all")

  const visibleProjects = useMemo(
    () => projects.filter(project => filter === "all" || project.category === filter),
    [filter],
  )

  return (
    <main id="main">
      <Section id="projects" title="Projects" description="Selected work across deep learning, systems, and hardware.">
        <div className="flex flex-wrap gap-3">
          {projectFilters.map(option => (
            <button
              key={option.key}
              className={`rounded-full border px-4 py-1 text-sm font-medium transition-colors ${
                filter === option.key
                  ? "border-ink bg-ink text-white"
                  : "border-line text-muted hover:border-ink hover:text-ink"
              }`}
              onClick={() => setFilter(option.key)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  )
}
