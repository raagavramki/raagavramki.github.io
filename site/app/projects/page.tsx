"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import ProjectCard from "@/components/ProjectCard"
import Reveal from "@/components/Reveal"
import { projectFilters, projects, type ProjectCategory } from "@/lib/content"

const categoryColors: Record<ProjectCategory, string> = {
  all: "rgb(26, 29, 33)",
  ml: "rgb(79, 70, 229)",
  vision: "rgb(8, 145, 178)",
  nlp: "rgb(124, 58, 237)",
  agentic: "rgb(5, 150, 105)",
  electronics: "rgb(220, 38, 38)",
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectCategory>("all")

  const visibleProjects = useMemo(
    () =>
      projects.filter(
        (project) => filter === "all" || project.category === filter
      ),
    [filter]
  )

  return (
    <main id="main">
      <section className="section-hero">
        <div className="container">
          <Reveal>
            <span className="label">Projects</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-3xl md:text-4xl font-serif mt-6 mb-6">
              Selected Work
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted max-w-2xl mb-12">
              Across deep learning, computer vision, NLP, and hardware systems.
            </p>
          </Reveal>

          {/* Filter buttons */}
          <Reveal delay={0.15}>
            <div className="flex flex-wrap gap-3 mb-12">
              {projectFilters.map((option) => {
                const isActive = filter === option.key
                const color = categoryColors[option.key]

                return (
                  <motion.button
                    key={option.key}
                    className="relative rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300"
                    style={{
                      borderColor: isActive ? color : undefined,
                      backgroundColor: isActive ? color : "transparent",
                      color: isActive ? "white" : undefined,
                    }}
                    onClick={() => setFilter(option.key)}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option.label}
                    {!isActive && (
                      <span
                        className="absolute inset-0 rounded-full border border-line hover:border-ink/30 transition-colors"
                        style={{ pointerEvents: "none" }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </Reveal>

          {/* Projects grid */}
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            layout
          >
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
