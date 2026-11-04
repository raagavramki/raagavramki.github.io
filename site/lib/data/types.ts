/**
 * Typed content model for the research + engineering portfolio.
 *
 * Any string may contain `{{TBD: note}}`; <RichText> renders it as a visible
 * "TBD - verify before publishing" badge, and `npm run check -- --release`
 * refuses to build a release while any remain.
 */

export type Visibility = "public" | "draft"

export type ProjectCategory = "ml" | "nlp" | "vision" | "systems"
export type ProjectFilter = "all" | ProjectCategory

export type PublicationStatus = "published" | "under-review"

export type Publication = {
  id: string
  title: string
  authors: string[]
  year: number
  /** e.g. "April 2026" - shown when known. */
  date?: string
  venue: string
  venueShort?: string
  pages?: string
  publisher?: string
  doi?: string
  /** Only when redistribution is permitted. */
  openAccessUrl?: string
  status: PublicationStatus
  caseStudySlug?: string
  /** Unverified bibliographic details, rendered as a TBD badge. */
  verifyNote?: string
}

export type ArtifactLink = {
  label: string
  href: string
  kind: "paper" | "code" | "demo" | "pdf" | "other"
}

export type Diagram = {
  caption: string
  steps: { label: string; note?: string }[]
}

export type CaseStudySection = {
  id: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
  table?: { caption: string; head: string[]; rows: string[][] }
  diagram?: Diagram
}

export type CaseStudy = {
  slug: string
  kind: "research" | "engineering"
  /** "draft" case studies are excluded from builds (see lib/data/visibility.ts). */
  visibility: Visibility
  title: string
  /** One-line problem, shown on cards. */
  problem: string
  /** Concise method / technology line, shown on cards. */
  methodLine: string
  /** Evidence/status label, e.g. "Published - CHI EA 2026". */
  statusLabel: string
  summary: string
  seoDescription: string
  meta: { label: string; value: string }[]
  sections: CaseStudySection[]
  artifacts: ArtifactLink[]
  category?: ProjectCategory
  publicationId?: string
  /** Lower = earlier in Selected Work. Omit to leave out of the homepage. */
  featuredOrder?: number
}

export type ArchiveProject = {
  category: ProjectCategory
  meta: string
  title: string
  desc: string
  tags: string[]
  /** External destination (GitHub). Omitted when there is no public repository. */
  href?: string
  /** Set when a case study exists; the card then links internally first. */
  slug?: string
}

export type Experience = {
  id: string
  kind: "research" | "industry" | "leadership"
  title: string
  org: string
  orgNote?: string
  /** Lab / unit inside the org, if any. */
  unit?: string
  advisor?: string
  location?: string
  time: string
  topic?: string
  bullets: string[]
  /** Retained as data but not displayed (e.g. bullets absent from the latest CV). */
  archivedBullets?: string[]
}
