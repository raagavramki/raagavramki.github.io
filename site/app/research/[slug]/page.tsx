import type { Metadata } from "next"
import { notFound } from "next/navigation"

import CaseStudyLayout from "@/components/CaseStudyLayout"
import { publicResearch } from "@/lib/content"

export const dynamicParams = false

export function generateStaticParams() {
  return publicResearch().map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const study = publicResearch().find((c) => c.slug === slug)
  if (!study) return {}
  const description = study.seoDescription
  return {
    title: study.title,
    description,
    alternates: { canonical: `/research/${slug}/` },
    openGraph: { title: study.title, description, type: "article", url: `/research/${slug}/` },
  }
}

export default async function ResearchCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = publicResearch().find((c) => c.slug === slug)
  if (!study) notFound()
  return <CaseStudyLayout study={study} />
}
