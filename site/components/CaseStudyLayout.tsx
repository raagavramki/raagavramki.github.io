import Link from "next/link"

import ArtifactLinks from "@/components/ArtifactLinks"
import PublicationEntry from "@/components/PublicationEntry"
import { RichText } from "@/components/Tbd"
import TableOfContents from "@/components/TableOfContents"
import { getPublication } from "@/lib/data/publications"
import type { CaseStudy, CaseStudySection } from "@/lib/data/types"

function Diagram({ diagram }: { diagram: NonNullable<CaseStudySection["diagram"]> }) {
  return (
    <figure className="my-6">
      <ol className="grid gap-3 sm:grid-cols-2">
        {diagram.steps.map((s, i) => (
          <li key={s.label} className="rounded-xl border border-line bg-card p-4">
            <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
            <p className="font-semibold text-ink">{s.label}</p>
            {s.note ? <p className="mt-1 text-sm text-muted">{s.note}</p> : null}
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 text-xs text-muted">{diagram.caption}</figcaption>
    </figure>
  )
}

export default function CaseStudyLayout({ study }: { study: CaseStudy }) {
  const isResearch = study.kind === "research"
  const back = isResearch ? { href: "/research/", label: "All research" } : { href: "/projects/", label: "All projects" }
  const pub = study.publicationId ? getPublication(study.publicationId) : undefined

  return (
    <main id="main">
      <article className="section-hero">
        <div className="container max-w-3xl">
          <Link href={back.href} className="link-underline text-sm text-muted hover:text-ink focus-ring">
            ← {back.label}
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="label">{isResearch ? "Research" : "Engineering"}</span>
            <span className="badge">
              <RichText text={study.statusLabel} />
            </span>
          </div>
          <h1 className="mb-8 mt-4 text-3xl font-serif md:text-4xl">{study.title}</h1>

          <dl className="mb-8 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
            {study.meta.map((m) => (
              <div key={m.label}>
                <dt className="label">{m.label}</dt>
                <dd className="mt-1 text-ink">
                  <RichText text={m.value} />
                </dd>
              </div>
            ))}
          </dl>

          <p className="lead mb-8">
            <RichText text={study.summary} />
          </p>

          <TableOfContents items={study.sections.map(({ id, title }) => ({ id, title }))} />

          <div className="mt-10 space-y-12">
            {study.sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-serif">{s.title}</h2>
                <div className="space-y-4 leading-relaxed text-muted">
                  {s.paragraphs?.map((p, i) => (
                    <p key={i}>
                      <RichText text={p} />
                    </p>
                  ))}
                  {s.diagram ? <Diagram diagram={s.diagram} /> : null}
                  {s.table ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <caption className="mb-2 text-left text-xs text-muted">{s.table.caption}</caption>
                        <thead>
                          <tr className="border-b border-line">
                            {s.table.head.map((h) => (
                              <th key={h} scope="col" className="py-2 pr-4 font-semibold text-ink">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {s.table.rows.map((r) => (
                            <tr key={r[0]} className="border-b border-line/60 align-top">
                              {r.map((c, i) => (
                                <td key={i} className="py-2 pr-4">
                                  <RichText text={c} />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                  {s.bullets ? (
                    <ul className="list-disc space-y-2 pl-5">
                      {s.bullets.map((b, i) => (
                        <li key={i}>
                          <RichText text={b} />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}

            {pub ? (
              <section id="citation" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-serif">Publication</h2>
                <PublicationEntry pub={pub} />
              </section>
            ) : null}

            {study.artifacts.length > 0 ? (
              <section id="artifacts" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-serif">Artifacts</h2>
                <ArtifactLinks links={study.artifacts} />
              </section>
            ) : null}
          </div>
        </div>
      </article>
    </main>
  )
}
