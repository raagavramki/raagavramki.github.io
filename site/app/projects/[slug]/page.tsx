import type { Metadata } from "next"
import { notFound } from "next/navigation"

import CaseStudyLayout from "@/components/CaseStudyLayout"
import { publicEngineering } from "@/lib/content"

export const dynamicParams = false

export function generateStaticParams() {
  return publicEngineering().map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const study = publicEngineering().find((c) => c.slug === slug)
  if (!study) return {}
  const description = study.seoDescription
  return {
    title: study.title,
    description,
    alternates: { canonical: `/projects/${slug}/` },
    openGraph: { title: study.title, description, type: "article", url: `/projects/${slug}/` },
  }
}

export default async function ProjectCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = publicEngineering().find((c) => c.slug === slug)
  if (!study) notFound()
  return <CaseStudyLayout study={study} />
}
