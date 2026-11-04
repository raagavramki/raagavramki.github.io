import Link from "next/link"

import { RichText } from "@/components/Tbd"
import type { Publication } from "@/lib/data/types"

const OWNER = "Raagav Ramakrishnan"

export default function PublicationEntry({ pub }: { pub: Publication }) {
  return (
    <article className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs text-muted">
          {pub.venueShort ?? pub.venue} · {pub.date ?? pub.year}
        </span>
        <span className="badge">{pub.status === "published" ? "Published" : "Under review"}</span>
      </div>
      <h3 className="text-lg font-semibold leading-snug text-ink">{pub.title}</h3>
      <p className="text-sm text-muted">
        {pub.authors.map((a, i) => (
          <span key={a}>
            {a === OWNER ? <strong className="font-semibold text-ink">{a}</strong> : a}
            {i < pub.authors.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
      <p className="text-sm text-muted italic">
        {pub.venue}
        {pub.pages ? `, pp. ${pub.pages}` : ""}
        {pub.publisher ? `. ${pub.publisher}` : ""}
      </p>
      {pub.verifyNote ? (
        <p className="text-sm">
          <RichText text={`{{TBD: ${pub.verifyNote}}}`} />
        </p>
      ) : null}
      <div className="flex flex-wrap gap-x-5 text-sm">
        {pub.doi ? (
          <a className="tap link-underline text-ink focus-ring" href={pub.doi} target="_blank" rel="noreferrer">
            DOI
          </a>
        ) : null}
        {pub.openAccessUrl ? (
          <a className="tap link-underline text-ink focus-ring" href={pub.openAccessUrl} target="_blank" rel="noreferrer">
            PDF
          </a>
        ) : null}
        {pub.caseStudySlug ? (
          <Link className="tap link-underline text-ink focus-ring" href={`/research/${pub.caseStudySlug}/`}>
            Read case study
          </Link>
        ) : null}
      </div>
    </article>
  )
}
