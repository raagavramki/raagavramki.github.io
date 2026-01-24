import type { ReactNode } from "react"

type SectionProps = {
  id?: string
  title: string
  description?: string
  children: ReactNode
}

export default function Section({ id, title, description, children }: SectionProps) {
  return (
    <section id={id} className="section">
      <div className="container">
        <div className="section-head">
          <h2>{title}</h2>
          {description ? <p className="muted">{description}</p> : null}
        </div>
        {children}
      </div>
    </section>
  )
}
