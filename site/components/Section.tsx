import type { ReactNode } from "react"

type SectionVariant = "default" | "featured" | "quiet"

type SectionProps = {
  id?: string
  title: string
  description?: string
  children: ReactNode
  variant?: SectionVariant
  ordinal?: number
}

const variantClasses: Record<SectionVariant, string> = {
  default: "section",
  featured: "section-featured",
  quiet: "section-quiet",
}

export default function Section({
  id,
  title,
  description,
  children,
  variant = "default",
  ordinal,
}: SectionProps) {
  return (
    <section id={id} className={variantClasses[variant]}>
      <div className="container">
        <div className="section-head relative">
          {ordinal && (
            <span className="hidden md:block absolute -left-12 top-1 text-xs text-muted/40 font-mono">
              {ordinal.toString().padStart(2, "0")}
            </span>
          )}
          <h2>{title}</h2>
          {description ? (
            <p className="muted max-w-2xl">{description}</p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  )
}
