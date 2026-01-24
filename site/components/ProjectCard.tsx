import Card from "@/components/Card"
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
  return (
    <Card className="card-lift flex h-full flex-col gap-4">
      <div className="text-xs uppercase tracking-[0.12em] text-muted">{project.meta}</div>
      <div className="flex-1">
        <h3 className="mb-3 text-lg font-semibold text-ink">{project.title}</h3>
        <p className="text-sm text-muted">{project.desc}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <span key={tag} className="pill">
            {tag}
          </span>
        ))}
      </div>
      <a className="btn-text" href={project.href} target="_blank" rel="noreferrer">
        Code -&gt;
      </a>
    </Card>
  )
}
